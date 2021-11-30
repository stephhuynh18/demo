import { create as createIPFS } from 'ipfs-core';
import * as dagJose from 'dag-jose';

const stuff = async () => {
  const ipfs = await createIPFS();

  console.log();
  console.log('START\n');

  const regularContent = { test: '123' };
  const cid1 = await ipfs.dag.put(regularContent);

  const linkedContent = { link: cid1 };

  const cid2 = await ipfs.dag.put(linkedContent);

  const full = await ipfs.dag.get(cid2);
  console.log('expected', linkedContent);
  console.log('received', full.value);
  console.log();

  const atPath = await ipfs.dag.get(cid2, { path: '/link' });
  console.log('expected', regularContent);
  console.log('recived', atPath.value);
  console.log();
};

stuff().then(() => console.log('END'));
