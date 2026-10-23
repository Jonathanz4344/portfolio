/** The JZ signature from the favicon, drawn in the current text color. */
export function BrandMark({ size = 30, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 18 Q26 18 30 20 C34 22 36 24 36 28 L36 58 Q36 72 24 72 Q16 72 14 64" strokeWidth="6" />
        <path d="M14 64 Q12 58 20 54 Q28 50 44 38 L78 38" strokeWidth="6" />
        <path d="M78 38 L44 68 L80 68 Q86 68 88 62" strokeWidth="6" />
        <path d="M14 80 Q40 90 86 76" strokeWidth="3.5" opacity="0.6" />
      </g>
    </svg>
  );
}
