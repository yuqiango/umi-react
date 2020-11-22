import { getPlayList, getListDetail, getSongDetail } from  '../services';
export default {
    namespace: 'fa_xian_yin_yue',
    state: {
        playList: [],
        playListId: ''
    },
    reducers: {
        saveState(state, { payload: data }) {
            return {...state, ...data}
        }
    },
    effects: {
        * getPlayList({ payload: limit }, { call, put }) {
            try {
                const res = yield call(getPlayList, { limit });
                yield put({
                    type: 'saveState',
                    payload: {
                        playList: res.data,
                    }
                })
                return res;
            } catch (error) {
                console.log(error);
            }
        },
        * getListDetail({ payload: id }, { call, put }) {
            try {
                const res = yield call(getListDetail, { id });
                return res;
            } catch (error) {
                console.log(error);
            }
        },
        * getSongDetail({ payload: ids }, { call, put }) {
            try {
                const res = yield call(getSongDetail, { ids });
                return res;
            } catch (error) {
                console.log(error);
            }
        }
    }
}