import React, { useEffect, useState, useSyncExternalStore } from 'react'
import './Banner.css'
import { API_KEY ,imageUrl} from '../../constants/constants'
import axios from '../../axios'

function Banner() {
  const [movie, setMovie]=useState()
  const [currentIndex, setCurrentIndex] = useState(0);

// useEffect(()=>{
//     axios.get(`trending/all/day?api_key=${API_KEY}&language=en-US`).then((Response)=>{
//       console.log(Response.data.results[3])
//       setMovie(Response.data.results[3])
//     })
// },[])

useEffect(() => {
  const fetchData = async () => {
      const response = await axios.get(`trending/all/day?api_key=${API_KEY}&language=en-US`);
      setMovie(response.data.results[currentIndex]);
  };

  fetchData();

  const intervalId = setInterval(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 30 ); // Assuming there are 20 results
    fetchData();
  }, 2000);

  return () => clearInterval(intervalId);
}, [currentIndex]);

  return (
    
    <div 
    style={{backgroundImage:`url(${movie ? imageUrl+movie.backdrop_path : ""})`}}
    className='banner'>
        <div className='content'>
            <h1 className='title'>{movie ? movie.title : ""}</h1>
            <div className='banner_button'>
                <button className='button'>Play</button>
                <button className='button'>My list</button>
            </div>
            <h1 className='description'> {movie ? movie.overview :""}</h1>
        </div>
      <div className='fade_bottom'></div>
    </div>
  )
}

export default Banner
