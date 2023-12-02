import React from "react"

import "./AboutUsBox.css"
import { GiMonsteraLeaf, GiCrown, GiCutDiamond } from "react-icons/gi"
import { FaInfoCircle } from "react-icons/fa"
export default function AboutUsBox({ title, desc, icon }) {
  const icons = {
    GiCutDiamond: <GiCutDiamond class="about-us__icon"/>,
    GiCrown: <GiCrown class="about-us__icon"/>,
    GiMonsteraLeaf: <GiMonsteraLeaf class="about-us__icon"/>,
    FaInfoCircle: <FaInfoCircle class="about-us__icon"/>,
  }
  return (
    <div class="col-6">
      <div class="about-us__box">
        <div class="about-us__box-right">
        {icons[icon]}
        </div>
        <div class="about-us__box-left">
          <span class="about-us__box-title">{title}</span>
          <span class="about-us__box-text">{desc}</span>
        </div>
      </div>
    </div>
  )
}
