import React from 'react'
import Intro from '../../components/Intro/intro'
import Fab from '@mui/material/Fab';
import GamesIcon from '@mui/icons-material/GamesSharp';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'
export default function Home() {
    return (
        <>
            <Intro />
            <Box sx={{
                '& > :not(style)': { m: 1 }, "position": "absolute",
                "bottom": " 20px",
                "left": "45%"
            }}>
                <Link to="/games">
                    <Fab variant="extended">
                        <GamesIcon sx={{ mr: 1 }} />
                        Go to Games
                    </Fab>
                </Link>
            </Box>
        </>
    )
}
