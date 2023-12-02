import React, { useEffect, useState } from "react"
import Header from "../../Components/Header/Header"
import Footer from "../../Components/Footer/Footer"
import CourseBox from "../../Components/CourseBox/CourseBox"
import Pagination from "../../Components/Pagination/Pagination"
import { AiOutlineSearch, AiOutlineAppstore } from "react-icons/ai"
import { HiMenuAlt2 } from "react-icons/hi"
import { BsChevronDown } from "react-icons/bs"
import { FaChalkboardTeacher, FaUsers, FaArrowLeft } from "react-icons/fa"

import "./Category.css"
import { useParams } from "react-router-dom"
export default function Category() {
  const { categoryName } = useParams()
  const [courses, setCourses] = useState([])
  const [coursesOrdered, setCoursesOrdered] = useState([])
  const [shownCourses, setShownCourses] = useState([])
  const [lists, setLists] = useState([
    { 1: "مرتب سازی پیش فرض", key: "default" },
    { 2: "مرتب سازی دوره های رایگان", key: "free" },
    { 3: "مرتب سازی دوره های پولی", key: "money" },
    { 4: "مرتب سازی بر اساس ارزان ترین", key: "cheap" },
    { 5: "مرتب سازی بر اساس گران ترین", key: "expensive" },
    { 6: "مربت سازی بر اساس آخرین", key: "last" },
    { 7: "مربت سازی بر اساس اولین", key: "fist" },
  ])
  const [status, setStatus] = useState("default")
  const [statusTitle, setStatusTitle] = useState("مرتب سازی پیش فرض")
  const [searchValue, setSearchValue] = useState("")
  const [showCourses, setShowCourses] = useState("grid")
  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
      .then((res) => res.json())
      .then((result) => {
        setCourses(result)
        setCoursesOrdered(result)
      })
  }, [categoryName])

  useEffect(() => {
    switch (status) {
      case "free": {
        setCoursesOrdered(courses.filter((course) => !course.price))
        break
      }
      case "money": {
        setCoursesOrdered(courses.filter((course) => course.price))
        break
      }
      case "last": {
        setCoursesOrdered([...courses].reverse())
        break
      }
      case "first": {
        setCoursesOrdered(courses)
        break
      }
      case "cheap": {
        setCoursesOrdered([...courses].sort((a, b) => a.price - b.price))

        break
      }
      case "expensive": {
        setCoursesOrdered([...courses].sort((a, b) => b.price - a.price))
        break
      }
      default: {
        setCoursesOrdered(courses)
      }
    }
  }, [status])
  return (
    <div>
      <Header />
      <section class="courses">
        <div class="container">
          <div class="courses-content">
            <div class="container">
              <div class="row">
                {courses.length ? (
                  <>
                    <div class="courses-top-bar">
                      <div class="courses-top-bar__right">
                        <div
                          class={`courses-top-bar__row-btn ${
                            showCourses == "grid" &&
                            "courses-top-bar__icon--active"
                          }`}
                          onClick={() => setShowCourses("grid")}
                        >
                          <AiOutlineAppstore class=" courses-top-bar__icon" />
                        </div>

                        <div
                          class={`courses-top-bar__row-btn ${
                            showCourses == "list" &&
                            "courses-top-bar__icon--active"
                          }`}
                          onClick={() => setShowCourses("list")}
                        >
                          <HiMenuAlt2 class="courses-top-bar__icon" />
                        </div>

                        <div class="courses-top-bar__selection">
                          <span class="courses-top-bar__selection-title">
                            {statusTitle}
                            <BsChevronDown class="courses-top-bar__selection-icon" />
                          </span>
                          <ul class="courses-top-bar__selection-list">
                            {lists.map((list, index) => (
                              <li
                              key={list._id} 
                                onClick={(e) => {
                                  setStatusTitle(e.target.textContent)
                                  setStatus(list.key)
                                  setSearchValue("")
                                }}
                                class={`courses-top-bar__selection-item ${
                                  list.key == status &&
                                  "courses-top-bar__selection-item--active "
                                }`}
                              >
                                {list[index + 1]}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div class="courses-top-bar__left">
                        <form action="#" class="courses-top-bar__form">
                          <input
                            type="text"
                            class="courses-top-bar__input"
                            placeholder="جستجوی دوره ..."
                            value={searchValue}
                            onChange={(e) => {
                              setSearchValue(e.target.value)
                              setStatus("default")
                              setStatusTitle("مرتب سازی پیش فرض")
                              const filteredCours = courses.filter((course) =>
                                course.name.includes(e.target.value)
                              )
                              setCoursesOrdered(filteredCours)
                            }}
                          />
                          <AiOutlineSearch class="courses-top-bar__search-icon" />
                        </form>
                      </div>
                    </div>
                    {shownCourses.length ? (
                      <>
                        {showCourses == "grid" ? (
                          <>
                            {shownCourses.map((course) => (
                              <CourseBox key={course._id}  {...course} />
                            ))}
                          </>
                        ) : (
                          <>
                            {shownCourses.map((course) => (
                              <div key={course._id}  class="col-12">
                                <div class="course-box">
                                  <div class="course__box-header">
                                    <div class="course__box-right">
                                      <a
                                        class="course__box-right-link"
                                        href="#"
                                      >
                                        <img
                                          src={`/images/courses/${course.cover}`}
                                          class="course__box-right-img"
                                        />
                                      </a>
                                    </div>
                                    <div class="course__box-left">
                                      <div class="course__box-left-top">
                                        <a
                                          href="#"
                                          class="course__box-left-link"
                                        >
                                          {course.name}
                                        </a>
                                      </div>
                                      <div class="course__box-left-center">
                                        <div class="course__box-left-teacher">
                                          <FaChalkboardTeacher class="course__box-left-icon ms-2"/> 
                                          <span class="course__box-left-name">
                                           {course.creator}
                                          </span>
                                        </div>
                                        <div class="course__box-left-stars">
                                          <span class="course__box-left-star">
                                            <img src="/images/svgs/star_fill.svg" />
                                          </span>
                                          <span class="course__box-left-star">
                                            <img src="/images/svgs/star_fill.svg" />
                                          </span>
                                          <span class="course__box-left-star">
                                            <img src="/images/svgs/star_fill.svg" />
                                          </span>
                                          <span class="course__box-left-star">
                                            <img src="/images/svgs/star_fill.svg" />
                                          </span>
                                          <span class="course__box-left-star">
                                            <img src="/images/svgs/star_fill.svg" />
                                          </span>
                                        </div>
                                      </div>
                                      <div class="course__box-left-bottom">
                                        <div class="course__box-left-des">
                                          <p>{course.description}</p>
                                        </div>
                                      </div>
                                      <div class="course__box-footer">
                                        <div class="course__box-footer-right">
                                          <FaUsers class="course__box-footer-icon ms-2"/>
                                          <span class="course__box-footer-count">
                                            202
                                          </span>
                                        </div>
                                        <span class="course__box-footer-left">
                                          {course.price === 0
                                            ? "رایگان"
                                            : course.price.toLocaleString()}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </>
                    ) : (
                      <div class="alert alert-warning">
                        هیچ دوره ای یافت نشد !
                      </div>
                    )}

                    <Pagination
                      items={coursesOrdered}
                      itemsCount={3}
                      pathname={`/category-info/${categoryName}`}
                      setShownCourses={setShownCourses}
                    />
                  </>
                ) : (
                  <div class="alert alert-warning">
                    هنوز هیچ دوره ای برای این دسته بندی ضبط نشده !
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
