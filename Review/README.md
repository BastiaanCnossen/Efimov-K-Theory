# Whole-manuscript review, 4 November 2026

This review covers the Preface, all of Chapters 1–5, Appendix A, and the placeholders for Chapters 6–10. It concerns the thematic manuscript, not a fresh audit of every handwritten source. The manuscript has been read consecutively, followed by a dependency and exposition pass. Selected problems have been checked against primary sources. This is not a certification of every external theorem or every coherence argument.

The findings below record the original audit. The subsequent authorized mathematical repairs and restructuring are recorded in [repair-and-restructuring.md](repair-and-restructuring.md); that report and `resolutions.json` supersede the original open statuses. The claim ledger now describes the repaired manuscript. Earlier checked boxes in `TODO.md` record earlier, narrower checks.

1. [Claim ledger](claim-ledger.md): Every theorem-like environment, including definitions, examples and remarks, with a status and review note. Labels are the stable identifiers.
2. [Machine-readable ledger](claim-ledger.json): Full statements, explicitly assigned proofs, citations, explicit cross-references, narrative segments, and source hashes. Narrative segments ensure that assertions outside theorem environments are not silently excluded from the reading inventory. A segment may contain several claims; it is not an atomic theorem inventory.
3. [Forward-reference inventory](forward-references.md): Actual reference occurrences, including deliberate introductory previews and references to the background appendix. This is a reference graph, not a complete logical dependency graph.
4. `build-ledger.py` regenerates the inventories and checks that finding labels still exist. Mathematical judgments are explicit annotations in that script, not inferred from the existence of a proof or citation. Regenerating after a source change requires another reading; it does not renew the review automatically.

The broader exposition revision of 19 November is recorded in [exposition-pass.md](exposition-pass.md). Its separate editorial annotations supplement the mathematical ledger judgments.

## Judgment and priorities

There is enough useful material for eventual circulation as working notes. I would first repair the concrete errors and proof gaps below. The next revision should improve the route through the material before expanding individual proofs. The goal is not uniformly long explanations: foundational mechanisms deserve more detail than repeated applications.

The principal strengths are the initial/terminal-presentation motivation in Chapter 3, the contrast between compact generation and compact assembly, and the compact/trace-class analogy. These are useful organizing ideas. The principal weaknesses are that the introduction promises unwritten proofs, several difficult arguments receive less explanation than routine background, and the examples chapter contains a second substantial theory development.

## Correctness and proof obligations

### C01. Verdier-localizing versus Karoubi-localizing, confirmed inconsistency

Location: `lem:Localizing_Invariants_Verdier`, `rem:Verdier_Localizing_Not_Karoubi`.

Condition (1) quantifies over **every** fully faithful exact inclusion, not merely the Verdier sequences defined earlier. Apply it to a dense inclusion A → A^idem. Its Verdier quotient is zero. Since the zero sequence forces F(0) = 0, condition (1) already forces F(A) → F(A^idem) to be an isomorphism. The following remark says it does not, and gives connective K-theory as a counterexample. These cannot both stand.

Repair: Quantify (1) over Verdier sequences, with the kernel condition, equivalently over inclusions thick in the target. In the proof of (1) plus idempotent invariance implying (2), pass to A^idem → B^idem and the corresponding Verdier quotient. Explicitly state that the target E is stable and that F is reduced, or explain why reducedness follows. Keep the distinction and the connective-K-theory example after making that repair. [Hermitian K-theory II, Corollary 4.4.15 and its proof](https://bcalmes.perso.math.cnrs.fr/pro/recherche/publis/hermpoinc-two/HermKstableII.pdf) discusses connective K-theory as Verdier-localizing.

### C02. Rigidity of sheaf categories, confirmed overstatement

Location: The last paragraph of `ex:Dualizable_Categories`, contrasted with `ex:Locally_Rigid_Sheaf_Categories`.

The introduction includes sheaves on arbitrary locally compact Hausdorff X among examples that are self-dual *because they are rigid*. For noncompact X the unit need not be compact; X = R already contradicts rigidity. Chapter 4 correctly distinguishes local rigidity from rigidity. Restrict the rigidity assertion to compact Hausdorff X, and discuss general self-duality separately with its own reason. Do not discard the general self-duality statement merely because its proposed explanation is wrong. [Ramzi, Example 4.10](https://arxiv.org/html/2410.21524v2#S4) treats the locally compact case via local rigidity.

### C03. Left-module tensor conventions, confirmed typing error

Location: Opening of Section 4.1, `prop:Kernel_Homological_Epi`, `prop:Every_Dualizable_Kernel`, `rem:Almost_General`.

The section explicitly uses left modules over E1-rings but writes base change as - ⊗_A B. It must be B ⊗_A -. Likewise the Morita argument uses E = End(G)^op, appropriate for left modules, but then writes - ⊗_E E'. Use E' ⊗_E -. The displayed counit already follows the left-module convention. Check every occurrence together; commutativity cannot be used here.

### C04. General omega_1-generation proof, gap in the written argument

Location: Final part of the main proof of `thm:Compactly_Assembled_Omega_1`.

The passage from sequences to equivalence classes under eventual equality introduces a new indexing category, but no coherent diagram on that category is constructed and no comparison of colimits is justified. Showing that the quotient poset is omega_1-filtered does not supply either step. This is a proof gap, not evidence against the theorem.

Suggested repair: Start with a filtered-poset presentation of yhat(x). Choose for each i a successor s(i) ≥ i whose transition factors through yhat. Index instead by countable directed subsets Q closed under s. Such subsets form an omega_1-filtered cofinal family, by alternately adding successors and upper bounds. Every Q has a cofinal sequence with successive terms chosen beyond s of the preceding term; its transition maps have the required factorization. Part (2) makes its colimit omega_1-compact. The countable-subposet decomposition then gives the desired colimit without descent through a quotient category. State that the appendix decomposition also applies when only the filtered colimits occurring in the argument exist. Finish by making essential smallness of the generating objects explicit. This is a proposed replacement proof, not yet inserted or fully formalized.

Part (2) also needs one sentence explaining why yhat preserves omega_1-compactness: its right adjoint colim preserves omega_1-filtered colimits. Preserve the existing interleaving coherence argument.

### C05. Rigidification universal property, source mismatch

Location: `prop:Nuclear_Rigid`.

The statement describes a right adjoint to the inclusion into unrestricted CAlg(PrL_st). The cited Efimov Proposition 1.23 instead uses CAlg(PrL_st,kappa), with kappa uncountable regular, and Ramzi's Theorem 4.81 likewise imposes the cardinal restriction. The explicit description for a compactly generated category with compact unit is also explained in Efimov's following remark. This supports the construction needed here but not the unrestricted categorical assertion as written. State the cardinal-controlled universal property or omit that extra characterization and retain the explicit rigidification description. This does not require weakening the retained compact-middle-object hypothesis. [Ramzi, Theorem 4.81](https://arxiv.org/html/2410.21524v2#S4.SS3) is the primary comparison.

### C06. Definition of kappa-filtered, formulation needs repair

Location: `def:Kappa_Filtered`.

“The nerve of a simplicial set” is not meaningful. More substantially, the usual definition tests diagrams indexed by kappa-small simplicial sets; replacing these by categories with small nerves needs justification. The finite case matters: a simplicial loop has finitely many nondegenerate simplices, while the nerve of the free category on that loop has infinitely many. State the simplicial-set formulation explicitly as a quasicategory-model formulation, or give an accurately defined model-independent notion of kappa-small diagram shape. Carry the convention consistently into the statements about kappa-small limits and colimits. Merely deleting the words “the nerve of” does not explain the intended convention.

### C07. Keller example, missing nonzero hypothesis

Location: `ex:Keller`.

The stated assumptions allow I = 0, in which case Perf(A) → Perf(A/I) is an equivalence and hence a Karoubi projection. The conclusion that this is a counterexample needs I ≠ 0. Add that hypothesis, or make the counterexample conclusion only for the displayed nonzero maximal ideal. Explain that the large kernel is nonzero, since it contains the nonzero module I, while the small kernel is zero.

### C08. Tamme proof uses more than the stated extension theorem

Location: `thm:Tamme_Excision` and its proof; `thm:Efimov_Continuous_Extension`.

Localizing invariants were defined with values in an arbitrary stable E, but the cited extension theorem in Chapter 1 is stated only for spectra. The proof therefore invokes an unstated generalization. State and cite the appropriate target-category version, or use the lax-pullback proof already outlined in the following remark. This is also a substantial ordering improvement: the elementary small-category application need not depend on an unwritten chapter about continuous invariants.

### C09. Introductory group-completion explanation, overstatement

Location: Chapter 1, “Group completion is automatic”.

The cofiber relation [x] + [Sigma x] = 0 explains inverses in K_0 after imposing cofiber relations. It does not say that x and Sigma x are inverses under direct sum in the maximal subgroupoid of C: x ⊕ Sigma x is usually nonzero. Separate the K_0 explanation from the spectrum-level assertion that suspension acts by -1, which uses additivity. Rename this item to describe additive inverses rather than automatic group completion.

### C10. Introductory qualifications and conventions

1. Add n ≥ 1 to the no-compact-objects examples in the introductions of Chapters 1 and 3. The earlier numbered example has it, but the later unqualified occurrences do not.
2. Specify a **complex** Hilbert space when identifying operator K-theory with KU. Real operators lead to a different assertion.
3. Say that rational-open restriction is **in general** not a Verdier quotient; the present universal wording includes the identity open.
4. Explain which connective/nonconnective K-theory convention is meant in the remark that idempotent completion “only affects K_0” but “does not affect nonconnective K-theory at all”.
5. The introduction identifies the two nuclear categories in notation after only explaining equality of compact objects. Their agreement for the invariant under discussion needs its own comparison result; equality of compact objects alone cannot justify it.

### C11. Sheaf K-theory proof sketch, missing mechanism

Location: Prose following `thm:Kcont_Sheaves`.

“Commutes with cofiltered limits” should specify that the contravariant functor sends those limits to filtered colimits. More importantly, the assertion that continuity and closed excision characterize the functor by its value at a point needs a precise result and its hypotheses. The sketch currently moves directly from properties to uniqueness. Supply that mechanism or shorten this to a clearly labelled orientation paragraph with an external proof reference. Chapter 9 currently supplies no details.

### C12. Source and definition checks still outstanding

These are open checks, not claims of falsehood.

1. `ex:Compact_Operators_Intro`: Specify the exact category meant by separable Hilbert spaces and hence D^b, and a source for the intrinsic categorical model and its monoidal identification. Tensoring compact operators alone does not establish all the claimed structure.
2. `thm:H_Unital` and the following converse: Give a precise theorem reference for the ring-spectrum version, including connectivity assumptions and the meaning of the nonunital relative tensor product.
3. `ex:Nuclear_Solid`: Audit derived versus ordinary I-adic completion throughout the non-Noetherian discussion. Efimov's convention explicitly uses derived completion. Also delimit the claim of independence from analytic ring structure. Do not silently apply a theorem about a specified complete analytic structure to every structure.
4. `ex:Nuclear_Liquid_Gaseous`: The operator formula remains an attributed lecture claim, with no published proof located. Separately justify the assertion of failure of compact generation; it does not follow just from rigidity or dualizability.
5. `thm:K_Universal_Property`, `thm:K_Corepresentable`, `thm:K_Unit_Day_Convolution`: The non-finitary convention needs to remain consistent through the chain. The thesis footnote records the first assertion but is not a proof of all the subsequent infrastructure. Record the relevant universe/presentability setup and the exact external results being used.

### C13. Smaller missing explanations

1. `thm:Lurie_Dualizable_Characterization`, (3) ⇒ (2): Existence of the right adjoint does not by itself place the retraction in PrL. Cite strong continuity of the kernel inclusion, using compact preservation by D → E and `lem:Strong_Continuity_Localization_Sequence`.
2. `prop:Dualizable_Further_Characterizations`: Explain existence of the right adjoint to the inclusion into the large Ind-category by restricted presheaves/Ind, rather than relying tacitly on presentability of the large target.
3. `prop:Every_Dualizable_Kernel`: The single-generator construction is explicit: the thick subcategory generated by G contains C^omega_1 as retracts. In the final Morita identification, explain that agreement on the generator includes the endomorphism action, and identify the ring map induced by Q. This is the relevant extra justification, in addition to correcting handedness in C03.
4. `ex:AB6_Sets_And_Animae`: Explain why the comma categories of the chosen cofinal functors are filtered. The assertion is stronger than their contractibility and is used in forming an arbitrary product. Keep the explicit use of choice.
5. `rem:Weakly_Compact_Lifting`: The displayed configuration is a triangle, so “commutative square” obscures which homotopy is specified. State the lifting condition with its outer triangle.

## Structure and reading order

### S01. Distinguish written material from planned material

Chapters 6–10 contain only chapter headings and TODO comments. The introduction nevertheless says that they construct or prove results and directs readers there for proofs. For the current public version, either omit these empty chapters from the body and list them as planned, or label them visibly as planned and change the roadmap to future tense. External theorems can still appear in the introduction with honest external citations. Do not present a reference to a chapter heading as a proof reference.

The title-page attribution “Lecturer: Marc Hoyois” also understates the multi-source character documented in the Preface. Consider wording identifying the seminar and the note author, with the detailed speaker acknowledgments left in the Preface.

### S02. Proposed core route

1. Introduction: Motivation, a small number of examples, main statements and a map of the written portion. Keep deliberate forward references here.
2. Stable categories and localizing invariants: Verdier/Karoubi distinctions, localization sequences, ordinary semiorthogonal decompositions, small Calkin categories, and localizing invariants. Prove Tamme by lax pullbacks or postpone its continuous proof.
3. Compact assembly and dualizability: Preserve the initial-presentation motivation, introduce compact morphisms as currently done, prove the retract and dualizability characterizations, and give basic localization examples.
4. Compact morphisms and AB6: Move the present Chapter 5 here. The material already assumes compact assembly/dualizability, so it should not simply be moved before Chapter 3. Move the strongly-continuous-functor characterization and, if needed, the omega_1-generation theorem to the end of this development.
5. Examples: Kernels of homological epimorphisms, almost mathematics, and continuous posets. Use the theory just established.
6. Rigidity and nuclear objects: Give the present Sections 4.4–4.5 their own chapter or a clearly marked second part. This is a substantial theory chapter, not merely a list of examples.
7. Continuous Calkin categories and continuous invariants: Write the construction before relying on it in proofs of applications.
8. Sheaves and the later structural results: Place these according to their actual proof dependencies when written. Do not settle their order solely from the current headings.

This is a proposed route, not a chapter-renumbering already performed. Preserve labels so existing links survive. Any actual move also requires updating the Preface and web registry.

### S03. Targeted moves within that route

1. Move `prop:SOD_Dualizable` and `constr:Semiorthogonal_Gluing` out of Chapter 2 to the dualizable-localization/extension discussion. Their current placement requires the reader to know dualizability, compact morphisms and strong continuity before the main introduction to them.
2. Keep the ordinary SOD material in Chapter 2. Move the specialized Tate-extension classification to a later subsection, after the basic examples, or mark it as an optional digression. It interrupts the first encounter with dualizability.
3. Place rational interpolation before the rigidification proof. Moving current Chapter 5 before the nuclear development achieves this without copying the proof.
4. Keep Appendix A as a reference appendix. Forward references to its standard background are intentional and should not be “fixed” by moving all of it to the front. Give a short prerequisite paragraph listing which appendix results the first reading uses.
5. Keep continuous-poset basics near compact assembly, or leave the fuller treatment with examples and retain the short early example. Avoid developing the definition twice at comparable length.

## Exposition and explanatory density

### E01. Chapter 1

The historical progression from vector bundles to perfect complexes to large categories gives a usable motivation. The chapter then becomes too close to a compressed account of the whole subject. Separate orientation from technical previews: retain the sheaf and operator examples, summarize nuclear modules briefly, and move detailed endomorphism/Calkin formulas to the relevant later section. Mark proof sketches as sketches and distinguish announced results from results proved in these notes. Repair C02, C09–C12 before polishing wording.

### E02. Chapter 2

Give the reader a short comparison table of Verdier sequences, Karoubi sequences, localization sequences in PrL, and homological epimorphisms. State the kernel and idempotent-completion conditions explicitly. This addresses the distinction that already caused C01. Explain once how passing through Ind connects small and presentable categories, then use the dictionary consistently. Keep the failed proof of Tamme only as a short warning after explaining the actual mechanism; it currently makes a reader process a false inference before the necessary correction.

### E03. Chapter 3

Preserve the presentation motivation. Before the characterization theorem, state the strategy of the implication cycle in two sentences. Add the few continuity justifications identified in C13, rather than expanding every adjunction calculation. The omega_1 proof needs a clean indexing construction more than extra bookkeeping around the existing quotient. The Tate excursion is disproportionately demanding relative to its role in the main development.

### E04. Chapter 4

This chapter has the largest variation in prerequisites and density. The almost and poset examples are relatively concrete; rigidity and nuclearity introduce new general theory; the final analytic examples compress substantial literature into single environments. Separate these roles. Give each analytic example four pieces: the ambient category and hypotheses, the nuclear subcategory, the exact theorem used, and the consequence illustrating dualizability. Avoid forcing every example into one large paragraph. Explain why each counterexample fails compact generation, rather than letting “rigid” or “dualizable” appear to imply that failure.

### E05. Chapter 5

This is the most coherent sustained technical development. Keep the distinctions among weak compactness, compactness and factorization visible. Add a brief map at the beginning: lifting criteria, interpolation, compact exhaustions, and AB6. The Milnor argument and the interleaving arguments merit their current detail. Routine ideal-closure observations need less. A short closing paragraph explaining how the results are used in nuclearity and accessibility would connect this chapter back to the rest.

### E06. Appendix A

The appendix provides useful proof infrastructure, especially countable indexing, retracts and mates. Fix the smallness convention first. Then streamline routine results by giving precise references while preserving proofs specifically needed to make later coherence arguments honest. In the mates section, use “isomorphism” for invertible natural transformations and remove “up to homotopy” uniqueness hedges, consistent with the global convention. Do not replace existing Map notation globally during this review.

### E07. A density rule for the revision

For a central new construction, provide motivation, the formal statement, and the proof mechanism before details. For a routine application, name the result and verify the hypotheses in one or two sentences. For a deep imported result, state the hypotheses and give an exact source; a sketch is optional and must be labelled. For a heuristic, explain its role without phrasing it as an argument. This yields consistent expectations without making every proof the same length.

## Suggested next revision batches

1. Repair C01–C10 and the small explanatory omissions in C13, keeping the current labels. Verify each changed statement against its uses. These are mathematical/editorial repairs, not matters requiring an author preference.
2. Resolve C11–C12 by checking exact external statements and hypotheses. Retain an explicit unresolved status where no proof has been located. Do not mark a claim verified merely because a citation exists.
3. Implement the dependency moves in S02–S03, then reread the resulting route consecutively. Update source notes and the web registry with the moves.
4. Expand only the passages identified in E01–E07. Compile and inspect the revised document after these edits; a successful compile is not mathematical validation.

The author judgments are limited: the intended audience and degree of self-containment; whether to circulate only the written chapters; and whether to retain the explicitly attributed liquid operator formula without a published proof. My default would be an expert-facing set of working notes, with imported results cited rather than reproved, planned chapters clearly separated, and the lecture-only formula retained only with its current qualification. None of these decisions prevents repairing the confirmed problems first.
