// One Line, One Laugh — entry program.
//
// Writes a single funny line to /output/entry.txt (or $OUTPUT_DIR/entry.txt).
// The line is three short beats: a familiar smartwatch notification, the
// absurd twist that the wearer was asleep, and the quiet turn that the
// watch knows things about the wearer's body that the wearer does not.
// The rhythm — three sentences, full stops intact — is the joke, so the
// text below is written exactly as the entry and never reformatted.

import { mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My smartwatch congratulated me on closing my rings today. I was asleep. It knows things about my body that I do not.";

const MAX_CHARS = 200;

function countCodePoints(text: string): number {
  return [...text].length;
}

function validateEntry(text: string): void {
  const chars = countCodePoints(text);
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  // Reject anything that would survive a casual read but change what the
  // judge sees: control characters, line/paragraph separators, and
  // invisible formatting characters (non-breaking space, zero-width
  // joiner/non-joiner, byte-order mark).
  for (const ch of text) {
    const cp = ch.codePointAt(0) as number;
    const bad =
      (cp >= 0x00 && cp <= 0x1f) ||
      (cp >= 0x7f && cp <= 0x9f) ||
      cp === 0x2028 ||
      cp === 0x2029 ||
      cp === 0x00a0 ||
      cp === 0x200b ||
      cp === 0x200c ||
      cp === 0x200d ||
      cp === 0xfeff;
    if (bad) {
      throw new Error(
        `entry contains forbidden character U+${cp.toString(16).toUpperCase().padStart(4, "0")}`,
      );
    }
  }
}

function clearOutputDirContents(dir: string): void {
  // Never remove the output directory itself: on the grader it is a mount
  // point and deleting it fails. Clear only what is inside it.
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  validateEntry(ENTRY);

  const outDir = process.env.OUTPUT_DIR ?? "/output";
  clearOutputDirContents(outDir);

  const outPath = join(outDir, "entry.txt");
  const bytes = Buffer.from(ENTRY, "utf8");
  writeFileSync(outPath, bytes);

  // Read the file back and verify it byte-for-byte before reporting success.
  // Compare raw bytes, then decode strictly: a silent replacement
  // character would hide a corrupted write, so invalid UTF-8 must fail
  // loudly here.
  const roundTrip = readFileSync(outPath);
  if (!roundTrip.equals(bytes)) {
    throw new Error("read-back mismatch: entry.txt bytes do not match the entry");
  }
  const decoded = new TextDecoder("utf-8", { fatal: true }).decode(roundTrip);
  if (decoded !== ENTRY) {
    throw new Error("read-back mismatch: strict UTF-8 decode of entry.txt differs from the entry");
  }
  const size = statSync(outPath).size;
  console.log(`wrote ${outPath}: ${countCodePoints(decoded)} characters, ${size} bytes, 1 line, no trailing newline`);
}

main();
