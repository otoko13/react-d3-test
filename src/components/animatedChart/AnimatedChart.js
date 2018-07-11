import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { select } from 'd3-selection';
import 'd3-transition';

import './AnimatedChart.css';

class AnimatedChart extends Component {

    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.update(this.props.dataset);
    }

    shouldComponentUpdate(nextProps) {
        this.update(nextProps.dataset);
        return false;
    }

    update(dataset) {
        const selection = select('#bars')
            .selectAll('.bar')
            .data(dataset, d => d.id);

        selection.transition()
            .style('height', d => `${d.val.toString()}px`)
            .style('left', (d, i) => `${i * 50}px`)
            .duration(1000);

        selection.enter()
            .append('div')
            .attr('class', 'bar')
            .attr('data-id', d => d.id)
            .on('click', (d) => {
                this.props.onClick(d.id);
            })
            .style('left', (d, i) => `${i * 50}px`)
            .transition()
            .style('height', d => `${d.val.toString()}px`)
            .duration(2000);

        selection.exit().remove();
    }

    render() {
        return (
            <div id='AnimatedChart'>
                <div id='bars' />
            </div>
        );
    }
}
AnimatedChart.propTypes = {
    dataset: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    maxHeight: PropTypes.number.isRequired,
};

export default AnimatedChart;
