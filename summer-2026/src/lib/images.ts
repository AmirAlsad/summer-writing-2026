// Images are auto-discovered from content/images/ — no manual registration.
// Drop a file in that folder and reference it in a post's front matter by
// filename (with or without extension): image: "foo.png" or image: "foo".
//
// The ../../../ depth reaches out of this package into the repo-root content/
// dir; keep it in sync with content.ts if files move.
const imageModules = import.meta.glob(
  '../../../content/images/*.{png,jpg,jpeg,gif,svg,webp,avif}',
  { eager: true, import: 'default' },
) as Record<string, string>;

export const IMAGE_REGISTRY: Record<string, string> = {};
for (const path in imageModules) {
  const url = imageModules[path];
  const filename = path.split('/').pop() || '';
  const stem = filename.replace(/\.[^.]+$/, '');
  IMAGE_REGISTRY[filename] = url; // "foo.png"
  IMAGE_REGISTRY[stem] = url; // "foo"
}

export function resolveImage(key?: string): string | undefined {
  if (!key) return undefined;
  return IMAGE_REGISTRY[key];
}
