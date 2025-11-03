# Dream Home Real Estate – Property UX Research

## Objectives
- Capture pro-level expectations for listing index and detail experiences.
- Translate insights into actionable front-end scaffolding notes.
- Align with upcoming backend roadmap (search, analytics, lead routing).

## Listing Page Best Practices
1. **Hero context** – concise KPI ribbon (inventory count, avg days on market) to set market context.
2. **Discoverability** – layered filters (status, price, beds/baths, lifestyle tags) plus quick sort dropdowns.
3. **Saved search cues** – placeholder CTA for alerts; remind users that personalization is coming.
4. **Card anatomy** – consistent media ratio, badges for status, micro-metrics row (beds/baths/sqft) and CTA.
5. **Market insights** – embed a lightweight insights panel (e.g., price bands, neighbourhood callouts) for trust.
6. **Lead capture** – soft CTA ("Book Tour") or contact drawer accessible from each card at minimum.

## Property Detail Page Best Practices
1. **Above-the-fold clarity** – address, price, status, shareable actions (tour, favorite, share) grouped near hero image.
2. **Media-first presentation** – hero carousel + gallery grid placeholders sized for 16:9 and 4:3.
3. **Deal highlights** – high-level facts: beds/baths/sqft, lot size, HOA/condo fees, property type.
4. **Lifestyle storytelling** – sections for neighbourhood, amenities, smart home tech, sustainability notes.
5. **Data trust** – placeholders for disclosures (MLS #, last updated) and upcoming map/schools integrations.
6. **Conversion paths** – structured contact card, tour scheduler, and document download stubs.

## Implementation Notes
- Use placeholder imagery via `https://placehold.co/` until CMS assets land.
- Keep components stateless; backend team will hydrate with live data later.
- Annotate integration points with `TODO (Backend Team)` comments for clarity.
- Favor semantic sections and descriptive class names for the future design pass.
