---
name: hm-taste
description: >-
  Critiques running ui with desktop and mobile screenshots and reads
  the git diff for default AI habits, then fixes them before anything
  is called done. Use for /hm-taste, the fourth phase of /hm-mode, or
  any claim that a screen or a change is finished.
disable-model-invocation: true
---

# hm-taste

the gate. a green `tsc`, build, or test run does not pass it. this phase looks, then edits, then looks again.

## ui evidence

skip this section when the diff has no screen, css, or copy a person sees. say that you skipped it.

1. Start the app with the command mise named. do not invent a second server.
2. Open each changed screen at 1280×800 and at 390×844.
3. Capture a screenshot of each. use the environment's browser tools. if those are missing and playwright is already a dependency, use it. otherwise use a headless browser already on the machine.
4. If no capture tool exists, say which one you looked for, and inspect the running page another way you can still see (a dumped accessibility tree, computed styles). a refusal to look fails the phase.
5. Judge the image against `TASTE.md` and the palate, in order: hierarchy, spacing, alignment, contrast, type, motion, empty/loading/error, banned defaults.
6. Fix file-level defects. capture again. stop when the image matches, or when a remaining defect is a product choice. name that choice.

write the screenshot paths in the reply.

## diff evidence

1. Read `git diff` and the untracked files, line by line.
2. Mark defaults: a generic name (`data`, `item`, `handleClick` with no domain), an unused prop, a one-caller wrapper, a color or radius off the palate, vague copy, a dead style, a comment that restates the code, a swallowed error.
3. Fix at least two when two exist. if fewer than two exist, quote the lines you suspected and why they stayed.
4. Read the diff again after the fixes. the second read is part of the phase.

## gate

the phase is open until both reads are done and the fixes are in the tree. do not start plate before that. do not describe the work as finished in this phase.
