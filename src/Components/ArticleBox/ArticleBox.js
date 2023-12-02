import React from "react"
import { Link } from "react-router-dom"
import "./ArticleBox.css"

export default function ArticleBox({ title, description, cover, shortName }) {
  return (
    <div class="col-4">
      <div class="article-card">
        <div class="article-card__header">
          <Link
            to={`/article-info/${shortName}`}
            class="article-card__link-img"
          >
            <img
              src={`http://localhost:4000/courses/covers/${cover}`}
              class="article-card__img w-100"
              alt="Article Cover"
            />
          </Link>
        </div>
        <div class="article-card__content">
          <Link
            to={`/article-info/${shortName}`}
            class="article-card__link"
          >
            {title}
          </Link>
          <p class="article-card__text">{description}</p>
          <Link to={`/article-info/${shortName}`} class="article-card__btn">
            بیشتر بخوانید
          </Link>
        </div>
      </div>
    </div>
  )
}
