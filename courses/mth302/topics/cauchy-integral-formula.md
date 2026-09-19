## Why this topic matters

This is the theorem that makes complex analysis feel like magic: the values of an analytic function *inside* a closed curve are completely determined by its values *on* the curve. Nothing in real analysis behaves like this.

## Prerequisites

- Analytic functions and the Cauchy\u2013Riemann equations
- Contour integrals

:::eli5
Imagine you're only allowed to measure the temperature along the *edge* of a metal disc, never inside it. For a generic disc that wouldn't tell you the temperature at the center. But if the disc's temperature distribution is "analytic" (in the complex sense), the edge measurements pin down every interior value *exactly*, with an explicit formula. The boundary secretly contains all the information about the inside.
:::

## Formal definition and theorems

:::theorem Cauchy's Theorem
If $f$ is analytic on and inside a simple closed contour $C$, then $\oint_C f(z)\,dz = 0$.
:::

:::formal Cauchy's Integral Formula
Let $f$ be analytic on and inside a simple closed contour $C$, and $z_0$ inside $C$. Then
$$
f(z_0) = \frac{1}{2\pi i}\oint_C \frac{f(z)}{z-z_0}\,dz.
$$
:::

:::theorem Generalized Cauchy Integral Formula
Under the same hypotheses, $f$ has derivatives of every order inside $C$, given by
$$
f^{(n)}(z_0) = \frac{n!}{2\pi i}\oint_C \frac{f(z)}{(z-z_0)^{n+1}}\,dz.
$$
:::

:::proof
Sketch of Cauchy's Integral Formula: for small $\varepsilon>0$, replace $C$ with a small circle $C_\varepsilon$ of radius $\varepsilon$ around $z_0$ (justified because $f(z)/(z-z_0)$ is analytic in the region between $C$ and $C_\varepsilon$, so by Cauchy's theorem the two contour integrals are equal). Parametrize $z=z_0+\varepsilon e^{i\theta}$:
$$
\oint_{C_\varepsilon}\frac{f(z)}{z-z_0}\,dz = \int_0^{2\pi} \frac{f(z_0+\varepsilon e^{i\theta})}{\varepsilon e^{i\theta}}\, i\varepsilon e^{i\theta}\,d\theta = i\int_0^{2\pi} f(z_0+\varepsilon e^{i\theta})\,d\theta.
$$
As $\varepsilon\to0$, continuity of $f$ gives this integral $\to i\int_0^{2\pi}f(z_0)\,d\theta = 2\pi i f(z_0)$, which is independent of $\varepsilon$ — giving the formula. $\blacksquare$
:::

## Worked examples

:::example Easy
$\displaystyle\oint_{|z|=2}\frac{e^z}{z-1}\,dz$: here $f(z)=e^z$ is entire and $z_0=1$ lies inside $|z|=2$, so the integral is $2\pi i\, f(1) = 2\pi i\, e$.
:::

:::example Standard university level
$\displaystyle\oint_{|z|=1}\frac{\sin z}{z^4}\,dz$: matching to the generalized formula with $n=3$, $z_0=0$, $f(z)=\sin z$: the integral equals $\dfrac{2\pi i}{3!}f'''(0) = \dfrac{2\pi i}{6}\cdot(-\cos 0) = -\dfrac{\pi i}{3}$.
:::

:::example Exam level
Evaluate $\displaystyle\oint_{|x|=2,|y|=2} \frac{dz}{(z^2+1)(z^2+9)}$ (square contour). Singularities at $z=\pm i,\pm 3i$; only $\pm i$ lie inside the square $|x|\le2,|y|\le2$. Using partial fractions $\dfrac{1}{(z^2+1)(z^2+9)} = \dfrac{1}{8}\left(\dfrac{1}{z^2+1}-\dfrac{1}{z^2+9}\right)$ and applying the integral formula at each pole of $1/(z^2+1) = \dfrac{1}{(z-i)(z+i)}$ gives the residues at $\pm i$; summing $2\pi i$ times each residue gives the final value $\dfrac{\pi}{8}$.
:::

:::example Difficult
Use Cauchy's Integral Formula (applied to $f(z)=1$ constant, or via Liouville's theorem which it underlies) to prove the Fundamental Theorem of Algebra: every non-constant polynomial has a root in $\mathbb C$. Sketch: if $p(z)$ had no root, $1/p(z)$ would be entire and bounded (since $|p(z)|\to\infty$ as $|z|\to\infty$), so by Liouville's theorem (itself a corollary of the generalized Cauchy formula bounding derivatives) $1/p(z)$ is constant — a contradiction unless $p$ is constant.
:::

:::counterexample
**Statement that looks true:** "Cauchy's Integral Formula applies to any function, as long as $z_0$ is inside the contour."

**Counterexample:** $f(z)=\bar z$ is not analytic anywhere (see Analytic Functions), so the formula's derivation simply does not apply to it — there is no guarantee that $\displaystyle\oint_{|z|=1}\frac{\bar z}{z-0}\,dz$ equals $2\pi i f(0)$.

**Why it fails:** the entire proof relies on Cauchy's theorem, which requires $f$ analytic inside $C$ — without that, there's no reason for the boundary values to determine anything about the interior.
:::

## Common mistakes

:::mistake
Applying the formula when $z_0$ lies **outside** $C$ — in that case $f(z)/(z-z_0)$ is analytic everywhere inside $C$, and by Cauchy's theorem the integral is simply $0$, not $2\pi i f(z_0)$.
:::

:::mistake
Forgetting to check whether *all* singularities of the integrand lie inside the contour, versus only some (as in the square-contour example above) — only the enclosed ones contribute.
:::

## Applications

:::application
**Residue calculus:** the generalized Cauchy formula is the theoretical foundation for the residue theorem, used to evaluate real definite integrals (e.g. $\int_0^\infty \frac{dx}{1+x^6}$) that are difficult or impossible by elementary real methods.
:::

## Exam-ready answer

:::examready
$f(z_0) = \frac{1}{2\pi i}\oint_C \frac{f(z)}{z-z_0}dz$ when $f$ is analytic on/inside $C$ and $z_0$ is inside $C$; equals $0$ if $z_0$ is outside. The generalized version replaces $(z-z_0)^{-1}$ with $(z-z_0)^{-(n+1)}$ and $f(z_0)$ with $n!\,f^{(n)}(z_0)$ — always check first whether the integrand is simply analytic throughout (giving $0$ by Cauchy's theorem) before reaching for the formula.
:::

## Viva preparation

:::viva
**Q: What is the single biggest consequence of Cauchy's Integral Formula?**
That every analytic function is automatically infinitely differentiable — a purely complex-analytic phenomenon, with no real-variable analogue.

**Q: What happens if $z_0$ is exactly ON the contour $C$?**
The formula doesn't apply directly — the integral becomes a principal-value type object requiring separate treatment, outside this course's scope.

**Common examiner trap:** a contour integral where the pole sits outside the given contour — the expected answer is $0$ via Cauchy's theorem, not a formula plug-in.
:::

## Practice questions

:::example Practice — Level 3 (Standard)
Evaluate $\displaystyle\oint_{|z|=3} \frac{\cos z}{z(z-1)}\,dz$.
:::

:::example Practice — Level 5 (Difficult / proof)
Use the generalized Cauchy Integral Formula to prove Liouville's theorem: a bounded entire function is constant.
:::

## Topic mastery checklist

- I can state Cauchy's Theorem and Cauchy's Integral Formula precisely, including hypotheses.
- I can identify which singularities of an integrand lie inside a given contour.
- I can apply the generalized formula to compute higher derivatives via a contour integral.
- I can sketch the proof idea (shrinking to a small circle around $z_0$).
