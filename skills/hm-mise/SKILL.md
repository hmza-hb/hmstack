---
name: hm-mise
description: >-
  Reads the repo, the active palate, and TASTE.md, then states the
  aesthetic and structural target in three bullets before any edit.
  Use for /hm-mise, the first phase of /hm-mode, or when an agent is
  about to guess an existing pattern.
disable-model-invocation: true
---

# hm-mise

mise en place. read first. edit nothing in this phase, including formatters.

## locate

1. Resolve this file's real path. follow symlinks.
2. Plugin root: nearest ancestor that contains `TASTE.md`.
3. Read `TASTE.md` and `palates/<palate>.md`.
4. Palate: `<workspace>/.hmstack/config.json` field `palate`. if the file is missing, use the palate `/hm-mode` already chose. if you are here alone, pick `editorial-minimal` for screens, `tactile-craft` for tools, `lean-backend` for server work, and say which.

## read

search the workspace before claiming a convention. open the files, do not infer them from the framework's defaults.

- manifest and lockfile: dependencies already allowed.
- the nearest screen, route, or module to the task: structure, names, and imports.
- design tokens, global css, and the font actually loaded. a token file beats a guess.
- one existing empty, loading, and error state, if the repo has them.
- the test or lint command the repo already runs.

if a pattern is not in those files, say it is absent. do not invent a parallel style beside a live one.

## target

stop and write exactly three bullets:

1. aesthetic: the palate name, the tokens you will reuse, and the one surface this change should feel like (name the file).
2. structural: the files you expect to touch, the domain nouns you will keep, and the dependencies you will not add.
3. verification: the command that runs the app or the tests, plus the two viewports (1280 and 390) when a screen changes.

## gate

the next phase does not start until those three bullets are in the reply. a third bullet that says "run tsc" as the only check fails this phase when the task has a screen. name how the screen will be looked at.
