import React, { useEffect, useState } from "react"
import DataTable from "./../../../Components/AdminPanel/DataTable/DataTable"
import { FaCheck } from "react-icons/fa"
import swal from "sweetalert"
import { useForm } from "./../../../hooks/useForm"
import Input from "./../../../Components/Form/Input"
import { minValidator } from "../../../validators/rules"

export default function Menus() {
  const [menus, setMenus] = useState([])
  const [menuParent, setMenuParent] = useState("-1")
  const localStorageToken = JSON.parse(localStorage.getItem("user"))

  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      href: {
        value: "",
        isValid: false,
      },
    },
    false
  )

  useEffect(() => {
    getAllMenus()
  }, [])

  function getAllMenus() {
    fetch("http://localhost:4000/v1/menus/all")
      .then((res) => res.json())
      .then((allMenus) => setMenus(allMenus))
  }

  function removeMenu(id) {
    swal({
      text: "آیا از حذف این منو اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "حذف"],
    }).then((res) => {
      if (res) {
        fetch(`http://localhost:4000/v1/menus/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageToken.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              text: "منو با موفقیت حذف شد",
              icon: "success",
              dangerMode: false,
              buttons: "تایید",
            }).then(() => {
              getAllMenus()
            })
          }
        })
      }
    })
  }

  function createMenu(e) {
    e.preventDefault()

    const menuInfos = {
      title: formState.inputs.title.value,
      href: formState.inputs.href.value,
      parent: menuParent != "-1" ? menuParent : undefined,
    }

    console.log(menuInfos);
    fetch("http://localhost:4000/v1/menus", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageToken.token}`,
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(menuInfos),
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "منواضافه شد",
          icon: "success",
          dangerMode: false,
          buttons: "تایید",
        }).then(() => {
          getAllMenus()
        })
      } else {
        console.log(res.text())
      }
    })
  }

  return (
    <>
      <div class="container">
        <div class="home-title">
          <span>افزودن کاربر جدید</span>
        </div>
        <form class="form">
          <div class="col-6">
            <div class="name input">
              <label class="input-title">عنوان</label>
              <Input
                element="input"
                onInputHandler={onInputHandler}
                id="title"
                type="text"
                isValid="false"
                placeholder="لطفا عنوان را وارد کنید..."
                validations={[minValidator(5)]}
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="name input">
              <label class="input-title">لینک</label>
              <Input
                element="input"
                onInputHandler={onInputHandler}
                id="href"
                type="text"
                isValid="false"
                validations={[minValidator(5)]}
                placeholder="لطفا عنوان را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-6">
            <div class="name input">
              <label class="input-title">منو</label>
              <select
                class="select"
                onChange={(event) => setMenuParent(event.target.value)}
              >
                <option value="-1">منوی اصلی را انتخاب کنید</option>
                {menus.map((menu) => (
                  <div key={menu._id}>
                    {!Boolean(menu.parent) && (
                      <option value={menu._id}>{menu.title}</option>
                    )}
                  </div>
                ))}
              </select>
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-12">
            <div class="bottom-form">
              <div class="submit-btn">
                <input type="submit" value="افزودن" onClick={createMenu} />
              </div>
            </div>
          </div>
        </form>
      </div>

      <DataTable title="منوها">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مقصد</th>
              <th>والد</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu, index) => (
              <tr key={menu._id}>
                <td>{index + 1}</td>
                <td>{menu.title}</td>
                <td>{menu.href}</td>
                <td>{menu.parent ? menu.parent.title : <FaCheck />}</td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removeMenu(menu._id)}
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
