import { history } from 'umi';
export default {
    namespace: 'account',
    state: {
        menuTagList: []
    },
    reducers: {
        // 保存menuTag
        saveMenuTag(state, { payload: menu }) {
            if(state.menuTagList.filter(item => item.id == menu.id).length > 0) return;
            const menuTagList = [...state.menuTagList, menu];
            return { ...state, menuTagList };
        },

        // 移除menuTag
        delMenuTag(state, { payload: menu }) {
            if (state.menuTagList.length == 1) return;
            const menuTagList = [...state.menuTagList].filter(item => item.id !== menu.id);
            history.push(menuTagList[menuTagList.length - 1].path);
            return { ...state, menuTagList };
        }
    },
}