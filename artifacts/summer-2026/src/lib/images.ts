import vcity1 from "@assets/vice-city-1_1779737850089.png";
import vcity2 from "@assets/vice-city-2_1779737850108.png";
import vcity3 from "@assets/vice-city-3_1779737850108.png";
import emptyStreet from "@assets/empty-street_1779737879648.png";

export const IMAGE_REGISTRY: Record<string, string> = {
  "vice-city-1": vcity1,
  "vice-city-2": vcity2,
  "vice-city-3": vcity3,
  "empty-street": emptyStreet,
};

export function resolveImage(key?: string): string | undefined {
  if (!key) return undefined;
  return IMAGE_REGISTRY[key];
}
