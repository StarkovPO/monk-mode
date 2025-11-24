# Monk Mode Constitution
<!-- Example: Spec Constitution, TaskFlow Constitution, etc. -->

## Core Principles

### I. Mobile-First, Offline-Ready
<!-- Example: I. Library-First -->
[Primary] Target iOS and Android. App works offline with mocked/bundled data; no backend. Persist state, history, and streaks in on-device storage. Minimal taps to start and complete a session.
<!-- Example: Every feature starts as a standalone library; Libraries must be self-contained, independently testable, documented; Clear purpose required - no organizational-only libraries -->

### II. Accessibility & Simplicity
<!-- Example: II. CLI Interface -->
Design for clarity and inclusion: readable typography and contrast, proper labels for VoiceOver/TalkBack, minimum touch targets, predictable navigation. Keep flows simple and distraction-free.
<!-- Example: Every library exposes functionality via CLI; Text in/out protocol: stdin/args → stdout, errors → stderr; Support JSON + human-readable formats -->

### III. Test-First MVP Scope (NON-NEGOTIABLE)
<!-- Example: III. Test-First (NON-NEGOTIABLE) -->
Define acceptance criteria before implementation. Cover timer engine, presets sequencing, audio cueing, and streak logic with tests. MVP scope is fixed (no custom presets).
<!-- Example: TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced -->

### IV. Performance & Reliability
<!-- Example: IV. Integration Testing -->
Smooth UI updates and timely audio cues. Timer accuracy ±1 sec/min under normal device conditions. Resilient to backgrounding and resume; state is consistent on return.
<!-- Example: Focus areas requiring integration tests: New library contract tests, Contract changes, Inter-service communication, Shared schemas -->

### V. Privacy by Default
<!-- Example: V. Observability, VI. Versioning & Breaking Changes, VII. Simplicity -->
No PII collection. Data stays on device. Provide clear data reset. No analytics or 3rd‑party tracking SDKs in MVP.
<!-- Example: Text I/O ensures debuggability; Structured logging required; Or: MAJOR.MINOR.BUILD format; Or: Start simple, YAGNI principles -->

## Mobile App Constraints
<!-- Example: Additional Constraints, Security Requirements, Performance Standards, etc. -->

- Platforms: iOS and Android; distribution via App Store and Google Play.
- Data: On-device storage only; clearing app data resets all local history and streaks.
- Audio: Use OS media playback with optional mute; app must advance even if audio is blocked.
- Time: Streaks based on device local timezone; day credit on session start.
- Network: No network required in MVP; all content and presets are bundled/mocked.
- Permissions: No sensitive permissions in MVP; degrade gracefully if audio unavailable.
- Localization: English only for MVP; copy kept concise and readable.
<!-- Example: Technology stack requirements, compliance standards, deployment policies, etc. -->

## Development Workflow & Quality Gates
<!-- Example: Development Workflow, Review Process, Quality Gates, etc. -->

- Branching: Use N-short-name (e.g., 1-meditation-timer-streaks) tied to an approved spec.
- Source of truth: Spec files govern scope; any scope change updates the spec first.
- Reviews: At least one reviewer; verify against Acceptance Criteria and Checklist.
- Testing: Unit tests for timer/streak logic; manual run-through of user scenarios before merge.
- Builds: Verify iOS and Android builds complete locally before marking done.
- DoD: All Success Criteria pass; checklist complete; no regressions to core flows.
<!-- Example: Code review requirements, testing gates, deployment approval process, etc. -->

## Governance
<!-- Example: Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

This Constitution supersedes ad-hoc practices. Amendments require a PR updating this document and impacted specs, with rationale. All PRs must attest compliance or document approved exceptions.
<!-- Example: All PRs/reviews must verify compliance; Complexity must be justified; Use [GUIDANCE_FILE] for runtime development guidance -->

**Version**: 1.0.0 | **Ratified**: 2025-11-14 | **Last Amended**: 2025-11-14
<!-- Example: Version: 2.1.1 | Ratified: 2025-06-13 | Last Amended: 2025-07-16 -->
