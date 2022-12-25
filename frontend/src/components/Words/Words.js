import React, { createRef, Component } from 'react'
import './words.css'
import Timer from '../Timer/index';
class Words extends Component {
    static defaultProps = {
        vowels: ['A', 'E', 'I', 'O', 'U'],
        consonants: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
            'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X',
            'Y', 'Z']
    };

    constructor(props) {
        super(props);
        this.state = { v1: "?", v2: "?", c1: "?", c2: "?", c3: "?", c4: "?", c5: "?", rolling: false, timer: false };
        // get ref of dic onn which elements will roll
        this.slotRef = [createRef(), createRef(), createRef(), createRef(), createRef(), createRef(), createRef()];
    }

    // to trigger roolling and maintain state
    roll = () => {
        this.setState({
            rolling: true,
            timer: true
        });
        // looping through all 3 slots to start rolling
        this.slotRef.forEach((slot, i) => {
            // this will trigger rolling effect
            const selected = i < 2 ? this.triggerVowelSlotRotation(slot.current) : this.triggerConsonantSlotRotation(slot.current);
            this.setState({ [`fruit${i + 1}`]: selected });
        });
    };

    timeup = () => {
        this.setState({ rolling: false, timer: false });
    }
    // this will create a rolling effect and return random selected option
    triggerVowelSlotRotation = ref => {
        function setTop(top) {
            ref.style.top = `${top}px`;
        }
        let options = ref.children;
        let randomOption = Math.floor(
            Math.random() * Words.defaultProps.vowels.length
        );
        let choosenOption = options[randomOption];
        setTop(-choosenOption.offsetTop + 2);
        return Words.defaultProps.vowels[randomOption];
    };
    triggerConsonantSlotRotation = ref => {
        function setTop(top) {
            ref.style.top = `${top}px`;
        }
        let options = ref.children;
        let randomOption = Math.floor(
            Math.random() * Words.defaultProps.consonants.length
        );
        let choosenOption = options[randomOption];
        setTop(-choosenOption.offsetTop + 2);
        return Words.defaultProps.consonants[randomOption];
    };

    render() {
        return (
            <div className="SlotMachine">
                <div className="slot">
                    <section>
                        <div className="container" ref={this.slotRef[0]}>
                            {Words.defaultProps.vowels.map((v, i) => (
                                <div key={i}>
                                    <span>{v}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                <div className="slot">
                    <section>
                        <div className="container" ref={this.slotRef[1]}>
                            {Words.defaultProps.vowels.map((v, i) => (
                                <div key={i}>
                                    <span>{v}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                <div className="slot">
                    <section>
                        <div className="container" ref={this.slotRef[2]}>
                            {Words.defaultProps.consonants.map((v, i) => (
                                <div key={i}>
                                    <span>{v}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                <div className="slot">
                    <section>
                        <div className="container" ref={this.slotRef[3]}>
                            {Words.defaultProps.consonants.map((v, i) => (
                                <div key={i}>
                                    <span>{v}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                <div className="slot">
                    <section>
                        <div className="container" ref={this.slotRef[4]}>
                            {Words.defaultProps.consonants.map((v, i) => (
                                <div key={i}>
                                    <span>{v}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                <div className="slot">
                    <section>
                        <div className="container" ref={this.slotRef[5]}>
                            {Words.defaultProps.consonants.map((v, i) => (
                                <div key={i}>
                                    <span>{v}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                <div className="slot">
                    <section>
                        <div className="container" ref={this.slotRef[6]}>
                            {Words.defaultProps.consonants.map((v, i) => (
                                <div key={i}>
                                    <span>{v}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                <div
                    className={!this.state.rolling ? "roll rolling" : "roll"}
                    onClick={!this.state.rolling && this.roll}
                    disabled={this.state.rolling}
                >
                    {this.state.rolling ? "Waiting..." : "ROLL"}
                </div>
                <div style={{
                    textAlign: 'center', margin: 'auto', backgroundColor: '#fff', width: '500px',
                    borderRadius: '20px', marginTop: '20px'
                }}><Timer start={this.state.timer} duration={60} timeup={this.timeup} getCompletion={() => null} reset={false} /></div>

            </div>
        );
    }
}

export default Words