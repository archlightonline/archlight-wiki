import { useMemo } from 'react';
import { renderMarkdown } from '../lib/markdown';

export function Markdown({ content }: { content: string }) {
  const html = useMemo(() => renderMarkdown(content), [content]);
  // eslint-disable-next-line react/no-danger
  return <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />;
}
