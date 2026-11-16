# lean-backend

boring on purpose. use this for apis, jobs, scripts, data paths, and the server half of a fullstack change. the ui palates do not style these files. `TASTE.md` still binds them.

## shape

- one directory per domain noun the repo already uses (`order`, `invoice`, `session`). read the tree before coining a new noun.
- a file is functions. export what callers need. order the file as types, the public function, then the helpers that function uses.
- split a file past ~200 lines by noun. `orders/create.ts` is a split. `services/orderService.ts` wrapping one function is a wrapper.
- a function takes its inputs as arguments. it does not fetch a database from a container, a singleton, or a hidden context.
- no new class unless the repo is already written as classes, or the platform requires one. an `Error` subclass is fine.

## errors

at a trust boundary (http handler, queue consumer, cli, job runner) catch once and return:

```ts
type Failure = {
  code: string;
  message: string;
  details?: Record<string, string>;
};
```

- `code` is stable and lowercase: `order_not_found`, `email_invalid`. callers branch on `code`.
- `message` tells a human the next action.
- `details` is a flat string map. no nested objects, no stack traces, no raw driver text.
- inside the boundary, throw `Error` or a subclass that carries `code`. do not return `null` for failure and a value for success from the same function.
- log at the boundary, include `code`, then return the failure. an empty `catch`, or a `catch` that logs and continues, fails the check.

## data

- validate at the boundary. inside it, trust the type. do not re-validate the same field three calls down.
- names use the domain: `reserveSeat`, not `handleData` or `processItem`.
- keep the repo's existing id type. if it has not picked one, ids are strings at the boundary.
- store instants in utc. format them where a person reads them.
- a status is a union of the states that exist. no `any`, no unchecked json, no `"1"` standing in for active.

## control

- a new dependency has to replace code you would otherwise own past ~50 lines, and the prep note has to say so. prefer the http client, test runner, and database driver already in the manifest, then the standard library.
- early returns and straight-line code over callback stacks and inheritance.
- a cache, a queue, a bus, or a plugin loader is a feature. if the task did not ask for it, it stays out.
- configuration is an argument, or the repo's existing env loader. deep modules do not read `process.env`.

## banned

- `utils.ts`, `helpers.ts`, or `common/` as a drawer
- a `*Service`, `*Manager`, or `*Factory` with one implementation and one caller
- an abstract base class with a single subclass
- a `catch` that returns `undefined`
- logging a secret, a token, a raw payment number, or a full request body
- a second framework in a repo that already has one
- a comment that restates the next line
- dead flags, unused columns "for later", and exports with no caller
