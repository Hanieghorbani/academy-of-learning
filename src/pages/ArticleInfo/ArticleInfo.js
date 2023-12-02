import React, { useEffect, useState } from "react"
import Header from "../../Components/Header/Header"
import Footer from "./../../Components/Footer/Footer"
import Breadcrumb from "./../../Components/Breadcrumb/Breadcrumb"
import { IoIosArrowBack } from "react-icons/io"

import "./ArticleInfo.css"
import CommentsTextArea from "../../Components/CommentsTextArea/CommentsTextArea"

import { CiFileOn, CiTimer } from "react-icons/ci"
import {
  FaUser,
  FaEye,
  FaTwitter,
  FaTelegram,
  FaFacebookF,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa"
import { useParams } from "react-router-dom"
import DOMPurify from "dompurify"

export default function ArticleInfo() {
  const { articleName } = useParams()
  const [article, setArticle] = useState({})
  const [creator, setCreator] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const localStorageToken = JSON.parse(localStorage.getItem("user"))
    fetch(`http://localhost:4000/v1/articles/${articleName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          !localStorageToken ? "null" : localStorageToken.token
        }`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then((result) => {
        setArticle(result)
        setCreator(result.creator)
        setLoading(false)
      })
  }, [articleName])
  return (
    <>
      <Header />
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "مقاله ها",
            to: "/articles/1",
          },
          {
            id: 3,
            title: article.title,
            to: `/article-info/${articleName}`,
          },
        ]}
      />

      {!loading && (
        <main class="main">
          <div class="container">
            <div class="row">
              <div class="col-8">
                <div class="article">
                  <h1 class="article__title">{article.title}</h1>
                  <div class="article__header">
                    <div class="article-header__category article-header__item">
                      <CiFileOn class="article-header__icon" />
                      <a href="#" class="article-header__text">
                        {article.categoryID.title}
                      </a>
                    </div>
                    <div class="article-header__category article-header__item">
                      <FaUser class="article-header__icon" />

                      <span class="article-header__text">
                        ارسال شده توسط:{creator.name}
                      </span>
                    </div>
                    <div class="article-header__category article-header__item">
                      <CiTimer class="article-header__icon" />

                      <span class="article-header__text">
                        منتشر شده در تاریخ: {article.createdAt.slice(0, 10)}
                      </span>
                    </div>
                  </div>
                  <img
                    src={`http://localhost:4000/courses/covers/${article.cover}`}
                    alt="Article Cover"
                    class="article__banner img-fluid"
                  />
                  <div class="article__score">
                    <div class="article__score-icons">
                      <img
                        src="/images/svgs/star_fill.svg"
                        class="article__score-icon"
                      />
                      <img
                        src="/images/svgs/star_fill.svg"
                        class="article__score-icon"
                      />
                      <img
                        src="/images/svgs/star_fill.svg"
                        class="article__score-icon"
                      />
                      <img
                        src="/images/svgs/star_fill.svg"
                        class="article__score-icon"
                      />
                      <img
                        src="/images/svgs/star.svg"
                        class="article__score-icon"
                      />
                    </div>
                    <span class="article__score-text">
                      4.2/5 - (5 امتیاز)
                    </span>
                  </div>

                  <div class="article-read">
                    <span class="article-read__title">
                      آنچه در این مقاله خواهید خواند
                    </span>
                    <ul class="article-read__list">
                      <li class="article-read__item">
                        <a href="#" class="article-read__link">
                          معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                        </a>
                      </li>
                      <li class="article-read__item">
                        <a href="#" class="article-read__link">
                          یک راه آسان‌تر، دوره‌ های جاوا اسکریپت آکادمی سبزلرن!
                        </a>
                      </li>
                      <li class="article-read__item">
                        <a href="#" class="article-read__link">
                          ثبت نام در دوره‌ های جاوا اسکریپت سبزلرن:
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div
                    class="article-section"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(article.body),
                    }}
                  ></div>

                  <div class="article-social-media">
                    <span class="article-social-media__text">
                      اشتراک گذاری :
                    </span>
                    <a href="#" class="article-social-media__link">
                      <FaTelegram class="article-social-media__icon" />
                    </a>
                    <a href="#" class="article-social-media__link">
                      <FaTwitter class="article-social-media__icon" />
                    </a>
                    <a href="#" class="article-social-media__link">
                      <FaFacebookF class="article-social-media__icon" />
                    </a>
                  </div>
                </div>

                <div class="suggestion-">
                  <div class="row">
                    <div class="col-6">
                      <div class="suggestion-articles__right suggestion-articles__content">
                        <a href="#" class="suggestion-articles__icon-link">
                          <FaArrowRight class="suggestion-articles__icon" />
                        </a>
                        <a href="#" class="suggestion-articles__link">
                          سریع ترین و بهترین راه یادگیری جاوا اسکریپت چیست؟ |
                          تجربه برنامه نویسان
                        </a>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="suggestion-articles__left suggestion-articles__content">
                        <a href="#" class="suggestion-articles__icon-link">
                          <FaArrowLeft class="suggestion-articles__icon" />
                        </a>
                        <a href="#" class="suggestion-articles__link">
                          سریع ترین و بهترین راه یادگیری جاوا اسکریپت چیست؟ |
                          تجربه برنامه نویسان
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <CommentsTextArea
                comments={comments}
                submitComment={submitComment}
              /> */}
              </div>
              <div class="col-4">
                <div class="courses-info">
                  <div class="course-info">
                    <span class="course-info__courses-title">
                      پر امتیازترین دوره ها
                    </span>
                    <ul class="course-info__courses-list">
                      <li class="course-info__courses-list-item">
                        <a href="#" class="course-info__courses-link">
                          <img
                            src="/images/courses/js_project.png"
                            alt="Course Cover"
                            class="course-info__courses-img"
                          />
                          <span class="course-info__courses-text">
                            پروژه های تخصصی با جاوا اسکریپت
                          </span>
                        </a>
                      </li>
                      <li class="course-info__courses-list-item">
                        <a href="#" class="course-info__courses-link">
                          <img
                            src="/images/courses/fareelancer.png"
                            alt="Course Cover"
                            class="course-info__courses-img"
                          />
                          <span class="course-info__courses-text">
                            تعیین قیمت پروژه های فریلنسری
                          </span>
                        </a>
                      </li>
                      <li class="course-info__courses-list-item">
                        <a href="#" class="course-info__courses-link">
                          <img
                            src="/images/courses/nodejs.png"
                            alt="Course Cover"
                            class="course-info__courses-img"
                          />
                          <span class="course-info__courses-text">
                            دوره Api نویسی
                          </span>
                        </a>
                      </li>
                      <li class="course-info__courses-list-item">
                        <a href="#" class="course-info__courses-link">
                          <img
                            src="/images/courses/jango.png"
                            alt="Course Cover"
                            class="course-info__courses-img"
                          />
                          <span class="course-info__courses-text">
                            متخصص جنگو
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div class="course-info">
                    <span class="course-info__courses-title">
                      دسترسی سریع
                    </span>
                    <ul class="sidebar-articles__list">
                      <li class="sidebar-articles__item">
                        <IoIosArrowBack class="sidebar-articles__icon" />

                        <a href="#" class="sidebar-articles__link">
                          صفحه اصلی
                        </a>
                      </li>
                      <li class="sidebar-articles__item">
                        <IoIosArrowBack class="sidebar-articles__icon" />
                        <a href="#" class="sidebar-articles__link">
                          فرانت اند
                        </a>
                      </li>
                      <li class="sidebar-articles__item">
                        <IoIosArrowBack class="sidebar-articles__icon" />
                        <a href="#" class="sidebar-articles__link">
                          امنیت
                        </a>
                      </li>
                      <li class="sidebar-articles__item">
                        <IoIosArrowBack class="sidebar-articles__icon" />
                        <a href="#" class="sidebar-articles__link">
                          پایتون
                        </a>
                      </li>
                      <li class="sidebar-articles__item">
                        <IoIosArrowBack class="sidebar-articles__icon" />
                        <a href="#" class="sidebar-articles__link">
                          مهارت های نرم
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div class="course-info">
                    <span class="course-info__courses-title">
                      مقاله های جدید
                    </span>
                    <ul class="last-articles__list">
                      <li class="last-articles__item">
                        <a href="#" class="last-articles__link">
                          نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه
                          پایتون
                        </a>
                      </li>
                      <li class="last-articles__item">
                        <a href="#" class="last-articles__link">
                          نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه
                          پایتون
                        </a>
                      </li>
                      <li class="last-articles__item">
                        <a href="#" class="last-articles__link">
                          نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه
                          پایتون
                        </a>
                      </li>
                      <li class="last-articles__item">
                        <a href="#" class="last-articles__link">
                          نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه
                          پایتون
                        </a>
                      </li>
                      <li class="last-articles__item">
                        <a href="#" class="last-articles__link">
                          نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه
                          پایتون
                        </a>
                      </li>
                      <li class="last-articles__item">
                        <a href="#" class="last-articles__link">
                          نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه
                          پایتون
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div class="course-info">
                    <span class="course-info__courses-title">
                      دسته بندی مقالات
                    </span>
                    <ul class="sidebar-articles__list">
                      <li class="sidebar-articles__item">
                        <IoIosArrowBack class="sidebar-articles__icon" />
                        <a href="#" class="sidebar-articles__link">
                          صفحه اصلی
                        </a>
                      </li>
                      <li class="sidebar-articles__item">
                        <IoIosArrowBack class="sidebar-articles__icon" />
                        <a href="#" class="sidebar-articles__link">
                          فرانت اند
                        </a>
                      </li>
                      <li class="sidebar-articles__item">
                        <IoIosArrowBack class="sidebar-articles__icon" />
                        <a href="#" class="sidebar-articles__link">
                          امنیت
                        </a>
                      </li>
                      <li class="sidebar-articles__item">
                        <IoIosArrowBack class="sidebar-articles__icon" />
                        <a href="#" class="sidebar-articles__link">
                          پایتون
                        </a>
                      </li>
                      <li class="sidebar-articles__item">
                        <IoIosArrowBack class="sidebar-articles__icon" />
                        <a href="#" class="sidebar-articles__link">
                          مهارت های نرم
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div class="course-info">
                    <span class="course-info__courses-title">
                      دوره های جدید
                    </span>
                    <ul class="sidebar-articles__list">
                      <li class="sidebar-articles__item">
                        <IoIosArrowBack class="sidebar-articles__icon" />
                        <a href="#" class="sidebar-articles__link">
                          صفحه اصلی
                        </a>
                      </li>
                      <li class="sidebar-articles__item">
                        <IoIosArrowBack class="sidebar-articles__icon" />
                        <a href="#" class="sidebar-articles__link">
                          فرانت اند
                        </a>
                      </li>
                      <li class="sidebar-articles__item">
                        <IoIosArrowBack class="sidebar-articles__icon" />
                        <a href="#" class="sidebar-articles__link">
                          امنیت
                        </a>
                      </li>
                      <li class="sidebar-articles__item">
                        <IoIosArrowBack class="sidebar-articles__icon" />
                        <a href="#" class="sidebar-articles__link">
                          پایتون
                        </a>
                      </li>
                      <li class="sidebar-articles__item">
                        <IoIosArrowBack class="sidebar-articles__icon" />
                        <a href="#" class="sidebar-articles__link">
                          مهارت های نرم
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      <Footer />
    </>
  )
}
