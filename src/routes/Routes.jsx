import {
    createBrowserRouter,
} from "react-router";

import App from "../App";
import MyLayout from "../Layout/MyLayout";
import Home from "../Pages/Home";
import AllGroups from "../Pages/AllGroups";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import CreateGroup from "../Pages/CreateGroup";
import MyGroups from "../Pages/MyGroups";
import UpdateGroup from "../Pages/UpdateGroup";
import GroupDetails from "../Pages/GroupDetails";
import PrivateRoutes from "./PrivateRoutes";
import ErrorPage from "../Pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MyLayout/>,
    children:[
        {
            index: true,
            path:"/",
            element: <Home/>
        }
    ]
  },
  {
    path:"/login",
    element: <Login/>
  },
  {
    path:"/register",
    element: <Register/>
  },
  {
    path:"/allGroups",
    element: <AllGroups/>
  },
  {
    path:"/createGroup",
    element: <PrivateRoutes><CreateGroup/></PrivateRoutes>
  },
  {
    path:"/updateGroup/:id",
    element: <PrivateRoutes><UpdateGroup/></PrivateRoutes>
  },
  {
    path:"/myGroups",
    element: <PrivateRoutes><MyGroups/></PrivateRoutes>
  },
  {
    path:"/group/:id",
    element:<PrivateRoutes><GroupDetails/></PrivateRoutes>
  },
  {
    path:"*",
    element: <ErrorPage/>
  },

]);