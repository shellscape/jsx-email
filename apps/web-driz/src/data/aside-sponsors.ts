import { type ISponsor, ImageType } from "@/types";

export const asideSponsors: ISponsor[] = [
  {
    tier: {
      name: "$5000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/planetscale",
      name: "PlanetScale",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    createdAt: "2025-01-28T00:00:00Z",
    isActive: true,
    imageType: ImageType.SVG,
    badge: "Our Primary backer",
    darkStyle: {
      filter: "brightness(0.3)",
      background:
        'url("/images/planetScale-dark.png") center / contain no-repeat content-box',
      minWidth: "176px",
    },
    lightStyle: {
      filter: "invert(0.5)",
      background:
        'url("/images/planetScale.png") center / contain no-repeat content-box',
      minWidth: "176px",
    },
  },
  {
    tier: {
      name: "$2500 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/railway",
      name: "Railway",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    createdAt: "2025-01-28T00:00:00Z",
    isActive: true,
    imageType: ImageType.SVG,
    badge: "Our Cloud Partner",
    darkStyle: {
      filter: "brightness(0.3)",
      background:
        'url("/svg/railway-sidebar.svg") center / contain no-repeat content-box',
      minWidth: "calc(100% + 128px)",
    },
    lightStyle: {
      filter: "invert(0.6)",
      background:
        'url("/svg/railway-sidebar-light.svg") center / contain no-repeat content-box',
      minWidth: "calc(100% + 128px)",
    },
  },
  {
    tier: {
      name: "$1000 a month",
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
    isActive: false,
    imageType: ImageType.SVG,
    popover:
      "🚀 Drizzle is giving you 10% off Turso Scaler and Pro for 1 Year 🚀",
    lightStyle: {
      filter: "grayscale(1) invert(0.6)",
      background:
        'url("/svg/new-turso.svg") 0% 0% / cover no-repeat content-box',
    },
    darkStyle: {
      filter: "grayscale(1) brightness(0.35)",
      background:
        'url("/svg/new-turso-light.svg") 0% 0% / cover no-repeat content-box',
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
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    createdAt: "2023-06-11T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      filter: "brightness(0.3)",
      background:
        'url("/svg/payload-dark.svg") 0% 0% / cover no-repeat content-box',
    },
    lightStyle: {
      filter: "invert(0.6)",
      background: 'url("/svg/payload.svg") 0% 0% / cover no-repeat content-box',
    },
  },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
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
    darkStyle: {
      filter: "brightness(0.5) grayscale(1)",
    },
    lightStyle: {
      filter: "grayscale(1) brightness(1.2)",
    },
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
      filter: "brightness(0.3) grayscale(1)",
      background:
        'url("/svg/neon-dark.svg") 0% 0% / cover no-repeat content-box',
      padding: "6px",
    },
    lightStyle: {
      filter: "brightness(0.8) grayscale(1)",
      background:
        'url("/svg/neon-light.svg") 0% 0% / cover no-repeat content-box',
      padding: "6px",
    },
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
  //     filter: "brightness(0.5) grayscale(1)",
  //     background:
  //       'url("/images/hydra-orange.png") 0% 0% / cover no-repeat content-box',
  //   },
  //   lightStyle: {
  //     filter: "invert(0.6)",
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
  //     name: "Deco.cx",
  //     avatarUrl: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  //       <path d="M6.77828 19.8642C4.2582 19.8642 2.25696 18.9006 1.07104 17.1959C-0.189006 15.417 -0.337247 12.8969 0.626315 10.2286C1.96048 6.74493 5.14764 4.59545 9.00189 4.59545H9.07601C9.07601 4.52133 9.07601 4.44721 9.07601 4.29897C9.00189 3.03893 9.81721 1.92712 11.0031 1.55652L14.4868 0.22236C14.8574 0.0741201 15.228 0 15.5986 0C16.7104 0 17.7481 0.592961 18.2669 1.63064L19.6752 4.59545C20.1199 5.48489 20.1199 6.59669 19.6011 7.41201C19.0822 8.22733 18.2669 8.67205 17.3775 8.74618C17.1551 9.1909 17.0069 9.63562 16.7845 10.0062C16.3398 11.0439 15.8951 12.0816 15.3762 13.1934C13.4491 17.1959 11.2996 19.8642 6.77828 19.8642Z" fill="#113032"/>
  //       <path d="M6.77828 17.27C9.59484 17.27 11.1514 16.0099 13.0044 12.0816C14.0421 9.9321 14.8574 7.78261 15.8209 5.70725L17.0069 6.07785C17.3033 6.15197 17.5257 6.00373 17.3775 5.70725L15.8951 2.81656C15.8209 2.5942 15.5245 2.5942 15.3762 2.66832L11.8184 4.00248C11.522 4.0766 11.522 4.37309 11.8184 4.44721L12.8561 4.81781C11.9667 6.74493 10.929 9.70974 10.0396 11.5627C9.076 13.6381 8.63128 15.0464 6.92652 15.0464C5.22176 15.0464 4.9994 13.7863 5.7406 11.9333C6.55592 9.78385 7.89008 9.19089 9.37248 9.63561C9.8172 9.04265 10.1137 8.15321 10.2619 7.33789C9.8172 7.18965 9.29836 7.18965 8.85364 7.18965C6.40768 7.18965 3.96171 8.44969 2.92403 11.118C1.81223 14.6017 2.99815 17.27 6.77828 17.27Z" fill="#02F67C"/>
  //       </svg>`,
  //   },
  //   createdAt: "2024-06-07T13:32:16Z",
  //   isActive: true,
  //   imageType: ImageType.SVG,
  //   darkStyle: {
  //     padding: "6px",
  //     filter: "grayscale(1) opacity(0.3)",
  //   },
  //   lightStyle: {
  //     padding: "6px",
  //     filter: "grayscale(1) brightness(4) opacity(0.9)",
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
      avatarUrl:
        '<svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M48.4608 27C48.4608 38.8779 38.84 48.5 26.9804 48.5C15.1209 48.5 5.5 38.8779 5.5 27C5.5 15.1221 15.1209 5.5 26.9804 5.5C38.84 5.5 48.4608 15.1221 48.4608 27Z" fill="#CFE2F8" stroke="#CFE2F8" stroke-width="11"></path>\n<path d="M24.6796 12.4775C27.1916 8.34049 32.5791 7.02455 36.7128 9.53821C40.8466 12.0519 42.1612 17.4433 39.6492 21.5803L31.6724 34.7169C29.1603 38.8538 23.7728 40.1698 19.6391 37.6561C15.5053 35.1425 14.1907 29.751 16.7027 25.6141L24.6796 12.4775Z" fill="white"></path>\n<path fill-rule="evenodd" clip-rule="evenodd" d="M30.2892 33.8758L38.266 20.7392C40.3138 17.3667 39.2421 12.9716 35.8723 10.9225C32.5025 8.87335 28.1106 9.94611 26.0627 13.3186L18.0859 26.4552C16.0381 29.8276 17.1098 34.2227 20.4796 36.2718C23.8495 38.321 28.2414 37.2482 30.2892 33.8758ZM36.7128 9.53821C32.5791 7.02455 27.1916 8.34049 24.6796 12.4775L16.7027 25.6141C14.1907 29.751 15.5053 35.1425 19.6391 37.6561C23.7728 40.1698 29.1603 38.8538 31.6724 34.7169L39.6492 21.5803C42.1612 17.4433 40.8466 12.0519 36.7128 9.53821Z" fill="black"></path>\n<path fill-rule="evenodd" clip-rule="evenodd" d="M31.4389 19.6737C31.817 19.9122 31.9304 20.4122 31.6921 20.7907L16.1192 45.5232C15.881 45.9017 15.3813 46.0151 15.0031 45.7767C14.625 45.5383 14.5116 45.0382 14.7499 44.6598L30.3228 19.9272C30.561 19.5488 31.0607 19.4353 31.4389 19.6737Z" fill="black"></path>\n<path fill-rule="evenodd" clip-rule="evenodd" d="M33.1051 30.9949C33.1775 31.3606 32.94 31.7158 32.5746 31.7882C27.7347 32.7478 25.313 32.1394 24.2687 31.4044C23.9641 31.19 23.8908 30.7689 24.105 30.464C24.3193 30.159 24.74 30.0857 25.0447 30.3001C25.6271 30.71 27.5811 31.4021 32.3126 30.464C32.6779 30.3915 33.0328 30.6292 33.1051 30.9949Z" fill="black"></path>\n</svg>',
    },
    createdAt: "2024-06-07T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      padding: "4px",
      filter: "grayscale(1) brightness(2) opacity(0.2)",
    },
    lightStyle: {
      padding: "4px",
      filter: "grayscale(1) opacity(0.6) invert(0.1)",
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
  //     avatarUrl:
  //       `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="154" viewBox="0 0 200 154" fill="none">
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
  //     filter: "grayscale(1) brightness(2) opacity(0.3)",
  //     minWidth: "calc(100% + 16px)"
  //   },
  //   lightStyle: {
  //     filter: "grayscale(1) brightness(0.5) opacity(0.4)",
  //     minWidth: "calc(100% + 16px)"
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
      height: "100%",
      filter: "brightness(0.3) grayscale(1)",
      background:
        'url("/svg/upstash-icon-dark-bg.svg") center / contain no-repeat content-box',
      padding: "6px",
      width: "fit-content",
      "aspect-ratio": 4.55,
      "max-width": "initial",
    },
    lightStyle: {
      height: "100%",
      filter: "brightness(0.8) grayscale(1) opacity(0.45)",
      background:
        'url("/svg/upstash-icon-white-bg.svg") center / contain no-repeat content-box',
      padding: "6px",
      width: "fit-content",
      "aspect-ratio": 4.55,
      "max-width": "initial",
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
    createdAt: "2024-06-07T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      filter: "brightness(0.3)",
      background:
        'url("/svg/lokalise-dark.svg") 0% 0% / contain no-repeat content-box',
    },
    lightStyle: {
      filter: "invert(0.6)",
      background:
        'url("/svg/lokalise-light.svg") 0% 0% / contain no-repeat content-box',
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
</svg>`,
    },
    createdAt: "2024-06-07T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      filter: "grayscale(1) brightness(2) opacity(0.2)",
    },
    lightStyle: {
      filter: "grayscale(1) opacity(0.6) invert(0.1)",
    },
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
    createdAt: "2024-06-07T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      filter: "brightness(0.3)",
      background:
        'url("/svg/sentry-dark.svg") 0% 0% / contain no-repeat content-box',
    },
    lightStyle: {
      filter: "invert(0.6)",
      background:
        'url("/svg/sentry-light.svg") 0% 0% / contain no-repeat content-box',
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
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.72047 0C2.11344 0 0 2.11344 0 4.72047V19.2795C0 21.8866 2.11344 24 4.72047 24H19.2795C21.8866 24 24 21.8866 24 19.2795V4.72047C24 2.11344 21.8866 0 19.2795 0H4.72047ZM9.30204 5.01563V7.84367H6.74998V10.3268C6.74998 10.8487 6.94373 11.0134 7.06951 11.1204C7.10285 11.1487 7.13139 11.173 7.15031 11.1988L9.27702 13.3814H6.74998V16.1798H9.27702V19.0078H14.7063V16.1798H9.27702V13.3814H14.035C14.6938 13.3814 14.6938 14.1795 14.6938 14.5441V16.1798H17.2458V13.6967C17.2458 13.1748 17.0521 13.0101 16.9263 12.9031C16.893 12.8747 16.8644 12.8505 16.8455 12.8247L14.6938 10.6421H17.25L17.2458 7.84367H14.7063L14.6938 10.6421H9.96088C9.30204 10.6421 9.30204 9.84395 9.30204 9.47935V7.84367H14.7063V5.01563H9.30204Z" fill="#F97316"/></svg>',
    },
    createdAt: "2024-06-07T13:32:16Z",
    isActive: true,
    imageType: ImageType.SVG,
    darkStyle: {
      padding: "4px",
      filter: "brightness(0.5) grayscale(1)",
    },
    lightStyle: {
      padding: "4px",
      filter: "grayscale(1) brightness(1.2)",
    },
  },
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "clerk.com",
      name: "Clerk",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    createdAt: "2025-11-07T00:00:00Z",
    isActive: true,
    imageType: ImageType.SVG,
    lightStyle: {
      filter: "invert(0.6)",
      background:
        'url("/svg/clerk-light.svg") center / contain no-repeat content-box',
    },
    darkStyle: {
      filter: "brightness(0.3)",
      background:
        'url("/svg/clerk-dark.svg") center / contain no-repeat content-box',
    },
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
      filter: "invert(0.6)",
      background:
        'url("/svg/warp-light.svg") center / contain no-repeat content-box',
    },
    darkStyle: {
      filter: "brightness(0.3)",
      background:
        'url("/svg/warp-dark.svg") center / contain no-repeat content-box',
    },
  },
  // Placeholder
  {
    tier: {
      name: "$1000 a month",
      isOneTime: false,
    },
    sponsorEntity: {
      __typename: "Organization",
      login: "driz.link/sponsor",
      name: "Sponsor",
      avatarUrl:
        '<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>',
    },
    createdAt: "2024-08-13T16:35:56Z",
    isActive: true,
    imageType: ImageType.IMAGE,
  },
];
