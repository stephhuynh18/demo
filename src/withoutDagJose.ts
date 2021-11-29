import { create as createIPFS } from 'ipfs-core';
import * as dagJose from 'dag-jose';

const stuff = async () => {
  const ipfs = await createIPFS({ ipld: { codecs: [dagJose] } });

  const regularContent = { test: '123' };
  const cid1 = await ipfs.dag.put(regularContent);

  const linkedContent = { link: cid1 };

  const cid2 = await ipfs.dag.put(linkedContent);

  console.log((await ipfs.dag.get(cid2)).value, '\n');
  // {
  //    link: CID(bafyreiaomrabjvmvcmtr3fsbgpnd3nvbodqh6lexjf3ze4w4gyrxwntno4)
  // }

  console.log((await ipfs.dag.get(cid2, { path: '/link' })).value, '\n');
  // { test: '123' }

  console.log((await ipfs.dag.get(cid1)).value, '\n');
  // { test: '123' }
};

stuff().then(() => console.log('finished'));
