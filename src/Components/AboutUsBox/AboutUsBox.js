import React from "react"

import "./AboutUsBox.css"
import { GiMonsteraLeaf, GiCrown, GiCutDiamond } from "react-icons/gi"
import { FaInfoCircle } from "react-icons/fa"
export default function AboutUsBox({ title, desc, icon }) {
  const icons = {
    GiCutDiamond: <GiCutDiamond className="about-us__icon"/>,
    GiCrown: <GiCrown className="about-us__icon"/>,
    GiMonsteraLeaf: <GiMonsteraLeaf className="about-us__icon"/>,
    FaInfoCircle: <FaInfoCircle className="about-us__icon"/>,
  }
  return (
    <div className="col-6">
      <div className="about-us__box">
        <div className="about-us__box-right">
        {icons[icon]}
        </div>
        <div className="about-us__box-left">
          <span className="about-us__box-title">{title}</span>
          <span className="about-us__box-text">{desc}</span>
        </div>
      </div>
    </div>
  )
}
