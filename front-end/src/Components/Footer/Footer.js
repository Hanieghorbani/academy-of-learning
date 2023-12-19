import React, { useEffect, useState } from "react"
import FooterItem from "../FooterItem/FooterItem"

import "./Footer.css"
import { Link } from "react-router-dom"
import Input from "../Form/Input"
import { useForm } from "../../hooks/useForm"
import { emailValidator } from "../../validators/rules"
import swal from "sweetalert"

export default function Footer() {
  const [articles, setArticles] = useState([])
  const [formState, onInputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  )

  useEffect(() => {
    getAllArticles()
  }, [])
  function addNewEmail(event) {
    event.preventDefault()
    fetch("http://localhost:4000/v1/newsletters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: formState.inputs.email.value }),
    }).then((res) => {
      if (res.ok) {
        swal({
          text: "ایمیل شما در خبر نامه ثبت شد",
          icon: "success",
          dangerMode: false,
          buttons: "تایید",
        })
      }
    })
  }

  function getAllArticles() {
    fetch("http://localhost:4000/v1/articles")
      .then((res) => res.json())
      .then((allArticles) => {
        setArticles(allArticles)
      })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-widgets">
          <div className="row">
            <FooterItem title="درباره ما">
              <p className="footer-widgets__text">
                وقتی تازه شروع به یادگیری برنامه نویسی کردم. یکی از مشکلاتی که
                در فرآیند یادگیری داشتم، کمبود آموزش های خوب با پشتیبانی قابل
                قبول بود که باعث شد اون موقع تصمیم بگیرم اگر روزی توانایی مالی و
                فنی قابل قبولی داشتم یک وب سایت برای حل این مشکل راه اندازی کنم!
                و خب امروز آکادمی آموزش برنامه نویسی سبزلرن به عنوان یک آکادمی
                خصوصی فعالیت میکنه و این به این معنی هست که هر مدرسی اجازه تدریس
                در اون رو نداره و باید از فیلترینگ های خاص آکادمی سبزلرن رد شه!
                این به این معنی هست که ما برامون فن بیان و نحوه تعامل مدرس با
                دانشجو بسیار مهمه! ما در آکادمی سبزلرن تضمین پشتیبانی خوب و با
                کیفیت رو به شما میدیم . چرا که مدرسین وب سایت سبزلرن حتی برای
                پشتیبانی دوره های رایگان شون هم هزینه دریافت میکنند و متعهد
                هستند که هوای کاربر های عزیز رو داشته باشند !
              </p>
            </FooterItem>

            <FooterItem title="آخرین مطالب">
              <div className="footer-widgets__links">
                {articles.slice(0, 7).map((article) => (
                  <Link
                    key={article._id}
                    to={`/article-info/${article.shortName}`}
                    className="footer-widgets__link"
                  >
                    {article.title}
                  </Link>
                ))}
              </div>
            </FooterItem>

            <FooterItem title="دسترسی سریع">
              <div className="row">
                <div className="col-6">
                  <Link
                    to={"/course-info/html"}
                    className="footer-widgets__link"
                  >
                    آموزش HTML
                  </Link>
                </div>
                <div className="col-6">
                  <Link
                    to={"/course-info/node-expert"}
                    className="footer-widgets__link"
                  >
                    آموزش nodeJS
                  </Link>
                </div>
                <div className="col-6">
                  <Link
                    to={"/course-info/bootstrap"}
                    className="footer-widgets__link"
                  >
                    آموزش بوت استرپ
                  </Link>
                </div>
                <div className="col-6">
                  <Link
                    to={"/course-info/npm"}
                    className="footer-widgets__link"
                  >
                    آموزش NPM
                  </Link>
                </div>

                <div className="col-6">
                  <Link
                    to={"/course-info/vuejs"}
                    className="footer-widgets__link"
                  >
                    آموزش VueJS
                  </Link>
                </div>
                <div className="col-6">
                  <Link to={"/contact"} className="footer-widgets__link">
                    ارتباط با ما
                  </Link>
                </div>
                <div className="col-12">
                  <span className="footer-widgets__title">
                    اشتراک در خبرنامه
                  </span>
                  <span className="footer-widgets__text text-center d-block">
                    جهت اطلاع از آخرین اخبار و تخفیف های سایت مشترک شوید!
                  </span>
                  <form action="#" className="footer-widgets__form">
                    <Input
                      element="input"
                      id="email"
                      type="text"
                      className="footer-widgets__input"
                      placeholder="ایمیل خود را وارد کنید."
                      onInputHandler={onInputHandler}
                      validations={[emailValidator()]}
                    />
                    <button
                      type="submit"
                      className="footer-widgets__btn"
                      onClick={addNewEmail}
                    >
                      عضویت
                    </button>
                  </form>
                </div>
              </div>
            </FooterItem>
          </div>
        </div>
      </div>

      <div className="footer__copyright">
        <span className="footer__copyright-text">
          کلیه حقوق برای آکادمی آموزش برنامه نویسی سبز لرن محفوظ است.
        </span>
      </div>
    </footer>
  )
}
