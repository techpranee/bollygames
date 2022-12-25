var makeGrid = require('./wsg')


const print = (grid) => {
    for (let row of grid) {
        console.log(row.map((item) => (item ? item : "_")).join(" "));
    }
    console.log();
};

const words = ["DOCTOR", "GARU", "NEXT", "CLUE", "TIAGO", "LOPALA", "UNDI"];
const { grid, solution } = makeGrid(words, 15);

// console.log(solution);
print(grid);