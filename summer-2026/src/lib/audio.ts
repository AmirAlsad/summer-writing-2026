// Audio files (podcasts, recordings) are auto-discovered from content/audio/ —
// no manual registration, mirroring images.ts and documents.ts.
//
// Drop an audio file in that folder and reference it in a post body with the
// inline marker `:::audio the-filename` (with or without the extension).
//
// The ../../../ depth reaches out of this package into the repo-root content/
// dir; keep it in sync with content.ts, images.ts and documents.ts if files move.
const audioModules = import.meta.glob('../../../content/audio/*.{mp3,m4a,wav,ogg,aac}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export const AUDIO_REGISTRY: Record<string, string> = {};
for (const path in audioModules) {
  const url = audioModules[path];
  const filename = path.split('/').pop() || '';
  const stem = filename.replace(/\.[^.]+$/, '');
  AUDIO_REGISTRY[filename] = url; // "episode.mp3"
  AUDIO_REGISTRY[stem] = url; // "episode"
}

export function resolveAudio(key?: string): string | undefined {
  if (!key) return undefined;
  return AUDIO_REGISTRY[key];
}
