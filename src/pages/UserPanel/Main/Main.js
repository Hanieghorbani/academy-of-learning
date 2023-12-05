import React, { useContext } from "react"
import AuthContext from "../../../userContext/authContext"
import MainBox from "../../../Components/UserPanel/MainBox/MainBox"

export default function Index() {
  const authContext = useContext(AuthContext)

  return (
    <div className="col-9">
      <div className="main">
        <div className="main__title">
          <span className="main__title-text">
            سلام{" "}
            <span className="main__title-name">{authContext.userInfos.name}</span>،
            به پنل کاربری خوش اومدی
          </span>
        </div>
        <p className="main__desc">
          از طریق پیشخوان حساب کاربری‌تان، می‌توانید سفارش‌های اخیرتان را
          مشاهده، آدرس‌های حمل و نقل و صورتحساب‌تان را مدیریت و جزییات حساب
          کاربری و کلمه عبور خود را ویرایش کنید.
        </p>
        <div className="main__links">
          <div className="row">
            <MainBox title="سفارشات" href="orders" />
            <MainBox title="دوره های خریداری شده" href="courses" />
            <MainBox title="کیف پول من" href="wallet" />
            <MainBox title="جزئیات حساب کاربری" href="edit-account" />
            <MainBox title="تیکت های پشتیبانی" href="tickets" />
          </div>
        </div>
      </div>
    </div>
  )
}
