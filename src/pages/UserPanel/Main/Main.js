import React, { useContext } from "react"
import AuthContext from "../../../userContext/authContext"
import MainBox from "../../../Components/UserPanel/MainBox/MainBox"

export default function Index() {
  const authContext = useContext(AuthContext)

  return (
    <div class="col-9">
      <div class="main">
        <div class="main__title">
          <span class="main__title-text">
            سلام{" "}
            <span class="main__title-name">{authContext.userInfos.name}</span>،
            به پنل کاربری خوش اومدی
          </span>
        </div>
        <p class="main__desc">
          از طریق پیشخوان حساب کاربری‌تان، می‌توانید سفارش‌های اخیرتان را
          مشاهده، آدرس‌های حمل و نقل و صورتحساب‌تان را مدیریت و جزییات حساب
          کاربری و کلمه عبور خود را ویرایش کنید.
        </p>
        <div class="main__links">
          <div class="row">
            <MainBox title="سفارشات" href="orders" />
            <MainBox title="دوره های خریداری شده" href="courses" />
            <MainBox title="کیف پول من" href="wallet" />
            <MainBox title="جزئیات حساب کاربری" href="infos" />
            <MainBox title="تیکت های پشتیبانی" href="ticket" />
          </div>
        </div>
      </div>
    </div>
  )
}
