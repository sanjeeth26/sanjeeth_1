// Visit and click tracking with Google Analytics 4.
// Turn it on by adding VITE_GA_ID (your "G-XXXXXXX" measurement ID) in Vercel:
// Project → Settings → Environment Variables, then redeploy. Without it, nothing is sent.
const GA_ID = import.meta.env.VITE_GA_ID;

export function track(name, params = {}) {
  if (typeof window.gtag === 'function') window.gtag('event', name, params);
}

export function initTracking() {
  if (GA_ID && /^G-[A-Z0-9]+$/.test(GA_ID)) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  // One listener for every click on the page
  document.addEventListener('click', e => {
    const a = e.target.closest('a, button');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    const where = a.closest('section, header, footer, nav, .rbar')?.id || a.closest('.rbar') && 'sticky-bar' || 'page';
    const intent = a.dataset.intent || 'general';
    if (/\.pdf$/i.test(href)) track('cv_download', { where });
    else if (href.startsWith('mailto:')) track('contact_click', { method: 'email', where, intent });
    else if (href.startsWith('tel:')) track('contact_click', { method: 'phone', where });
    else if (href.includes('wa.me/')) track('contact_click', { method: 'whatsapp', where, intent });
    else if (href.includes('linkedin.com')) track('contact_click', { method: 'linkedin', where });
    else if (href.includes('drive.google.com')) track('drive_open', { where });
    else if (a.classList.contains('cr')) track('creative_open', { name: a.getAttribute('aria-label') || '' });
    else if (a.classList.contains('ox')) track('outdoor_photo_open', { name: a.getAttribute('aria-label') || '' });
    else if (a.classList.contains('copy')) track('contact_click', { method: 'copy', where });
  }, true);

  // Video plays (play events do not bubble, so listen while capturing)
  document.addEventListener('play', e => {
    if (e.target.tagName === 'VIDEO') track('video_play', { name: e.target.getAttribute('aria-label') || e.target.currentSrc });
  }, true);
}
