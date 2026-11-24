import { SCHOOLS_TH } from "./schools";
import { PLAYGROUPS_TH } from "./playgroups";
import { CAMPS_TH } from "./camps";
import { ACTIVITIES_TH } from "./activities";
import { PROVIDERS_TH } from "./learningSupport";

/**
 * English paths that have a Thai twin under /th. Used for the sitemap's
 * hreflang pairs and for the ไทย link in every header, so they can never
 * disagree. Add a section here when it gets translated.
 */
export function thTwinPaths(): string[] {
  return [
    "/",
    "/schools",
    "/contact",
    "/playgroups",
    "/camps",
    "/activities",
    "/learning-support",
    "/healthcare/emergency-numbers",
    ...Object.keys(SCHOOLS_TH).map((s) => `/schools/${s}`),
    ...Object.keys(PLAYGROUPS_TH).map((s) => `/playgroups/${s}`),
    ...Object.keys(CAMPS_TH).map((s) => `/camps/${s}`),
    ...Object.keys(ACTIVITIES_TH).map((s) => `/activities/${s}`),
    ...Object.keys(PROVIDERS_TH).map((s) => `/learning-support/${s}`),
  ];
}
