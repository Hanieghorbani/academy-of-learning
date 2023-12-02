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
    <div class="top-bar">
      <div class="container-fluid">
        <div class="top-bar__content">
          <div class="top-bar__right">
            <ul class="top-bar__menu">
              {getRandomItem(allTopbarLinks, 5).map((link) => (
                <li key={link._id} class="top-bar__item">
                  <Link to={link.href} class="top-bar__link">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div class="top-bar__left">
            <div class="top-bar__email">
              <a href="#" class="top-bar__email-text top-bar__link">
                {contextData.indexInfos.email}
              </a>
              <i class="fas fa-envelope top-bar__email-icon"></i>

              <BsEnvelope class="top-bar__email-icon" />
            </div>
            <div class="top-bar__phone">
              <a href="#" class="top-bar__phone-text top-bar__link">
                {contextData.indexInfos.phone}
              </a>
              <BsTelephone class="top-bar__phone-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
