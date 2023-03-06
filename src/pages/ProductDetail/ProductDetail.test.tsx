import { delay, logScreen, renderWithRouter } from 'src/utils/testUtils'
import { describe, test, expect } from 'vitest'

describe('Product Detail', () => {
  test('Render UI ProductDetail', async () => {
    renderWithRouter({
      route: '/Điện-thoại-Apple-Iphone-12-64GB--Hàng-chính-hãng-VNA-i-60afb1c56ef5b902180aacb8'
    })
    await delay(1000)
    expect(document.body).toMatchSnapshot()
  })
})
