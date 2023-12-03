import React, { useEffect, useState } from "react"
import { IoIosSend } from "react-icons/io"
import "./SendTicket.css"
import swal from "sweetalert"

export default function SendTicket() {
  const [departments, setDepartments] = useState([])
  const [departmentsSubs, setDepartmentsSubs] = useState([])
  const [courses, setCourses] = useState([])
  const [ticketTypeId, setTicketTypeId] = useState("")
  const [body, setBody] = useState("")
  const [title, setTitle] = useState("")
  const [departmentId, setDepartmentId] = useState("")
  const [courseId, setCourseId] = useState("")
  const [priority, setPriority] = useState("")

  useEffect(() => {
    fetch(`http://localhost:4000/v1/tickets/departments`)
      .then((res) => res.json())
      .then((data) => setDepartments(data))

    fetch(`http://localhost:4000/v1/users/courses/`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data)
      })
  }, [])

  function getDepartmentsSub(departmentID) {
    if (departmentID != "-1") {
      fetch(`http://localhost:4000/v1/tickets/departments-subs/${departmentID}`)
        .then((res) => res.json())
        .then((subs) => setDepartmentsSubs(subs))
    } else {
      setDepartmentsSubs([])
    }
  }

  function sendTicketHandler(e) {
    e.preventDefault()
    const newTicket = {
      departmentID: departmentId,
      departmentSubID: ticketTypeId,
      title,
      priority,
      body,
      course: courseId ? courseId : undefined,
    }

    fetch(`http://localhost:4000/v1/tickets`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTicket),
    }).then((res) => {
      if (res.ok) {
        swal({
          text: "تیکت شما ارسال شد",
          icon: "success",
          dangerMode: false,
          buttons: "تایید",
        })
      } else if (res.status == 500) {
        swal({
          title: "لطفا دپارتمان را انتخاب کنید",
          icon: "error",
          buttons: "تایید",
        })
      } else {
        res.json().then((data) => {
          console.log(data)
          for (const err of data.message) {
            if (err.message.includes("عنوان الزامی است")) {
              swal({
                title: "لطفا عنوان  را وارد کنید",
                icon: "error",
                buttons: "تایید",
              })
            } else if (err.message.includes("departmentID")) {
              swal({
                title: "لطفا دپارتمان را انتخاب کنید",
                icon: "error",
                buttons: "تایید",
              })
            } else if (err.message.includes("شناسه زیردپارتمان الزامی است")) {
              swal({
                title: "لطفا نوع تیکت را انتخاب کنید",
                icon: "error",
                buttons: "تایید",
              })
            } else if (err.message.includes("priority")) {
              swal({
                title: "لطفا اولویت تیکت را انتخاب کنید",
                icon: "error",
                buttons: "تایید",
              })
            }else if (err.message.includes("متن الزامی است")) {
              swal({
                title: 'متن الزامی است',
                icon: "error",
                buttons: "تایید",
              })
            }
          }
        })
      }
    })
  }

  return (
    <div class="col-9">
      <div class="ticket">
        <div class="ticket-header">
          <span class="ticket-header__title">ارسال تیکت جدید</span>
          <a class="ticket-header__link" href="#">
            همه تیکت ها
          </a>
        </div>
        <form class="ticket-form" action="#">
          <div class="row">
            <div class="col-6">
              <label class="ticket-form__label">دپارتمان را انتخاب کنید:</label>
              <select
                class="ticket-form__select"
                onChange={(e) => {
                  setDepartmentId(e.target.value)
                  getDepartmentsSub(e.target.value)
                  setTicketTypeId("")
                }}
              >
                <option class="ticket-form__option" value={"-1"}>
                  لطفا یک مورد را انتخاب نمایید.
                </option>
                {departments.map((department) => (
                  <option value={department._id}>{department.title}</option>
                ))}
              </select>
            </div>
            <div class="col-6">
              <label class="ticket-form__label">نوع تیکت را انتخاب کنید:</label>
              <select
                class="ticket-form__select"
                onChange={(e) => setTicketTypeId(e.target.value)}
              >
                <option class="ticket-form__option">
                  لطفا یک مورد را انتخاب نمایید.
                </option>
                {departmentsSubs.map((sub) => (
                  <option value={sub._id}>{sub.title}</option>
                ))}
              </select>
            </div>
            <div class="col-6">
              <label class="ticket-form__label">عنوان تیکت را وارد کنید:</label>
              <input
                class="ticket-form__input"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div class="col-6">
              <label class="ticket-form__label">
                سطح اولویت تیکت را انتخاب کنید:
              </label>
              <select
                class="ticket-form__select"
                onChange={(e) => setPriority(e.target.value)}
              >
                <option class="ticket-form__option">
                  لطفا یک مورد را انتخاب نمایید.
                </option>
                <option value={1} class="ticket-form__option">
                  کم
                </option>
                <option value={2} class="ticket-form__option">
                  متوسط
                </option>
                <option value={3} class="ticket-form__option">
                  زیاد
                </option>
              </select>
            </div>
            {ticketTypeId === "63b688c5516a30a651e98156" && (
              <div class="col-6">
                <label class="ticket-form__label">دوره را انتخاب کنید:</label>
                <select
                  class="ticket-form__select"
                  onChange={(e) => setCourseId(e.target.value)}
                >
                  <option class="ticket-form__option">
                    لطفا یک مورد را انتخاب نمایید.
                  </option>
                  {courses.map((course) => (
                    <option
                      key={course._id}
                      value={course._id}
                      class="ticket-form__option"
                    >
                      {course.course.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div class="col-12">
              <label class="ticket-form__label">
                محتوای تیکت را وارد نمایید:
              </label>
              <textarea
                class="ticket-form__textarea"
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
            </div>
            <div class="col-12">
              <div class="ticket-form__file">
                <span class="ticket-form__file-max">
                  حداکثر اندازه: 6 مگابایت
                </span>
                <span class="ticket-form__file-format">
                  فرمت‌های مجاز: jpg, png.jpeg, rar, zip
                </span>
                <input class="ticket-form__file-input" type="file" />
              </div>
            </div>
            <div class="col-12">
              <button class="ticket-form__btn" onClick={sendTicketHandler}>
                <IoIosSend className="ticket-form__btn-icon" />
                ارسال تیکت
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
