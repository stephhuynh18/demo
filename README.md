# Description

`ipfs.dag.get(cid)` should return the data stored at `cid`.

`ipfs.dag.get(cid, {path: "/aPath"})` should return the value of the key `aPath` that is found in the data stored at `cid`.

If the value associated with the key `aPath` is a `CID AKA childCID`, the data stored at `childCID` should be returned.

In this repo I demonstrate that instead of returning the data store at `childCID`, the actual `CID` is returned. This is not consistent with what was the original behavior (ipfs-core v0.7).

I believe that the problem lies with this line found here: https://github.com/ipfs/js-ipfs/blob/6178708aedf5ea86bf537862c08db49f5b8ea20b/packages/ipfs-core/src/utils.js#L248. The value is retrieved but `yield` is not called with it.

## How to Run

```sh
npm install
npm run build
node lib/withoutDagJose.js
```
