import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { trpc } from '../lib/trpc';
import { ErrorBox } from '../components/ui';

export function Login() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get('next') || '/';
  const utils = trpc.useUtils();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = trpc.auth.login.useMutation({
    onSuccess: async () => {
      await utils.auth.me.invalidate();
      navigate(next);
    },
  });

  return (
    <div className="auth-wrap">
      <form
        className="card auth-card"
        onSubmit={(e) => {
          e.preventDefault();
          login.mutate({ username, password });
        }}
      >
        <div className="eyebrow center">Archlight Wiki</div>
        <h1 className="page-title center" style={{ fontSize: 26 }}>
          Sign in
        </h1>
        <label className="field">
          <span>Username</span>
          <input className="input" value={username} autoComplete="username" onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label className="field">
          <span>Password</span>
          <input
            className="input"
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {login.error && <ErrorBox error={login.error} />}
        <button className="btn primary" style={{ width: '100%' }} disabled={login.isPending}>
          {login.isPending ? 'Signing in…' : 'Sign in'}
        </button>
        <p className="center muted" style={{ marginTop: 16 }}>
          No account? <Link to="/register">Create one</Link>
        </p>
      </form>
    </div>
  );
}
