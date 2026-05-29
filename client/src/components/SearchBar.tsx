import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function SearchBar() {
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get('q') ?? '');
  const navigate = useNavigate();
  return (
    <form
      className="search-box"
      onSubmit={(e) => {
        e.preventDefault();
        if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
      }}
    >
      <input
        type="search"
        placeholder="Search the wiki…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search the wiki"
        autoComplete="off"
      />
    </form>
  );
}
