// import fetch from 'dva/fetch';
require("dva").fetch;
import qs from "qs";
const BASE_URL = "/";
const DEFAULT_HEADERS = {
    'X-Request-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'token':'',	
};
const SUCCESS_CODE = 200;

/**
 * 封装http请求
 * @param {object} options - 请求配置参数
 * @param {string} options.url - 接口地址
 * @param {string} options.method - 请求类型
 * @param {Object} options.headers - 请求头
 * @param {Object} options.params - url参数
 * @param {Object} options.data - 请求体参数
 * @param {Object} options.processData - 是否处理数据
 */
export default function request({ url, method, headers, params, data, processData = true, isBaseUrl=true }) {
    if(isBaseUrl)
        url = BASE_URL + url;
    if (!params) {
        params = {};
    }
    params._t = new Date().getTime();
    if (url.indexOf('?') === -1) {
        url += '?' + qs.stringify(params);
    } else {
        url += '&' + qs.stringify(params);
    }
    let jwt = window.localStorage.getItem('token');
    if (jwt) {
        DEFAULT_HEADERS['token'] = jwt; 
        DEFAULT_HEADERS['Authentication'] = "Bearer " + jwt;
    }

    headers = { ...DEFAULT_HEADERS, ...headers };

    let options = { method, headers };
    if (data) {
        if (!processData) {
            options.body = data;
        } else {
            options.body = JSON.stringify(data);
        }
    }
    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(response => {
                let jwt = response.headers.get('token');
                if (jwt) {
                    window.localStorage.setItem('token', jwt);
                }
                response.json().then(ret => {
                    let code = Number(ret.code)
                    if (code === SUCCESS_CODE) {
                        ret.result ? resolve({ status: code, data: ret.result }) : resolve(ret);
                    } else {
                        reject(ret);
                    }
                }, error => {
                    reject({ status: response.status, describe: response.statusText, message: error.msg });
                });
            })
            .catch(err => {
                reject(err);
            })
    });
}
