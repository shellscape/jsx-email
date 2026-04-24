import { ImageType, type ISponsor } from "@/types";

export const customSponsors: ISponsor[] = [
  {
    tier: {
      name: "$100 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "val.town",
      name: "Val Town",
      avatarUrl:
        '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400" fill="none"><rect width="400" height="400" fill="white"/><g clip-path="url(#clip0_1045_835)"><path d="M265.026 271.002C257.83 271.002 251.994 268.767 247.518 264.293C243.038 259.821 240.802 253.841 240.802 246.363V184.761H226.364V161.881H240.802V128H268.548V161.881H298.5V184.761H268.548V241.521C268.548 245.921 270.604 248.123 274.716 248.123H295.856V271.002H265.026Z" fill="black"/><path d="M204.362 174.325L158.23 250.768H154.266V178.601C154.266 169.37 146.776 161.887 137.536 161.887H126.518V253.01C126.518 262.95 134.586 271.01 144.536 271.01H163.396C173.396 271.01 182.638 265.682 187.64 257.03L242.664 161.887H226.404C217.384 161.887 209.02 166.606 204.362 174.325Z" fill="black"/><path d="M99.9939 161.887H127.8V184.769H99.9939V161.887Z" fill="black"/></g><defs><clipPath id="clip0_1045_835"><rect width="200" height="143.86" fill="white" transform="translate(100 128)"/></clipPath></defs></svg>',
    },
    createdAt: "2023-04-03T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
    lightStyle: {
      filter: "invert(1)",
    },
  },
  {
    tier: {
      name: "$150 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "kinde.com",
      name: "Kinde",
      avatarUrl: "/images/kinde.jpeg",
    },
    createdAt: "2023-06-11T12:32:16Z",
    isActive: true,
    imageType: ImageType.IMAGE,
  },
  {
    tier: {
      name: "$100 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "zolplay.com",
      name: "Zolplay",
      avatarUrl: "/images/zolplay.jpeg",
    },
    createdAt: "2023-06-11T13:32:16Z",
    isActive: true,
    imageType: ImageType.IMAGE,
  },
  {
    tier: {
      name: "$1,000 one time",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/turso",
      name: "Turso",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    createdAt: "2023-12-21T15:51:27Z",
    isActive: true,
    imageType: ImageType.SVG,
    popover:
      "🚀 Drizzle is giving you 10% off Turso Scaler and Pro for 1 Year 🚀",
    darkStyle: {
      background:
        'url("/svg/new-turso-light.svg") 0% 0% / cover no-repeat content-box',
    },
    lightStyle: {
      background:
        'url("/svg/new-turso.svg") 0% 0% / cover no-repeat content-box',
    },
  },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/payload",
      name: "Payload",
      avatarUrl:
        '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.00425 9.14649C7.09439 9.09438 7.20349 9.09432 7.29123 9.14649L17.1724 14.8535C17.2768 14.9152 17.343 15.0268 17.343 15.1501V18.2253C17.343 18.3582 17.1981 18.4416 17.0842 18.3751L8.87371 13.6336C8.77884 13.5794 8.66014 13.6484 8.66014 13.7575V20.0599C8.66018 20.1619 8.7148 20.2547 8.80252 20.3069L15.874 24.3884L15.8718 24.3832C15.9619 24.4354 16.071 24.4353 16.1587 24.3832L21.6596 21.2086C21.7664 21.1469 21.8969 21.1469 22.0037 21.2086L24.6614 22.7436C24.7753 22.8101 24.7753 22.9738 24.6614 23.0403L16.1424 27.9597C16.0524 28.0118 15.9432 28.0118 15.8554 27.9597L5.71098 22.1029C5.62318 22.0531 5.5686 21.958 5.5686 21.856V10.1409C5.5686 10.0389 5.62318 9.94618 5.71098 9.89398L7.00425 9.14649Z" fill="black"/><path d="M15.8554 4.03793C15.9456 3.98574 16.0546 3.98573 16.1424 4.03793L26.2891 9.89398V9.8962C26.3769 9.94602 26.4314 10.0411 26.4315 10.1431V19.8961C26.4315 20.0289 26.2866 20.1123 26.1727 20.0459L23.5439 18.5272C23.4395 18.4655 23.3726 18.3539 23.3726 18.2305V11.8947C23.3726 11.7927 23.318 11.7 23.2302 11.6478L16.1587 7.56624C16.0686 7.51412 15.9595 7.51407 15.8718 7.56624L13.4706 8.95221C13.3639 9.01386 13.2333 9.01376 13.1265 8.95221L10.4925 7.43128C10.3786 7.36483 10.3786 7.2011 10.4925 7.13466L15.8554 4.03793Z" fill="black"/></svg>',
    },
    createdAt: "2023-06-11T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      filter: "invert(1)",
    },
  },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: true,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/xataio",
      name: "Xata",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1054.35 379.14C1054.24 469.137 1018.35 555.408 954.56 618.971V618.964L728.273 844.45C720.432 852.27 707.693 852.29 700.346 844.01C645.331 782.018 614.758 701.838 614.856 618.535C614.961 528.538 650.856 442.268 714.643 378.705L714.65 378.711L921.39 172.697C940.02 154.128 970.51 153.996 986.31 175.022C1030.3 233.547 1054.44 305.11 1054.35 379.14Z" fill="url(#paint0_linear_202_71)"/><path d="M244.786 620.345C180.999 556.782 145.105 470.512 145 380.515C144.913 306.485 169.048 234.921 213.035 176.396C228.838 155.37 259.328 155.503 277.963 174.072L484.703 380.088L484.71 380.081C548.497 443.645 584.391 529.914 584.497 619.912C584.594 703.214 554.022 783.395 499.007 845.38C491.659 853.66 478.92 853.64 471.08 845.83L244.793 620.339L244.786 620.345Z" fill="url(#paint1_linear_202_71)"/><path d="M946.05 1023.83C929.42 1044.22 899.02 1044.04 880.42 1025.42L752.727 897.58C744.891 889.73 744.906 877.02 752.76 869.19L964.85 657.848C972.69 650.035 985.48 649.989 992.39 658.632C1029.2 704.628 1043.68 768.198 1032.74 838.18C1022.72 902.24 992.08 967.37 946.05 1023.83Z" fill="url(#paint2_linear_202_71)"/><path d="M318.931 1026.8C300.337 1045.41 269.929 1045.59 253.305 1025.2C207.269 968.74 176.633 903.62 166.617 839.56C155.675 769.571 170.149 706.001 206.959 660.005C213.876 651.363 226.663 651.408 234.504 659.221L446.595 870.57C454.449 878.39 454.464 891.11 446.629 898.95L318.931 1026.8Z" fill="url(#paint3_linear_202_71)"/><defs><linearGradient id="paint0_linear_202_71" x1="599.676" y1="158.999" x2="599.676" y2="859.4" gradientUnits="userSpaceOnUse"><stop stop-color="#9F87FF"/><stop offset="1" stop-color="#8566FF"/></linearGradient><linearGradient id="paint1_linear_202_71" x1="599.676" y1="159" x2="599.676" y2="859.4" gradientUnits="userSpaceOnUse"><stop stop-color="#9F87FF"/><stop offset="1" stop-color="#8566FF"/></linearGradient><linearGradient id="paint2_linear_202_71" x1="599.676" y1="643.766" x2="599.676" y2="1039.93" gradientUnits="userSpaceOnUse"><stop stop-color="#DE99F6"/><stop offset="1" stop-color="#D669FC"/></linearGradient><linearGradient id="paint3_linear_202_71" x1="599.676" y1="643.766" x2="599.676" y2="1039.93" gradientUnits="userSpaceOnUse"><stop stop-color="#DE99F6"/><stop offset="1" stop-color="#D669FC"/></linearGradient></defs></svg>',
    },
    createdAt: "2023-06-11T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
  },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/neon",
      name: "Neon",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    createdAt: "2023-11-16T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      background:
        'url("/svg/neon-dark.svg") 0% 0% / cover no-repeat content-box',
      padding: "10px",
    },
    lightStyle: {
      background:
        'url("/svg/neon-light.svg") 0% 0% / cover no-repeat content-box',
      padding: "10px",
    },
  },
  {
    tier: {
      name: "$250 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/silver-sponsor-unkey",
      name: "Unkey",
      avatarUrl: "/images/unkey.jpeg",
    },
    createdAt: "2023-06-11T13:32:16Z",
    isActive: true,
    imageType: ImageType.IMAGE,
  },
  {
    tier: {
      name: "$250 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/silver-sponsor-tidb",
      name: "TiDB",
      avatarUrl:
        '<svg xmlns="http://www.w3.org/2000/svg" width="57" height="65" viewBox="0 0 57 65" fill="none"><path d="M0.849609 16.3821V48.3821L28.5617 64.3838L56.2739 48.3821V16.3821L28.5617 0.383789L0.849609 16.3821Z" fill="#E60C0C"/><path d="M28.5457 11.0675L10.1416 21.6944V32.318L19.3469 27.0029V48.3959L28.5457 53.701V21.6911L37.7477 16.3793L28.5457 11.0675Z" fill="white"/><path d="M37.7998 27.0562V48.3829L47.0383 43.0512V21.7179L37.7998 27.0562Z" fill="white"/></svg>',
    },
    createdAt: "2023-11-16T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
  },
  {
    tier: {
      name: "$250 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/silver-sponsor-logto",
      name: "Logto",
      avatarUrl:
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" fill="#141420"/><mask id="mask0_152_11" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="5" y="4" width="14" height="16"><path d="M18.3333 4H5V20H18.3333V4Z" fill="white"/></mask><g mask="url(#mask0_152_11)"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 6.49834C5 6.03863 5 5.80878 5.08914 5.62377C5.1677 5.46073 5.29403 5.32254 5.4531 5.22567C5.63361 5.11575 5.87359 5.08312 6.35354 5.01787L13.1986 4.0872C13.8199 4.00272 14.1306 3.96048 14.372 4.04967C14.5839 4.12796 14.7608 4.27331 14.8726 4.46109C15 4.675 15 4.97256 15 5.56767V18.4323C15 19.0274 15 19.325 14.8726 19.5389C14.7608 19.7267 14.5839 19.872 14.372 19.9503C14.1306 20.0395 13.8199 19.9973 13.1986 19.9128L6.35354 18.9821C5.8736 18.9169 5.6336 18.8842 5.4531 18.7743C5.29403 18.6775 5.1677 18.5393 5.08914 18.3762C5 18.1912 5 17.9614 5 17.5017V6.49834ZM12.3333 10.8359C12.3333 10.696 12.3333 10.626 12.3568 10.5706C12.3775 10.5219 12.4108 10.4812 12.4522 10.4537C12.4993 10.4225 12.5616 10.4161 12.6861 10.4035L13.2437 10.3467C13.3904 10.3318 13.4637 10.3243 13.5204 10.3517C13.5701 10.3758 13.6113 10.4178 13.6372 10.4711C13.6667 10.5318 13.6667 10.6143 13.6667 10.7792V13.2208C13.6667 13.3857 13.6667 13.4682 13.6372 13.5289C13.6113 13.5822 13.5701 13.6242 13.5204 13.6483C13.4637 13.6757 13.3904 13.6682 13.2437 13.6533L12.6861 13.5965C12.5616 13.5839 12.4993 13.5775 12.4522 13.5463C12.4108 13.5188 12.3775 13.4781 12.3568 13.4294C12.3333 13.374 12.3333 13.304 12.3333 13.1641V10.8359ZM16.8815 5.66667H16V18.6667H16.8815C17.3897 18.6667 17.6438 18.6667 17.8379 18.5675C18.0086 18.4802 18.1474 18.341 18.2344 18.1698C18.3333 17.9751 18.3333 17.7203 18.3333 17.2107V7.12267C18.3333 6.61302 18.3333 6.35819 18.2344 6.16354C18.1474 5.99231 18.0086 5.8531 17.8379 5.76585C17.6438 5.66667 17.3897 5.66667 16.8815 5.66667Z" fill="url(#paint0_linear_152_11)"/></g><defs><linearGradient id="paint0_linear_152_11" x1="0.873017" y1="15.0651" x2="17.2965" y2="8.35123" gradientUnits="userSpaceOnUse"><stop stop-color="#4B2EFB"/><stop offset="1" stop-color="#E65FFC"/></linearGradient></defs></svg>',
    },
    createdAt: "2023-06-11T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
  },
  // {
  //   tier: {
  //     name: "$1000 a month",
  //     isOneTime: false,
  //   },
  //   sponsorEntity: {
  //     __typename: "Organization",
  //     login: "driz.link/hydraso",
  //     name: "Hydra",
  //     avatarUrl:
  //       '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
  //   },
  //   createdAt: "2024-06-07T13:32:16Z",
  //   isActive: true,
  //   imageType: ImageType.SVG,
  //   darkStyle: {
  //     background:
  //       'url("/images/hydra-orange.png") 0% 0% / cover no-repeat content-box',
  //   },
  //   lightStyle: {
  //     background:
  //       'url("/images/hydra-black.png") 0% 0% / cover no-repeat content-box',
  //   },
  // },
  // {
  //   tier: {
  //     name: "$1000 a month",
  //     isOneTime: false,
  //   },
  //   sponsorEntity: {
  //     __typename: "Organization",
  //     login: "driz.link/decocx",
  //     name: "Deco",
  //     avatarUrl: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  //       <path d="M6.77828 19.8642C4.2582 19.8642 2.25696 18.9006 1.07104 17.1959C-0.189006 15.417 -0.337247 12.8969 0.626315 10.2286C1.96048 6.74493 5.14764 4.59545 9.00189 4.59545H9.07601C9.07601 4.52133 9.07601 4.44721 9.07601 4.29897C9.00189 3.03893 9.81721 1.92712 11.0031 1.55652L14.4868 0.22236C14.8574 0.0741201 15.228 0 15.5986 0C16.7104 0 17.7481 0.592961 18.2669 1.63064L19.6752 4.59545C20.1199 5.48489 20.1199 6.59669 19.6011 7.41201C19.0822 8.22733 18.2669 8.67205 17.3775 8.74618C17.1551 9.1909 17.0069 9.63562 16.7845 10.0062C16.3398 11.0439 15.8951 12.0816 15.3762 13.1934C13.4491 17.1959 11.2996 19.8642 6.77828 19.8642Z" fill="#113032"/>
  //       <path d="M6.77828 17.27C9.59484 17.27 11.1514 16.0099 13.0044 12.0816C14.0421 9.9321 14.8574 7.78261 15.8209 5.70725L17.0069 6.07785C17.3033 6.15197 17.5257 6.00373 17.3775 5.70725L15.8951 2.81656C15.8209 2.5942 15.5245 2.5942 15.3762 2.66832L11.8184 4.00248C11.522 4.0766 11.522 4.37309 11.8184 4.44721L12.8561 4.81781C11.9667 6.74493 10.929 9.70974 10.0396 11.5627C9.076 13.6381 8.63128 15.0464 6.92652 15.0464C5.22176 15.0464 4.9994 13.7863 5.7406 11.9333C6.55592 9.78385 7.89008 9.19089 9.37248 9.63561C9.8172 9.04265 10.1137 8.15321 10.2619 7.33789C9.8172 7.18965 9.29836 7.18965 8.85364 7.18965C6.40768 7.18965 3.96171 8.44969 2.92403 11.118C1.81223 14.6017 2.99815 17.27 6.77828 17.27Z" fill="#02F67C"/>
  //       </svg>`,
  //   },
  //   createdAt: "2024-06-07T13:32:16Z",
  //   isActive: true,
  //   imageType: ImageType.SVG,
  //   darkStyle: {
  //     padding: "10px",
  //   },
  //   lightStyle: {
  //     padding: "10px",
  //   },
  // },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/sqlitecloud",
      name: "SQLite Cloud",
      avatarUrl: `<svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M48.4608 27C48.4608 38.8779 38.84 48.5 26.9804 48.5C15.1209 48.5 5.5 38.8779 5.5 27C5.5 15.1221 15.1209 5.5 26.9804 5.5C38.84 5.5 48.4608 15.1221 48.4608 27Z" fill="#CFE2F8" stroke="#CFE2F8" stroke-width="11"></path>
<path d="M24.6796 12.4775C27.1916 8.34049 32.5791 7.02455 36.7128 9.53821C40.8466 12.0519 42.1612 17.4433 39.6492 21.5803L31.6724 34.7169C29.1603 38.8538 23.7728 40.1698 19.6391 37.6561C15.5053 35.1425 14.1907 29.751 16.7027 25.6141L24.6796 12.4775Z" fill="white"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M30.2892 33.8758L38.266 20.7392C40.3138 17.3667 39.2421 12.9716 35.8723 10.9225C32.5025 8.87335 28.1106 9.94611 26.0627 13.3186L18.0859 26.4552C16.0381 29.8276 17.1098 34.2227 20.4796 36.2718C23.8495 38.321 28.2414 37.2482 30.2892 33.8758ZM36.7128 9.53821C32.5791 7.02455 27.1916 8.34049 24.6796 12.4775L16.7027 25.6141C14.1907 29.751 15.5053 35.1425 19.6391 37.6561C23.7728 40.1698 29.1603 38.8538 31.6724 34.7169L39.6492 21.5803C42.1612 17.4433 40.8466 12.0519 36.7128 9.53821Z" fill="black"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M31.4389 19.6737C31.817 19.9122 31.9304 20.4122 31.6921 20.7907L16.1192 45.5232C15.881 45.9017 15.3813 46.0151 15.0031 45.7767C14.625 45.5383 14.5116 45.0382 14.7499 44.6598L30.3228 19.9272C30.561 19.5488 31.0607 19.4353 31.4389 19.6737Z" fill="black"></path>
<path fill-rule="evenodd" clip-rule="evenodd" d="M33.1051 30.9949C33.1775 31.3606 32.94 31.7158 32.5746 31.7882C27.7347 32.7478 25.313 32.1394 24.2687 31.4044C23.9641 31.19 23.8908 30.7689 24.105 30.464C24.3193 30.159 24.74 30.0857 25.0447 30.3001C25.6271 30.71 27.5811 31.4021 32.3126 30.464C32.6779 30.3915 33.0328 30.6292 33.1051 30.9949Z" fill="black"></path>
</svg>`,
    },
    createdAt: "2024-06-07T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      padding: "9px",
    },
    lightStyle: {
      padding: "9px",
    },
  },
  // {
  //   tier: {
  //     name: "$2500 a month",
  //     isOneTime: false,
  //   },
  //   sponsorEntity: {
  //     __typename: "Organization",
  //     login: "driz.link/edgedb",
  //     name: "Gel",
  //     avatarUrl: `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="154" viewBox="0 0 200 154" fill="none">
  //         <path d="M0 68.6C0 90.4 17.8499 108 39.9594 108C61.8661 108 79.9189 90.4 79.9189 68.6C79.9189 47 61.8661 29.2 39.9594 29.2C17.8499 29.2 0 47 0 68.6ZM171.197 14C171.197 6.6 177.485 0 185.396 0C193.306 0 200 6.6 200 14V94C200 101.4 193.306 108 185.396 108C177.485 108 171.197 101.4 171.197 94V14ZM10.5477 127.6C12.1704 141.4 23.7323 154 39.9594 154C55.9838 154 67.9513 141.4 69.574 127.6C71.8053 107.6 53.3469 114.2 39.9594 114.2C26.572 114.2 8.31643 107.6 10.5477 127.6ZM139.351 74.2C140.771 71 144.422 69 151.521 69C162.677 68.8 167.14 61.6 161.258 50.2C157.201 42.4 150.913 36.4 142.394 32.6C122.312 23.8 98.5801 32.8 89.6552 52.6C80.7302 72.2 89.6552 95.6 109.939 104.6C118.458 108.2 126.978 108.8 135.7 106.6C148.276 103.2 150.913 95 143.408 86.8C138.742 81.4 137.728 77.6 139.351 74.2Z" fill="url(#paint0_linear_59_46)"/>
  //         <defs>
  //         <linearGradient id="paint0_linear_59_46" x1="250.254" y1="0" x2="250.254" y2="154" gradientUnits="userSpaceOnUse">
  //         <stop stop-color="#FFC800"/>
  //         <stop offset="1" stop-color="#FF4800"/>
  //         </linearGradient>
  //         </defs>
  //       </svg>`,
  //   },
  //   createdAt: "2024-06-07T13:32:16Z",
  //   isActive: true,
  //   imageType: ImageType.SVG,
  //   darkStyle: {
  //     padding: "12px",
  //   },
  //   lightStyle: {
  //     padding: "12px",
  //   },
  // },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/upstash",
      name: "Upstash",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    createdAt: "2024-12-22T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      background:
        'url("/svg/upstash-icon-dark-bg.svg") 0% 0% / cover no-repeat content-box',
      padding: "12px",
    },
    lightStyle: {
      background:
        'url("/svg/upstash-icon-white-bg.svg") 0% 0% / cover no-repeat content-box',
      padding: "12px",
    },
  },

  {
    tier: {
      name: "$250 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/dbos",
      name: "DBOS",
      avatarUrl: "/images/dbos.png",
    },
    createdAt: "2024-08-13T16:35:56Z",
    isActive: true,
    imageType: ImageType.IMAGE,
  },
  {
    tier: {
      name: "$250 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/praha",
      name: "PrAha",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    createdAt: "2024-08-13T16:35:56Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      background:
        'url("/svg/praha-dark.svg") 0% 0% / cover no-repeat content-box',
    },
    lightStyle: {
      background:
        'url("/svg/praha-light.svg") 0% 0% / cover no-repeat content-box',
    },
  },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/lokalise",
      name: "Lokalise",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    createdAt: "2025-01-23T16:35:56Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      background:
        'url("/svg/lokalise-dark.svg") 0% 0% / cover no-repeat content-box',
    },
    lightStyle: {
      background:
        'url("/svg/lokalise-light.svg") 0% 0% / cover no-repeat content-box',
    },
  },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/replit",
      name: "Replit",
      avatarUrl: `<svg version="1.1" id="Artwork" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 793.8 871.5" style="enable-background:new 0 0 793.8 871.5;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#F5640C;}
</style>
<g>
	<path class="st0" d="M396.9,356.1H227.2c-16.6,0-30-13.4-30-30v-99.8c0-16.6,13.4-30,30-30h139.7c16.6,0,30,13.4,30,30V356.1z"/>
	<path class="st0" d="M566.6,515.8H396.9V356.1h169.7c16.5,0,29.9,13.4,29.9,29.9v99.8C596.5,502.4,583.1,515.8,566.6,515.8z"/>
	<path class="st0" d="M366.9,675.6H227.2c-16.5,0-29.9-13.4-29.9-29.9v-99.8c0-16.5,13.4-29.9,29.9-29.9h169.7v129.8
		C396.9,662.1,383.5,675.6,366.9,675.6z"/>
</g>
</svg>
`,
    },
    createdAt: "2024-08-13T16:35:56Z",
    isActive: true,
    imageType: ImageType.SVG,
  },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/sentry",
      name: "Sentry",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    createdAt: "2025-01-23T16:35:56Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      background:
        'url("/svg/sentry-dark.svg") 0% 0% / cover no-repeat content-box',
    },
    lightStyle: {
      background:
        'url("/svg/sentry-light.svg") 0% 0% / cover no-repeat content-box',
    },
  },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/sevalla",
      name: "Sevalla",
      avatarUrl:
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.54035 3C4.58508 3 3 4.58508 3 6.54035V17.4596C3 19.4149 4.58508 21 6.54035 21H17.4596C19.4149 21 21 19.4149 21 17.4596V6.54035C21 4.58508 19.4149 3 17.4596 3H6.54035ZM9.97653 6.76172V8.88275H8.06248V10.7451C8.06248 11.1365 8.2078 11.2601 8.30213 11.3403C8.32714 11.3615 8.34854 11.3798 8.36274 11.3991L9.95776 13.036H8.06248V15.1349H9.95776V17.2559H14.0297V15.1349H9.95776V13.036H13.5262C14.0204 13.036 14.0204 13.6346 14.0204 13.9081V15.1349H15.9344V13.2725C15.9344 12.8811 15.7891 12.7575 15.6947 12.6773C15.6697 12.6561 15.6483 12.6378 15.6341 12.6185L14.0204 10.9816H15.9375L15.9344 8.88275H14.0297L14.0204 10.9816H10.4707C9.97653 10.9816 9.97653 10.383 9.97653 10.1095V8.88275H14.0297V6.76172H9.97653Z" fill="#F97316"/></svg>',
    },
    createdAt: "2025-01-23T16:35:56Z",
    isActive: true,
    imageType: ImageType.SVG,
  },
  {
    tier: {
      name: "$100 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/solidhour",
      name: "Solid Hour",
      avatarUrl: "/images/solidhour.png",
    },
    createdAt: "2023-06-11T12:32:16Z",
    isActive: true,
    imageType: ImageType.IMAGE,
  },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/warp",
      name: "Warp",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    createdAt: "2025-11-07T00:00:00Z",
    isActive: true,
    imageType: ImageType.SVG,
    lightStyle: {
      background:
        'url("/svg/warp-light.svg") center / contain no-repeat content-box',
    },
    darkStyle: {
      background:
        'url("/svg/warp-dark.svg") center / contain no-repeat content-box',
    },
  },
  {
    tier: {
      name: "$250 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/n-ix",
      name: "N-iX",
      avatarUrl:
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" fill="#FF6B00"/><path d="M4.00608 9.32203C4.00608 9.2005 4.1033 9.10327 4.22484 9.10327H4.89935C5.02089 9.10327 5.20927 9.12758 5.32472 9.15189C5.32472 9.15189 5.50095 9.19442 5.62856 9.3828L7.23889 11.8864C7.30574 11.9836 7.40296 12.1538 7.46373 12.2571C7.46373 12.2571 7.79187 12.8101 8.08355 13.521C7.93164 12.7615 7.89518 12.4029 7.89518 11.9472V9.32203C7.89518 9.2005 7.9924 9.10327 8.11394 9.10327H8.90391C9.02545 9.10327 9.12267 9.2005 9.12267 9.32203V14.5602C9.12267 14.6817 9.02545 14.7789 8.90391 14.7789H8.22332C8.10178 14.7789 7.91341 14.7546 7.79795 14.7303C7.79795 14.7303 7.62172 14.6878 7.49411 14.4994L5.88378 11.9958C5.81694 11.8986 5.71971 11.7284 5.65894 11.6251C5.65894 11.6251 5.3308 11.0721 5.03912 10.3612C5.17888 11.1207 5.2275 11.4793 5.2275 11.9229V14.5541C5.2275 14.6756 5.13027 14.7728 5.00874 14.7728H4.21876C4.09723 14.7728 4 14.6756 4 14.5541V9.32203H4.00608Z" fill="white"/><path d="M9.82764 12.1356C9.82764 12.0141 9.92486 11.9169 10.0464 11.9169H12.0943C12.2158 11.9169 12.313 12.0141 12.313 12.1356V12.6886C12.313 12.8101 12.2158 12.9074 12.0943 12.9074H10.0464C9.92486 12.9074 9.82764 12.8101 9.82764 12.6886V12.1356Z" fill="white"/><path d="M12.9692 11.1025C12.9692 10.981 13.0665 10.8838 13.188 10.8838H13.978C14.0995 10.8838 14.1967 10.981 14.1967 11.1025V14.5602C14.1967 14.6817 14.0995 14.779 13.978 14.779H13.188C13.0665 14.779 12.9692 14.6817 12.9692 14.5602V11.1025ZM14.1846 9.61375C14.1846 9.95404 13.9111 10.2214 13.5769 10.2214C13.2427 10.2214 12.9692 9.94797 12.9692 9.61375C12.9692 9.27345 13.2427 9 13.5769 9C13.9111 9 14.1846 9.27953 14.1846 9.61375Z" fill="white"/><path d="M14.5308 14.7728C14.9379 14.0558 15.5213 13.1078 16.0439 12.3178L16.1593 12.1416C16.2262 12.0444 16.2991 11.935 16.3173 11.8985C16.3416 11.8621 16.3416 11.8074 16.3173 11.7709C16.293 11.7345 16.2201 11.6251 16.1532 11.5279C16.1532 11.5279 15.8616 11.1025 15.7096 10.8655C15.4483 10.4705 15.1081 9.9236 14.9318 9.61977L14.8224 9.43139C14.7617 9.32808 14.6948 9.21263 14.6705 9.17009C14.6462 9.13363 14.7252 9.09717 14.8407 9.09717H15.9649C16.0864 9.09717 16.2019 9.13363 16.2201 9.17009C16.2444 9.21263 16.3052 9.32808 16.3659 9.43746C16.3659 9.43746 16.9311 10.3125 17.399 10.987C17.6238 11.3091 18.2376 12.1112 18.3044 12.2084C18.3044 12.2084 18.9182 13.0592 19.2341 13.5636C19.4408 13.8978 19.6656 14.1955 19.8175 14.4568C19.8722 14.5541 19.9147 14.6148 19.9998 14.7667H18.6386C18.5171 14.7667 18.3773 14.6817 18.3226 14.5723C18.3226 14.5723 18.1221 14.1895 17.8851 13.7702C17.5813 13.2354 17.4476 12.9923 17.2045 12.6034L17.162 12.6703C17.1012 12.7736 17.004 12.9377 16.9432 13.041C16.9432 13.041 16.3538 14.0618 16.0682 14.6027C16.0256 14.6877 15.8919 14.7607 15.7704 14.7607H14.5308V14.7728Z" fill="white"/><path d="M17.5938 10.6589C17.5938 10.6589 18.0556 9.88717 18.3959 9.25519C18.4384 9.17012 18.5721 9.10327 18.6936 9.10327H19.6902C19.8118 9.10327 19.8847 9.13366 19.8604 9.17619C19.8361 9.21265 19.7692 9.32811 19.7024 9.43141L18.566 11.224L18.323 11.619L17.5938 10.6589Z" fill="white"/></svg>',
    },
    createdAt: "2026-02-12T00:00:00Z",
    isActive: true,
    imageType: ImageType.SVG,
  },
];
