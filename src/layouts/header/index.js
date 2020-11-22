import React, { Component } from 'react';
import styles from './index.less';
import { Tooltip } from 'antd';
import { history } from 'umi';

class Index extends Component {
    constructor() {
        super(...arguments);
    }

    componentDidMount() {

    }
    goBack = () => {
        history.goBack();
    }
    goAhead = () => {
        history.goForward();
    }
    render() {
        return(
            <div className={styles.container}>
                <div className={styles.left}>
                    网易云音乐
                </div>
                <div className={styles.middle}>
                    <Tooltip title='后退'>
                        <span onClick={this.goBack}>
                            <i className='icon iconfont icon-shangyiye'></i>
                        </span>
                    </Tooltip>
                    <Tooltip title='前进'>
                        <span onClick={this.goAhead}>
                            <i className='icon iconfont icon-xiayiye'></i>
                        </span>
                    </Tooltip>
                </div>
                <div className={styles.right}>
                </div>
            </div>
        )
    }
}

export default Index;