import React, { Component } from 'react';
import { connect } from 'dva';

class Index extends Component {
    constructor() {
        super(...arguments);
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'shi_pin/getAllVideo'
        })
    }
    render() {
        return (
            <>
                <p style={{ textAlign: 'center' }}>视频</p>
            </>
        );
    }
}

export default connect()(Index);