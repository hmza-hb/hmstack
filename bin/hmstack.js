#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');

function pluginRoot() {
  return path.resolve(__dirname, '..');
}

function fail(message) {
  process.stderr.write(`hmstack: ${message}\n`);
  process.exit(1);
}

function usage(code) {
  const text = `${helpText().trimEnd()}\n`;
  if (code === 0) process.stdout.write(text);
  else process.stderr.write(text);
  process.exit(code);
}

function say(message) {
  process.stdout.write(`${message}\n`);
}

function helpText() {
  return `hmstack — taste for coding agents

usage
  hmstack init [--palate <name>] [--force]
  hmstack install (--claude | --cursor) [--global] [--force]

init writes .hmstack/config.json in the current directory.
install --claude symlinks this repo to .claude/skills/hmstack.
install --cursor symlinks each skill into .cursor/skills/.
--global installs for your user instead of the current repo.
cursor rejects a symlink under ~/.cursor/plugins/local when the
target lives outside that folder, so --cursor --global copies.

palates
  ${palateNames().join('\n  ')}
`;
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--help' || token === '-h') args.help = true;
    else if (token === '--force') args.force = true;
    else if (token === '--global') args.global = true;
    else if (token === '--claude') args.claude = true;
    else if (token === '--cursor') args.cursor = true;
    else if (token === '--palate') {
      const value = argv[i + 1];
      if (!value || value.startsWith('-')) fail('--palate needs a name');
      args.palate = value;
      i += 1;
    } else if (token.startsWith('-')) fail(`unknown flag ${token}`);
    else args._.push(token);
  }
  return args;
}

function palateNames() {
  const dir = path.join(pluginRoot(), 'palates');
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.slice(0, -3))
    .sort();
}

function skillNames() {
  const dir = path.join(pluginRoot(), 'skills');
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => fs.existsSync(path.join(dir, name, 'SKILL.md')))
    .sort();
}

function insidePlugin(dir) {
  const root = pluginRoot();
  const relative = path.relative(root, path.resolve(dir));
  return relative === '' || (relative !== '' && !relative.startsWith('..') && !path.isAbsolute(relative));
}

function exists(target) {
  try {
    fs.lstatSync(target);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

function sameRealPath(left, right) {
  try {
    return fs.realpathSync(left) === fs.realpathSync(right);
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

function replaceExisting(target, force) {
  if (!exists(target)) return;
  if (!force) fail(`refusing to replace ${target}. pass --force`);
  fs.rmSync(target, { recursive: true, force: true });
}

function linkDir(target, dest, force) {
  const absolute = path.resolve(target);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (exists(dest)) {
    if (sameRealPath(dest, absolute)) {
      say(`already linked ${dest}`);
      return;
    }
    replaceExisting(dest, force);
  }
  fs.symlinkSync(absolute, dest, 'dir');
  say(`linked ${dest} -> ${absolute}`);
}

function copyPlugin(dest, force) {
  if (exists(dest)) {
    replaceExisting(dest, force);
  }
  fs.mkdirSync(dest, { recursive: true });
  const skip = new Set(['.git', 'node_modules']);
  for (const entry of fs.readdirSync(pluginRoot())) {
    if (skip.has(entry)) continue;
    fs.cpSync(path.join(pluginRoot(), entry), path.join(dest, entry), { recursive: true });
  }
  say(`copied ${dest}`);
  say('reload the cursor window.');
}

function writeConfig(file, palate) {
  const body = `${JSON.stringify({ version: 1, palate }, null, 2)}\n`;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, body);
  say(`wrote ${file}`);
  say(`palate: ${palate}`);
}

function init(args) {
  if (args.claude || args.cursor || args.global) {
    fail('init takes --palate and --force');
  }
  const names = palateNames();
  const palate = args.palate || 'editorial-minimal';
  if (!names.includes(palate)) {
    fail(`unknown palate ${palate}. known: ${names.join(', ')}`);
  }
  const file = path.join(process.cwd(), '.hmstack', 'config.json');
  if (exists(file) && !args.force) {
    fail(`refusing to replace ${file}. pass --force`);
  }
  writeConfig(file, palate);
}

function claudeDest(global) {
  const root = global ? path.join(os.homedir(), '.claude') : path.join(process.cwd(), '.claude');
  return path.join(root, 'skills', 'hmstack');
}

function installClaude(args) {
  linkDir(pluginRoot(), claudeDest(args.global), args.force);
}

function installCursor(args) {
  if (args.global) {
    copyPlugin(path.join(os.homedir(), '.cursor', 'plugins', 'local', 'hmstack'), args.force);
    return;
  }
  const skills = skillNames();
  if (skills.length === 0) fail('no skills found to link');
  for (const name of skills) {
    linkDir(
      path.join(pluginRoot(), 'skills', name),
      path.join(process.cwd(), '.cursor', 'skills', name),
      args.force,
    );
  }
}

function install(args) {
  if (args.palate) fail('install does not take --palate. set it with init');
  if (!args.claude && !args.cursor) fail('install needs --claude, --cursor, or both');
  if (!args.global && insidePlugin(process.cwd())) {
    fail('run install from the project you want to season, or pass --global');
  }
  if (args.claude) installClaude(args);
  if (args.cursor) installCursor(args);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) usage(0);
  const command = args._[0];
  if (!command) usage(1);
  if (args._.length > 1) fail(`unexpected argument ${args._[1]}`);
  if (command === 'init') {
    init(args);
    return;
  }
  if (command === 'install') {
    install(args);
    return;
  }
  fail(`unknown command ${command}`);
}

main();
