import React, { useEffect, useState } from "react"
import Header from "../../Components/Header/Header"
import Breadcrumb from "./../../Components/Breadcrumb/Breadcrumb"
import Footer from "./../../Components/Footer/Footer"
import CourseBox from "./../../Components/CourseBox/CourseBox"
import Pagination from "../../Components/Pagination/Pagination"
import "./Courses.css"

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [shownCourses, setShownCourses] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/v1/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data)
      })
  }, [])
  return (
    <>
      <Header />

      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "تمامی دوره ها",
            to: "courses",
          },
        ]}
      />

      {/* <!--------------------------------  Courses-Section  --------------------------------> */}
      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {shownCourses.map((course) => (
                  <CourseBox {...course} />
                ))}
              </div>
            </div>
          </div>

          <Pagination
            items={courses}
            itemsCount={3}
            pathname="/courses"
            setShownCourses={setShownCourses}
          />
        </div>
      </section>
      {/* <!--------------------------------  Courses-Section  --------------------------------> */}

      <Footer />
    </>
  )
}
