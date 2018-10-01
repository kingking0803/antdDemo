import request from '../utils/request';

export function queryList() {
    return request('/api/register/list');
}

export function addOne(data) {
    return request('/api/register/add', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
    });
}