## 2.1 Cauchy's Theorem

:::theorem Cauchy's Theorem
If $f$ is analytic on and inside a simple closed contour $C$, then
$$
\oint_C f(z)\, dz = 0.
$$
:::

This single fact is why contour integration is so powerful — the value of the integral depends only on the singularities enclosed, never on the exact shape of the path.

## 2.2 Cauchy's Integral Formula

:::theorem Cauchy's Integral Formula
Let $f$ be analytic on and inside a simple closed contour $C$, and let $z_0$ lie inside $C$. Then
$$
f(z_0) = \frac{1}{2\pi i} \oint_C \frac{f(z)}{z - z_0}\, dz.
$$
:::

Read carefully: this says the value of $f$ at an **interior** point is completely determined by the values of $f$ **on the boundary**. There is nothing like this for real-differentiable functions — it is a phenomenon unique to complex analysis, and it is the reason analytic functions are so rigid.

:::example Direct application
Evaluate $\displaystyle\oint_{|z|=2} \frac{e^z}{z - 1}\, dz$.

Here $f(z) = e^z$ is analytic everywhere, and $z_0 = 1$ lies inside $|z| = 2$. By Cauchy's Integral Formula,
$$
\oint_{|z|=2} \frac{e^z}{z-1}\, dz = 2\pi i \cdot f(1) = 2\pi i\, e.
$$
:::

## 2.3 The generalised formula and residues

Differentiating the integral formula under the integral sign gives derivatives of all orders for free:
$$
f^{(n)}(z_0) = \frac{n!}{2\pi i} \oint_C \frac{f(z)}{(z - z_0)^{n+1}}\, dz.
$$

This is the fact behind the **residue theorem**: if $f$ has an isolated singularity at $z_0$, the coefficient of $(z - z_0)^{-1}$ in its Laurent series — the **residue** — captures exactly the contribution of that singularity to any contour integral around it.

:::important Exam tip
Before reaching for residues, always check first whether the integrand is simply analytic everywhere inside the contour — in that case Cauchy's Theorem gives zero immediately, with no computation at all.
:::

## 2.4 A structural consequence

Because $f^{(n)}(z_0)$ exists for every $n$, **every analytic function is infinitely differentiable**, and in fact equals its own Taylor series near any point of analyticity. Contrast this with real analysis, where infinite differentiability does not even imply a convergent Taylor series, let alone one that reproduces the function.
