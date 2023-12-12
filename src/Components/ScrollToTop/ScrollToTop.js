import React from "react"
import './ScrollToTop.css'
import { animateScroll } from "react-scroll"
import { IoIosArrowUp } from "react-icons/io";
export default function ScrollToTop() {

  return (
    <button
      className="btn-scroll-top rounded-circle"
      onClick={() => {
        animateScroll.scrollToTop()
      }}
    >
      <IoIosArrowUp className="fs-1"/>
    </button>
  )
}
