---
name: hm-prep
description: >-
  Designs the smallest data model, file tree, and module plan for a
  change, and rejects new dependencies and single-caller abstractions.
  Use for /hm-prep, the second phase of /hm-mode, or before writing
  code for a non-trivial task.
disable-model-invocation: true
---

# hm-prep

the smallest plan that can satisfy the three mise bullets. this phase writes the plan into the reply. it does not add a markdown doc to the repo, and it does not edit code yet.

## inputs

the mise bullets, `TASTE.md`, and the active palate. if mise did not run, do it before this.

## plan

write these four blocks. keep names that already exist in the repo.

```
model
- TypeName: field, field

tree
- path/to/file: the one reason it exists

modules
- caller -> function: what it returns

dependencies
- none
```

rules for the blocks:

- the model holds only fields the task reads or writes. optional fields need a reason in four words.
- the tree prefers edits to existing files. a new file needs a noun-sized reason. two new files that only call each other collapse into one.
- one function with one caller stays inline at the call site. do not plan a wrapper, factory, manager, or context for it.
- `dependencies` is `none`, or one package name plus the sentence "replaces more than 50 lines we would own" or "already imported by <file>". a package that is not already in the manifest fails the second test unless the first is true.

## fullstack

ui files name the ui palate's components. server files name functions and the `Failure` shape from `lean-backend`. do not plan a shared "framework" between them. the boundary is the request and the response.

## gate

every path cook will create appears under `tree`. if a path is missing, add it here before any edit. if the plan needs a product choice no file can answer (a name, a price, a permission), ask once, with the options in a sentence. otherwise start cook.
