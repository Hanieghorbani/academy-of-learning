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
        Authorization: `Bearer ${localStorageToken.token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          console.log(res)
        }
      })
      .then((result) => {
        console.log(result)
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
            title: "ویو Vs ری‌اکت",
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
                    src="/images/blog/1.jpg"
                    alt="Article Cover"
                    className="article__banner"
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

                  <p className="article__paragraph paragraph">
                    جاوا اسکریپت یکی از زبان‌های برنامه‌نویسی اصلی حوزه
                    فرانت‌اند است که به واسطه فریم ورک‌های آن می‌توان انواع وب
                    سایت‌ها، اپلیکیشن‌ها و وب اپلیکیشن‌ها را طراحی کرد. به طور
                    کلی بعد از یادگیری html و css معمولاً باید آموزش جاوا
                    اسکریپت را نیز فرا بگیرید. . چرا که این زبان تکمیل‌کننده
                    html و css بوده و در چنین شرایطی موقعیت‌های شغلی بیشتر را در
                    اختیار خواهید داشت و همچنین می‌توانید پروژه‌های گسترده‌تری
                    را انجام دهید. در حال حاضر با وجود منابع رایگان موجود در وب
                    شما به راحتی می‌توانید زبان جاوا اسکریپت را به صورت حرفه‌ای
                    فرا بگیرید. به همین واسطه در ادامه مطلب قصد داریم سایت‌های
                    شاخص آموزش این زبان برنامه‌نویسی در جهان را به شما معرفی
                    کنیم و در آخر بگوییم که بهترین سایت آموزش جاوا اسکریپت کدام
                    است.
                  </p>

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

                  <img
                    src="/images/blog/2.jpg"
                    alt="Article Image"
                    className="article__seconadary-banner"
                  />
                  <div className="article-section">
                    <h2 className="article-section__title">
                      معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                    </h2>
                    <p className="paragraph article-section__text">
                      توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین
                      سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی
                      هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه
                      شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته
                      باشید و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را
                      ترجمه کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای
                      محتوا به شما خواهیم گفت که راه آسان دیگری برای یادگیری
                      زبان جاوا اسکریپت وجود دارد که شما بتوانید به واسطه آن به
                      صورت رایگان و به زبان فارسی این زبان را یاد بگیرید.
                    </p>
                    <img
                      src="/images/blog/4.png"
                      alt="article body img"
                      className="article-section__img"
                    />
                  </div>
                  <div className="article-section">
                    <h2 className="article-section__title">
                      معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                    </h2>
                    <p className="paragraph article-section__text">
                      توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین
                      سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی
                      هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه
                      شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته
                      باشید و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را
                      ترجمه کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای
                      محتوا به شما خواهیم گفت که راه آسان دیگری برای یادگیری
                      زبان جاوا اسکریپت وجود دارد که شما بتوانید به واسطه آن به
                      صورت رایگان و به زبان فارسی این زبان را یاد بگیرید.
                    </p>
                  </div>
                  <div className="article-section">
                    <h2 className="article-section__title">
                      معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                    </h2>
                    <p className="paragraph article-section__text">
                      توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین
                      سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی
                      هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه
                      شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته
                      باشید و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را
                      ترجمه کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای
                      محتوا به شما خواهیم گفت که راه آسان دیگری برای یادگیری
                      زبان جاوا اسکریپت وجود دارد که شما بتوانید به واسطه آن به
                      صورت رایگان و به زبان فارسی این زبان را یاد بگیرید.
                    </p>
                    <img
                      src="/images/blog/3.jpg"
                      alt="article body img"
                      className="article-section__img"
                    />
                  </div>

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
