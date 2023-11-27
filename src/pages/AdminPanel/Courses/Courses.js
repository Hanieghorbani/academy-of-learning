import React, { useEffect, useState } from "react"
import "./Courses.css"
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable"
import swal from "sweetalert"
import { useForm } from "./../../../hooks/useForm"
import Input from "./../../../Components/Form/Input"
import {
  requiredValidator,
  minValidator,
  maxValidator,
} from "./../../../validators/rules"

export default function Courses() {
  const [courses, setCourses] = useState([])
  const localStorageData = JSON.parse(localStorage.getItem("user"))
  const [courseCategory, setCourseCategory] = useState("-1")
  const [categories, setCategories] = useState([])
  const [courseStatus, setCourseStatus] = useState("start")
  const [courseCover, setCourseCover] = useState({})

  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      shortName: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      support: {
        value: "",
        isValid: false,
      },
    },
    false
  )
  useEffect(() => {
    getAllCourses()

    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories)
      })
  }, [])

  function getAllCourses() {
    fetch("http://localhost:4000/v1/courses", {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((allCourses) => {
        setCourses([...allCourses])
      })
  }

  function removeCourseHandler(id) {
    swal({
      text: "آیا از حذف این دوره اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "حذف"],
    }).then((res) => {
      if (res) {
        fetch(`http://localhost:4000/v1/courses/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              text: "دوره با موفقیت حذف شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllCourses()
            })
          } else {
            swal({
              text: "حذف دوره با مشکل مواجه شد!",
              icon: "error",
              dangerMode: true,
              buttons: "تایید",
            })
          }
        })
      }
    })
  }

  function addNewCourse(e) {
    e.preventDefault()
    let formData = new FormData()
    formData.append("name", formState.inputs.name.value)
    formData.append("description", formState.inputs.description.value)
    formData.append("shortName", formState.inputs.shortName.value)
    formData.append("categoryID", courseCategory)
    formData.append("price", formState.inputs.price.value)
    formData.append("support", formState.inputs.support.value)
    formData.append("status", courseStatus)
    formData.append("cover", courseCover)

    if (courseCategory != "-1") {
      fetch(`http://localhost:4000/v1/courses`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
        body: formData,
      }).then((res) => {
        if (res.ok) {
          swal({
            title: "دوره جدید با موفقیت اضافه شد",
            icon: "success",
            buttons: "تایید",
          }).then(() => {
            getAllCourses()
          })
        } else {
          res.json().then((data) => {
            for (const err of data.message) {
              if (err.message.includes("تصویر الزامی می باشد")) {
                swal({
                  title: "لطفا تصویر دوره را انتخاب کنید",
                  icon: "error",
                  buttons: "تایید",
                })
              } else if (
                err.message.includes("price must be a `number` type")
              ) {
                swal({
                  title: "لطفا قیمت را به عدد وارد کنید",
                  icon: "error",
                  buttons: "تایید",
                })
              }
            }
          })
        }
      })
    } else {
      swal({
        title: "لطفا دسته بندی را انتخاب کنید",
        icon: "error",
        buttons: "تایید",
      })
    }
  }

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن دوره جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">نام دوره</label>
                <Input
                  id="name"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  placeholder="لطفا نام دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">توضیحات دوره</label>
                <Input
                  id="description"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  placeholder="لطفا توضیحات دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">Url دوره</label>
                <Input
                  id="shortName"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا Url دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">قیمت دوره</label>
                <Input
                  id="price"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[requiredValidator()]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا قیمت دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">نحوه پشتیبانی دوره</label>
                <Input
                  id="support"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[minValidator(5)]}
                  type="text"
                  isValid="false"
                  placeholder="لطفا نحوه پشتیبانی دوره را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">دسته‌بندی دوره</label>
                <select onChange={(e) => setCourseCategory(e.target.value)}>
                  <option value="">انتخاب کنید</option>
                  {categories.map((category) => (
                    <option value={category._id}>{category.title}</option>
                  ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="file">
                <label class="input-title">عکس دوره</label>
                <input
                  type="file"
                  id="file"
                  onChange={(event) => {
                    console.log(event.target.files[0])
                    setCourseCover(event.target.files[0])
                  }}
                />
              </div>
            </div>
            <div class="col-12">
              <div class="bottom-form">
                <div class="condition">
                  <label class="input-title">وضعیت دوره</label>
                  <div class="radios">
                    <div class="available">
                      <label>
                        <span>در حال برگزاری</span>
                        <input
                          type="radio"
                          value="start"
                          name="condition"
                          defaultChecked
                          onClick={(e) => setCourseStatus(e.target.value)}
                        />
                      </label>
                    </div>
                    <div class="unavailable">
                      <label>
                        <span>پیش فروش</span>
                        <input
                          type="radio"
                          value="presell"
                          name="condition"
                          onClick={(e) => setCourseStatus(e.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div class="submit-btn">
                  <input
                    type="submit"
                    value="افزودن"
                    onClick={addNewCourse}
                    disabled={!formState.isFormValid}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="دوره‌ها">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مبلغ</th>
              <th>وضعیت</th>
              <th>لینک</th>
              <th>مدرس</th>
              <th>دسته بندی</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course._id}>
                <td>{index + 1}</td>
                <td>{course.name}</td>
                <td>
                  {course.price === 0
                    ? "رایگان"
                    : course.price.toLocaleString()}
                </td>
                <td>
                  {course.isComplete === 0 ? "در حال برگزاری" : "تکمیل شده"}
                </td>
                <td>{course.shortName}</td>
                <td>{course.creator}</td>
                <td>{course.categoryID.title}</td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removeCourseHandler(course._id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  )
}
