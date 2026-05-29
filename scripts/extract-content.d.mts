// Type declarations for the plain-JS content extractor (extract-content.mjs).
export interface ExtractedPage {
  id: string;
  slug: string;
  title: string;
  category: string;
  subcategory: string | null;
  source: string;
  lead: string;
  markdown: string;
  tags: string[];
  imageCount: number;
}

export const SOURCE_DIR: string;
export function htmlToMarkdown(html: string): string;
export function loadConceptIds(): Set<string>;
export function loadNavModel(): {
  idToCat: Map<string, string>;
  idToTitle: Map<string, string>;
  groups: unknown[];
};
export function extractIndexPages(): ExtractedPage[];
export function extractUnlockPages(): ExtractedPage[];
export function extractUpdatePages(): ExtractedPage[];
export function extractAllPages(): ExtractedPage[];
