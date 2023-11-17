import React from "react"
import "./Topbar.css"
import { BsTelephone, BsEnvelope } from "react-icons/bs"
export default function Topbar() {
  return (
    <div className="top-bar">
      <div className="container-fluid">
        <div className="top-bar__content">
          <div className="top-bar__right">
            <ul className="top-bar__menu">
              <li className="top-bar__item">
                <a href="#" className="top-bar__link">
                  آموزش Html
                </a>
              </li>
              <li className="top-bar__item">
                <a href="#" className="top-bar__link">
                  آموزش Css
                </a>
              </li>
              <li className="top-bar__item">
                <a href="#" className="top-bar__link">
                  آموزش جاوا اسکریپت
                </a>
              </li>
              <li className="top-bar__item">
                <a href="#" className="top-bar__link">
                  آموزش بوت استرپ
                </a>
              </li>
              <li className="top-bar__item">
                <a href="#" className="top-bar__link">
                  آموزش پایتون
                </a>
              </li>
              <li className="top-bar__item">
                <a href="#" className="top-bar__link">
                  آموزش ری‌اکت
                </a>
              </li>
              <li className="top-bar__item">
                <a href="#" className="top-bar__link">
                  20,000 تومان
                </a>
              </li>
            </ul>
          </div>
          <div className="top-bar__left">
            <div className="top-bar__email">
              <a href="#" className="top-bar__email-text top-bar__link">
                hnie.ghorbani@gmail.com
              </a>
              <i className="fas fa-envelope top-bar__email-icon"></i>

              <BsEnvelope className="top-bar__email-icon" />
            </div>
            <div className="top-bar__phone">
              <a href="#" className="top-bar__phone-text top-bar__link">
                09121234567
              </a>
              <BsTelephone className="top-bar__phone-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
