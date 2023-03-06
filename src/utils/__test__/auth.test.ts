import { beforeEach, describe, expect, it } from 'vitest'
import { clearLS, getAccessTokenFromLS, getRefreshTokenFromLS, setAccessTokenToLS, setRefreshTokenToLS } from '../auth'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTUzMjdkNmQ3YzYyMDM0MDg1MTEzMyIsImVtYWlsIjoibWluaGh1eXZ1dHJhbkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTAxVDA2OjAxOjIyLjE5MloiLCJpYXQiOjE2Nzc2NTA0ODIsImV4cCI6MTY3NzY1MDQ4N30.r8H0eDWUhG2rtwQdQdALQcaCeJg0fryOZJE4_jlPq3k'
const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTUzMjdkNmQ3YzYyMDM0MDg1MTEzMyIsImVtYWlsIjoibWluaGh1eXZ1dHJhbkBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTAxVDA2OjAxOjIyLjE5MloiLCJpYXQiOjE2Nzc2NTA0ODIsImV4cCI6MTY3NzY1NDA4Mn0.NYh2TSuShglyAppTxk9pJG2RP2ZYZmGoqQUhKoIOoF8'
const profile =
  '{"_id": "63e5327d6d7c620340851133","roles": ["User"],"email": "minhhuyvutran@gmail.com","createdAt": "2023-02-09T17:50:53.708Z","updatedAt": "2023-02-27T07:06:45.816Z","__v": 0,"address": "abc","date_of_birth": "1996-01-03T17:00:00.000Z","name": "huy","phone": "09032040195","avatar": "fb1e4071-48cd-41c5-841b-70bd866755d9.jpg"}'

beforeEach(() => {
  localStorage.clear()
})

describe('access_token', () => {
  it('access_token', () => {
    setAccessTokenToLS(access_token)
    expect(getAccessTokenFromLS()).toBe(access_token)
  })
})

describe('refresh_token', () => {
  it('refresh_token', () => {
    setRefreshTokenToLS(refresh_token)
    expect(getRefreshTokenFromLS()).toBe(refresh_token)
  })
})

describe('clearLS', () => {
  it('clear LS', () => {
    clearLS()
    expect(getAccessTokenFromLS()).toBe('')
    expect(getRefreshTokenFromLS()).toBe('')
  })
})
