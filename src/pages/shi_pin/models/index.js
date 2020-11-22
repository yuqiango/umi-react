import { getAllVideo } from  '../services';
export default {
    namespace: 'shi_pin',
    state: {
        playList: []
    },
    reducers: {
        saveState(state, { payload: data }) {
            return {...state, ...data}
        }
    },
    effects: {
        * getAllVideo(_, { call, put }) {
            try {
                const res = yield call(getAllVideo);
                return res;
            } catch (error) {
                console.log(error);
            }
        }
    }
}