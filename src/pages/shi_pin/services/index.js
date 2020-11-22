import request from '@/utils/request';
import { MUSIC_BASE_PATH } from  '../../../config/project';

export function getAllVideo(params) {
    return request({
        url: MUSIC_BASE_PATH + 'video/timeline/recommend',
        method: 'GET',
        params
    });
}