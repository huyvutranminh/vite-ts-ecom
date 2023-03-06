import { describe, it, expect } from 'vitest'
import { logScreen, renderWithRouter } from 'src/utils/testUtils'
import path from 'src/constants/path'
import { setAccessTokenToLS } from 'src/utils/auth'
import { access_token } from 'src/msw/auth.msw'
import { waitFor } from '@testing-library/react'

describe('Profile', () => {
  it('show profile', async () => {
    setAccessTokenToLS(access_token)
    const { container } = renderWithRouter({ route: path.profile })

    await logScreen()
    await waitFor(() => {
      expect((container.querySelector('form input[placeholder="Tên"]') as HTMLInputElement).value).toBe('huy')
    })
  })
})
