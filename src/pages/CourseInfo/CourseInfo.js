import React from "react"
import "./CourseInfo.css"
import Header from "../../Components/Header/Header"
import Footer from "../../Components/Footer/Footer"
import CourseDetailsBox from '../../Components/CourseDetailBox/CourseDetailBox'
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb"
import CommentsTextArea from "../../Components/CommentsTextArea/CommentsTextArea"
import { Accordion } from "react-bootstrap"
import { BsTelegram, BsFacebook } from "react-icons/bs"
import { BiLogoTwitter} from "react-icons/bi"
import {
  FaGraduationCap,
  FaEye,
  FaLink,
  FaYoutube
} from "react-icons/fa"
import { AiFillInfoCircle, AiFillWechat } from "react-icons/ai"
import { PiStudentBold } from "react-icons/pi"
import { GiChart } from "react-icons/gi"
export default function CourseInfo() {
  return (
    <div>
      <Header />
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "/" },
          {
            id: 2,
            title: "آموزش برنامه نویسی فرانت اند",
            to: "/categoryInfo/frontend",
          },
          {
            id: 3,
            title: "دوره متخصص جاوا اسکریپت",
            to: "/courseInfo/js-expert",
          },
        ]}
      />

      <section className="course-info shadow p-3">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <a href="#" className="course-info__link">
                آموزش برنامه نویسی فرانت اند
              </a>
              <h1 className="course-info__title">
                آموزش 20 کتابخانه جاوااسکریپت برای بازار کار
              </h1>
              <p className="course-info__text">
                امروزه کتابخانه‌ها کد نویسی را خیلی آسان و لذت بخش تر کرده اند.
                به قدری که حتی امروزه هیچ شرکت برنامه نویسی پروژه های خود را با
                Vanilla Js پیاده سازی نمی کند و همیشه از کتابخانه ها و فریمورک
                های موجود استفاده می کند. پس شما هم اگه میخواید یک برنامه نویس
                عالی فرانت اند باشید، باید کتابخانه های کاربردی که در بازار کار
                استفاده می شوند را به خوبی بلد باشید
              </p>
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
                poster="/images/courses/js_project.png"
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
                      desc={"به اتمام رسیده"}
                      icon={"FaGraduationCap"}
                    />
                    <CourseDetailsBox
                      title={"مدت زمان"}
                      desc={"19 ساعت"}
                      icon={"BiSolidTimeFive"}
                    />
                    <CourseDetailsBox
                      title={"آخرین بروزرسانی:"}
                      desc={"1401/03/02"}
                      icon={"FaCalendarAlt"}
                    />
                    <CourseDetailsBox
                      title={"روش پشتیبانی"}
                      desc={"آنلاین"}
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
                        <Accordion.Header> معرفی دوره</Accordion.Header>
                        <Accordion.Body>
                          <div
                            id="collapseOne"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body introduction__accordion-body">
                              <div className="introduction__accordion-right">
                                <span className="introduction__accordion-count">
                                  1
                                </span>
                                <FaYoutube  className="introduction__accordion-icon"/>
                                <a
                                  href="#"
                                  className="introduction__accordion-link"
                                >
                                  معرفی دوره + چرا یادگیری کتابخانه ها ضروری
                                  است؟
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
                      </Accordion.Item>
                    </Accordion>
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0" className="accordion">
                        <Accordion.Header>پیش نیاز های دوره</Accordion.Header>
                        <Accordion.Body>
                          <div
                            id="collapseOne"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body introduction__accordion-body">
                              <div className="introduction__accordion-right">
                                <span className="introduction__accordion-count">
                                  1
                                </span>
                                <FaYoutube  className="introduction__accordion-icon"/>
                                <a
                                  href="#"
                                  className="introduction__accordion-link"
                                >
                                  کتابخانه چیست ؟
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
                        <Accordion.Body>
                          <div
                            id="collapseOne"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body introduction__accordion-body">
                              <div className="introduction__accordion-right">
                                <span className="introduction__accordion-count">
                                  2
                                </span>
                                <FaYoutube  className="introduction__accordion-icon"/>
                                <a
                                  href="#"
                                  className="introduction__accordion-link"
                                >
                                  فرق کتابخانه با فریمورک
                                </a>
                              </div>
                              <div className="introduction__accordion-left">
                                <span className="introduction__accordion-time">
                                  11:43
                                </span>
                              </div>
                            </div>
                          </div>
                        </Accordion.Body>
                        <Accordion.Body>
                          <div
                            id="collapseOne"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body introduction__accordion-body">
                              <div className="introduction__accordion-right">
                                <span className="introduction__accordion-count">
                                  3
                                </span>
                                <FaYoutube  className="introduction__accordion-icon"/>
                                <a
                                  href="#"
                                  className="introduction__accordion-link"
                                >
                                  حل تمرین جلسه قبل
                                </a>
                              </div>
                              <div className="introduction__accordion-left">
                                <span className="introduction__accordion-time">
                                  28:56
                                </span>
                              </div>
                            </div>
                          </div>
                        </Accordion.Body>
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
                        alt="Teacher Profile"
                        className="techer-details__header-img"
                      />
                      <div className="techer-details__header-titles">
                        <a href="#" className="techer-details__header-link">
                          محمدامین سعیدی راد
                        </a>
                        <span className="techer-details__header-skill">
                          Front End & Back End Developer
                        </span>
                      </div>
                    </div>
                    <div className="techer-details__header-left">
                      <i className="fas fa-chalkboard-teacher techer-details__header-icon"></i>
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
                <CommentsTextArea />
              </div>
            </div>
            <div className="col-4">
              <div className="courses-info">
                <div className="course-info">
                  <div className="course-info__register">
                    <span className="course-info__register-title">
                      <FaGraduationCap className="course-info__register-icon ms-3" />
                      دانشجوی دوره هستید
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
                        <span className="course-info__total-sale-number">178</span>
                      </div>
                    </div>
                    <div className="course-info__bottom">
                      <div className="course-info__total-comment">
                        <AiFillWechat className="course-info__total-comment-icon" />
                        <span className="course-info__total-comment-text">
                          67 دیدگاه
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
                    <span className="course-info__short-url-text">لینک کوتاه</span>
                  </div>
                  <span className="course-info__short-url">
                    https://sabzlearn.ir/?p=117472
                  </span>
                </div>
                <div className="course-info">
                  <span className="course-info__topic-title">سرفصل های دوره</span>
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
                  <span className="course-info__courses-title">دوره های مرتبط</span>
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