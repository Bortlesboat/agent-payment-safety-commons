# NLnet Draft: Agent Payment Safety Commons

## Project Name

Agent Payment Safety Commons

## Abstract

Agent Payment Safety Commons will provide libre/open-source safety fixtures, test tools, and reference documentation for autonomous software agents that make pay-per-call API payments using emerging protocols such as x402 and MPP. The project helps developers detect unsafe payment flows before real wallets are used, including over-budget purchases, replayable receipts, hidden payment intent, and missing challenge/receipt binding.

## Requested Support

`25000 EUR`

## Why This Matters

Machine-to-machine payments are becoming practical. AI agents can discover paid resources, receive payment challenges, authorize stablecoin payments, and call APIs without a pre-existing account. This creates a powerful open internet primitive, but also introduces new failure modes: agents may approve costs the user did not intend, reuse stale receipts, pay the wrong network, or lose the audit trail needed to resolve disputes.

The digital commons needs shared safety infrastructure so open implementations do not each reinvent these checks differently.

## What Will Be Delivered

- Open test fixtures for x402/MPP-style agent payment flows
- A local CLI checker for payment policy, receipt binding, replay detection, and prompt/payment conflicts
- CI templates for projects exposing paid APIs or paid MCP tools
- A privacy-preserving receipt schema for operator audits
- Documentation showing safe integration patterns and known anti-patterns

## Open Licensing

All software and documentation will be released under a libre/open license. The initial repository uses MIT.

## Standards and Interoperability

The project targets open payment and web standards wherever possible: HTTP `402`, machine-readable payment challenges, stablecoin payment proofs, and interoperable JSON fixtures. The work is designed to support x402, MPP, and future compatible protocols without requiring a proprietary provider.

## Work Plan

### Month 1

- Harden the scenario format and CLI checker
- Add additional fixtures for budget, replay, receipt-binding, network, and prompt-injection cases
- Publish integration documentation

### Month 2

- Add CI templates and machine-readable report schema
- Add Base/x402 dry-run and testnet examples
- Add receipt/audit-log examples

### Month 3

- Add MPP/pay.sh-style examples
- Write implementation guide for paid API and paid MCP builders
- Produce a final public report with lessons and next steps

## Prior Art and Starting Point

The first public packet already contains a no-dependency Node.js checker and synthetic payment fixtures. It intentionally avoids private keys, paid calls, or production probing so reviewers can run it safely.

## Requested Outcome

By the end of the grant, developers should be able to add a safety test suite to an agent-payment project before connecting a real wallet.
