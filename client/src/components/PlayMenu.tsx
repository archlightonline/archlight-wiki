import { useEffect, useRef, useState } from 'react';

/**
 * Topbar Play button. Opens a small dropdown linking to the two playable
 * worlds, colour-coded with the existing world-tone classes (green = live,
 * grey = offline/legacy).
 */
const PLAY_TARGETS = [
  { id: 'abaldar', name: 'Abaldar', status: 'LIVE', tone: 'live', href: 'https://abaldar.archlightonline.com' },
  { id: 'legacy', name: 'Legacy', status: 'OFFLINE', tone: 'offline', href: 'https://legacy.archlightonline.com' },
] as const;

export function PlayMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="play-menu" ref={ref}>
      <button
        type="button"
        className="tbtn play-btn top-play"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Play Archlight"
        onClick={() => setOpen((o) => !o)}
      >
        ▶ Play
        <span className="play-caret" aria-hidden="true">▾</span>
      </button>
      {open && (
        <div className="play-menu-list" role="menu">
          {PLAY_TARGETS.map((w) => (
            <a
              key={w.id}
              className="play-menu-item"
              role="menuitem"
              href={w.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              <span className={`world-status-dot ${w.tone}`} aria-hidden="true" />
              <span className="pm-name">{w.name}</span>
              <span className={`world-status-badge ${w.tone}`}>{w.status}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
