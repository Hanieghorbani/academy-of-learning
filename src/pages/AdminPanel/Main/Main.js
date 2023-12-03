import React, { useEffect, useState } from "react"
import "./Main.css"
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable"
import swal from "sweetalert"
import MainInfoBox from "../../../Components/AdminPanel/MainInfoBox/MainInfoBox"
export default function Main() {
  const localStorageToken = JSON.parse(localStorage.getItem("user"))
  const [MainInfos, setMainInfos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    fetch("http://localhost:4000/v1/infos/p-admin", {
      headers: {
        Authorization: `Bearer ${localStorageToken.token}`,
      },
    })
      .then((res) => res.json())
      .then((datas) => {
        console.log(datas)
        setMainInfos(datas)
        setIsLoading(true)
      })
  }, [])

  return (
    <>
      {isLoading && (
        <div class="container-fluid" id="home-content">
          <div class="container">
            <div class="home-content-title">
              <span class="welcome">
                خوش آمدید,<span class="name">{MainInfos.adminName}</span>
              </span>
            </div>
            <div class="home-content-boxes">
              <div class="row">
                {MainInfos.infos.map((info) => (
                  <MainInfoBox key={info._id} {...info}/>
                ))}
              </div>
            </div>

            <DataTable title="کاربران اخیر اضافه شده">
              <table class="table">
                <thead>
                  <tr>
                    <th>شناسه</th>
                    <th>نام</th>
                    <th>شماره</th>
                    <th>ایمیل</th>
                    <th>نقش</th>
                  </tr>
                </thead>
                <tbody>
                  {MainInfos.lastUsers.length ? (
                    <>
                      {MainInfos.lastUsers.map((user, index) => (
                        <tr key={user._id}>
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.phone}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <div class="alert alert-warning">
                      هیچ کاربری یافت نشد !
                    </div>
                  )}
                </tbody>
              </table>
            </DataTable>
          </div>
        </div>
      )}
    </>
  )
}
