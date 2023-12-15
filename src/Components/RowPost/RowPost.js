import React,{useEffect,useState} from 'react'
import YouTube from 'react-youtube'
import './RowPost.css'
import axios from '../../axios'
import { imageUrl,API_KEY } from '../../constants/constants'

function RowPost(props) {
  const [movies,setMovie]=useState([])
  const [UrlId,setUrlId]=useState('')

  useEffect(()=>{
    axios.get(props.url).then(Response=>{
      console.log(Response.data)
      setMovie(Response.data.results)
    }).catch(err=>{
      alert("Network error")
    })
  },[])
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleMovie=(id)=>{
      console.log(id)
      axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(Response=>{
        if(Response.data.results.length!==0){
          setUrlId(Response.data.results[0])
        }
        else{
          console.log('Array empty')
        }
      })
  }
  return (
    <div className='row'>
      <h2>{props.title}</h2>

      <div className='posters'>
        {movies.map((obj)=>
            <img onClick={()=> handleMovie(obj.id)} className={props.isSmall ? 'smallPoster' :'poster'} alt='poster' src={`${imageUrl + obj.backdrop_path}`}/>
        )}
        
      </div>

     { UrlId && <YouTube videoId={UrlId.key} opts={opts} />}

    </div>
  )
}

export default RowPost
