import React, { useEffect, useState } from "react"
import CourseBox from "../CourseBox/CourseBox"
import SectionHeader from "../SectionHeader/SectionHeader"

import "./LastCourses.css"

export default function LastCourses() {
  const [courses, setCourses] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  useEffect(() => {
    fetch("http://localhost:4000/v1/courses")
      .then((res) => {
        if (res.ok) {
          console.log(res)
          return res.json()
        } else {
          throw new Error(res.text())
        }
      })
      .then((data) => {
        console.log(data)
        setCourses(data)
        setIsLoading(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <>
      <div className="courses border-0">
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
                {isLoading && courses.slice(0, 6).map((course) => (
                  <CourseBox key={course._id} {...course} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
