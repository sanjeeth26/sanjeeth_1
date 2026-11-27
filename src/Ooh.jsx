import React, { useState, useEffect } from 'react';
import './ooh.css';

// Outdoor (hoarding) campaign for Aalam Senior Living, laid out step by step:
// 1 creative -> 2 site plan -> 3 live on the road -> 4 proof of display.
const Pin = () => <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>;
const Brow = ({ children }) => <div className="eyebrow"><i><b/><b/></i>{children}</div>;

const DESIGNS = [
  { f:'ooh-design-landscape', t:'Landscape key visual', s:'For 15×8 ft and 35×20 ft boards', ar:1.87 },
  { f:'ooh-design-portrait', t:'Portrait adaptation', s:'For 20×25 ft boards', ar:0.8 },
  { f:'ooh-design-square', t:'Housewife-kkum Retirement', s:'Second campaign, same brand system', ar:1 },
];

const SITES = [
  { k:'Brooke Bond Road', a:'Coimbatore', size:'15×8 ft', fl:['Mar 2026','Jun 2026'] },
  { k:'Mettupalayam Road', a:'Narasimhanaickenpalayam', size:'20×25 ft', fl:['Jun 2026'] },
  { k:'Thadagam Road, KNG Pudur', a:'Towards Saibaba Colony', size:'35×20 ft', fl:['Mar 2026','Jun 2026'] },
  { k:'Perur Road', a:'Near Isha Yoga', size:'20×25 ft', fl:['Mar 2026'] },
];

const LIVE = [
  { f:'ooh-retirement-board', site:'Housewife-kkum Retirement board', size:'Portrait hoarding', d:'Retirement campaign', tall:true },
  { f:'ooh-thadagam-mar', site:'Thadagam Road, KNG Pudur', size:'35×20 ft', d:'13 Mar 2026' },
  { f:'ooh-perur-mar', site:'Perur Road, near Isha Yoga', size:'20×25 ft', d:'10 Mar 2026' },
  { f:'ooh-brookebond-jun', site:'Brooke Bond Road', size:'15×8 ft', d:'30 Jun 2026' },
  { f:'ooh-mtp-jun', site:'Mettupalayam Road', size:'20×25 ft', d:'30 Jun 2026' },
  { f:'ooh-thadagam-gps', site:'Thadagam Road, KNG Pudur', size:'35×20 ft', d:'30 Jun 2026', gps:true },
  { f:'ooh-mtp-gps', site:'Mettupalayam Road', size:'20×25 ft', d:'30 Jun 2026', gps:true },
];

const PROOF = [
  { f:'ooh-perur-proof', site:'Perur Road', d:'10 Mar 2026' },
  { f:'ooh-brookebond-proof', site:'Brooke Bond Road', d:'13 Mar 2026' },
  { f:'ooh-thadagam-proof', site:'Thadagam Road', d:'13 Mar 2026' },
  { f:'ooh-mtp-proof', site:'Mettupalayam Road', d:'30 Jun 2026' },
];

export default function Ooh() {
  const [lb, setLb] = useState(null);
  useEffect(() => {
    if (!lb) return;
    const k = e => { if (e.key === 'Escape') setLb(null); };
    addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    return () => { removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [lb]);
  const Img = ({ f, cap, alt, children, cls = '', style }) => (
    <button className={'ox ' + cls} style={style} onClick={() => setLb({ f, cap })} aria-label={'Open ' + alt}>
      <img src={'ooh/' + f + '.webp'} alt={alt} loading="lazy"/>{children}
    </button>
  );
  return (
    <section className="band ooh" id="outdoor"><div className="wrap">
      <div className="sh"><div><Brow>Outdoor campaign · Aalam Senior Living</Brow><h2>From artwork to <span className="g">on the road</span></h2></div>
        <p className="lede2">The hoarding campaign for Aalam Senior Living across Coimbatore, step by step: one key visual, four sites, two flights and dated proof for every board.</p></div>
      <div className="ostats"><span><b>4</b> hoarding sites</span><span><b>3</b> board sizes</span><span><b>2</b> flights: Mar &amp; Jun 2026</span><span><b>GPS</b> + newspaper proof</span></div>

      <ol className="osteps">
        <li className="ostep">
          <div className="ohead"><span className="onum">01</span><div><h3>Creative</h3><p>One key visual, "Avanga Paathu Panga", adapted to every board size so the brand reads the same from a moving car.</p></div></div>
          <div className="odesigns">{DESIGNS.map(d => (
            <Img key={d.f} f={d.f} alt={d.t} cap={d.t + ' · ' + d.s} cls="od" style={{'--ar': d.ar}}>
              <span className="ocap"><b>{d.t}</b><small>{d.s}</small></span>
            </Img>
          ))}</div>
        </li>

        <li className="ostep">
          <div className="ohead"><span className="onum">02</span><div><h3>Site plan</h3><p>Four high-traffic roads into the city, with board sizes matched to each spot and flights timed around the March launch event.</p></div></div>
          <div className="osites">{SITES.map(s => (
            <div className="osite" key={s.k}>
              <span className="opin"><Pin/></span>
              <div><b>{s.k}</b><small>{s.a}</small></div>
              <span className="osize">{s.size}</span>
              <div className="ofl">{s.fl.map(x => <span key={x}>{x}</span>)}</div>
            </div>
          ))}</div>
        </li>

        <li className="ostep">
          <div className="ohead"><span className="onum">03</span><div><h3>Live on the road</h3><p>Boards up and visible to traffic, photographed on site with dates and GPS location.</p></div></div>
          <div className="olive">{LIVE.map(p => (
            <Img key={p.f} f={p.f} alt={p.site + ', ' + p.d} cap={p.site + ' · ' + p.size + ' · ' + p.d} cls={'ol' + (p.tall ? ' tall' : '')}>
              <span className="otag">{p.size}</span>
              {p.gps && <span className="otag gps">GPS tagged</span>}
              <span className="ocap"><b>{p.site}</b><small>{p.d}</small></span>
            </Img>
          ))}</div>
        </li>

        <li className="ostep">
          <div className="ohead"><span className="onum">04</span><div><h3>Proof of display</h3><p>Each board photographed with that day's newspaper (The Hindu, Coimbatore edition) and shared with the client as proof it was live.</p></div></div>
          <div className="oproof">{PROOF.map(p => (
            <Img key={p.f} f={p.f} alt={'Proof of display, ' + p.site + ', ' + p.d} cap={'Proof of display · ' + p.site + ' · ' + p.d} cls="op">
              <span className="ocap"><b>{p.site}</b><small>The Hindu · {p.d}</small></span>
            </Img>
          ))}</div>
        </li>
      </ol>

      {lb && (
        <div className="lb" role="dialog" aria-modal="true" aria-label={lb.cap} onClick={e => { if (e.target === e.currentTarget) setLb(null); }}>
          <img src={'ooh/' + lb.f + '.webp'} alt={lb.cap}/>
          <div className="lbcap"><b>{lb.cap}</b></div>
          <button className="x" onClick={() => setLb(null)} aria-label="Close">✕</button>
        </div>
      )}
    </div></section>
  );
}
