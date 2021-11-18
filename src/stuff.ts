import { encodePayload, toJWSPayload } from 'dag-jose-utils';
import { ES256KSigner, createJWS } from 'did-jwt';
import { swarmConnect, withFleet } from './ipfs-util.js';

withFleet(2, async ([ipfs1, ipfs2]) => {
  await swarmConnect(ipfs1, ipfs2);

  // NOT USING DAG JOSE CODEC
  const regularContent = { test: 123 };
  const regularCID = await ipfs1.dag.put(regularContent);

  const ipfs1GetRegularCID = await ipfs1.dag.get(regularCID);
  console.log(ipfs1GetRegularCID.value);

  const ipfs2GetRegularCID = await ipfs2.dag.get(regularCID);
  console.log(ipfs2GetRegularCID.value);

  const signer = ES256KSigner(
    '278a5de700e29faae8e40e366ec5012b5ec63d36ec77e8a2417154cc1d25383f'
  );
  const payloadBlock = await encodePayload({ secret: 'not a secret' });
  const jws = await createJWS(toJWSPayload(payloadBlock), signer);
  const dagJoseCID = await ipfs1.dag.put(jws, {
    format: 'dag-jose',
    hashAlg: 'sha2-256',
  });

  const ipfs1GetDagJoseCID = await ipfs1.dag.get(dagJoseCID);
  console.log(
    '🚀 ~ file: ceramic.test.ts ~ line 81 ~ awaitwithFleet ~ ipfs1GetDagJoseCID',
    ipfs1GetDagJoseCID
  );

  const ipfs1Peers = await ipfs1.swarm.peers();
  console.log(
    '🚀 ~ file: stuff.ts ~ line 34 ~ withFleet ~ ipfs1Peers',
    ipfs1Peers
  );
  const ipfs2Peers = await ipfs2.swarm.peers();
  console.log(
    '🚀 ~ file: stuff.ts ~ line 39 ~ withFleet ~ ipfs2Peers',
    ipfs2Peers
  );

  const ipfs2GetDagJoseCID = await ipfs2.dag.get(dagJoseCID);
  console.log(
    '🚀 ~ file: ceramic.test.ts ~ line 87 ~ awaitwithFleet ~ ipfs2GetDagJoseCID',
    ipfs2GetDagJoseCID
  );
})
  .then(() => console.log('finished'))
  .catch((err) => {
    console.log('error', err);
  });
