import React, { Component } from 'react';
import { Table, Tooltip } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

class Index extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            dataSource: [],
            playlist: {},
            toggleClass: null,
            descriptionClass: null
        }
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'fa_xian_yin_yue/getListDetail',
            payload: this.props.playListId
        }).then(res => {
            if (res && res.code == 200) {
                let { name, tags, coverImgUrl, description, playCount, trackIds } = res.playlist;
                description = ' 简介：' + description.replace('\n', '').replace(/\n/g, "<br>");
                this.setState({
                    playlist: {
                        name,
                        coverImgUrl,
                        tags: tags.join(' / '),
                        description,
                        playCount: parseInt(playCount/10000)+'万',
                        songCount: trackIds.length || 0
                    }
                })
                const ids = trackIds.map(item => item.id);
                if(ids.length < 1) return;
                return this.props.dispatch({
                    type: 'fa_xian_yin_yue/getSongDetail',
                    payload: ids.join(',')
                })
            }
        }).then(res => {
            if (res && res.code == 200 && res.songs.length > 0) {
                const dataSource = res.songs.map(item => ({
                    id: item.id,
                    name: item.name,
                    singer: item.ar.map(item => item.name).join('/'),
                    album: item.al.name
                }))
                this.setState({
                    dataSource
                })
            }
        })
    }
    handleToggle = () => {
        const { toggleClass, descriptionClass } = this.state;
        this.setState({
            toggleClass: toggleClass == null ? styles.toggle_active : null,
            descriptionClass: descriptionClass == null ? styles.description_active : null
        })
    }
    render() {
        const columns = [
            {
                title: '',
                align: 'right',
                width: 60,
                render: (text, record, index) => (index + 1) < 10 ? '0' + (index + 1) : (index + 1),
            },
            {
                title: '操作',
                dataIndex: 'tools',
                width: 80,
                render: () => {
                    return(
                        <>
                            <Tooltip title='喜欢'>
                                <i className='icon iconfont icon-xin' style={{ marginRight: '10px' }}></i>
                            </Tooltip>
                            <Tooltip title='下载'>
                                <i className='icon iconfont icon-xiazai'></i>
                            </Tooltip>
                        </>
                    )
                }
            },
            {
                title: '音乐标题',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '歌手',
                dataIndex: 'singer',
                key: 'singer',
            },
            {
                title: '专辑',
                dataIndex: 'album',
                key: 'album',
            },
            // {
            //     title: '时长',
            //     dataIndex: 'time',
            //     key: 'time',
            // },
        ];
        const { dataSource, playlist, toggleClass, descriptionClass } = this.state;
        const tableConfig = {
            dataSource,
            columns,
            rowKey: 'id',
            pagination: false
        }
        return (
            <>
                <div className={styles.list_detail}>
                    <div className={styles.left}>
                        <img src={playlist.coverImgUrl} />
                    </div>
                    <div className={styles.middle}>
                        <h2>{playlist.name}</h2>
                        <div>
                            标签：<span>{playlist.tags}</span>
                        </div>
                        <div className={`${styles.description} ${descriptionClass}`} dangerouslySetInnerHTML={{ __html: playlist.description }}>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <span>
                            歌曲数<br/>
                            {playlist.songCount}
                        </span>
                        <span>
                            播放数<br />
                            {playlist.playCount}
                        </span>
                        <span className={`${styles.toggle} ${toggleClass}`} onClick={this.handleToggle}><i className='icon iconfont icon-shangyiye'></i></span>
                    </div>
                </div>
                <div className='music-list'>
                    {dataSource.length > 0 && <Table {...tableConfig} />}
                </div>   
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        playListId: state.fa_xian_yin_yue.playListId
    }
}

export default connect(mapStateToProps)(Index);