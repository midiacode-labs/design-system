/* Colour cards: shows the hex under each swatch and copies it on click. */
(function () {
  var css = document.createElement('style');
  css.textContent =
    '.sw{display:flex;flex-direction:column;gap:6px;min-width:0}' +
    '.sw .swatch{cursor:pointer;transition:transform .12s}' +
    '.sw .swatch:hover{transform:translateY(-1px)}' +
    '.sw .hex{font-family:var(--font-mono);font-size:11px;color:var(--color-text-secondary);text-align:center;user-select:all}' +
    '.sw .hex.copied{color:var(--color-primary);font-weight:500}';
  document.head.appendChild(css);

  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (ok, fail) {
      var t = document.createElement('textarea');
      t.value = text; t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select();
      try { document.execCommand('copy') ? ok() : fail(); } catch (e) { fail(e); }
      document.body.removeChild(t);
    });
  }

  document.querySelectorAll('.swatch').forEach(function (el) {
    var bg = el.style.background || el.style.backgroundColor;
    var m = (el.getAttribute('style') || '').match(/background:\s*(#[0-9a-fA-F]{3,8})/);
    if (!m) return;
    var hex = m[1].toUpperCase();

    // drop the hex that used to live inside the swatch
    Array.prototype.slice.call(el.children).forEach(function (c) {
      if (!c.classList.contains('name') && c.textContent.trim().toUpperCase() === hex) el.removeChild(c);
    });

    var wrap = document.createElement('div'); wrap.className = 'sw';
    var cap = document.createElement('div'); cap.className = 'hex'; cap.textContent = hex;
    el.parentNode.insertBefore(wrap, el);
    wrap.appendChild(el); wrap.appendChild(cap);
    el.title = 'Click to copy ' + hex;

    el.addEventListener('click', function () {
      copy(hex).then(function () {
        cap.textContent = 'Copied!'; cap.classList.add('copied');
        setTimeout(function () { cap.textContent = hex; cap.classList.remove('copied'); }, 1200);
      });
    });
  });
})();
