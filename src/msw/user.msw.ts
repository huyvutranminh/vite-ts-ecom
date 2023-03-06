import { rest } from 'msw'
import config from 'src/constants/configs'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { access_token_1s } from './auth.msw'

const meRes = {
  message: 'Lấy người dùng thành công',
  data: {
    _id: '63e5327d6d7c620340851133',
    roles: ['User'],
    email: 'minhhuyvutran@gmail.com',
    createdAt: '2023-02-09T17:50:53.708Z',
    updatedAt: '2023-02-27T07:06:45.816Z',
    address: 'abc',
    date_of_birth: '1996-01-03T17:00:00.000Z',
    name: 'huy',
    phone: '09032040195',
    avatar: 'fb1e4071-48cd-41c5-841b-70bd866755d9.jpg'
  }
}

const expiredRes = {
  message: 'Lỗi',
  data: {
    message: 'Token hết hạn',
    name: 'EXPIRED_TOKEN'
  }
}

const selfReq = rest.get(`${config.baseUrl}me`, (req, res, ctx) => {
  const access_token = req.headers.get('authorization')
  if (access_token === access_token_1s) {
    return res(ctx.status(HttpStatusCode.Unauthorized), ctx.json(expiredRes))
  }
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(meRes))
})

const userRequests = [selfReq]

export default userRequests
