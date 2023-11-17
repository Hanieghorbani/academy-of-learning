import React from "react"
import "./Navbar.css"
import {AiOutlineSearch} from 'react-icons/ai'
import {HiOutlineShoppingCart} from 'react-icons/hi'
import {IoIosArrowDown} from 'react-icons/io'
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <div className="main-header">
      <div className="container-fluid">
        <div className="main-header__content">
          <div className="main-header__right">
            <img
              src="/images/logo/Logo.png"
              className="main-header__logo"
              alt="لوگوی سبزلرن"
            />

            <ul className="main-header__menu">
              <li className="main-header__item">
                <Link to={'/index'} className="main-header__link">
                  صفحه اصلی
                </Link>
              </li>

              <li className="main-header__item">
                <Link to={'/categoryInfo/frontend'} className="main-header__link">
                  فرانت اند
        
                  <IoIosArrowDown className="main-header__link-icon"/>
                  <ul className="main-header__dropdown">
                    <li className="main-header__dropdown-item">
                      <a href="#" className="main-header__dropdown-link">
                        آموزش Html
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="#" className="main-header__dropdown-link">
                        آموزش Css
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="#" className="main-header__dropdown-link">
                        آموزش جاوا اسکریپت
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="#" className="main-header__dropdown-link">
                        آموزش FlexBox
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="#" className="main-header__dropdown-link">
                        آموزش جامع ری‌اکت
                      </a>
                    </li>
                  </ul>
                </Link>
              </li>
              <li className="main-header__item">
                <a href="#" className="main-header__link">
                  امنیت
                  <IoIosArrowDown className="main-header__link-icon"/>
                  <ul className="main-header__dropdown">
                    <li className="main-header__dropdown-item">
                      <a href="#" className="main-header__dropdown-link">
                        آموزش کالی لینوکس
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="#" className="main-header__dropdown-link">
                        آموزش پایتون سیاه
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="#" className="main-header__dropdown-link">
                        آموزش جاوا اسکریپت سیاه
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="#" className="main-header__dropdown-link">
                        آموزش شبکه
                      </a>
                    </li>
                  </ul>
                </a>
              </li>
              <li className="main-header__item">
                <Link to={'/articleInfo/:articleName'} className="main-header__link">
                  مقالات
                  <IoIosArrowDown className="main-header__link-icon"/>
                  <ul className="main-header__dropdown">
                    <li className="main-header__dropdown-item">
                      <a href="#" className="main-header__dropdown-link">
                        توسعه وب
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="#" className="main-header__dropdown-link">
                        جاوا اسکریپت
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="#" className="main-header__dropdown-link">
                        فرانت اند
                      </a>
                    </li>
                  </ul>
                </Link>
              </li>
              <li className="main-header__item">
                <a href="#" className="main-header__link">
                  پایتون
                  <IoIosArrowDown className="main-header__link-icon"/>
                  <ul className="main-header__dropdown">
                    <li className="main-header__dropdown-item">
                      <a href="#" className="main-header__dropdown-link">
                        دوره متخصص پایتون
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="#" className="main-header__dropdown-link">
                        دوره هوش مصنوعی با پایتون
                      </a>
                    </li>
                    <li className="main-header__dropdown-item">
                      <a href="#" className="main-header__dropdown-link">
                        دوره متخصص جنگو
                      </a>
                    </li>
                  </ul>
                </a>
              </li>
              <li className="main-header__item">
                <a href="#" className="main-header__link">
                  مهارت های نرم
                </a>
              </li>
            </ul>
          </div>

          <div className="main-header__left">
            <a href="#" className="main-header__search-btn">
            <AiOutlineSearch className="main-header__search-icon"/>
            </a>
            <a href="#" className="main-header__cart-btn">
            <HiOutlineShoppingCart className="main-header__cart-icon"/>
            </a>
            <Link to={'/login'} className="main-header__profile">
              <span className="main-header__profile-text">حانیه قربانی</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
