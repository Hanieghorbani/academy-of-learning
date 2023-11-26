import React, { useEffect, useState } from "react"
import "./CourseInfo.css"
import Header from "../../Components/Header/Header"
import Footer from "../../Components/Footer/Footer"
import CourseDetailsBox from "../../Components/CourseDetailBox/CourseDetailBox"
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb"
import CommentsTextArea from "../../Components/CommentsTextArea/CommentsTextArea"
import swal from "sweetalert"

import { Accordion } from "react-bootstrap"
import { BsTelegram, BsFacebook } from "react-icons/bs"
import { BiLogoTwitter } from "react-icons/bi"
import {
  FaGraduationCap,
  FaEye,
  FaLink,
  FaYoutube,
  FaChalkboardTeacher,
} from "react-icons/fa"
import { AiFillWechat } from "react-icons/ai"
import { PiStudentBold } from "react-icons/pi"
import { useParams, useNavigate } from "react-router-dom"

export default function CourseInfo() {
  const navigate = useNavigate()
  const [comments, setComments] = useState([])
  const [sessions, setSessions] = useState([])
  const [categoryID, setCategoryID] = useState([])
  const [courseInfos, setCourseInfos] = useState({})
  const [creator, setCreator] = useState([])
  const [updatedAt, setUpdatedAt] = useState("")
  const [createdAt, setCreatedAt] = useState("")
  const { courseName } = useParams()
  useEffect(() => {
    const localStorageToken = JSON.parse(localStorage.getItem("user"))
    fetch(`http://localhost:4000/v1/courses/${courseName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          localStorageToken ? localStorageToken.token : "null"
        }`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          return res.text().then((text) => {
            throw new Error(text)
          })
        }
      })
      .then((result) => {
        setComments(result.comments)
        setSessions(result.sessions)
        setCategoryID(result.categoryID)
        setCourseInfos(result)
        setUpdatedAt(result.updatedAt)
        setCreatedAt(result.categoryID.createdAt)
        setCreator(result.creator)
      })
      .catch((err) => {
        swal({
          title: "دوره یافت نشد",
          text: "این دوره صرفا جهت پر شدن منو اضافه شده.لظفا یک دوره دیگر را انتخاب کنید",
          icon: "error",
          dangerMode: true,
          buttons: "صفحه اصلی",
        }).then((value) => {
          navigate("/")
        })
      })
  }, [courseName])

  const submitComment = (score, contentComment, clearCommentTextArea) => {
    const localStorageToken = JSON.parse(localStorage.getItem("user"))
    fetch(`http://localhost:4000/v1/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageToken.token}`,
      },
      body: JSON.stringify({
        body: contentComment,
        courseShortName: courseName,
        score: score,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        swal({
          title: "نظر شما پس از بررسی و تایید مدیر ثبت خواهد شد",
          icon: "success",
          dangerMode: false,
          buttons: "تایید",
        }).then((res) => {
          clearCommentTextArea()
        })
      })
  }
  return (
    <div>
      <Header />
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "/" },
          {
            id: 2,
            title: `آموزش ${categoryID.title}`,
            to: `/category-info/${categoryID.name}/1`,
          },
          {
            id: 3,
            title: courseInfos.name,
            to: `/course-info/${courseName}`,
          },
        ]}
      />

      <section className="course-info shadow p-3">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <a href="#" className="course-info__link">
                {categoryID.title}
              </a>
              <h1 className="course-info__title">{courseInfos.name}</h1>
              <p className="course-info__text">{courseInfos.description}</p>
              <div className="course-info__social-media">
                <a href="#" className="course-info__social-media-item">
                  <BsTelegram className="course-info__icon" />
                </a>
                <a href="#" className="course-info__social-media-item">
                  <BiLogoTwitter className="course-info__icon" />
                </a>
                <a href="#" className="course-info__social-media-item">
                  <BsFacebook className="course-info__icon" />
                </a>
              </div>
            </div>

            <div className="col-6">
              <video
                src=""
                poster={`http://localhost:4000/courses/covers/${courseInfos.cover}`}
                className="course-info__video"
                controls
              ></video>
            </div>
          </div>
        </div>
      </section>

      <main className="main my-4">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="course">
                {/* Start Course Boxes */}
                <div className="course-boxes">
                  <div className="row">
                    <CourseDetailsBox
                      title={"وضعیت دوره:"}
                      desc={
                        courseInfos.isComplete
                          ? "به اتمام رسیده"
                          : "درحال برگزاری"
                      }
                      icon={"FaGraduationCap"}
                    />
                    <CourseDetailsBox
                      title={"تاریخ برگزاری"}
                      desc={createdAt.slice(0, 10)}
                      icon={"BiSolidTimeFive"}
                    />
                    <CourseDetailsBox
                      title={"آخرین بروزرسانی:"}
                      desc={updatedAt.slice(0, 10)}
                      icon={"FaCalendarAlt"}
                    />
                    <CourseDetailsBox
                      title={"روش پشتیبانی"}
                      desc={courseInfos.support}
                      icon={"BiSolidUser"}
                    />
                    <CourseDetailsBox
                      title={"پیش نیاز:"}
                      desc={"HTML CSS"}
                      icon={"AiFillInfoCircle"}
                    />
                    <CourseDetailsBox
                      title={"نوع مشاهده:"}
                      desc={"ضبط شده / آنلاین"}
                      icon={"FaPlay"}
                    />
                  </div>
                </div>
                {/* finish Course Boxes */}

                {/* Start Course Progress */}
                <div className="course-progress">
                  <div className="course-progress__header">
                    <i className="fas fa-chart-line course-progress__icon"></i>
                    <span className="course-progress__title">
                      درصد پیشرفت دوره: 100%
                    </span>
                  </div>
                  <div className="progress course-progress__bar">
                    <div
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      role="progressbar"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
                {/* Finish Course Progress */}

                {/* Start Introduction */}
                <div className="introduction">
                  <div className="introduction__item">
                    <span className="introduction__title title">
                      آموزش 20 کتابخانه جاوا اسکریپت مخصوص بازار کار
                    </span>
                    <img
                      src="/images/info/1.gif"
                      alt="course info image"
                      className="introduction__img img-fluid"
                    />
                    <p className="introduction__text">
                      کتابخانه های بسیار زیادی برای زبان جاوا اسکریپت وجود دارد
                      و سالانه چندین کتابخانه جدید نیز به این لیست اضافه می شود
                      که در بازار کار به شدت از آن ها استفاده می شود و اگر بدون
                      بلد بودن این کتابخانه ها وارد بازار کار شوید، خیلی اذیت
                      خواهید شد و حتی ممکن است ناامید شوید!
                    </p>
                    <p className="introduction__text">
                      در این دوره نحوه کار با 20 مورد از پر استفاده ترین
                      کتابخانه های جاوا اسکریپت به صورت پروژه محور به شما عزیزان
                      آموزش داده می شود تا هیچ مشکلی برای ورود به بازار کار
                      نداشته باشید
                    </p>
                  </div>
                  <div className="introduction__item">
                    <span className="introduction__title title">
                      هدف از این دوره چیست؟ (تنها راه ورود به بازار کار و کسب
                      درآمد)
                    </span>
                    <img
                      src="/images/info/2.jpg"
                      alt="course info image"
                      className="introduction__img img-fluid"
                    />
                    <p className="introduction__text">
                      وقتی برای اولین بار وارد یکی از شرکت های برنامه نویسی شدم،
                      از کتابخانه هایی به اسم Lodash و Formik استفاده می شد، در
                      حالی که من اولین بارم بود اسم Formik را می شنیدم و تا اون
                      موقع از این کتابخانه ها استفاده نکرده بودم.
                    </p>
                    <p className="introduction__text">
                      همینجا بود که متوجه شدم کتابخانه های جاوا اسکریپت یکی از
                      مهم ترین مباحثی هستند که هر برنامه نویس وب برای ورود به
                      بازار کار و کسب درآمد بهتر، راحت و بیشتر باید با آن ها کار
                      کرده باشد{" "}
                    </p>
                    <p className="introduction__text">
                      همان طور که از اسم این دوره مشخص است، هدف از این دوره
                      آموزش 20 مورد از کاربردی ترین و پر استفاده ترین کتابخانه
                      های جاوا اسکریپت است تا شما بتوانید بعد از این دوره با
                      قدرت و آمادگی بیشتر ادامه مسیر برنامه نویسی وب را ادامه
                      دهید، ری اکت یا نود یا … را راحت تر یاد بگیرید و در نهایت
                      وارد بازار کار شده و کسب درآمد کنید.
                    </p>
                    <p className="introduction__text">
                      شا به عنوان یک برنامه نویس وب، حداقل اگر با کتابخانه خاصی
                      کار نکرده باشید، باید بلد باشید که چطور باید یک کتابخانه
                      جدید را یاد بگیرید. فرض کنید یک یک کتابخانه جدید ساخته شد.
                      آیا شما باید منتظر دوره آموزشی باشید؟! قطعا نه.
                    </p>
                    <p className="introduction__text">
                      در این دوره سعی کردیم علاوه بر آموزش مستقیم هر کتابخانه،
                      نحوه یادگیری یک کتابخانه جدید را نیز به شما عزیزان آموزش
                      دهیم تا بعد از گذراندن دوره، دیگر وابسته هیچ دوره یا شخص
                      خاصی نباشید و اگر کتابخانه جدیدی به دنیای جاوا اسکریپت و
                      وب اضافه شد، به راحتی بتوانید آن را یاد بگیرید.
                    </p>
                  </div>
                  <div className="introduction__btns">
                    <a href="#" className="introduction__btns-item mx-3">
                      دانلود همگانی ویدیوها
                    </a>
                    <a href="#" className="introduction__btns-item">
                      دانلود همگانی پیوست‌ها
                    </a>
                  </div>

                  <div className="introduction__topic">
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0" className="accordion">
                        <Accordion.Header>پیش نیاز های دوره</Accordion.Header>
                        {sessions.length != 0 ? (
                          <>
                            {sessions.map((session, index) => (
                              <Accordion.Body key={session.id}>
                                <div
                                  id="collapseOne"
                                  className="accordion-collapse collapse show"
                                  aria-labelledby="headingOne"
                                  data-bs-parent="#accordionExample"
                                >
                                  <div className="accordion-body introduction__accordion-body">
                                    <div className="introduction__accordion-right">
                                      <span className="introduction__accordion-count">
                                        {index + 1}
                                      </span>
                                      <FaYoutube className="introduction__accordion-icon" />
                                      <a
                                        href="#"
                                        className="introduction__accordion-link"
                                      >
                                        {session.title}
                                      </a>
                                    </div>
                                    <div className="introduction__accordion-left">
                                      <span className="introduction__accordion-time">
                                        18:34
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </Accordion.Body>
                            ))}
                          </>
                        ) : (
                          <Accordion.Body>
                            <div
                              id="collapseOne"
                              className="accordion-collapse collapse show"
                              aria-labelledby="headingOne"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body introduction__accordion-body">
                                <div className="introduction__accordion-right">
                                  <a
                                    href="#"
                                    className="introduction__accordion-link"
                                  >
                                    برای این دوره هنوز ویدیویی ضبط نشده !
                                  </a>
                                </div>
                                <div className="introduction__accordion-left">
                                  <span className="introduction__accordion-time"></span>
                                </div>
                              </div>
                            </div>
                          </Accordion.Body>
                        )}
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>
                {/* Finish Introduction  */}

                {/* Start Teacher Details */}

                <div className="techer-details">
                  <div className="techer-details__header">
                    <div className="techer-details__header-right">
                      <img
                        src="/images/info/teacher.jfif"
                        // src={creator.profile}
                        alt="Teacher Profile"
                        className="techer-details__header-img"
                      />
                      <div className="techer-details__header-titles">
                        <a href="#" className="techer-details__header-link">
                          {creator ? creator.name : "نا معلوم"}
                        </a>
                        <span className="techer-details__header-skill">
                          Front End & Back End Developer
                        </span>
                      </div>
                    </div>
                    <div className="techer-details__header-left">
                      <FaChalkboardTeacher className="techer-details__header-icon" />
                      <span className="techer-details__header-name">مدرس</span>
                    </div>
                  </div>
                  <p className="techer-details__footer">
                    اول از همه برنامه نویسی اندروید رو شروع کردم و نزدیک به 2
                    سال با زبان جاوا اندروید کار میکردم .بعد تصمیم گرفتم در
                    زمینه وب فعالیت داشته باشم.و..
                  </p>
                </div>

                {/* Finish Teacher Details  */}
                <CommentsTextArea
                  comments={comments}
                  submitComment={submitComment}
                />
              </div>
            </div>
            <div className="col-4">
              <div className="courses-info">
                <div className="course-info">
                  <div className="course-info__register">
                    <span className="course-info__register-title">
                      {courseInfos.isUserRegisteredToThisCourse ? (
                        <>
                          <FaGraduationCap className="course-info__register-icon ms-3" />
                          دانشجو دوره هستید
                        </>
                      ) : (
                        "ثبت نام در دوره"
                      )}
                    </span>
                  </div>
                </div>
                <div className="course-info">
                  <div className="course-info__total">
                    <div className="course-info__top">
                      <div className="course-info__total-sale">
                        <PiStudentBold className="course-info__total-sale-icon ms-3" />
                        <span className="course-info__total-sale-text">
                          تعداد دانشجو :
                        </span>
                        <span className="course-info__total-sale-number">
                          {courseInfos.courseStudentsCount}
                        </span>
                      </div>
                    </div>
                    <div className="course-info__bottom">
                      <div className="course-info__total-comment">
                        <AiFillWechat className="course-info__total-comment-icon" />
                        <span className="course-info__total-comment-text">
                          {comments.length}
                          دیدگاه
                        </span>
                      </div>
                      <div className="course-info__total-view">
                        <FaEye className="course-info__total-view-icon" />
                        <span className="course-info__total-view-text">
                          14,234 بازدید
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="course-info">
                  <div className="course-info__header-short-url">
                    <FaLink className="course-info__short-url-icon" />
                    <span className="course-info__short-url-text">
                      لینک کوتاه
                    </span>
                  </div>
                  <span className="course-info__short-url">
                    https://sabzlearn.ir/?p=117472
                  </span>
                </div>
                <div className="course-info">
                  <span className="course-info__topic-title">
                    سرفصل های دوره
                  </span>
                  <span className="course-info__topic-text">
                    برای مشاهده و یا دانلود دوره روی کلمه
                    <a
                      href="#"
                      className="mx-3"
                      style={{ color: "blue", fontWeight: "bold" }}
                    >
                      لینک
                    </a>
                    کلیک کنید
                  </span>
                </div>
                <div className="course-info">
                  <span className="course-info__courses-title">
                    دوره های مرتبط
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
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
