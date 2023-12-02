import React from "react"
import "./SectionHeader.css"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { Link } from "react-router-dom"
export default function SectionHeader({ title, desc, btnTitle ,btnHref}) {
  return (
    <div class="courses-header container my-5">
      <div class="courses-header__right">
        <span class="courses-header__title title">{title}</span>
        <span class="courses-header__text">{desc}</span>
      </div>
      {btnTitle && (
        <div class="courses-header__left">
          <Link to={btnHref} class="courses-header__link">
            {btnTitle}
            <AiOutlineArrowLeft class="courses-header__icon" />
          </Link>
        </div>
      )}
    </div>
  )
}
