import React, { useEffect, useState } from "react"
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable"
import swal from "sweetalert"

export default function Contact() {
  const [contacts, setContacts] = useState([])
  const localStorageData = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    fetch("http://localhost:4000/v1/contact")
      .then((res) => res.json())
      .then((allContacts) => {
        setContacts(allContacts)
      })
  }, [])
function showContactBody(name,body){
  swal({
    text:`${name}: ${body}`,
    buttons: "تایید",
  })
}

function answerContactHandler(email){
  swal({
    text:"متن پاسخ را وارد کنید:",
    content:'input',
    buttons: "ارسال",
  }).then(value=>{
    if (value.trim()) {
      console.log(value);
      fetch('http://localhost:4000/v1/contact/answer',{
        method:'POST',
        headers:{
          Authorization: `Bearer ${localStorageData.token}`,
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({
          email,
          answer:value
        })
      }).then(res=>{
        if (res.ok) {
          swal({
            text: 'پیغام شما ارسال شد',
            icon: "success",
            dangerMode: false,
            buttons: "تایید",
          })
        }else{
             console.log(res.text()); 
        }
      })
    }
  })
}
  return (
    <>
      <DataTable title="پیغام‌ها">
        <table class="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>شماره تماس</th>
              <th>مشاهده</th>
              <th>حذف</th>
              <th>پاسخ</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary edit-btn"
                    onClick={() => showContactBody(contact.name,contact.body)}
                  >
                    مشاهده پیغام
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-primary edit-btn" onClick={()=>answerContactHandler(contact.email)}>
                    پاسخ
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-danger delete-btn">
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  )
}