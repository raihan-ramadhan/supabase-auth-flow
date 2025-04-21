"use client";

import React from "react";
import { Provider } from "@supabase/supabase-js";

import OAuthButton from "@/components/OAuthButton";

const iconClassName = "size-full";

const providers: {
  name: string;
  icon: React.ReactNode;
  provider_name: Provider;
}[] = [
  {
    name: "Google",
    provider_name: "google",
    icon: (
      <svg className={iconClassName} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
        <path
          d="M30.0014 16.3109C30.0014 15.1598 29.9061 14.3198 29.6998 13.4487H16.2871V18.6442H24.1601C24.0014 19.9354 23.1442 21.8798 21.2394 23.1864L21.2127 23.3604L25.4536 26.58L25.7474 26.6087C28.4458 24.1665 30.0014 20.5731 30.0014 16.3109Z"
          fill="#4285F4"
        />
        <path
          d="M16.2863 29.9998C20.1434 29.9998 23.3814 28.7553 25.7466 26.6086L21.2386 23.1863C20.0323 24.0108 18.4132 24.5863 16.2863 24.5863C12.5086 24.5863 9.30225 22.1441 8.15929 18.7686L7.99176 18.7825L3.58208 22.127L3.52441 22.2841C5.87359 26.8574 10.699 29.9998 16.2863 29.9998Z"
          fill="#34A853"
        />
        <path
          d="M8.15964 18.769C7.85806 17.8979 7.68352 16.9645 7.68352 16.0001C7.68352 15.0356 7.85806 14.1023 8.14377 13.2312L8.13578 13.0456L3.67083 9.64746L3.52475 9.71556C2.55654 11.6134 2.00098 13.7445 2.00098 16.0001C2.00098 18.2556 2.55654 20.3867 3.52475 22.2845L8.15964 18.769Z"
          fill="#FBBC05"
        />
        <path
          d="M16.2864 7.4133C18.9689 7.4133 20.7784 8.54885 21.8102 9.4978L25.8419 5.64C23.3658 3.38445 20.1435 2 16.2864 2C10.699 2 5.8736 5.1422 3.52441 9.71549L8.14345 13.2311C9.30229 9.85555 12.5086 7.4133 16.2864 7.4133Z"
          fill="#EB4335"
        />
      </svg>
    ),
  },
  // {
  //   name: "LinkedIn",
  //   provider_name: "linkedin",
  //   icon: (
  //     <svg
  //       className={iconClassName}
  //       xmlns="http://www.w3.org/2000/svg"
  //       aria-label="LinkedIn"
  //       role="img"
  //       viewBox="0 0 512 512"
  //       fill="#ffffff"
  //     >
  //       <rect width="512" height="512" rx="15%" fill="#0077b5" />
  //       <circle cx="142" cy="138" r="37" />
  //       <path stroke="#ffffff" strokeWidth="66" d="M244 194v198M142 194v198" />
  //       <path d="M276 282c0-20 13-40 36-40 24 0 33 18 33 45v105h66V279c0-61-32-89-76-89-34 0-51 19-59 32" />
  //     </svg>
  //   ),
  // },
  {
    name: "Github",
    provider_name: "github",
    icon: (
      <svg
        className={iconClassName}
        xmlns="http://www.w3.org/2000/svg"
        width="800px"
        height="800px"
        viewBox="0 0 20 20"
        version="1.1"
      >
        <title>github [#142]</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="#000000">
            <g id="icons" transform="translate(56.000000, 160.000000)">
              <path
                d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                id="github-[#142]"
              ></path>
            </g>
          </g>
        </g>
      </svg>
    ),
  },
  // {
  //   name: "X",
  //   provider_name: "twitter",
  //   icon: (
  //     <svg className={iconClassName} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
  //       <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z" />
  //     </svg>
  //   ),
  // },
  // {
  //   name: "Microsoft",
  //   provider_name: "azure",
  //   icon: (
  //     <svg className={iconClassName} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
  //       <path fill="#F35325" d="M1 1h6.5v6.5H1V1z" />
  //       <path fill="#81BC06" d="M8.5 1H15v6.5H8.5V1z" />
  //       <path fill="#05A6F0" d="M1 8.5h6.5V15H1V8.5z" />
  //       <path fill="#FFBA08" d="M8.5 8.5H15V15H8.5V8.5z" />
  //     </svg>
  //   ),
  // },
] as const;

const OAuthProviders = () => {
  return (
    <div className="flex flex-col gap-2">
      {providers.map((provider) => (
        <OAuthButton
          key={provider.name}
          icon={provider.icon}
          name={provider.name}
          provider_name={provider.provider_name}
        />
      ))}
    </div>
  );
};

export default OAuthProviders;
