"use client";
import Image from "next/image";
import styles from "./page.module.scss";
import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";



// import required modules
import { Autoplay, Pagination, Navigation} from "swiper/modules";




export default function Home() {
  const menu = ['과일류', '채소류', '수산물', '축산물', '버섯', '곡물/가공류']
  
const imgMappings = {
  '과일류': '/asset/cate01.png',
  '채소류': '/asset/cate02.png',
  '수산물': '/asset/cate03.png',
  '축산물': '/asset/cate04.png',
  '버섯': '/asset/cate05.png',
  '곡물/가공류': '/asset/cate06.png'
}

  return (
    <section>
      <header>
        <div className="foot_head">
          <figure>
            <img src="./asset/mainlogo.png"></img>
          </figure>
          <h1>
            <a href="">장보는 날</a>
          </h1>
        </div>
        <div className="menu">
          <ul className="gnb">
            <li>
              <a href="">홈</a>
            </li>
            <li>
              <a href="">베스트</a>
            </li>
            <li>
              <a href="">가격추이</a>
            </li>
            <li>
              <a href="">물가변동</a>
            </li>
            <li>
              <a href="">농수산 사고</a>
            </li>
          </ul>
        </div>
      </header>

      <main>
        <div className="add_wrap">
          <Swiper
          pagination={true} 
          modules={[Autoplay,Pagination ,Navigation]} 
          autoplay={{ delay:3000}}
          className="mySwiper">
            <SwiperSlide>
              <img src="./asset/add-06.png"></img>
            </SwiperSlide>
            <SwiperSlide>
              <img src="./asset/add-03.png"></img>
            </SwiperSlide>
            <SwiperSlide>
              <img src="./asset/add-05.png"></img>
            </SwiperSlide>
            <SwiperSlide>
              <img src="./asset/add-04.png"></img>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="sbox_wrap">
          <div className="sch">
            <input type="serch" placeholder="원하시는 품목을 검색해보세요"></input>
            <button type="submit">
              <img src="./asset/serc.png"></img>
            </button>
          </div>

          <ul className="cate_list">
          {
            menu.map((item, index)=>(
              <li key={index}>
                <Link href={`/pages/list?tab=${item}`}>
                  <span className="tit">{item}</span>
                  <figure>
                    <img src={imgMappings[item]}></img>
                  </figure>
                </Link>
              </li>
            ))
          }
          </ul>


        </div>
        <div className="price-01">
          <h2 className="subtit">주요 농수산물 평균 물가</h2>
          <ul>
            <li>
              <figure className="pic">
                <img src="./asset/item01.png"></img>
              </figure>
              <div className="txt">
                <strong class="name">
                  해남 세척 무농약 꿀고구마 5kg 중크기
                </strong>
                <p>평균도매가: 1kg당 3000원</p>
                <p>평균소매가: 1kg당 5000원</p>
              </div>
            </li>
            <li>
              <figure className="pic">
                <img src="./asset/item02.png"></img>
              </figure>
              <div className="txt">
                <strong class="name">
                  초당옥수수 (17-20cm 특) 2팩 (4개입)
                </strong>
                <p>평균도매가 : 1개당 2,880원</p>
                <p>평균소매가 : 1개당 5,000원</p>
              </div>
            </li>
            <li>
              <figure className="pic">
                <img src="./asset/item03.png"></img>
              </figure>
              <div className="txt">
                <strong class="name">가락시장 햇 양파 1kg</strong>
                <p>평균도매가 : 100g당 490원</p>
                <p>평균소매가 : 100g당 1000원</p>
              </div>
            </li>
            <li>
              <figure className="pic">
                <img src="./asset/item04.png"></img>
              </figure>
              <div className="txt">
                <strong class="name">무농약 풍성한 팽이버섯 (330g/봉)</strong>
                <p>평균도매가 : 100g당 452원</p>
                <p>평균소매가 : 100g당 800원</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="price-02">
          <h2 className="subtit">친환경 농산물현황 가격정보 </h2>
          <ul>
            <li>
              <figure className="pic">
                <img src="./asset/item05.png"></img>
              </figure>
              <div className="txt">
                <strong class="name">친환경 햇 감자 1kg</strong>
                <p>3,880원</p>
                <span>100g당 388원</span>
              </div>
            </li>
            <li>
              <figure className="pic">
                <img src="./asset/item06.png"></img>
              </figure>
              <div className="txt">
                <strong class="name">친환경 청피망 1kg</strong>
                <p>7,600원</p>
                <span>100g당 760원</span>
              </div>
            </li>
            <li>
              <figure className="pic">
                <img src="./asset/item07.png"></img>
              </figure>
              <div className="txt">
                <strong class="name">친환경 완숙토마토 3개(600g)</strong>
                <p>10,500원</p>
                <span>100g당 808원</span>
              </div>
            </li>
            <li>
              <figure className="pic">
                <img src="./asset/item08.png"></img>
              </figure>
              <div className="txt">
                <strong class="name">무농약 풍성한 팽이버섯 (330g/봉)</strong>
                <p>6,800원</p>
                <span>100g당 1,134원</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="add-01">
          <figure class="bg">
            <img src="./asset/Rectangle.png"></img>
          </figure>
          <figure className="bubble">
            <img src="./asset/bubb.png"></img>
            <figcaption>지금 바로</figcaption>
          </figure>
          <p className="txt">
            더 <span>저렴하고</span>, 
            더 <span>안전하게 
            </span><br />
            장보기를 즐겨보세요~
          </p>
        </div>
        <div className="add-02">
          <p>
            따로 신경 쓸 필요가 없는
            <br />
            편리한 파티관리!
          </p>
          <figure className="pic">
            <img src="./asset/sassns.png"></img>
          </figure>
        </div>
        <div className="add-03">
          <figure>
          <img src="./asset/bg2.png"></img>
          </figure>
          <div className="inn">
            <strong>
              대한민국 1등
              <br />
              장보기 실시간 매칭 서비스
            </strong>
            <p>
              홈플러스,이마트,쓱 등<br/>
              보다 더 저렴하게<br/>
              가격비교와 함께 실시간
              매칭으로<br/> 빠르게 장보고 싶다면?
            </p>
            <a href="" className="start">파티 시작하기</a>
          </div>
        </div>
        
      </main>

    
    </section>
  );
}
