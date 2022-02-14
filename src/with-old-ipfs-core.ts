
import { create as createIpfsClient } from 'ipfs-http-client'
import { create as createCore } from 'old-ipfs-core'
import getPort from 'get-port'
import { HttpApi } from 'old-ipfs-http-server'
import tmp from 'tmp-promise'



async function main() {
  const tmpFolder = await tmp.dir({ unsafeCleanup: true })
  await example(tmpFolder.path).finally(async () => {
    await tmpFolder.cleanup()
  })

}
async function example(repoPath: string) {
  const apiPort = await getPort()
  const ipfsCore = await createCore(
    {
      start: true,
      repo: `${repoPath}/ipfs${apiPort}/`,
      config: {
        Addresses: {
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
    console.log("🚀 ~ file: with-js-ipfs.ts ~ line 43 ~ err", err)
    process.exit(1)
  })
