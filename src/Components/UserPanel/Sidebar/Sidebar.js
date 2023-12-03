import React, { useContext } from 'react'
import AuthContext from '../../../userContext/authContext'
import { Link, useNavigate } from 'react-router-dom'
import swal from "sweetalert"

export default function Sidebar() {
  const contextData = useContext(AuthContext)
  const navigate = useNavigate()
  function logoutHandler() {
    swal({
      text: " آیا می خواهید از حساب کاربری خود خارج شوید؟",
      icon: "warning",
      buttons: ["لغو", "خروج"],
    }).then((res) => {
      if (res) {
        swal({
          text: "شما با موفقیت از حساب کاربری خود خارج شدید",
          icon: "success",
          dangerMode: false,
          buttons: "تایید",
        }).then((val) => {
          contextData.logout()
          navigate("/")
        })
      }
    })
  }
  return (
    <div class="col-3">
    <div class="sidebar">
      <span class="sidebar__name">{contextData.userInfos.name}</span>
      <ul class="sidebar__list">
        <li class="sidebar__item">
          <Link class="sidebar__link" to={'/my-account'}>
            پیشخوان
          </Link>
        </li>
        <li class="sidebar__item">
          <Link class="sidebar__link" to={'orders'}>
        سفارشات
          </Link>
        </li>
        <li class="sidebar__item">
          <a class="sidebar__link" href="#">
            کیف پول من
          </a>
        </li>
        <li class="sidebar__item">
          <a class="sidebar__link" href="#">
            جزئیات حساب کاربری
          </a>
        </li>
        <li class="sidebar__item">
          <a class="sidebar__link" href="#">
            دوره های خریداری شده
          </a>
        </li>
        <li class="sidebar__item">
          <Link class="sidebar__link" to={'tickets'}>
            تیکت های پشتیبانی
          </Link>
        </li>
        <li class="sidebar__item">
          <a class="sidebar__link"  onClick={logoutHandler}>
            خروج از سیستم
          </a>
        </li>
      </ul>
    </div>
  </div>
  )
}
