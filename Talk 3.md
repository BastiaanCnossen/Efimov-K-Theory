Speaker: Max Glaser
$\newcommand{\dMod}{\text{-}\Mod}$
Today we will discuss three examples of dualizable categories:
- Almost ring theory
- Continuous posets
- Rigid symmetric monoidal categories (e.g. $\Shv(X;\Sp)$ for $X \in \LCHaus$, "nuclear modules" in condensed mathematics, ...).

# 1. Almost ring theory

**Notation:** Let $A$ be a unital, associative ring and let $I \subseteq A$ be a two-sided ideal satisfying $I^2 = I$ and assume that $I$ is flat as either a left- or a right A-module. Consider the (fully faithful) forgetful functor:$$(A/I)\text{-}\Mod \hookrightarrow A\dMod.$$This is fully faithful, with essential image consisting of those $A$-modules $M$ such that $IM = 0$.

**Definition:** We define the category of $(A/I)$-almost-modules as the Serre quotient$$(A,I)^a\dMod := A\text{-}\Mod / (A/I)\dMod.$$
**Examples:** 
- When $I = A$, then $(A,A)^a-\dMod = A\dMod$.
- "Interesting examples": Assume $A$ be a nondiscrete valuation ring of dimension $n$, and let $I$ be a maximal ideal of $A$ (e.g. $A = \Oo_{\Q_p}$)

Assume the above setup. Let us now explain the derived picture. We consider the adjoint triple$$D(A/I) [make tikzcd diagram with right-pointing fully faithful functor called "res", a left adjoint on top called "L" and a right adjoint at the bottom called "R"] D(A).$$The fully faithfulness follows from $I^2 = I$ and flatness of $I$ as an $A$-module: the counit $L\res \to \id$ is an isomorphism since we $$(A/I) \otimes_A^{\bL} (A/I) \cong A/I.$$
In particular, $L$ is a left Bousfield localization.

**Lemma:** The fiber of $L$ in $\PrLst$ (equivalently, in $\widehat{Cat}_{\st}$) is $D((A,I)^a\dMod)$.
*Proof:* Since $(A/I)\dMod$ is a Serre subcategory of $A\dMod$, there is an equivalence$$D((A,I)^a\dMod) \simeq D(A) / D_{A/I\dMod}(A),$$where $D_{A/I\dMod}(A) \subseteq D(A)$ is the full subcategory consisting of those complexes all of whose homology groups lie in $(A/I)\dMod \subseteq A\dMod$. It thus remains to show that the canonical functor$$D(A/I) \to D_{(A/I)\dMod}(A)$$is an equivalence. The essential image of the restriction functor $D(A/I) \hookrightarrow D(A)$ consists of those $X \in D(A)$ for which the unit $X \to \res L(X)$ is an isomorphism, which holds if and only if $I \otimes^{\bL}_A X = 0$, which in turn by flatness of $I$ holds if and only if for all $i \in \Z$ we have $IH_iX = 0$.

**Proposition:** There is an equivalence$$D((A,I)^a\dMod) \simeq \ker^{\dual}(D(A) \xrightarrow{L} D(A/I)),$$where the right-hand side is the fiber in $\Pr^{\dual}$.
**Proof:** The functor $L$ is a left Bousfield localization. It is a general fact (which we may or may not see in an upcoming talk [this should receive a citation]) that the inclusion $\Pr^{\dual} \hookrightarrow \PrLst$ preserves pullbacks along left Bousfield localization

**Remark:** If $I \subseteq \mathrm{Jac}(A)$, then the category $D((A,I)^a\dMod)$ has no nontrivial compact objects.
*Proof:* This is an application of Nakayama's lemma. We use the fully faithful functor into $A$-modules. We know it preserves compact objects, so we're looking at a compact object of $D(A)$ whose tensor with $I$ is zero. So they're represented by finite-length complexes of projectives. We can find a minimal non-zero degree. Then one can do a typical Nakayama argument to shorten it, and by induction it is zero. [This needs to be spelled out.]

# 2. Continuous posets

We will now see a class of non-stable examples of compactly assembled categories.

**Definition:** A poset $(P,\leq)$ is called *continuous* if the following two properties are satisfied:
(1) $P$ has directed suprema
(2) The functor $\colim\colon \Ind(P) \to P$ admits a left adjoint $\hat{y}\colon P \hookrightarrow \Ind(P).$

More or less by definition, this is compactly assembled as a category: take $\kappa$ a regular cardinal greater than the cardinality of $P$, so that $P$ is $\kappa$-accessible. (We might come back to this later in the talk [if not, this should be proved.])

In this case, $\Ind(P)$ is again a poset [why?]. We may represent every object of $\Ind(P)$ as a directed subset of $P$. (Two different directed subsets may result in the same objects in $\Ind(P)$.) Given two directed subsets $S$ and $T$, we have$$\Hom_{\Ind(P)}(S,T) = \lim_{s \in S\catop} \colim_{t \in T} \Hom_P(s,t) = \begin{cases} * & \forall s \in S \exists t \in T : s \leq t\\ \emptyset & \text{otherwise}. \end{cases}$$**Question:** What is $\hat{y}$?
Let $b \in P$ and $T \in \Ind(P)$. The adjunction property for $\hat{y}$ can then be expressed as: $$b \leq \sup_{t \in T} t \iff \forall s \in \hat{y}(b) \exists t \in T : s \leq t.$$
**Definition:** Let $P$ be an arbitrary (not necessarily continuous) poset. Given $a,b \in P$, we write $a \ll b$ if and only if for every for every directed subset $(c_i)_{i \in I}$ such that $b \leq \sup_{i \in I} c_i$ there exists some $i \in I$ such that $a \leq c_i$. We define$$P_{\ll b} := \{a \in P \mid a \ll b\}.$$Note that we always have $\hat{y}(b) \subseteq P_{\ll b}$: given some $s \in \hat{y}(b)$, we need to show that for any filtered system $(c_i)$ with $b \leq \sup_{i \in I} c_i$, there exists some $i \in I$ with $s \leq c_i$. By adjunction, the condition on $(c_i)$ is the same as asking $\hat{y}(b) \leq (c_i)_{i \in I}$, which precisely means that for all $s' \in \hat{y}(b)$ there exists some $i \in I$ with $s' \leq c_i$.

**Proposition:** A poset $P$ is continuous if and only if for every $b \in P$ the subset $P_{\leq b}$ is directed and has supremum $b$.
**Proof:** For the 'if', one can show that $b \mapsto P_{\ll b}$ defines a left adjoint $\hat{y}$, so that $P$ is continuous.
For the 'only if', assume $P$ is continuous. We must show that the inclusion $\hat{y}(b) \subseteq P_{\ll b}$ becomes an equality in $\Ind(P)$.

**Claim:** There is an equality$$P_{\ll b} = \{a \in P \mid \exists s \in \hat{y}(b) : a \leq s.\}$$**Proof:** ''$\subseteq$'' Since $\hat{y}$ is fully faithful, we have $b = \sup_{s \in \hat{y}(b)} s$, and so for all $a \in P_{\ll b}$ there exists some $s \in \hat{y}(b)$ such that $a \leq s$.
''$\supseteq$'' If $a \leq s \ll b$, then also $a \ll b$.

From the claim, it follows immediately that $P_{\ll b}$ is a filtered poset and that $\sup_{a \ll b} a = b$, as desired.

**Example:** Consider $P = (\R \cup \{\infty\}, \leq)$. Then we have $a \ll b$ if and only if $a < b$ [give a short argument for this], so $\R \cup \{\infty\}$ is a continuous poset.

**Example:** Let $X \in \LCHaus$ be a locally compact Hausdorff space. Then the poset $(\Open(X), \subseteq)$ is continuous. We have $U \ll V$ if and only if $\overline{U}$ is compact and $\overline{U} \subseteq V$. [Give an argument for this.]

# 3. Rigid symmetric monoidal categories

**Definition:** Consider a presentably symmetric monoidal category $C \in \CAlg(\PrLst)$ with unit $\unit_C$ and multiplication $\mu\colon C \otimes C \to C$. Then $C$ is called *rigid* if the following conditions are satisfied:
- $\unit_C$ is compact in $C$ (equivalently, the unit functor $\Sp \xrightarrow{\S \mapsto \unit_C} C$ is strongly continuous)
- The right adjoint $\mu_C^R\colon C \to C \otimes C$ preserves colimits and its lax $(C \otimes C)$-bimodule structure is strong (equivalently, it has a right adjoint in $\Mod_{C \otimes C}(\PrLst)$).

These rigid categories are all dualizable. In fact, they are even *self-dual*:

**Proposition** (a) Any rigid symmetric monoidal category $C$ is self-dual in $\PrLst$ with evaluation given by$$C \otimes C \xrightarrow{\mu} C \xrightarrow{ \hom_C(\unit_C,-)} \Sp$$and coevaluation given by$$\Sp \xrightarrow{\S \mapsto \unit_C} C \xrightarrow{\mu_C^R} C \otimes C.$$(b) Any symmetric monoidal functor between rigid categories strongly continuous.
**Proof:** For (a), one explicitly writes out the triangle identities. [To do!] Part (b) is more intricate to show; we will deduce it below from a general characterization of rigid categories.

**Corollary:** The category $\mathrm{Rig}$ of rigid symmetric monoidal categories is a full subcategory of $\CAlg(\Pr^{\dual}).$

**Definition:** Let $C$ be a symmetric monoidal category. A morphism $f\colon X \to Y$ is called *trace-class* if there exists an object $Z$ with maps $\alpha\colon \unit_C \to Y \otimes_C Z$ and $\beta\colon Z \otimes_C X \to \unit_C$ such that $f$ is identified with the composite$$X \xrightarrow{\alpha \otimes \id} Y \otimes Z \otimes X \xrightarrow{\id \otimes \beta} Y.$$
Now, a priori there is no clear connection between this notion and the theory of dualizable categories. Let us now connect them.

**Theorem:** Let $C \in \CAlg(\PrLst)$ be a presentably symmetric monoidal stable category. Then $C$ is rigid if and only if the compact morphisms in $C$ are precisely the trace-class morphisms.

We will not prove this statement now, as it is hard to prove. But we can now deduce part (b) from before: A functor $F\colon C \to D$ is strongly cocontinuous if and only if it preserves compact morphisms. If $C$ and $D$ are rigid, then this is equivalent to $F$ preserving trace-class maps. But this holds automatically by symmetric monoidality of $F$.

**Example:** A compactly generated symmetric monoidal category $C \in \CAlg(\PrL_{\omega})$ is rigid if and only if its compact objects are precisely the dualizable objects.

**Example:** Let $X$ be a compact Hausdorff space. Then $\Shv(X;\Sp)$ is rigid; this is a consequence of Verdier duality. For every presentable $C$, we have an equivalence$$\Shv(X;C) \simeq \Shv(X;\Sp) \otimes C,$$and in particular we see that also $\Shv(X;C)$ is dualizable whenever $C$ is dualizable.

**Definition:** Let $C \in \CAlg(\PrLst)$ be a stable presentably symmetric monoidal category which is compactly generated, with compact unit. We define a full subcategory$$\Nuc(C) \quad \subseteq \quad C$$consisting of those objects $X \in C$ such that every map from a compact object of $C$ to $X$ is trace-class. The objects of $\Nuc(C)$ are called *nuclear modules*.

The examples in which this comes up are: solid modules, liquid modules, gaseous modules (in condensed mathematics).

In general, $\Nuc(C)$ need not be rigid. But there is a general criterion for $\Nuc(C)$ to be rigid.

**Proposition:** The symmetric monoidal category $\Nuc(C)$ is rigid whenever any trace-class map between compact objects is the composition of two trace-class maps.
**Proof:** [Omitted.]

In the examples from condensed mathematics, this is a condition one can verify (though it is not easy).