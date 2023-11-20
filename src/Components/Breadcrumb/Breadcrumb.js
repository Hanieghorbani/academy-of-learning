import React from "react"
import { Link } from "react-router-dom"
import { IoHome } from "react-icons/io5"
import { IoIosArrowBack } from "react-icons/io";

import "./Breadcrumb.css"
export default function Breadcrumb({ links }) {
  return (
    <section className="breadcrumb">
      <div className="container">
        <div className="breadcrumb__content">
          <div className="breadcrumb__home-content-icon">
            <IoHome className="breadcrumb__home-icon" />
          </div>
          <ul className="breadcrumb__list">
            {links.map((link) => (
              <li key={link.id} className="breadcrumb__item">
                <Link to={`/${link.to}`} className="breadcrumb__link">
                  {link.title}
                  {link.id !== links.length ? (
                    <IoIosArrowBack className="breadcrumb__icon" />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
