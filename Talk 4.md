# Compact morphisms and the axiom (AB6)

[Note for the transcribor: The speaker wrote $k\colon \Ind(C) \to C$ for the left adjoint of the Yoneda embedding $C \hookrightarrow \Ind(C)$. I started off writing this as $\colim\colon \Ind(C) \to C$. But later I switched to $k$. Perhaps we should homogenize everything and use $k$ throughout?]
## 1. Compact morphisms

**Remark:** Throughout the talk, we will work in the setting of dualizable categories. A lot of the statements go through also in the compactly assembled setting, but the proofs are more complicated; see [Sheaves on manifolds, Nikolaus, Krause, Pützstück] for details.

**Definition:** Let $C$ be a presentable category. A morphism $f\colon X \to Y$ in $C$ is called *compact* if for every filtered diagram $Z_{\bullet}\colon I \to C$ and any map $Y \to \colim_i Z_i$, the composite$$X \xrightarrow{f} Y \to \colim_i Z_i$$factors through $Z_i$ for some $i \in I$. Equivalently, we may express this as saying that for each $Z \in \Ind(C)$ and each solid diagram$$\begin{CD} Y(X) && Z \\ 
@VVV & @VVV \\
Y(Y) @>>> Y(\colim(Z)),\end{CD}$$there is a map $Y(X) \to Z$ making the square commute.

**Example:** Let $X \in C$ be compact. Then $\id_X\colon X \to X$ is a compact morphism.

**Example:** If $f\colon X \to Y$ factors through some compact object $Z \in C$, then $f$ is a compact morphism.

Indeed, this follows from the previous example combined with:
**Lemma:** The class of compact morphisms forms a two-sided ideal.
**Proof:** If $f\colon X \to Y$ is compact, and we have $X' \to X$ and $Y \to Y'$, then given any map $Y' \to \colim_i Z_i$, we may consider $Y \to Y' \to \colim_i Z_i$. By compactness of $f$, the composite with $f$ factors through some $Z_i$. But then also the further composite$$X' \to X \xrightarrow{f} Y \to Y' \to \colim_i Z_i$$factors through $Z_i$.

**Proposition:** Let $C$ be a dualizable, and let $f\colon X \to Y$ be a morphism in $C$. Then the following are equivalent:
(1) The morphism $f$ is compact.
(2) The map $y(f)\colon y(X) \to y(Y)$ factors through $\hat{y}(Y)$.
(3) The map $\hat{y}(f)\colon \hat{y}(X) \to \hat{y}(Y)$ factors through $y(X)$.
(4) The morphism $\hat{y}(f)$ is compact in $\Ind(C^{\kappa})$.
**Proof:**
(1) $\implies$ (2): Consider $Z := \hat{y}(Y)$ in $\Ind(C)$. Note that we have $\colim(Z) = Y$ by fully faithfullness, which provides a map $y(Y) \to y(\colim(Z))$. By the reformulation of compactness, we may consider the induced map $y(X) \to Z = \hat{y}(Y)$, giving the claim.
(2) $\implies$ (3): Consider the following commutative diagram:$$\begin{CD} \hat{y}(X) @>>> \hat{y}(Y) \\ 
@VVV & @VVV \\
y(X) @>>> y(Y).\end{CD}$$By assumption (2), we get a map $y(X) \to \hat{y}(Y)$ making the bottom triangle commute. We claim that then also the top triangle commutes. Indeed, this follows because after adjoining over, this diagram takes the form$$\begin{CD} X @>f>> Y \\ 
@VVV & @VVV \\
X @>f>> Y.\end{CD}$$
(3) $\implies$ (4) Assume $\hat{y}(f)$ factors through $y(X)$. Since $y(X)$ is compact in $\Ind(C)$, it follows from the previous example that $\hat{y}(f)$ is compact.
(4) $\implies$ (1): Assume $\hat{y}(f)$ is compact in $\Ind(C^{\kappa})$. Consider any morphism $Y \to \colim_i Z_i$ in $C$. By adjunction, we may regard this as a morphism $\hat{y}(Y) \to ''\colim_i'' Z_i$ in $\Ind(C)$. By compactness of $\hat{y}(f)$, there is some $i$ such that $\hat{y}(X) \to \hat{y}(Y) \to ''\colim_i'' Z_i$ factors through $Z_i$. But then adjointing back we see that $X \to Y \to \colim_i Z_i$ factors through $Z_i$.

**Corollary:** Let $C$ be a dualizable category. Then every compact morphism $f\colon X \to Y$ factors as$$X \to Z \to Y,$$where both $X \to Z$ and $Z \to Y$ are compact.
**Proof:** By the proposition, we may factor $f$ as $y(X) \to \hat{y}(Y) \to y(Y)$. Write $Y = \colim_i y(Z_i)$. Since $\hat{y}(-)$ preserves colimits, this gives $\hat{y}(Y) = ''\colim_i'' \hat{y}(Z_i)$. Since $y(X)$ is compact in $\Ind(C^{\kappa}),$ the resulting map $y(X) \to \colim_i \hat{y}(Z_i)$ factors through some $\hat{y}(Z_i)$. All in all, we see that $f$ factors as$$y(X) \to \hat{y}(Z_i) \to y(Z_i) \to \hat{y}(Y) \to y(Y),$$so that both $X \to Z_i$ and $Z_i \to Y$ are compact by the previous proposition.

**Proposition:** Let $C$ be a stable presentable category. Then a morphism $f\colon X \to Y$ is compact if and only if for any $Z \in \Ind(C)$ with $\colim(Z) = 0$, the map$$\pi_0 \Hom(y(Y),Z) \to \pi_0 \Hom(y(X),Z)$$ is the zero map.
**Proof:** We first show the ''only if''. Let $Z\colon I \to C$ with $\colim_i Z_i = 0$, and consider any map $y(Y) \to Z$ in $\Ind(C)$, or equivalently a map $Y \to \colim_i Z$ in $C$. Consider $Y \to Z_{i_0}$, $\colim_{i \in I_{i_0/}} Z_i = 0$. Then $Y \iso \colim_{i \in I_{i_0/}} \fib(Y \to Z_i))$. So $X \to Y \to \colim_{i \in I_{i_0/}} \fib(Y \to Z_i))$ factors through some $\fib(Y \to Z_i)$. But this means that $X \to Y \to Z_i$ is nullhomotopic.

Now we show "if". Consider $Z \in \Ind(C)$. We may then consider the diagram$$\begin{CD} \pi_0 \Hom(y(Y),Z) @>>> \pi_0 \Hom(y(Y),y k(Z)) @>>> \pi_0 \Hom(y(Y),\cofib(Z \to Yk(Z)) \\
@VVV & @VVV & @VVV \\
\pi_0 \Hom(y(X),Z) @>>> \pi_0 \Hom(y(X),k(Z)) @>>> \pi_0 \Hom(y(X),\cofib(Z \to y(k(Z))).\end{CD}$$The right vertical map is nullhomotopic. So then [complete the proof].

**Definition:** Let $C$ be a presentable category. A *compact exhaustion* of an object $X$ is a sequence$$X_0 \to X_1 \to X_2 \to \dots$$of compact morphisms such that the colimit is $X$. An object $X$ is called *compactly exhaustive* if it admits a compact exhaustion.

**Proposition:** Let $C$ be a presentable stable category. Then the following are equivalent:
(1) $C$ is dualizable
(2) $C$ is generated by compactly exhaustive objects.
**Proof:** (2) $\implies$ (1): We need to show that $C$ is dualizable, i.e. that $k\colon \Ind(C) \to C$ admits a left adjoint $\hat{y}(-)$. It suffices to construct this objectwise. Since the collection of objects of $C$ on which such left adjoint objects exist is closed under colimits, it suffices to do so for compactly exhaustive objects. So write $X = \colim_{i \geq 0} X_i$, with $X_i \to X_{i+1}$ a compact morphism. We claim that we can set$$\hat{y}(X) := \colim_{i \geq 0} y(X_i).$$So, for $Z \in \Ind(C)$, we need to produce a natural isomorphism $$\Hom_{\Ind(C)}(\colim y(X_i),Z) = \Hom_C(\colim_i X_i, k(Z)).$$Note that the latter is, by fully faithfulness, equivalent to $\Hom_{\Ind(C)}(\colim_i y(X_i), yk(Z))$. So, it suffices to show that the canonical map$$\Hom_{\Ind(C)}(\colim y(X_i),Z) \to \Hom_{\Ind(C)}(\colim_i y(X_i), yk(Z))$$is an equivalence, or equivalently that its fiber in $\Sp$ is zero. We may reduce to the case $Z \in \ker(k\colon \Ind(C) \to C)$. By the previous proposition, the map$$\pi_0 \Hom(X_{i+1},Z) \to \pi_0 \Hom(X_i,Z)$$is the zero map for all $i$. Then, note that we have$$\pi_i \Hom(\colim_i y(X_i), Z) = \Hom(\colim_i y(X_i), \Sigma^{-i}Z) \simeq \lim_i \Hom(y(X_i),\Sigma^{-i}Z) = 0,$$where the last equality holds because (I'M VERY CONFUSED)

(1) $\implies$ (2) We skip this direction, as it was proved in Marc's first lecture.

We now prove a universal property of the transformation $\Hom(y(X),\hat{y}(-)) \to \Hom(y(X),y(-))$. We start with an auxiliary result:

**Proposition:** Let $C$ be a dualizable category, and assume $D$ admits filtered colimits. Then the inclusion$$\Fun^{\mathrm{filt}}(C,D) \hookrightarrow \Fun(C,D)$$admits a right adjoint, given by $F \mapsto k \circ \Ind(F) \circ \hat{y}$.
**Proof:** Since $\hat{y} \dashv k$, we get $k^* \dashv \hat{y}^*$ as functors $\Fun(C,D) \rightleftarrows \Fun(\Ind(C),D)$. Restricting to filtered-colimit-preserving functors, we get$$\Fun^{\mathrm{filt}}(C,D) \rightleftarrows \Fun^{\mathrm{filt}}(\Ind(C),D) \simeq \Fun(C,D),$$as desired. Using that $Fky \simeq F$, we see after some unwinding that the formula for the left adjoint is given by $F \mapsto k \Ind(F) \hat{y}$.

**Proposition:** The functor$$\Hom(y(X),\hat{y}(-))\colon C \to \An$$ is the terminal filtered-colimit-preserving functor in $\Fun(C,\An)_{/\Hom(y(X),y(-)}.$ The same claim woks among functors $C \to \Sp$.
**Proof:** We need to compute the terminal object of the slice category $\Fun^{\mathrm{filt}}(C,\An)_{/\Hom(y(X),y(-))}.$ By the previous adjunction, this is equivalent to the slice category$$\Fun^{\mathrm{filt}}(C,\An)_{/k \circ \Ind\Hom(y(X),y(-)) \circ \hat{y}},$$whose terminal object is $k \circ \Ind\Hom(y(X),y(-)) \circ \hat{y}$. But note that the composite$$C \xrightarrow{y} \Ind(C) \xrightarrow{\Hom(y(X),-} \An$$is simply $\Hom_C(X,-)$, and so all in all we just get $\Hom(y(X),\hat{y}(-))$, as desired.

# 2. The axiom (AB6)

**Definition:** Let $C$ be a presentable category. We say that *$C$ satisfies (AB6)* if for every set $I$, and functors $F_i \colon J_i \to C$ with $J_i$ filtered, the canonical map$$\colim_{j \in \prod_i J_i} \prod_i F_i(j(i)) \to \prod_{i} \colim_{J_i} F_i$$is an equivalence.

**Example:** The categories $\Set$ and $\An$ satisfy (AB6).

**Proposition:** Let $C$ be a presentable stable category. Then the following are equivalent:
(1) $C$ is dualizable.
(2) $C$ satisfies (AB6)
**Proof:** First we show (1) $\implies$ (2). By dualizability of $C$, the functor $k\colon \Ind(C^{\kappa}) \to C$ preserves all limits and colimits. For $I$ and $F_i\colon J_i \to C$ as before, we have$$\colim_{j \in \prod_i J_i} \prod_{i} y(F_i(j(i))) \simeq \prod_{i} \colim_{J_i} y \circ F_i;$$this follows from the claim in $\An$. Applying $k\colon \Ind(C^{\kappa}) \to C$ then gives the claim.

Next we show (2) $\implies$ (1). Consider the functor$$k\colon \Ind(C^{\kappa}) \to \Ind^{\kappa}(C^{\kappa}) = C.$$We need to construct a left adjoint. Since $k$ has a right adjoint, it suffices to show that $k$ preserves all limits. As both sides are stable, we may reduce to products. So assume that $Z \in \Ind(C)$ is of the form $\prod_{i \in I} Z_i$ for some set $I$. Write $Z_i = \colim_{J_i} \circ y \circ F_i$ for some $F_i\colon J_i \to C$. Then we have$$Z = \prod_{i \in I} Z_i = \prod_i \colim_{J_i} y \circ F_i.$$ By (AB6), this is equivalent to $\colim_{j \in \prod_i J_i} \prod_i y(F_i(j(i))) = \colim y(\prod_i F_i(j(i)))$. It then follows that$$k(Z) = k(\prod_i Z_i) = \colim_{j \in \prod_i J_i} \prod_j F_i(j(i)) = \prod_i \colim_{J_i} F_i = \prod_i k(Z_i).$$