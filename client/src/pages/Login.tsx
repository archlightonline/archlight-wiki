import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { trpc } from '../lib/trpc';
import { ErrorBox } from '../components/ui';

interface LoginErrors {
  username?: string;
  password?: string;
}

export function Login() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get('next') || '/';
  const utils = trpc.useUtils();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});

  const login = trpc.auth.login.useMutation({
    onSuccess: async () => {
      await utils.auth.me.invalidate();
      navigate(next);
    },
  });

  const clearError = (field: keyof LoginErrors) => {
    setErrors((current) => {
      const nextErrors = { ...current };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  const validate = (): LoginErrors => {
    const nextErrors: LoginErrors = {};
    if (!username.trim()) nextErrors.username = 'Username is required.';
    if (!password) nextErrors.password = 'Password is required.';
    return nextErrors;
  };

  return (
    <div className="auth-wrap">
      <form
        className="card auth-card"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const nextErrors = validate();
          setErrors(nextErrors);
          if (Object.keys(nextErrors).length > 0) return;
          login.mutate({ username: username.trim(), password });
        }}
      >
        <div className="eyebrow center">Archlight Wiki</div>
        <h1 className="page-title center" style={{ fontSize: 26 }}>
          Sign in
        </h1>
        <label className="field">
          <span>Username</span>
          <input
            className="input"
            value={username}
            autoComplete="username"
            required
            aria-invalid={Boolean(errors.username)}
            aria-describedby={errors.username ? 'login-username-error' : undefined}
            onChange={(e) => {
              setUsername(e.target.value);
              if (errors.username) clearError('username');
            }}
          />
          {errors.username && (
            <span className="field-error" id="login-username-error">
              {errors.username}
            </span>
          )}
        </label>
        <label className="field">
          <span>Password</span>
          <input
            className="input"
            type="password"
            value={password}
            autoComplete="current-password"
            required
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'login-password-error' : undefined}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) clearError('password');
            }}
          />
          {errors.password && (
            <span className="field-error" id="login-password-error">
              {errors.password}
            </span>
          )}
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
