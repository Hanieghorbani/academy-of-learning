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
        setOrders(data)
        setIsLoading(true)
      })
  }, [])

  return (
    <div className="col-9">
      {isLoading && (
        <div className="order">
          <table className="order__table">
            <thead className="order__table-header">
              <tr className="order__table-header-list">
                <th className="order__table-header-item">شناسه</th>
                <th className="order__table-header-item">تاریخ</th>
                <th className="order__table-header-item">وضعیت</th>
                <th className="order__table-header-item">دوره</th>
                <th className="order__table-header-item">مبلغ</th>
                <th className="order__table-header-item">عملیات ها</th>
              </tr>
            </thead>
            <tbody className="order__table-body">
              {orders.map((order, index) => (
                <tr key={order._id} className="order__table-body-list">
                  <td className="order__table-body-item">
                    <a href="#" className="order__table-body-link">
                      {index + 1}
                    </a>
                  </td>
                  <td className="order__table-body-item">
                    {order.createdAt.slice(0, 10)}
                  </td>
                  <td className="order__table-body-item">تکمیل شده</td>
                  <td className="order__table-body-item">{order.course.name}</td>
                  <td className="order__table-body-item">{order.price}</td>
                  <td className="order__table-body-item">
                    <Link
                      className="order__table-body-btn"
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
