import { useId } from "react";

export function LogoMark({ size = 40, className = "" }: { size?: number; className?: string }) {
  const id = useId().replace(/:/g, "");
  const mountain = "M4 42 L19.5 13 L22.5 16.5 L25.5 12.5 L28.5 16 L44 42 Z";
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs><clipPath id={`etna-${id}`}><path d={mountain} /></clipPath></defs>
      <g clipPath={`url(#etna-${id})`}>
        <rect x="0" y="0" width="17.4" height="48" fill="#008C45" />
        <rect x="17.4" y="0" width="13.2" height="48" fill="#FFFFFF" />
        <rect x="30.6" y="0" width="17.4" height="48" fill="#CD212A" />
      </g>
      <path d={mountain} fill="none" stroke="#17201A" strokeWidth="2" strokeLinejoin="round" />
      <path d="M22 9 C21 6 24 5 23 2" fill="none" stroke="#17201A" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Tricolore({ className = "" }: { className?: string }) {
  return <span className={`tricolore ${className}`} aria-hidden="true"><i /><i /><i /></span>;
}
