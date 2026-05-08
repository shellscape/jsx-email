import{j as s,F as o}from"./fade-block.B01BZyD9.js";const n=({children:r,className:t="",durationSeconds:i=30,pauseOnHover:l=!1})=>{const a=["flex min-w-full shrink-0 items-center justify-around","[animation:jsx-email-marquee-scroll_var(--marquee-duration)_linear_infinite]",l&&"group-hover:[animation-play-state:paused]"].filter(Boolean).join(" ");return s.jsxs("div",{className:`group flex w-full overflow-hidden ${t}`,style:{"--marquee-duration":`${i}s`},children:[s.jsx("style",{children:`
          @keyframes jsx-email-marquee-scroll {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(-100%);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            [style*="--marquee-duration"] > * {
              animation-play-state: paused;
            }
          }
        `}),s.jsx("div",{className:a,children:r}),s.jsx("div",{className:a,"aria-hidden":"true",children:r})]})},e=({href:r,src:t})=>s.jsx("a",{href:r,target:"_blank",rel:"noreferrer",className:"inline-block mx-10 md:mx-20",children:s.jsx("img",{src:`/assets/trusted-by/${t}`,className:"w-auto h-16"})}),c=()=>s.jsx(o,{className:"faq",visibilityAmount:.4,children:s.jsxs(n,{pauseOnHover:!0,children:[s.jsx(e,{href:"https://sst.dev",src:"sst-dev.svg"}),s.jsx(e,{href:"https://rally.space",src:"rally-space.svg"}),s.jsx(e,{href:"https://biblish.com/",src:"biblish.svg"}),s.jsx(e,{href:"https://estii.com/",src:"estii.svg"}),s.jsx(e,{href:"https://helphero.co/",src:"helphero.svg"}),s.jsx(e,{href:"https://www.konduktum.com/",src:"konduktum.svg"}),s.jsx(e,{href:"https://requestmetrics.com",src:"request-metrics.svg"})]})});export{c as TrustedBy};
