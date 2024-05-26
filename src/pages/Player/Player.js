import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'
const Player = () => {
  const {id}=useParams()
  const navigate = useNavigate()
  const [apiData,setApiData]=useState({
    name:'',
    key:'',
    published_at:'',
    type:''
  })
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDU4ZjdhZTA4NmQxNDdmYmRlYTE2ZWFhYzY3ODljMCIsInN1YiI6IjY2NTFhZmY2MDJmMjk0Zjc1MTI2ZjA1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uC7biNW-5T-_oMlH_mr4U_GUu1taHSV3orX029DxRPs'
    }
  };
  
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, options)
      .then(response => response.json())
      .then(response => setApiData(response.results[0]))
      .catch(err => console.error(err));
  })
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>navigate(-1)}/>
      <iframe width='90%' height='90%'   src={`https://www.youtube.com/embed/${apiData.key}`} title='Trailer' allowFullScreen frameborder="0"></iframe>
      <div className="player-info">
        <p>{new Date(apiData.published_at).toLocaleDateString()}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
