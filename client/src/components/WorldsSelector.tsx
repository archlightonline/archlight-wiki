import { useEffect, useRef, useState } from 'react';
import { WORLDS } from '../lib/nav';

/** Topbar worlds selector with live server-status indicators. */
export function WorldsSelector() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(WORLDS[0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <div className="worlds" ref={ref}>
      <button
        className="worlds-btn"
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Select world"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className={`status-dot ${active.status}`} aria-hidden="true" />
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
                setActive(w);
                setOpen(false);
              }}
            >
              <span className={`status-dot ${w.status}`} aria-hidden="true" />
              <span className="wm-name">{w.name}</span>
              <span className="wm-tag">{w.tag}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
