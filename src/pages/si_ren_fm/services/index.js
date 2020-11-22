import request from '@/utils/request';
import { MUSIC_BASE_PATH } from  '../../../config/project';

export function getPersonalFm(params) {
    return request({
        url: MUSIC_BASE_PATH + '/personal_fm',
        method: 'GET',
        params
    });
}