import React from 'react';

export default function AnswerChildrenIcon({
  isHover,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  isHover?: boolean;
}) {
  return (
    <svg
      {...props}
      width="25"
      height="26"
      viewBox="0 0 25 26"
      fill={isHover ? 'white' : 'black'}
      opacity={isHover ? '1' : '0.1'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22.5 0.488283H2.5C1.12125 0.488283 0 1.60578 0 2.97828V17.9983C0 19.3708 1.12125 20.4883 2.5 20.4883H6.25V25.4883L14.1887 20.4883H22.5C23.8787 20.4883 25 19.3708 25 17.9983V2.97828C24.998 2.31677 24.7337 1.68307 24.265 1.21625C23.7963 0.749424 23.1615 0.487617 22.5 0.488283Z" />
    </svg>
  );
}
