import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Orders.css"

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const localStorageToken = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    fetch(`http://localhost:4000/v1/orders`, {
      headers: {
        Authorization: `Bearer ${localStorageToken.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setOrders(data)
        setIsLoading(true)
      })
  }, [])

  return (
    <div class="col-9">
      {isLoading && (
        <div class="order">
          <table class="order__table">
            <thead class="order__table-header">
              <tr class="order__table-header-list">
                <th class="order__table-header-item">شناسه</th>
                <th class="order__table-header-item">تاریخ</th>
                <th class="order__table-header-item">وضعیت</th>
                <th class="order__table-header-item">دوره</th>
                <th class="order__table-header-item">مبلغ</th>
                <th class="order__table-header-item">عملیات ها</th>
              </tr>
            </thead>
            <tbody class="order__table-body">
              {orders.map((order, index) => (
                <tr key={order._id} class="order__table-body-list">
                  <td class="order__table-body-item">
                    <a href="#" class="order__table-body-link">
                      {index + 1}
                    </a>
                  </td>
                  <td class="order__table-body-item">
                    {order.createdAt.slice(0, 10)}
                  </td>
                  <td class="order__table-body-item">تکمیل شده</td>
                  <td class="order__table-body-item">{order.course.name}</td>
                  <td class="order__table-body-item">{order.price}</td>
                  <td class="order__table-body-item">
                    <Link
                      class="order__table-body-btn"
                      to={`/my-account/view-order/${order._id}`}
                    >
                      نمایش
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
