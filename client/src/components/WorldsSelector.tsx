import { useEffect, useRef, useState } from 'react';
import { WORLDS } from '../lib/nav';

/**
 * Worlds selector. On desktop it shows all worlds inline with live status
 * badges (active world gets a green glowing border); under 768px it collapses
 * to a compact dropdown to save topbar space.
 */
export function WorldsSelector() {
  const [activeId, setActiveId] = useState(WORLDS[0].id);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = WORLDS.find((w) => w.id === activeId) ?? WORLDS[0];

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <div className="worlds-wrap" ref={ref}>
      {/* Desktop: all worlds inline */}
      <div className="worlds-selector" role="group" aria-label="Worlds">
        <span className="worlds-label">Worlds</span>
        {WORLDS.map((w) => (
          <button
            key={w.id}
            type="button"
            className={`world-btn${w.id === activeId ? ' active' : ''}`}
            onClick={() => setActiveId(w.id)}
            aria-pressed={w.id === activeId}
            title={`${w.name} — ${w.status}`}
          >
            <span className="world-ico" aria-hidden="true">{w.icon}</span>
            <span className={`world-status-dot ${w.tone}`} aria-hidden="true" />
            <span className="world-name">{w.name}</span>
            <span className={`world-status-badge ${w.tone}`}>{w.status}</span>
          </button>
        ))}
      </div>

      {/* Mobile (<768px): compact dropdown */}
      <div className="worlds">
        <button
          className="worlds-btn"
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="true"
          aria-expanded={open}
          aria-label="Select world"
        >
          <span className={`world-status-dot ${active.tone}`} aria-hidden="true" />
          <span>{active.name}</span>
          <span aria-hidden="true">▾</span>
        </button>
        {open && (
          <div className="worlds-menu" role="menu">
            {WORLDS.map((w) => (
              <button
                key={w.id}
                type="button"
                role="menuitem"
                className="wm-item"
                style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer' }}
                onClick={() => {
                  setActiveId(w.id);
                  setOpen(false);
                }}
              >
                <span className={`world-status-dot ${w.tone}`} aria-hidden="true" />
                <span className="wm-name">{w.name}</span>
                <span className={`world-status-badge ${w.tone}`} style={{ marginLeft: 'auto' }}>
                  {w.status}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
