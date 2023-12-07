import React, { useEffect, useState } from "react"
import AboutUs from "../../Components/AboutUs/AboutUs"
import Footer from "../../Components/Footer/Footer"
import Header from "../../Components/Header/Header"
import LastArticles from "../../Components/LastArticles/LastArticles"
import LastCourses from "../../Components/LastCourses/LastCourses"
import PopularCourses from "../../Components/PopularCourses/PopularCourses"
import PresellCourses from "../../Components/PresellCourses/PresellCourses"
import Landing from "../../Components/Landing/Landing"
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop"
import "./Index.css"

export default function Index() {
  //start scroll to top handler
  const [isScrollBtnVisible, setIsScrollBtnVisible] = useState(false)
  useEffect(() => {
    window.addEventListener("scroll", handleShowScroll)
    return () => {
      window.removeEventListener("scroll", handleShowScroll)
    }
  }, [])

  const handleShowScroll = () => {
    if (window.scrollY > 500) {
      setIsScrollBtnVisible(true)
    } else {
      setIsScrollBtnVisible(false)
    }
  }
  //finish scroll to top handler


  return (
    <>
      <Header />
      <Landing />
      <LastCourses />
      <AboutUs />
      <PopularCourses />
      <PresellCourses />
      <LastArticles />
      <Footer />
      {isScrollBtnVisible && <ScrollToTop />}
    </>
  )
}
