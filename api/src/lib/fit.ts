import FitParser from 'fit-file-parser'

export const parse = async (buffer: ArrayBuffer): Promise<Record<string, string>> => {
  return new Promise((fullfil, reject) => {
    const fitParser = new FitParser({ speedUnit: 'km/h' })
    fitParser.parse(buffer, (err: never, data: never) => {
      if (err) reject(err)
      else fullfil(data)
    })
  })
}