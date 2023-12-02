import React, { useEffect, useState } from "react"
import Header from "../../Components/Header/Header"
import Footer from "../../Components/Footer/Footer"
import SectionHeader from "../../Components/SectionHeader/SectionHeader"
import { useParams } from "react-router-dom"
import CourseBox from "../../Components/CourseBox/CourseBox"
import ArticleBox from "../../Components/ArticleBox/ArticleBox"
export default function Search() {
  const { searchValue } = useParams()
  const [allResultArticles, setAllResultArticles] = useState([])
  const [allResultCourses, setAllResultCourses] = useState([])
  useEffect(() => {
    fetch(`http://localhost:4000/v1/search/${searchValue}`)
      .then((res) => res.json())
      .then((result) => {
        setAllResultArticles(result.allResultArticles)
        setAllResultCourses(result.allResultCourses)
      })
  }, [searchValue])
  return (
    <div>
      <Header />
      <div class="course">
        <div class="container">
          <SectionHeader
            title={"نتیجه جستجو برای دوره ها"}
            desc={"پیش به سوی موفقیت"}
          />
          <div class="courses-content">
            <div class="container">
              <div class="row">
                {allResultCourses.length == true ? (
                  <>
                    {allResultCourses.map((course) => (
                      <CourseBox key={course._id} {...course} />
                    ))}
                  </>
                ) : (
                  <div class="alert alert-warning">
                    دوره ای برای جستجوی شما پیدا نشد !
                  </div>
                )}
              </div>
            </div>
          </div>

          <SectionHeader
            title={"نتیجه جستجو برای مقالات "}
            desc={"پیش به سوی ارتقای دانش"}
          />
          <div class="courses-content">
            <div class="container">
              <div class="row">
                {allResultArticles.length == true ? (
                  <>
                    {allResultArticles.map((article) => (
                      <ArticleBox key={article._id} {...article} />
                    ))}
                  </>
                ) : (
                  <div class="alert alert-warning">
                    مقاله ای برای جستجوی شما پیدا نشد !
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
