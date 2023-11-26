import React, { useEffect, useState } from "react"
import { FaAngleDown, FaRegBell } from "react-icons/fa6"
export default function Topbar() {
  const [adminInfos, setAdminInfos] = useState([])
  const [notifsBox, setNotifsBox] = useState([])
  const [isShowNotifs, setIsShowNotifs] = useState(false)
  useEffect(() => {
     const localStorageToken = JSON.parse(localStorage.getItem("user"))
    fetch("http://localhost:4000/v1/auth/me", {
      headers: {
        Authorization: `Bearer ${localStorageToken.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setAdminInfos(res)
        setNotifsBox(res.notifications)
      })
  }, [seeNotifHandler])

  function seeNotifHandler(id) {
    const localStorageToken = JSON.parse(localStorage.getItem("user"))
    fetch(`http://localhost:4000/v1/notifications/see/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorageToken.token}`,
      },
    })
  }
  return (
    <div class="container-fluid">
      <div class="container">
        <div
          class={`home-header ${isShowNotifs && "active-modal-notfication"} `}
        >
          <div class="home-right">
            <div class="home-searchbar">
              <input type="text" class="search-bar" placeholder="جستجو..." />
            </div>
            <div class="home-notification">
              <button type="button" onMouseEnter={() => setIsShowNotifs(true)}>
                <FaRegBell />
              </button>
            </div>
            <div
              class="home-notification-modal"
              onMouseLeave={() => setIsShowNotifs(false)}
            >
              <ul class="home-notification-modal-list">
              {notifsBox.length ? (<>{notifsBox.map((notif) => (
                  <li key={notif._id} class="home-notification-modal-item">
                    <span class="home-notification-modal-text">
                      {notif.msg}
                    </span>
                    <label class="switch">
                      <a
                        href="javascript:void(0)"
                        onClick={() => seeNotifHandler(notif._id)}
                      >
                        تایید
                      </a>
                    </label>
                  </li>
                ))}</>) : (<li className="home-notification-modal-item">هیچ پیغامی وجود ندارد !</li>)}
                
              </ul>
            </div>
          </div>
          <div class="home-left">
            <div class="home-profile">
              <div class="home-profile-image">
                <a href="#">
                  <img
                    src={`/images/info/${adminInfos.profile}`}
                    alt="prof-admin"
                  />
                </a>
              </div>
              <div class="home-profile-name">
                <a href="#">{adminInfos.name}</a>
              </div>
              <div class="home-profile-icon">
                <FaAngleDown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
