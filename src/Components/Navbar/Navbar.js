import React, { useEffect, useContext, useState } from "react"
import "./Navbar.css"
import { AiOutlineSearch } from "react-icons/ai"
import { HiOutlineShoppingCart } from "react-icons/hi"
import { IoIosArrowDown } from "react-icons/io"
import { Link } from "react-router-dom"
import AuthContext from "../../userContext/authContext"
export default function Navbar() {
  const contextData = useContext(AuthContext)
  const [allNavbarLinks, setAllNavbarLinks] = useState([])

  useEffect(() => {
  
    fetch("http://localhost:4000/v1/menus")
      .then((res) => res.json())
      .then((datas) => {
        setAllNavbarLinks(datas)
        
      })
  }, [])
  return (
    <div class="main-header">
      <div class="container-fluid">
        <div class="main-header__content">
          <div class="main-header__right">
            <img
              src="/images/logo/Logo.png"
              class="main-header__logo"
              alt="لوگوی سبزلرن"
            />

            <ul class="main-header__menu">
              <li class="main-header__item">
                <Link to={"/"} class="main-header__link">
                  صفحه اصلی
                </Link>
              </li>
              {allNavbarLinks.map((link) => (
                <li key={link._id} class="main-header__item">
                  <Link to={`${link.href}/1`} class="main-header__link">
                    {link.title}
                    {link.submenus.length !== 0 && (
                      <>
                        <IoIosArrowDown class="main-header__link-icon" />
                        <ul class="main-header__dropdown">
                          {link.submenus.map((sub) => (
                            <li key={sub._id} class="main-header__dropdown-item">
                              <Link
                                to={sub.href}
                                class="main-header__dropdown-link"
                              >
                                {sub.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div class="main-header__left">
            <a href="#" class="main-header__search-btn">
              <AiOutlineSearch class="main-header__search-icon" />
            </a>
            <a href="#" class="main-header__cart-btn">
              <HiOutlineShoppingCart class="main-header__cart-icon" />
            </a>

            {contextData.isLoggedIn? (
              <Link to={"/my-account"} class="main-header__profile">
                <span class="main-header__profile-text">
                  {contextData.userInfos.name}
                </span>
              </Link>
            ) : (
              <Link to={"/login"} class="main-header__profile">
                <span class="main-header__profile-text">
                  ورود / ثبت نام
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
