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
  }, [])
  return (
    <>
      <div class="courses">
        <div class="container">
          <SectionHeader
            title="جدیدترین دوره ها"
            desc="سکوی پرتاپ شما به سمت موفقیت"
            btnTitle="تمامی دوره ها"
            btnHref="/courses/1"
          />

          <div class="courses-content">
            <div class="container">
              <div class="row">
                {courses &&
                  courses
                    .splice(0, 6)
                    .map((course) => <CourseBox key={course._id} {...course} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
