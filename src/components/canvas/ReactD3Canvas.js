import React, { Component } from 'react';
import _ from 'lodash';

import './ReactD3Canvas.css';
import AnimatedChart from "../animatedChart/AnimatedChart";

class ReactD3Canvas extends Component {

    static maxVal = 500;

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {id: 0, val: 220},
                {id: 1, val: 100},
                {id: 2, val: 300},
                {id: 3, val: 50},
            ],
        };
        this.randomiseData = this.randomiseData.bind(this);
        this.removeData = this.removeData.bind(this);
        this.addData = this.addData.bind(this);
    }

    removeData(id) {
        this.setState((prevState) => {
            const dataCopy = _.clone(prevState.data);
            _.remove(dataCopy, d => d.id === id);
            return {
                data: dataCopy,
            };
        });
    }

    static getRandomValue() {
        return Math.floor(Math.random() * ReactD3Canvas.maxVal);
    }

    addData() {
        this.setState((prevState) => {
            const dataCopy = _.clone(prevState.data);
            dataCopy.push({
                id: dataCopy[dataCopy.length - 1].id + 1,
                val: ReactD3Canvas.getRandomValue(),
            });
            return {
                data: dataCopy,
            };
        });
    }

    randomiseData() {
        this.setState((prevState) => {
             return {
                 data: _.clone(prevState.data).map(d => ({id: d.id, val: ReactD3Canvas.getRandomValue()})),
             };
        });
    }

    render() {
        return (
            <div className="ReactD3Canvas">
                {/*<BarChart data={[5,10,1,3]} size={[500,500]} />*/}
                <AnimatedChart dataset={this.state.data} onClick={this.removeData} maxHeight={ReactD3Canvas.maxVal} />
                <div className="buttons">
                    <button onClick={this.randomiseData}>Randomise Values</button>
                    <button onClick={this.addData}>Add data</button>
                </div>
            </div>
        );
    }
}

export default ReactD3Canvas;
