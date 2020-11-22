import request from '@/utils/request';
import { MUSIC_BASE_PATH } from  '../../../config/project';

// 获取推荐歌单
export function getPlayList(params) {
    return request({
        url: MUSIC_BASE_PATH + 'personalized',
        method: 'GET',
        params
    });
}

// 获取歌单详情
export function getListDetail(params) {
    return request({
        url: MUSIC_BASE_PATH + '/playlist/detail',
        method: 'GET',
        params
    });
}

// 获取歌曲详情
export function getSongDetail(params) {
    return request({
        url: MUSIC_BASE_PATH + '/song/detail',
        method: 'GET',
        params
    });
}