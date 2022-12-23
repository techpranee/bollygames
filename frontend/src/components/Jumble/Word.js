import React from 'react'


export default function Word({ word }) {
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
    function scramble(s) {
        let a = s.split("")
        // console.log(a, 'a')
        let shuffled = shuffle(shuffle(a));
        return shuffled;
    }
    return (
        <div>{scramble(word).map((a, i) => <Alphabet a={a.toLowerCase()} key={`alpha-${i}`} />)}</div>
    )
}

function Alphabet({ a }) {
    return (
        <div className="slot">
            <section>
                <div className="container">
                    <div >
                        <span>{a}</span>
                    </div>
                </div>
            </section>
        </div>
    )
}
