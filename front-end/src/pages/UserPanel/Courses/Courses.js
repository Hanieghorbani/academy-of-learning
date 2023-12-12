import React, { useEffect, useState } from "react"

import "./Courses.css"

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [showCourseState, setShowCourseState] = useState("all")
  const [shownCourses, setShownCourses] = useState([])
  useEffect(() => {
    fetch(`http://localhost:4000/v1/users/courses/`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data)
        setShownCourses(data)
      })
  }, [])

  function filterCourses(state) {
    switch (state) {
      case "all": {
        setShownCourses(courses)
        break
      }
      case "free": {
        setShownCourses(courses.filter((course) => !course.price))
        break
      }
      case "unfree": {
        setShownCourses(courses.filter((course) => course.price))
        break
      }
      default: {
        setShownCourses(courses)
      }
    }
  }

  return (
    <div className="col-9">
      <div className="courses">
        <div className="courses-header__panel">
          <span className="courses-header__title">دوره های ثبت نام شده</span>
          <ul className="courses-header__list">
            <li
              className="courses-header__item"
              onClick={(event) => {
                event.preventDefault()
                setShowCourseState("all")
                filterCourses("all")
              }}
            >
              <a
                className={`courses-header__link__panel ${
                  showCourseState === "all" && "courses-header__link-active"
                }`}
                href="#"
              >
                همه دوره ها
              </a>
            </li>
            <li
              className="courses-header__item"
              onClick={(event) => {
                event.preventDefault()
                setShowCourseState("free")
                filterCourses("free")
              }}
            >
              <a
                className={`courses-header__link__panel ${
                  showCourseState === "free" && "courses-header__link-active"
                }`}
                href="#"
              >
                دوره های رایگان
              </a>
            </li>
            <li
              className="courses-header__item"
              onClick={(event) => {
                event.preventDefault()
                setShowCourseState("unfree")
                filterCourses("unfree")
              }}
            >
              <a
                className={`courses-header__link__panel ${
                  showCourseState === "unfree" && "courses-header__link-active"
                }`}
                href="#"
              >
                دوره های غیر رایگان
              </a>
            </li>
          </ul>
        </div>
        <div className="main">
          <div className="row">
            <div className="col-12">
            {shownCourses.length ? (<>{shownCourses.map((course) => (
                <div className="main__box">
                  <div className="main__box-right">
                    <a className="main__box-img-link" href="#">
                      <img
                        className="main__box-img img-fluid"
                        src={`http://localhost:4000/courses/covers/${course.course.cover}`}
                      />
                    </a>
                  </div>
                  <div className="main__box-left">
                    <a href="#" className="main__box-title">
                      {course.course.name}
                    </a>
                    <div className="main__box-bottom">
                      <div className="main__box-all">
                        <span className="main__box-all-text ms-2">وضعیت:</span>
                        <span className="main__box-all-value">
                          {course.course.isComplete
                            ? "تکمیل شده"
                            : "درحال برگزاری"}
                        </span>
                      </div>
                      <div className="main__box-completed">
                        <span className="main__box-completed-text ms-2">قیمت:</span>
                        <span className="main__box-completed-value">
                          {course.price
                            ? course.price.toLocaleString()
                            : "رایگان"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}</>) : (<div className="alert alert-warning">هیچ دوره ای برای این دسته بندی یافت نشد!</div>)}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
