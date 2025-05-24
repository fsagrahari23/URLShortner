import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Provider } from 'react-redux';
import { routeTree } from './routing/routeTree.gen'
import { store } from './redux/store'

const queryClient = new QueryClient()

const router = createRouter({ routeTree,context:{
  queryClient,
  store
} })
createRoot(document.getElementById('root')).render(
 <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
)
