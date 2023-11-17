import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Button from "../../Components/Form/Button";
import Input from "../../Components/Form/Input";
import Header from '../../Components/Header/Header'
import { useForm } from "../../hooks/useForm";
import {
  FaEye,
} from "react-icons/fa"
import { BiSolidTimeFive, BiSolidUser } from "react-icons/bi"
import { MdInput } from "react-icons/md";

import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "../../validators/rules";
import "./Login.css";

export default function Login() {
  const [formState, onInputHandler] = useForm(
    {
      loginUsername: {
        value: "",
        isValid: false,
      },
      loginPassword: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const userLogin = (e) => {
    e.preventDefault();
    console.log("User Login");
  };

  return (
    <>
      <Header />

      <section className="login-register">
        <div className="login">
          <span className="login__title">ورود به حساب کاربری</span>
          <span className="login__subtitle">
            خوشحالیم دوباره میبینیمت دوست عزیز :)
          </span>
          <div className="login__new-member">
            <span className="login__new-member-text">کاربر جدید هستید؟</span>
            <Link className="login__new-member-link" to="/register">
              ثبت نام
            </Link>
          </div>
          <form action="#" className="login-form">
            <div className="login-form__username">
              <Input
                className="login-form__username-input"
                id="loginUsername"
                type="text"
                placeholder="نام کاربری"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
              />
              <BiSolidUser className="login-form__username-icon"/>
            </div>
            <div className="login-form__password">
              <Input
                element="input"
                id="loginPassword"
                type="password"
                className="login-form__password-input"
                placeholder="رمز عبور"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(18),
                ]}
                onInputHandler={onInputHandler}
              />

              <FaEye className="login-form__password-icon"/>

            </div>
            <Button
              className={`login-form__btn ${
                formState.isFormValid
                  ? "bg-success"
                  : "bg-danger"
              }`}
              type="submit"
              onClick={userLogin}
              disabled={!formState.isFormValid}
            >
              <MdInput className="login-form__btn-icon"/>
              <span className="login-form__btn-text">ورود</span>
            </Button>
            <div className="login-form__password-setting">
              <label className="login-form__password-remember">
                <input
                  className="login-form__password-checkbox"
                  type="checkbox"
                />
                <span className="login-form__password-text">
                  مرا به خاطر داشته باش
                </span>
              </label>
              <label className="login-form__password-forget">
                <a className="login-form__password-forget-link" href="#">
                  رمز عبور را فراموش کرده اید؟
                </a>
              </label>
            </div>
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
  );
}
