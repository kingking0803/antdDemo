import request from '../utils/request';

export async function queryList() {
    return request('/api/register/list');
}

export async function addOne(data) {
    return request('/api/register/add', {
        method: 'POST',
        body: data,
    });
}