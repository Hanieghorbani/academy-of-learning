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
        <main className="main">
          <div className="container">
            <div className="row">
              <div className="col-8">
                <div className="article">
                  <h1 className="article__title">{article.title}</h1>
                  <div className="article__header">
                    <div className="article-header__category article-header__item">
                      <CiFileOn className="article-header__icon" />
                      <a href="#" className="article-header__text">
                        {article.categoryID.title}
                      </a>
                    </div>
                    <div className="article-header__category article-header__item">
                      <FaUser className="article-header__icon" />

                      <span className="article-header__text">
                        ارسال شده توسط:{creator.name}
                      </span>
                    </div>
                    <div className="article-header__category article-header__item">
                      <CiTimer className="article-header__icon" />

                      <span className="article-header__text">
                        منتشر شده در تاریخ: {article.createdAt.slice(0, 10)}
                      </span>
                    </div>
                  </div>
                  <img
                    src={`http://localhost:4000/courses/covers/${article.cover}`}
                    alt="Article Cover"
                    className="article__banner img-fluid"
                  />
                  <div className="article__score">
                    <div className="article__score-icons">
                      <img
                        src="/images/svgs/star_fill.svg"
                        className="article__score-icon"
                      />
                      <img
                        src="/images/svgs/star_fill.svg"
                        className="article__score-icon"
                      />
                      <img
                        src="/images/svgs/star_fill.svg"
                        className="article__score-icon"
                      />
                      <img
                        src="/images/svgs/star_fill.svg"
                        className="article__score-icon"
                      />
                      <img
                        src="/images/svgs/star.svg"
                        className="article__score-icon"
                      />
                    </div>
                    <span className="article__score-text">
                      4.2/5 - (5 امتیاز)
                    </span>
                  </div>

                  <div className="article-read">
                    <span className="article-read__title">
                      آنچه در این مقاله خواهید خواند
                    </span>
                    <ul className="article-read__list">
                      <li className="article-read__item">
                        <a href="#" className="article-read__link">
                          معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                        </a>
                      </li>
                      <li className="article-read__item">
                        <a href="#" className="article-read__link">
                          یک راه آسان‌تر، دوره‌ های جاوا اسکریپت آکادمی سبزلرن!
                        </a>
                      </li>
                      <li className="article-read__item">
                        <a href="#" className="article-read__link">
                          ثبت نام در دوره‌ های جاوا اسکریپت سبزلرن:
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="article-section"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(article.body),
                    }}
                  ></div>

                  <div className="article-social-media">
                    <span className="article-social-media__text">
                      اشتراک گذاری :
                    </span>
                    <a href="#" className="article-social-media__link">
                      <FaTelegram className="article-social-media__icon" />
                    </a>
                    <a href="#" className="article-social-media__link">
                      <FaTwitter className="article-social-media__icon" />
                    </a>
                    <a href="#" className="article-social-media__link">
                      <FaFacebookF className="article-social-media__icon" />
                    </a>
                  </div>
                </div>

                <div className="suggestion-">
                  <div className="row">
                    <div className="col-6">
                      <div className="suggestion-articles__right suggestion-articles__content">
                        <a href="#" className="suggestion-articles__icon-link">
                          <FaArrowRight className="suggestion-articles__icon" />
                        </a>
                        <a href="#" className="suggestion-articles__link">
                          سریع ترین و بهترین راه یادگیری جاوا اسکریپت چیست؟ |
                          تجربه برنامه نویسان
                        </a>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="suggestion-articles__left suggestion-articles__content">
                        <a href="#" className="suggestion-articles__icon-link">
                          <FaArrowLeft className="suggestion-articles__icon" />
                        </a>
                        <a href="#" className="suggestion-articles__link">
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
              <div className="col-4">
                <div className="courses-info">
                  <div className="course-info">
                    <span className="course-info__courses-title">
                      پر امتیازترین دوره ها
                    </span>
                    <ul className="course-info__courses-list">
                      <li className="course-info__courses-list-item">
                        <a href="#" className="course-info__courses-link">
                          <img
                            src="/images/courses/js_project.png"
                            alt="Course Cover"
                            className="course-info__courses-img"
                          />
                          <span className="course-info__courses-text">
                            پروژه های تخصصی با جاوا اسکریپت
                          </span>
                        </a>
                      </li>
                      <li className="course-info__courses-list-item">
                        <a href="#" className="course-info__courses-link">
                          <img
                            src="/images/courses/fareelancer.png"
                            alt="Course Cover"
                            className="course-info__courses-img"
                          />
                          <span className="course-info__courses-text">
                            تعیین قیمت پروژه های فریلنسری
                          </span>
                        </a>
                      </li>
                      <li className="course-info__courses-list-item">
                        <a href="#" className="course-info__courses-link">
                          <img
                            src="/images/courses/nodejs.png"
                            alt="Course Cover"
                            className="course-info__courses-img"
                          />
                          <span className="course-info__courses-text">
                            دوره Api نویسی
                          </span>
                        </a>
                      </li>
                      <li className="course-info__courses-list-item">
                        <a href="#" className="course-info__courses-link">
                          <img
                            src="/images/courses/jango.png"
                            alt="Course Cover"
                            className="course-info__courses-img"
                          />
                          <span className="course-info__courses-text">
                            متخصص جنگو
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="course-info">
                    <span className="course-info__courses-title">
                      دسترسی سریع
                    </span>
                    <ul className="sidebar-articles__list">
                      <li className="sidebar-articles__item">
                        <IoIosArrowBack className="sidebar-articles__icon" />

                        <a href="#" className="sidebar-articles__link">
                          صفحه اصلی
                        </a>
                      </li>
                      <li className="sidebar-articles__item">
                        <IoIosArrowBack className="sidebar-articles__icon" />
                        <a href="#" className="sidebar-articles__link">
                          فرانت اند
                        </a>
                      </li>
                      <li className="sidebar-articles__item">
                        <IoIosArrowBack className="sidebar-articles__icon" />
                        <a href="#" className="sidebar-articles__link">
                          امنیت
                        </a>
                      </li>
                      <li className="sidebar-articles__item">
                        <IoIosArrowBack className="sidebar-articles__icon" />
                        <a href="#" className="sidebar-articles__link">
                          پایتون
                        </a>
                      </li>
                      <li className="sidebar-articles__item">
                        <IoIosArrowBack className="sidebar-articles__icon" />
                        <a href="#" className="sidebar-articles__link">
                          مهارت های نرم
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="course-info">
                    <span className="course-info__courses-title">
                      مقاله های جدید
                    </span>
                    <ul className="last-articles__list">
                      <li className="last-articles__item">
                        <a href="#" className="last-articles__link">
                          نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه
                          پایتون
                        </a>
                      </li>
                      <li className="last-articles__item">
                        <a href="#" className="last-articles__link">
                          نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه
                          پایتون
                        </a>
                      </li>
                      <li className="last-articles__item">
                        <a href="#" className="last-articles__link">
                          نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه
                          پایتون
                        </a>
                      </li>
                      <li className="last-articles__item">
                        <a href="#" className="last-articles__link">
                          نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه
                          پایتون
                        </a>
                      </li>
                      <li className="last-articles__item">
                        <a href="#" className="last-articles__link">
                          نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه
                          پایتون
                        </a>
                      </li>
                      <li className="last-articles__item">
                        <a href="#" className="last-articles__link">
                          نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه
                          پایتون
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="course-info">
                    <span className="course-info__courses-title">
                      دسته بندی مقالات
                    </span>
                    <ul className="sidebar-articles__list">
                      <li className="sidebar-articles__item">
                        <IoIosArrowBack className="sidebar-articles__icon" />
                        <a href="#" className="sidebar-articles__link">
                          صفحه اصلی
                        </a>
                      </li>
                      <li className="sidebar-articles__item">
                        <IoIosArrowBack className="sidebar-articles__icon" />
                        <a href="#" className="sidebar-articles__link">
                          فرانت اند
                        </a>
                      </li>
                      <li className="sidebar-articles__item">
                        <IoIosArrowBack className="sidebar-articles__icon" />
                        <a href="#" className="sidebar-articles__link">
                          امنیت
                        </a>
                      </li>
                      <li className="sidebar-articles__item">
                        <IoIosArrowBack className="sidebar-articles__icon" />
                        <a href="#" className="sidebar-articles__link">
                          پایتون
                        </a>
                      </li>
                      <li className="sidebar-articles__item">
                        <IoIosArrowBack className="sidebar-articles__icon" />
                        <a href="#" className="sidebar-articles__link">
                          مهارت های نرم
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="course-info">
                    <span className="course-info__courses-title">
                      دوره های جدید
                    </span>
                    <ul className="sidebar-articles__list">
                      <li className="sidebar-articles__item">
                        <IoIosArrowBack className="sidebar-articles__icon" />
                        <a href="#" className="sidebar-articles__link">
                          صفحه اصلی
                        </a>
                      </li>
                      <li className="sidebar-articles__item">
                        <IoIosArrowBack className="sidebar-articles__icon" />
                        <a href="#" className="sidebar-articles__link">
                          فرانت اند
                        </a>
                      </li>
                      <li className="sidebar-articles__item">
                        <IoIosArrowBack className="sidebar-articles__icon" />
                        <a href="#" className="sidebar-articles__link">
                          امنیت
                        </a>
                      </li>
                      <li className="sidebar-articles__item">
                        <IoIosArrowBack className="sidebar-articles__icon" />
                        <a href="#" className="sidebar-articles__link">
                          پایتون
                        </a>
                      </li>
                      <li className="sidebar-articles__item">
                        <IoIosArrowBack className="sidebar-articles__icon" />
                        <a href="#" className="sidebar-articles__link">
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
