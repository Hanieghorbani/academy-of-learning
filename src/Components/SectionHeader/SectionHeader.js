import React from "react"
import "./SectionHeader.css"
import { AiOutlineArrowLeft } from "react-icons/ai"
export default function SectionHeader({ title, desc, btnTitle }) {
  return (
    <div className="courses-header container my-5">
      <div className="courses-header__right">
        <span className="courses-header__title title">{title}</span>
        <span className="courses-header__text">{desc}</span>
      </div>
      {btnTitle && (
        <div className="courses-header__left">
          <a href="#" className="courses-header__link">
            {btnTitle}
            <AiOutlineArrowLeft className="courses-header__icon" />
          </a>
        </div>
      )}
    </div>
  )
}
