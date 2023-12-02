import React, { useContext, useState } from "react"
import "./Register.css"
import { Link } from "react-router-dom"
import Footer from "../../Components/Footer/Footer"
import Button from "../../Components/Form/Button"
import Input from "../../Components/Form/Input"
import Header from "../../Components/Header/Header"
import { useForm } from "../../hooks/useForm"
import swal from "sweetalert"
import { useNavigate } from "react-router-dom"
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
  phoneValidator,
} from "../../validators/rules"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import {
  FaEnvelope,
  FaUserPlus,
  FaRegUserCircle,
  FaPhoneAlt,
} from "react-icons/fa"
import { BiSolidUser } from "react-icons/bi"
import AuthContext from "../../userContext/authContext"

export default function Register() {
  const navigate = useNavigate()
  const [isShowPass, setIsShowPass] = useState(false)
  const [isShowConfirmPass, setIsShowConfirmPass] = useState(false)
  const [formState, onInputHandler] = useForm(
    {
      registerName: {
        value: "",
        isValid: false,
      },
      registerEmail: {
        value: "",
        isValid: false,
      },
      registerUsername: {
        value: "",
        isValid: false,
      },
      registerPhone: {
        value: "",
        isValid: false,
      },
      registerPassword: {
        value: "",
        isValid: false,
      },
      registerConfirmPassword: {
        value: "",
        isValid: false,
      },
    },
    false
  )
  const contextData = useContext(AuthContext)

  const registerNewUser = (event) => {
    event.preventDefault()
    if (
      formState.inputs.registerPassword.value ===
      formState.inputs.registerConfirmPassword.value
    ) {
      const newUser = {
        name: formState.inputs.registerName.value,
        username: formState.inputs.registerUsername.value,
        email: formState.inputs.registerEmail.value,
        phone: formState.inputs.registerPhone.value,
        password: formState.inputs.registerPassword.value,
        confirmPassword: formState.inputs.registerConfirmPassword.value,
      }
      fetch(`http://localhost:4000/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
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
          contextData.login({}, result.accessToken)
          swal({
            text: " شما با موفقیت وارد حساب کاربری خود شدید",
            icon: "success",
            dangerMode: false,
            buttons: "ورود به پنل",
          }).then((value) => {
            navigate("/")
          })
        })
        .catch((err) => {
          console.log(err)
          if (err == 'Error: {"message":"this phone number banned!"}') {
            swal({
              text: "متاسفیم!شما از طرف مدیران سایت مسدود شدین..",
              icon: "error",
              dangerMode: true,
              buttons: "ارتباط با ما",
            }).then(() => {
              navigate("/contact")
            })
          } else if (
            err == 'Error: {"message":"username or email is duplicate."}'
          ) {
            swal({
              text: "ایمیل یا نام کاربری تکراری است.",
              icon: "error",
              dangerMode: true,
              buttons: "تلاش مجدد",
            }).then(() => {
              navigate("/register")
            })
          }
          {
          }
        })
    } else {
      swal({
        text: "تکرار رمز عبور اشتباه است !",
        icon: "error",
        dangerMode: true,
        buttons: "تلاش مجدد",
      })
    }
  }

  return (
    <>
      <Header />

      <section class="login-register">
        <div class="login register-form">
          <span class="login__title">ساخت حساب کاربری</span>
          <span class="login__subtitle">
            خوشحالیم قراره به جمع ما بپیوندی
          </span>
          <div class="login__new-member">
            <span class="login__new-member-text">
              قبلا ثبت‌نام کرده‌اید؟
            </span>
            <Link class="login__new-member-link" to="/login">
              وارد شوید
            </Link>
          </div>
          <form action="#" class="login-form">
            <div class="login-form__username">
              <Input
                id="registerName"
                type="text"
                placeholder="نام و نام خانوادگی"
                class="login-form__username-input"
                element="input"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
              />
              <FaRegUserCircle class="login-form__username-icon" />
            </div>
            <div class="login-form__username">
              <Input
                id="registerUsername"
                type="text"
                placeholder="نام کاربری"
                class="login-form__username-input"
                element="input"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
              />
              <BiSolidUser class="login-form__username-icon" />
            </div>
            <div class="login-form__password">
              <Input
                id="registerEmail"
                type="email"
                placeholder="آدرس ایمیل"
                class="login-form__username-input"
                element="input"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  maxValidator(25),
                  emailValidator(),
                ]}
              />
              <FaEnvelope class="login-form__password-icon " />
            </div>
            <div class="login-form__password">
              <Input
                id="registerPhone"
                type="number"
                placeholder="شماره همراه"
                class="login-form__username-input"
                element="input"
                onInputHandler={onInputHandler}
                validations={[phoneValidator()]}
              />
              <FaPhoneAlt class="login-form__password-icon " />
            </div>
            <div class="login-form__password">
              <Input
                id="registerPassword"
                type={isShowPass ? "text" : "password"}
                placeholder="رمز عبور"
                class="login-form__password-input"
                element="input"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(18),
                ]}
              />
              {isShowPass ? (
                <MdVisibilityOff
                  class="login-form__password-icon"
                  onClick={() => setIsShowPass(false)}
                />
              ) : (
                <MdVisibility
                  class="login-form__password-icon"
                  onClick={() => setIsShowPass(true)}
                />
              )}
            </div>
            <div class="login-form__password">
              <Input
                id="registerConfirmPassword"
                type={isShowConfirmPass ? "text" : "password"}
                placeholder="تکرار رمز عبور"
                class="login-form__password-input"
                element="input"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(18),
                ]}
              />
              {isShowConfirmPass ? (
                <MdVisibilityOff
                  class="login-form__password-icon"
                  onClick={() => setIsShowConfirmPass(false)}
                />
              ) : (
                <MdVisibility
                  class="login-form__password-icon"
                  onClick={() => setIsShowConfirmPass(true)}
                />
              )}
            </div>
            <Button
              class={`login-form__btn ${
                formState.isFormValid ? "bg-success" : "bg-danger"
              }`}
              type="submit"
              onClick={registerNewUser}
              disabled={!formState.isFormValid}
            >
              <FaUserPlus class="login-form__btn-icon" />
              <span class="login-form__btn-text">عضویت</span>
            </Button>
          </form>
          <div class="login__des">
            <span class="login__des-title">سلام کاربر محترم:</span>
            <ul class="login__des-list">
              <li class="login__des-item">
                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                استفاده کنید.
              </li>
              <li class="login__des-item">
                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
              </li>
              <li class="login__des-item">
                لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
