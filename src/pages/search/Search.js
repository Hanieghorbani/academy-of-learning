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
      <div className="course">
        <div className="container">
          <SectionHeader
            title={"نتیجه جستجو برای دوره ها"}
            desc={"پیش به سوی موفقیت"}
          />
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {allResultCourses.length == true ? (
                  <>
                    {allResultCourses.map((course) => (
                      <CourseBox key={course.id} {...course} />
                    ))}
                  </>
                ) : (
                  <div className="alert alert-warning">
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
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {allResultArticles.length == true ? (
                  <>
                    {allResultArticles.map((article) => (
                      <ArticleBox key={article.id} {...article} />
                    ))}
                  </>
                ) : (
                  <div className="alert alert-warning">
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
