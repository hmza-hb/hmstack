# hmstack

coding is solved. taste isn't. hmstack teaches your agents to stop shipping slop and start building software with actual soul.

a plugin for claude code and cursor. playbooks, a palate, and a critique loop. the agent reads the repo, builds the smallest thing that fits, then looks at the running result and the diff before it says done.

a cook is not a cook because the kitchen has knives. a cook is a cook because they have a palate. they know when a plate is crowded, when the seasoning is generic, and when to take it off the heat. hmstack is that palate for coding agents.

made by hamza ([@hmza](https://github.com/hmza)). inspired by lauren tan's [pstack](https://github.com/cursor/plugins/tree/main/pstack).

## install

from a checkout of this repo, point the cli at the project you want seasoned:

```bash
node /path/to/hmstack/bin/hmstack.js init --palate editorial-minimal
node /path/to/hmstack/bin/hmstack.js install --claude
node /path/to/hmstack/bin/hmstack.js install --cursor
```

`package.json` exposes the same binary as `hmstack`, so a published or `npm link`ed checkout is `npx hmstack init`, `npx hmstack install --claude`, and `npx hmstack install --cursor`.

`init` writes `.hmstack/config.json` in the current directory. `install --claude` symlinks this repo to `.claude/skills/hmstack`, which claude code loads as a project plugin. `install --cursor` symlinks each skill into `.cursor/skills/`.

add `--global` to install for your user instead of the current repo. cursor rejects a symlink under `~/.cursor/plugins/local` when the target sits outside that folder, so `install --cursor --global` copies the plugin there. reload the window after a global cursor install.

palates: `editorial-minimal`, `tactile-craft`, `lean-backend`.

in cursor the entry is `/hm-mode`. claude prefixes skills that ship inside a plugin, so the same entry is `/hmstack:hm-mode`. the phase commands follow the same rule: `/hm-mise` in cursor, `/hmstack:hm-mise` in claude.

to load the repo itself for one claude session, without installing it into a project:

```bash
claude --plugin-dir /path/to/hmstack
```

## the loop

non-trivial work goes through these in order. `/hm-mode` is the router. the other commands are the phases, and you can run one directly when you already know which phase you want.

| command | phase | what it forces |
| --- | --- | --- |
| `/hm-mode` | router | classify the task, pick the palate, run the loop |
| `/hm-mise` | 1. mise en place | read the repo. three bullets. no edits yet |
| `/hm-prep` | 2. prep | smallest model, file tree, and module plan |
| `/hm-cook` | 3. cook | implement under [TASTE.md](TASTE.md) and the active palate |
| `/hm-taste` | 4. taste | screenshots for ui. a line-by-line diff for every change |
| `/hm-plate` | 5. plate | edge states, copy, a clean tree, a short why |
| `/unslop` | standalone | delete and simplify. no new behavior |

a typecheck is not a taste check. ui work is looked at in a browser at desktop and mobile. every change is read as a diff, and the default habits get a second pass before the summary.

## palates

set one in `.hmstack/config.json`. a palate narrows the laws. it does not waive them. if the repo already has a pattern, the repo wins unless the task is to change that pattern.

- `editorial-minimal`: type, measure, and quiet paper. for reading and product surfaces.
- `tactile-craft`: hairline borders, press states, hard edges. for tools and dense ui.
- `lean-backend`: flat modules, explicit errors, no new machinery. for servers, scripts, and data.

## laws

[TASTE.md](TASTE.md) is the bar. skills are the procedure. palates are the seasoning. if a skill and a palate disagree, `TASTE.md` wins.

## license

mit. see [LICENSE](LICENSE).
