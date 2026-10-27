## Recollections on K-theory

We start with some recollections on the functor $K\colon \Cat^{\st} \to \Sp$.

**Definition:** For a functor $F\colon \Cat^{\st} \to \Sp$, the following are equivalent:
(1) For each fully faithful functor $A \hookrightarrow B$, $F$ takes the sequence $A \hookrightarrow B \to B/A$ to a fiber sequence.
(2) Each fiber sequence $A \hookrightarrow B \to C$ inducing an equivalence $(A/B)^{\mathrm{idem}} \iso C^{\mathrm{idem}}$ is sent to a fiber sequence under $F$.

We refer to such sequences $A \hookrightarrow B \to C$ as a ''localization sequence''. It is equivalent to demanding that after applying $\Ind(-)$ it is a recollement in the 2-category $\PrL_{\st}$.

A functor $F$ satisfying these equivalent properties is called a *localization sequence*.

**Theorem/Definition:** $K$ is the unit for the Day convolution operad structure on $\Fun_{\loc}(\Cat^{\st},\Sp)$.

Concretely, consider $$\Fun_{\loc}(\Cat^{\st},\Sp) \subseteq \Fun(\Cat^{\st},\Sp) \subseteq \Fun(\Cat^{\st},\widehat{\Sp}).$$There is a suspended Yoneda functor$$(\Cat^{\st})\catop \to \Fun(\Cat^{\st},\Sp), \qquad C \mapsto \Sigma^{\infty}_+\Map(C,-).$$The unit for Day convolution on $\Fun(\Cat^{\st},\Sp)$ is $\Sigma^{\infty}_+\Map(\Sp^{\fin},-)$, which is the suspension of the core functor. The universal property of $K$ now says that for every localizing invariant $F$ and any map $\Sigma^{\infty}_+\mathrm{core} \to F$ extends uniquely to a map $K \to F$.

**Remark:** There is an equivalence of categories $$\Ind\colon \Cat^{\st, \mathrm{idem}} \rightleftarrows \PrLst_{\omega}\noloc (-)^{\omega}.$$Then for a functor $f\colon A \to B$ in $\Cat^{\st,\mathrm{idem}}$:
- $f$ is fully faithful if and only if $\Ind(f)$ is fully faithful, iff and only if $\Ind(f)$ is a monomorphism
- If $f$ is a localization, then $\Ind(f)$ is a localization, or equivalently $\Ind(f)$ is an epimorphism. The converse does not hold.

**Theorem (Tamme, before Efimov):** Consider a square $Q$ in $\Cat^{\st}$ of the form$$\begin{CD} A @>f>> B \\
@VVV & @VVV \\
C @>>g> D.\end{CD}$$
Assume that $\Ind(Q)$ is cartesian, and that $\Ind(f)$ and $\Ind(g)$ are localizations. Then every localizing invariant $F$ sends $Q$ to a cartesian square.

**Wrong proof:** Without loss of generality, $A$ is idempotent complete, so $Q$ is cartesian. Therefore, we get an equivalence $\fib(f) \simeq \fib(g)$. Applying our localizing invariant, we obtain fiber sequences, and so $F(Q)$ is a pullback square.

However, this proof doesn't work: the fact that $\Ind(f)$ and $\Ind(g)$ are localizations does _not_ mean that $f$ and $g$ themselves are localizations.

**Example (Milnor patching):** Consider a pullback square of $E_1$-rings:$$\begin{CD} A@>>> A' \\
@VVV & @VVV \\
B @>>> B'\end{CD}$$and assume that $A' \otimes_A A' \iso A'$. Then the induced square$$\begin{CD} \Mod_A @>>> \Mod_{A'} \\
@VVV & @VVV \\
\Mod_B @>>> \Mod_{B'}\end{CD}$$is also a pullback square, and $\Mod_B \to \Mod_{B'}$ is a localization. In particular, we deduce:

**Theorem:** In the above situation, there is a pullback square$$\begin{CD} K(A) @>>> K(a') \\
@VVV &@VVV \\
K(B) @>>> K(B').\end{CD}$$
**Example:** Given a map of rings $A \to B$ that sends an ideal $I \subseteq A$ isomorphically to the induced ideal $IB \subseteq B$, the induced square $$\begin{CD} A @>>> A/I \\
@VVV & @VVV \\ B @>>> B/IB\end{CD}$$is a pullback of E_1-rings.

**Keller's example (1994):** Let $I \subseteq \mathrm{Jac}(A)$ be a Tor-unital idea. Then the category $$\ker(\Mod_A \to \Mod_{A/I})$$contains no nonzero compact objects. Note that $\Mod_A \simeq \Ind(\Perf_A)$ and $\Mod_{A/I} \simeq \Ind(\Perf_{A/I})$. So the kernel of $f\colon \Perf_A \to \Perf_{A/I}$ is zero. This gives a counterexample to the inverse of the previous implication: $\Ind(f)$ is a localization, but $f$ is not.

For example, consider $A = k[t,t^{1/2},t^{1/4}, \dots]_{(t,t^{1/2}, t^{1/4}, \dots)}$, for $k$ a field. Let $\mm$ be the maximal ideal. Then the map $A \to A/\mm$ is an example.

## Dualizable categories

**Theorem (Lurie):** Consider $C \in \PrLst$. The following are equivalent:
- There exists a localization $\phi\colon D \to E$ in $\PrLst_{\omega}$ such that $C = \ker(\phi)$.
- $C$ is dualizable in $(\PrLst,\otimes)$
- The functor $\colim\colon \Ind(C) \to C$ has a left adjoint (''compactly assembled'')
- $C$ is a retract in $\PrLst$ of a compactly generated category
- (Efimov) $C \otimes (-)\colon \PrLst \to \PrLst$ preserves fully faithful functors (''flat'')
- (Clausen-Scholze) arbitrary products distribute over filtered colimits (''AB6'')

In particular, compactly generated categories are dualizable. In fact, we have$$\Ind(C)^{\vee} = \Ind(C\catop).$$
**Examples:** 
- Keller's example.
- Shv(X,\Sp), for $X$ locally compact Hausdorff
- $\mathrm{Nuc}(\Z_p^{\square})$, $\mathrm{Nuc}(\R^{p-\mathrm{liq}})$, $\mathrm{Nuc}(\C^{\mathrm{gas}})$.

All of the latter examples are actually self-dual. The reason is: they are even *rigid*.

**Definition:** A *rigid category* is $C \in \CAlg(\PrLst)$ such that for every finite set $I$, the multiplication functor $\mu\colon C^{\otimes I} \to C$ admits a right adjoint in $\Mod_{C^{\otimes I}}(\PrLst)$.

**Example:** Assume every object of $C$ is dualizable. Then $\Ind(C)$ is rigid.

**Proposition:** If $C$ is rigid, then $C$ is self-dual via$$C \otimes C \xrightarrow{\mu} C \xrightarrow{\Gamma} \Sp.$$
**Definition:** We denote by$$\Cat^{\dual}_{\st} \subseteq \PrLst$$the locally full sub-2-category consisting of the dualizable categories and left adjoint morphisms (meaning: the right adjoint again preserves colimits; this is also called ''strongly continuous'').

Ind-completion defines a fully faithful functor$$\Ind\colon \Cat^{\st,\idem} \hookrightarrow \Cat^{\dual}.$$What we would like to do is to extend the K-theory functor from $\Cat^{\st,\idem}$ to $\Cat^{\dual}$: we would like to define $K^{\cont}(C) := \fib(K(D^{\omega}) \to K(E^{\omega}))$, with $D$ and $E$ as in item (1) in the Theorem. But it is not clear this is well-defined: we would like to have a _canonical_ way of writing $C$ as the fiber of a map between compactly generated categories.

To do this, consider $C \in \Cat^{\dual}_{\st}$, and consider the fiber sequence$$C \rightleftarrows \Ind(C^{\kappa}) \rightleftarrows \Ind(\Calk_{\kappa}(C)).$$Here $\kappa$ is chosen large enough to guarantee the left adjoint $C \to \Ind(C^{\kappa})$ exists, and $\Calk_{\kappa}(C)$ is defined as the compact objects in the quotient $\Ind(C^{\kappa})/C$. In fact, $\kappa = \omega_1$ always suffices.

**Definition:** Let $F$ be a localizing invariant. Then we define $$F^{\cont}(C) := \fib(F(C^\kappa)) \to F(\Calk_{\kappa}(C))$$for $\kappa = \omega_1$ or $\kappa \to \infty$. By Eilenberg-swindle, we have $F(C^{\kappa}) = 0$, so this is equivalently$$F^{\cont}(C) = \Omega F(\Calk_{\kappa}(C)).$$
**Theorem (Efimov):** Restriction along $\Ind$ induces an equivalence of categories$$\Fun_{\loc}(\Cat^{\dual}_{\st},\Sp) \iso \Fun_{\loc}(\Cat^{\st},\Sp),$$with inverse given by $F \mapsto F^{\cont}$.

**Example:** We have a functor$$\THH\colon \Cat^{\dual}_{\st} \to \Sp, C \mapsto \tr(\id_C) \in \End_{\PrLst}(\Sp) = \Sp.$$This is a dualizing invariant (formal property of the trace.)

**Theorem (Efimov):** Let $C$ be dualizable and $X$ a locally compact Hausdorff space. Then$$K^{\cont}(\Shv(X;\Sp)) \simeq \Gamma_c(X;K^{\cont}(C)).$$
**Example:** $K^{\cont}(\R^n;C) \simeq \Omega^n K^{\cont}(C).$

**Theorem (Efimov):** Let $R$ be a commutative ring, and $I = (f_1, \dots, f_m) \subseteq R$. Then$$K^{\cont}(\Nuc(R^{\wedge}_I)) = \lim_{n \to \infty} K(R // (f_1^n, \dots,f^n_m)).$$
