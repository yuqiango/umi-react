
const api = {
    '/api/userInfo': {
        status: 200,
        msg: 'success',
        data: {
            sysMenu: [
                {
                    id: 1,
                    title: '推荐',
                    children: [
                        {
                            id: 11,
                            title: '发现音乐',
                            icon: 'icon-yinle',
                            path: 'fa_xian_yin_yue'
                        },
                        {
                            id: 12,
                            title: '私人FM',
                            icon: 'icon-icon-test',
                            path: 'si_ren_fm'
                        },
                        {
                            id: 13,
                            title: 'LOOK直播',
                            icon: 'icon-zhibo1',
                            path: 'look_zhibo'
                        },
                        {
                            id: 14,
                            title: '视频',
                            icon: 'icon-18',
                            path: 'shi_pin'
                        },
                        {
                            id: 15,
                            title: '朋友',
                            icon: 'icon-pengyou',
                            path: 'peng_you'
                        },
                    ]
                },
                {
                    id: 2,
                    title: '我的音乐',
                    children: [
                        {
                            id: 21,
                            title: '本地音乐',
                            icon: 'icon-icon-test1',
                            path: 'ben_di_yin_yue'
                        },
                        {
                            id: 22,
                            title: '下载管理',
                            icon: 'icon-xiazai',
                            path: 'xia_zai_guan_li'
                        },
                    ]
                },
                {
                    id: 3,
                    title: '创建的歌单',
                    children: [
                        {
                            id: 31,
                            title: '我喜欢的音乐',
                            icon: 'icon-xin',
                            path: 'wo_xi_huan_de_yin_yue'
                        },
                    ]
                }
            ]
        }
    },
    '/api/login': {
        status: 200,
        msg: 'success',
        data: {
            token: 'kkkkkk'
        }
    }
}

export default api;