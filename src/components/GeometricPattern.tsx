export function GeometricPattern() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-5">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="islamic-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            {/* Simple octagonal star pattern representation */}
            <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M25 25 L75 25 L75 75 L25 75 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M0 50 L25 25 M100 50 L75 25 M0 50 L25 75 M100 50 L75 75 M50 0 L25 25 M50 0 L75 25 M50 100 L25 75 M50 100 L75 75" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#islamic-pattern)" className="text-brand-gold" />
      </svg>
    </div>
  );
}
