import { PLAYGROUPS_ZH } from "./playgroups";
import { CAMPS_ZH } from "./camps";
import { ACTIVITIES_ZH } from "./activities";
import { PROVIDERS_ZH } from "./learningSupport";
import { SCHOOLS_ZH } from "./schools";

/**
 * English paths that have a Chinese twin under /zh. Used for the sitemap's
 * hreflang pairs and for the 中文 link in the English header, so the two
 * can never disagree. Add a section here when it gets translated.
 */
export function zhTwinPaths(): string[] {
  return [
    "/",
    "/playgroups",
    "/camps",
    "/activities",
    "/learning-support",
    "/schools",
    ...Object.keys(SCHOOLS_ZH).map((s) => `/schools/${s}`),
    ...Object.keys(PLAYGROUPS_ZH).map((s) => `/playgroups/${s}`),
    ...Object.keys(CAMPS_ZH).map((s) => `/camps/${s}`),
    ...Object.keys(ACTIVITIES_ZH).map((s) => `/activities/${s}`),
    ...Object.keys(PROVIDERS_ZH).map((s) => `/learning-support/${s}`),
  ];
}
