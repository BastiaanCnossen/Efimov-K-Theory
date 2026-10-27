# Efimov K-theory web edition

The local web edition converts the written material in Chapters 1–4 and
Appendix A. Chapters 5–10 currently contain headings only: they remain visible
in the outline as material in preparation, without empty reading pages.
The edition is not published on the Website. The candidate work ID is
`efimov-k-theory`; public routes have not been frozen.

## Build and preview

From the notes folder, run `./web/build-web.ps1` in PowerShell with Node.js,
MiKTeX, make4ht, latexmk, biber and dvisvgm available. On this Windows setup,
Codex must run LaTeX compilation outside its sandbox. The full PDF is compiled
in `tmp/web/pdf/`, leaving the existing root PDF alone. TeX4ht conversions and
SVG diagrams are cached in `tmp/web/`, keyed by their source and preamble.

The build assembles into `output/web-staging/`. Only a validated candidate
replaces `output/web/`; the previous local bundle is retained in a timestamped
`output/web-previous-.../` folder. A failed conversion does not replace the
preview. This is a local preview transaction, not public publication.

The complete static bundle includes the current full PDF, local MathJax and
fonts, and SVG diagrams. Reading needs no external services. The Books & notes
return link points to the local Website preview.

The preview is at `http://127.0.0.1:8881/`. To start it yourself:

```powershell
python -m http.server 8881 --bind 127.0.0.1 --directory output/web
```

Run `node web/verify-browser.mjs` while that preview is running to audit every
chapter, section and bibliography formula in headless Edge/Chrome. The audit
also loads every diagram and detects undefined commands that MathJax renders
as red text. Run the Website's
`publication/reader-shell-v1/test-browser.mjs` with this bundle as its argument
for settings, navigation, proof and formula-copy acceptance tests.

`-SkipPdf` reuses the existing temporary PDF and AUX/BBL files. Use it only
when the mathematical sources have not changed since their compilation.

## Source and identities

1. The pre-pilot root and Chapter 2 files are preserved in
   `Backup before web pilot 2026-10-27/`. The complete manuscript as it stood
   before extending the conversion is preserved in
   `Backup before complete web edition 2026-10-27/`, with the chapter structure.
2. `book.json` holds chapter and section IDs, result labels, entry IDs and
   descriptions. Every entry ID was individually chosen from its mathematical
   content. IDs do not depend on numbering or source-file names. Existing
   Chapter 2 routes are unchanged.
3. Every proof environment has `\prooffor{result-label}` immediately before it.
   The optional argument identifies a variant, for example
   `\prooffor{thm:Compactly_Assembled_Omega_1}[kernel-proof]`. A result's entry
   includes all its proof variants. The no-op definition in
   `proof-ownership.tex` keeps this metadata invisible in the PDF.
4. Twelve previously unlabelled results received typed labels in the complete
   conversion, in addition to the three added during the original pilot.
   Mathematical prose is unchanged. No `proofdetail` layers were introduced.
5. References to converted material link to entry, section or chapter pages.
   References to unwritten chapters use named destinations in the current PDF.
   Equation tags and result numbering come from the full PDF's AUX file, so
   numbering is consistent on section pages and individual entry pages.

`source-metadata.json` records the full-conversion backup hashes and exactly
which invisible annotations were added. Run the initial migration check with
`./web/build-web.ps1 -VerifySourcePreservation`, or run
`node web/finalize.mjs output/web --verify-source-metadata` on an existing
bundle. This comparison is intentionally optional on subsequent builds:
ordinary future mathematical edits should not be blocked by an old backup.
The generated `_meta/source-build.json` records the sources of each build.

When a new result or section is added, the strict registry check asks for an
explicit ID and description. When a planned chapter acquires content, register
it in `chapters` and remove it from `plannedChapters`. These are editorial
choices, not numbering-based names invented by the converter.

## Shared infrastructure

The canonical reader is `Website/publication/reader-shell-v1`, including its
styles, settings, ledgers, formula copying and four navigation controls. Its
revision receipt is installed and validated in every bundle. The shared
conversion helpers in `Website/publication/latex-web-v1` supply AUX parsing,
bibliography rendering, macro extraction, ordinary proofs, content styles and
the pinned MathJax runtime. These are build-time dependencies; the generated
bundle is self-contained. The other editions retain their own source adapters.

The work-specific adapter prepares a complete chapter per TeX4ht conversion,
then splits its HTML into chapter, section and result pages. The appendix is
converted in appendix mode, with its A-prefixed counters. Authored chapter
introductions remain on chapter pages. The manuscript's MathJax-safe
`preamble.sty` supplies mathematical macros; there is no second handwritten
copy of the macro list in the converter.

Diagrams are cached by a hash of their source and preamble, rendered to SVG,
given explicit dimensions and lazy loading, and individually described in
`diagram-descriptions.json`. Description keys hash only the diagram source,
so a preamble edit does not discard the descriptions. A missing description
fails the build.

## Validation and limits

`finalize.mjs` checks every local link and HTML fragment, exact route coverage,
result and proof counts, PDF equation numbering, the reader receipt,
non-adjacent proof ownership and multiple proof variants. It rejects conversion
residue rather than silently ignoring it. Browser checks additionally exercise
the real MathJax renderer, diagrams and shared reader controls.

The source adapter currently supports the manuscript's ordinary theorem-like
environments and displayed tikz-cd diagrams. It should be extended explicitly
if the notes gain narrative figures, nested theorem environments, or other new
source constructs. Front matter remains available in the PDF; this extension
covers the chapters and appendix. Before public publication, review the
candidate identities and register the work with the Website publisher and its
permanent route ledger.
