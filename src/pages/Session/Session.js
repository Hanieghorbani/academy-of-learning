import React, { useState, useEffect } from "react"
import Footer from "../../Components/Footer/Footer"
import { Link, useParams } from "react-router-dom"
import Header from "../../Components/Header/Header"
import {
  FaBookOpen,
  FaChevronRight,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa"
import { FaCirclePlay } from "react-icons/fa6"
import { MdHome } from "react-icons/md"
import "./Session.css"
export default function Session() {
  const { courseName, sessionID } = useParams()
  const [session, setSession] = useState({})
  const [sessions, setSessions] = useState([])
  const [courseInfos, setCourseInfos] = useState([])
  const localStorageToken = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/${courseName}/${sessionID}`, {
      headers: {
        Authorization: `Bearer ${
          localStorageToken ? localStorageToken.token : "null"
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSession(data.session)
        setSessions(data.sessions)
      })

    fetch(`http://localhost:4000/v1/courses/${courseName}`, {
      headers: {
        Authorization: `Bearer ${
          localStorageToken ? localStorageToken.token : "null"
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourseInfos(data)
      })
  }, [])

  return (
    <>
      <Header />
      <section className="content row">
        <div className="col-4">
          <div className="sidebar">
            <div className="sidebar__header">
              <a className="sidebar__header-link" href="#">
                <FaBookOpen className="sidebar__haeder-icon" />
                لیست جلسات
              </a>
            </div>
            <div className="sidebar-topics">
              <div className="sidebar-topics__item">
                <ul className="sidebar-topics__list">
                  {session &&
                    sessions.map((session) => (
                      <Link
                        key={session._id}
                        to={`/${courseName}/${session._id}`}
                      >
                        <li className="sidebar-topics__list-item">
                          <div className="sidebar-topics__list-right">
                            <FaCirclePlay className="sidebar-topics__list-item-icon " />
                            <a
                              className="sidebar-topics__list-item-link"
                              href="#"
                            >
                              {session.title}
                            </a>
                          </div>
                          <div className="sidebar-topics__list-left">
                            <span className="sidebar-topics__list-item-time">
                              {session.time.substring(0, 2)}:
                              {session.time.substring(2, 4)}
                            </span>
                          </div>
                        </li>
                      </Link>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="episode">
            <div className="episode-haeder">
              <div className="episode-header__right">
                <div className="episode-header__right-back-link" href="#">
                  <FaChevronRight className="episode-header__right-back-icon" />
                  <div className="episode-header__right-home">
                    <Link
                      className="episode-header__right-home-link"
                      to={`/course-info/${courseName}`}
                    >
                      به دوره خانه بروید
                    </Link>
                    <MdHome className="episode-header__right-home-icon" />
                  </div>
                </div>
              </div>
              <div className="episode-header__left">
                <FaCirclePlay className="episode-header__left-icon" />
                <span className="episode-header__left-text">
                  {courseInfos.name}
                </span>
              </div>
            </div>
            <div className="episode-content">
              <video
                className="episode-content__video"
                controls
                src={`http://localhost:4000/courses/covers/${session.video}`}
              ></video>
              <h1 className="fs-2 mb-4 fw-bold">{session.title}</h1>
              <a className="episode-content__video-link" href="#">
                دانلود ویدئو
              </a>
              <div className="episode-content__bottom">
                <a className="episode-content__backward" href="#">
                  <FaArrowRight className="episode-content__backward-icon" />
                  قبلی
                </a>
                <a className="episode-content__forward" href="#">
                  بعدی
                  <FaArrowLeft className="episode-content__backward-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
