import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'

import { logScreen, renderWithRouter } from './utils/testUtils'
import path from './constants/path'

expect.extend(matchers)

describe('App', () => {
  it('app renders and navigates', async () => {
    //Cach 1
    // render(
    //   <BrowserRouter>
    //     <App />
    //   </BrowserRouter>
    // )
    //Cach 2
    // render(<App />, { wrapper: BrowserRouter })
    //Cach 3
    const { user } = renderWithRouter()

    //homepage
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Homepage')
    })

    //navigate to log in
    await user.click(screen.getByText('Đăng nhập'))
    await waitFor(() => {
      expect(screen.queryByText('Bạn chưa có tài khoản?')).toBeInTheDocument()
      expect(document.querySelector('title')?.textContent).toBe('Login')
    })
    // screen.debug(document.body.parentElement as HTMLElement, 99999999)
  })

  it('not found', async () => {
    const badRoute = '/some/bad/route'
    renderWithRouter({ route: badRoute })

    await waitFor(() => {
      expect(screen.queryByText('Page Not Found')).toBeInTheDocument()
    })
    // await logScreen()
  })

  it('render register page', async () => {
    renderWithRouter({ route: path.register })

    await waitFor(() => {
      expect(screen.queryByText('Bạn đã có tài khoản?')).toBeInTheDocument()
    })
    await logScreen()
  })
})
