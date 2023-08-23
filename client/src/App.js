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
import AdminNavBar from "./component/admin/header/navbar";
import AdminHomePage from "./component/admin/Home";
import AdminLogin from "./component/admin/login";
import AdminLogout from "./component/admin/logout";
import AdminUsersPage from "./component/admin/userMengement/AdminUsersPage";
import Adduser from "./component/admin/userMengement/Adduser";
import Viewuserdetails from "./component/admin/userMengement/Viewuserdetails";
import UserProfileEditPage from "./component/admin/userMengement/Edituser";
import ChangePassword from "./component/user/ChangePassword";

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
const AdminLayout = ()=>{
  return (
    <>
      <AdminNavBar/>
      <Outlet/>
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
  },
  {
    path:'/admin',
    element:<AdminLayout/>,
    children:[
      {
        path:'/admin',
        element:<AdminHomePage/>
      },
      {
        path:'login',
        element:<AdminLogin/>
      },
      {
        path:'logout',
        element:<AdminLogout/>
      },
      {
        path:'users',
        element:<AdminUsersPage/>,
      },
      {
        path:'adduser',
        element: <Adduser/>
      },
      {
        path:'viewuserdetails/:id',
        element:< Viewuserdetails/>
      },
      {
        path:'edituser/:id',
        element: <UserProfileEditPage/>
      },
      {
        path: 'editpassword/:id',
        element: <ChangePassword/>
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

