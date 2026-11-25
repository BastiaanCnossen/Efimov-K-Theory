# Broader exposition pass

19 November 2026. This implements E01–E07 from the original review against the current thematic manuscript. The intended level remains that of expert-facing working notes. The pass concerns explanation, local order and navigation; it does not change the scope of the mathematical verification already recorded.

## Changes by finding

1. **E01, introduction.** Shortened the intrinsic compact-operator model to an orientation paragraph. Its full derived-category conventions and construction remain in Chapter 5. Kept the requested attribution to Clausen and the proof reference. The nuclear overview had already been shortened in the restructuring pass, and the deep introductory theorems keep their external sources and qualifications.
2. **E02, localization language.** Added a table after Thomason–Neeman distinguishing Verdier sequences, short exact sequences, presentable localization sequences and homological epimorphisms. The accompanying Ind dictionary states the compact-generation condition needed to recover a short exact sequence of compact objects. Moved the small/continuous Calkin identification to Chapter 7, after the continuous construction. Put Tamme's valid proof first and replaced the preceding wrong proof by a short warning after it.
3. **E03, compact assembly.** Added proof-strategy paragraphs for Lurie's characterization and omega_1-generation. Moved the technical remark on alternative definitions of compact morphisms to Chapter 4, after the criteria proving their agreement. Kept the presentation motivation, the early continuous-poset example and the optional status of the later Tate discussion.
4. **E04, examples and nuclearity.** Added a guide to the algebraic, telescope and monoidal stages of the operator-ideal proof. Explained the mechanism of the nuclearity criterion before its detailed proof. Split the solid example into ambient category, completion/nuclear objects, rigidity/invariants, failure of compact generation, operator presentation and Efimov's variant. The compact-generation obstruction now immediately follows the consequences it qualifies. Separated liquid modules, the attributed lecture model and gaseous modules into paragraphs. The missing liquid realization proof remains deferred.
5. **E05, compact morphisms.** Shortened the opening list of results and gave the progression from lifting criteria through interpolation and exhaustions to (AB6). Explained at the close why exhaustions and (AB6) serve different purposes. Distinguished the stable weak-compactness criterion from the additional compact-assembly hypothesis used to identify it with compactness.
6. **E06, appendix.** Applied the agreed isomorphism/uniqueness language in the mates discussion. Kept the indexing, interleaving and adjunction proofs that support the main text; replacing these by references would reduce the self-containment precisely where the arguments need it. The appendix remains a reference appendix.
7. **E07, density.** Used short proof mechanisms for the central constructions, concise hypothesis reminders for routine applications, and explicit source/qualification paragraphs for imported analytic results. This does not aim to make all proofs equally long. Moved the trace-class identity lemma before the remark which uses it, with its proof unchanged.

## Reading order and references

1. References to later written chapters decreased from 20 to 15; references later in the same chapter decreased from 20 to 19. These are occurrence counts, not counts of logical dependencies.
2. The five cross-chapter occurrences removed by relocation were the two references in the small/continuous Calkin identification and the three references in the alternative-compactness remark. They now point backwards from the relevant later chapters. No proof was replaced by an unsupported assertion to reduce the count.
3. The remaining references to later written chapters were inspected: they are previews, pointers to fuller examples or alternative arguments, rather than steps needed to run an earlier proof. The early continuous-poset characterization explicitly announces that its detailed proof comes later. Appendix references remain intentional. Planned-chapter references keep their existing roadmap role and are not proof sources.
4. All 273 chapter labels, 222 theorem-like entries, web IDs and slugs are preserved. The web registry follows the revised source order. The Preface source account has been updated.

## Ledger and scope

Editorial revisions live in `exposition-resolutions.json` and are included in both generated ledgers. They supplement rather than overwrite the mathematical statuses from `resolutions.json`. The TODO item for E01–E07 is checked. Existing mathematical qualifications, including the deferred liquid-realization problem and the non-finitary universal-property source limitation, are unchanged.

No new issue requires the author's judgment. This pass does not decide whether to publish the notes or certify every imported theorem.

## Validation

The 107-page root PDF compiles successfully, with no undefined citations or references. The source inventory finds no unresolved cross-references or duplicate labels. ChkTeX ran on all edited LaTeX files; its macro/style diagnostics remain, so this is not a clean lint result. Existing overfull-box and memoir package warnings remain. Rendered PDF pages 20, 75 and 76 were inspected: the terminology table fits, and the revised analytic paragraphs and obstruction are legible.

The new table exposed a chapter-conversion limitation: only the Preface used the existing table linearization and restoration functions. Extended that path to chapters in `web/prepare.mjs` and `web/assemble.mjs`, preserving the semantic five-row, two-column table. Node syntax checks and the generated-cell-count check pass. The interrupted first conversion left an incomplete auxiliary file; it regenerated on the next run. Added the two missing accessibility descriptions for existing Chapter 7 diagrams. The final local build passed: 269 pages, 90 proofs, 20 diagrams and 9,418 local links validated. The local preview was refreshed; nothing was published.
