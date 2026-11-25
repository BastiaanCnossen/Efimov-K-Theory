# Review of the to-do list, 4 November 2026

This records the mathematical review and edits made in response to the running TODO list. “Reviewed” means an AI review of the argument and its dependencies, not independent human verification. Previously completed citation checks were not all repeated.

## Items addressed, in list order

1. **AI disclosure.** The current Preface already distinguishes transcription, reorganization, and added exposition/proofs. Preserved it and updated the chapter source notes for the new material.
2. **Kerz–Strunk–Tamme.** Replaced the claimed two-sentence derivation by motivation. The pro-descent theorem is stronger than the inverse-limit consequence, and the requisite formal-gluing/localization comparison was not proved in these notes. Checked against [Theorem A](https://arxiv.org/pdf/1611.08466).
3. **Existing citation checks.** Retained the completed checks. Efimov references continue to use the explicitly recorded v4/v2 numbering; adding bibliography version fields is optional and was not needed to resolve the citations.
4. **Bibliography years.** Applied Bastiaan’s choice: both May 2026 arXiv postings have year 2026, with winter 2019/20 and summer 2022 lecture dates in their note fields.
5. **Semiorthogonal decompositions.** Checked the adjunction arguments in `prop:SOD_From_Short_Exact`; the dual argument concerns a coreflective localization and is now phrased using opposite categories.
6. **Calkin cofinality.** Added the proof using the comma category of factorizations through the filtered diagram. Compactness identifies its groupoid completion with a contractible fiber.
7. **Non-finitary K-theory universal property.** Added `Ramzi_Thesis`, printed p. 115, footnote 19. The footnote explicitly states this generality, but does not give a proof. Thus the missing-reference item is resolved, while a self-contained proof remains absent. Also corrected the claim that TC preserves filtered colimits: TC is localizing but need not be finitary.
8. **Tate extensions.** Reviewed the factorization criterion, use of the Tate classification, and the nondualizable example against the cited results. Corrected a substantive issue in the setup: the two pieces generate an ordinary semiorthogonal decomposition, but the inclusion given by the right adjoint need not be strongly continuous. Consequently the dualizable-gluing criterion cannot be applied there without its extra hypothesis.
9. **Four compact-morphism arguments.** Checked the zero-colimit test in the stable characterization; the Milnor argument, in which weak compactness kills every transition map on every homotopy group and hence both limit and derived limit; the identity criterion; and the adjunction identification of the counit. No further gap found under the stated hypotheses.
10. **(AB6).** Added a proof for sets using coordinatewise representatives and equality witnesses (and choice). For animae, reduce to directed posets, apply the set calculation to components, then restrict to pointed tails and apply it to all homotopy groups.
11. **Notation.** Retained `\colim` for `Ind(C) → C`, consistent with the manuscript. No mathematical reason to switch to the lecture notation `k`.
12. **Interpolation and rigidity.** Reviewed rational interpolation against KNP Propositions 2.4.4 and 2.4.6. Added the explanation that successive paths specify a point of the limit of a tower of animae. Finite-chain diagrams are controlled by their spines. Retained the compact-middle-object hypothesis in `prop:Nuclear_Rigid`, which is used in the factorization argument.
13. **Mathew’s examples.** Almost mathematics, perfect characteristic-p surjections, and compact-Hausdorff sheaves already occur in the thematic chapter. Closed the outstanding references rather than duplicating them.
14. **Gluing.** Added `prop:SOD_Dualizable` and `constr:Semiorthogonal_Gluing`, following Efimov Propositions 2.76–2.77. For triples `(x,y,x → F(y))`, the right adjoint of the C-inclusion is the fiber of the displayed map. Its strong continuity is equivalent to colimit preservation by F. The dualizability proof uses preservation of compact exhaustions. Registered both entries in `web/book.json` and updated the Preface.
15. **Bonn transcription.** The existing `Notes/24 37 - Dualizable categories.tex` already contains ten lectures and three exercise sessions. Inspected its coverage and compared the final pages with the lecture and exercise scans. This is not a fresh line-by-line audit of all 45 scanned pages. Residual checks are listed below.
16. **Nuclear basics.** Reviewed both interleaving arguments, the colimit argument, the countable directed subsets closed under the trace-class successor operation, and the retract-as-telescope step. These support the proposition under its stated hypotheses. The optional strengthening of (1)(c) remains open.
17. **Homological epimorphisms.** Replaced “glued from localizations” by the precise statement that the smashing kernel over a commutative Noetherian ring is compactly generated, citing Neeman Theorem 3.3 and Corollary 3.4. Perfect-algebra Tor vanishing is Bhatt–Scholze, *Witt vector affine Grassmannian*, Lemma 3.16. The perfectoid variant follows from the proof of *Prisms*, Lemma 10.3, since the tensor product in question is already derived p-complete. Added all three references to the shared bibliography.
18. **Noncompact generation of nuclear solid modules.** Added the Z_p example: compact generation would identify the category with D(Z_p), but continuous relative Hochschild homology is Z_p, whereas ordinary HH has nonzero degree-one homology. This is Efimov Corollary 7.20(i) and the discussion after Remark 7.21. Made the light-condensed convention explicit. Also removed the incorrect assertion that a derived-completion unit is noncompact whenever the ideal is not nilpotent (nonzero idempotent ideals give counterexamples); retained the concrete `(Z,(p))` example.
19. **Liquid operator-algebra formula.** Confirmed that the formula appears in the raw notes of Clausen’s third lecture, 19 July 2023. No published proof was located. The manuscript now explicitly says it is a lecture claim and is not proved here.

## Remaining author input or mathematical work

1. **Nuclear basics, resolved.** Bastiaan chose to retain the tensor-closure hypothesis. The question about dropping it was inherited from the TODO list. Talk 3 does not contain characterization (1)(c), so this was not a discrepancy with a stronger recorded lecture statement.
2. **Liquid formula.** Decide whether to keep the explicitly attributed lecture claim, supply another source, or omit it. The current text keeps it with its evidentiary limitation visible.
3. **Bonn notes.** Speaker attributions are now resolved by content comparison with the scan and Chowdhury’s contemporaneous notes. The erroneous attribution of Lecture 5 to Efimov has been corrected to Mathew. Dates are taken from the programme; exercise dates follow the three scheduled sessions in chronological order. Existing `CHECK (Bastiaan)` comments also flag the construction near line 464; sheaf subscripts and functor labels in Lecture 6; the hat on nuclear modules and diagram conventions in Lecture 7; an algebra type in Lecture 8; the final TR ring and motive target in Lecture 10; and incomplete/ambiguous exercise formulas and diagrams. These are source-transcription uncertainties, not settled mathematical assertions. The comments remain in place for comparison with the original handwriting.

## New reference sources

1. [Ramzi’s thesis](https://www.sas.rochester.edu/mth/sites/doug-ravenel/otherpapers/ramzi-thesis.pdf).
2. [Neeman, The chromatic tower for D(R)](https://www.sas.rochester.edu/mth/sites/doug-ravenel/otherpapers/neeman-chrom.pdf).
3. [Bhatt–Scholze, Projectivity of the Witt vector affine Grassmannian](https://people.mpim-bonn.mpg.de/scholze/Witt.pdf).
4. [Bhatt–Scholze, Prisms and prismatic cohomology](https://people.mpim-bonn.mpg.de/scholze/prisms.pdf).

## Validation

1. Ran `latexmk -pdf -interaction=nonstopmode -halt-on-error` outside the sandbox in the project directory. The build completed successfully, producing an 88-page PDF. The final log has no undefined references, undefined citations, or multiply defined labels.
2. Ran `chktex -q` on the changed chapter files and main file. It reports numerous warnings, including false positives for the required typed-label syntax, mathematical interval notation, and house-style name pairs. It is not a warning-free lint run. Overfull-box/layout warnings also remain in the LaTeX build.
3. Independently checked environment nesting, duplicate labels, unresolved `\Cref` targets, prohibited LaTeX syntax, and JSON validity. These checks passed.
4. Visually inspected the rendered pages containing the gluing construction and the added nuclear-solid obstruction. No layout defect was found in those additions. The website was not rebuilt or published.


## Follow-up: which Bonn ambiguities affect the meaning?

The following assesses the existing transcription flags from their mathematical context. It does not assert that every handwritten symbol has been deciphered.

1. **K-theory subscript.** The displayed equality with homotopy classes of maps to the zeroth anima of K(R) requires K_0. Its intended meaning is clear.
2. **Localizing invariants.** The theorem that pi_0 detects a natural isomorphism requires F and G to be localizing invariants, as its proof and application explicitly use. Arbitrary functors do not satisfy it. The missing hypothesis is clear.
3. **Positive versus nonnegative sheaves.** The proof cannot use the category already shown to have vanishing continuous invariants. The intended category is the kernel of compactly supported sections from the nonnegative category, denoted by the strict inequality in the following sequence. This identifies the needed correction; the preceding vanishing category cannot perform the claimed suspension.
4. **Compact subcategory in Exercise 1.** A must lie in C^omega for the stated quotient of compact categories even to be defined. In addition, the displayed quotient needs idempotent completion in general, as the subsequent x plus x[1] assertion and Neeman theorem indicate. This is more than an illegible superscript.
5. **Hat on nuclear modules.** The displayed dualizable limit of D(Z/p^n) determines which nuclear category is meant, independently of whether the lecture used a hat. It is Efimov's variant, not automatically the Clausen–Scholze category.
6. **Algebra type.** The surrounding k-linear module and representation categories support E_1-algebras over k. No E_k structure is used in this passage.
7. **Dyadic interpolation.** The intended construction begins with a sequential diagram and refines it to a rational/dyadic diagram with maps in S. The bracketed claim that the starting diagram was already Q-indexed is unnecessary. The mathematical construction is clear from S = S^2, although the raw sketch is incomplete.
8. **Truncated-polynomial notation in TR.** R[x^{-1}]/x^{-n} is meaningful if x^{-1} is the name of a polynomial variable: writing t = x^{-1}, it is R[t]/(t^n), not a quotient of a Laurent ring in which x is also present. This clarifies the ring notation, without independently checking the complete TR formula or its transition maps.
9. **Dual-object construction.** The displayed right-hand side is contravariant in y, as a represented Hom functor should be. The roles are x in C and y in C-dual. The typing is intelligible, but representability for arbitrary x is a mathematical assertion and is not established by this one-line construction alone.
10. **Right Kan extension annotation.** The displayed adjunction concerns a left-and-right-adjoint extension of a right adjoint. The raw RKE annotation may refer to that extension; identifying it with the particular Ind(G)-then-colimit formula still needs a proof. This is not merely a font or label choice.
11. **Topologies R_f and maps phi_f.** The topology, endpoint convention, and relation to the indicated subcategory of sheaves on [0,1) are not defined clearly enough to reconstruct uniquely. This remains a genuine source ambiguity.
12. **Final motive formula.** As transcribed it equates a mapping object with a fiber involving a motive and a category. Applying U_loc^cont to the nuclear category fixes the target's type, but the left side must also be clarified: internal Hom in motives, or a mapping spectrum with K-theory on the right? Both are plausible readings. This remains a genuine source ambiguity; changing only the target would not fix it.
13. **Gluing exercise.** With i_1 right-adjoint notation as written, i_1 i_1^R(t) maps to t by the counit. The displayed arrow in the reverse direction is labelled a unit. Thus at least one adjoint label, arrow direction, or gluing convention is wrong. The intended general theorem is clear, but the exact convention in the unfinished exercise is not.
14. **K-sheaf continuity.** For a decreasing filtered family of compact subsets Z_i with intersection Z, restriction maps point toward Z, and the usual continuity condition uses a colimit of values on Z_i. The raw formula says limit and does not specify the indexing family. The likely correction is clear under that assumption, but the missing assumptions must be recovered before treating it as a verified formula.
15. **Nuclear comparison diagram.** The expected comparison from the Clausen–Scholze category to Efimov's category is known, but the raw diagram switches from R^op to R and leaves the ambient vertical maps unspecified. These choices must be made consistently; the drawn diagram itself has not been verified.

Items 11–15 should remain flagged before incorporating this raw material into the thematic chapters. Items 9–10 require mathematical verification rather than a judgment about handwriting. The earlier summary overstated how much of this was merely notational.


## Bonn speaker attribution: resolved from the source content

Compared the original handwritten lecture scan with the official programme and the locally stored *Lecture Notes on Dualizable Categories and Localizing Invariants*, headed “Akhil Mathew, MPIM Bonn”, TeXed by Chirantan Chowdhury. This supplies an independent content match, rather than relying on matching programme numbers. Page numbers below refer to the handwritten PDF and agree with its handwritten page numbers.

| Handwritten talk | Scan pages | Content | Speaker | Evidence |
| --- | --- | --- | --- | --- |
| 1 | 1–4 | Localizing invariants and Calkin categories | Akhil Mathew | Page 1 explicitly names Mathew; matches Chowdhury Lecture I. |
| 2 | 4–6 | Presentable and dualizable categories | Akhil Mathew | Matches Chowdhury Lecture II, including the characterization of dualizability. |
| 3 | 7–10 | Further dualizability criteria, compact morphisms, examples | Akhil Mathew | Matches Chowdhury Lecture III, including almost and perfect-characteristic-p examples. |
| 4 | 10–14 | Flatness, correspondences and Tate extensions | Alexander Efimov | Page 10 explicitly says “Talk 4 – Efimov – Flatness and dualizability”. |
| 5 | 14–17 | The category of dualizable categories and localizing invariants | Akhil Mathew | Matches Chowdhury Lecture IV, pp. 9–11: same opening Ramzi theorem, omega_1 objects, completeness, colimits, Calkin sequences and extension of invariants. The handwritten heading on p. 14 contains no speaker name. |
| 6 | 18–22 | Sheaves and localizing invariants | Alexander Efimov | Page 18 explicitly names Efimov. |
| 7 | 23–26 | Dualizable inverse limits | Akhil Mathew | Matches Chowdhury Lecture V, pp. 11–14: same opening three failures of comparison with ordinary limits, same kernel example, adjunction and idempotent ideals of compact morphisms. |
| 8 | 27–33 | Sheaves II and nuclear modules | Alexander Efimov | Page 27 explicitly names Efimov; content continues his sheaf/localizing-motive series. |
| 9 | 33–35 | K-theory of inverse limits | Alexander Efimov | Page 33 explicitly names Efimov. |
| 10 | 36–39 | Rigidity of localizing motives, nuclear categories, TR and TC | Alexander Efimov | Continues the localizing-motive calculations of Talks 8–9 and matches the final part of Efimov’s advertised series. It is outside Mathew’s independently documented five-lecture sequence. |

The resulting division is Mathew: 1, 2, 3, 5, 7; Efimov: 4, 6, 8, 9, 10. It agrees with the programme, but the decisive evidence for Talks 5 and 7 is the independent content match. No speaker attribution remains genuinely uncertain. The prior provisional-attribution warning is superseded. The scheduled dates have been retained; the handwriting does not independently establish exact delivery times.

The source of the false Lecture 5 attribution was the transcription’s introductory list, not the handwritten heading. Corrected that list and made Mathew explicit in the corresponding section heading. Other mathematical CHECK comments remain separate from speaker attribution.
