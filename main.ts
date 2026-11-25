// The Most Boring Object, Reviewed in One Line.
// Writes one funny, true review of a boring everyday object to
// $MAKEFUN_OUTPUT_DIR/entry.txt (or /output/entry.txt in the grader).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REVIEW =
  "My doorstop has held the same door open for six years without a thank-you, a promotion, or a day off — and it has never complained, because nobody would hear it anyway.";

function validate(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`review must be 1-200 characters, got ${chars.length}`);
  }
  if (text.trim().length === 0) throw new Error("review must not be blank");
  if (text.includes("\n")) throw new Error("review must be a single line");
  if (text !== text.trim()) throw new Error("review must have no leading/trailing whitespace");
  const bytes = Buffer.byteLength(text, "utf8");
  if (bytes > 400) throw new Error(`review must be at most 400 bytes, got ${bytes}`);
  if (!text.toLowerCase().includes("doorstop")) {
    throw new Error("review must name its boring object");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
validate(REVIEW);
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, REVIEW, "utf8");

// Read-back check: what landed on disk must be exactly the review.
const onDisk = readFileSync(outPath, "utf8");
if (onDisk !== REVIEW) throw new Error("read-back mismatch");
console.log(`wrote ${onDisk.length} chars to ${outPath}`);
