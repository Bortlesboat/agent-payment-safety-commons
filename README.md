# Agent Payment Safety Commons

Open safety infrastructure for the emerging agentic payment economy.

AI agents can now discover APIs, receive `402 Payment Required` challenges, authorize stablecoin payments, and retry requests with payment proofs. Protocols such as x402 and MPP make the transaction path possible. This project focuses on the trust layer around that path: spend limits, payment metadata, replay boundaries, receipt quality, and safe approval behavior.

## What This Repo Contains

- A no-dependency Node.js safety checker for agent payment scenarios
- Synthetic x402/MPP-style fixtures with safe, risky, and blocking cases
- A grant one-pager for public-good funding conversations
- Draft applications for NLnet-style open technology grants and Base-style builder rewards
- A short Pay.sh ecosystem note for partner/developer-relations outreach

## Why It Matters

Agentic payments fail differently from normal checkout flows. A human checkout can rely on human intent, UI review, and one-time manual approval. An autonomous agent needs machine-readable safety rails:

- Which payment is being approved?
- Is the amount inside policy?
- Can the payment be replayed?
- Did the seller bind the receipt to the requested resource?
- Did a prompt or tool call hide a purchase behind a harmless-looking action?
- Can operators audit what happened after the fact?

The goal is a shared commons of tests, fixtures, and reference behavior that payment-tool builders can reuse before putting autonomous spend in front of real wallets.

## Quick Start

```bash
npm test
npm run check
```

The checker reads `scenarios/payment-scenarios.json` and writes `output/safety-report.json`.

## Current Scope

This first packet is intentionally small:

- no wallets
- no private keys
- no paid network calls
- no production merchant probing

It proves the safety vocabulary and test shape before expanding into live Base/x402/MPP integrations.

## Funding Targets

- NLnet / NGI Zero Commons: open digital commons, libre tooling, open standards
- Base Builder Rewards / Grants: shipped public-good infrastructure for Base/x402 builders
- Pay.sh / Solana x402-MPP ecosystem: developer tooling for safer agent-to-API payments

## License

MIT
