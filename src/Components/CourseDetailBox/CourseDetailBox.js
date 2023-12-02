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
      <BiSolidTimeFive class="course-boxes__box-right-icon" />
    ),
    BiSolidUser: <BiSolidUser class="course-boxes__box-right-icon" />,
    FaGraduationCap: (
      <FaGraduationCap class="course-boxes__box-right-icon" />
    ),
    FaCalendarAlt: (
      <FaCalendarAlt class="course-boxes__box-right-icon" />
    ),
    FaPlay: <FaPlay class="course-boxes__box-right-icon" />,
    AiFillInfoCircle: (
      <AiFillInfoCircle class="course-boxes__box-right-icon" />
    ),
  }
  return (
    <div class="col-4">
      <div class="course-boxes__box">
        <div class="course-boxes__box-right">{icons[icon]}</div>
        <div class="course-boxes__box-left">
          <span class="course-boxes__box-left-title">{title}</span>
          <span class="course-boxes__box-left--subtitle">{desc}</span>
        </div>
      </div>
    </div>
  )
}
