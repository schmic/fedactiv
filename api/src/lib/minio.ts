import { Client, ClientOptions } from 'minio'

const { MINIO_ACCESS_KEY, MINIO_SECRET_KEY } = process.env

if (!MINIO_ACCESS_KEY || !MINIO_SECRET_KEY)
  throw new Error('Missing MINIO_ACCESS/SECRET_KEY, please check environment.')

const options: ClientOptions = {
  endPoint: 'minio',
  port: 9000,
  useSSL: false,
  accessKey: MINIO_ACCESS_KEY,
  secretKey: MINIO_SECRET_KEY
}

type bucketNameList = 'fitfile'

export const minio = new Client(options)

export const upload = async (bucketName: bucketNameList, fileName: string, buffer: Buffer) => {
  return await minio.putObject(bucketName, `${fileName}`, buffer)
}

minio.bucketExists('fitfile', (err, exists) => {
  if (err) throw err
  if (!exists) {
    minio.makeBucket('fitfile', '', (err) => {
      if (err) throw err
    })
  }
})
