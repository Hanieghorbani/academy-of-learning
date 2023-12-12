import React, { useEffect, useState } from "react"
import Navbar from "../Navbar/Navbar"
import Topbar from "../Topbar/Topbar"
import "./Header.css"
export default function Header() {
  const [isTopbarVisible, setIsTopbarVisible] = useState(true)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleScroll = () => {
    if (window.scrollY > 67) {
      setIsTopbarVisible(false)
    } else {
      setIsTopbarVisible(true)
    }
  }

  return (
    <div className="header">
      <div className={`w-100 ${isTopbarVisible ? "topbarVisible" : ""}`}>
        <Topbar />
      </div>
      <div className={`shadow w-100 ${isTopbarVisible ? "topbarVisible" : "navbarFixed"}`}>
        <Navbar />
      </div>
    </div>
  )
}
