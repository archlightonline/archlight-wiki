import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { trpc } from '../lib/trpc';
import { ErrorBox } from '../components/ui';

interface RegisterErrors {
  username?: string;
  email?: string;
  password?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_RE = /^[A-Za-z0-9_-]+$/;

export function Register() {
  const navigate = useNavigate();
  const utils = trpc.useUtils();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<RegisterErrors>({});

  const register = trpc.auth.register.useMutation({
    onSuccess: async () => {
      await utils.auth.me.invalidate();
      navigate('/');
    },
  });

  const clearError = (field: keyof RegisterErrors) => {
    setErrors((current) => {
      const nextErrors = { ...current };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  const validate = (): RegisterErrors => {
    const nextErrors: RegisterErrors = {};
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();

    if (!trimmedUsername) nextErrors.username = 'Username is required.';
    else if (trimmedUsername.length < 3) nextErrors.username = 'Username must be at least 3 characters.';
    else if (!USERNAME_RE.test(trimmedUsername)) nextErrors.username = 'Use only letters, numbers, underscore, and dash.';

    if (!trimmedEmail) nextErrors.email = 'Email is required.';
    else if (!EMAIL_RE.test(trimmedEmail)) nextErrors.email = 'Enter a valid email address.';

    if (!password) nextErrors.password = 'Password is required.';
    else if (password.length < 8) nextErrors.password = 'Password must be at least 8 characters.';

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
          register.mutate({ username: username.trim(), email: email.trim(), password });
        }}
      >
        <div className="eyebrow center">Archlight Wiki</div>
        <h1 className="page-title center" style={{ fontSize: 26 }}>
          Create account
        </h1>
        <label className="field">
          <span>Username</span>
          <input
            className="input"
            value={username}
            autoComplete="username"
            required
            minLength={3}
            aria-invalid={Boolean(errors.username)}
            aria-describedby={errors.username ? 'register-username-error' : 'register-username-hint'}
            onChange={(e) => {
              setUsername(e.target.value);
              if (errors.username) clearError('username');
            }}
          />
          {errors.username && (
            <span className="field-error" id="register-username-error">
              {errors.username}
            </span>
          )}
          <span className="form-hint" id="register-username-hint">3–32 chars: letters, numbers, _ and -.</span>
        </label>
        <label className="field">
          <span>Email</span>
          <input
            className="input"
            type="email"
            value={email}
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'register-email-error' : undefined}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) clearError('email');
            }}
          />
          {errors.email && (
            <span className="field-error" id="register-email-error">
              {errors.email}
            </span>
          )}
        </label>
        <label className="field">
          <span>Password</span>
          <input
            className="input"
            type="password"
            value={password}
            autoComplete="new-password"
            required
            minLength={8}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'register-password-error' : 'register-password-hint'}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) clearError('password');
            }}
          />
          {errors.password && (
            <span className="field-error" id="register-password-error">
              {errors.password}
            </span>
          )}
          <span className="form-hint" id="register-password-hint">At least 8 characters. Stored only as a bcrypt hash.</span>
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
