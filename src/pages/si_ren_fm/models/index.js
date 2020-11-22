import { getPersonalFm } from  '../services';
export default {
    namespace: 'si_ren_fm',
    state: {
        playList: []
    },
    reducers: {
        saveState(state, { payload: data }) {
            return {...state, ...data}
        }
    },
    effects: {
        * getPersonalFm(_, { call, put }) {
            try {
                const res = yield call(getPersonalFm);
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
        }
    }
}