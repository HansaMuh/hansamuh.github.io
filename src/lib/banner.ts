// The hero banner's first frame. It lives here rather than in hero-banner.tsx because the
// layout's head script needs it too, and a server component that imports from a
// "use client" module gets a client reference, not the string.
export const BANNER_POSTER = "/videos/banner-poster.webp";

// Runs in <head> before the body paints. Until the poster has decoded, <html> carries
// `banner-wait`, which globals.css uses to keep the hero on the plain page colour:
// without it the dark scrim sat over the empty page and showed as grey. The timeout
// means a slow or missing image can delay the hero, never blank it.
export const BANNER_WAIT_SCRIPT = `(function(){var d=document.documentElement;var done=function(){d.classList.remove("banner-wait")};try{d.classList.add("banner-wait");var i=new Image();i.fetchPriority="high";i.src=${JSON.stringify(BANNER_POSTER)};i.decode().then(done,done);setTimeout(done,2500)}catch(e){done()}})();`;
