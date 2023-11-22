"use client";
import React, { useEffect } from "react";
import styles from "./mypage.module.scss";
import axios from "axios";

function Mypage() {
  return (
    <section className={styles.myPage}>
      <h2>마이페이지</h2>
        <div className={styles.profileBox}>
            <figure>
              <img src="../asset/profile-icon.png"></img>
            </figure>
            <div className={styles.profileInfo}>
              <p className={styles.nickName}>길동<span></span></p>
              <p className={styles.email}>hong@naver.com</p>
            <button>로그아웃</button>
            </div>
        </div>

        <div className={styles.profileUpdate}>
          <h2>개인정보 수정</h2>
          <div className={styles.updateBox}>
              <form>
                <p><span>현재 비밀번호</span> <input type="text" placeholder="현재 비밀번호" name="passWord"/></p>
                <p><span>새 비밀번호</span> <input type="text" placeholder="새 비밀번호" name="rePassWord"/></p>
                <p><span>비밀번호 확인</span> <input type="text" placeholder="비밀번호 확인" name="checkPassWord"/></p>
                <div>
                <button>적용</button>
                </div>
              </form>
          </div>
        </div>
        {/* <p>회원탈퇴</p> */}
    </section>
  )
}

export default Mypage