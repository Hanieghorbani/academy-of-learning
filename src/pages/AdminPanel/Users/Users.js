import React, { useEffect, useState } from "react"
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable"
import swal from "sweetalert"
import Input from "./../../../Components/Form/Input"
import { useForm } from "./../../../hooks/useForm"
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
  phoneValidator,
} from "./../../../validators/rules"

export default function Users() {
  const [users, setUsers] = useState([])
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
      confirmPassword: {
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
  const localStorageToken = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    getAllUsers()
  }, [])

  function getAllUsers() {
    fetch("http://localhost:4000/v1/users", {
      headers: {
        Authorization: `Bearer ${localStorageToken.token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUsers(result)
      })
  }

  function deleteUser(id) {
    swal({
      text: "آیا از حذف کاربر اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "حذف"],
    }).then((res) => {
      if (res) {
        fetch(`http://localhost:4000/v1/users/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageToken.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              text: "کاربر با موفقیت حذف شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllUsers()
            })
          }
        })
      }
    })
  }

  function banUser(id) {
    swal({
      text: "آیا از بن کردن کاربر اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "بن"],
    }).then((res) => {
      if (res) {
        fetch(`http://localhost:4000/v1/users/ban/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorageToken.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              text: "کاربر با موفقیت بن شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllUsers()
            })
          }
        })
      }
    })
  }

  function registerNewUser(event) {
    event.preventDefault()
    if (
      formState.inputs.registerPassword.value ===
      formState.inputs.registerConfirmPassword.value
    ) {
      const newUserInfo = {
        name: formState.inputs.name.value,
        username: formState.inputs.username.value,
        email: formState.inputs.email.value,
        phone: formState.inputs.phone.value,
        password: formState.inputs.password.value,
        confirmPassword: formState.inputs.password.value,
      }

      fetch("http://localhost:4000/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserInfo),
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
          swal({
            text: "کاربر مورد نظر با موفقیت ثبت نام شد",
            icon: "success",
            dangerMode: false,
            buttons: "تایید",
          }).then(()=>{
            getAllUsers()
          })
        })
        .catch((err) => {
          console.log(err)
          if (err == 'Error: {"message":"this phone number banned!"}') {
            swal({
              text: "این شماره تلفن مسدود شده",
              icon: "error",
              dangerMode: true,
              buttons: "تایید",
            })
          } else if (
            err == 'Error: {"message":"username or email is duplicate."}'
          ) {
            swal({
              text: "ایمیل یا نام کاربری تکراری است.",
              icon: "error",
              dangerMode: true,
              buttons: "تایید",
            })
          }
          {
          }
        })
    }else {
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
      <div class="home-content-edit">
        <div class="back-btn">
          <i class="fas fa-arrow-right"></i>
        </div>
        <form class="form">
          <div class="col-6">
            <div class="name input">
              <label class="input-title">نام و نام خانوادگی</label>
              <Input
                type="text"
                class=""
                id="name"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام و نام خانوادگی کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="family input">
              <label class="input-title">نام کاربری</label>
              <Input
                type="text"
                class=""
                id="username"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام کاربری را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="email input">
              <label class="input-title">ایمیل</label>
              <Input
                type="text"
                class=""
                id="email"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                  emailValidator(),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا ایمیل کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="password input">
              <label class="input-title">رمز عبور</label>
              <Input
                type="text"
                class=""
                id="password"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا رمز عبور کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="password input">
              <label class="input-title">نکرار رمز عبور</label>
              <Input
                type="text"
                class=""
                id="confirmPassword"
                element="input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا تکرار رمز عبور کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="phone input">
              <label class="input-title">شماره تلفن</label>
              <Input
                type="text"
                class=""
                id="phone"
                element="input"
                validations={[phoneValidator()]}
                onInputHandler={onInputHandler}
                placeholder="لطفا شماره تلفن کاربر را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-12">
            <div class="bottom-form">
              <div class="submit-btn">
                <input type="submit" value="افزودن" onClick={registerNewUser} />
              </div>
            </div>
          </div>
        </form>
      </div>
      <DataTable title="کاربران">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام</th>
              <th>شماره</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {users.length ? (
              <>
                {users.map((user, index) => (
                  <tr key={user._id} >
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button type="button" class="btn btn-primary edit-btn">
                        ویرایش
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-danger delete-btn"
                        onClick={() => deleteUser(user._id)}
                      >
                        حذف
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-secondary delete-btn"
                        onClick={() => banUser(user._id)}
                      >
                        بن
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <div class="alert alert-warning">هیچ کاربری یافت نشد !</div>
            )}
          </tbody>
        </table>
      </DataTable>
    </>
  )
}
