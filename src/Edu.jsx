import React from 'react';
import './edu.css';

// Education & certification, shown as its own highlighted timeline.
const Ico = ({ d }) => <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>;
const CAP = <><path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/><path d="M22 9v6"/></>;
const PEN = <><path d="M12 19l7-7 3 3-7 7z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z"/><path d="M2 2l7.6 7.6"/><circle cx="11" cy="11" r="2"/></>;
const SHIELD = <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></>;

const EDU = [
  { y:'2021 – 2022', k:'School', t:'Higher Secondary Certificate (HSC)', o:'Tamil Nadu State Board', i:CAP,
    d:'Completed higher secondary education, the base for everything that followed.' },
  { y:'2024 – 2025', k:'Certification', t:'UI/UX Design Certification', o:'SDLC Institute, Coimbatore', i:PEN,
    d:'User-centred design, layouts and visual hierarchy. I use it in landing pages, ad creatives and this website.',
    tags:['User research','Wireframing','Visual hierarchy','Figma'] },
  { y:'Currently pursuing', k:'Degree', t:'BCA, Cyber Security', o:'Bachelor of Computer Applications', i:SHIELD, now:true,
    d:'Computer applications with a cyber security focus. It helps me work confidently with tracking, data and the tech side of marketing.',
    tags:['Computer applications','Cyber security','Data & privacy'] },
];

export default function Edu() {
  return (
    <section className="band dark edux" id="education"><div className="wrap">
      <div className="sh"><div><div className="eyebrow"><i><b/><b/></i>Education</div><h2>What I've <span className="g">studied</span></h2></div>
        <p className="fl-lede">A design certification and a cyber security degree in progress, alongside two years of hands-on marketing work.</p></div>
      <ol className="etl">{EDU.map(e => (
        <li key={e.t} className={'ec' + (e.now ? ' now' : '')}>
          <span className="edot" aria-hidden="true"/>
          <div className="etop"><span className="eic"><Ico d={e.i}/></span><span className="ey">{e.y}</span></div>
          <small className="ek">{e.k}</small>
          <h3>{e.t}</h3>
          <div className="eo">{e.o}</div>
          <p>{e.d}</p>
          {e.tags && <div className="etags">{e.tags.map(t => <span key={t}>{t}</span>)}</div>}
          {e.now && <span className="elive"><i/>In progress</span>}
        </li>
      ))}</ol>
    </div></section>
  );
}
