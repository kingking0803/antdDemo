import { parse } from 'qs';

export function getPageQuery() {
    return parse(window.location.href.split('?')[1]);
}

//发布之后的域名
export function isAntdPro() {
    return window.location.hostname === 'preview.pro.ant.design';
}