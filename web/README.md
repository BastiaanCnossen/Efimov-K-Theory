# Efimov K-theory web edition

The local web edition converts the preface, the written material in Chapters
1–7, and Appendix A. Chapters 8–11 currently contain headings only: they remain visible
in the outline as material in preparation, without empty reading pages.
The work ID is `efimov-k-theory`. The Animarium draft is prepared at
`/efimov-k-theory/`, with a single sibling PDF at `/efimov-k-theory.pdf`.
These addresses must remain stable once published online.

## Build and preview

From the notes folder, run `./web/build-web.ps1` in PowerShell with Node.js,
MiKTeX, make4ht, latexmk, biber and dvisvgm available. On this Windows setup,
Codex must run LaTeX compilation outside its sandbox. The full PDF is compiled
in `tmp/web/pdf/`, leaving the existing root PDF alone. TeX4ht conversions and
SVG diagrams are cached in `tmp/web/`, keyed by their source and preamble.

The build assembles into `output/web-staging/`. Only a validated candidate
replaces `output/web/`; the previous local bundle is retained in a timestamped
`output/web-previous-.../` folder. Older preview archives are pruned after a
successful replacement, retaining one rollback bundle. A failed conversion does not replace the
preview. This is a local preview transaction, not public publication.

The complete static bundle includes the current full PDF, local MathJax and
fonts, and SVG diagrams. Reading needs no external services. The Animarium
return link points to the surrounding Animarium.

The preview is at `http://127.0.0.1:8881/`. To start it yourself:

```powershell
python -m http.server 8881 --bind 127.0.0.1 --directory output/web
```

Run `node web/verify-browser.mjs` while that preview is running to audit every
chapter, section and bibliography formula in headless Edge/Chrome. The audit
also loads every diagram and detects undefined commands that MathJax renders
as red text. Run the Animarium's
`publication/reader-shell-v1/test-browser.mjs` with this bundle as its argument
for settings, navigation, proof and formula-copy acceptance tests.

Run `node web/test-promote-local.mjs` to check preview replacement and archive
retention in an isolated temporary directory, including rejection of an
unvalidated candidate.

`-SkipPdf` reuses the existing temporary PDF and AUX/BBL files. Use it only
when the mathematical sources have not changed since their compilation.

## Source and identities

1. Git history preserves the source. The temporary source snapshots used to
   verify the original web conversion have been removed, together with their
   one-time preservation check. Ordinary builds validate the current manuscript.
2. `book.json` holds chapter and section IDs, result labels, entry IDs and
   descriptions. Every entry ID was individually chosen from its mathematical
   content. IDs do not depend on numbering or source-file names. Existing
   Chapter 2 routes are unchanged.
3. Every proof environment has `\prooffor{result-label}` immediately before it.
   The optional argument identifies a variant, for example
   `\prooffor{thm:Compactly_Assembled_Omega_1}[kernel-proof]`. A result's entry
   includes all its proof variants. The no-op definition in
   `proof-ownership.tex` keeps this metadata invisible in the PDF.
4. Previously unlabelled results receive typed labels when they are converted.
   These annotations leave mathematical prose unchanged. No `proofdetail`
   layers are introduced.
5. References to converted material link to entry, section or chapter pages.
   References to unwritten chapters use named destinations in the current PDF.
   Equation tags and result numbering come from the full PDF's AUX file, so
   numbering is consistent on section pages and individual entry pages.

The generated `_meta/source-build.json` records source hashes for each build,
so the converted edition can be checked against the current manuscript.

When a new result or section is added, the strict registry check asks for an
explicit ID and description. When a planned chapter acquires content, register
it in `chapters` and remove it from `plannedChapters`. These are editorial
choices, not numbering-based names invented by the converter.

## Shared infrastructure

The canonical reader is `Animarium/publication/reader-shell-v1`, including its
styles, settings, ledgers, formula copying and four navigation controls. Its
revision receipt is installed and validated in every bundle. The shared
conversion helpers in `Animarium/publication/latex-web-v1` supply AUX parsing,
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
with line endings normalized, so an editor's line-ending change or a preamble
edit does not discard the descriptions. A missing description
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
source constructs. The preface is extracted from its heading up to `\mainmatter`
in the root manuscript. It includes acknowledgments, a description of AI
assistance, and chapter-by-chapter source notes. Refresh the Animarium copy after a source build
with `./publish-notes.ps1 -WorkId efimov-k-theory` from the Animarium repository.
Its configuration and permanent address ledger are owned by that repository;
do not copy files into the public work folder by hand.
