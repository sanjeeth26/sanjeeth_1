import React, { useEffect, useRef, useState } from 'react';
import { track } from './track.js';
import './recruiter.css';

// A 60-second summary for recruiters, reachable directly at /#recruiter,
// plus a sticky bar with CV and WhatsApp once the visitor scrolls.
const CV = 'sanjeethkumar-cv.pdf';
const WA = 'https://wa.me/917845692501?text=' + encodeURIComponent('Hi Sanjeeth, I saw your portfolio and would like to talk about a role.');

const FACTS = [
  ['Target role', 'GTM Lead · Growth / Performance Marketer'],
  ['Experience', '2+ years · 5 brands · real estate, auto, tech, agency'],
  ['Based in', 'Bengaluru, India'],
  ['Education', 'BCA, Cyber Security (pursuing) · UI/UX certification'],
];
const PROOF = [
  ['13', 'Meta & Google ad creatives'],
  ['4', 'hoarding sites in 2 flights'],
  ['3 + 1', 'newspapers + TV channel'],
  ['4', 'AI video reels'],
];
const SKILLS = ['Go-to-market strategy', 'Meta Ads', 'Google Ads', 'Lead generation', 'Branding', 'ATL & BTL media', 'Video & motion'];

const Ic = ({ d }) => <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>;
const DOC = <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M12 12v6M9 15l3 3 3-3"/></>;
const CHAT = <><path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5A8 8 0 1 1 21 12z"/></>;
const MAIL = <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></>;
const LINK = <><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></>;

export function RecruiterCard() {
  const ref = useRef(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!('IntersectionObserver' in window) || !ref.current) return;
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { track('recruiter_view'); io.disconnect(); } }, { threshold: .5 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(location.origin + '/#recruiter'); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { setCopied(false); }
  };
  return (
    <section className="band rec" id="recruiter" ref={ref}><div className="wrap">
      <div className="rcard">
        <div className="rhead">
          <div><span className="rtag">For recruiters · 60-second summary</span><h2>Sanjeeth Kumar, <span className="g">GTM Lead</span></h2>
            <p className="rlede">Plans and runs go-to-market and lead generation across digital, print, TV and outdoor, and makes the creatives himself.</p></div>
          <span className="ropen"><i/>Open to GTM & growth marketing roles</span>
        </div>
        <dl className="rfacts">{FACTS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
        <div className="rproof">{PROOF.map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}</div>
        <div className="rskills">{SKILLS.map(s => <span key={s}>{s}</span>)}</div>
        <div className="racts">
          <a className="btn" href={CV} target="_blank" rel="noopener">Download CV <i><Ic d={DOC}/></i></a>
          <a className="btn w" href={WA} target="_blank" rel="noopener"><Ic d={CHAT}/>WhatsApp</a>
          <a className="btn w" href="mailto:2023sanjeeth@gmail.com"><Ic d={MAIL}/>Email</a>
          <a className="btn w" href="https://www.linkedin.com/in/sanjeeth-kumar-s-n" target="_blank" rel="noopener"><Ic d={LINK}/>LinkedIn</a>
          <button className="rcopy" type="button" onClick={copyLink}>{copied ? 'Link copied' : 'Copy link to this summary'}</button>
        </div>
      </div>
    </div></section>
  );
}

export function StickyBar() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const f = () => {
      const foot = document.getElementById('contact');
      const nearFoot = foot && foot.getBoundingClientRect().top < innerHeight;
      setOn(scrollY > innerHeight * 0.9 && !nearFoot);
    };
    f(); addEventListener('scroll', f, { passive: true });
    return () => removeEventListener('scroll', f);
  }, []);
  return (
    <div className={'rbar' + (on ? ' on' : '')} aria-hidden={!on}>
      <span className="rbn"><b>Sanjeeth Kumar</b> · GTM Lead</span>
      <a href={CV} target="_blank" rel="noopener" tabIndex={on ? 0 : -1}>CV</a>
      <a href={WA} target="_blank" rel="noopener" tabIndex={on ? 0 : -1}>WhatsApp</a>
    </div>
  );
}
