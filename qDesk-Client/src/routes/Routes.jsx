import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import JobDetail from "../pages/JobDetail/JobDetail";
import AddJobs from "../pages/AddJobs/AddJobs";
import MyPostedJobs from "../pages/MyPostedJobs/MyPostedJobs";
import UpdateJob from "../pages/UpdateJob/UpdateJob";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import MyBids from "../pages/MyBids/MyBids";
import BidRequests from "../pages/BidRequests/BidRequests";
import AllJobs from "../pages/AllJobs/AllJobs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/job/:id",
        element: <PrivateRoute> <JobDetail></JobDetail> </PrivateRoute>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_SERVER_URL}/job/${params.id}`)
      },
      {
        path: "/add-jobs",
        element: <PrivateRoute>  <AddJobs></AddJobs> </PrivateRoute>
      },
      {
        path: "/my-posted-jobs",
        element: <PrivateRoute> <MyPostedJobs></MyPostedJobs> </PrivateRoute>
      },
      {
        path: "/update-job/:id",
        element: <PrivateRoute> <UpdateJob></UpdateJob> </PrivateRoute>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_SERVER_URL}/job/${params.id}`)
      },
      {
        path: "/my-bids",
        element: <PrivateRoute> <MyBids></MyBids> </PrivateRoute>,
      },
      {
        path: "/bid-requests",
        element: <PrivateRoute> <BidRequests></BidRequests> </PrivateRoute>,
      },
      {
        path: "/all-jobs",
        element: <AllJobs></AllJobs>
      },
    ]
  }
])

export default router;