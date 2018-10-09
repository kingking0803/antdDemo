import request from '../utils/request';
import { message } from 'antd';
import * as registerService from '../services/register';

const delay = (millisecond) => {
    return new Promise((resolve) => {
        setTimeout(resolve, millisecond);
    });
};

export default {
    namespace: 'register',
    state: {
        data: [],
    },
    effects: {
        *queryList({ _ }, { call, put }) {
            // yield call(delay, 3000);
            const rsp = yield call(registerService.queryList);
            yield put({ type: 'saveList', payload: { data: rsp.result } });
        },
        *addOne({ payload }, { call, put }) {
            // yield call(delay, 3000);
            try {
                const rsp = yield call(registerService.addOne, payload);
                yield put({ type: 'queryList' });
                message.success('查阅单保存成功');
            } catch (e) {
                message.error('查阅单保存失败');
            }
        }
    },
    reducers: {
        saveList(state, { payload: { data } }) {
            return {
                ...state,
                data,
            }
        },
    }
}