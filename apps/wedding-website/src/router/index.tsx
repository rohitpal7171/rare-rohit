import { createBrowserRouter } from 'react-router-dom'

import { CeremonyPage } from '@app/pages/CeremonyPage'
import { Home } from '@app/pages/Home'
import { NotFound } from '@app/pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/ceremony/:slug',
    element: <CeremonyPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
