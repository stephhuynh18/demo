# Description

This repo: _ demonstrates three scenarios. A ipfs-http-client where the ipfs instance is:
1. Ipfs-core + ipfs-http-server (latest)
2. Ipfd-ctl + go-ipfs (latest)
3. @ceramicnetwork/ipfs-daemon (v1.2.9)

When executing a dag.put and a dag.get (Node v6.13.1 + esm settings)
1. Works
2. Works
3. I’m getting the error that is found in the failing cas build logs 

```
err HTTPError: Failed to parse the JSON: SyntaxError: Unexpected token � in JSON at position 0
    at Object.errorHandler [as handleError] (file:///Users/stephaniehuynh/Github/codepad/node_modules/ipfs-http-client/esm/src/lib/core.js:75:15)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at async Client.fetch (/Users/stephaniehuynh/Github/codepad/node_modules/ipfs-utils/src/http.js:144:9)
    at async Object.put (file:///Users/stephaniehuynh/Github/codepad/node_modules/ipfs-http-client/esm/src/dag/put.js:27:19)
    at async main (file:///Users/stephaniehuynh/Github/codepad/lib/with-ceramic-ipfs-daemon.js:19:17) {
  response: Response {
    size: 0,
    timeout: 0,
    [Symbol(Body internals)]: { body: [PassThrough], disturbed: true, error: null },
    [Symbol(Response internals)]: {
      url: 'http://127.0.0.1:59312/api/v0/dag/put?store-codec=dag-cbor&input-codec=dag-cbor&hash=sha2-256',
      status: 400,
      statusText: 'Bad Request',
      headers: [Headers],
      counter: 0
    }
  }
}
```

I do not know what version our docker images use

I also have attempted to upgrade @ceramicnetwork/ipfs-daemon to v2.0.0-alpha.1
but I get this error: 
``` Cannot find module '@ceramicnetwork/ipfs-daemon' or its corresponding type declarations. ```

Looking in the corresponding node_module folder shows that its empty except bin
## How to Run

```sh
npm install
npm run build
node lib/with-go-ipfs.js
node lib/with-js-ipfs.js
node lib/with-ceramic-ipfs-daemon.js
```
