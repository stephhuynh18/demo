
import { create as createIpfsClient } from 'ipfs-http-client'
import { path } from 'go-ipfs'
import * as Ctl from 'ipfsd-ctl'
import * as ipfsClient from 'ipfs-http-client'
import getPort from 'get-port'

const ipfsHttpModule = {
  create: (ipfsEndpoint: string) => {
    return ipfsClient.create({
      url: ipfsEndpoint,
    })
  },
}

const createFactory = () => {
  return Ctl.createFactory(
    {
      ipfsHttpModule,
    },
    {
      go: {
        ipfsBin: path(),
      },
    }
  )
}

async function main() {
  const swarmPort = await getPort()
  const apiPort = await getPort()
  const gatewayPort = await getPort()

  await createFactory().spawn({
    type: 'go',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore ipfsd-ctl uses own type, that is _very_ similar to Options from ipfs-core
    ipfsOptions:{
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
    disposable: true,
  })


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
