import React, { useEffect, useState } from "react"
import Header from "../../Components/Header/Header"
import Footer from "../../Components/Footer/Footer"
import CourseBox from "../../Components/CourseBox/CourseBox"
import Pagination from "../../Components/Pagination/Pagination"
import { AiOutlineSearch, AiOutlineAppstore } from "react-icons/ai"
import { HiMenuAlt2 } from "react-icons/hi"
import { BsChevronDown } from "react-icons/bs"

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
      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {courses.length ? (
                  <>
                    <div className="courses-top-bar">
                      <div className="courses-top-bar__right">
                        <div className="courses-top-bar__row-btn courses-top-bar__icon--active">
                          <AiOutlineAppstore className=" courses-top-bar__icon" />
                        </div>
                        <div className="courses-top-bar__column-btn">
                          <HiMenuAlt2 className="courses-top-bar__icon" />
                        </div>

                        <div className="courses-top-bar__selection">
                          <span className="courses-top-bar__selection-title">
                            {statusTitle}
                            <BsChevronDown className="courses-top-bar__selection-icon" />
                          </span>
                          <ul className="courses-top-bar__selection-list">
                            {lists.map((list, index) => (
                              <li
                                onClick={(e) => {
                                  setStatusTitle(e.target.textContent)
                                  setStatus(list.key)
                                }}
                                className={`courses-top-bar__selection-item ${
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
                      <div className="courses-top-bar__left">
                        <form action="#" className="courses-top-bar__form">
                          <input
                            type="text"
                            className="courses-top-bar__input"
                            placeholder="جستجوی دوره ..."
                            value={searchValue}
                            onChange={(e) => {
                              setSearchValue(e.target.value)
                              const filteredCours = courses.filter((course) =>
                                course.name.includes(e.target.value)
                              )
                              setCoursesOrdered(filteredCours)
                            }}
                          />
                          <AiOutlineSearch className="courses-top-bar__search-icon" />
                        </form>
                      </div>
                    </div>
                    {shownCourses.length ? (
                      <>
                        {shownCourses.map((course) => (
                          <CourseBox {...course} />
                        ))}
                      </>
                    ) : (
                      <div className="alert alert-warning">
                        هیچ نتیجه ای برای {statusTitle} وجود ندارد
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
                  <div className="alert alert-warning">
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
