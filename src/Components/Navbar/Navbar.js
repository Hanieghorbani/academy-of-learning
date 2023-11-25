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
                <Link to={"/"} className="main-header__link">
                  صفحه اصلی
                </Link>
              </li>
              {allNavbarLinks.map((link) => (
                <li className="main-header__item">
                  <Link to={`${link.href}/1`} className="main-header__link">
                    {link.title}
                    {link.submenus.length !== 0 && (
                      <>
                        <IoIosArrowDown className="main-header__link-icon" />
                        <ul className="main-header__dropdown">
                          {link.submenus.map((sub) => (
                            <li className="main-header__dropdown-item">
                              <Link
                                to={sub.href}
                                className="main-header__dropdown-link"
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

          <div className="main-header__left">
            <a href="#" className="main-header__search-btn">
              <AiOutlineSearch className="main-header__search-icon" />
            </a>
            <a href="#" className="main-header__cart-btn">
              <HiOutlineShoppingCart className="main-header__cart-icon" />
            </a>

            {contextData.isLoggedIn? (
              <Link to={"/login"} className="main-header__profile">
                <span className="main-header__profile-text">
                  {contextData.userInfos.name}
                </span>
              </Link>
            ) : (
              <Link to={"/login"} className="main-header__profile">
                <span className="main-header__profile-text">
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
