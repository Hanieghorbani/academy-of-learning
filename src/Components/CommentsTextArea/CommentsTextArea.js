import React, { useContext } from "react"
import { FaRegComment,FaCheck,FaChevronDown   } from "react-icons/fa";
import "./CommentsTextArea.css"
import Pagination from '../Pagination/Pagination'
import AuthContext from "../../userContext/authContext";
import { Link } from "react-router-dom";
export default function CommentsTextArea({ comments }) {
  const contextData = useContext(AuthContext)

  return (
    <div class="comments">
      <div class="comments__header">
        <div class="comments__header-icon-content">
          <FaRegComment className="comments__header-icon"/>
        </div>
        <span class="comments__header-title">نظرات</span>
      </div>
      <div class="comments__content">
        {comments.length === 0 ? (
          <div className="alert alert-warning">
            هنوز کامنتی برای این دوره ثبت نشده!
          </div>
        ) : (
          <>
            {comments.map((comment) => (
              <>
                <div class="comments__item">
                  <div class="comments__question">
                    <div class="comments__question-header">
                      <div class="comments__question-header-right">
                        <span class="comments__question-name comment-name">
                          {comment.creator.name}
                        </span>
                        <span class="comments__question-status comment-status">
                          {comment.creator.role === "ADMIN" ? "مدیر" : "کاربر"}
                        </span>
                        <span class="comments__question-date comment-date">
                          {comment.createdAt.slice(0, 10)}
                        </span>
                      </div>
                      <div class="comments__question-header-left">
                        <a
                          class="comments__question-header-link comment-link"
                          href="#"
                        >
                          پاسخ
                        </a>
                      </div>
                    </div>
                    <div class="comments__question-text">
                      <p class="comments__question-paragraph comment-paragraph">
                        {comment.body}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ))}
           <Pagination />
          </>
        )}
      </div>
      

      {contextData.isLoggedIn ? (<>
<div class="comments__rules">
        <span class="comments__rules-title">قوانین ثبت دیدگاه</span>
        <span class="comments__rules-item">
          <FaCheck className="comments__rules-icon"/>
          اگر نیاز به پشتیبانی دوره دارید از قسمت پرسش سوال در قسمت نمایش انلاین
          استفاده نمایید و سوالات مربوط به رفع اشکال تایید نخواهند شد
        </span>
        <span class="comments__rules-item">
        <FaCheck className="comments__rules-icon"/>
          دیدگاه های نامرتبط به دوره تایید نخواهد شد.
        </span>
        <span class="comments__rules-item">
        <FaCheck className="comments__rules-icon"/>
          سوالات مرتبط با رفع اشکال در این بخش تایید نخواهد شد.
        </span>
        <span class="comments__rules-item">
        <FaCheck className="comments__rules-icon"/>
          از درج دیدگاه های تکراری پرهیز نمایید.
        </span>
      </div>
      <div class="comments__respond">
        <div class="comments__score">
          <span class="comments__score-title">امتیاز شما</span>
          <div class="comments__score-input">
            <span class="comments__score-input-text">
              امتیاز خود را انتخاب کنید
            </span>
            <FaChevronDown className="comments__input-icon"/>
          </div>
        </div>
        <div class="comments__respond-content">
          <div class="comments__respond-title">دیدگاه شما *</div>
          <textarea class="comments__score-input-respond"></textarea>
        </div>
        <button type="submit" class="comments__respond-btn">
          ارسال
        </button>
      </div>
      </>) : (<div className="alert alert-danger">برای ثبت دیدگاه باید وارد  <Link to={'/login'}>حساب کاربری</Link> خود شوید !</div>)}
    </div>
  )
}
