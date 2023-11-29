import Index from "./pages/Index/Index"
import CourseInfo from "./pages/CourseInfo/CourseInfo"
import Category from "./pages/Category/Category"
import ArticleInfo from "./pages/ArticleInfo/ArticleInfo"
import Courses from "./pages/Courses/Courses"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Articles from "./pages/Articles/Articles"
import Contact from "./pages/Contact/Contact"
import Search from "./pages/search/Search"
import Session from './pages/Session/Session'
import AdminPanel from './pages/AdminPanel/index'
import Users from "./pages/AdminPanel/Users/Users"
import AdminCourses from './pages/AdminPanel/Courses/Courses'
import Menus from "./pages/AdminPanel/Menus/Menus"
import AdminArticles from './pages/AdminPanel/Articles/Articles'
import AdminCategory from './pages/AdminPanel/Category/Category'
import AdminContacts from './pages/AdminPanel/Contact/Contact'
import Sessions from './pages/AdminPanel/Sessions/Sessions'
const routes = [
    { path: '/', element: <Index /> },
    { path: '/course-info/:courseName', element: <CourseInfo /> },
    { path: '/category-info/:categoryName/:page', element: <Category /> },
    { path: '/article-info/:articleName', element: <ArticleInfo /> },
    { path: '/articles/:page', element: <Articles /> },
    { path: '/courses/:page', element: <Courses /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/contact', element: <Contact /> },
    { path: '/search/:searchValue', element: <Search /> },
    { path: '/:courseName/:sessionID', element: <Session /> },
    { path: '/p-admin/*', element: <AdminPanel /> ,children:[
        { path: 'users', element: <Users /> }, 
        { path: 'courses', element: <AdminCourses/> }, 
        { path: 'menus', element: <Menus/> }, 
        { path: 'articles', element: <AdminArticles/> }, 
        { path: 'category', element: <AdminCategory/> }, 
        { path: 'contacts', element: <AdminContacts/> }, 
        { path: 'sessions', element: <Sessions/> }, 
    ]},

]

export default routes