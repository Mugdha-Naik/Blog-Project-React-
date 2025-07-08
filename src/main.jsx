import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './store/store.js'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout, Login } from './components/Index.js'
import Home from './pages/Home.jsx'
import AddPost from './pages/AddPost.jsx'
import Signup from './pages/Signup.jsx'
import EditPost from './pages/EditPost.jsx'
import AllPost from './pages/AllPost.jsx'
import Post from './pages/Post.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
        {
          path: '/',
          element: <Home/>,
        },
        {
          path: '/login',
          element:(
            <AuthLayout authentication={false}>
              <Login/>
            </AuthLayout>
          )
        },
        {
          path: '/signup',
          element: (
            <AuthLayout authentication={false}>
              <Signup/>
            </AuthLayout>
          )
        },
        {
          path: '/all-post',
          element: (
             <AuthLayout authentication = {true}>    {/*or we can also say authentication={" "} its the same thing*/}
              <AllPost/>
            </AuthLayout>
          )
        },
        {
          path: '/add-post',
          element: (
            <AuthLayout authentication={true}>
                <AddPost/>
            </AuthLayout>
          )
        },
        {
            path: '/edit-post/:slug',
            element: (
              <AuthLayout authentication={true}>
                  <EditPost/>
              </AuthLayout>
            )
        },
        {
          path: '/post/:slug',
          element: <Post />,
        },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
