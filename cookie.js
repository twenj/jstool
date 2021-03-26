/**
 * cookie 封装
 */
const set = (name, value, { maxAge, domain, path, secure } = {}) => {
  let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

  if (typeof maxAge === 'number') {
    cookieText += `; max-age=${maxAge}`;
  }
  if (domain) {
    cookieText += `; domain=${domain}`;
  }
  if (path) {
    cookieText += `; path=${path}`;
  }
  if (secure) {
    cookieText += '; secure';
  }

  document.cookie = cookieText;
}

const get = name => {
  name = `${encodeURIComponent(name)}`;
  const cookieText = document.cookie;
  const cookieArr = cookieText.split('; ');
  for (const item of cookieArr) {
    const [cookieName, cookieValue] = item.split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return;
}

const remove = (name, {domain, path} = {}) => {
  set(name, '', {domain, path, maxAge: -1});
}

export { set, get, remove }