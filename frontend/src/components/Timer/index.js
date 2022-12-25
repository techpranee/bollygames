import React, { useEffect, useState, useRef } from 'react'
import './timer.css'
export default function Timer({ start, duration, timeup, getCompletion, reset }) {
    const FULL_DASH_ARRAY = 283;
    const WARNING_THRESHOLD = 10;
    const ALERT_THRESHOLD = 5;
    const timerIntervalId = useRef(null);
    const timeLeft = useRef(duration)
    const timePassed = useRef(0)
    const COLOR_CODES = {
        info: {
            color: "green"
        },
        warning: {
            color: "orange",
            threshold: WARNING_THRESHOLD
        },
        alert: {
            color: "red",
            threshold: ALERT_THRESHOLD
        }
    };
    const TIME_LIMIT = duration;
    let remainingPathColor = COLOR_CODES.info.color;
    useEffect(() => {
        if (start === true) {
            // reset all values 
            timeLeft.current = duration;
            timePassed.current = 0
            setRemainingPathColor();
            startTimer();
        }
        return () => clearInterval(timerIntervalId.current);
    }, [start])

    useEffect(() => {
        console.log('resetting timer')
        if (reset === true) {
            timeLeft.current = duration;
            timePassed.current = 0
            setRemainingPathColor(timeLeft.current);
            setCircleDasharray();
            clearInterval(timerIntervalId.current);
        }
    }, [reset])


    const resetState = () => {
        console.log('time is up')
        clearInterval(timerIntervalId.current)
        setRemainingPathColor(timeLeft.current);
        timeup()
    }
    const getPercentTimeCompletion = () => {
        return (timeLeft.current / TIME_LIMIT) * 100
    }

    function startTimer() {
        console.log('start timer')
        timerIntervalId.current = setInterval(() => {
            timePassed.current = timePassed.current + 1;
            // reduceTimeLeft(timePassed)
            timeLeft.current = TIME_LIMIT - timePassed.current;
            document.getElementById("base-timer-label").innerHTML = formatTime(
                timeLeft.current
            );
            setCircleDasharray();
            setRemainingPathColor(timeLeft.current);
            getCompletion(getPercentTimeCompletion())
            if (timeLeft.current === 0) {
                resetState()
            }
        }, 1000);
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    }

    function setRemainingPathColor(timeLeft) {
        console.log('setting timer color')
        const { alert, warning, info } = COLOR_CODES;
        console.log(timeLeft, 'timeLeft')
        console.log(alert.threshold, 'alert.threshold')
        console.log(warning.threshold, 'warning.threshold')
        if (timeLeft <= alert.threshold) {
            console.log('this')
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(warning.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(alert.color);
        } else if (timeLeft <= warning.threshold) {
            console.log('that')
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(info.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(warning.color);
        } else {
            console.log('reset color')
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(info.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.remove(alert.color);
            document
                .getElementById("base-timer-path-remaining")
                .classList.add(info.color);
        }
    }

    function calculateTimeFraction() {
        const rawTimeFraction = timeLeft.current / TIME_LIMIT;
        return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    }

    function setCircleDasharray() {
        const circleDasharray = `${(
            calculateTimeFraction() * FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        document
            .getElementById("base-timer-path-remaining")
            .setAttribute("stroke-dasharray", circleDasharray);
    }

    return (
        <div className="base-timer">

            <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g className="base-timer__circle">
                    <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                    <path
                        id="base-timer-path-remaining"
                        strokeDasharray="283"
                        className="base-timer__path-remaining ${remainingPathColor}"
                        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
                    ></path>
                </g>
            </svg>
            <span id="base-timer-label" className="base-timer__label">{formatTime(
                timeLeft.current
            )}</span>
        </div>
    )
}


