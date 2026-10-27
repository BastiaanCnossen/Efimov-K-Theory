# Efimov K-theory notes – to-do list

## Use of generative AI
- [ ] Write the "Use of generative AI" chapter in the front matter (Bastiaan). It should say what was transcribed from handwritten/Markdown notes and what was drafted by AI from the literature (most of Chapter 2, Appendix A, the Chapter 3 intro and continuous-posets example, several proofs). The Preface now points to this chapter.

## Claims to verify or soften (Chapter 1)
- [x] `Shv(ℝⁿ; Sp)` has no nonzero compact objects: now cites Neeman (Doc. Math. 2001), Thm 0.1, and Efimov, *Large categories*, Prop 10.17.
- [x] "Every dualizable category is of the form `D(A → B)`": no reference found in Efimov's papers; added a proof (`prop:Every_Dualizable_Kernel`, Chapter 4, AI-drafted – please check).
- [x] Description of `Nuc(R)` in Chapter 1: replaced by Efimov's presentation Nuc^CS(R^∧_I) ≃ D(End_R(P) → Calk^top_R(P)) (*Inverse limits*, Cor 7.7).
- [ ] Two-sentence derivation of Kerz–Strunk–Tamme from nuclear modules – check or soften.

## Citation numbers to check
- [x] HTT: all numbers checked against the version on Lurie's webpage; fixed 5.5.3.18 (a Theorem), compact-unit reference is Cor 7.3.4.12.
- [x] HA: checked; 1.1.3.7 is a Corollary (fixed); 7.1.2.1 (Schwede–Shipley) added.
- [x] Nikolaus–Scholze: Theorem I.3.3 and Proposition I.3.5 checked.
- [x] Kelly–Street: now cites Section 2.2, Propositions 2.1 and 2.2.
- [x] Hermitian K-theory II: now cites Lemma A.1.8 / Prop A.1.9 (Verdier sequences) and Thm A.5.1 / Cor A.5.10 (Tate classification).
- [x] Efimov: Sections 1.4, 1.9, 1.13 – replaced by exact numbers from arXiv v4 (all `Efimov_Large_Categories` numbers in the chapters now refer to v4; consider adding `version = {4}` to the bib entry).

## Bibliography
- [x] Gaitsgory–Rozenblyum: numbers checked (Ch. 1, Def 9.1.2, Lemma 9.1.5, Cor 9.1.7, §9.2.1).
- [ ] `Scholze_Analytic_Geometry` and `Clausen_Scholze_Complex_Geometry` have years 2019/2022 (lectures) but are arXiv postings from May 2026 (2605.03655, 2605.11731) – decide which year to use.
- [x] `Johnstone_Joyal_Continuous_Categories`: page numbers added (255–296).
- [x] Publication details of all bib entries added in this project checked online (Crossref, publisher pages, library catalogues): Krause, Gabber–Ramero, Thomason–Trobaugh, Suslin–Wodzicki, Kerz–Strunk–Tamme, Borel–Serre, Thomason, Barwick, Johnstone–Joyal, Gierz et al., Tamme, Land–Tamme, Keller, Milnor, Neeman, Hennion.
- [x] `Cnossen_StableHomotopy`, Section "Symmetric monoidal duality": checked; the criterion used in Appendix A is Corollary 11.1.13 (`cor:Characterization_Dualizable_Objects`) in the current draft. Cited by section name since the draft numbering may still change.

## Chapter 2 – parts to read closely
- [ ] Proof of `prop:SOD_From_Short_Exact` (short exact sequences with adjoints give semiorthogonal decompositions).
- [ ] Cofinality claim in `rem:Calkin_Mapping_Spectra`.
- [x] Tamme excision: added a proof via continuous K-theory and pointers to Tamme and Land–Tamme. Tamme's original argument is not reproduced.
- [ ] `thm:K_Universal_Property`: the general version without the filtered-colimits condition has no reference yet.

## Chapter 3
- [x] `prop:Extension_Dualizable_Tate` and `ex:Extension_Not_Dualizable`: full proofs added, following Efimov, *Large categories*, Prop 6.3 and Prop 6.8 (uses Hennion, Tate objects, Thm 3). AI-drafted – please check.

## Later chapters
- [ ] Chapter 5 (compact morphisms, AB6): decide on content after the corresponding talk in Marc's seminar. Candidates: comparison of elementwise vs. natural definition of compact morphisms; compactly exhaustible objects (Mathew, Lecture 3); Clausen's internal characterization; strongly continuous functors preserve compact morphisms; equivalent forms of (AB6); possibly Clausen's `(C, S)^dual` construction (or in Chapter 6).
- [ ] Chapter 4: Mathew's examples (almost mathematics, perfect 𝔽ₚ-algebras, `Shv(X)`).
- [ ] Gluing / semiorthogonal decompositions of dualizable categories (TODO in Chapter 2, Talk 6).
- [ ] Transcribe the scanned Bonn workshop notes once available.

## Chapter 4 (Talk 3) – to check
- [ ] `ex:Homological_Epis` (1)–(2): references (Noetherian case glued from localizations; perfect F_p-algebras, perfectoid variant).
- [x] `prop:Almost_Derived_Category`: Serre quotient vs Verdier quotient now cites Krause, *Localization theory for triangulated categories*, §7.7.
- [x] Equivalence of the rigidity definitions in Chapters 1 and 4: short argument added to the remark after `def:Rigid_Category_Detailed`.
- [x] `rem:Trace_Class_Basics`(3): proof added (`lem:Identity_Trace_Class`, idempotent-splitting argument).
- [x] `thm:Rigid_Trace_Class`: Ramzi references for the hard implications added; (3) ⇒ (1) holds with the dualizability hypothesis (noted in the text).
- [x] Ramzi, *Locally rigid ∞-categories*: numbers checked against v1 and v2 PDFs; the notes now cite v2 numbering. Consider `version = {2}` in the bib.
- [x] `ex:Shv_Compact_Hausdorff_Rigid`: references complete (KNP Prop 2.8.7, HTT Cor 7.3.4.12).
- [x] Section 4.5 (nuclear modules): exact numbers from Efimov's *Localizing invariants of inverse limits* (v2) added; fixed "Section 6" → Section 7.2, added the Noetherian hypothesis for lim K(R/I^n).
- [x] Andreychev's thesis: checked. Efimov's "Satz 3.8" is Lemma 3.8 (C(S,R) nuclear); Korollar 3.14 correct. Rational descent in Chapter 1 now cites Satz 4.2 (Nuk) and Satz 5.12 (Nisnevich descent for F^cont), with the sheafy analytic hypothesis added.
- [ ] `ex:Nuclear_Solid`: softened to "in general not compactly generated"; still needs a justification (e.g. for R = Z_p), see CHECK comment.
- [x] `ex:Nuclear_Banach`: rewritten with references (Andreychev Lemma 3.8; Clausen–Scholze, *Analytic geometry*, Thm 14.10).
- [ ] Liquid formula D^liq(C)^rig ≃ D(B(H) → B(H)/S_{0+}) in `ex:Nuclear_Liquid_Gaseous`: not found in Clausen–Scholze's notes (only independence of p, Cor 8.18); still only from Clausen's lectures.
