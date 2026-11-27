import React, { useState, useRef, useEffect } from 'react';
import { BR } from './brands.js';

const RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = window.matchMedia && matchMedia('(pointer: fine)').matches;

// Original line icons (24px grid)
const P = {
  mega: <><path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M16 9a3 3 0 0 1 0 6"/><path d="M19 6a7 7 0 0 1 0 12"/></>,
  target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></>,
  pin: <><path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></>,
  chart: <><path d="M4 20V11M10 20V4M16 20v-7M2 20h20"/></>,
  brush: <><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z"/><path d="M7 17c-2 0-3 1.5-3 3.5 2 0 4-.5 4.5-2.5"/></>,
  pen: <><path d="M12 19l7-7 3 3-7 7z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z"/><path d="M2 2l7.6 7.6"/><circle cx="11" cy="11" r="2"/></>,
  frames: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><circle cx="17.5" cy="17.5" r="3.5"/></>,
  film: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4M3 12h18"/></>,
  spark: <><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.7 1.8 1.8.7-1.8.7L19 20l-.7-1.8-1.8-.7 1.8-.7z"/></>,
  cut: <><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8.1 15.9M14.5 14.5L20 20M8.1 8.1L12 12"/></>,
  mic: <><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10a7 7 0 0 1-14 0M12 17v5"/></>,
  drop: <><path d="M12 2.7l5.7 5.7a8 8 0 1 1-11.3 0z"/><path d="M12 9v9"/></>,
  play: <><circle cx="12" cy="12" r="9"/><path d="M10 8.5l5.5 3.5-5.5 3.5z" fill="currentColor"/></>,
  link: <><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></>,
  phone: <><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></>,
  map: <><path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></>,
  form: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></>,
  chat: <><path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5A8 8 0 1 1 21 12z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/></>,
  sheet: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/></>,
  code: <><path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/></>,
  tv: <><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M8 2l4 4 4-4"/></>,
  news: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/></>,
  board: <><rect x="3" y="3" width="18" height="11" rx="1"/><path d="M8 14v7M16 14v7M7 7h10"/></>,
  funnel: <><path d="M3 4h18l-7 8v6l-4 2v-8z"/></>,
  cal: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></>,
  cloud: <><path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.6 1.5A4 4 0 0 0 6 19z"/></>,
  rocket: <><path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.9A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2z"/><path d="M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5"/></>,
  arrow: <><path d="M7 17L17 7M8 7h9v9"/></>,
  star: <><path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" fill="currentColor" stroke="none"/></>,
  award: <><circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/></>,
  layers: <><path d="M12 2l10 5-10 5L2 7z"/><path d="M2 12l10 5 10-5M2 17l10 5 10-5"/></>,
  users: <><circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0"/><path d="M17 4a4 4 0 0 1 0 8M22 21a7 7 0 0 0-4-6.3"/></>,
};
const I = ({ n }) => <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{P[n]}</svg>;

const LOGO = { onespace:'img/onespace.png', stepsstone:'img/stepsstone.png', autowelkin:'img/autowelkin.png', avg:'img/avg.png', ts:'img/ts.png' };
const LBG = id => id === 'ts' ? '#000' : '#fff';

const TICKER = ['Branding','Brand Reach','Go-to-Market','Meta Ads','Google Ads','Lead Generation','Performance Marketing','Print & TV','SEO','Social Media','ATL & BTL','Media Planning','Analytics'];

const SERVICES = [
  { t:'Branding & brand strategy', tags:['Brand positioning','Visual identity','Messaging','Brand guidelines','Creative templates'], d:'Defining what a brand stands for and how it looks and sounds, then keeping it consistent across ads, print, social and on-ground.' },
  { t:'Brand reach & awareness', tags:['Reach campaigns','Video views','Print & TV','Hoardings','Events'], d:'Putting the brand in front of the right audience at scale, mixing Meta and YouTube reach with newspapers, TV, outdoor and launch events.' },
  { t:'Go-to-market (GTM) strategy', tags:['Market research','Audience segments','Offer & pricing','Channel mix','Launch plan'], d:'Planning how a product or project reaches its market: who to target, what to offer, which channels to use and how to sequence the launch.' },
  { t:'Performance marketing & lead generation', tags:['Meta Lead Ads','Google Ads','LinkedIn Ads','Landing pages','Cost per lead'], d:'Running Meta, Google and LinkedIn campaigns built to bring in qualified leads, with tracking set up from click to enquiry.' },
  { t:'Integrated campaigns · ATL & BTL', tags:['Newspaper ads','Television','Hoardings','Media planning','Vendor negotiation'], d:'Campaigns across digital, print and TV: placements planned, vendor quotations compared and negotiated, specs and creatives delivered.' },
  { t:'Social media marketing', tags:['Content calendars','Reels','Engagement','Analytics & reporting','Pinterest'], d:'Content planning, scheduling and short-form video, with engagement and reporting that feed the next calendar.' },
  { t:'Graphic design & branding', tags:['Ad creatives','Posters','Brand identity','Social creatives','Figma'], d:'Creatives, posters and campaign assets that keep a brand consistent across every touchpoint.' },
  { t:'Video production & editing', tags:['Promo videos','Motion graphics','Colour correction','Audio mixing','Voice-over'], d:'Promotional and social videos for Instagram and YouTube, from edit and motion to colour and sound.' },
  { t:'Marketing strategy & consulting', tags:['Market research','Competitor analysis','Pricing & quotations','Positioning','SEO'], d:'Evaluating business requirements and recommending the marketing approach, pricing and positioning to match.' },
];

const FLOW = [
  { k:'Branding', i:'spark', line:'Build a brand people remember',
    what:'Start with the foundation: what the brand stands for, who it speaks to and how it should look and sound everywhere.',
    do:['Brand positioning and key message','Logo, colours, type and visual system','Tone of voice for ads and social','Brand guidelines and creative templates'],
    out:['Positioning statement','Visual identity','Ad & social templates','Brand guidelines'],
    kpi:['Brand consistency across channels','Brand recall','Engagement on brand content'],
    work:'Avanga Paathu Panga: end-to-end branding across newspaper, TV, hoardings, posters and social.' },
  { k:'Brand reach', i:'mega', line:'Get seen by the right people at scale',
    what:'Push the brand out wide with a mix of digital reach and traditional media, so the market knows the name before you ask for a lead.',
    do:['Meta and YouTube reach and video-view campaigns','Newspaper ads and TV spots','Hoardings, outdoor and BTL activity','Reels, social content and events'],
    out:['Media plan','Reach campaigns','Print & TV ads','Event promotion'],
    kpi:['Reach and impressions','Frequency and CPM','Video views','Share of voice'],
    work:'Aalam Senior Living: The Times of India, Dinamalar and Daily Thanthi placements and TV with Shankara TV.' },
  { k:'Go-to-market', i:'rocket', line:'Plan how the offer reaches its market',
    what:'Turn awareness into a launch plan: the right audience, the right offer, the right channels in the right order.',
    do:['Market and competitor analysis','Audience segments and buyer profiles','Offer, pricing and quotation planning','Channel mix, budget split and launch calendar'],
    out:['GTM plan','Audience segments','Offer & pricing','Launch calendar'],
    kpi:['Launch on schedule','Budget split by channel','Target cost per lead'],
    work:'Srinivasa Palms Phase 2: Mid-Launch Special Offer Event, 13–15 March 2026, Fairfield by Marriott, Coimbatore.' },
  { k:'Lead generation', i:'funnel', line:'Turn attention into enquiries',
    what:'Run the campaigns that capture intent and bring in enquiries, with tracking in place from the first click.',
    do:['Meta Lead Ads and instant forms','Google Search and YouTube campaigns','LinkedIn Ads for B2B leads','Landing pages, forms and Google Tag Manager tracking'],
    out:['Lead campaigns','Landing pages & forms','Conversion tracking','Lead reports'],
    kpi:['Leads and cost per lead (CPL)','Click-through rate','Form conversion rate','Lead quality'],
    work:'Aalam Senior Living: Meta Ads and Google Ads for lead generation and promotions.' },
  { k:'Conversion', i:'users', line:'Nurture leads into customers',
    what:'Follow every lead up fast and consistently until it becomes a visit, a call or a sale.',
    do:['CRM setup in HubSpot or Salesforce','WhatsApp and email follow-up sequences','Lead scoring and sales handoff','Retargeting and reporting dashboards'],
    out:['CRM pipeline','Follow-up flows','Retargeting','Looker Studio reports'],
    kpi:['Lead-to-visit rate','Lead-to-sale rate','Cost per acquisition','Return on ad spend'],
    work:'Client coordination and campaign execution through to the launch event.' },
];

function Flow() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(!RM);
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setI(v => (v + 1) % FLOW.length), 6000);
    return () => clearInterval(t);
  }, [auto]);
  const f = FLOW[i];
  const pick = n => { setI(n); setAuto(false); };
  return (
    <section className="band flow dark" id="flow"><div className="wrap">
      <div className="sh"><div><Eyebrow>My growth flow</Eyebrow><h2>From brand to <span className="g">booked leads</span></h2></div>
        <p className="fl-lede">Every campaign I run follows the same five steps. Pick one to see what I do there.</p></div>
      <div className="steps" style={{'--p': (i / (FLOW.length - 1) * 100) + '%'}}>
        <div className="track"><span className="fill"/><span className="dot"/></div>
        {FLOW.map((s, n) => (
          <button key={s.k} className={'step' + (n === i ? ' on' : '') + (n < i ? ' done' : '')} onClick={() => pick(n)} aria-pressed={n === i}>
            <span className="node"><I n={s.i}/></span>
            <b>{s.k}</b><small>{s.line}</small>
          </button>
        ))}
      </div>
      <div className="panel" key={f.k}>
        <div className="pc">
          <h3><span className="g">{String(i + 1).padStart(2, '0')}</span> {f.k}</h3>
          <p>{f.what}</p>
          <ul>{f.do.map(d => <li key={d}><I n="arrow"/>{d}</li>)}</ul>
        </div>
        <div className="pc">
          <div className="pl">Deliverables</div>
          <div className="chips2">{f.out.map(o => <span key={o}>{o}</span>)}</div>
          <div className="pl" style={{marginTop:18}}>What I track</div>
          <ul className="kpi">{f.kpi.map(k => <li key={k}><I n="chart"/>{k}</li>)}</ul>
        </div>
        <div className="pc work"><div className="pl">From my work</div><p>{f.work}</p>
          <div className="nav2"><button onClick={() => pick((i + FLOW.length - 1) % FLOW.length)} aria-label="Previous step">←</button><button onClick={() => pick((i + 1) % FLOW.length)} aria-label="Next step">→</button></div>
        </div>
      </div>
    </div></section>
  );
}

const CREATIVES = [
  { f:'c01', c:'Housewife-kkum Retirement', t:'Launch hero with amenities strip', fmt:'Feed 1:1' },
  { f:'c02', c:'Housewife-kkum Retirement', t:'Lifestyle shot, Pollachi', fmt:'Feed 1:1' },
  { f:'c03', c:'Housewife-kkum Retirement', t:'Story and Reels cover', fmt:'Story 9:16' },
  { f:'c04', c:'Housewife-kkum Retirement', t:'"Do nothing" hook', fmt:'Feed 1:1' },
  { f:'c05', c:'Housewife-kkum Retirement', t:'Home theatre lifestyle', fmt:'Feed 1:1' },
  { f:'c06', c:'Avanga Paathu Panga', t:'Wellness and yoga', fmt:'Feed 1:1' },
  { f:'c07', c:'Offers & events', t:'Visit today, cab on us', fmt:'Feed 1:1' },
  { f:'c08', c:'Offers & events', t:'Akshaya Tritiya gold offer', fmt:'Feed 1:1' },
  { f:'c09', c:'Care series', t:'Care crafted with respect', fmt:'Feed 1:1' },
  { f:'c10', c:'Care series', t:'Care you can trust', fmt:'Feed 1:1' },
  { f:'c11', c:'Care series', t:'Growing older, growing closer', fmt:'Feed 1:1' },
  { f:'c12', c:'Care series', t:'Live close, not crowded', fmt:'Feed 1:1' },
];

function Creatives() {
  const cats = ['All', ...new Set(CREATIVES.map(c => c.c))];
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState(-1);
  const list = cat === 'All' ? CREATIVES : CREATIVES.filter(c => c.c === cat);
  useEffect(() => {
    if (open < 0) return;
    const k = e => {
      if (e.key === 'Escape') setOpen(-1);
      if (e.key === 'ArrowRight') setOpen(i => (i + 1) % list.length);
      if (e.key === 'ArrowLeft') setOpen(i => (i - 1 + list.length) % list.length);
    };
    addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    return () => { removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [open, list.length]);
  const cur = open >= 0 ? list[open] : null;
  return (
    <section className="band dark" id="creatives" style={{borderTop:0}}><div className="wrap">
      <div className="sh"><div><Eyebrow>Ad creatives</Eyebrow><h2>Creatives built for <span className="g">Meta & Google Ads</span></h2></div>
        <p className="fl-lede">Feed and story creatives I designed for Aalam Senior Living's Meta and Google Ads lead-generation campaigns: Tamil hooks, offer-led ads and a premium care series.</p></div>
      <div className="crstats"><span><b>{CREATIVES.length}</b> creatives</span><span><b>{cats.length - 1}</b> campaigns</span><span><b>Meta</b> &amp; <b>Google Ads</b></span><span><b>Feed 1:1</b> &amp; <b>Story 9:16</b></span></div>
      <div className="filters" role="group" aria-label="Filter by campaign">{cats.map(c => (
        <button key={c} className={cat === c ? 'on' : ''} aria-pressed={cat === c} onClick={() => { setCat(c); setOpen(-1); }}>
          {c}<b>{c === 'All' ? CREATIVES.length : CREATIVES.filter(x => x.c === c).length}</b>
        </button>
      ))}</div>
      <div className="masonry" key={cat}>{list.map((c, i) => (
        <button key={c.f} className="cr" style={{animationDelay: (i * 0.05) + 's'}} onClick={() => setOpen(i)} aria-label={'Open ' + c.t}>
          <span className="im"><img src={'creatives/' + c.f + '.webp'} alt={c.c + ': ' + c.t} loading="lazy"/></span>
          <span className="cap"><small>{c.c} · {c.fmt}</small><b>{c.t}</b></span>
        </button>
      ))}</div>
      {cur && (
        <div className="lb" role="dialog" aria-modal="true" aria-label={cur.t} onClick={e => { if (e.target === e.currentTarget) setOpen(-1); }}>
          <img src={'creatives/' + cur.f + '.webp'} alt={cur.c + ': ' + cur.t}/>
          <div className="lbcap"><small>{cur.c} · {cur.fmt}</small><b>{cur.t}</b><span>{open + 1} / {list.length}</span></div>
          <button className="x" onClick={() => setOpen(-1)} aria-label="Close">✕</button>
          <button className="pv" onClick={() => setOpen((open - 1 + list.length) % list.length)} aria-label="Previous creative">←</button>
          <button className="nx" onClick={() => setOpen((open + 1) % list.length)} aria-label="Next creative">→</button>
        </div>
      )}
    </div></section>
  );
}

const TOOLS = [
  { n:'Meta Ads Manager', c:'Paid social', b:'meta' }, { n:'Google Ads', c:'Search & display', b:'gads' }, { n:'Meta Lead Ads', c:'Instant forms', b:'facebook' },
  { n:'LinkedIn Ads', c:'B2B leads', b:'linkedin' }, { n:'YouTube Ads', c:'Video ads', b:'youtube' }, { n:'Meta Business Suite', c:'Pages & inbox', b:'meta' },
  { n:'Meta Pixel', c:'Conversion tracking', b:'meta' }, { n:'Keyword Planner', c:'Search research', b:'gads' }, { n:'Meta Creator Studio', c:'Content publishing', b:'instagram' },
  { n:'Google Analytics 4', c:'Analytics', b:'ga' }, { n:'Google Tag Manager', c:'Tracking', b:'gtm' }, { n:'Looker Studio', c:'Dashboards', b:'looker' },
  { n:'Google Search Console', c:'SEO', b:'gsc' }, { n:'Semrush', c:'SEO research', b:'semrush' }, { n:'HubSpot', c:'CRM & automation', b:'hubspot' },
  { n:'Salesforce', c:'CRM', b:'salesforce' }, { n:'Google Business Profile', c:'Local search', b:'gmaps' },
  { n:'WhatsApp Business', c:'Lead follow-up', b:'whatsapp' }, { n:'Google Forms', c:'Lead capture', b:'gforms' }, { n:'Typeform', c:'Lead capture', b:'typeform' },
  { n:'Google Sheets', c:'Lead tracking', b:'gsheets' }, { n:'Klaviyo', c:'Email flows', i:'mail', col:'#232426' }, { n:'Pinterest', c:'Social', b:'pinterest' },
  { n:'Photoshop', c:'Ad creatives', b:'ps' }, { n:'Illustrator', c:'Ad creatives', b:'ai' }, { n:'Premiere Pro', c:'Video ads', b:'pr' },
  { n:'After Effects', c:'Motion ads', b:'ae' }, { n:'CapCut', c:'Reels', i:'cut', col:'#111111' },
];
const BRX = [[/Meta Lead/,'facebook'],[/Creator Studio|Instagram/,'instagram'],[/Meta/,'meta'],[/Google Ads|Keyword Planner/,'gads'],[/LinkedIn/,'linkedin'],[/YouTube/,'youtube'],[/Google Forms|Typeform/,'gforms'],[/WhatsApp/,'whatsapp'],[/Analytics 4/,'ga'],[/Tag Manager/,'gtm'],[/Looker/,'looker'],[/Semrush/,'semrush'],[/Search Console/,'gsc'],[/Business Profile/,'gmaps'],[/HubSpot/,'hubspot'],[/Salesforce/,'salesforce'],[/Photoshop/,'ps'],[/Illustrator/,'ai'],[/Premiere/,'pr'],[/After Effects/,'ae']];
const brandOf = t => { const m = BRX.find(([r]) => r.test(t)); return m ? m[1] : null; };
const Logo = ({ b, i }) => BR[b] ? <span className="blw" dangerouslySetInnerHTML={{ __html: BR[b].s }}/> : <I n={i}/>;
const GROUPS = [
  { h:'Paid advertising', i:'mega', items:[['Meta Ads Manager','mega'],['Meta Business Suite','users'],['Google Ads','target'],['LinkedIn Ads','mega'],['YouTube Ads','play'],['Keyword Planner','search'],['Meta Pixel tracking','code']] },
  { h:'Lead generation', i:'funnel', items:[['Meta Lead Ads (instant forms)','form'],['Google Forms & Typeform','form'],['Landing pages','funnel'],['WhatsApp Business follow-up','chat'],['Klaviyo email flows','mail'],['Lead tracking & reporting','sheet']] },
  { h:'Analytics & SEO', i:'chart', items:[['Google Analytics 4','chart'],['Google Tag Manager','code'],['Looker Studio dashboards','chart'],['Semrush','search'],['Google Search Console','search'],['SEO','search'],['Social media analytics','chart'],['Google Business Profile','map']] },
  { h:'CRM & automation', i:'users', items:[['HubSpot CRM & workflows','users'],['Salesforce','cloud'],['Klaviyo email flows','mail'],['Lead pipeline management','funnel'],['Lead scoring & handoff','sheet']] },
  { h:'Creative for ads', i:'brush', items:[['Adobe Photoshop','brush'],['Adobe Illustrator','pen'],['Adobe Premiere Pro','film'],['Adobe After Effects','spark'],['CapCut','cut'],['Meta Creator Studio','cal']] },
  { h:'Campaign strategy', i:'target', items:[['Audience targeting & retargeting','target'],['Funnel strategy (awareness to conversion)','funnel'],['Budget & bid management','chart'],['A/B testing ad creatives','layers'],['Campaign reporting & ROI','sheet']] },
  { h:'Conversion & nurturing', i:'chat', items:[['Lead qualification','users'],['Lead nurturing & follow-up','chat'],['Landing page optimisation','funnel'],['Email & WhatsApp sequences','mail'],['Conversion tracking','code']] },
  { h:'Content & social', i:'cal', items:[['Content calendars','cal'],['Ad copywriting','pen'],['Reels & short-form for ads','play'],['Community & DM management','chat'],['Instagram & Facebook growth','users']] },
  { h:'Research & planning', i:'search', items:[['Market research','search'],['Competitor analysis','chart'],['Media planning & buying','news'],['Brand positioning','award'],['Marketing pricing & quotations','sheet']] },
  { h:'ATL & BTL media', i:'news', items:[['Newspaper ads · Times of India, Dinamalar, Daily Thanthi','news'],['Television · Shankara TV','tv'],['Hoardings & outdoor','board'],['Vendor quotes & negotiation','users'],['Event promotion','cal']] },
];
const COMP = ['CRM management','Marketing automation','B2B lead generation','Video advertising','Dashboard reporting','Audience targeting & retargeting','Funnel strategy','A/B testing','Conversion tracking','Lead nurturing & follow-up','Budget & bid management','Campaign reporting & ROI','Landing page optimisation','Digital marketing strategy','Performance marketing','Meta Ads & Google Ads','Search engine optimisation','Lead generation & customer acquisition','Social media marketing','ATL & BTL marketing','Integrated marketing campaigns','Marketing strategy & planning','Market & competitor analysis','Brand positioning & branding','Content marketing & copywriting','Creative direction & campaign design','Video production & editing','Advertising media planning','Vendor management & negotiation','Client relationship management','Marketing consultation','Business development support','Social media analytics & reporting'];

const JOBS = [
  { id:'avg', now:true, co:'AVG Primetech', role:'Video Editor · Creative & Marketing Support', when:'Jul 2026 – Present', where:'Bangalore, Karnataka',
    pts:['Edit promotional, marketing and social media videos for digital platforms.','Produce engaging video content with transitions, motion graphics and colour correction.','Handle audio editing and mixing to improve content quality.','Create graphic design assets and promotional materials.','Develop video content for Instagram, YouTube and other digital channels.','Support ongoing creative and digital marketing initiatives.'] },
  { id:'ts', co:'TS Techy', role:'Marketing & Business Consultant · Project-based', when:'May 2025 – Present', where:'Project-based',
    pts:['Provide project-based consulting for digital marketing, marketing strategy and business requirements.','Support digital marketing service planning and marketing solution recommendations.','Assist with marketing service pricing, quotations and commercial planning.','Evaluate business requirements and suggest relevant marketing approaches.','Support marketing positioning, promotional planning and business development.','Coordinate marketing discussions and consult on business growth opportunities.'] },
  { id:'autowelkin', co:'Autowelkin', role:'Social Media Marketing Executive', when:'May 2026 – Jul 2026', where:'Coimbatore, Tamil Nadu',
    pts:['Managed social media content planning, creative development and post scheduling.','Designed promotional graphics and social media creatives.','Shot and edited reels and short-form video content.','Created voice-over content and contributed to creative messaging.','Supported business development and social media marketing activities.','Assisted with content strategy and audience engagement initiatives.'] },
  { id:'stepsstone', co:'Stepsstone Promoters Pvt. Ltd. – Aalam Senior Living', role:'Junior Marketing Head & Graphic Designer', when:'Nov 2025 – May 2026', where:'Pollachi, Tamil Nadu',
    pts:['Planned and executed integrated campaigns across digital, print, television, ATL and BTL channels.','Managed Meta Ads and Google Ads execution for promotions and lead generation.','Planned and coordinated newspaper placements across The Times of India, Dinamalar and Daily Thanthi.','Coordinated television advertising campaigns with Shankara TV.','Planned advertising locations, media placements and promotional activities.','Designed marketing creatives, advertisements, posters and campaign assets.','Worked directly with advertising vendors to obtain quotations, compare pricing, negotiate costs and finalise requirements.','Managed ad specifications, creative dimensions, placement details and media requirements.','Coordinated client requirements and campaign execution.','Conducted market and competitor analysis to support marketing decisions.','Planned social media campaigns, engagement activities and content calendars.','Supported lead generation and promotion for luxury senior living projects.'],
    camp:{ t:'Key campaign: Srinivasa Palms – Phase 2 Mid-Launch Special Offer Event', d:'Three-day event, March 13–15, 2026, at Fairfield by Marriott, Coimbatore, for a luxury senior living community near Pollachi. Supported creatives, media coordination, advertising execution and event promotion across digital and traditional channels.' } },
  { id:'onespace', co:'Onespace Graphics', role:'Graphic Designer & Video Content Creator', when:'Oct 2024 – Oct 2025', where:'Coimbatore, Tamil Nadu',
    pts:['Designed digital marketing creatives, promotional graphics and branding materials.','Produced graphic content for social media and advertising campaigns.','Edited and developed video content for brand communication.','Created visual assets to support promotional and marketing objectives.','Contributed to content development and creative execution for clients.'] },
];

const ORB = [['mega',0],['funnel',1],['target',0],['chart',1],['form',0],['search',1],['chat',0],['mail',1]];

function Orbit() {
  const refs = useRef([]);
  useEffect(() => {
    let raf;
    const place = t => {
      const n = ORB.length;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const a = t / 26000 * Math.PI * 2 + i / n * Math.PI * 2;
        const x = Math.cos(a), z = Math.sin(a);
        const s = 0.7 + 0.32 * (z + 1) / 2;
        el.style.left = (50 + x * 50) + '%';
        el.style.top = (66 + z * 11 - x * 5) + '%';
        el.style.transform = `scale(${s.toFixed(3)})`;
        el.style.zIndex = z > -0.05 ? 3 : 1;
        el.style.opacity = (0.55 + 0.45 * (z + 1) / 2).toFixed(2);
      });
    };
    if (RM) { place(3000); return; }
    const go = t => { place(t); raf = requestAnimationFrame(go); };
    raf = requestAnimationFrame(go);
    return () => cancelAnimationFrame(raf);
  }, []);
  return ORB.map(([n, g], i) => <span key={n} ref={el => refs.current[i] = el} className={'orb' + (g ? ' gd' : '')} aria-hidden="true"><I n={n}/></span>);
}

function Tilt({ as = 'div', max = 6, className = '', children, ...rest }) {
  const ref = useRef(null);
  const move = e => {
    if (RM || !FINE) return;
    const el = ref.current, r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(1100px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg) translateY(-3px)`;
  };
  const Tag = as;
  return <Tag ref={ref} className={'tilt ' + className} {...rest} onMouseMove={move} onMouseLeave={() => { ref.current.style.transform = ''; }}>{children}</Tag>;
}

const Ticker = ({ items, cls = '' }) => {
  const row = <div className="run" aria-hidden="true">{items.map(t => <React.Fragment key={t}><span>{t}</span><I n="star"/></React.Fragment>)}</div>;
  return <div className={'tape ' + cls}>{row}{React.cloneElement(row)}</div>;
};

const ToolRow = ({ list, rev }) => {
  const row = k => <div className="run" key={k} aria-hidden={k ? 'true' : undefined}>{list.map(t => (
    <div className="tool" key={t.n} style={{'--b': t.b ? BR[t.b].c : t.col}}><span className="ti"><Logo b={t.b} i={t.i}/></span><span><b>{t.n}</b><small>{t.c}</small></span></div>
  ))}</div>;
  return <div className={'trow' + (rev ? ' rev' : '')}><div style={{display:'flex',width:'max-content'}}>{row(0)}{row(1)}</div></div>;
};

function CardArt({ kind }) {
  const gg = `url(#gg${kind})`;
  const G = <defs><linearGradient id={'gg' + kind} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#c88a0c"/><stop offset=".4" stopColor="#f8dc93"/><stop offset="1" stopColor="#e3a51a"/></linearGradient></defs>;
  if (kind === 'event') return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMax slice" aria-hidden="true">{G}
      <rect width="400" height="200" fill="#221d15"/>
      <circle cx="320" cy="48" r="30" fill={gg}/>
      {[0,1,2,3,4,5].map(i => <rect key={i} x={40 + i*26} y={150 - i*8} width="12" height={50 + i*8} fill={gg} opacity={.35 + i*.11}/>)}
      <rect x="215" y="74" width="140" height="126" fill="#17140f" stroke="#e3a51a" strokeWidth="2"/>
      <rect x="215" y="74" width="140" height="14" fill={gg}/>
      {[0,1,2].map(r => [0,1,2,3].map(c => <rect key={r+'-'+c} x={227 + c*32} y={102 + r*30} width="18" height="16" fill={gg} opacity={(r + c) % 3 ? .85 : .35}/>))}
      <text x="40" y="52" fill="#f6d27a" fontFamily="Sora" fontWeight="800" fontSize="22">13–15 MAR</text>
    </svg>
  );
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMax slice" aria-hidden="true">{G}
      <rect width="400" height="200" fill="#221d15"/>
      <rect x="30" y="34" width="150" height="120" fill="#f5f1e8" transform="rotate(-5 105 94)"/>
      {[0,1,2,3,4,5].map(i => <rect key={i} x="44" y={56 + i*14} width={i ? 120 : 80} height={i ? 5 : 10} fill={i ? '#17140f' : '#e3a51a'} opacity={i ? .35 : 1} transform="rotate(-5 105 94)"/>)}
      <rect x="200" y="22" width="170" height="104" rx="6" fill={gg}/>
      <rect x="208" y="30" width="154" height="88" fill="#17140f"/>
      <circle cx="285" cy="74" r="20" fill={gg}/><path d="M279 64 l16 10 -16 10z" fill="#17140f"/>
      <rect x="252" y="126" width="66" height="8" fill={gg}/>
      <rect x="200" y="150" width="180" height="36" fill={gg}/>
      <rect x="215" y="162" width="110" height="12" fill="#17140f" opacity=".8"/>
    </svg>
  );
}

const Eyebrow = ({ children }) => <div className="eyebrow"><i><b/><b/></i>{children}</div>;

function App() {
  const [open, setOpen] = useState(0);
  const [copied, setCopied] = useState('');
  const [top, setTop] = useState(false);
  const prog = useRef(null);
  const copy = async (v, k) => { try { await navigator.clipboard.writeText(v); setCopied(k); setTimeout(() => setCopied(''), 1800); } catch { setCopied('fail'); } };

  // Scroll progress bar + back-to-top button
  useEffect(() => {
    const on = () => {
      const h = document.documentElement, max = h.scrollHeight - innerHeight;
      if (prog.current) prog.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      setTop(scrollY > 700);
    };
    on(); addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, []);

  // Highlight the menu link for the section on screen
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const links = [...document.querySelectorAll('.links a[href^="#"]')];
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => a.classList.toggle('act', a.getAttribute('href') === '#' + e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(a => { const s = document.querySelector(a.getAttribute('href')); if (s) io.observe(s); });
    return () => io.disconnect();
  }, []);

  // Fade-up reveal for blocks below the first screen
  useEffect(() => {
    if (RM || !('IntersectionObserver' in window)) return;
    const els = [...document.querySelectorAll('.band .sh, .svc, .grp, .job, .cc, .edu > div, .contact > div, .steps, .panel, .crstats, .filters, .nums > div, .frame, .comp')]
      .filter(el => el.getBoundingClientRect().top > innerHeight);
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach((el, i) => { el.classList.add('rv'); el.style.transitionDelay = (i % 4) * 0.06 + 's'; io.observe(el); });
    return () => io.disconnect();
  }, []);

  // Magnetic pull on the main buttons (mouse only)
  useEffect(() => {
    if (RM || !FINE) return;
    const move = e => {
      const b = e.target.closest && e.target.closest('.btn, .cta, .pillbtn');
      document.querySelectorAll('.mag').forEach(x => { if (x !== b) { x.classList.remove('mag'); x.style.translate = ''; } });
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.classList.add('mag');
      b.style.translate = `${((e.clientX - r.left) / r.width - 0.5) * 10}px ${((e.clientY - r.top) / r.height - 0.5) * 8}px`;
    };
    addEventListener('pointermove', move, { passive: true });
    return () => removeEventListener('pointermove', move);
  }, []);

  return (
    <>
      <div className="prog" ref={prog} aria-hidden="true"/>
      <a className={'totop' + (top ? ' on' : '')} href="#home" aria-label="Back to top"><I n="arrow"/></a>
      <div className="navw"><nav>
        <a className="brand" href="#home"><img src="img/avatar.webp" alt=""/>Sanjeeth.</a>
        <div className="links"><a href="#home">Home</a><a href="#services">Services</a><a href="#flow">Growth flow</a><a href="#toolkit">Toolkit</a><a href="#about">About</a><a href="#experience">Experience</a><a href="#campaigns">Campaigns</a><a href="#creatives">Creatives</a><a href="https://drive.google.com/drive/folders/1yYnsy01--KET6TybK1a1zKqZ3tM5W8T8" target="_blank" rel="noopener">Portfolio</a><a href="sanjeethkumar-cv.pdf" target="_blank" rel="noopener">Resume</a></div>
        <a className="cta" href="#contact">Let's talk <I n="arrow"/></a>
      </nav></div>

      <header className="hero" id="home">
        <div className="head">
          <span className="pill"><span><I n="award"/></span>GTM Lead · Growth Marketer</span>
          <h1>I'm <span className="g">Sanjeeth Kumar</span></h1>
          <p className="sub">Go-to-market & lead generation specialist based in Bengaluru, India</p>
          <a className="badge" href="#contact" aria-label="Hire me">
            <svg viewBox="0 0 120 120"><defs><path id="cir" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0"/></defs>
              <circle cx="60" cy="60" r="58" fill="#17140f"/>
              <text fill="#fff" fontFamily="Sora" fontWeight="700" fontSize="13" letterSpacing="3.2"><textPath href="#cir">HIRE ME ✦ HIRE ME ✦ HIRE ME ✦ </textPath></text>
            </svg>
            <span className="mid"><I n="arrow"/></span>
          </a>
        </div>
        <div className="stagegrid">
          <div className="side">
            <div><div className="lbl">Follow me on</div>
              <div className="soc">
                <a href="https://www.linkedin.com/in/sanjeeth-kumar-s-n" target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn"><I n="link"/></a>
                <a href="#contact" aria-label="Email" title="2023sanjeeth@gmail.com"><I n="mail"/></a>
                <a href="#contact" aria-label="Phone" title="+91 78456 92501"><I n="phone"/></a>
              </div>
            </div>
            <div>
              <div className="stack">{JOBS.map(j => <span key={j.id} style={{background:LBG(j.id)}} title={j.co}><img src={LOGO[j.id]} alt={j.co}/></span>)}</div>
              <div className="big"><span className="g">5 brands</span> · 2+ years</div>
              <div className="lbl" style={{margin:0}}>Real estate, auto, tech and agency</div>
            </div>
          </div>
          <div className="stage">
            <Orbit/>
            <div className="pic"><div className="ring"/><div className="disc"/><img className="me" src="img/photo.webp" alt="Sanjeeth Kumar"/></div>
            <div className="hbtns"><a className="btn" href="https://drive.google.com/drive/folders/1yYnsy01--KET6TybK1a1zKqZ3tM5W8T8" target="_blank" rel="noopener">Portfolio <i><I n="arrow"/></i></a><a className="btn w" href="#contact">Hire me</a></div>
          </div>
          <div className="side r">
            <div><span className="quote">“</span><p className="qt">Creative production and marketing execution under one roof.</p></div>
            <div className="tags"><span className="tg">Meta Ads</span><span className="tg gd">Google Ads</span><span className="tg gd">Lead generation</span><span className="tg">Print & TV</span><span className="tg">SEO</span></div>
          </div>
        </div>
      </header>

      <div className="mq"><Ticker items={TICKER} cls="b"/><Ticker items={TICKER.slice().reverse()} cls="a"/></div>

      <section className="band" id="services"><div className="wrap">
        <div className="sh"><div><Eyebrow>My services</Eyebrow><h2>How I bring <span className="g">brands to life</span></h2></div>
          <a className="pillbtn" href="#contact">Start a project <i><I n="arrow"/></i></a></div>
        <div className="svcs">{SERVICES.map((s, i) => (
          <div key={s.t} className={'svc' + (open === i ? ' on' : '')}>
            <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} id={'svc' + i}>
              <span className="n">{String(i + 1).padStart(2, '0')}.</span><h3>{s.t}</h3><span className="ar"><I n="arrow"/></span>
            </button>
            <div className="body" role="region" aria-labelledby={'svc' + i}><div>
              <div className="bx"><div className="tgs">{s.tags.map(t => <span key={t}>{t}</span>)}</div><p>{s.d}</p></div>
            </div></div>
          </div>
        ))}</div>
      </div></section>

      <Flow/>

      <section className="band tools" id="toolkit"><div className="wrap">
        <Eyebrow>My toolkit</Eyebrow><h2>My marketing & <span className="g">lead-gen stack</span></h2>
      </div>
        <div style={{marginTop:14}}><ToolRow list={TOOLS.slice(0, 9)}/><ToolRow list={TOOLS.slice(9, 17)} rev/><ToolRow list={TOOLS.slice(17)}/></div>
        <div className="wrap">
          <div className="groups">{GROUPS.map(g => (
            <Tilt className="grp" key={g.h}><h3><span><I n={g.i}/></span>{g.h}</h3><ul>{g.items.map(([t, ic]) => (b => <li key={t} className={b ? 'brd' : ''} style={b ? {'--b': BR[b].c} : undefined}>{b ? <Logo b={b}/> : <I n={ic}/>}{t}</li>)(brandOf(t)))}</ul></Tilt>
          ))}</div>
          <div className="comp">{COMP.map(c => <span key={c}>{c}</span>)}</div>
        </div>
      </section>

      <section className="band dark" id="about"><div className="wrap about">
        <div className="frame">
          <div className="bg"/>
          <img src="img/photo.webp" alt="" loading="lazy"/>
          <div className="chipfall">
            <span style={{left:'-7%',top:'56%',transform:'rotate(-8deg)','--r2':'-4deg'}}>Meta Ads</span>
            <span className="gd" style={{right:'-7%',top:'46%',transform:'rotate(7deg)','--r2':'10deg',animationDelay:'-1s'}}>Lead generation</span>
            <span className="gd" style={{left:'-4%',top:'73%',transform:'rotate(5deg)','--r2':'2deg',animationDelay:'-2s'}}>SEO</span>
            <span style={{right:'-5%',top:'66%',transform:'rotate(-6deg)','--r2':'-9deg',animationDelay:'-3s'}}>Google Ads</span>
            <span style={{left:'6%',top:'90%',transform:'rotate(-4deg)','--r2':'-7deg',animationDelay:'-1.6s'}}>Print & TV</span>
            <span className="gd" style={{right:'4%',top:'88%',transform:'rotate(4deg)','--r2':'7deg',animationDelay:'-2.4s'}}>Social media</span>
          </div>
        </div>
        <div>
          <Eyebrow>About me</Eyebrow>
          <h2>Who is <span className="g">Sanjeeth Kumar?</span></h2>
          <p>A digital and creative marketer with 2+ years across performance advertising, integrated campaigns, branding, content, graphic design, video production and lead generation.</p>
          <p>I plan and run Meta and Google Ads, newspaper and TV campaigns, ATL and BTL activity, SEO and social media, and I make the creatives that run in them. I've coordinated vendors, negotiated quotations, managed media placements and worked directly with clients. Today I edit video at AVG Primetech and consult on marketing for TS Techy.</p>
          <div className="nums"><div><b>2+ yrs</b><span>marketing & creative</span></div><div><b>5</b><span>brands worked with</span></div><div><b>3</b><span>newspapers placed</span></div></div>
          <div className="sig"><a className="btn" href="sanjeethkumar-cv.pdf" target="_blank" rel="noopener">Download CV <i><I n="arrow"/></i></a><a className="btn dk" href="#contact">Let's talk <i><I n="arrow"/></i></a><em>Sanjeeth</em></div>
        </div>
      </div></section>

      <section className="band" id="experience"><div className="wrap">
        <Eyebrow>Experience</Eyebrow><h2>Where I've <span className="g">worked</span></h2>
        <div className="xp">{JOBS.map(j => (
          <div key={j.id} className={'job' + (j.now ? ' now' : '')}>
            <span className="lg" style={{background:LBG(j.id)}}><img src={LOGO[j.id]} alt={j.co + ' logo'} loading="lazy"/></span>
            <Tilt className="card" max={3}>
              <div className="jh"><h3>{j.role}</h3><span className="date">{j.when}</span></div>
              <div className="co">{j.co} · {j.where}</div>
              <ul>{j.pts.map(p => <li key={p}>{p}</li>)}</ul>
              {j.camp && <div className="camp"><b>{j.camp.t}</b>{j.camp.d}</div>}
            </Tilt>
          </div>
        ))}</div>
      </div></section>

      <section className="band" id="campaigns" style={{paddingTop:0}}><div className="wrap">
        <Eyebrow>Campaigns</Eyebrow><h2>Selected <span className="g">work</span></h2>
        <div className="cards">
          <Tilt className="cc" max={8}><div className="art"><img src="img/aalam-ad.webp" alt="Aalam Senior Living ad by StepsStone: Luxury senior living from ₹37L onwards" loading="lazy"/></div><div className="tx">
            <h3>Srinivasa Palms, Phase 2</h3>
            <p>Mid-Launch Special Offer Event for a luxury senior living community near Pollachi, March 13–15, 2026 at Fairfield by Marriott, Coimbatore. Creatives, media coordination and event promotion across digital and traditional channels.</p>
            <div className="tgs">{['Meta Ads','Google Ads','Newspaper','Television','Event'].map(t => <span key={t}>{t}</span>)}</div>
          </div></Tilt>
          <div className="cc"><div className="art"><video src="media/avanga-tv-ad.mp4" poster="img/avanga-poster.webp" controls playsInline preload="none" aria-label="TV ad, 29 seconds"></video><span className="len">TV ad · 0:29</span></div><div className="tx">
            <h3>Avanga Paathu Panga</h3>
            <p>End-to-end branding and marketing campaign across print, digital and advertising. Designed newspaper and TV ads, hoardings, posters and social creatives with one consistent brand identity.</p>
            <div className="tgs">{['Branding','Newspaper ads','TV ads','Hoardings','Social'].map(t => <span key={t}>{t}</span>)}</div>
          </div></div>
        </div>
        <div style={{marginTop:26}}><a className="btn" href="https://drive.google.com/drive/folders/1yYnsy01--KET6TybK1a1zKqZ3tM5W8T8" target="_blank" rel="noopener">View full portfolio on Google Drive <i><I n="arrow"/></i></a></div>
        <div className="edu">
          <div><strong>BCA, Cyber Security</strong><small>Currently pursuing</small></div>
          <div><strong>Higher Secondary Certificate</strong><small>Tamil Nadu State Board · 2021–2022</small></div>
          <div><strong>UI/UX Design Certification</strong><small>SDLC Institute, Coimbatore · 2024–2025</small></div>
        </div>
      </div></section>

      <Creatives/>

      <div className="mq" style={{height:110}}><Ticker items={TICKER} cls="a"/></div>

      <footer className="band dark foot" id="contact" style={{borderTop:0}}><div className="wrap">
        <Eyebrow>Contact</Eyebrow>
        <h2>Let's build your <span className="g">next campaign</span></h2>
        <div className="contact">
          <div><span className="ci"><I n="mail"/></span><small>Email</small><a href="mailto:2023sanjeeth@gmail.com">2023sanjeeth@gmail.com</a><br/><button className="copy" onClick={() => copy('2023sanjeeth@gmail.com', 'e')}>{copied === 'e' ? 'Copied' : 'Copy email'}</button></div>
          <div><span className="ci"><I n="phone"/></span><small>Phone</small><span>+91 78456 92501</span><br/><button className="copy" onClick={() => copy('+917845692501', 'p')}>{copied === 'p' ? 'Copied' : 'Copy number'}</button></div>
          <div><span className="ci"><I n="link"/></span><small>LinkedIn</small><a href="https://www.linkedin.com/in/sanjeeth-kumar-s-n" target="_blank" rel="noopener">in/sanjeeth-kumar-s-n</a></div>
          <div><span className="ci"><I n="map"/></span><small>Based in</small><span>Bengaluru, Karnataka, India</span></div>
        </div>
        <div className="cvrow" style={{marginTop:24}}><a className="btn" href="sanjeethkumar-cv.pdf" target="_blank" rel="noopener">Download my CV (PDF) <i><I n="arrow"/></i></a></div>
        {copied === 'fail' && <p className="fine">Copy isn't allowed here. Select the text above instead.</p>}
        <div className="fine"><span>© 2026 Sanjeeth Kumar</span><span>Full portfolio of creatives and videos: <a href="https://drive.google.com/drive/folders/1yYnsy01--KET6TybK1a1zKqZ3tM5W8T8" target="_blank" rel="noopener">Google Drive</a></span></div>
      </div></footer>
    </>
  );
}

export default App;
