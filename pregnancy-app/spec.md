# Pregnancy Companion App — Spec

## Overview

A mobile app for pregnant women in Israel that acts as a digital pregnancy companion and file manager. It organizes medical information, tracks pregnancy progress, and guides the user through every stage — from the moment she finds out she's pregnant until birth.

**Not a replacement for a doctor.** The app organizes, interprets, and reminds — it does not diagnose or prescribe.

---

## Target Users

- Any pregnant woman in Israel, regardless of whether it's her first pregnancy or not
- Partners who want to follow along and stay informed

---

## Language

- English (Hebrew support planned for future)

---

## Business Model

- One-time purchase (~₪30)

---

## Core Features

### 1. Home Screen
- Displays current pregnancy week (calculated from first day of last period)
- Fun and informative facts about the baby's development at that specific week
- Quick-access buttons to main sections

### 2. Medical Calendar
- Full timeline of recommended tests and checkups across all 40 weeks
- For each test:
  - What it is and why it's done
  - Which week it should happen
  - Whether it's covered by the HMO or private (and approximate cost)
  - When to book it (with warnings for time-sensitive tests, e.g. NT ultrasound at week 12–14)
- Reminders and notifications for upcoming tests and booking deadlines

### 3. Symptom Tracker
- Log symptoms week by week
- For each symptom, the app provides:
  - Whether it's common at this stage
  - Non-prescription suggestions to manage it
  - When to consult a doctor

### 4. Document Vault
- Upload and store files from doctor visits (ultrasounds, blood tests, referrals, etc.)
- Organized by date and category
- The app provides plain-language interpretation of common test results
- Partner access: share the vault with a partner
- **Future goal:** Direct integration with Israel's 4 HMOs (Clalit, Maccabi, Meuhedet, Leumit) to automatically pull test results and visit summaries

### 5. Shopping Lists
- **Nursery checklist** — everything needed to set up the baby's room
- **Labor bag checklist** — what to bring to the hospital
- Items are categorized, checkable, and editable
- Suggestions appear progressively as the pregnancy advances (not all at once)

### 6. Stroller Recommender
- Recommends strollers based on:
  - Where the user lives (city vs. rural, elevator vs. stairs, public transport usage)
  - Lifestyle and needs
  - Budget
- Provides a shortlist with pros/cons for each option

### 7. Partner Access
- The user can invite her partner to view the app
- Partner can see: pregnancy week, upcoming tests, document vault, shopping lists
- Partner cannot edit medical data

---

## Future Goals

- Full HMO integration (Clalit, Maccabi, Meuhedet, Leumit)
- Hebrew language support
- Postpartum / baby tracking phase after birth
- Community features (forums, Q&A)
