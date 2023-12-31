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
import Session from "./pages/Session/Session"

import PAdminPrivate from "./Components/Privates/PAdminPrivate"
//admin panel
import AdminPanel from "./pages/AdminPanel/index"
import MainAdminPanel from "./pages/AdminPanel/Main/Main"
import Users from "./pages/AdminPanel/Users/Users"
import AdminCourses from "./pages/AdminPanel/Courses/Courses"
import Menus from "./pages/AdminPanel/Menus/Menus"
import AdminArticles from "./pages/AdminPanel/Articles/Articles"
import Draft from "./pages/AdminPanel/Draft/Draft"
import AdminCategory from "./pages/AdminPanel/Category/Category"
import AdminContacts from "./pages/AdminPanel/Contact/Contact"
import Sessions from "./pages/AdminPanel/Sessions/Sessions"
import Comments from "./pages/AdminPanel/Comments/Comments"
import Offs from "./pages/AdminPanel/Offs/Offs"
import Discounts from "./pages/AdminPanel/Discounts/Discounts"
import AdminTickets from "./pages/AdminPanel/Tickets/Tickets"

//user panel
import UserPanel from "./pages/UserPanel/Index"
import MainUserPanel from "./pages/UserPanel/Main/Main"
import Orders from "./pages/UserPanel/Orders/Orders"
import ViewOrder from "./pages/UserPanel/ViewOrder/ViewOrder"
import UserCourses from "./pages/UserPanel/Courses/Courses"
import UserTickets from "./pages/UserPanel/Tickets/Tickets"
import SendTicket from "./pages/UserPanel/Tickets/SendTicket"
import TicketAnswer from "./pages/UserPanel/Tickets/TicketAnswer"
import EditAccount from "./pages/UserPanel/EditAccount/EditAccount"
const routes = [
  { path: "/", element: <Index /> },
  { path: "/course-info/:courseName", element: <CourseInfo /> },
  { path: "/category-info/:categoryName/:page", element: <Category /> },
  { path: "/article-info/:articleName", element: <ArticleInfo /> },
  { path: "/articles/:page", element: <Articles /> },
  { path: "/courses/:page", element: <Courses /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/contact", element: <Contact /> },
  { path: "/search/:searchValue", element: <Search /> },
  { path: "/:courseName/:sessionID", element: <Session /> },
  {
    path: "/p-admin/*",
    element: (
      <PAdminPrivate>
        <AdminPanel />
      </PAdminPrivate>
    ),
    children: [
      { path: "", element: <MainAdminPanel /> },
      { path: "users", element: <Users /> },
      { path: "courses", element: <AdminCourses /> },
      { path: "menus", element: <Menus /> },
      { path: "articles", element: <AdminArticles /> },
      { path: "articles/draft/:articleName", element: <Draft /> },
      { path: "category", element: <AdminCategory /> },
      { path: "contacts", element: <AdminContacts /> },
      { path: "sessions", element: <Sessions /> },
      { path: "comments", element: <Comments /> },
      { path: "offs", element: <Offs /> },
      { path: "discounts", element: <Discounts /> },
      { path: "tickets", element: <AdminTickets /> },
    ],
  },
  {
    path: "/my-account/*",
    element: <UserPanel />,
    children: [
      { path: "", element: <MainUserPanel /> },
      { path: "orders", element: <Orders /> },
      { path: "view-order/:orderID", element: <ViewOrder /> },
      { path: "courses", element: <UserCourses /> },
      { path: "tickets", element: <UserTickets /> },
      { path: "send-ticket", element: <SendTicket /> },
      { path: "tickets/answer/:id", element: <TicketAnswer /> },
      { path: "edit-account", element: <EditAccount /> },
    ],
  },
]

export default routes
