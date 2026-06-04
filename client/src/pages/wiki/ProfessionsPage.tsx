import { CodexPage } from './_codex';
import { CODEX_GROUPS, CODEX_ENTRIES } from './professions-data';

export function ProfessionsPage() {
  return <CodexPage slug="professions" groups={CODEX_GROUPS} entries={CODEX_ENTRIES} defaultId="system" />;
}
