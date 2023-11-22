import React, { useEffect, useState } from "react"
import CourseBox from "../CourseBox/CourseBox"
import SectionHeader from "../SectionHeader/SectionHeader"

import "./LastCourses.css"

export default function LastCourses() {
  const [courses, setCourses] = useState(null)
  useEffect(() => {
    fetch("http://localhost:4000/v1/courses")
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error(res.text())
        }
      })
      .then((data) => {
        setCourses(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <>
      <div className="courses">
        <div className="container">
          <SectionHeader
            title="جدیدترین دوره ها"
            desc="سکوی پرتاپ شما به سمت موفقیت"
            btnTitle="تمامی دوره ها"
            btnHref="/courses/1"
          />

          <div className="courses-content">
            <div className="container">
              <div className="row">
                {courses &&
                  courses
                    .splice(0, 6)
                    .map((course) => <CourseBox {...course} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
