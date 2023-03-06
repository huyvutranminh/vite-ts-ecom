import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect } from 'react'
import { LocalStorageEventTarget } from './utils/auth'
import { HelmetProvider } from 'react-helmet-async'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from './utils/stripe/stripe.utils'
import { AppContext } from './contexts/app.context'
import ErrorBoundary from './components/ErrorBoundary'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  const routeElements = useRouteElements()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)

    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <HelmetProvider>
      {/* <Provider store={store}> */}
      <Elements stripe={stripePromise}>
        <ErrorBoundary>
          {routeElements}
          <ToastContainer />
        </ErrorBoundary>
      </Elements>
      {/* </Provider> */}

      <ReactQueryDevtools initialIsOpen={false} />
    </HelmetProvider>
  )
}

export default App
