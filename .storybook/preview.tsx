import { Elements } from '@stripe/react-stripe-js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from '../src/contexts/app.context'
import ErrorBoundary from '../src/components/ErrorBoundary'
import React from 'react'
import '../src/index.css'
import { loadStripe } from '@stripe/stripe-js'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    },
    mutations: {
      retry: false
    }
  },
  logger: {
    log: console.log,
    warn: console.warn,
    //no more errs on the console
    error: () => null
  }
})

const stripePromise = loadStripe(
  'pk_test_51MeuNZEU2DgjuENCu4ADsInm79plOpzUjcCrZvi4cQjzN01UDng460IWOaiQiMECHM7ApaGXreSWPz4ucuB3TI2h00iHcYZQcj'
)

export const decorators = [
  (Story) => (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <HelmetProvider>
            {/* <Provider store={store}> */}
            <Elements stripe={stripePromise}>
              <ErrorBoundary>
                <Story />
              </ErrorBoundary>
            </Elements>
            {/* </Provider> */}
          </HelmetProvider>
        </AppProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
]
