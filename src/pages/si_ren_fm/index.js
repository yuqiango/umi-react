import React, { Component } from 'react';
import { connect } from 'dva';

class Index extends Component {
    constructor() {
        super(...arguments);
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'si_ren_fm/getPersonalFm'
        })
    }
    render() {
        return (
            <>
                <p style={{ textAlign: 'center' }}>私人FM</p>
            </>
        );
    }
}

export default connect()(Index);