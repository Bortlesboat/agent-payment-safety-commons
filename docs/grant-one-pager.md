# Agent Payment Safety Commons Grant One-Pager

## Project

Agent Payment Safety Commons is an open-source test suite and reference safety vocabulary for autonomous agent payments across x402, MPP, and adjacent pay-per-call API ecosystems.

## Problem

The new agentic payment stack is moving quickly. Agents can discover paid APIs, authorize stablecoin payments, and retry with proofs. But most payment safety practices still assume a human checkout screen. Autonomous agents need machine-readable guardrails:

- per-call and per-day spend limits
- challenge/receipt binding
- replay protection
- resource and network verification
- clear audit logs
- prompt-to-payment intent checks

Without this layer, builders risk accidental spend, hidden purchases, replayed receipts, and hard-to-debug disputes.

## Proposed Work

Build a public commons of fixtures, tests, and reference patterns:

1. Synthetic safety fixtures for x402/MPP payment flows.
2. A no-dependency local checker for spend policy, receipt binding, replay, and prompt/payment conflicts.
3. A Base/x402 demo flow that runs against testnet or dry-run challenges before any real wallet use.
4. A documentation kit for builders adding paid API or paid MCP endpoints.
5. A privacy-preserving receipt/audit-log format for operators.

## Public Benefit

This is not a proprietary checkout product. It is shared infrastructure for anyone building or reviewing autonomous payment tools. Payment protocols benefit when developers can test unsafe cases before live wallets are involved.

## Milestones

- Month 1: publish fixtures, checker, docs, and dry-run CLI.
- Month 2: add Base/x402 integration examples and CI templates.
- Month 3: add MPP/pay.sh-style examples, operator receipt schema, and ecosystem implementation guide.

## Funding Request

Suggested grant range: `15,000-35,000 EUR/USD equivalent`, depending on whether live integration examples and ecosystem partner support are included.

## Existing Proof

The current repository contains a runnable starter:

```bash
npm test
npm run check
```

It produces `output/safety-report.json` with pass/fail verdicts for four synthetic payment scenarios.
