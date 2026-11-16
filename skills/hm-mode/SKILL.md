---
name: hm-mode
description: >-
  Routes a task through the hmstack culinary loop. Classifies the work,
  selects a palate, and runs mise, prep, cook, taste, and plate in order.
  Use when the user types /hm-mode, asks hmstack to take a task, or asks
  an agent to build with taste instead of default output.
disable-model-invocation: true
---

# hm-mode

router. classify, select the palate, then run the phases in order. implementation happens inside the phase skills, not here.

## locate

1. Resolve this file's real path. follow symlinks.
2. The plugin root is the nearest ancestor that contains `TASTE.md`.
3. Read `TASTE.md`.
4. Read `<workspace>/.hmstack/config.json`. its `palate` field wins.
5. If that file is missing, pick from the table below and say the choice in one line.
6. Read `palates/<palate>.md` from the plugin root. a fullstack task reads both palates named below.

## classify

| what the task changes | class | palate when unset |
| --- | --- | --- |
| screens, css, layout, copy on a surface | ui | `editorial-minimal` |
| a tool, editor, or settings surface | ui | `tactile-craft` |
| api, data, jobs, cli, no screen | backend | `lean-backend` |
| a screen and a server in one task | fullstack | ui palate for screens, `lean-backend` for server files |
| delete, simplify, or "this is slop", with no new behavior | unslop | keep the current palate |

a docs or marketing page is `editorial-minimal`. a dense operational ui is `tactile-craft`. when the surface is ambiguous, use `editorial-minimal` and say so.

## trivial

a typo, a rename, or a one-line edit the user fully specified is trivial. make the edit, then run the clean-tree section of `../hm-plate/SKILL.md`. stop.

anything else is non-trivial.

## loop

read and follow each file. do not reorder. do not skip taste.

1. `../hm-mise/SKILL.md`
2. `../hm-prep/SKILL.md`
3. `../hm-cook/SKILL.md`
4. `../hm-taste/SKILL.md`
5. `../hm-plate/SKILL.md`

unslop class: follow `../unslop/SKILL.md`, then the diff section of `../hm-taste/SKILL.md`, then the summary section of `../hm-plate/SKILL.md`.

## gates

- mise ends with exactly three bullets, and no file has been edited yet.
- prep lists every new file. cook does not add a file that list omitted without revising the list first.
- taste for ui work cites a screenshot path, or names the substitute and why no browser was available.
- taste names at least two defaults it removed, or quotes the lines it checked and kept.
- plate is the only phase that says the task is done.

## reply

phases before plate stay short: the three bullets, the prep tree, then the work. the user-facing close is the plate summary.
