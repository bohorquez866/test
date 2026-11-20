---
version: alpha
name: Marquee
description: Daily film discovery board with editorial typography, cool paper surfaces, and teal primary actions.
colors:
  background: "#eef1f4"
  foreground: "#0e1419"
  card: "#ffffff"
  card-foreground: "#0e1419"
  primary: "#0f766e"
  primary-foreground: "#ffffff"
  secondary: "#e7eef8"
  secondary-foreground: "#1d4ed8"
  muted: "#e4e9ee"
  muted-foreground: "#64748b"
  accent: "#d8edeb"
  accent-foreground: "#0f766e"
  destructive: "#b91c1c"
  border: "#d5dbe2"
  input: "#d5dbe2"
  ring: "#0f766e"
typography:
  sans:
    fontFamily: DM Sans
  heading:
    fontFamily: Fraunces
  mono:
    fontFamily: ui-monospace
rounded:
  base: 1.25rem
components:
  button:
    rounded: full
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.base}"
---

## Overview

Marquee is a daily film board: cool paper background, white content surfaces, teal primary actions, and Fraunces display type against DM Sans body copy. The product name is the brand signal in the sticky header; film titles reuse the same heading face.

## Colors

Use the light palette in `:root`. Surfaces sit on cool gray paper (`background`) with white cards and hairline borders. Primary teal marks brand actions and the “Today’s pull” eyebrow; secondary blue-tint chips support saved/secondary states; muted slate handles supporting copy. Keep the forced light `color-scheme`—do not ship dark UI as the default.

## Typography

Body, UI chrome, and supporting copy use `sans` (DM Sans). Product name, page titles, section titles, and film titles use `heading` (Fraunces) via `font-heading`. Prefer `text-balance` on display lines and `text-pretty` on short blurbs. Tabular numerals for year/runtime/rating rows.

## Layout

Content width caps at `max-w-6xl` with `px-4` / `sm:px-6`. Home opens as one composition: brand in the header, then a single hero (eyebrow, title, blurb, one CTA, one poster)—no stat strips or secondary promos in that first viewport. Grids and notices stay inside the same width system. Sticky header keeps search and nav above the board.

## Elevation & Depth

Default to flat bordered surfaces. Movie cards may use a light `shadow-sm` and a short poster scale on hover; respect `prefers-reduced-motion`. Do not stack multi-layer glows or floating badge overlays on posters.

## Shapes

Theme radius comes from `{rounded.base}` (`--radius`). Buttons are pills (`rounded-full`). Poster frames and movie cards use large rounded corners derived from the theme radius scale (`rounded-xl` / `rounded-2xl`), not sharp newspaper rules.

## Components

**Button** — Prefer the shared `Button` primitive. Primary fills teal; outline/secondary handle save and quieter actions. Large CTAs (`size="lg"`) for hero and empty states.

**Movie card** — Poster-led article with title link, year/rating, short overview, and watchlist control. The whole card is one hit target via the stretched title link; keep the watchlist control above that layer.

**Notice** — Centered empty/error state: heading, one supporting sentence, optional single CTA. No card chrome.

**Site header** — Sticky bar with Marquee wordmark (`font-heading`), text nav, and search. Brand type must remain the strongest identity signal in chrome.
