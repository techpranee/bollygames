import React, { useState, useEffect, useRef } from 'react';
import MovieCard from './MovieCard';
import Timer from '../Timer/index'
import axios from 'axios'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import './movieslider.css'

export default function MovieGuess() {
    const movies = useRef([])
    const [page, setpage] = useState(1)
    const [start, setstart] = useState(false)
    const [result, setresult] = useState(false)
    const [loaded, setloaded] = useState(false)
    const [resetTimer, setresetTimer] = useState(false)
    const [lang, setlang] = useState('te')
    const percentTimeCompleted = useRef(0)
    const selectedMovie = useRef(0)
    const fetchMovies = async () => {
        try {
            let resp = await axios.get(`/api/movies?page=${page}&lang=${lang}`);
            console.log(resp.status)
            if (resp.status === 200) {
                // var ids = new Set(...movies.current.map(m => m.id));
                // movies.current = [...movies.current, ...resp.data.results.filter(m => !ids.has(m.id))];
                if (movies.current.length < page * 20) {
                    movies.current = [...movies.current, ...resp.data.results]
                }
                setloaded(true)
                console.log(movies.current)
            }
        } catch (error) {
            setloaded(true)
        }
    }
    useEffect(() => {
        fetchMovies()
    }, [page, lang])

    const getCompletion = (percent) => {
        percentTimeCompleted.current = percent;
        blurimg(percentTimeCompleted.current)
    }
    const checkForMoreMovies = () => {
        if (page * 20 < selectedMovie.current + 5) {
            setloaded(false)
            setpage(page + 1)
        }
    }

    function blurimg(perc) {
        let blurValue = 15 * perc * 0.01 || 20;
        document.getElementById("c").style.opacity = "10"
        document.getElementById("c").style.filter = `blur(${blurValue}px)`
    }
    function clearImage() {
        document.getElementById("c").style.opacity = "100"
        document.getElementById("c").style.filter = "blur(0px)"
    }
    function blockImage() {
        document.getElementById("c").style.opacity = "0"
    }
    function toggleLanguage(l) {
        switch (l) {
            case 'hi':
                setlang('te')
                resetPage();
                break;
            case 'te':
                setlang('hi')
                resetPage();
                // movies.current = [];
                // selectedMovie.current = 0;
                // percentTimeCompleted.current = 0;
                break;
            default:
                setlang('te');
                resetPage();
                // movies.current = [];
                // selectedMovie.current = 0;
                // percentTimeCompleted.current = 0;
                break;
        }
    }


    function resetPage() {
        movies.current = [];
        setpage(1)
        setstart(false)
        setresult(false)
        setloaded(false)
        percentTimeCompleted.current = 0;
        selectedMovie.current = 0;
    }
    function handleStart() {
        blurimg();
        setstart(true)
    }
    function showResult() {
        setresult(true);
        clearImage();
        setstart(false)
    }
    function nextMovie() {
        console.log('going for next movie')
        setresult(false)
        setresetTimer(true)
        setstart(false)
        checkForMoreMovies()
        blockImage()
        setTimeout(() => {
            selectedMovie.current = selectedMovie.current + 1
        }, 100);
    }
    function nextPage() {
        setloaded(false)
        setpage(page + 1)
        selectedMovie.current = selectedMovie.current + 20
        setresult(false)
        setresetTimer(true)
        setstart(false)
    }
    return (
        <div>{loaded === true ? <div className="blog-slider">
            <div className="blog-slider__wrp swiper-wrapper">
                <div className="blog-slider__item swiper-slide">
                    <div className="blog-slider__img">
                        <img id="c" src={movies.current[selectedMovie.current]?.backdrop_path ? `https://image.tmdb.org/t/p/w500${movies.current[selectedMovie.current].backdrop_path}` : `https://image.tmdb.org/t/p/w500${movies.current[selectedMovie.current].poster_path}`} alt="" />
                    </div>
                    <div className="blog-slider__content">
                        <Timer start={start} duration={30} timeup={showResult} getCompletion={getCompletion} reset={resetTimer} />
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button onClick={handleStart}>Start</Button>
                            <Button onClick={showResult}>Reveal</Button>
                            <Button onClick={nextMovie}>Next</Button>
                            <Button onClick={nextPage}>Next Pg</Button>
                        </ButtonGroup>
                    </div>
                </div>
                {result && <p>{movies.current[selectedMovie.current].title}</p>}
            </div>
        </div> : <h5>Loading</h5>}
        
            <Button onClick={() => toggleLanguage(lang)}>Change Language</Button>
            <p>{selectedMovie.current}</p>
        </div>
    )
}
