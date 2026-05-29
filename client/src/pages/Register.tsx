import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { trpc } from '../lib/trpc';
import { ErrorBox } from '../components/ui';

export function Register() {
  const navigate = useNavigate();
  const utils = trpc.useUtils();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = trpc.auth.register.useMutation({
    onSuccess: async () => {
      await utils.auth.me.invalidate();
      navigate('/');
    },
  });

  return (
    <div className="auth-wrap">
      <form
        className="card auth-card"
        onSubmit={(e) => {
          e.preventDefault();
          register.mutate({ username, email, password });
        }}
      >
        <div className="eyebrow center">Archlight Wiki</div>
        <h1 className="page-title center" style={{ fontSize: 26 }}>
          Create account
        </h1>
        <label className="field">
          <span>Username</span>
          <input className="input" value={username} autoComplete="username" onChange={(e) => setUsername(e.target.value)} />
          <span className="form-hint">3–32 chars: letters, numbers, _ and -.</span>
        </label>
        <label className="field">
          <span>Email</span>
          <input className="input" type="email" value={email} autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="field">
          <span>Password</span>
          <input
            className="input"
            type="password"
            value={password}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="form-hint">At least 8 characters. Stored only as a bcrypt hash.</span>
        </label>
        {register.error && <ErrorBox error={register.error} />}
        <button className="btn primary" style={{ width: '100%' }} disabled={register.isPending}>
          {register.isPending ? 'Creating…' : 'Create account'}
        </button>
        <p className="center muted" style={{ marginTop: 16 }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
