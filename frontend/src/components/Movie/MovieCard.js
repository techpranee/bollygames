import React from 'react'

export default function MovieCard({ movie }) {
    console.log(movie)
    return (
        <div>{movie.title}</div>
    )
}
