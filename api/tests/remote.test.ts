import axios from 'axios'

const domain = 'fedactiv.schmic.eu'
const username = 'schmic'

const baseURL = `https://${domain}`
const api = axios.create({ baseURL })

// api.interceptors.request.use(
//   (config) => {
//     // const token = localStorage.getItem("aToken");
//     // if (token) {
//     //   config.headers["Authorization"] = "Bearer " + token;
//     // }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// it('checks availablity', async () => {
//   const resp = await api.get(`${baseURL}/.well-known/webfinger?resource=acct:${username}@${fqdn}`)
//   expect(resp.status).toBe(200)
// })

// describe('webfinger', () => {
//   it('can finger user', async () => {
//     const acct = `acct:${username}@${fqdn}`
//     const resp = await api.get(`${baseURL}/.well-known/webfinger?resource=${acct}`)

//     expect(resp.status).toBe(200)
//     expect(resp.data.subject).toBe(acct)
//   })
// })