import React,{useState,useEffect} from "react"
import SectionHeader from "./../SectionHeader/SectionHeader"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import CourseBox from "../CourseBox/CourseBox"
import "swiper/css"
import "swiper/css/pagination"
import "./PopularCourses.css"

export default function PopularCourses() {
  const [popularCourses, setPopularCourses] = useState([])
  useEffect(() => {
    fetch("http://localhost:4000/v1/courses/popular")
      .then((res) => res.json())
      .then((result) => {
        setPopularCourses(result)
      })
  }, [])
  return (
    <div class="popular">
      <div class="container">
        <SectionHeader
          title="محبوب ترین دوره ها"
          desc="دوره های محبوب بر اساس امتیاز دانشجوها"
        />
        <div class="courses-content">
          <div class="container">
            <div class="row">
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                loop={true}
                class="mySwiper"
              >
                {popularCourses.map((course) => (
                  <SwiperSlide key={course._id}>
                    <CourseBox {...course} isInSwiper={true} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
