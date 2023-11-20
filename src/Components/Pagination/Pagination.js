import React from "react"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"
import "./Pagination.css"

export default function Pagination() {
  return (
    <div className="courses-pagination">
      <ul className="courses__pagination-list">
        <li className="courses__pagination-item">
          <a href="#" className="courses__pagination-link">
            <i className="fas fa-long-arrow-alt-right courses__pagination-icon"></i>
            <FaArrowRight className="courses__pagination-icon" />
          </a>
        </li>
        <li className="courses__pagination-item">
          <a href="#" className="courses__pagination-link courses__pagination-link--active">
            1
          </a>
        </li>
        <li className="courses__pagination-item">
          <a href="#" className="courses__pagination-link">
            2
          </a>
        </li>
        <li className="courses__pagination-item">
          <a
            href="#"
            className="courses__pagination-link"
          >
            3
          </a>
        </li>
        <li className="courses__pagination-item">
          <a href="#" className="courses__pagination-link">
            <FaArrowLeft className="courses__pagination-icon" />
          </a>
        </li>
      </ul>
    </div>
  )
}
