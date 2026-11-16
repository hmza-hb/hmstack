---
name: hm-plate
description: >-
  Checks edge states and microcopy, confirms the git tree is clean of
  scratch files, runs the repo's tests, and writes the short ship
  summary. Use for /hm-plate, the last phase of /hm-mode, or when
  finishing a change that already passed taste.
disable-model-invocation: true
---

# hm-plate

plating. the work already passed taste. this phase checks the edges, the words, and the tree, then says what changed and why it clears the bar.

## edges

for every new screen or endpoint, empty, loading, and error exist and use the same padding and type as the filled path. a spinner in an unstyled box fails. a handler that returns only the happy status fails.

an endpoint's error body is `{ code, message }` from the palate or from `TASTE.md`.

## copy

read every new string. sentence case. a button is a verb. an error names the next action. remove leftover lorem, "welcome to", and exclamation marks.

## tree

- `git status` lists only files the task meant to change.
- remove `console.log`, `debugger`, `.only`, and any scratch script this work added.
- run the test command and the lint command the repo already has. if it has neither, say so in the summary. do not add a test framework in this phase.
- fix failures that your diff caused. leave failures that already existed, and name them.

## summary

four lines, then stop:

1. the user's goal, in their words.
2. what changed (files, and the behavior a person can observe).
3. the palate, plus the defaults taste removed.
4. what you ran: test command, screenshot paths, or the capture gap you already stated in taste.

plate is the phase that may call the task done. the four lines are that call.
