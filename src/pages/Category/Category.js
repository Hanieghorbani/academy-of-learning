import React, { useEffect, useState } from "react"
import Header from "../../Components/Header/Header"
import Footer from "../../Components/Footer/Footer"
import CourseBox from "../../Components/CourseBox/CourseBox"
import Pagenation from "../../Components/Pagination/Pagination"
import { AiOutlineSearch, AiOutlineAppstore } from "react-icons/ai"
import { HiMenuAlt2 } from "react-icons/hi"
import { BsChevronDown } from "react-icons/bs"

import "./Category.css"
import { useParams } from "react-router-dom"
export default function Category() {
  const { categoryName } = useParams()
  const [courses, setCourses] = useState([])
  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
      .then((res) => res.json())
      .then((result) => {
        setCourses(result)
      })
  }, [categoryName])
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
                          <i className="fas fa-align-left courses-top-bar__icon"></i>
                          <HiMenuAlt2 className="courses-top-bar__icon" />
                        </div>

                        <div className="courses-top-bar__selection">
                          <span className="courses-top-bar__selection-title">
                            مرتب سازی پیش فرض
                            <BsChevronDown className="courses-top-bar__selection-icon" />
                          </span>
                          <ul className="courses-top-bar__selection-list">
                            <li className="courses-top-bar__selection-item courses-top-bar__selection-item--active">
                              مرتب سازی پیش فرض
                            </li>
                            <li className="courses-top-bar__selection-item">
                              مربت سازی بر اساس محبوبیت
                            </li>
                            <li className="courses-top-bar__selection-item">
                              مربت سازی بر اساس امتیاز
                            </li>
                            <li className="courses-top-bar__selection-item">
                              مربت سازی بر اساس آخرین
                            </li>
                            <li className="courses-top-bar__selection-item">
                              مربت سازی بر اساس ارزان ترین
                            </li>
                            <li className="courses-top-bar__selection-item">
                              مربت سازی بر اساس گران ترین
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="courses-top-bar__left">
                        <form action="#" className="courses-top-bar__form">
                          <input
                            type="text"
                            className="courses-top-bar__input"
                            placeholder="جستجوی دوره ..."
                          />
                          <AiOutlineSearch className="courses-top-bar__search-icon" />
                        </form>
                      </div>
                    </div>
                    {courses.map((course) => (
                      <CourseBox {...course} />
                    ))}
                    <Pagenation />
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
