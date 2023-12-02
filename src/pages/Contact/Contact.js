import React from "react"
import Header from "../../Components/Header/Header"
import Footer from "./../../Components/Footer/Footer"
import Input from "../../Components/Form/Input"
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
  phoneValidator,
} from "../../validators/rules"
import { FaUser, FaEnvelope, FaPhoneAlt } from "react-icons/fa"
import "./Contact.css"
import { useForm } from "../../hooks/useForm"
import Button from "../../Components/Form/Button"
import swal from "sweetalert"
import { useNavigate } from "react-router-dom"

export default function Contact() {
  const navigate = useNavigate()
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      body: {
        value: "",
        isValid: false,
      },
    },
    false
  )

  const addNewContact = (e) => {
    e.preventDefault()
    fetch("http://localhost:4000/v1/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formState.inputs.name.value,
        email: formState.inputs.email.value,
        phone: formState.inputs.phone.value,
        body: formState.inputs.body.value,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        swal({
          title:'پیام شده ارسال شد',
          icon: "success",
          dangerMode: false,
          buttons: "تایید",
        }).then((value) => {
          navigate("/")
        })
      })
  }
  return (
    <>
      <Header />

      <section class="login-register">
        <div class="login register-form">
          <span class="login__title">ارتباط با ما</span>
          <span class="login__subtitle">
            نظر یا انتقادتو بنویس برامون :)
          </span>
          <form action="#" class="login-form">
            <div class="login-form__username login-form__parent">
              <Input
                onInputHandler={onInputHandler}
                element="input"
                id="name"
                class="login-form__username-input"
                type="text"
                placeholder="نام و نام خانوادگی"
                validations={[
                  requiredValidator(),
                  minValidator(6),
                  maxValidator(20),
                ]}
              />
              <FaUser class="login-form__username-icon" />
            </div>
            <div class="login-form__password login-form__parent">
              <Input
                onInputHandler={onInputHandler}
                element="input"
                id="email"
                class="login-form__password-input"
                type="text"
                placeholder="آدرس ایمیل"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(40),
                  emailValidator(),
                ]}
              />
              <FaEnvelope class="login-form__password-icon" />
            </div>
            <div class="login-form__phone-number login-form__parent">
              <Input
                onInputHandler={onInputHandler}
                element="input"
                id="phone"
                class="login-form__password-input"
                type="text"
                placeholder="شماره تماس"
                validations={[
                  requiredValidator(),
                  phoneValidator(),
                  maxValidator(11),
                ]}
              />
              <FaPhoneAlt class="login-form__password-icon" />
            </div>
            <div class="login-form__text login-form__parent">
              <Input
                onInputHandler={onInputHandler}
                element="textarea"
                id="body"
                class="login-form__text-input"
                placeholder="متن خود را وارد کنید"
                validations={[requiredValidator(), minValidator(10)]}
              />
            </div>
            <Button
              class={`login-form__btn ${
                formState.isFormValid ? "bg-success" : "bg-danger"
              }`}
              type="submit"
              onClick={addNewContact}
              disabled={!formState.isFormValid}
            >
              <span class="login-form__btn-text">ارسال</span>
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  )
}
