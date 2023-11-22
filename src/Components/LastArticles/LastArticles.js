import React, { useEffect, useState } from "react"
import ArticleBox from "../ArticleBox/ArticleBox"
import SectionHeader from "./../SectionHeader/SectionHeader"

import "./LastArticles.css"

export default function LastArticles() {
  const [articles, setArticles] = useState([])
  useEffect(() => {
    const localStorageToken = JSON.parse(localStorage.getItem("user"))
    fetch("http://localhost:4000/v1/articles", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorageToken.token}`,
      },
    }).then((res) => res.json()).then(result=>{
      console.log(result);
      setArticles(result)
    })
  }, [])
  return (
    <section className="articles">
      <div className="container">
        <SectionHeader
          title="جدیدترین مقاله ها"
          desc="پیش به سوی ارتقای دانش"
          btnTitle="تمامی مقاله ها"
          btnHref={"/articles/1"}
        />

        <div className="articles__content">
          <div className="row">
          {articles && articles.splice(0,3).map(article=>(
            <ArticleBox
              {...article}
            />
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}
