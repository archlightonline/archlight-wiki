import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';
import { trpc } from '../lib/trpc';
import { BrandLogo } from '../components/BrandLogo';
import { ErrorBox } from '../components/ui';

type Mode = 'login' | 'register';

/**
 * Full-screen auth modal with a two-column layout (brand panel + form) and
 * login / create-account tabs. Uses the existing trpc.auth mutations; on success
 * it invalidates auth.me and closes. Closes on Escape and on backdrop click.
 */
export function AuthModal({ mode, onClose }: { mode: Mode; onClose: () => void }) {
  const [tab, setTab] = useState<Mode>(mode);
  const utils = trpc.useUtils();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const onSuccess = useCallback(async () => {
    await utils.auth.me.invalidate();
    onClose();
  }, [utils, onClose]);

  const login = trpc.auth.login.useMutation({ onSuccess });
  const register = trpc.auth.register.useMutation({ onSuccess });
  const pending = login.isPending || register.isPending;
  const serverError = tab === 'login' ? login.error : register.error;

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const switchTab = (next: Mode) => {
    setTab(next);
    setLocalError(null);
    login.reset();
    register.reset();
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    const u = username.trim();
    if (tab === 'login') {
      if (!u || !password) {
        setLocalError('Enter your username and password.');
        return;
      }
      login.mutate({ username: u, password });
      return;
    }
    const mail = email.trim();
    if (!u || !mail || !password) {
      setLocalError('All fields are required.');
      return;
    }
    if (password.length < 8) {
      setLocalError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setLocalError('Passwords do not match.');
      return;
    }
    register.mutate({ username: u, email: mail, password });
  };

  const isLogin = tab === 'login';

  return (
    <div className="auth-modal" role="dialog" aria-modal="true" aria-label={isLogin ? 'Sign in' : 'Create account'}>
      <div className="auth-modal-backdrop" onClick={onClose} aria-hidden="true" />

      <div className="auth-modal-card">
        {/* Left: brand panel */}
        <aside className="auth-modal-brand">
          <div className="amb-logo">
            <span className="amb-glow" aria-hidden="true" />
            <BrandLogo size={118} />
          </div>
          <div className="amb-title" aria-hidden="true">ARCHLIGHT</div>
          <div className="amb-sub">Community Wiki</div>
          <p className="amb-tag">Sign in to suggest edits, track your contributions, and help build the codex.</p>
        </aside>

        {/* Right: form */}
        <section className="auth-modal-form">
          <div className="amf-tabs">
            <button type="button" className={`amf-tab${isLogin ? ' active' : ''}`} onClick={() => switchTab('login')}>
              Login
            </button>
            <button type="button" className={`amf-tab${!isLogin ? ' active' : ''}`} onClick={() => switchTab('register')}>
              Create Account
            </button>
            <button type="button" className="amf-close" aria-label="Close" onClick={onClose}>
              ✕
            </button>
          </div>

          <form className="amf-body" onSubmit={submit} noValidate>
            <label className="amf-field">
              <span>Username</span>
              <input
                className="amf-input"
                value={username}
                autoComplete="username"
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>

            {!isLogin && (
              <label className="amf-field">
                <span>Email</span>
                <input
                  className="amf-input"
                  type="email"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            )}

            <label className="amf-field">
              <span>Password</span>
              <input
                className="amf-input"
                type="password"
                value={password}
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {!isLogin && (
              <label className="amf-field">
                <span>Confirm password</span>
                <input
                  className="amf-input"
                  type="password"
                  value={confirm}
                  autoComplete="new-password"
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </label>
            )}

            {localError && <div className="form-error" style={{ margin: 0 }}>{localError}</div>}
            {serverError && <ErrorBox error={serverError} />}

            <button className="amf-cta" disabled={pending}>
              {pending ? (isLogin ? 'Signing in…' : 'Creating…') : isLogin ? 'Sign In' : 'Create Account'}
            </button>

            <div className="amf-switch">
              {isLogin ? (
                <>
                  Don’t have an account?{' '}
                  <button type="button" onClick={() => switchTab('register')}>
                    Create an account →
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button type="button" onClick={() => switchTab('login')}>
                    Sign in →
                  </button>
                </>
              )}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
 * App-wide trigger: <AuthModalProvider> renders the modal once and exposes
 * useAuthModal().open('login' | 'register') so any component can summon it.
 * ------------------------------------------------------------------------ */
interface AuthModalApi {
  open: (mode?: Mode) => void;
  close: () => void;
}
const AuthModalContext = createContext<AuthModalApi | null>(null);

export function useAuthModal(): AuthModalApi {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error('useAuthModal must be used within <AuthModalProvider>');
  return ctx;
}

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; mode: Mode }>({ open: false, mode: 'login' });
  const open = useCallback((mode: Mode = 'login') => setState({ open: true, mode }), []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);
  const api = useMemo(() => ({ open, close }), [open, close]);

  return (
    <AuthModalContext.Provider value={api}>
      {children}
      {state.open && <AuthModal mode={state.mode} onClose={close} />}
    </AuthModalContext.Provider>
  );
}
