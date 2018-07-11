
import React, { Component } from 'react';
import { Loop, Stage, KeyListener } from 'react-game-kit';
import PropTypes from 'prop-types';

import GrignotteWorld from './GrignotteWorld';
import FlatBackground from './FlatBackground';
import GameConstants from "./GameConstants";

import './GrignotteGame.css';

class GrignotteGame extends Component{
    constructor(props) {
        super(props);
        this.keyListener = new KeyListener();
    }

    componentDidMount() {
        this.keyListener.subscribe([
            this.keyListener.LEFT,
            this.keyListener.RIGHT,
            this.keyListener.UP,
            this.keyListener.SPACE,
            65,
        ]);
    }

    componentWillUnmount() {
        this.keyListener.unsubscribe();
    }

    render() {
        return (
            <div className="GrignotteGame">
                <FlatBackground/>
                <Loop>
                    <Stage width={GameConstants.STAGE.WIDTH}
                           height={GameConstants.STAGE.HEIGHT}
                           style={{transform: 'translate(0, 0)'}}>
                        <GrignotteWorld width={GameConstants.STAGE.WIDTH}
                                        height={GameConstants.STAGE.HEIGHT}
                                        keys={this.keyListener}/>
                    </Stage>
                </Loop>
            </div>
        );
    }
}


GrignotteGame.propTypes = {
    stageDimensions: PropTypes.object,
    onSelectAnswer: PropTypes.func,
};

export default GrignotteGame;
