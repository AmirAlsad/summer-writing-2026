// PDFs (and other embeddable documents) are auto-discovered from
// content/documents/ — no manual registration, mirroring images.ts.
//
// Drop a .pdf file in that folder and reference it in a post body with the
// inline marker `:::pdf the-filename` (with or without the .pdf extension).
//
// The ../../../ depth reaches out of this package into the repo-root content/
// dir; keep it in sync with content.ts and images.ts if files move.
const documentModules = import.meta.glob('../../../content/documents/*.pdf', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export const DOCUMENT_REGISTRY: Record<string, string> = {};
for (const path in documentModules) {
  const url = documentModules[path];
  const filename = path.split('/').pop() || '';
  const stem = filename.replace(/\.[^.]+$/, '');
  DOCUMENT_REGISTRY[filename] = url; // "essay.pdf"
  DOCUMENT_REGISTRY[stem] = url; // "essay"
}

export function resolveDocument(key?: string): string | undefined {
  if (!key) return undefined;
  return DOCUMENT_REGISTRY[key];
}
