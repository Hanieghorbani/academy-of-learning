import React from "react"
import "./Index.css"
import { Outlet } from "react-router-dom"
import Sidebar from "../../Components/UserPanel/Sidebar/Sidebar"
import Header from "../../Components/Header/Header"
import Footer from "../../Components/Footer/Footer"
export default function Index() {
  return (
    <div>
      <Header />

      <section class="content">
        <div class="content-header">
          <div class="container">
            <span class="content-header__title">حساب کاربری من</span>
            <span class="content-header__subtitle">پیشخوان</span>
          </div>
        </div>
        <div class="content-main">
          <div class="container">
            <div class="row">
              <Sidebar />

              <Outlet />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
