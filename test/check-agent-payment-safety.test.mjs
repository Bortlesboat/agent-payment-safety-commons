import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { evaluateScenario, run, summarize } from "../src/check-agent-payment-safety.mjs";

test("passes a small authorized x402 API payment", () => {
  const result = evaluateScenario({
    id: "small",
    protocol: "x402",
    network: "base",
    amountUsd: 0.01,
    policy: {
      maxPerCallUsd: 0.05,
      allowedNetworks: ["base"],
      requireReceiptBinding: true,
      allowPromptRequestedPurchase: true
    },
    paymentChallenge: {
      resource: "https://example.invalid/api",
      nonce: "n1"
    },
    receipt: {
      resource: "https://example.invalid/api",
      network: "base",
      nonce: "n1"
    },
    prompt: "Pay up to five cents if required."
  });

  assert.equal(result.verdict, "pass");
  assert.deepEqual(result.findings, []);
});

test("blocks payment amounts above policy", () => {
  const result = evaluateScenario({
    id: "expensive",
    protocol: "x402",
    network: "base",
    amountUsd: 5,
    policy: {
      maxPerCallUsd: 1,
      allowedNetworks: ["base"],
      requireReceiptBinding: false,
      allowPromptRequestedPurchase: true
    },
    paymentChallenge: {},
    receipt: {},
    prompt: "Buy if needed."
  });

  assert.equal(result.verdict, "fail");
  assert.equal(result.findings[0].code, "amount_exceeds_policy");
});

test("blocks replay-style nonce mismatches", () => {
  const result = evaluateScenario({
    id: "replay",
    protocol: "mpp",
    network: "base",
    amountUsd: 0.1,
    policy: {
      maxPerCallUsd: 1,
      allowedNetworks: ["base"],
      requireReceiptBinding: true,
      allowPromptRequestedPurchase: true
    },
    paymentChallenge: {
      resource: "https://example.invalid/quote",
      nonce: "fresh"
    },
    receipt: {
      resource: "https://example.invalid/quote",
      network: "base",
      nonce: "old"
    },
    prompt: "Pay for the quote."
  });

  assert.equal(result.verdict, "fail");
  assert.equal(result.findings[0].code, "receipt_nonce_mismatch");
});

test("summarizes pass/fail and severity totals", () => {
  const summary = summarize([
    { verdict: "pass", findings: [] },
    { verdict: "fail", findings: [{ severity: "critical" }, { severity: "high" }] }
  ]);

  assert.deepEqual(summary, {
    checked: 2,
    passed: 1,
    failed: 1,
    criticalFindings: 1,
    highFindings: 1
  });
});

test("writes a report from fixture scenarios", async () => {
  const dir = await mkdtemp(join(tmpdir(), "agent-payment-safety-"));
  const out = join(dir, "report.json");

  try {
    const report = await run("scenarios/payment-scenarios.json", out);
    const written = JSON.parse(await readFile(out, "utf8"));
    assert.equal(report.summary.checked, 4);
    assert.equal(report.summary.passed, 1);
    assert.equal(report.summary.failed, 3);
    assert.equal(written.results.length, 4);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
