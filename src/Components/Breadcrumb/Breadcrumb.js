import React from "react"
import { Link } from "react-router-dom"
import { IoHome } from "react-icons/io5"
import { IoIosArrowBack } from "react-icons/io";

import "./Breadcrumb.css"
export default function Breadcrumb({ links }) {
  return (
    <section class="breadcrumb">
      <div class="container">
        <div class="breadcrumb__content">
          <div class="breadcrumb__home-content-icon">
            <IoHome class="breadcrumb__home-icon" />
          </div>
          <ul class="breadcrumb__list">
            {links.map((link) => (
              <li key={link._id} class="breadcrumb__item">
                <Link to={`${link.to}`} class="breadcrumb__link">
                  {link.title}
                  {link.id !== links.length ? (
                    <IoIosArrowBack class="breadcrumb__icon" />
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
