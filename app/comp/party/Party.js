'use client'
import React, { useContext, useEffect, useState } from 'react';
import styles from './party.module.scss';
import { myContext } from '../Context';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function Party() {
  const { matchData, setMatchData, KakaoMap } = useContext(
    myContext
  );
  const [map, setMap] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState('');
  const [filteredMatches, setFilteredMatches] = useState([]);
  const router = useRouter();




  //좌표빼기
  const geo = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  useEffect(() => {
    geo();
  }, []);

  const apiKey = '39f1ed72f3a77ac7897504949ccc197e';




  //좌표 주소변환
  const getFormattedAddress = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
        {
          headers: {
            Authorization: `KakaoAK ${apiKey}`, // 여기에 발급받은 REST API 키를 넣어주세요.
          },
        }
      );
      if (response.data.documents.length > 0) {
        setAddress(response.data.documents[0].address.address_name);
      } else {
        setAddress('주소를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('주소를 불러오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      getFormattedAddress(latitude, longitude);
    }
  }, [latitude, longitude]);






  
  const handleCheckboxChange = (num) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = {};
      if (!prevCheckedItems[num]) {
        Object.keys(prevCheckedItems).forEach((key) => {
          newCheckedItems[key] = false;
        });
        newCheckedItems[num] = true;
      }
      return newCheckedItems;
    });
  };
  



  const goDetail = (num) => {
    router.push(`/pages/party/partydetail?num=${num}`)
  }

  const handlePlusClick = (e) => {
    e.preventDefault();
    router.push(`/pages/matchmaking`);
  };



  //현재위치 거리변환 및 계산,
  useEffect(() => {
    if (latitude && longitude) {
      const filteredMatches = matchData.filter((item) => {
        const distance = getDistanceFromLatLonInKm(latitude, longitude, item.lat, item.lng);
        return distance <= 1.5; // 거리가 800m 이내인지 확인
      });
      setFilteredMatches(filteredMatches);
    }
  }, [latitude, longitude, matchData]);
  

  return (
    <section className={styles.white}>
      <div className={styles.bold}>
        <h3>장 같이 보기</h3>
      </div>

      <div>
        <figure className={styles.ad}>
          <img src="../asset/AD.png" alt="광고" />
        </figure>
        <figcaption>이번달 배추가 풍년이래요~</figcaption>
      </div>

      <div className={styles.address}>
        <div>
 <p>{address}</p> 

    </div>

        <img onClick={geo} src="../asset/rotate.png" alt="회전" />

      </div>

      <div>
        <ul className={styles.group}>
          {filteredMatches.map((item) => (
            <li key={item.num} className={styles.list}>
              <div className={styles.up}>
                <img src="../asset/smilingface.png" alt="웃는 얼굴" />
                <div className={styles.size}>
                  <p>{item.title} (1/{item.count})</p>
                  <p>{item.time} </p>
                </div>
                <input type='checkbox' checked={checkedItems[item.num] || false} onChange={() => handleCheckboxChange(item.num)} />
              </div>
              {checkedItems[item.num] && (
                <div className={styles.down}>
                  <p>주소 : {item.address}</p>
                  <div className={styles.center}>
                    <KakaoMap setMap={setMap} lat={item.lat} lng={item.lng}  />
                    <button onClick={()=>{goDetail(item.num)}}>자세히 보기</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className={styles.plus} onClick={handlePlusClick}>
          <img src="../asset/plus.png" alt="더하기" />
        </div>
      </div>
    </section>
  );
}

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // 지구의 반지름 (단위: km)
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // 두 지점 사이의 거리 (단위: km)
  return d;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

export default Party;
