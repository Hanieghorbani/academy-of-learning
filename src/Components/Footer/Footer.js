import React from "react";
import FooterItem from "../FooterItem/FooterItem";

import "./Footer.css";
import { Link } from "react-router-dom";
import Input from "../Form/Input";
import { useForm } from "../../hooks/useForm";
import { emailValidator } from "../../validators/rules";
import swal from "sweetalert";

export default function Footer() {
  const [formState, onInputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const addNewEmail = (event) => {
    event.preventDefault();
    fetch("http://localhost:4000/v1/newsletters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: formState.inputs.email.value}),
    }).then((res) => {
      if (res.ok) {
        swal({
          text: "ایمیل شما در خبر نامه ثبت شد",
          icon: "success",
          dangerMode: false,
          buttons: "تایید",
        })
      }
    });
  };
  return (
    <footer class="footer">
      <div class="container">
        <div class="footer-widgets">
          <div class="row">
            <FooterItem title="درباره ما">
              <p class="footer-widgets__text">
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
              <div class="footer-widgets__links">
                <a href="#" class="footer-widgets__link">
                  نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                </a>
                <a href="#" class="footer-widgets__link">
                  چگونه پایتون را آپدیت کنیم؟ | آموزش صفر تا صد آپدیت کردن
                  پایتون
                </a>
                <a href="#" class="footer-widgets__link">
                  آموزش نصب پایتون ( Python ) در در مک، ویندوز و لینوکس | گام به
                  گام و تصویری
                </a>
                <a href="#" class="footer-widgets__link">
                  بهترین فریم ورک های فرانت اند | 16 فریم ورک Front end بررسی
                  معایب و مزایا
                </a>
                <a href="#" class="footer-widgets__link">
                  معرفی بهترین سایت آموزش جاوا اسکریپت [ تجربه محور ] + آموزش
                  رایگان
                </a>
              </div>
            </FooterItem>

            <FooterItem title="دسترسی سریع">
              <div class="row">
                <div class="col-6">
                  <Link to={'/course-info/html'} class="footer-widgets__link">
                    آموزش HTML
                  </Link>
                </div>
                <div class="col-6">
                  <Link to={'/course-info/node-expert'} class="footer-widgets__link">
                    آموزش nodeJS
                  </Link>
                </div>
                <div class="col-6">
                  <Link to={'/course-info/bootstrap'} class="footer-widgets__link">
                    آموزش بوت استرپ
                  </Link>
                </div>
                <div class="col-6">
                  <Link to={'/course-info/npm'} class="footer-widgets__link">
                    آموزش NPM
                  </Link>
                </div>

                <div class="col-6">
                  <Link to={'/course-info/vuejs'} class="footer-widgets__link">
                    آموزش VueJS
                  </Link>
                </div>
                <div class="col-6">
                  <Link to={'/contact'} class="footer-widgets__link">
                    ارتباط با ما
                  </Link>
                </div>
                <div class="col-12">
                  <span class="footer-widgets__title">اشتراک در خبرنامه</span>
                  <span class="footer-widgets__text text-center d-block">
                    جهت اطلاع از آخرین اخبار و تخفیف های سایت مشترک شوید!
                  </span>
                  <form action="#" class="footer-widgets__form">
                    <Input
                      element="input"
                      id="email"
                      type="text"
                      class="footer-widgets__input"
                      placeholder="ایمیل خود را وارد کنید."
                      onInputHandler={onInputHandler}
                      validations={[emailValidator()]}
                    />
                    <button
                      type="submit"
                      class="footer-widgets__btn"
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

      <div class="footer__copyright">
        <span class="footer__copyright-text">
          کلیه حقوق برای آکادمی آموزش برنامه نویسی سبز لرن محفوظ است.
        </span>
      </div>
    </footer>
  );
}
