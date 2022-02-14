# Description

Uses Node v16.13.1

This repo demonstrates two scenarios. A ipfs-http-client (latest) where the ipfs instance is:
1. Ipfs-core + ipfs-http-server (latest)
2. ipfs-core (v0.12.2) + ipfs-http-server(v0.9.2)

Scenario 1 works

Scanario 2 fails with the following error

```
HTTPError: Failed to parse the JSON: SyntaxError: Unexpected token � in JSON at position 0
    at Object.errorHandler [as handleError] (---/codepad/node_modules/ipfs-http-client/esm/src/lib/core.js:75:15)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at async Client.fetch (---/codepad/node_modules/ipfs-http-client/node_modules/ipfs-utils/src/http.js:144:9)
    at async Object.put (---/codepad/node_modules/ipfs-http-client/esm/src/dag/put.js:27:19)
    at async example (---/codepad/lib/with-old-ipfs-core.js:31:17)
    at async main (---/codepad/lib/with-old-ipfs-core.js:8:5) {
  response: Response {
    size: 0,
    timeout: 0,
    [Symbol(Body internals)]: { body: [PassThrough], disturbed: true, error: null },
    [Symbol(Response internals)]: {
      url: 'http://127.0.0.1:52846/api/v0/dag/put?store-codec=dag-cbor&input-codec=dag-cbor&hash=sha2-256',
      status: 400,
      statusText: 'Bad Request',
      headers: [Headers],
      counter: 0
    }
  }
}
```

Should `ipfs-http-client` be compatible with older version of `ipfs-core`?

## How to Run

```sh
npm install
npm run build
node lib/with-old-ipfs-core.js
node lib/with-latest-ipfs-core.js
```
