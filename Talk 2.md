## 1. Compactly assembled categories

**Definition:** A category $C$ is called *compactly assembled* if it is accessible, admits filtered colimits, and the colimit functor $\colim \colon \Ind(C) \to C$ admits a left adjoint $\hat{Y}\colon C \hookrightarrow \Ind(C)$. Note that $\hat{Y}$ is automatically fully faithful, since its double right adjoint $Y\colon C \hookrightarrow \Ind(C)$ is fully faithful.

**Example:** If $C$ accessible and compactly generated, then $C$ is compactly assembled.

Indeed, if $C = \Ind(C_0)$ with $C_0$ small, then $\hat{Y} = \Ind(Y_{C_0})\colon \Ind(C_0) \to \Ind(\Ind(C_0))$, where $Y_{C_0}\colon C_0 \hookrightarrow \Ind(C_0) = C$ is the Yoneda embedding.

**Theorem (Lurie):** Let $C$ be a category with filtered colimits. Then the following are equivalent:
(1) $C$ is compactly assembled.
(2) There exists a small category $D$ such that $C$ is a retract of $\Ind(D)$ as a category with filtered colimits.
**Proof:** (1) $\implies$ (2) We have an adjunction between $\hat{Y}\colon C \hookrightarrow \Ind(C)$ and $\colim\colon \Ind(C) \to C$. Since $\hat{Y}$ is fully faithful, this exhibits $C$ as a retract of $\Ind(C)$, with both functors preserving filtered colimits. To ensure we may pick $D$ small, write $C = \Ind_{\kappa}(C^{\kappa})$, with $C^{\kappa}$ small. We may find some regular cardinal $\lambda$ such that $\hat{Y}(C^{\kappa}) \subseteq \Ind(C^{\lambda})$. Since the inclusion $\Ind(C^{\lambda}) \subseteq \Ind(C)$ preserves filtered colimits, it follows that in fact $\hat{Y}(C) \subseteq \Ind(C^{\lambda})$. So it follows that $C$ is already a retract of $\Ind(C^{\lambda})$, giving the claim.

For (2) $\implies$ (1), assume we have $u\colon U \hookrightarrow \Ind(D)$ with retraction $v\colon \Ind(D) \to U$, and assume $u$ and $v$ preserve filtered colimits. It follows that $C$ is accessible: we have$$C = \lim( \dots \xrightarrow{uv} \Ind(D) \xrightarrow{uv} \Ind(D)),$$and the subcategory $\mathrm{Acc} \subseteq \Cat$ of accessible categories and accessible functors is closed under limits in $\Cat$.

To show the existence of $\hat{Y}$, consider the following commutative diagram:$$\begin{CD} \Ind(C) @>\colim_C>> C \\
@V{\Ind(u)}V{\Ind(v)}V & @V{u}V{v}V \\
\Ind(\Ind(D)) @>>\colim_{\Ind(D)}> \Ind(D).\end{CD}$$It follows that $\colim_C$ is a retract of $\colim_{\Ind(D)}$. So we are done in light of the following lemma:

**Lemma:** Let $g\colon C \to D$ be a retract of $g'\colon C' \to D'$. Suppose that $g'$ has a left adjoint $f'$ and $C$ is idempotent complete. Then $g$ has a left adjoint.
**Proof:** Consider a retract diagram$$\begin{CD} C @>u>> C' @>v>> C \\
@VgVV & @VVg'V & @VVgV \\
D @>\hat{u}>> D' @>\hat{v}>> D\end{CD}$$Then $\Map_D(d,g(-))$ is a retract of $\Map_C(vf'\hat{u}(d),-)$. The subcategory $C\catop\hookrightarrow \Fun(C,\An)$ is closed under retracts. So there exists an $f(d)$ such that $\Map_D(d,g(-)) \cong \Map_C(f(d),-)$.

**Definition:** Let $C$ and $D$ be compactly assembled. A functor $f\colon C \to D$ is called *strongly continuous* if it preserves filtered colimits and commutes with $\hat{Y}$, meaning that the mate transformation$$\hat{Y}_D f \to \Ind(f) \hat{Y}_C$$ of the commutative square$$\begin{CD} \Ind(C) @>\colim_C>> C \\
@V{\Ind(f)}VV & @V{f}V{}V \\
\Ind(C) @>>\colim_{D}> D\end{CD}$$is a natural isomorphism.

**Remark:** Assume $f$ admits a right adjoint $g\colon D \to C$. Then the condition that $f$ is strongly continuous is equivalent to $g$ preserving filtered colimits.
## 2. Dualizable categories

Recall that we have a subcategory $\PrL \subseteq \widehat{\Cat}$ on presentable categories and left adjoint functors (equivalently: functors preserving colimits). This category comes equipped with a symmetric monoidal structure$$-\otimes -\colon \PrL \times \PrL \to \PrL$$which classifies bilinear functors: $\Fun^{\colim}(C \otimes D, E) \simeq \Fun^{\colim}(C,\Fun^{\colim}(D,E))$. Essentially by construction, the symmetric monoidal category $\PrL$ is *closed*, with internal hom given by $\Fun^{\colim}(-,-)$. The tensor product admits an explicit description as$$C \otimes D = \Fun^{\lim}(C\catop,D).$$ To see this, one first shows that the right-hand side is presentable, and then one explicitly computes that $\Fun^{\colim}(\Fun^{\lim}(C\catop,D),E) \simeq \Fun^{\colim}(C,\Fun^{\colim}(D),E)).$

The full subcategory$$\PrL_{\st} \subseteq \PrL$$is closed under the monoidal structure. Moreover, for $C_0$ small stable and $D$ a stable presentable category, we compute$$\Ind(C_0) \otimes D = \Fun^{\lim}(\Ind(C_0)\catop,D) = \Fun^{\ex}(C_0\catop,D) = \Fun^{\colim}(\Ind(C_0\catop),D).$$In other words, tensoring with $\Ind(C_0)$ in $\PrL_{\st}$ is equivalent to forming the internal hom out of $\Ind(C_0\catop)$.

**Corollary:** Let $C_0$ be a stable small category. Then $C = \Ind(C_0)$ is dualizable in $\PrL_{\st}$, with dual$$C^{\vee} = \Ind(C_0\catop).$$Moreover, the evaluation map is given by applying $\Ind\colon \Cat^{\st} \to \PrL_{\st}$ to the mapping spectrum functor$$\hom_{C_0}\colon C_0\catop \otimes C_0 \to \Sp,$$while the coevaluation $\Sp \to \Ind(C_0) \otimes \Ind(C_0\catop) = \Fun^{\ex}(C_0,\Ind(C_0))$ is the functor sending the sphere to the Yoneda embedding $C_0 \hookrightarrow \Ind(C_0)$.

**Definition:** A *dualizable category* is a dualizable object of $\PrL_{\st}$. We denote by $\Pr^{\dual} \subseteq \PrL_{\st}$ the subcategory whose objects are the dualizable categories and the internal left adjoints, i.e. those functors in $\PrL_{\st}$ whose right adjoint also lies in $\PrL_{\st}$, i.e. preserves colimits.

**Remark:** Note that a right adjoint of a functor between stable categories automatically preserves finite colimits, so it preserves all colimits if and only if it preserves filtered colimits. So the morphisms in $\Pr^{\dual}$ are precisely the strongly continuous functors.

**Remark:** By the previous corollary, every compactly generated category $C = \Ind(C_0)$ is dualizable. Moreover, by every continuous functor preserving compact objects is strongly continuous, so a morphism in $\Pr^{\dual}$ by the previous remark. So we get a fully faithful inclusion$$\Pr^{\mathrm{L},\omega}_{\st} \subseteq \Pr^{\dual}.$$

**Theorem (Lurie):** Let $C \in \PrL_{\st}$. Then the following are equivalent:
(1) $C$ is dualizable.
(2) $C$ is compactly assembled
(3) There exists a localization $D \to E$ in $\Pr^{\mathrm{L},\omega}_{\st}$ such that $C = \ker(D \to E)$
(4) $C$ has the left lifting property with respect to any localization in $\PrL_{\st}$: for every localization $D \to E$ and any $C \to E$, there exists a lift $C \to D$. [Draw the tikzcd diagram with $D \to E$ as the right vertical and $C$ on the bottom left, with $C \to D$ a dashed diagonal arrow.]
**Proof:** (2) $\implies$ (1): Every compactly assembled category is a retract of a compactly generated one. The previous remark shows that compactly generated categories are dualizable, and since dualizable objects are closed under retracts we are done.
(1) $\implies$ (4) Assume $C$ is dualizable, and consider a cofiber sequence$$K \hookrightarrow D \to E$$in $\PrL_{\st}$. Tensoring with $C^{\vee}$ preserves colimits, so gives another cofiber sequence$$C^{\vee} \otimes K \to C^{\vee} \otimes D \to C^{\vee} \otimes E.$$In particular, the functor $C^{\vee} \otimes D \to C^{\vee} \otimes E$ is again a localization, hence essentially surjective. It follows that the functor $\Sp \to C^{\vee} \otimes E$ classifying $C \to E$ lifts to a functor $\Sp \to C^{\vee} \otimes D$ classifying a lift $C \to D$.
(4) $\implies$ (2) Let $C_0 \subseteq C$ be a small dense stable subcategory, and consider the adjunction$$Y\colon C  \leftrightarrows \Ind(C_0) \noloc \colim.$$Since $Y$ is fully faithful, it follows that $\colim\colon \Ind(C_0) \to C$ is a localization, and so by (4) this admits a section in $\PrL_{\st}$. It follows that $C$ is a retract of $\Ind(C_0)$, hence it is compactly assembled.
(3) $\implies$ (2) Consider a fiber sequence$$C \hookrightarrow D \to E.$$From the fact that $D \to E$ admits a right adjoint, it follows that also $C \to D$ admits a right adjoint $D \to C$, but then this right adjoint is in fact a retraction, showing that $C$ is a retract of $D$ in $\PrL_{\st}$.
(2) $\implies$ (3) As before, we may find some $\lambda$ such that $\colim\colon \Ind(C^{\lambda}) \to C$ admits a left adjoint $C \to \Ind(C^{\lambda})$. Then consider the cofiber sequence$$C \xhookrightarrow{\hat{Y}} \Ind(C^{\lambda}) \to \Calk_{\lambda}(C) := \cofib(\hat{Y}) \simeq \fib(\colim).$$The localization functor $\Ind(C^{\lambda}) \to \Calk_{\lambda}(C)$ admits a right adjoint in $\PrL_{\st}$, and so it preserves compact objects. It in particular follows that $\Calk_{\lambda}(C)$ is compactly generated, so this gives (3).
# 3. $\omega_1$-presentability

Note that by fully faithfulness of $y\colon C \hookrightarrow \Ind(C)$, the counit $\colim y \to \id$ is invertible. By inverting it we get $\id \to \colim y$, which under adjunction corresponds to a natural transformation$$\hat{y} \to y.$$
**Theorem (Efimov):** Let $C$ be compactly assembled.
(1) $C$ is $\omega_1$-compactly generated.
(2) An object $x$ of $C$ is $\omega_1$-compact if and only if it can be written as$$x = \colim( \dots \to x_n \to x_{n+1} \to \dots)$$where each map $y(x_n) \to y(x_{n+1})$ factors as$$y(x_n) \to \hat{y}(x_{n+1}) \to y(x_{n+1}).$$**Proof:** We first prove (2). For $\impliedby$, write $x = \colim(x_n)$. Then $\hat{y}(x) = \colim_n \hat{y}(x_n) = \colim_n y(x_n)$, where the last equality holds by considering$$\begin{CD} \dots @>>> y(x_n) @>>> y(x_{n+1}) @>>> \dots \\
& @AAA& @AAA & \\
\dots @>>> \hat{y}(x_n) @>>> \hat{y}(x_{n+1}) @>>> \dots\end{CD}$$and fill it with the given maps $y(x_n) \to \hat{y}(x_{n+1})$. The top triangle commutes by construction. The fact that we can also make the bottom triangle commutes in a way that makes the total square agree with the canonical one follows from the adjunction $\hat{y} \vdash \colim$: after applying the adjunction, this square looks like$$\begin{CD} x_n @>>> x_{n+1} \\
@V=VV & @V=VV \\
x_{n} @>>> x_{n+1}.\end{CD}$$Now, each $y(x_n)$ is compact in $\Ind(C)$, and in particular $\omega_1$-compact, so also the colimit $\hat{y}(x) = \colim_n y(x_n)$ is $\omega_1$-compact. But since $\hat{y}$ is fully faithful and preserves filtered colimits, this implies that $x$ is already $\omega_1$-compact in $C$.

For $\implies$, consider $x \in C$. **Observation:** We may write $\hat{y}(x) = \colim_{i \in I} y(x_i)$ for $I$ a filtered poset. (Any filtered category admits a cofinal map from a filtered poset.) By applying $\colim\colon \Ind(C) \to C$, we get $x = \colim_{i \in I} x_i$. Since $\hat{y}$ preserves colimits, we get $\hat{y}(x) = \colim_{i \in I} \hat{y}(x_i)$. Since each $y(x_i)$ is compact, it follows that for each $i \in I$ there exists some $j \geq i$ such that there exists a factorization of $y(x_i) \to y(x_j)$ through $\hat{y}(x_j) \to y(x_j)$.

Now, assume $x$ is $\omega_1$-compact. Then also $\hat{y}(x)$ is $\omega_1$-compact in $\Ind(C)$, and so we may write $\hat{y}(x) = \colim_n y(x_n)$. By the previous observation we see that for each $n$ there exists some $k \geq n$ such that the map $y(x_n) \to y(x_k)$ factors through $\hat{y}(x_k)$. By reindexing, we may assume $k = n+1$, giving the claim.

Finally, we prove (1). Our **goal** is to write $x$ as an $\omega_1$-filtered colimit of $\omega_1$-compact objects. We may write$$\hat{y}(x) = \colim_{i \in I} y(x_i)$$ for _some_ poset $I$.  Consider$$J := \{ \text{ sequences } i_0 \leq i_1 \leq i_2 \leq \dots \text { in } I\}.$$This is a filtered poset. Moreover, the functor $\ev\colon J \times \N \to I$ is cofinal, and so we may write$$x = \colim_{i_{\bullet} \in J} \colim_{n} x_{i_n}.$$ Let $J' \subseteq J$ be the subposet on those sequences for which each map $y(x_{i_n}) \to y(x_{i_{n+1}})$ factors through $\hat{y}(x_{i_{n+1}}).$ By the observation, $J'$ is cofinal. By (2), for each $i_{\bullet} \in J'$, $\colim_n x_{i_n}$ is $\omega_1$-compact. We may consider the quotient $J' \twoheadrightarrow J' /\sim$, with $(i_{\bullet}) \sim (j_{\bullet})$ if $i_n = j_n$ for $n \gg 0$. All in all, we see that$$x = \colim_{[i_{\bullet}] \in J'/\sim} \colim_{n \gg 0} x_{i_n}.$$It thus remains to show:
**Claim:** $J'/\sim$ is $\omega_1$-filtered. To see this, consider$$(i^1_{\bullet}) \leq (i^2_{\bullet}) \leq (i^3_{\bullet}) \leq \dots.$$Consider $s_{\bullet} := (i^n_n)_n$. Then we see that $[s] \geq [i^{k}_{\bullet}]$ for all $k$, so this gives an upper bound.