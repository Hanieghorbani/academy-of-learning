import React, { useEffect, useState } from "react"
import CircleSpinner from "../CircleSpinner/CircleSpinner"
import "./CourseBox.css"
import { Link } from "react-router-dom"
import { FaChalkboardTeacher, FaUsers, FaArrowLeft } from "react-icons/fa"
import { FaRegStar } from "react-icons/fa6"
export default function CourseBox(props) {
  const [isImgShow, setIsImgShow] = useState(false)
  const onImageLoaded = () => setIsImgShow(true)
  // const [scoreArr, setScoreArr] = useState([])
  // const [isLoadin, setIsLoading] = useState(false)
  // useEffect(() => {
  //   setScoreArr(Array(props.courseAverageScore).fill("start"))
  //   setIsLoading(true)
  // }, [])
  return (
    <>
      <div class={`col-4 ${props.isInSwiper && "col-12"}`}>
        <div class="course-box">
          <Link to={`/course-info/${props.shortName}`}>
            <img
              src={`http://localhost:4000/courses/covers/${props.cover}`}
              alt="Course img"
              class="course-box__img"
              onLoad={onImageLoaded}
            />
            {!isImgShow && <CircleSpinner />}
          </Link>
          <div class="course-box__main">
            <Link
              to={`/course-info/${props.shortName}`}
              class="course-box__title"
            >
              {props.name}
            </Link>

            <div class="course-box__rating-teacher">
              <div class="course-box__teacher">
                <FaChalkboardTeacher class="course-box__teacher-icon" />
                <a href="#" class="course-box__teacher-link">
                  {props.creator}
                </a>
              </div>
              <div class="course-box__rating">
                {Array(5 - props.courseAverageScore)
                  .fill("0")
                  .map(() => (
                    <img
                      src="/images/svgs/star.svg"
                      alt="rating"
                      class="course-box__star"
                    />
                  ))}
                {Array(props.courseAverageScore)
                  .fill(1)
                  .map(() => (
                    <img
                      src="/images/svgs/star_fill.svg"
                      alt="rating"
                      class="course-box__star"
                    />
                  ))}
              </div>
            </div>

            <div class="course-box__status">
              <div class="course-box__users">
                <FaUsers class="course-box__users-icon" />
                <span class="course-box__users-text">
                  {props.registers}
                </span>
              </div>
              <span class="course-box__price">
                {props.price ? props.price.toLocaleString() : "رایگان"}
              </span>
            </div>
          </div>

          <div class="course-box__footer">
            <Link
              to={`/course-info/${props.shortName}`}
              class="course-box__footer-link"
            >
              مشاهده اطلاعات
              <FaArrowLeft class="course-box__footer-icon" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
