// 默认参数
import DEFAULTS from './defaults.js';
// 工具函数
import { serialize, serializeJSON, addURLData } from './utils.js'
// 常量
import { HTTP_GET, CONTENT_TYPE_FORM_URLENCODED, CONTENT_TYPE_JSON } from './constants.js';

class Ajax {
  constructor(url, options) {
    this.url = url;
    this.options = Object.assign({}, DEFAULTS, options);

    this.init();
  }
  init() {
    const xhr = new XMLHttpRequest();
    this.xhr = xhr;

    // 绑定响应事件处理程序
    this.bindEvent();

    xhr.open(this.options.method, this.url + this.addParam(), true);

    // 设置 responseType
    this.setResponseType();

    // 设置跨域是否携带 cookie
    this.setCookie();

    // 设置超时
    this.setTimeout();

    // 发送请求
    this.sendData();
  }

  // 绑定响应事件处理程序
  bindEvent() {
    const xhr = this.xhr;
    const {success, httpCodeError, error, abort, timeout} = this.options

    // load
    xhr.addEventListener('load', () => {
      if (this.ok()) {
        success(xhr.response, xhr);
      } else {
        httpCodeError(xhr.status, xhr);
      }
    }, false);
    
    // error
    xhr.addEventListener('error', () => {
      error(xhr);
    }, false)

    // abort
    xhr.addEventListener('abort', () => {
      abort(xhr);
    }, false)

    // timeout
    xhr.addEventListener('timeout', () => {
      timeout(xhr);
    }, false)
  }

  ok() {
    const xhr = this.xhr;
    return (xhr.status >= 200 && xhr.status < 300) || xhr.status === 403;
  }

  // 在地址上添加数据
  addParam() {
    const {params} = this.options;
    if (!params) return '';

    return addURLData(this.url, serialize(params));
  }
  // 设置 responseType
  setResponseType() {
    this.xhr.responseType = this.options.responseType;
  }

  // 设置跨域是否携带 Cookie
  setCookie() {
    if (this.options.withCredentials) {
      this.xhr.withCredentials = true;
    }
  }

  // 设置超时
  setTimeout() {
    if (this.options.timeoutTime > 0) {
      this.xhr.timeout = this.options.timeoutTime;
    }
  }
  // 发送请求
  sendData() {
    const xhr = this.xhr;
    if (!this.isSendData()) {
      return xhr.send(null);
    }

    let resultData = null;
    const data = this.options.data;

    // 是否发送 FormData 格式的数据
    if (this.isFormData()) {
      resultData = data;
    } else if (this.isFormURLEncodedData()) {
      this.setContentType();
      // 是否发送 application/x-www-form-urlencoded 格式的数据
      resultData = serialize(data);
    } else if (this.isJSONData()) {
      this.setContentType();
      resultData = serializeJSON(data);
    } else {
      this.setContentType();
      resultData = data;
    }

    xhr.send(resultData);
  }
  // 是否需要使用 send 发送数据
  isSendData() {
    const { data, method } = this.options;

    if (!data) return false;

    if (method.toLowerCase() === HTTP_GET.toLowerCase()) return false;

    return true;
  }
  // 是否发送 FormData 格式的数据
  isFormData() {
    return this.options.data instanceof FormData;
  }
  // 是否发送 application/x-www-form-urlencoded 格式的数据
  isFormURLEncodedData() {
    return this.options.contentType.toLowerCase().includes(CONTENT_TYPE_FORM_URLENCODED);
  }
  // 是否发送 application/json 格式的数据
  isJSONData() {
    return this.options.contentType.toLowerCase().includes(CONTENT_TYPE_JSON);
  }

  // 设置 Content-Type
  setContentType() {
    if (!this.options.contentType) return;
    this.xhr.setRequestHeader('Content-Type', this.options.contentType);
  }

  // 获取 XHR 对象
  getXHR() {
    return this.xhr;
  }
}

export default Ajax;