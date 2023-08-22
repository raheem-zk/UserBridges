import Signup from "./component/Signup";
import Home from "./page/home";
import NavBar from "./component/header/Nav";
import Login from "./component/Login";
import Footer from "./component/footer/footer";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from "redux-persist";
import Logout from "./component/Logout";
import UserProfile from "./component/Profile";
let persistor = persistStore(store);

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path:'/profile',
        element:<UserProfile/>
      },
      {
        path:'/logout',
        element:<Logout/>
      }
    ]
  }
])

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  )

}

export default App;

