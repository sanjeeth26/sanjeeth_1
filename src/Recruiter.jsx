import React, { useEffect, useRef, useState } from 'react';
import { track } from './track.js';
import './recruiter.css';

// "Work with me": two paths side by side.
//   Freelance, projects & consulting  → /#freelance
//   Hiring for a full-time role        → /#recruiter
// Plus a sticky bar with "Start a project" and CV once the visitor scrolls.
const CV = 'sanjeethkumar-cv.pdf';
const wa = msg => 'https://wa.me/917845692501?text=' + encodeURIComponent(msg);
const WA_PROJECT = wa('Hi Sanjeeth, I saw your portfolio. I have a project and would like to discuss it with you.');
const WA_ROLE = wa('Hi Sanjeeth, I saw your portfolio and would like to talk about a role.');
const MAIL_PROJECT = 'mailto:2023sanjeeth@gmail.com?subject=' + encodeURIComponent('Project enquiry from your portfolio');

const OFFERS = [
  ['GTM launch plan', 'Market and competitor research, audience, offer and pricing, channel mix and a 90-day launch calendar.'],
  ['Lead generation setup', 'Meta and Google lead campaigns, landing page or form, Pixel, GA4 and Tag Manager tracking, weekly reports.'],
  ['Ad creatives & content', 'Feed, story and display creatives, reels and ad copy in English and Tamil, built for your brand.'],
  ['AI video reels', 'Script, AI-generated footage, editing in Premiere Pro and motion graphics in After Effects.'],
  ['Print, TV & outdoor', 'Newspaper, TV and hoarding plans, vendor quotes and negotiation, and dated proof of display.'],
  ['Marketing consulting', 'A review of your current marketing, then clear advice on positioning, pricing and what to fix first.'],
];
const MODELS = [['One-off project', 'Fixed scope, timeline and quote'], ['Monthly retainer', 'Ongoing campaigns and content'], ['Consulting sessions', 'Strategy calls and reviews']];
const STEPS = ['Short call to understand your goal', 'Proposal with scope, timeline and quote', 'Execution with weekly updates', 'Report on results and next steps'];

const FACTS = [
  ['Target role', 'GTM Lead · Growth / Performance Marketer'],
  ['Experience', '2+ years · 5 brands · real estate, auto, tech, agency'],
  ['Based in', 'Bengaluru, India'],
  ['Education', 'BCA, Cyber Security (pursuing) · UI/UX certification'],
];
const PROOF = [['13', 'ad creatives'], ['4', 'hoarding sites'], ['3 + 1', 'newspapers + TV'], ['4', 'AI reels']];

const Ic = ({ d }) => <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>;
const DOC = <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M12 12v6M9 15l3 3 3-3"/></>;
const CHAT = <><path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5A8 8 0 1 1 21 12z"/></>;
const MAIL = <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></>;
const LINK = <><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></>;
const TICK = <><path d="M5 12l5 5L20 7"/></>;

export function RecruiterCard() {
  const ref = useRef(null);
  const [copied, setCopied] = useState('');
  useEffect(() => {
    if (!('IntersectionObserver' in window) || !ref.current) return;
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { track('work_with_me_view'); io.disconnect(); } }, { threshold: .4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const copyLink = async hash => {
    try { await navigator.clipboard.writeText(location.origin + '/#' + hash); setCopied(hash); setTimeout(() => setCopied(''), 1800); } catch { setCopied(''); }
  };
  return (
    <section className="band rec" id="recruiter" ref={ref}><div className="wrap">
      <div className="whead">
        <div><span className="rtag dkt">Work with me</span><h2>Hire me for a <span className="g">role</span>, a <span className="g">project</span> or <span className="g">advice</span></h2></div>
        <span className="ropen lt"><i/>Open to roles, projects & consulting</span>
      </div>
      <div className="wgrid">
        <div className="fcard" id="freelance">
          <span className="rtag">Freelance, projects & consulting</span>
          <h3>Need a campaign, a launch or a second opinion?</h3>
          <p className="flede">I plan it, make the creatives and run it, so you work with one person from strategy to results.</p>
          <div className="offers">{OFFERS.map(([t, d]) => <div key={t}><b><Ic d={TICK}/>{t}</b><span>{d}</span></div>)}</div>
          <div className="models">{MODELS.map(([t, d]) => <div key={t}><b>{t}</b><span>{d}</span></div>)}</div>
          <ol className="fsteps">{STEPS.map(s => <li key={s}>{s}</li>)}</ol>
          <div className="racts">
            <a className="btn wa" href={WA_PROJECT} target="_blank" rel="noopener" data-intent="project"><Ic d={CHAT}/>Discuss a project on WhatsApp</a>
            <a className="btn w" href={MAIL_PROJECT} data-intent="project"><Ic d={MAIL}/>Email a brief</a>
            <button className="rcopy dk" type="button" onClick={() => copyLink('freelance')}>{copied === 'freelance' ? 'Link copied' : 'Copy link to this'}</button>
          </div>
        </div>
        <div className="rcard">
          <span className="rtag">Hiring for a full-time role · 60-second summary</span>
          <h3>Sanjeeth Kumar, <span className="g">GTM Lead</span></h3>
          <p className="rlede">Plans and runs go-to-market and lead generation across digital, print, TV and outdoor, and makes the creatives himself.</p>
          <dl className="rfacts">{FACTS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          <div className="rproof">{PROOF.map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}</div>
          <div className="racts">
            <a className="btn" href={CV} target="_blank" rel="noopener">Download CV <i><Ic d={DOC}/></i></a>
            <a className="btn w" href={WA_ROLE} target="_blank" rel="noopener" data-intent="role"><Ic d={CHAT}/>WhatsApp</a>
            <a className="btn w" href="https://www.linkedin.com/in/sanjeeth-kumar-s-n" target="_blank" rel="noopener"><Ic d={LINK}/>LinkedIn</a>
            <button className="rcopy" type="button" onClick={() => copyLink('recruiter')}>{copied === 'recruiter' ? 'Link copied' : 'Copy link to this'}</button>
          </div>
        </div>
      </div>
    </div></section>
  );
}

export function StickyBar() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    // Phones: show the bar only while scrolling up, so it never sits on top of what someone is reading.
    // Hidden while the "Work with me" section (which has the same buttons) or the contact footer is on screen.
    let last = scrollY;
    const f = () => {
      const y = scrollY, up = y < last - 4, down = y > last + 4;
      last = y;
      const vis = el => { const r = el && el.getBoundingClientRect(); return r && r.top < innerHeight && r.bottom > 0; };
      const busy = vis(document.getElementById('contact')) || vis(document.getElementById('recruiter'));
      const phone = innerWidth < 700;
      setOn(prev => {
        if (y < innerHeight * 0.9 || busy) return false;
        if (!phone) return true;
        return up ? true : down ? false : prev;
      });
    };
    f(); addEventListener('scroll', f, { passive: true });
    return () => removeEventListener('scroll', f);
  }, []);
  return (
    <div className={'rbar' + (on ? ' on' : '')} aria-hidden={!on}>
      <span className="rbn"><b>Sanjeeth Kumar</b> · GTM & growth</span>
      <a href={WA_PROJECT} target="_blank" rel="noopener" tabIndex={on ? 0 : -1} data-intent="project">Start a project</a>
      <a href={CV} target="_blank" rel="noopener" tabIndex={on ? 0 : -1}>CV</a>
    </div>
  );
}
