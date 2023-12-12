import React, { memo, useEffect, useState, useContext } from "react"
import "./Topbar.css"
import { BsTelephone, BsEnvelope } from "react-icons/bs"
import { Link } from "react-router-dom"
import AuthContext from "../../userContext/authContext"

export default memo(function Topbar() {
  const contextData = useContext(AuthContext)

  const [allTopbarLinks, setAllTopbarLinks] = useState([])
  useEffect(() => {
    fetch(`http://localhost:4000/v1/menus/topbar`)
      .then((res) => res.json())
      .then((datas) => {
        setAllTopbarLinks(datas)
      })
  }, [])

  const getRandomItem = (arr, count) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  return (
    <div className="top-bar">
      <div className="container-fluid">
        <div className="top-bar__content">
          <div className="top-bar__right">
            <ul className="top-bar__menu">
              {getRandomItem(allTopbarLinks, 5).map((link) => (
                <li key={link._id} className="top-bar__item">
                  <Link to={link.href} className="top-bar__link">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="top-bar__left">
            <div className="top-bar__email">
              <a href="#" className="top-bar__email-text top-bar__link">
                {contextData.indexInfos.email}
              </a>
              <BsEnvelope className="top-bar__email-icon" />
            </div>
            <div className="top-bar__phone">
              <a href="#" className="top-bar__phone-text top-bar__link">
                {contextData.indexInfos.phone}
              </a>
              <BsTelephone className="top-bar__phone-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
