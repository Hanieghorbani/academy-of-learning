import React, { useContext, useState } from "react"
import "./Index.css"
import { Outlet } from "react-router-dom"
import Sidebar from "../../Components/UserPanel/Sidebar/Sidebar"
import Header from "../../Components/Header/Header"
import Footer from "../../Components/Footer/Footer"
import AuthContext from "../../userContext/authContext"
export default function Index() {
  const contextData = useContext(AuthContext)
  return (
    <div>
      <Header />

      <section className="content">
        <div className="content-header">
          <div className="container">
            <span className="content-header__title">حساب کاربری من</span>
            <span className="content-header__subtitle">{contextData.subTitleInPUser}</span>
          </div>
        </div>
        <div className="content-main">
          <div className="container">
            <div className="row">
              <Sidebar/>

              <Outlet/>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
