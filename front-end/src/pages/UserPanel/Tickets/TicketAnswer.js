import React, { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { MdKeyboardVoice } from "react-icons/md"
import AuthContext from "../../../userContext/authContext"

import "./TicketAnswer.css"
import { FaLink, FaBars, FaPlus, FaChevronRight } from "react-icons/fa6"
export default function TicketAnswer() {
  const { id } = useParams()
  const [ticketInfo, setTicketInfo] = useState({})
  const contextData = useContext(AuthContext)
  useEffect(() => {
    fetch(`http://localhost:4000/v1/tickets/answer/${id}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTicketInfo(data)
      })
  }, [])

  return (
    <div className="col-9">
      <div className="ticket">
        <div className="ticket-header">
          <Link className="ticket-header__link" to="/my-account/send-ticket">
            ارسال تیکت جدید
          </Link>
        </div>
        <div className="ticket-top">
          <div className="ticket-top__right">
            <a className="ticket-top__link" href="#">
              <FaChevronRight className="ticket-top__icon" />
            </a>
          </div>
          <div className="ticket-top__left">
            <span className="ticket-top__title">تیکت تست</span>
            <span className="ticket-top__text">شناسه تیکت : 2070</span>
          </div>
        </div>
        <div className="ticket-send">
          <div className="ticket-send__header">
            <div className="ticket-send__header-right">
              <div className="ticket-send__header-mic">
                <MdKeyboardVoice className="ticket-send__header-icon" />
                <span className="ticket-send__header-text">0</span>
              </div>
              <div className="ticket-send__header-pin">
                <FaLink className="ticket-send__header-icon" />
                <span className="ticket-send__header-text">0</span>
              </div>
            </div>
            <div className="ticket-send__header-left">
              <FaBars className="ticket-send__header-icon-left" />
            </div>
          </div>
          <div className="ticket-send__title">
            <span className="ticket-send__title-text">
              تیکت شما
            </span>
          </div>
          <div className="ticket-send__answer">
            <div className="ticket-send__answer-box">
              <p className="ticket-send__answer-text">{ticketInfo.ticket}</p>
            </div>
            <div className="ticket-send__answer-bottom">
              <span className="ticket-send__answer-name ticket-send__answer-span">
                {contextData.userInfos.name}
              </span>
              <span className="ticket-send__answer-date ticket-send__answer-span">
                2022-11-29 {' '}
              </span>
              <span className="ticket-send__answer-time ticket-send__answer-span">
                14:28
              </span>
            </div>
          </div>
          <div className="ticket-send__title">
            <span className="ticket-send__title-text">
              پاسخ ها
            </span>
          </div>

          {!ticketInfo.answer ? (
            <div className="alert alert-danger">
              هنوز پاسخی برای تیکت ارسال نشده
            </div>
          ) : (
            <div className="ticket-send__answer-user">
              <div className="ticket-send__answer-user-box">
                <p className="ticket-send__answer-user-text">{ticketInfo.answer}</p>
              </div>
              <div className="ticket-send__answer-user-bottom">
                <span className="ticket-send__answer-user-name ticket-send__answer-user-span">
                  محمد امین سعیدی راد
                </span>
                <span className="ticket-send__answer-user-date ticket-send__answer-user-span">
                  2022-11-29
                </span>
                <span className="ticket-send__answer-user-time ticket-send__answer-user-span">
                  14:28
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
