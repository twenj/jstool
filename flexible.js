/**
 * 移动端屏幕适配
 */
(function() {
  'use strict';
  const docEl = document.documentElement;
  let dpr = window.devicePixelRatio || 1;
  let viewportEl = document.querySelector('meta[name="viewport"]');
  const maxWidth = 540;
  const minWidth = 320;

  dpr = (dpr >= 3) ? 3 : ((dpr >= 2) ? 2 : 1);

  docEl.setAttribute('data-dpr', dpr);
  docEl.setAttribute('max-width', maxWidth);
  docEl.setAttribute('min-width', minWidth);

  const scale = 1 / dpr;
  const content = 'width=device-width, initial-scale=' + scale + ', user-scalable=no, maximum-scale=' + scale + ', minimum-scale=' + scale;

  if (viewportEl) {
    viewportEl.setAttribute('content', content);
  } else {
    viewportEl = document.createElement('meta');
    viewportEl.setAttribute('name', 'viewport');
    viewportEl.setAttribute('content', content);
    document.head.appendChild(viewportEl);
  }

  setRemUnit();
  window.addEventListener('resize', setRemUnit);
  function setRemUnit() {
    const ratio = 18.75;
    let viewWidth = docEl.getBoundingClientRect().width || window.innerWidth;
    console.log(viewWidth);
    if (minWidth && (viewWidth / dpr  < minWidth)) {
      viewWidth = minWidth * dpr;
    } else if (maxWidth && (viewWidth / dpr > maxWidth)) {
      viewWidth = maxWidth * dpr;
    }
    docEl.style.fontSize = viewWidth / ratio + 'px';
  }
})();