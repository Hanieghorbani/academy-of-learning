import React from "react"
import Header from "../../Components/Header/Header"
import Footer from "../../Components/Footer/Footer"
import CourseBox from "../../Components/CourseBox/CourseBox"
import Pagenation from '../../Components/Pagination/Pagination'
import {AiOutlineSearch,AiOutlineAppstore} from 'react-icons/ai'
import {HiMenuAlt2} from 'react-icons/hi'
import {BsChevronDown} from 'react-icons/bs'

import './Category.css'
export default function Category() {
  return (
    <div>
      <Header />
      <section className="courses">
        <div className="container">
          <div className="courses-top-bar">
            <div className="courses-top-bar__right">
              <div className="courses-top-bar__row-btn courses-top-bar__icon--active">
                <AiOutlineAppstore className=" courses-top-bar__icon"/>
              </div>
              <div className="courses-top-bar__column-btn">
                <i className="fas fa-align-left courses-top-bar__icon"></i>
                <HiMenuAlt2 className="courses-top-bar__icon"/>

              </div>

              <div className="courses-top-bar__selection">
                <span className="courses-top-bar__selection-title">
                  مرتب سازی پیش فرض
                  <BsChevronDown className="courses-top-bar__selection-icon"/>
                </span>
                <ul className="courses-top-bar__selection-list">
                  <li className="courses-top-bar__selection-item courses-top-bar__selection-item--active">
                    مرتب سازی پیش فرض
                  </li>
                  <li className="courses-top-bar__selection-item">
                    مربت سازی بر اساس محبوبیت
                  </li>
                  <li className="courses-top-bar__selection-item">
                    مربت سازی بر اساس امتیاز
                  </li>
                  <li className="courses-top-bar__selection-item">
                    مربت سازی بر اساس آخرین
                  </li>
                  <li className="courses-top-bar__selection-item">
                    مربت سازی بر اساس ارزان ترین
                  </li>
                  <li className="courses-top-bar__selection-item">
                    مربت سازی بر اساس گران ترین
                  </li>
                </ul>
              </div>
            </div>

            <div className="courses-top-bar__left">
              <form action="#" className="courses-top-bar__form">
                <input
                  type="text"
                  className="courses-top-bar__input"
                  placeholder="جستجوی دوره ..."
                />
                <AiOutlineSearch className="courses-top-bar__search-icon"/>
              </form>
            </div>
          </div>
          <div className="courses-content">
            <div className="container">
              <div className="row">
              <CourseBox />
              <CourseBox />
              <CourseBox />
              </div>
            </div>
          </div>
          <Pagenation />
        </div>
      </section>
      <Footer />
    </div>
  )
}
