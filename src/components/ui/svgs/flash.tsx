import type { SVGProps } from "react";

const Flash = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 500 487">
    <rect width="500" height="487" rx="60" fill="#4a0000" />
    <path
      fill="#fff"
      d="M269.2 138.7c-22.5 27.5-35.8 61.8-48.7 95-26.1 67.3-43.6 105.8-99.7 105.8V402c46.4 0 84.1-17.2 112-51.2 17.9-21.9 30.3-49.3 40.9-75.8h74.1v-62.5h-48.8c18.9-40.6 39.2-62.5 82.1-62.5V87.5c-46.3 0-84 17.2-111.9 51.2"
    />
  </svg>
);

export { Flash };
