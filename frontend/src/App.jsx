// firstly, Don't get overwhelmed and if you are then go with client-easy.
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import "./app.css"
import Dashboard from "./pages/Dashboard"
import AddCourseForm from "./components/AddCourseForm"
import PurchasedCourse from "./pages/PurchasedCourse"
import AdminSignupPage from "./pages/AdminSignupPage"
function App() {

  const router = createBrowserRouter([
    {
        path : "/",
        element : <Home/>
    },
    {
        path : "signup",
        element : <Signup/>
    },
    {
      path : "purchased",
      element : <PurchasedCourse/>
    },
    {
      path : "admin",
      element : <Dashboard/>
    },
    {
      path : "admin/signup",
      element : <AdminSignupPage/>
    }
])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
