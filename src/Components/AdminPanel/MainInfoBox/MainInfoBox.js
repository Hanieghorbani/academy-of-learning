import React from 'react'
import { FaMoneyBill } from "react-icons/fa";
export default function MainInfoBox({count,title}) {
  return (
    <div class="col-4">
    <div class="home-content-revanue box">
      <div class="home-box">
        <div class="home-box-left">
          <div class="home-box-title">
            <span>{title}</span>
          </div>
          <div class="home-box-value">
            <div class="home-box-price">
              <span>{count}</span>
            </div>
            {/* <div class="home-box-result">
              <span>+5.2%</span>
            </div> */}
          </div>
          <div class="home-box-text">
            <span>{title} در یک ماه گذشته</span>
          </div>
        </div>
        <div class="home-box-right">
          <div class="home-box-icon">
            <FaMoneyBill />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
