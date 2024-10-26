// firstly, Don't get overwhelmed and if you are then go with client-easy.
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import "./app.css"
import Dashboard from "./pages/Dashboard"
import PurchasedCourse from "./pages/PurchasedCourse"
import AdminSignupPage from "./pages/AdminSignupPage"
import PageLayout from "./pages/PageLayout"
import CoursePage from "./pages/CoursePage"
import Search from "./pages/Search"
import CourseDetail from "./pages/CourseDetail"
function App() {

  const router = createBrowserRouter([
    {
      element : <PageLayout/>,
      children : [{
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
    },
    {
      path : "coursePage/:courseid",
      element : <CoursePage/>
    },
    {
      path : "search",
      element : <Search/>
    }, 
    {
      path : "detail/:courseid",
      element : <CourseDetail/>
    }
  ]
    }
])

  return (
    
    <RouterProvider router={router}/>
  )
}

export default App
