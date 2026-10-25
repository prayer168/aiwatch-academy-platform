# Attribution implementation plan

The public site currently extracts only `utm_source`, `utm_medium`, and `utm_campaign` through `readUtmAttribution()` in `apps/web/src/lib/utm.ts`. It trims values to 100 characters and rejects control characters. The helper does not persist values, send analytics, or associate them with a person.

Before registration is implemented, the product owner must approve the privacy notice, consent/retention rules, and whether first-touch/last-touch attribution is necessary. Once approved, pass the sanitized fields to the server-side registration flow and store them on the member record. Do not use browser storage or a third-party analytics SDK until those decisions are made. Never accept arbitrary query keys as attribution fields.
