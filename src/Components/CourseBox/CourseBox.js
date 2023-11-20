import React, { useState } from "react"
import CircleSpinner from "../CircleSpinner/CircleSpinner"

import "./CourseBox.css"
import { Link } from "react-router-dom"
import { FaChalkboardTeacher, FaUsers, FaArrowLeft } from "react-icons/fa"
export default function CourseBox(props) {
  const [isImgShow, setIsImgShow] = useState(false)

  const onImageLoaded = () => setIsImgShow(true)
  console.log(props)
  let scroeArr = []
  for (let i = 0; i <= props.courseAverageScore; i++) {
    scroeArr.push(i)
  }
  return (
    <div className="col-4">
      <div className="course-box">
        <Link to={`/course-info/${props.shortName}`}>
          <img
            src={`/images/courses/${props.cover}`}
            alt="Course img"
            className="course-box__img"
            onLoad={onImageLoaded}
          />
          {!isImgShow && <CircleSpinner />}
        </Link>
        <div className="course-box__main">
          <Link
            to={`/course-info/${props.shortName}`}
            className="course-box__title"
          >
            {props.name}
          </Link>

          <div className="course-box__rating-teacher">
            <div className="course-box__teacher">
              <FaChalkboardTeacher className="course-box__teacher-icon" />
              <a href="#" className="course-box__teacher-link">
                {props.creator}
              </a>
            </div>
            <div className="course-box__rating">
              <img
                src="/images/svgs/star.svg"
                alt="rating"
                className="course-box__star"
              />
              <img
                src="/images/svgs/star_fill.svg"
                alt="rating"
                className="course-box__star"
              />
              <img
                src="/images/svgs/star_fill.svg"
                alt="rating"
                className="course-box__star"
              />
              <img
                src="/images/svgs/star_fill.svg"
                alt="rating"
                className="course-box__star"
              />
              <img
                src="/images/svgs/star_fill.svg"
                alt="rating"
                className="course-box__star"
              />
            </div>
          </div>

          <div className="course-box__status">
            <div className="course-box__users">
              <FaUsers className="course-box__users-icon" />
              <span className="course-box__users-text">{props.registers}</span>
            </div>
            <span className="course-box__price">
              {props.price ? props.price.toLocaleString() : "رایگان"}
            </span>
          </div>
        </div>

        <div className="course-box__footer">
          <Link
            to={`/course-info/${props.shortName}`}
            className="course-box__footer-link"
          >
            مشاهده اطلاعات
            <FaArrowLeft className="course-box__footer-icon" />
          </Link>
        </div>
      </div>
    </div>
  )
}
