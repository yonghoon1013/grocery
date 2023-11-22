'use client';
import Image from 'next/image'
import styles from './party.module.scss'
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { myContext } from '../Context';


export default function Party_detail() {
  const { memberData, setMemberData, contentsData, setContentsData, matchData, setMatchData, KakaoMap } = useContext(myContext);
  const [commentsData, setCommentsdata] = useState([]);
  const matchParams = useSearchParams();
  const [map, setMap] = useState({});
  const [data, setData] = useState([]);
  const [ownerid, setOwnerId] = useState("");
  const router = useRouter();

  const sNum = matchParams.get('num');




  

  async function commentsLd() {
    await axios.get(`/api/comment?num=${sNum}`)
    .then(res=>{
      setCommentsdata(res.data);
    })
  }

  async function ownermatch() {
    await axios.get(`/api/ownercomment?num=${sNum}`)
    .then(res=>{
      setOwnerId(res.data[0].id); // 글 아이디 추적
    })
  }


  async function addressLd() {
    await axios.get(`/api/addressget?num=${sNum}`)
    .then(res=>{
      setData(res.data);
    })    
  }


  const writing = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData.append("id", sessionStorage.getItem("id"));
    formData.append("nickname", sessionStorage.getItem("nickname"));
    formData.append("num", sNum);
    let objData = Object.fromEntries(formData);

    await axios.post("/api/comment", objData)
    .then(res=>{
      setCommentsdata(res.data);
    })

    e.target.text.value = "";
  }

  const modify = async (e) => {
    e.preventDefault()
    axios.get(`/api/modify/${sNum}?id=${sessionStorage.getItem("id")}`)
    .then(res=>{
      if(res.data) {router.push(`/pages/party/partymodify?num=${sNum}`)}
      else{alert("못가")}
    })   
  }

  const ownercolor = (e, id) => {
    if(id == ownerid) {e.target.style.background = "#8deac6"}
  }


  useEffect(()=>{
    addressLd();
    ownermatch();
    commentsLd();
  }, [])



  if (!data[0]) return <></>
  return (

    <>    
        
          
        
        <section className={styles.color}>
          <div className={styles.map}>
          <KakaoMap setMap={setMap} lat={data[0].lat} lng={data[0].lng} />
          </div>
          <p className={styles.add}>주소 : {data[0].address}</p>
            <div>
              <div className={styles.flex}>
                <div className={styles.face}>
                  <img src="/asset/smilingface.png"/>
                  <p>{data[0].nickname}</p>
                </div>
                
                <div>
                  <p>{data[0].title} (1/{data[0].count})</p>
                  <p>{data[0].time}  ~</p>
                </div>
                <button onClick={(e)=>{modify(e)}}>수정</button>
              </div>               
              <p className={styles.line}>{data[0].text}</p> 
            </div>

            
      
            
      <ul>
      <p>댓글 {commentsData.length} 개</p>
      {commentsData.map((item) => (

            <li onLoad={(e)=>{ownercolor(e, item.id)}} key={item.num} >
              <img src="/asset/smilingface.png" alt="smiling face" />
              <div className={styles.smile}>
                <p>{item.id}</p>
                <p>{item.text}</p>
              </div>
                
            </li>
         
          ))}
      </ul>
      <form onSubmit={writing}>
        <input required 
          name='text'
          type="text"
        />
        <button>등록</button>
      </form>
  
    </section>
            

        

    </>
  )
}
