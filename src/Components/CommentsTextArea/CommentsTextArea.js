import React, { useContext, useEffect, useState } from "react"
import { FaRegComment, FaCheck, FaChevronDown } from "react-icons/fa"
import "./CommentsTextArea.css"
import Pagination from "../Pagination/Pagination"
import AuthContext from "../../userContext/authContext"
import { Link } from "react-router-dom"

export default function CommentsTextArea({ comments, submitComment }) {
  const contextData = useContext(AuthContext)
  const [contentComment, setContentComment] = useState("")
  const [shownComments, setShownComments] = useState([])
  const [score, setScore] = useState("امتیاز خود را انتخاب کنید")
  // answerContent
  function clearCommentTextArea() {
    setContentComment("")
    setScore("امتیاز خود را انتخاب کنید")
  }
  return (
    <div className="comments">
      <div className="comments__header">
        <div className="comments__header-icon-content">
          <FaRegComment className="comments__header-icon" />
        </div>
        <span className="comments__header-title">نظرات</span>
      </div>
      <div className="comments__content">
        {comments.length === 0 ? (
          <div className="alert alert-warning">
            هنوز کامنتی برای این دوره ثبت نشده!
          </div>
        ) : (
          <>
            {comments.map((comment) => (
              <div key={comment._id} className="comments__item">
                <div className="comments__question">
                  <div className="comments__question-header">
                    <div className="comments__question-header-right">
                      <span className="comments__question-name comment-name">
                        {comment.creator.name}
                      </span>
                      <span className="comments__question-status comment-status">
                        {comment.creator.role === "ADMIN" ? "مدیر" : "کاربر"}
                      </span>
                      <span className="comments__question-date comment-date">
                        {comment.createdAt.slice(0, 10)}
                      </span>
                    </div>
                    <div className="comments__question-header-left">
                      <a
                        className="comments__question-header-link comment-link"
                        href="#"
                      >
                        پاسخ
                      </a>
                    </div>
                  </div>
                  <div className="comments__question-text">
                    <p className="comments__question-paragraph comment-paragraph">
                      {comment.body}
                    </p>
                  </div>
                  {comment.answerContent && (
                    <div key={comment.answerContent._id} className="comments__item my-5">
                      <div className="comments__question">
                        <div className="comments__question-header">
                          <div className="comments__question-header-right">
                            <span className="comments__question-name comment-name">
                              {comment.answerContent.creator.name}
                            </span>
                            <span className="comments__question-status comment-status">
                              {comment.answerContent.creator.role === "ADMIN"
                                ? "مدیر"
                                : "کاربر"}
                            </span>
                            <span className="comments__question-date comment-date">
                              {comment.answerContent.createdAt.slice(0, 10)}
                            </span>
                          </div>
                          <div className="comments__question-header-left">
                            <a
                              className="comments__question-header-link comment-link"
                              href="#"
                            >
                              پاسخ
                            </a>
                          </div>
                        </div>
                        <div className="comments__question-text">
                          <p className="comments__question-paragraph comment-paragraph">
                            {comment.answerContent.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {/* <Pagination
              items={comments}
              itemsCount={2}
              pathname={`/course-info`}
              setShownCourses={setShownComments}
            /> */}
          </>
        )}
      </div>

      {contextData.isLoggedIn ? (
        <>
          <div className="comments__rules">
            <span className="comments__rules-title">قوانین ثبت دیدگاه</span>
            <span className="comments__rules-item">
              <FaCheck className="comments__rules-icon" />
              اگر نیاز به پشتیبانی دوره دارید از قسمت پرسش سوال در قسمت نمایش
              انلاین استفاده نمایید و سوالات مربوط به رفع اشکال تایید نخواهند شد
            </span>
            <span className="comments__rules-item">
              <FaCheck className="comments__rules-icon" />
              دیدگاه های نامرتبط به دوره تایید نخواهد شد.
            </span>
            <span className="comments__rules-item">
              <FaCheck className="comments__rules-icon" />
              سوالات مرتبط با رفع اشکال در این بخش تایید نخواهد شد.
            </span>
            <span className="comments__rules-item">
              <FaCheck className="comments__rules-icon" />
              از درج دیدگاه های تکراری پرهیز نمایید.
            </span>
          </div>
          <div className="comments__respond">
            <div className="comments__score">
              <span className="comments__score-title">امتیاز شما</span>
              <select
                className="comments__score-input w-100"
                onChange={(e) => setScore(e.target.value)}
                value={score}
              >
                <option className="comments__score-input-text">
                  امتیاز خود را انتخاب کنید
                </option>
                <option className="comments__score-input-text">1</option>
                <option className="comments__score-input-text">2</option>
                <option className="comments__score-input-text">3</option>
                <option className="comments__score-input-text">4</option>
                <option className="comments__score-input-text">5</option>
              </select>
              {/* <FaChevronDown className="comments__input-icon" /> */}
            </div>
            <div className="comments__respond-content">
              <div className="comments__respond-title">دیدگاه شما *</div>
              <textarea
                className="comments__score-input-respond"
                value={contentComment}
                onChange={(e) => setContentComment(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="comments__respond-btn"
              onClick={() =>
                submitComment(score, contentComment, clearCommentTextArea)
              }
            >
              ارسال
            </button>
          </div>
        </>
      ) : (
        <div className="alert alert-danger">
          برای ثبت دیدگاه باید وارد <Link to={"/login"}>حساب کاربری</Link> خود
          شوید !
        </div>
      )}
    </div>
  )
}
