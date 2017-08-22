'use strict';

/**
 * @param {Number} [baseFontSize = 100] - 鍩虹fontSize, 榛樿100px;
 * @param {Number} [fontscale = 1] - 鏈夌殑涓氬姟甯屾湜鑳芥斁澶т竴瀹氭瘮渚嬬殑瀛椾綋;
 */
const win = window;
export default win.flex = (baseFontSize, fontscale) => {
  const _baseFontSize = baseFontSize || 100;
  const _fontscale = fontscale || 1;

  const doc = win.document;
  const ua = navigator.userAgent;
  const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
  const UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
  const isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
  const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
  let dpr = win.devicePixelRatio || 1;
  if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
    // 濡傛灉闈瀒OS, 闈濧ndroid4.3浠ヤ笂, 闈濽C鍐呮牳, 灏变笉鎵ц楂樻竻, dpr璁句负1;
    dpr = 1;
  }
  const scale = 1 / dpr;

  let metaEl = doc.querySelector('meta[name="viewport"]');
  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    doc.head.appendChild(metaEl);
  }
  metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`);
  doc.documentElement.style.fontSize = `${_baseFontSize / 2 * dpr * _fontscale}px`;
};

// 寮€濮嬭缃紝鍙互鏍规嵁涓氬姟闇€姹備慨鏀瑰弬鏁�
flex(100, 1);