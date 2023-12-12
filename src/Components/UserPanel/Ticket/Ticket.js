import React, { useEffect, useState } from "react"
import { FaCircle } from "react-icons/fa6"
import differenceInDays from "date-fns/differenceInDays"
import differenceInHours from "date-fns/differenceInHours"
import differenceInMinutes from "date-fns/differenceInMinutes"
import differenceInMonths from "date-fns/differenceInMonths"
import differenceInSeconds from "date-fns/differenceInSeconds"
import { FaEllipsisV } from "react-icons/fa"
import { parseISO } from "date-fns"
import { Link } from "react-router-dom"
export default function Ticket(props) {
  const [datePassedShown, setDatePassedShown] = useState("")

  useEffect(() => {
    const date = new Date()
    const diffMonths = differenceInMonths(date, parseISO(props.createdAt))
    const diffInDays = differenceInDays(date, parseISO(props.createdAt))
    const hoursPassed = differenceInHours(date, parseISO(props.createdAt))
    const diffMins = differenceInMinutes(date, parseISO(props.createdAt))
    const diffSecs = differenceInSeconds(date, parseISO(props.createdAt))

    if (diffInDays > 30) {
      setDatePassedShown(`${diffMonths} ماه`)
    } else if (diffInDays) {
      setDatePassedShown(`${diffInDays} روز`)
    } else if (!diffInDays && hoursPassed) {
      setDatePassedShown(`${hoursPassed} ساعت`)
    } else if (!hoursPassed && diffMins) {
      setDatePassedShown(`${diffMins} دقیقه`)
    } else if (!diffMins) {
      setDatePassedShown(`${diffSecs} ثانیه`)
    }
  }, [])
  return (
    <div className="ticket-content__box">
      <div className="ticket-content__right">
        <div className="ticket-content__right-right">
          <Link className="ticket-content__link" to={`answer/${props._id}`}>
            {props.title}
          </Link>
          <span className="ticket-content__category">
            <FaEllipsisV className="ticket-content__icon"/>
            {props.departmentSubID}
          </span>
        </div>
        <div className="ticket-content__right-left">
          <span className="ticket-content__name">{props.user}</span>
        </div>
      </div>
      <div className="ticket-content__left">
        <div className="ticket-content__left-right">
          <div className="ticket-content__condition">
            <span className="ticket-content__condition-text">
              <FaCircle
                className={props.answer ? "text-success" : "text-danger"}
              />
              {props.answer ? "پاسخ داده شده" : "پاسخ داده نشده"}
            </span>
          </div>
        </div>
        <div className="ticket-content__left-left">
          <span className="ticket-content__time">
            {props.createdAt.slice(0, 10)}
          </span>
          <span className="ticket-content__time-month">{datePassedShown} قبل</span>
        </div>
      </div>
    </div>
  )
}
