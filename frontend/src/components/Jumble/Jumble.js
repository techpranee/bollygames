import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import Word from './Word'
import './jumble.css'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function Jumble() {
  const movies = useRef([])
  const selectedMovie = useRef(0)
  const [result, setresult] = useState(false)
  const [page, setpage] = useState(1)
  const [loaded, setloaded] = useState(false)
  const [lang, setlang] = useState('te')
  const [movieName, setmovieName] = useState('')

  const fetchMovies = async () => {
    try {
      let resp = await axios.get(`/api/movies?page=${page}&lang=${lang}`);
      console.log(resp.status)
      if (resp.status === 200) {
        if (movies.current.length < page * 20) {
          movies.current = [...movies.current, ...resp.data.results]
          console.log(movies.current);
        }
        setloaded(true)
      }
    } catch (error) {
      setloaded(true)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [page])
  function getWordsArray(str) {
    return str.split(" ")
  }

  const checkForMoreMovies = () => {
    if (page * 20 < selectedMovie.current + 5) {
      setloaded(false)
      setpage(page + 1)
    }
  }
  const nextMovie = () => {
    console.log('current index :', selectedMovie.current, 'out of :', movies.current.length)
    setresult(false)
    checkForMoreMovies()
    selectedMovie.current = selectedMovie.current + 1
    setTimeout(() => {
      setmovieName(movies.current[selectedMovie.current].title)
    }, 100);
  }

  return (<>
    {loaded === true ? <div className="SlotMachine">
      <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ marginBottom: 20 }}>
        <Button onClick={() => setresult(!result)}>Reveal</Button>
        <Button onClick={nextMovie}>Next</Button>
      </ButtonGroup>
      {getWordsArray(movieName).map((w, i) => <Word word={w} key={i} />)}
      {result && <p style={{ color: '#fff', fontSize: '22px' }}>{movieName}</p>}
    </div> : <h5>Loading</h5>
    }
  </>
  )
}
