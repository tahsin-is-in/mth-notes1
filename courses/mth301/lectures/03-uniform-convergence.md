## 3.1 Pointwise convergence isn't enough

A sequence of functions $f_n : [a,b] \to \mathbb{R}$ **converges pointwise** to $f$ if $f_n(x) \to f(x)$ for every fixed $x$. This sounds like the natural generalisation of convergence, but it is dangerously weak.

:::example Pointwise limit of continuous functions need not be continuous
Let $f_n(x) = x^n$ on $[0, 1]$. For each fixed $x$,
$$
f_n(x) \to f(x) = \begin{cases} 0 & 0 \leq x < 1 \\ 1 & x = 1 \end{cases}
$$
Every $f_n$ is continuous, but the pointwise limit $f$ is **not**. Something essential was lost in the limit.
:::

## 3.2 Uniform convergence

:::definition Uniform Convergence
$f_n \to f$ **uniformly** on a set $S$ if
$$
\forall \varepsilon > 0,\ \exists N \in \mathbb{N} \text{ such that } n \geq N \implies \sup_{x \in S} |f_n(x) - f(x)| < \varepsilon.
$$
:::

The crucial difference from pointwise convergence: $N$ works for **every** $x \in S$ at once. Geometrically, the entire graph of $f_n$ eventually sits inside an $\varepsilon$-tube around the graph of $f$.

:::theorem Uniform Limit Theorem
If $f_n \to f$ uniformly on $S$ and each $f_n$ is continuous on $S$, then $f$ is continuous on $S$.
:::

**Proof sketch.** Fix $x_0 \in S$ and $\varepsilon > 0$. Choose $n$ large enough that $|f_n(x) - f(x)| < \varepsilon/3$ for all $x \in S$ (uniform convergence). Since $f_n$ is continuous at $x_0$, choose $\delta > 0$ so that $|x - x_0| < \delta \implies |f_n(x) - f_n(x_0)| < \varepsilon/3$. Then for $|x - x_0| < \delta$,
$$
|f(x) - f(x_0)| \leq |f(x) - f_n(x)| + |f_n(x) - f_n(x_0)| + |f_n(x_0) - f(x_0)| < \varepsilon.
$$
$\blacksquare$

This is the theorem that explains the example above: $x^n \to f$ only pointwise, never uniformly, on $[0,1]$ — which is exactly why continuity was allowed to fail in the limit.

:::important Exam tip
To prove a sequence does **not** converge uniformly, it is often enough to find a single sequence $x_n \in S$ with $|f_n(x_n) - f(x_n)| \not\to 0$. You almost never need the full negation of the $\varepsilon$–$N$ definition written out.
:::

## 3.3 A useful test

The **Cauchy criterion for uniform convergence**: $(f_n)$ converges uniformly on $S$ if and only if
$$
\forall \varepsilon > 0,\ \exists N \text{ such that } m, n \geq N \implies \sup_{x \in S} |f_m(x) - f_n(x)| < \varepsilon.
$$

This is simply the completeness of $(C(S), d_{\sup})$ from Lecture 2, applied to the sequence $(f_n)$ — everything in this course keeps coming back to that one completeness theorem.

## Next up

Lecture 4 extends this to **series** of functions, $\sum f_n(x)$, and gives the single most useful practical tool for proving uniform convergence: the Weierstrass M-test.
