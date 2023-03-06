import { rest } from 'msw'
import config from 'src/constants/configs'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

export const access_token_1s =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTUzMjdkNmQ3YzYyMDM0MDg1MTEzMyIsImVtYWlsIjoibWluaGh1eXZ1dHJhbkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTAxVDA3OjQyOjAwLjg0NloiLCJpYXQiOjE2Nzc2NTY1MjAsImV4cCI6MTY3NzY1NjUyMX0.M1KR6XWEbr8_kwTINOzhgsvgQZiiSqGu_PHtj7vv0dA'
export const refresh_token_1000 =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTUzMjdkNmQ3YzYyMDM0MDg1MTEzMyIsImVtYWlsIjoibWluaGh1eXZ1dHJhbkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTAxVDA3OjQyOjIwLjIxNVoiLCJpYXQiOjE2Nzc2NTY1NDAsImV4cCI6MTY5MTQ4MDU0MH0.bB9eTqfESAmT5B-4-FJm9tuCxyi4314yeb8OvgZ8gpI'
export const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTUzMjdkNmQ3YzYyMDM0MDg1MTEzMyIsImVtYWlsIjoibWluaGh1eXZ1dHJhbkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTAyVDA5OjE2OjE2LjA2MloiLCJpYXQiOjE2Nzc3NDg1NzYsImV4cCI6MTY3ODM1MzM3Nn0.rmfgl3EdTvSIMv_dAqWgDicP6vhqvJoGStN3U7AD-UI'

const loginRes = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTUzMjdkNmQ3YzYyMDM0MDg1MTEzMyIsImVtYWlsIjoibWluaGh1eXZ1dHJhbkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTAyVDA2OjMwOjQwLjk5M1oiLCJpYXQiOjE2Nzc3Mzg2NDAsImV4cCI6MTY3ODM0MzQ0MH0.wuIGMOW8C1V9VccB2hQMk20zyDx4mAfIi3HTf23XOGE',
    expires: 604800,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTUzMjdkNmQ3YzYyMDM0MDg1MTEzMyIsImVtYWlsIjoibWluaGh1eXZ1dHJhbkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTAyVDA2OjMwOjQwLjk5M1oiLCJpYXQiOjE2Nzc3Mzg2NDAsImV4cCI6MTY4NjM3ODY0MH0.5zj505fjSmExg3iIngHDmB8Bv1TBqPPnmEMqOmhsqLA',
    expires_refresh_token: 8640000,
    user: {
      _id: '63e5327d6d7c620340851133',
      roles: ['User'],
      email: 'minhhuyvutran@gmail.com',
      createdAt: '2023-02-09T17:50:53.708Z',
      updatedAt: '2023-02-27T07:06:45.816Z',
      __v: 0,
      address: 'abc',
      date_of_birth: '1996-01-03T17:00:00.000Z',
      name: 'huy',
      phone: '09032040195',
      avatar: 'fb1e4071-48cd-41c5-841b-70bd866755d9.jpg'
    }
  }
}

const refreshTokenRes = {
  message: 'Refresh Token thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTUzMjdkNmQ3YzYyMDM0MDg1MTEzMyIsImVtYWlsIjoibWluaGh1eXZ1dHJhbkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTAyVDA3OjEwOjI3LjcyNFoiLCJpYXQiOjE2Nzc3NDEwMjcsImV4cCI6MTY3Nzc0MTAyOH0.LyJ5mqeSAZisEdl1VJ6HZQizwyXti0imZABIwnZM564'
  }
}

const loginRequest = rest.post(`${config.baseUrl}login`, (req, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(loginRes))
})

const refreshToken = rest.post(`${config.baseUrl}refresh-access-token`, (req, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(refreshTokenRes))
})

const authRequests = [loginRequest, refreshToken]

export default authRequests
