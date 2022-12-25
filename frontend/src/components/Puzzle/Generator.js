import makeGrid from './puzzle'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
export default function Generator() {
    const [text, setText] = useState("")
    const [gridSize, setgridSize] = useState(12)
    const [puzzle, setpuzzle] = useState([])
    function splitWords() {
        console.log('generating puz with grid size :', gridSize)
        let words = text.split(" ")
        let { grid, solution } = makeGrid(words, gridSize);
        console.log(grid)
        setpuzzle(grid)
    }
    const Print = () => {
        //console.log('print');  
        let printContents = document.getElementById('printablediv').innerHTML;

        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        // document.getElementById('printablediv').style.margin = "100px auto";
        window.print();
        document.body.innerHTML = originalContents;
    }
    return (<div className="whiteback">
        <TextField fullWidth label="words for puzzle" id="fullWidth" value={text} onChange={(e) => setText(e.target.value)} sx={{ margin: 2 }} />
        <TextField
            id="outlined-number"
            label="Grid Size"
            type="number"
            value={gridSize}
            onChange={(e) => setgridSize(Number(e.target.value))}
            InputLabelProps={{
                shrink: true,
            }}
            sx={{ margin: 2 }}
        />
        <div>
            <Button variant="contained" onClick={splitWords} sx={{ margin: 2 }}>Generate a Puzzle</Button>
            <Button type="button" onClick={Print} > Print It !</Button>
        </div>

        <div id="printablediv" className="whiteback" >
            {puzzle.length > 0 && <>
                {puzzle.map((lineOfAlphabets, i) =>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        key={`${i}-line`}
                    >
                        <Line line={lineOfAlphabets} />
                    </Grid>
                )}

            </>
            }
        </div>
    </div>
    )
}



function Line({ line }) {
    console.log(line)
    return (<>
        {line.length > 0 && <>
            {line.map((item, i) => <span className='alphabet' key={`${i}-alp`}>{item}</span>)}
        </>
        }

    </>)
}
