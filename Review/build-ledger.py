"""Rebuild the review inventory. An inventory is not a mathematical verifier."""
from pathlib import Path
import re
import json
import hashlib
from collections import Counter

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'Review'
KINDS = set('theorem proposition lemma corollary definition convention example remark observation construction claim fact conjecture warning question notation terminology discussion exercise'.split())
annotations = {}

def annotate(labels, status, note, finding=None):
    for label in labels.split():
        annotations[label] = dict(status=status, review_note=note, finding=finding)

annotate('lem:Localizing_Invariants_Verdier rem:Verdier_Localizing_Not_Karoubi', 'correction-needed', 'The unrestricted inclusion condition already forces idempotent invariance; restrict to Verdier sequences and repair the proof.', 'C01')
annotate('ex:Dualizable_Categories', 'correction-needed', 'The closing rigidity explanation incorrectly includes sheaves on noncompact locally compact Hausdorff spaces.', 'C02')
annotate('prop:Kernel_Homological_Epi prop:Every_Dualizable_Kernel rem:Almost_General', 'correction-needed', 'Base-change notation conflicts with the explicit left-module convention. The added Morita proof also merits a separate detailed check.', 'C03, C13')
annotate('thm:Compactly_Assembled_Omega_1', 'proof-gap', 'Coherent descent of the sequence-colimit diagram through eventual equality is not justified. The alternative stable kernel proof avoids that step.', 'C04')
annotate('prop:Nuclear_Rigid', 'source-mismatch', 'The cited universal property has a cardinal-controlled target, unlike the unrestricted target written here. Preserve the factorization hypothesis.', 'C05')
annotate('def:Kappa_Filtered', 'correction-needed', 'Repair the simplicial indexing convention, including the finite case; not merely the phrase nerve of a simplicial set.', 'C06')
annotate('ex:Keller', 'correction-needed', 'The counterexample conclusion requires a nonzero ideal.', 'C07')
annotate('thm:Tamme_Excision', 'proof-gap', 'The proof invokes the extension for a general stable target, but the referenced theorem is stated only for spectra. A small-category proof is outlined immediately afterwards.', 'C08')
annotate('thm:Kcont_Sheaves', 'detail-needed', 'The external theorem is clearly cited, but the following uniqueness sketch needs its actual characterization result and precise continuity variance.', 'C11')
annotate('ex:Compact_Operators_Intro', 'source-check-needed', 'Specify complex Hilbert spaces and the exact structure behind the intrinsic derived-category model; source-check the monoidal identification.', 'C10, C12')
annotate('thm:H_Unital', 'source-check-needed', 'Locate a precise ring-spectrum theorem, and separately check the connectivity assumptions of the following converse.', 'C12')
annotate('ex:Nuclear_Solid', 'source-check-needed', 'Composite example: retain prior HH check, but still audit completion conventions and scope of analytic-structure independence.', 'C12')
annotate('ex:Nuclear_Liquid_Gaseous', 'source-check-needed', 'Operator formula is explicitly attributed to a lecture, not independently established here; check the additional noncompact-generation assertion.', 'C12')
annotate('thm:K_Universal_Property thm:K_Corepresentable thm:K_Unit_Day_Convolution def:Mot_Loc', 'source-check-needed', 'Keep non-finitary conventions, universes and the exact theorem used consistent. The thesis footnote does not prove the entire chain.', 'C12')
annotate('thm:Lurie_Dualizable_Characterization', 'detail-needed', 'In (3) implies (2), explicitly justify colimit preservation of the kernel retraction. Main implication strategy is coherent.', 'C13')
annotate('prop:Dualizable_Further_Characterizations', 'detail-needed', 'Explain existence of the right adjoint into the large Ind-category without assuming it presentable.', 'C13')
annotate('ex:AB6_Sets_And_Animae', 'detail-needed', 'Set and homotopy-group argument reviewed. Explain filteredness, not just contractibility, of comma categories in the cofinal replacement step.', 'C13')
annotate('rem:Weakly_Compact_Lifting', 'detail-needed', 'Describe the displayed triangle and its specified homotopy accurately.', 'C13')

# Explicit reading judgments. These are not assigned merely because a proof exists.
annotate('lem:Kernel_Verdier_Quotient lem:Characterization_Short_Exact rem:Verdier_Vs_Karoubi', 'argument-reviewed', 'Reviewed the distinction between the thick kernel, Verdier quotient, and quotient after idempotent completion; no additional defect found in this block.')
annotate('rem:Nullhomotopies_Property', 'argument-reviewed', 'Reviewed the property-versus-structure claim for a composite of pointed functors factoring through zero.')
annotate('prop:Localization_Sequences_PrL lem:Strong_Continuity_Localization_Sequence lem:Compact_Generators_Thick_Closure lem:Compact_Objects_Localization_Sequence cor:Karoubi_Quotient_Via_Ind', 'argument-reviewed', 'Reviewed adjoints, compact generation and the passage through Ind. No additional defect identified; imported background is not independently reproved.')
annotate('prop:Two_Term_SOD prop:SOD_From_Short_Exact rem:SOD_Small', 'argument-reviewed', 'Reviewed orthogonality and the adjunction orientation. Preserve the current reflective/coreflective distinction.')
annotate('prop:SOD_Dualizable constr:Semiorthogonal_Gluing', 'argument-reviewed', 'Reviewed use of strongly continuous inclusions and gluing. Move this block after dualizability is introduced; see S03.')
annotate('rem:Calkin_Mapping_Spectra ex:Localizing_Additive ex:Localizing_Calkin', 'argument-reviewed', 'Reviewed the cofinality/additivity mechanism used here. Keep small and continuous Calkin categories distinct.')
annotate('rem:Finitary_Localizing_Invariants', 'argument-reviewed', 'The text correctly separates localizing from finitary; TC is no longer asserted to preserve filtered colimits.')
annotate('rem:K_Universal_Property_Literature', 'argument-reviewed', 'The limitation of the thesis-footnote reference is explicitly stated; do not remove it without a proof.')
annotate('warn:Excision_Requires_Ind_Localizations rem:Tamme_Lax_Pullback_Proof', 'argument-reviewed', 'The warning identifies the failed inference; the lax-pullback route is preferable for the proposed reading order.')
annotate('lem:Compact_Iff_Yhat_Is_Y lem:Compact_Morphisms_Yhat rem:Compact_Morphisms_Ideal ex:Compactly_Generated_Compactly_Assembled', 'argument-reviewed', 'Reviewed the adjunction and factorization arguments connecting compact objects, compact morphisms and yhat.')
annotate('thm:Compactly_Assembled_Retract rem:Strongly_Continuous_Right_Adjoint', 'argument-reviewed', 'Reviewed the retract/adjoint mechanism and the link to the appendix mates calculation.')
annotate('ex:Dual_Of_Modules rem:Strongly_Continuous_Stable rem:Compactly_Generated_In_Prdual', 'argument-reviewed', 'Reviewed module handedness locally and the stable strong-continuity criterion; Chapter 4 uses a different explicit handedness convention.')
annotate('prop:Localization_Sequence_Dualizable prop:Extension_Dualizable_Tate ex:Extension_Not_Dualizable', 'argument-reviewed', 'Reviewed the distinction between ordinary and strongly continuous extensions, retaining the Tate hypotheses. See prior TODO-review for source comparisons.')
annotate('prop:Strongly_Continuous_Compact_Morphisms', 'argument-reviewed', 'Reviewed use of compact morphisms and sequential presentations; conclusion depends on the omega_1 theorem whose general proof has C04.')
annotate('lem:Almost_Restriction_FF lem:Almost_Essential_Image prop:Almost_Derived_Category prop:Almost_No_Compacts', 'argument-reviewed', 'Reviewed the adjunction/localization and compact-object obstruction under the stated hypotheses. Keep the general nonflat assertion separate.')
annotate('lem:Ind_Of_Poset lem:Posets_Accessible rem:Way_Below_Basics prop:Continuous_Poset_Characterization ex:Continuous_Poset_Reals ex:Continuous_Poset_Opens', 'argument-reviewed', 'Reviewed the order-theoretic translation and examples. Keep accessibility and the existence of directed suprema explicit.')
annotate('rem:Equivalent_Rigidity_Definitions prop:Rigid_Self_Dual_Detailed lem:Identity_Trace_Class lem:Trace_Class_Compact rem:Trace_Class_Basics', 'argument-reviewed', 'Reviewed the rigid duality/trace-class mechanism, including the split-idempotent argument. Preserve compactness of the unit where used.')
annotate('thm:Rigid_Trace_Class', 'external-result', 'Hard implications are imported with precise Ramzi references; the text distinguishes the dualizability hypothesis. This pass did not reprove them.')
annotate('ex:Locally_Rigid_Sheaf_Categories', 'source-compared', 'Compared the local-rigidity assertion with Ramzi Example 4.10. This correct distinction should also govern the introduction.', 'C02')
annotate('cor:Rigid_Functors_Strongly_Continuous rem:Strong_Continuity_From_Rigid_Source ex:Rigid_Compactly_Generated', 'argument-reviewed', 'Reviewed the use of rigidity to obtain strong continuity. This does not assert arbitrary functors between dualizable categories are strongly continuous.')
annotate('lem:Trace_Class_Interleaving lem:Nuclear_Colimit_Interleaving prop:Nuclear_Basics rem:Nuclear_Definition_Pi0', 'argument-reviewed', 'Reviewed interleaving, compact-factorization and the stated closure hypotheses. Retain the tensor-closure hypothesis as agreed; this is not a claim of a stronger theorem.')
annotate('ex:Weakly_Compact_Basic prop:Compact_Morphism_Characterizations cor:Compact_Morphism_Factorization', 'argument-reviewed', 'Reviewed the lifting/factorization distinctions. Separate weak compactness from compactness outside the stable setting.')
annotate('lem:Interpolation prop:Compact_Interpolation', 'argument-reviewed', 'Reviewed the interpolation construction and its coherence step; use this before the nuclear rigidification application.')
annotate('prop:Compact_Morphisms_Stable cor:Compact_Iff_Identity_Weakly_Compact prop:Dualizable_Compactly_Exhaustible', 'argument-reviewed', 'Reviewed the Milnor-sequence/sequential-exhaustion mechanism and shifts. No additional gap identified beyond dependencies recorded elsewhere.')
annotate('prop:Filtered_Coreflection cor:Yhat_Universal_Property lem:Products_In_Ind prop:Dualizable_AB6', 'argument-reviewed', 'Reviewed the coreflection, counit and products-in-Ind argument. Conclusions depend on the preceding hypotheses and AB6 comparison.')
annotate('cor:Kappa_Small_Colimits_Of_Kappa_Compacts lem:Kappa_Filtered_Posets lem:Omega_1_Filtered_Via_Chains lem:Cofinality_Posets', 'argument-reviewed', 'Reviewed compactness and directed-poset calculations. The general small-diagram convention still requires C06.')
annotate('prop:Colimits_Over_Countable_Subposets', 'argument-reviewed', 'Reviewed the countable closure construction and the two cofinality comparisons. For C04, explicitly state the filtered-colimit-only variant.')
annotate('rem:Sequential_Diagrams lem:Retract_As_Telescope lem:Strictification_Sequential_Maps prop:Omega_1_Compact_In_Ind', 'argument-reviewed', 'Reviewed countable cofinality, telescopes and sequential coherence. These deserve retention as reusable proof infrastructure.')
annotate('lem:Accessible_Objects_Lambda_Compact constr:Ind_Large lem:Retract_Left_Adjoint', 'argument-reviewed', 'Reviewed size bounds and the retract-of-corepresentables argument. Keep the local-smallness and idempotent-completeness hypotheses.')
annotate('constr:Mates lem:Conjugate_Transformations lem:Adjoint_Triples prop:Strongly_Continuous_Via_Right_Adjoint', 'argument-reviewed', 'Reviewed directions of units/counits and mates. Isomorphism/uniqueness wording was updated in the exposition pass.')
annotate('prop:Tensor_With_Ind cor:Ind_As_Exact_Functors cor:Compactly_Generated_Dualizable', 'argument-reviewed', 'Reviewed the universal-property calculation and evaluation/coevaluation identification; no new issue found in this pass.')

# Explicit resolutions supersede the original audit annotations without erasing them.
resolution_path = OUT / 'resolutions.json'
if resolution_path.exists():
    resolutions = json.loads(resolution_path.read_text(encoding='utf-8'))
    for resolution in resolutions:
        for label in resolution['labels']:
            annotations[label] = dict(status=resolution['status'], review_note=resolution['note'], finding=resolution['finding'])

# Expository changes do not supersede mathematical review judgments.
editorial = {}
editorial_path = OUT / 'exposition-resolutions.json'
if editorial_path.exists():
    for revision in json.loads(editorial_path.read_text(encoding='utf-8')):
        for label in revision['labels']:
            editorial.setdefault(label, []).append({k: v for k, v in revision.items() if k != 'labels'})

token = re.compile(r'\\(begin|end)\{([^}]+)\}')
lab = re.compile(r'\\label(?:\[([^]]+)\])?\{([^}]+)\}')
cref = re.compile(r'\\(?:Cref|cref|ref|eqref)\{([^}]+)\}')
cit = re.compile(r'\\cite\w*(?:\[[^]]*\])*\{([^}]+)\}')
files = sorted((ROOT / 'Chapters').glob('*.tex'))
book = json.loads((ROOT / 'web/book.json').read_text(encoding='utf-8'))
planned_files = {row[2] for row in book.get('plannedChapters', [])}
sources = {}
records = []
narrative = []
all_labels = {}
references = []

for order, path in enumerate(files):
    raw = path.read_bytes()
    src = raw.decode('utf-8-sig')
    # Keep positions while suppressing comments, including commented references.
    clean = re.sub(r'(?m)(?<!\\)%[^\r\n]*', lambda m: ' ' * len(m[0]), src)
    rel = path.relative_to(ROOT).as_posix()
    sources[rel] = dict(sha256=hashlib.sha256(raw).hexdigest(), lines=len(src.splitlines()), order=order)
    for m in lab.finditer(clean):
        assert m[2] not in all_labels, ('duplicate label', m[2])
        all_labels[m[2]] = dict(file=rel, line=src.count('\n', 0, m.start())+1, offset=m.start(), order=order)
    stack, envs = [], []
    for m in token.finditer(clean):
        if m[1] == 'begin':
            stack.append((m[2], m.start()))
        else:
            assert stack and stack[-1][0] == m[2], ('environment mismatch', rel, m[2])
            kind, start = stack.pop()
            if kind.rstrip('*') in KINDS or kind == 'proof':
                envs.append((start, m.end(), kind))
    assert not stack, rel
    proofs = {}
    for a,b,kind in sorted(envs):
        if kind != 'proof':
            continue
        owner = re.search(r'\\prooffor\{([^}]+)\}(?:\[([^]]+)\])?\s*$', clean[:a])
        if owner:
            proofs.setdefault(owner[1], []).append(dict(line=src.count('\n',0,a)+1, variant=owner[2], text=src[a:b]))
    for a,b,kind in sorted(envs):
        if kind == 'proof':
            continue
        m = lab.search(clean, a, b)
        line = src.count('\n',0,a)+1
        key = m[2] if m else f'unlabelled:{path.stem}:{line}'
        statement = src[a:b]
        owned = proofs.get(key, [])
        body = statement + '\n' + '\n'.join(p['text'] for p in owned)
        ann = annotations.get(key, dict(status='read', review_note='Read in the consecutive manuscript pass; no individual verification claim is made. External proof and subsidiary assertions have not all been independently checked.', finding=None))
        if kind.rstrip('*') in {'definition', 'convention'} and key not in annotations:
            ann = dict(status='definition-read', review_note='Read for terminology and consistency; a definition is not a theorem verification.', finding=None)
        records.append(dict(id=key, kind=kind, file=rel, line=line, statement=statement, proofs=owned, editorial_revisions=editorial.get(key, []),
            citations=sorted({x.strip() for mm in cit.finditer(body) for x in mm[1].split(',')}),
            explicit_references=sorted({x.strip() for mm in cref.finditer(body) for x in mm[1].split(',')}), **ann))
    # Everything outside theorem-like blocks and their proofs remains in a reading index.
    mask = list(src)
    for a,b,_ in envs:
        mask[a:b] = ['\n' if c == '\n' else ' ' for c in src[a:b]]
    remaining = ''.join(mask)
    for i,m in enumerate(re.finditer(r'\S[\s\S]*?(?=\r?\n\s*\r?\n|\Z)', remaining),1):
        text = m[0].strip()
        if not text or all(line.lstrip().startswith('%') for line in text.splitlines()):
            continue
        narrative.append(dict(id=f'prose:{path.stem}:{i:03}', file=rel, line=src.count('\n',0,m.start())+1, text=text, status='read; not an atomic claim certification'))
    for m in cref.finditer(clean):
        for target in m[1].split(','):
            references.append(dict(file=rel,line=src.count('\n',0,m.start())+1,offset=m.start(),order=order,target=target.strip()))

missing_annotations = set(annotations)-{r['id'] for r in records}
assert not missing_annotations, missing_annotations
main = ROOT/'Efimov K-theory Notes.tex'
sources[main.name] = dict(sha256=hashlib.sha256(main.read_bytes()).hexdigest(),lines=len(main.read_text(encoding='utf-8-sig').splitlines()),scope='Preface and document structure read')
forward = []
unresolved = []
for r in references:
    target = all_labels.get(r['target'])
    if not target:
        unresolved.append(r)
        continue
    if (target['order'],target['offset']) <= (r['order'],r['offset']):
        continue
    if r['file'].startswith('Chapters/01_'):
        category = 'Introductory preview'
    elif target['file'].startswith('Chapters/A_'):
        category = 'Background appendix'
    elif target['file'] in planned_files:
        category = 'Planned chapter'
    elif target['file'] == r['file']:
        category = 'Later in same chapter'
    else:
        category = 'Later written chapter'
    forward.append(dict(**r,target_file=target['file'],target_line=target['line'],category=category))

data = dict(review_date='2026-11-04',scope='Consecutive reading and selected argument/source checks; not complete independent verification.',
    status_definitions={'read':'Read; no individual verification claimed.','definition-read':'Terminology read.','argument-reviewed':'Argument read critically; no additional issue identified beyond notes and dependencies. Not formal verification.',
    'external-result':'Statement imported; external proof not independently rederived.','source-compared':'Specified statement compared with named source; not all source proofs checked.',
    'correction-needed':'A concrete issue is identified.','proof-gap':'Written argument does not establish a required step.','source-mismatch':'Cited source has a material restriction absent from the wording.',
    'source-check-needed':'Exact external statement or hypotheses still need checking.','detail-needed':'Needed justification or exposition recorded.',
    'repaired':'Identified defect repaired and changed argument reread; not independent formal verification.',
    'qualified-source':'Unsupported generality removed or lecture claim explicitly attributed; external proof remains unverified.'},
    source_snapshot=sources,claims=records,narrative_reading_index=narrative,forward_references=forward,unresolved_explicit_references=unresolved)
(OUT/'claim-ledger.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

def link(file,line):
    return f'[L{line}](<{(ROOT/file).as_posix()}:{line}>)'

counts = Counter(r['status'] for r in records)
md = ['# Claim ledger','', 'Original review: 4 November 2026; subsequent dated checks are recorded in the individual entries and resolutions.json. See [the report](README.md) for the original scope, findings and repairs.', '',
      f'{len(records)} theorem-like entries; {len(narrative)} narrative reading segments in the JSON; {len(forward)} forward-reference occurrences.', '',
      '“Argument-reviewed” means a critical reading found no additional defect beyond the recorded qualifications. It is not formal verification, independent source verification, or a statement that all dependencies are closed. “Read” deliberately makes a weaker claim. Composite examples still require subsidiary source checks.', '',
      '## Status counts','', '| Status | Entries |','| :--- | ---: |']
md += [f'| {s} | {n} |' for s,n in sorted(counts.items())]
for rel in sources:
    rr = [r for r in records if r['file']==rel]
    if not rr:
        continue
    md += ['',f'## {Path(rel).stem}','', '| Claim | Location | Status | Reading note |','| :--- | :--- | :--- | :--- |']
    for r in rr:
        note = r['review_note'] + (f" Finding {r['finding']}." if r['finding'] else '')
        if r['editorial_revisions']:
            note += ' Exposition: ' + ' '.join(e['finding'] + ': ' + e['note'] for e in r['editorial_revisions'])
        md.append(f"| `{r['id']}` | {link(rel,r['line'])} | {r['status']} | {note.replace('|','/')} |")
md += ['', '## Planned chapters', '', 'Chapters 8–11 are planned. Chapter 7 now has substantive content, reviewed in talks-5-6-proof-checks.md. See the repair report for the current structure.', '', '## Maintenance', '', 'Full source statements and explicitly owned proofs are stored in `claim-ledger.json`. SHA-256 hashes identify the exact source version. Before updating any status, check that the source has not changed. Unlabelled entries and prose-segment identifiers are positional and may move after edits; labelled claims retain stable IDs. Explicit resolutions in `resolutions.json` supersede the original audit annotations.', '']
(OUT/'claim-ledger.md').write_text('\n'.join(md),encoding='utf-8')
fc = Counter(r['category'] for r in forward)
md = ['# Forward-reference inventory','', 'This lists explicit reference occurrences, not inferred logical dependencies. Repeated references are counted separately. Introductory previews and appendix references are usually intentional; see S02–S03 in [the report](README.md) for the proposed moves.', '', '| Class | Occurrences |','| :--- | ---: |']
md += [f'| {s} | {n} |' for s,n in sorted(fc.items())]
for category in sorted(fc):
    md += ['',f'## {category}','', '| Source | Target | Destination |','| :--- | :--- | :--- |']
    for r in forward:
        if r['category']==category:
            md.append(f"| {Path(r['file']).stem} {link(r['file'],r['line'])} | `{r['target']}` | {Path(r['target_file']).stem} {link(r['target_file'],r['target_line'])} |")
md += ['',f'Unresolved explicit references in chapter sources: {len(unresolved)}. This is a source scan, not a LaTeX compilation.', '']
(OUT/'forward-references.md').write_text('\n'.join(md),encoding='utf-8')
print(json.dumps(dict(claims=len(records),narrative_segments=len(narrative),statuses=counts,forward_references=fc,unresolved=unresolved),indent=2))
