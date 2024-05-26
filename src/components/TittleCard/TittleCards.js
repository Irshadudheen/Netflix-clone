import React, { useEffect, useRef, useState } from 'react'
import './TittleCards.css'
import { Link } from 'react-router-dom'
const TittleCard = ({title,category}) => {

  const [apiData,setApiData]=useState([])
  const cardsRef= useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDU4ZjdhZTA4NmQxNDdmYmRlYTE2ZWFhYzY3ODljMCIsInN1YiI6IjY2NTFhZmY2MDJmMjk0Zjc1MTI2ZjA1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uC7biNW-5T-_oMlH_mr4U_GUu1taHSV3orX029DxRPs'
    }
  };
  
  

  const handleWheel=event=>{
    event.preventDefault();
    cardsRef.current.scrollLeft +=event.deltaY;  
  
  }
  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category}`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel',handleWheel);
  
  })
  return (
    <div className='tittle-Cards'>
      <h2>{title?title:"Popular on Netfilx"}</h2>
      <div className="card-list" ref={cardsRef}>
    {apiData.map((card,index)=>{
      return <Link to={`/player/${card.id}`} className="card" key={index}>
        <img src={`https://image.tmdb.org/t/p/w500`+card.poster_path} alt="" />
        <p>{card.original_title}</p>
      </Link>
    })}
      </div>

    </div>
  )
}

export default TittleCard
