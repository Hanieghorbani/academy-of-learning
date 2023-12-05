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
    <div className="col-3">
    <div className="sidebar">
      <span className="sidebar__name">{contextData.userInfos.name}</span>
      <ul className="sidebar__list">
        <li className="sidebar__item">
          <Link className="sidebar__link" to={'/my-account'}>
            پیشخوان
          </Link>
        </li>
        <li className="sidebar__item">
          <Link className="sidebar__link" to={'orders'}>
        سفارشات
          </Link>
        </li>
        <li className="sidebar__item">
          <a className="sidebar__link" href="#">
            کیف پول من
          </a>
        </li>
        <li className="sidebar__item">
          <Link className="sidebar__link" to={'edit-account'}>
            جزئیات حساب کاربری
          </Link>
        </li>
        <li className="sidebar__item">
          <Link className="sidebar__link" to={'courses'}>
            دوره های خریداری شده
          </Link>
        </li>
        <li className="sidebar__item">
          <Link className="sidebar__link" to={'tickets'}>
            تیکت های پشتیبانی
          </Link>
        </li>
        <li className="sidebar__item">
          <a className="sidebar__link"  onClick={logoutHandler}>
            خروج از سیستم
          </a>
        </li>
      </ul>
    </div>
  </div>
  )
}
