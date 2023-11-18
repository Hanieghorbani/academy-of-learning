import React from "react"
import { Link } from "react-router-dom"
import Footer from "../../Components/Footer/Footer"
import Button from "../../Components/Form/Button"
import Input from "../../Components/Form/Input"
import Header from "../../Components/Header/Header"
import { useForm } from "../../hooks/useForm"
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "../../validators/rules"
import { FaEye, FaEnvelope, FaUserPlus } from "react-icons/fa"
import { BiSolidTimeFive, BiSolidUser } from "react-icons/bi"
import { MdInput } from "react-icons/md"

import "./Register.css"

export default function Register() {
  const [formState, onInputHandler] = useForm(
    {
      registerEmail: {
        value: "",
        isValid: false,
      },
      registerUsername: {
        value: "",
        isValid: false,
      },
      registerPassword: {
        value: "",
        isValid: false,
      },
    },
    false
  )
  const registerNewUser = (event) => {
    event.preventDefault()
    console.log("User Register")
  }

  return (
    <>
      <Header />

      <section className="login-register">
        <div className="login register-form">
          <span className="login__title">ساخت حساب کاربری</span>
          <span className="login__subtitle">
            خوشحالیم قراره به جمع ما بپیوندی
          </span>
          <div className="login__new-member">
            <span className="login__new-member-text">
              قبلا ثبت‌نام کرده‌اید؟{" "}
            </span>
            <Link className="login__new-member-link" to="/login">
              وارد شوید
            </Link>
          </div>
          <form action="#" className="login-form">
            <div className="login-form__username">
              <Input
                id="registerUsername"
                type="text"
                placeholder="نام کاربری"
                className="login-form__username-input"
                element="input"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
              />
              <BiSolidUser className="login-form__username-icon" />
            </div>
            <div className="login-form__password">
              <Input
                id="registerEmail"
                type="email"
                placeholder="آدرس ایمیل"
                className="login-form__username-input"
                element="input"
                onInputHandler={onInputHandler}
                validations={[requiredValidator(), emailValidator()]}
              />
              <FaEnvelope className="login-form__password-icon " />
            </div>
            <div className="login-form__password">
              <Input
                id="registerPassword"
                type="password"
                placeholder="رمز عبور"
                className="login-form__password-input"
                element="input"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(18),
                ]}
              />
              <i className="login-form__password-icon fa fa-lock-open"></i>
              <FaEye className="login-form__password-icon" />
            </div>
            <Button
              className={`login-form__btn ${
                formState.isFormValid ? "bg-success" : "bg-danger"
              }`}
              type="submit"
              onClick={registerNewUser}
              disabled={!formState.isFormValid}
            >
              <FaUserPlus className="login-form__btn-icon" />
              <span className="login-form__btn-text">عضویت</span>
            </Button>
          </form>
          <div className="login__des">
            <span className="login__des-title">سلام کاربر محترم:</span>
            <ul className="login__des-list">
              <li className="login__des-item">
                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                استفاده کنید.
              </li>
              <li className="login__des-item">
                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
              </li>
              <li className="login__des-item">
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
