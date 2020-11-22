import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import Card from '@/components/card';
import { history } from 'umi';

class Index extends Component {
    constructor() {
        super(...arguments)
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'fa_xian_yin_yue/getPlayList',
        })
    }
    handleClick = (id) => {
        this.props.dispatch({
            type: 'fa_xian_yin_yue/saveState',
            payload: {
                playListId: id
            }
        })
        history.push('/fa_xian_yin_yue/playList?id=' + id);
    }
    render() {
        const { playList } = this.props;
        return(
            <>
                <div className={styles.listBox}>
                        {
                            playList.map(item =>
                                <Card
                                    key={item.id}
                                    title={item.name}
                                    img={item.picUrl}
                                    className={styles.list}
                                    tip={<><i className={`icon iconfont icon-erji`}></i> {parseInt(item.playCount / 10000)} 万</>}
                                    mark={item.copywriter}
                                    onClick={() => { this.handleClick(item.id) }}
                                />
                            )
                    }
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    playList: state.fa_xian_yin_yue.playList,
}); 

export default connect(mapStateToProps)(Index);