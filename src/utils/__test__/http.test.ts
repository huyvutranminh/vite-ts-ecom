import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { beforeEach, describe, expect, it } from 'vitest'
import { setAccessTokenToLS, setRefreshTokenToLS } from '../auth'
import { Http } from '../http'
import { access_token_1s, refresh_token_1000 } from 'src/msw/auth.msw'

describe('http axios', () => {
  let http = new Http().instance
  beforeEach(() => {
    localStorage.clear()
    http = new Http().instance
  })
  it('call API', async () => {
    const res = await http.get('products')
    // console.log(res)
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
  it('Auth Request', async () => {
    await http.post('login', {
      email: 'minhhuyvutran@gmail.com',
      password: '654321'
    })
    const res = await http.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
  it('Refresh token', async () => {
    setAccessTokenToLS(access_token_1s)
    setRefreshTokenToLS(refresh_token_1000)
    const http = new Http().instance
    const res = await http.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
