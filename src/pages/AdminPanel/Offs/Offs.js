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

export default function Offs() {
  const [offers, setOffers] = useState([])
  const [courses, setCourses] = useState([])
  const localStorageToken = JSON.parse(localStorage.getItem("user"))
  const [coursesName, setCoursesName] = useState({})
  const [offCourse, setOffCourse] = useState("-1")
  const [formState, onInputHandler] = useForm(
    {
      code: {
        value: "",
        isValid: false,
      },
      percent: {
        value: "",
        isValid: false,
      },
      maxLength: {
        value: "",
        isValid: false,
      },
    },
    false
  )

  useEffect(() => {
    getAllOffs()
    fetch("http://localhost:4000/v1/courses")
      .then((res) => res.json())
      .then((allCourses) => {
        setCourses(allCourses)
        return allCourses
      })
      .then((allCourses) => {
        const objCourses = {}
        allCourses.forEach((course) => {
          objCourses[course._id] = course.name
        })
        setCoursesName(objCourses)
      })
  }, [])

  function getAllOffs() {
    fetch("http://localhost:4000/v1/offs/", {
      headers: {
        Authorization: `Bearer ${localStorageToken.token}`,
      },
    })
      .then((res) => res.json())
      .then((datas) => {
        setOffers(datas)
      })
  }

  function createNewOff(e) {
    e.preventDefault()

    if (offCourse != "-1") {
      const newOff = {
        code: formState.inputs.code.value,
        percent: formState.inputs.percent.value,
        course: offCourse,
        max: formState.inputs.maxLength.value,
      }

      fetch("http://localhost:4000/v1/offs/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorageToken.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOff),
      }).then((res) => {
        if (res.ok) {
          swal({
            text: "کد تخفیف اضافه شد",
            icon: "success",
            dangerMode: false,
            buttons: "تایید",
          }).then(() => {
            getAllOffs()
          })
        } else {
          console.log(res.text())
        }
      })
    } else {
      swal({
        text: "لطفا دوره مد نظر را انتخاب کنید",
        icon: "error",
        dangerMode: true,
        buttons: "تایید",
      })
    }
  }
  function removeOff(id) {
    swal({
      text: "آیا از حذف این کد تخفیف اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "حذف"],
    }).then((res) => {
      if (res) {
        fetch(`http://localhost:4000/v1/offs/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageToken.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              text: "کد تخفیف با موفقیت حذف شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllOffs()
            })
          }
        })
      }
    })
  }
  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-title">
            <span>افزودن کد تخفیف جدید</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title">کد تخفیف</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="code"
                  validations={[minValidator(5)]}
                  placeholder="کد تخیف را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">درصد تخفیف</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="percent"
                  validations={[minValidator(1)]}
                  placeholder="درصد تخفیف را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">حداکثر استفاده</label>
                <Input
                  element="input"
                  onInputHandler={onInputHandler}
                  type="text"
                  id="maxLength"
                  validations={[minValidator(1)]}
                  placeholder="حداکثر استفاده را وارد کنید..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title" style={{ display: "block" }}>
                  دوره
                </label>
                <select
                  class="select"
                  onChange={(event) => setOffCourse(event.target.value)}
                >
                  <option value="-1">دوره مدنظر را انتخاب کنید</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id} key={course._id}>
                      {course.name}
                    </option>
                  ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>

            <div class="col-12">
              <div class="bottom-form">
                <div class="submit-btn">
                  <input
                    type="submit"
                    value="افزودن"
                    onClick={createNewOff}
                    disabled={!formState.isFormValid}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="کدهای تخفیف">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کد</th>
              <th>درصد</th>
              <th>سازنده</th>
              <th>دوره</th>
              <th>حداکثر استفاده</th>
              <th>دفعات استفاده</th>
              <th>تاریخ ساخت</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((off, index) => (
              <tr key={off._id}>
                <td>{index + 1}</td>
                <td>{off.code}</td>
                <td>{off.percent}</td>
                <td>{off.creator}</td>
                <td>{coursesName[off.course]}</td>
                <td>{off.max}</td>
                <td>{off.uses}</td>
                <td>{off.createdAt.slice(0, 10)}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removeOff(off._id)}
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
