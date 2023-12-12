import React, { useContext, useEffect, useState } from "react"
import AuthContext from "../../../userContext/authContext"
import Input from "./../../../Components/Form/Input"
import { useForm } from "./../../../hooks/useForm"
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
  phoneValidator,
} from "./../../../validators/rules"
import swal from "sweetalert"

import "./EditAccount.css"
import { useNavigate } from "react-router-dom"

export default function EditAccount() {
  const navigate = useNavigate()
  const localStorageToken = JSON.parse(localStorage.getItem("user"))
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
    },
    false
  )
  const authContext = useContext(AuthContext)
  function ChangeInfosHandler(e) {
    e.preventDefault()
    const newInfosUser = {
      name: formState.inputs.name.value,
      username: formState.inputs.username.value,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
      phone: formState.inputs.phone.value,
    }
    fetch(`http://localhost:4000/v1/users/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorageToken.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newInfosUser),
    }).then((res) => {
      if (res.ok) {
        swal({
          text: 'اطلاعات شما بروزرسانی شد',
          icon: "success",
          dangerMode: false,
          buttons: "تایید",
        }).then(() => {
          navigate('/my-account')
        })
      }
      swal({
        icon: "error",
        buttons: "تایید",
      })
    })
  }

  return (
    <div className="col-9">
      <div className="edit">
        <form className="edit__form" action="#">
          <div className="edit__personal">
            <div className="row">
              <div className="col-12">
                <label className="edit__label">شماره موبایل *</label>
                <Input
                  element="input"
                  className="edit__input"
                  type="text"
                  placeholder="لطفا شماره موبایل خود را وارد کنید"
                  defaultValue={authContext.userInfos.phone}
                  id="phone"
                  onInputHandler={onInputHandler}
                />
              </div>

              <div className="col-12">
                <label className="edit__label">نام و نام خانوادگی *</label>
                <Input
                  element="input"
                  id="name"
                  className="edit__input"
                  type="text"
                  placeholder="لطفا نام و نام خانوادگی خود را وارد کنید"
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(20),
                  ]}
                  defaultValue={authContext.userInfos.name}
                  onInputHandler={onInputHandler}
                />
              </div>
              <div className="col-12">
                <label className="edit__label">نام کاربری (نمایشی) *</label>
                <Input
                  element="input"
                  id="username"
                  onInputHandler={onInputHandler}
                  className="edit__input"
                  type="text"
                  placeholder="لطفا نام کاربری خود را وارد کنید"
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(20),
                  ]}
                  defaultValue={authContext.userInfos.username}
                />
                <span className="edit__help">
                  اسم شما به این صورت در حساب کاربری و نظرات دیده خواهد شد.
                </span>
              </div>
              <div className="col-12">
                <label className="edit__label">آدرس ایمیل *</label>
                <Input
                  element="input"
                  id="email"
                  onInputHandler={onInputHandler}
                  className="edit__input"
                  type="text"
                  placeholder="لطفا نام آدرس ایمیل خود را وارد کنید"
                  validations={[
                    emailValidator(),
                  ]}
                  defaultValue={authContext.userInfos.email}
                />
              </div>
            </div>
          </div>
          <div className="edit__password">
            <span className="edit__password-title">تغییر گذرواژه</span>
            <div className="row">
              <div className="col-12">
                <label className="edit__label">
                  گذرواژه  
                </label>
                <Input
                  element="input"
                  id="password"
                  onInputHandler={onInputHandler}
                  className="edit__input"
                  type="password"
                  placeholder="گذرواژه"
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(20),
                  ]}
                />
              </div>
            </div>
          </div>
          <button
            className="edit__btn"
            type="submit"
            onClick={ChangeInfosHandler}
            disabled = {!formState.isFormValid}
          >
            ذخیره تغییرات
          </button>
        </form>
      </div>
    </div>
  )
}
