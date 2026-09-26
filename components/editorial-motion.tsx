'use client';
import {useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export function EditorialMotion(){useEffect(()=>{let ctx:gsap.Context|undefined;const setup=()=>{ctx?.revert();if(document.documentElement.classList.contains('reduced-motion'))return;ctx=gsap.context(()=>{gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el=>gsap.fromTo(el,{y:25},{y:0,ease:'none',scrollTrigger:{trigger:el,start:'top 95%',end:'top 55%',scrub:true}}));gsap.utils.toArray<HTMLElement>('[data-parallax] img').forEach(el=>gsap.fromTo(el,{scale:1.05},{scale:1,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:true}}))})};setup();window.addEventListener('elora-motion',setup);return()=>{ctx?.revert();window.removeEventListener('elora-motion',setup)}},[]);return null}
