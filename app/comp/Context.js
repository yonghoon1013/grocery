"use client"
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const myContext = createContext(null);

function Context({children}) {
    const [memberData, setMemberData] = useState([]);
    const [contentsData, setContentsData] = useState([]);
    const [matchData, setMatchData] = useState([]);
    const [fNum, setFNum] = useState([]);


    const memberLd = async () => {
        axios.get("/api/member")
        .then(res => {
            setMemberData(res.data);
        })
    }

    const contentsLd = async () => {
        axios.get("/api/contents") 
        .then(res => {
            setContentsData(res.data);
        })
    }

    const matchLd = async () => {
        axios.get("/api/match")
        .then(res=> {
            setMatchData(res.data.data);
        })
    }

    const commentLd = async () => {
      await axios.get("/api/comment")
      .then(res=>{
      })
    }

    const favStart = async () => {
      const id = sessionStorage.getItem("id")
      await axios.get(`/api/favorite?id=${id}`)
      .then(res=>{
      
          setFNum(res.data)
          
      })
  }
    


    function KakaoMap({ lat, lng, setMap }) {
      useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${'b03af3865fb67ef929f3f6d0c5b0d83c'}&libraries=services,clusterer&autoload=false`;
        document.head.appendChild(script);
    
        script.addEventListener('load', () => {
          window.kakao.maps.load(() => {
            const container = document.getElementById('map');
            const options = {
              center: new window.kakao.maps.LatLng(lat, lng),
              level: 3,
            };
            const map = new window.kakao.maps.Map(container, options);
            const markerPosition = new kakao.maps.LatLng(lat, lng);

            // 해당 위치를 사용하여 마커 생성
            const marker = new kakao.maps.Marker({
              position: markerPosition,
            });
            marker.setMap(map); // 지도에 마커 표시
            setMap(map); // setMap 함수를 사용하여 map 상태를 설정
          });
        });
      }, [lat, lng, setMap]);
    
      return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
  }
      


    useEffect(()=>{
        memberLd();
        contentsLd();
        matchLd();
        commentLd();
        favStart();
    }, [])



  return (
    <myContext.Provider value={{memberData, setMemberData, contentsData, setContentsData, matchData, setMatchData, KakaoMap, fNum, setFNum, matchLd}}>
        {children}
    </myContext.Provider>
  )
}

export default Context