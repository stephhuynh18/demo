import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import { default as KeyResolver } from 'key-did-resolver';
import { randomBytes } from '@stablelib/random';

import { create as createIPFS } from 'ipfs-core';
import type { IPFS } from 'ipfs-core';
import * as dagJose from 'dag-jose';

async function addSignedObject(ipfs: IPFS, did: DID, payload: any) {
  // sign the payload as dag-jose
  const { jws, linkedBlock } = await did.createDagJWS(payload);
  // put the JWS into the ipfs dag
  const jwsCid = await ipfs.dag.put(jws, {
    format: dagJose.name,
    hashAlg: 'sha2-256',
  });

  // put the payload into the ipfs dag
  await ipfs.block.put(linkedBlock, {
    format: dagJose.name,
    mhtype: 'sha2-256',
    version: jws.link?.version,
  });
  return jwsCid;
}

const stuff = async () => {
  const ipfs = await createIPFS({ ipld: { codecs: [dagJose] } });

  // generate a seed, used as a secret for the DID
  const seed = randomBytes(32);

  // create did instance
  const provider = new Ed25519Provider(seed);
  const did = new DID({ provider, resolver: KeyResolver.getResolver() });
  await did.authenticate();
  console.log('Connected with DID:', did.id, '\n');

  // Create our first signed object
  const cid1 = await addSignedObject(ipfs, did, { hello: 'world' });

  // Log the DagJWS:
  console.log('dagJWS', (await ipfs.dag.get(cid1)).value, '\n');
  // > {
  // >   payload: "AXESIHhRlyKdyLsRUpRdpY4jSPfiee7e0GzCynNtDoeYWLUB",
  // >   signatures: [{
  // >     signature: "h7bHmTaBGza_QlFRI9LBfgB3Nw0m7hLzwMm4nLvcR3n9sHKRoCrY0soWnDbmuG7jfVgx4rYkjJohDuMNgbTpEQ",
  // >     protected: "eyJraWQiOiJkaWQ6MzpiYWdjcWNlcmFza3hxeng0N2l2b2tqcW9md295dXliMjN0aWFlcGRyYXpxNXJsem4yaHg3a215YWN6d29hP3ZlcnNpb24taWQ9MCNrV01YTU1xazVXc290UW0iLCJhbGciOiJFUzI1NksifQ"
  // >   }],
  // >   link: CID(bafyreidykglsfhoixmivffc5uwhcgshx4j465xwqntbmu43nb2dzqwfvae)
  // > }

  // Log the payload:
  await ipfs.dag
    .get(cid1, { path: '/link' })
    .then((b) => console.log(b.value, '\n'));
  // > { hello: 'world' }
};

stuff().then(() => console.log('finished'));
