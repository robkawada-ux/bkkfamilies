import { SCHOOLS_TH } from "./schools";
import { PLAYGROUPS_TH } from "./playgroups";
import { CAMPS_TH } from "./camps";
import { ACTIVITIES_TH } from "./activities";

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
    "/healthcare/emergency-numbers",
    ...Object.keys(SCHOOLS_TH).map((s) => `/schools/${s}`),
    ...Object.keys(PLAYGROUPS_TH).map((s) => `/playgroups/${s}`),
    ...Object.keys(CAMPS_TH).map((s) => `/camps/${s}`),
    ...Object.keys(ACTIVITIES_TH).map((s) => `/activities/${s}`),
  ];
}
