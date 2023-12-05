import React from "react"

import "./CourseDetailBox.css"
import { BiSolidTimeFive, BiSolidUser } from "react-icons/bi"
import {
  FaGraduationCap,
  FaCalendarAlt,
  FaPlay,
} from "react-icons/fa"
import { AiFillInfoCircle } from "react-icons/ai"
export default function CourseDetailBox({ title, desc, icon }) {
  const icons = {
    BiSolidTimeFive: (
      <BiSolidTimeFive className="course-boxes__box-right-icon" />
    ),
    BiSolidUser: <BiSolidUser className="course-boxes__box-right-icon" />,
    FaGraduationCap: (
      <FaGraduationCap className="course-boxes__box-right-icon" />
    ),
    FaCalendarAlt: (
      <FaCalendarAlt className="course-boxes__box-right-icon" />
    ),
    FaPlay: <FaPlay className="course-boxes__box-right-icon" />,
    AiFillInfoCircle: (
      <AiFillInfoCircle className="course-boxes__box-right-icon" />
    ),
  }
  return (
    <div className="col-4">
      <div className="course-boxes__box">
        <div className="course-boxes__box-right">{icons[icon]}</div>
        <div className="course-boxes__box-left">
          <span className="course-boxes__box-left-title">{title}</span>
          <span className="course-boxes__box-left--subtitle">{desc}</span>
        </div>
      </div>
    </div>
  )
}
