(() => {
  'use strict';
  const cfg = window.OASIS_CONFIG || {};
  const safeUrl = value => {
    if (typeof value !== 'string' || !value.trim()) return '';
    const input = value.trim();
    try {
      const url = new URL(input, location.href);
      const local = !/^[a-z][a-z\d+.-]*:/i.test(input) && !input.startsWith('//');
      return url.protocol === 'https:' || (local && ['file:', 'http:'].includes(url.protocol)) ? input : '';
    } catch { return ''; }
  };
  document.querySelectorAll('[data-resource]').forEach(link => {
    const key = link.dataset.resource;
    const url = safeUrl((cfg.links || {})[key]);
    if (url) {
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.removeAttribute('aria-disabled');link.removeAttribute('tabindex');
      link.hidden = false;
      const label = link.querySelector('span');
      if (label && key !== 'paper') label.textContent = key === 'code' && cfg.codePrivate ? 'Private ↗' : key === 'video' ? 'YouTube ↗' : '↗';
    } else {
      link.removeAttribute('href');
      link.setAttribute('aria-disabled', 'true');
      link.setAttribute('tabindex', '-1');
    }
  });
  document.querySelectorAll('[data-author]').forEach(author => {
    const url = safeUrl((cfg.authorUrls || [])[Number(author.dataset.author)]);
    if (!url) return;
    const link = document.createElement('a');
    link.href = url;link.target = '_blank';link.rel = 'noopener noreferrer';
    while (author.firstChild) link.appendChild(author.firstChild);
    author.appendChild(link);
  });
  const dialog = document.getElementById('figure-dialog');
  const enlarged = document.getElementById('enlarged-figure');
  document.querySelectorAll('[data-enlarge]').forEach(button => {
    button.addEventListener('click', () => {
      if (typeof dialog.showModal !== 'function') {window.open(button.dataset.enlarge, '_blank', 'noopener');return;}
      enlarged.src = button.dataset.enlarge;
      enlarged.alt = button.querySelector('img')?.alt || 'OASIS research figure';
      document.getElementById('figure-dialog-title').textContent = button.closest('figure')?.querySelector('figcaption')?.textContent || 'Research figure';
      dialog.showModal();
    });
  });
  document.getElementById('close-figure').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {if (event.target === dialog) {const r=dialog.getBoundingClientRect();if(event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom)dialog.close();}});
  document.getElementById('copy-citation').addEventListener('click', async () => {
    const text = document.getElementById('bibtex').textContent;
    const button = document.getElementById('copy-citation');
    const status = document.getElementById('copy-status');
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
      else {
        const textarea = document.createElement('textarea');
        textarea.value = text;textarea.style.position='fixed';textarea.style.opacity='0';
        document.body.appendChild(textarea);textarea.select();
        const success = document.execCommand('copy');textarea.remove();
        if (!success) throw new Error('Clipboard unavailable');
      }
      button.textContent = 'Copied ✓';status.textContent = 'BibTeX copied to clipboard.';
      setTimeout(() => {button.textContent='Copy citation ⧉';},2500);
    } catch {status.textContent = 'Please select and copy the BibTeX text below.';}
  });
  if ('IntersectionObserver' in window) {
    const sections = ['overview','method','results','citation'].map(id=>document.getElementById(id));
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if(entry.isIntersecting) {
        document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('active',a.hash==='#'+entry.target.id));
      }
    },{rootMargin:'-10% 0px -55% 0px',threshold:0});
    sections.forEach(section=>observer.observe(section));
  }
})();
