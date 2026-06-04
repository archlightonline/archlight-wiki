import { Routes, Route } from 'react-router-dom';
import { WikiLayout } from './layouts/WikiLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Home } from './pages/Home';
import { WikiPage } from './pages/WikiPage';
import { CategoryBrowser } from './pages/CategoryBrowser';
import { Contribute } from './pages/Contribute';
import { ClassesPage } from './pages/ClassesPage';
import { DEDICATED_WIKI_ROUTES } from './pages/wiki/routes';
import { SearchResults } from './pages/SearchResults';
import { ContributionForm } from './pages/ContributionForm';
import { RevisionHistory } from './pages/RevisionHistory';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';
import { PageEditor } from './pages/PageEditor';
import { AdminPanel } from './pages/AdminPanel';

export default function App() {
  return (
    <Routes>
      {/* Public wiki — custom wiki layout with sidebar nav */}
      <Route element={<WikiLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/wiki/classes" element={<ClassesPage />} />
        {/* Dedicated wiki pages — must precede the generic catch-all below */}
        {DEDICATED_WIKI_ROUTES.flatMap((r) =>
          r.paths.map((p) => <Route key={p} path={p} element={r.element} />),
        )}
        <Route path="/wiki/:slug" element={<WikiPage />} />
        <Route path="/browse" element={<CategoryBrowser />} />
        <Route path="/category/:category" element={<CategoryBrowser />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/contribute/:slug" element={<ContributionForm />} />
        <Route path="/history/:slug" element={<RevisionHistory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Authenticated editor tools — DashboardLayout */}
      <Route element={<DashboardLayout require="editor" />}>
        <Route path="/new" element={<PageEditor mode="create" />} />
        <Route path="/edit/:slug" element={<PageEditor mode="edit" />} />
        <Route path="/admin" element={<AdminPanel tab="contributions" />} />
        <Route path="/admin/contributions" element={<AdminPanel tab="contributions" />} />
      </Route>

      {/* Admin-only tools */}
      <Route element={<DashboardLayout require="admin" />}>
        <Route path="/admin/users" element={<AdminPanel tab="users" />} />
        <Route path="/admin/pages" element={<AdminPanel tab="pages" />} />
      </Route>
    </Routes>
  );
}
