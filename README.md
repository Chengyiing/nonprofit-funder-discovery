# Funder Compass

Funder Compass is a public-interest web tool that helps small nonprofits identify potential funders using historical public grant data. The application combines cleaned grant records, aggregated funder profiles, and a recommendation pipeline to return ranked funder suggestions, sample past grants, and plain-language rationale.

## Project Purpose

This project was developed as a Carnegie Mellon University Heinz College capstone in collaboration with KMSG. The system is designed as a lightweight decision-support tool rather than a funding predictor. Its purpose is to help nonprofit users move from a broad funding need to a shortlist of plausible funders grounded in public grant history.

## What the App Does

A nonprofit user can enter:

- issue area / keywords
- short mission or context
- city and state
- desired grant amount
- optional annual operating budget

The app then:

1. validates the request
2. reads funder profile data and cleaned grant evidence
3. ranks funders based on topic fit, geography fit, and grant-size fit
4. returns result cards with explanation text and representative past grants

## High-Level Architecture

The project is organized into four layers:

### 1. Data Layer

Prepared CSV files are used as the application data source.

- `data/raw/final_grants_clean.csv`
  - cleaned grant-level table
  - one row per grant record
  - used for sample past grants and evidence display

- `data/raw/funder_profile_final.csv`
  - aggregated funder-level table
  - one row per funder
  - used for recommendation and result display

### 2. Recommendation Layer

Located mainly in `src/lib/recommendations/`.

Responsible for:

- loading and parsing CSV data
- validating user input
- computing recommendation scores
- generating user-facing rationale
- assembling structured outputs for the frontend

### 3. Application Layer

Implemented through the API route:

- `src/app/api/recommendations/route.ts`

Responsible for:

- receiving frontend requests
- validating and normalizing request payloads
- calling the recommendation pipeline
- returning ranked results as JSON

### 4. Presentation Layer

Implemented through `src/app/` and `src/components/`.

Responsible for:

- homepage
- tool page
- result cards
- sample grant display
- method / disclaimer / contact pages
- general navigation and layout

---

## Repository Structure

### Top-Level Folders

#### `data/`

Stores application data files.

Typical usage:

- `data/raw/final_grants_clean.csv`
- `data/raw/funder_profile_final.csv`

Do **not** treat this folder as a dumping ground for large intermediate files. Only keep data needed by the app or by clearly documented scripts.

#### `public/`

Static assets for the website:

- logos
- PNG/SVG images
- favicon and partner branding assets

#### `scripts/`

Utility scripts for data preparation, migration, or one-off maintenance tasks.

If you add a new script, document:

- what it reads
- what it writes
- whether it is safe to rerun

#### `src/`

Main application source code.

---

## `src/` Guide

### `src/app/`

Next.js app routes and pages.

Important pages:

- `src/app/page.tsx` — homepage
- `src/app/tool/page.tsx` — main tool page
- `src/app/about/page.tsx` — project / institutional context
- `src/app/method/page.tsx` — plain-language explanation of method
- `src/app/disclaimer/page.tsx` — user-facing caveats
- `src/app/contact/page.tsx` — team and partner information

Important API:

- `src/app/api/recommendations/route.ts`
  - backend entry point for recommendation requests
  - keep request/response contracts stable when possible

### `src/components/`

Reusable frontend components.

Common subareas:

- `src/components/layout/`
  - site header
  - site footer
  - partner logos
  - shared container / layout components

- `src/components/search/`
  - nonprofit input form and related controls

- `src/components/funders/`
  - funder result cards and related display components

Other reusable components may include:

- explanation blocks
- sample grant lists
- homepage-specific UI sections

### `src/lib/`

Application logic and supporting utilities.

Most important area:

- `src/lib/recommendations/`

This folder contains the recommendation pipeline and related types/utilities.

Recommended mental model:

- `csvData.ts`
  - loads and parses cleaned CSVs
  - normalizes rows into internal objects
  - may cache parsed data for reuse

- `match.ts`
  - main ranking logic
  - combines topic fit, geography fit, and grant-size fit
  - returns scored funders

- `generateExplanation.ts`
  - converts structured recommendation context into user-facing rationale
  - may use LLM-based rewriting depending on current implementation

- `types.ts`
  - central TypeScript contracts for recommendation inputs and outputs

- `inputSchema.ts`
  - runtime validation for incoming requests

If recommendation behavior changes, this folder is usually the first place to inspect.

---

## Data Pipeline Overview

The app is built on two downstream CSVs derived from a cleaned source dataset.

### Source

A grant-level source table contains:

- funder identity fields
- recipient organization fields
- grant amount, purpose, and year
- optional funder financial metadata

### Cleaning / Transformation Goals

The data pipeline standardizes:

- names
- city / state / ZIP fields
- URLs
- numeric grant and financial fields
- purpose categories

### Final Outputs

The pipeline produces:

1. a cleaned grant-level table for evidence and sample grants
2. an aggregated funder-level table for recommendation serving

If these outputs are regenerated, make sure:

- the app still points to the expected filenames
- the required columns are preserved
- any downstream parsing logic is updated if column names change

---

## Local Development

Install dependencies:

```bash
npm install
