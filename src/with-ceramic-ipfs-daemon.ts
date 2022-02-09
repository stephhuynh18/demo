
import { create as createIpfsClient } from 'ipfs-http-client'
import getPort from 'get-port'
import { IpfsDaemon } from "@ceramicnetwork/ipfs-daemon";


async function main() {
  const apiPort = await getPort()

  const ipfsDaemon = await IpfsDaemon.create({
      ipfsEnableApi: true, 
      ipfsEnableGateway: true, 
      ceramicNetwork: 'local', 
      ipfsPath: 'temp',
      ipfsApiPort: apiPort
  })
  await ipfsDaemon.start()


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
