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
} from "../../validators/rules"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"
import { FaEnvelope, FaUserPlus, FaRegUserCircle } from "react-icons/fa"
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
          swal({
            text: "این کاربر قبلا ثبت نام کرده",
            icon: "error",
            dangerMode: true,
            buttons: "ورود",
          }).then((value) => {
            navigate("/login")
          })
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

      <section className="login-register">
        <div className="login register-form">
          <span className="login__title">ساخت حساب کاربری</span>
          <span className="login__subtitle">
            خوشحالیم قراره به جمع ما بپیوندی
          </span>
          <div className="login__new-member">
            <span className="login__new-member-text">
              قبلا ثبت‌نام کرده‌اید؟
            </span>
            <Link className="login__new-member-link" to="/login">
              وارد شوید
            </Link>
          </div>
          <form action="#" className="login-form">
            <div className="login-form__username">
              <Input
                id="registerName"
                type="text"
                placeholder="نام و نام خانوادگی"
                className="login-form__username-input"
                element="input"
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
              />
              <FaRegUserCircle className="login-form__username-icon" />
            </div>
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
                validations={[
                  requiredValidator(),
                  maxValidator(25),
                  emailValidator(),
                ]}
              />
              <FaEnvelope className="login-form__password-icon " />
            </div>
            <div className="login-form__password">
              <Input
                id="registerPassword"
                type={isShowPass ? "text" : "password"}
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
              {isShowPass ? (
                <MdVisibilityOff
                  className="login-form__password-icon"
                  onClick={() => setIsShowPass(false)}
                />
              ) : (
                <MdVisibility
                  className="login-form__password-icon"
                  onClick={() => setIsShowPass(true)}
                />
              )}
            </div>
            <div className="login-form__password">
              <Input
                id="registerConfirmPassword"
                type={isShowConfirmPass ? "text" : "password"}
                placeholder="تکرار رمز عبور"
                className="login-form__password-input"
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
                  className="login-form__password-icon"
                  onClick={() => setIsShowConfirmPass(false)}
                />
              ) : (
                <MdVisibility
                  className="login-form__password-icon"
                  onClick={() => setIsShowConfirmPass(true)}
                />
              )}
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
