# Mathematical repairs and restructuring

This is the implementation record for the whole-manuscript review of 4 November 2026. The original audit remains in `README.md`; the current claim statuses are in `resolutions.json` and the regenerated ledger. “Repaired” records a changed statement or argument and a rereading, not independent formal verification of the manuscript.

## Mathematical disposition

| Finding | Disposition |
| :--- | :--- |
| C01 | Restricted the Verdier condition to Verdier sequences, specified reducedness and a stable target, and repaired the proof via idempotent completions. Added the precise connective-K-theory source location. |
| C02 | Distinguished rigidity for compact Hausdorff spaces from local rigidity and categorical Verdier self-duality in the general case. |
| C03 | Corrected all base-change functors in the left-module discussion, including the Morita presentation. |
| C04 | Replaced the eventual-equality quotient by countable directed subsets closed under chosen successors. Supplied the cofinality and essential-smallness arguments. Generalized the appendix indexing lemma to filtered colimits only. |
| C05 | Stated the cardinal-controlled rigidification adjunction and cited the following remark for the compact-object construction. Preserved the factorization hypothesis. |
| C06 | Specified small simplicial diagram shapes, explicitly using the quasicategory model for that convention. |
| C07 | Added the nonzero ideal hypothesis and identified a nonzero object of the large kernel. |
| C08 | Replaced the continuous-invariant proof of Tamme excision by the lax-pullback proof, with the suspension sign explained. No general-target extension theorem is now being used implicitly. |
| C09 | Replaced “group completion is automatic” by the K_0 cofiber relation and the spectrum-level additivity assertion, distinguishing these from direct-sum inverses. |
| C10 | Added positive-dimensional and complex-Hilbert-space qualifications, corrected the rational-open wording, clarified idempotent completion conventions, and cited Efimov Corollary 7.11 for the comparison of the two nuclear categories. |
| C11 | Replaced the unsupported uniqueness argument with explicitly labelled proof orientation and an external proof reference. Corrected the variance in continuity. |
| C12.1 | Specified the split exact interpretation of the Hilbert model and attributed the model and its monoidal structure to Clausen's second lecture. This remains a qualified lecture claim, not a newly verified theorem. |
| C12.2 | Defined h-unitality using unitalization, explained the bar convention, and supplied KNP Section 2.10 references. The source check revealed that the converse needs surjectivity on pi_0; this is now included, with the cited polynomial-localization counterexample. |
| C12.3 | Made completion conventions derived, fixed the specified solid analytic structure, and removed the unproved blanket independence statement and imprecise tensor formula. |
| C12.4 | Kept the liquid operator formula explicitly attributed to unpublished lecture notes. Removed the unsupported blanket assertion that rigidity implies failure of compact generation. |
| C12.5 | Made the finitary motives universal property precise, fixed universes and domains, and explained the Day operadic unit directly from the non-finitary universal property. The latter universal property remains an imported assertion with the existing thesis-footnote reference and its explicit limitation. |
| C13 | Added continuity, large-Ind restriction, Morita-action and filtered-comma-category explanations. Corrected the lift description to a commuting square. The original review's proposed triangle wording was inaccurate and was not adopted. |

No new bibliography entries were needed. References newly made precise include KNP Definition 2.10.2, Corollary 2.10.6, Proposition 2.10.7 and Example 2.10.8; Efimov Proposition 1.23, Remark 1.24(i) and Corollary 7.11; Tamme Proposition 10 and Theorem 15; and BGT Theorem 9.8. The original handwritten material has not been altered.

## Resulting order

1. Introduction and overview.
2. Stable categories and localization sequences.
3. Compactly assembled and dualizable categories.
4. Compact morphisms and the axiom (AB6).
5. Examples of dualizable categories, ending with extensions and semiorthogonal gluing.
6. Rigidity and nuclear objects.
7. Planned: Calkin categories, colimits and limits.
8. Planned: Localizing invariants of dualizable categories.
9. Planned: Sheaves.
10. Planned: Dualizability and flatness.
11. Planned: Aleph_1-presentability of Pr^dual.

Appendix A remains a reference appendix. The basic dualizable-localization proposition and omega_1-generation theorem remain in Chapter 3: their proofs do not require Chapter 4, whereas Chapter 4 uses omega_1-generation. Moving them would create dependencies rather than remove them. The stronger characterization of strongly continuous functors likewise remains with that theorem; its proof already uses only material available there and in the appendix.

The dualizable gluing criterion and construction moved from Chapter 2 to the end of Chapter 5, alongside the Tate-extension material moved from Chapter 3. Both now follow the compact-exhaustion and AB6 criteria used in their proofs. The Tate discussion is explicitly optional on a first reading. The ordinary semiorthogonal decomposition material stays in Chapter 2.

The old Sections 4.4–4.5 form the new Chapter 6. Its rational interpolation prerequisite now comes earlier. The detailed nuclear operator-algebra presentation moved from the introduction into the solid nuclear example. The introduction retains the main computation and refers to the detailed treatment.

The roadmap, title-page attribution, Preface source notes, main inputs and web registry were updated. The planned chapters remain visible, with a notice in the PDF that no proofs are included. Their web outline entries remain marked as planned.

All existing labels and web entry IDs were preserved. The only new structural labels are `chap:Rigidity_And_Nuclear_Objects` and `sec:Extensions_And_Gluing`. The ledger now includes 191 theorem-like entries: its original count of 190 omitted the existing introductory convention, which is now included. Explicit forward references to later written chapters dropped from 19 in the original audit to 14. The remaining ones are chiefly previews and comparisons; the count is not itself a count of proof dependencies.

## Remaining judgment and verification limits

The two operator-category descriptions, for compact operators and for liquid modules, remain explicitly attributed to Clausen's lectures. Keeping such a clearly qualified record is consistent with working notes; presenting either as a proved reference theorem would require a further proof or published source. Whether to omit these descriptions from a public edition is an authorial decision, not a blocker for this revision.

The non-finitary universal property is still imported with its existing explicit source limitation. The Day-unit explanation states its dependence on that result. The finitary motives theorem is not used to conceal this additional generality.

The broader exposition pass E01–E07 has not been substituted for mathematical verification. This revision implements the requested repairs and restructuring, with the transition prose needed for the new order.

## Validation

The repaired manuscript compiled successfully before restructuring. The restructured manuscript also compiled successfully, producing the refreshed 89-page root PDF, with no unresolved citations or cross-references. Existing overfull-box warnings remain. Seven rendered pages covering the repaired arguments and new chapter boundaries were visually inspected.

ChkTeX was run on all edited LaTeX files; it reported no errors and many warnings associated with the existing typed-label, citation, math-spacing and half-open-interval conventions. Label preservation, unique claim IDs and absence of unresolved explicit chapter cross-references were checked mechanically. The ledger and web-build source hashes match the final sources. `git diff --check` passed.

The local web build validated 232 pages, 69 proofs, 18 diagrams and 7,808 local links. The Tamme proof-ownership check was updated to recognize the replacement lax-pullback proof. The local preview was refreshed; nothing was published.

The headless-browser audit passed on every frontmatter, chapter, section and references route: no MathJax errors or undefined commands, missing diagram images, conversion residue or browser errors. The initial attempt could not reach the sandboxed loopback server; rerunning with the loopback server outside the sandbox succeeded. The detailed rendering report is in `tmp/web/browser-validation.json`.
