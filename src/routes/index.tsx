import { Home } from '@/pages/Home'
import { SignIn } from '@/pages/SignIn'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/singn-in',
    element: <SignIn />,
  },
])
