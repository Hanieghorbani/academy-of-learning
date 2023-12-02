import React, { useEffect, useState } from "react"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"
import "./Pagination.css"
import { Link, useParams } from "react-router-dom"

export default function Pagination({
  items,
  itemsCount,
  pathname,
  setShownCourses,
}) {
  const [pageCount, setPageCount] = useState(null)
  const { page } = useParams()
  useEffect(() => {
    let endIndex = page * itemsCount
    let startIndex = endIndex - itemsCount
    setShownCourses(items.slice(startIndex, endIndex))
    setPageCount(Math.ceil(items.length / itemsCount))
  }, [page, items])

  return (
    <div class="courses-pagination">
      <ul class="courses__pagination-list">
        {/* <li class="courses__pagination-item">
          <Link to={`${pathname}/${Number(page) - 1}`} class="courses__pagination-link">
            <FaArrowRight class="courses__pagination-icon" />
          </Link>
        </li> */}
        {Array(pageCount)
          .fill("H")
          .map((numPage, index) => (
            <li key={index} class="courses__pagination-item">
              <Link
                to={`${pathname}/${index + 1}`}
                class={`courses__pagination-link ${
                  index + 1 == Number(page) &&
                  "courses__pagination-link--active"
                }`}
              >
                {index + 1}
              </Link>
            </li>
          ))}
        {/* <li class="courses__pagination-item">
          <Link
            to={`${pathname}/${Number(page) + 1}`}
            class="courses__pagination-link"
          >
            <FaArrowLeft class="courses__pagination-icon" />
          </Link>
        </li> */}
      </ul>
    </div>
  )
}
