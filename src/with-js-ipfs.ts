
import { create as createIpfsClient } from 'ipfs-http-client'
import { create as createCore } from 'ipfs-core'
import getPort from 'get-port'
import { HttpApi } from 'ipfs-http-server'


async function main() {
  const swarmPort = await getPort()
  const apiPort = await getPort()
  const gatewayPort = await getPort()


  const ipfsCore = await createCore(
    {
      start: true,
      config: {
        Addresses: {
          Swarm: [`/ip4/127.0.0.1/tcp/${swarmPort}`],
          Gateway: `/ip4/127.0.0.1/tcp/${gatewayPort}`,
          API: `/ip4/127.0.0.1/tcp/${apiPort}`,
        },
        Bootstrap: [],
      },
    },
  )

  const ipfsServer = new HttpApi(ipfsCore)
  await ipfsServer.start()

  const ipfs = await createIpfsClient({
    host: '127.0.0.1',
    port: apiPort,
    timeout: 10000,
  })

  const cid = await ipfs.dag.put({ test: 'test' })

  await ipfs.dag.get(cid).then(console.log)
}

main()
  .then(() => {
    console.log('FINISHED')
    process.exit(0)
  })
  .catch((err) => {
    console.log('🚀 ~ file: stuff.js ~ line 57 ~ main ~ err', err)
    process.exit(1)
  })
