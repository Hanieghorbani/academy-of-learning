import React, { useEffect, useState } from "react"
import Header from "../../Components/Header/Header"
import Footer from "../../Components/Footer/Footer"
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb"
import ArticleBox from "../../Components/ArticleBox/ArticleBox"
import Pagination from "../../Components/Pagination/Pagination"
export default function Articles() {
  const [allArticles,setAllArticles] = useState([])
  const [shownArticles,setShownArticles] = useState([])
  useEffect(()=>{
    const localStorageToken = JSON.parse(localStorage.getItem('user'))
    fetch("http://localhost:4000/v1/articles", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${!localStorageToken ? "null" : localStorageToken.token}`,
      },
    }).then((res) => res.json()).then(result=>{
      setAllArticles(result)
    })
  },[])
  return (
    <>
      <Header />
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "/" },
          {
            id: 2,
            title: "تمام مقاله ها",
            to: "/articles/1",
          },
        ]}
      />
      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {shownArticles.map((article) => (
                  <ArticleBox key={article.id} {...article} />
                ))}
              </div>
            </div>
          </div>

          <Pagination
            items={allArticles}
            itemsCount={3}
            pathname="/articles"
            setShownCourses={setShownArticles}
          />
        </div>
      </section>
      <Footer />
    </>
  )
}
