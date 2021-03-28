// 工具函数

// 数据序列化成 urlencoded 格式的字符串
const serialize = param => {
  const results = [];

  for (const [key, value] of Object.entries(param)) {
    results.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  }

  return results.join('&');
}

// 数据序列化成 JSON 格式的字符串
const serializeJSON = param => {
  return JSON.stringify(param);
}

const addURLData = (url, data) => {
  if (!data) return '';

  const mark = url.includes('?') ? '&': '?';

  return `${mark}${data}`;
}

export {serialize, serializeJSON, addURLData};