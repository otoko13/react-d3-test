import React, { Component } from 'react';
import { Body, Sprite } from 'react-game-kit';
import PropTypes from 'prop-types';
import Matter from 'matter-js';

class GrignotteBody extends Component {

    constructor(props) {
        super(props);
        this.state = {
            characterState: 0,
        };
        this.updateBound = this.update.bind(this);
    }

    componentDidMount() {
        this.context.loop.subscribe(this.updateBound);
        Matter.Body.applyForce(this.body.body, {x: 0, y: 0}, {x: 100, y: 100})
    }

    componentWillUnmount() {
        this.context.loop.unsubscribe(this.updateBound);
    }

    update() {
        const currentPosition = this.body.body.position;
        // console.log(currentPosition);
    }

    render() {
        return (
            <Body args={[500, 0, 30, 175]}
                  shape='rectangle'
                  inertia={0}
                  density={1}
                  friction={1}
                  frictionAir={1}
                  frictionStatic={0}
                  restitution={0.7}
                  collisionFilter={
                      {
                          group: 1,
                      }
                  }
                  ref={(b) => { this.body = b }} >
                <Sprite
                    repeat={true}
                    tileWidth={300}
                    tileHeight={175}
                    // onPlayStateChanged={this.handlePlayStateChanged}
                    src="images/cat_spritesheet.png"
                    scale={this.context.scale * 1}
                    state={this.state.characterState}
                    steps={[5]} />
            </Body>
        );
    }
}

GrignotteBody.contextTypes = {
    engine: PropTypes.object,
    loop: PropTypes.object,
};

GrignotteBody.propTypes = {
    stageWidth: PropTypes.number,
    stageHeight: PropTypes.number,
};

export default GrignotteBody;
