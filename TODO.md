# Efimov K-theory notes – to-do list

Review of 4 November 2026: see `TODO-review.md` for arguments checked, corrections, and remaining author input. Checked boxes record this review, not independent human verification.

## Talk 7 (24 November 2026)

1. [x] Incorporated Christoph Winges’s lecture in Chapter 7 (Codex). Checked the limit addendum against Efimov, Theorem 2.91, the two product formulas for ind-objects against Proposition 2.99 and Corollary 2.100, and the dual localization argument against Lemma 2.104 and Proposition 2.105.
2. [x] Style-and-merge pass (Claude, 25.11.2026): cite `lem:Compact_Iff_Yhat_Is_Y` instead of reproving it; notation and spacing as in the rest of the notes; stated the duality facts (`lem:Duality_Localizations`) and Efimov's Lemma 2.104 (`lem:Dual_Product_Embedding`) explicitly; citation of Efimov Prop 2.103 for `cor:Products_Dualizable_Calkin`; added Kasprowski–Winges to the bibliography (publication details checked online); removed "In the talk, ..." remarks that only recorded omissions of a talk.
3. [ ] AI-drafted proofs in Sections 7.5–7.6 to check (Bastiaan), in particular:
   - [ ] `prop:Exact_Products_AB6_Dualizable`: the commutation of the square via the mate (Efimov's Lemma 2.104(2) only shows that the image lands in the right place; this resolves the "canonical functor" question from the talk), in particular the identification of `α_ψ` with the counit map.
   - [ ] `thm:General_Limits_Dualizable`, Step 3: fully faithfulness of `Ind(lim B_i) → lim^dual Ind(B_i)`.
   - [ ] `lem:Dual_Product_Embedding`: homological epimorphisms are self-dual (`p` homological epi ⇒ `p^op` homological epi) via "homological epi = epi in Cat_perf".
4. [ ] References from memory, not yet checked against the source: HTT Proposition 5.5.7.10 (PrL_κ ≃ small categories with κ-small colimits) and the claim that limits there are computed in Cat (`thm:General_Limits_Dualizable`, Step 1); Kasprowski–Winges, Lemma 5.2 (number taken from Efimov). (Efimov, Proposition 1.4(3), for compact generation of Cat_perf: checked in v4.)

## Comments of 25.11.2026

- [ ] `thm:K_Unit_Day_Convolution`: explanation and proof sketch rewritten (Claude, AI-drafted) – please check; uses without reference that tensoring with a fixed object of Cat_perf preserves short exact sequences.

- [ ] Prove `thm:Tamme_Excision` in Chapter 8 via `prop:Dualizable_Pullbacks`(2) and the continuous extension (Efimov, Prop 8.11), once the continuous extension is set up there for accessible targets (Efimov, Thm 8.10). Chapter 2 now only sketches this and summarizes Tamme's lax-pullback proof in `rem:Tamme_Lax_Pullback_Proof`; the statement in Chapter 2 is Tamme's general one.

## Whole-manuscript review

The consecutive reading is recorded in [Review/README.md](Review/README.md), with a [claim ledger](Review/claim-ledger.md) and [forward-reference inventory](Review/forward-references.md). The subsequent repairs and chapter moves are recorded in [Review/repair-and-restructuring.md](Review/repair-and-restructuring.md). The original audit is historical; current statuses are in the ledger and `Review/resolutions.json`. Chapter numbers in the older checklist below refer to the pre-restructuring edition; result labels remain stable.

1. [x] Read all written chapters and Appendix A, and inspect the Preface and planned chapters.
2. [x] Inventory theorem-like statements, explicitly assigned proofs, narrative segments, citations and explicit dependencies, with source hashes.
3. [x] Record correctness issues, missing explanations, density problems and a proposed reading order.
4. [x] Repair C01–C10, including the Verdier-localization distinction, module handedness, omega_1-generation argument and rigidification universal property.
5. [x] Resolve C11–C13 by supplying explanations, correcting hypotheses or explicitly qualifying imported claims. The h-unital converse now includes surjectivity on pi_0. The lecture-only formulas and non-finitary universal property retain the source limitations recorded in the ledger.
6. [x] Implement S01–S03, update the Preface and web registry, and reread the moved blocks and transitions. Keep omega_1-generation in Chapter 3 because Chapter 4 depends on it.
7. [x] Complete the broader exposition pass E01–E07: proof strategies, a localization terminology table, shorter previews, reordered technical remarks, and more evenly structured analytic examples. See [the exposition report](Review/exposition-pass.md). This is an editorial pass, not renewed verification of all claims.

## Use of generative AI
- [x] Integrate the account of AI assistance into the Preface, distinguishing conversion and reorganization of lecture notes from added exposition and proofs. The chapter-by-chapter source notes identify additions from the literature, and the Preface states that some added arguments still require checking.

## Claims to verify or soften (Chapter 1)
- [x] `Shv(ℝⁿ; Sp)` has no nonzero compact objects: now cites Neeman (Doc. Math. 2001), Thm 0.1, and Efimov, *Large categories*, Prop 10.17.
- [x] "Every dualizable category is of the form `D(A → B)`": no reference found in Efimov's papers; added a proof (`prop:Every_Dualizable_Kernel`, Chapter 4, AI-drafted – please check).
- [x] Description of `Nuc(R)` in Chapter 1: replaced by Efimov's presentation Nuc^CS(R^∧_I) ≃ D(End_R(P) → Calk^top_R(P)) (*Inverse limits*, Cor 7.7).
- [x] Kerz–Strunk–Tamme: replaced the purported derivation by motivation and explicitly separated pro-descent from the missing formal-gluing argument.

## Citation numbers to check
- [x] HTT: all numbers checked against the version on Lurie's webpage; fixed 5.5.3.18 (a Theorem), compact-unit reference is Cor 7.3.4.12.
- [x] HA: checked; 1.1.3.7 is a Corollary (fixed); 7.1.2.1 (Schwede–Shipley) added.
- [x] Nikolaus–Scholze: Theorem I.3.3 and Proposition I.3.5 checked.
- [x] Kelly–Street: now cites Section 2.2, Propositions 2.1 and 2.2.
- [x] Hermitian K-theory II: now cites Lemma A.1.8 / Prop A.1.9 (Verdier sequences) and Thm A.5.1 / Cor A.5.10 (Tate classification).
- [x] Efimov: Sections 1.4, 1.9, 1.13 – replaced by exact numbers from arXiv v4 (all `Efimov_Large_Categories` numbers in the chapters now refer to v4; consider adding `version = {4}` to the bib entry).

## Bibliography
- [x] Gaitsgory–Rozenblyum: numbers checked (Ch. 1, Def 9.1.2, Lemma 9.1.5, Cor 9.1.7, §9.2.1).
- [x] Use 2026 for the two Clausen–Scholze arXiv postings and record the original lecture dates in note fields, as agreed by Bastiaan.
- [x] `Johnstone_Joyal_Continuous_Categories`: page numbers added (255–296).
- [x] Publication details of all bib entries added in this project checked online (Crossref, publisher pages, library catalogues): Krause, Gabber–Ramero, Thomason–Trobaugh, Suslin–Wodzicki, Kerz–Strunk–Tamme, Borel–Serre, Thomason, Barwick, Johnstone–Joyal, Gierz et al., Tamme, Land–Tamme, Keller, Milnor, Neeman, Hennion.
- [x] `Cnossen_StableHomotopy`, Section "Symmetric monoidal duality": checked; the criterion used in Appendix A is Corollary 11.1.13 (`cor:Characterization_Dualizable_Objects`) in the current draft. Cited by section name since the draft numbering may still change.

## Chapter 2 – parts to read closely
- [x] Checked `prop:SOD_From_Short_Exact`; corrected the coreflective-localization terminology in the dual argument.
- [x] Added the comma-category proof of cofinality in `rem:Calkin_Mapping_Spectra`.
- [x] Tamme excision: replaced the continuous-K-theory argument with Tamme's lax-pullback proof, which applies to invariants valued in any stable category. See C08 in the repair report.
- [x] Added Ramzi’s thesis, p. 115, footnote 19, for the non-finitary universal property. This explicitly states the generalization but does not prove it; a self-contained proof remains optional future work.

## Chapter 3
- [x] Reviewed the Tate-extension and nondualizable-extension proofs against the cited results. Corrected the preceding setup: ordinary semiorthogonality does not imply that both inclusions are strongly continuous. See `TODO-review.md`.

## Chapter 5 (Talk 4) – to check
- [x] Reviewed the four flagged compact-morphism, Milnor-sequence, identity, and counit arguments. No further gap found; details in `TODO-review.md`.
- [x] Added a proof of (AB6) in sets and animae, including the use of choice and the reduction to homotopy groups.
- [x] Retained the established notation `\colim` for `Ind(C) → C`; changing it to the talk’s `k` would add no mathematical content.
- [x] Reviewed rational interpolation and the compact-middle-object hypothesis in `prop:Nuclear_Rigid`; made the sequential-limit coherence argument explicit.

## Talks 5 and 6 (Anton Zakrewski, 10.11.2026; Jacopo Mazzei, 17.11.2026)

Reviewed on 19 November 2026. See [the proof and reference report](Review/talks-5-6-proof-checks.md). These checks are a critical reading, not formal verification.

1. [x] Check Chapter 7 and Chapter 4's automatic-dualizability section. Reviewed the proofs and their dependencies; expanded the coherent filtered-colimit construction, the canonical cocone and compatibility with adjunction units.
2. [x] Supply the higher coherences of continuous Calkin functoriality using mates and functorial cofibers.
3. [x] Check semiorthogonal decompositions, strong continuity of projections, both functor-category decompositions and dualizable pullbacks. Made the general stable-category setting explicit; no presentability assertion about Fun^LL is needed. The order of the pieces and the suspension in the gluing convention are correct.
4. [x] Verify HTT: use Remark 5.4.7.13 for limit closure of categories with specified colimits and colimit-preserving functors, rather than Proposition 5.4.7.11 alone.
5. [x] Verify Ramzi's Lemma A.21, Addendum A.22 and Proposition A.26. The arXiv history still lists only v1; no renumbering was found.
6. [x] Verify Efimov's cited results against v4, including the set-generation assertion at the end of Section 1.3.
7. [x] Explain finite-limit/filtered-colimit commutation in Cat_perf, preservation of filtered colimits by the core, and conservativity of the core on stable categories. Added the shear/retract argument for the latter.
8. [x] Keep prop:Q_Exhaustion as the left-continuous refinement needed for the largest dualizable subcategory. Its proof uses prop:Compact_Interpolation(3), without repeating the interpolation construction.
9. [x] Speaker of Talk 6: Jacopo Mazzei. The raw notation Cat^pnt is interpreted as small stable categories; the precise size-independent version used in the proofs is now explicit in rem:SOD_Small.

## Later chapters
- [x] Mathew’s almost, perfect-field, and sheaf examples are already present in Chapter 4; supplied the missing homological-epimorphism references.
- [x] Added the dualizability criterion and gluing construction in Chapter 2, with the strong-continuity hypothesis explicit (Efimov, Propositions 2.76–2.77).
- [x] Located the existing Bonn transcription in `Notes/24 37 - Dualizable categories.tex`, covering ten lectures and three exercise sessions. Checked the endings against both scans; this was not a new page-by-page audit.
- [x] Bonn speakers checked against the handwritten scan and Chowdhury’s notes by content: Mathew gave Talks 1, 2, 3, 5, 7; Efimov gave Talks 4, 6, 8, 9, 10. Corrected the erroneous Efimov attribution for Talk 5. No speaker ambiguity remains; evidence in `TODO-review.md`.
- [ ] Resolve the substantive mathematical/transcription uncertainties in the Bonn notes listed in `TODO-review.md`.

## Chapter 4 (Talk 3) – to check
- [x] Reviewed `prop:Nuclear_Basics` and both interleaving lemmas under the stated hypotheses, including the retract/telescope argument.
- [x] Retain the tensor-closure hypothesis in `prop:Nuclear_Basics`(1)(c), as agreed by Bastiaan. This characterization is added exposition, not a stronger statement recorded in Talk 3.
- [x] Replaced “glued from localizations” by the precise smashing-kernel assertion (Neeman); added Bhatt–Scholze references for perfect and perfectoid surjections.
- [x] `prop:Almost_Derived_Category`: Serre quotient vs Verdier quotient now cites Krause, *Localization theory for triangulated categories*, §7.7.
- [x] Equivalence of the rigidity definitions in Chapters 1 and 4: short argument added to the remark after `def:Rigid_Category_Detailed`.
- [x] `rem:Trace_Class_Basics`(3): proof added (`lem:Identity_Trace_Class`, idempotent-splitting argument).
- [x] `thm:Rigid_Trace_Class`: Ramzi references for the hard implications added; (3) ⇒ (1) holds with the dualizability hypothesis (noted in the text).
- [x] Ramzi, *Locally rigid ∞-categories*: numbers checked against v1 and v2 PDFs; the notes now cite v2 numbering. Consider `version = {2}` in the bib.
- [x] `ex:Shv_Compact_Hausdorff_Rigid`: references complete (KNP Prop 2.8.7, HTT Cor 7.3.4.12).
- [x] Section 4.5 (nuclear modules): exact numbers from Efimov's *Localizing invariants of inverse limits* (v2) added; fixed "Section 6" → Section 7.2, added the Noetherian hypothesis for lim K(R/I^n).
- [x] Andreychev's thesis: checked. Efimov's "Satz 3.8" is Lemma 3.8 (C(S,R) nuclear); Korollar 3.14 correct. Rational descent in Chapter 1 now cites Satz 4.2 (Nuk) and Satz 5.12 (Nisnevich descent for F^cont), with the sheafy analytic hypothesis added.
- [x] Added the Hochschild-homology obstruction to compact generation for `Nuc^CS(Z_p)`, following Efimov, Corollary 7.20(i) and the discussion after Remark 7.21.
- [x] `ex:Nuclear_Banach`: rewritten with references (Andreychev Lemma 3.8; Clausen–Scholze, *Analytic geometry*, Thm 14.10).
- [ ] Liquid operator-algebra formula in `ex:Nuclear_Liquid_Gaseous`: confirmed in the raw notes of Clausen’s third lecture (19 July 2023), but no published proof located. The text now states explicitly that this is a lecture claim without a proof here. Author decision: keep this attribution, supply another source, or omit the formula.

## Lecture-model proof checks (19 November 2026)

1. [x] Prove the intrinsic compact-operator model, including stable closure, module handedness and strong continuity of its monoidal structure. See `prop:Operator_Ideal_Models`.
2. [x] Prove that the all-Schatten ideal is flat and idempotent, and construct its kernel and Hilbert telescope model with strongly continuous multiplication.
3. [ ] Prove that realization of the all-Schatten kernel in derived liquid modules is fully faithful with essential image the rigidification. The precise missing statements and an invalid shortcut are recorded in [the proof-check report](Review/lecture-model-proof-checks.md).
