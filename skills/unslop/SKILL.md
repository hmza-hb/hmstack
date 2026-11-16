---
name: unslop
description: >-
  Deletes unused code, single-caller wrappers, restated comments, and
  generic ui or copy without adding behavior. Use for /unslop, a
  hm-mode task classed as unslop, or when the user asks to simplify,
  deslop, or strip AI defaults from existing work.
disable-model-invocation: true
---

# unslop

a deletion pass. no new behavior, no new dependency, no new feature. a new file is allowed only when a file is split so both pieces get shorter.

## locate

read `TASTE.md` and the active palate (`<workspace>/.hmstack/config.json`, else the palate the surrounding files already follow). the ban list is the checklist. the repo's real pattern stays.

## scope

the files the user named, or the current `git diff` if they said "this". do not wander into unrelated modules. if the scope is the whole repo, take one directory they were last in and say which.

## delete, in order

1. unused exports, props, css classes, and branches.
2. wrappers with one caller. inline them.
3. comments that restate the next line, and commented-out blocks.
4. copy and decoration a person does not need for the task: generic heroes, extra cards, filler paragraphs, emoji icons.
5. abstractions waiting for a second caller who is not in the repo.

keep behavior a person can observe. if a deletion changes a response, a layout a user relies on, or a public api, put it back and name it under "kept".

spacing, type, and color you touch land on `TASTE.md` and the palate. do not restyle a file you are only supposed to thin out. a one-line alignment fix that removes a hack is in scope. a redesign is not.

## then

run the diff section of `../hm-taste/SKILL.md` on what remains. quote two lines you removed and one you kept.

## report

three lines:

1. what got deleted, with a before/after line count for the files you touched (`wc -l`).
2. what you kept, and the behavior that forced it.
3. the diff findings from taste.

do not call this a feature. do not offer a follow-up redesign in the same turn.
