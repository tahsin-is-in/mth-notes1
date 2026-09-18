## 2.1 Cauchy sequences

A sequence can "look like" it converges — its terms bunch closer and closer together — without a limit actually existing *inside the space*. That distinction motivates the next definition.

:::definition Cauchy Sequence
A sequence $(x_n)$ in a metric space $(X, d)$ is a **Cauchy sequence** if
$$
\forall \varepsilon > 0,\ \exists N \in \mathbb{N} \text{ such that } m, n \geq N \implies d(x_m, x_n) < \varepsilon.
$$
:::

:::theorem Convergent implies Cauchy
Every convergent sequence in a metric space is a Cauchy sequence.
:::

**Proof.** Suppose $x_n \to x$. Given $\varepsilon > 0$, choose $N$ so that $n \geq N \implies d(x_n, x) < \varepsilon / 2$. Then for $m, n \geq N$,
$$
d(x_m, x_n) \leq d(x_m, x) + d(x, x_n) < \frac{\varepsilon}{2} + \frac{\varepsilon}{2} = \varepsilon.
$$
So $(x_n)$ is Cauchy. $\blacksquare$

The converse is where things get interesting — it is *not* true in every metric space, and whether it holds is precisely the definition we want.

## 2.2 Completeness

:::definition Complete Metric Space
A metric space $(X, d)$ is **complete** if every Cauchy sequence in $X$ converges to a point of $X$.
:::

:::example A space that is not complete
Consider $\mathbb{Q}$ with $d(x, y) = |x - y|$. The sequence of rational truncations of $\sqrt 2$,
$$
1,\ 1.4,\ 1.41,\ 1.414,\ 1.4142,\ \dots
$$
is Cauchy in $\mathbb{Q}$, but its limit $\sqrt 2 \notin \mathbb{Q}$. So $\mathbb{Q}$ is **not** complete — the "hole" at $\sqrt 2$ is exactly what completeness rules out.
:::

## 2.3 R is complete

:::theorem Completeness of R
$(\mathbb{R}, |\cdot|)$ is a complete metric space.
:::

This is usually proved using the least upper bound property of $\mathbb{R}$: a Cauchy sequence is bounded, so by Bolzano–Weierstrass it has a convergent subsequence, and a Cauchy sequence with a convergent subsequence converges to the same limit.

:::theorem Bolzano\u2013Weierstrass Theorem
Every bounded sequence of real numbers has a convergent subsequence.
:::

## 2.4 Towards function spaces

The sup-metric space $C[a,b]$ from Lecture 1 is also complete — this fact has a name of its own (it makes $C[a,b]$ a **Banach space**) and is the reason uniform limits of continuous functions behave so well. We will prove it directly once uniform convergence is on the table in Lecture 3.

:::important Exam tip
"$\mathbb{Q}$ is not complete" is one of the most frequently tested facts in this course. Always exhibit an explicit Cauchy sequence with no rational limit — do not just assert it.
:::
