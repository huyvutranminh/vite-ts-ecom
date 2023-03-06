import { screen, waitFor, fireEvent } from '@testing-library/react'
import path from 'src/constants/path'
import { renderWithRouter } from 'src/utils/testUtils'
import { describe, it, expect, beforeAll } from 'vitest'
import matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

describe('Login', () => {
  let emailInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  let submitButton: HTMLButtonElement
  beforeAll(async () => {
    renderWithRouter({ route: path.login })
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument()
    })
    emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement
    submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement
  })

  it('show required validation error', async () => {
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(screen.queryByText('Email là bắt buộc')).toBeTruthy()
      expect(screen.queryByText('Password là bắt buộc')).toBeTruthy()
    })
  })

  it('show format validation error', async () => {
    fireEvent.change(emailInput, {
      target: {
        value: 'test@gmail'
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: '123'
      }
    })
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(screen.queryByText('Email không đúng định dạng')).toBeTruthy()
      expect(screen.queryByText('Độ dài từ 6 - 160 ký tự')).toBeTruthy()
    })
  })

  it('not showing error given all fields are correctly filled', async () => {
    fireEvent.change(emailInput, {
      target: {
        value: 'test@gmail.com'
      }
    })
    fireEvent.change(passwordInput, {
      target: {
        value: '123456'
      }
    })

    //chung minh khong tim ra text hay element thi nen dung query hon la find hay get
    await waitFor(() => {
      expect(screen.queryByText('Email không đúng định dạng')).toBeNull()
      expect(screen.queryByText('Độ dài từ 6 - 160 ký tự')).toBeNull()
    })

    fireEvent.submit(submitButton)
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Homepage')
    })
  })
})
