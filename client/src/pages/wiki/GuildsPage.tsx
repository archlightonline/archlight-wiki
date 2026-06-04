import { CodexPage } from './_codex';
import { CODEX_GROUPS, CODEX_ENTRIES } from './guilds-data';

export function GuildsPage() {
  return <CodexPage slug="guilds" groups={CODEX_GROUPS} entries={CODEX_ENTRIES} defaultId="overview" />;
}
