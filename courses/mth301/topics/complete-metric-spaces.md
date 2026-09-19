## Why this topic matters

A sequence can look like it's converging — its terms bunching closer together — without an actual limit existing in the space. Completeness is the property that rules this out, and it is the single hypothesis behind fixed-point theorems, existence proofs for differential equations, and the fact that $C[a,b]$ is a well-behaved space to do analysis in.

## Prerequisites

- Metric spaces
- Convergent sequences

:::eli5
Imagine walking toward a wall that isn't actually there — every step gets you closer to "somewhere," your steps shrink and shrink, but there's a hole in the floor exactly where you were heading, so you never arrive. A space is **incomplete** if this can happen; it's **complete** if every such "obviously-heading-somewhere" sequence (a Cauchy sequence) really does have somewhere to land, inside the space itself.
:::

## Formal definition

:::formal Cauchy Sequence and Completeness
A sequence $(x_n)$ in $(X,d)$ is **Cauchy** if $\forall \varepsilon>0,\ \exists N$ such that $m,n\ge N \implies d(x_m,x_n)<\varepsilon$.

$(X,d)$ is **complete** if every Cauchy sequence in $X$ converges to a point of $X$.
:::

:::theorem Convergent Implies Cauchy
Every convergent sequence in a metric space is Cauchy.
:::

:::proof
Suppose $x_n \to x$. Given $\varepsilon>0$, pick $N$ with $d(x_n,x)<\varepsilon/2$ for $n\ge N$. Then for $m,n\ge N$,
$$
d(x_m,x_n) \le d(x_m,x) + d(x,x_n) < \frac{\varepsilon}{2}+\frac{\varepsilon}{2} = \varepsilon. \qquad\blacksquare
$$
:::

The converse — Cauchy implies convergent — is exactly what completeness asserts, and it is **not** automatic, which is why it needs its own name and its own hypothesis in theorems.

:::theorem Banach Fixed-Point Theorem (Contraction Mapping Theorem)
If $(X,d)$ is a non-empty **complete** metric space and $T:X\to X$ satisfies $d(Tx,Ty)\le k\,d(x,y)$ for some fixed $k\in[0,1)$ and all $x,y\in X$, then $T$ has a unique fixed point in $X$.
:::

**Conditions and what fails without them:** completeness of $X$ is essential — on $X=(0,1)$ (incomplete), $T(x)=x/2$ is a contraction with no fixed point in $X$ (the "fixed point" $0$ is missing from the space).

## Worked examples

:::example Easy
$(\mathbb R, |\cdot|)$ is complete — this is essentially the least-upper-bound property of $\mathbb R$ in disguise.
:::

:::example Standard university level
$(\mathbb Q, |\cdot|)$ is **not** complete: the truncations of $\sqrt2$ — $1,\,1.4,\,1.41,\,1.414,\dots$ — form a Cauchy sequence in $\mathbb Q$ with no rational limit.
:::

:::example Exam level
$C[a,b]$ with the sup metric is complete. Sketch: a Cauchy sequence $(f_n)$ in the sup metric is, at each fixed $x$, a Cauchy sequence of real numbers, hence convergent to some $f(x)$; the Cauchy condition in the sup metric upgrades this pointwise convergence to *uniform* convergence, and a uniform limit of continuous functions is continuous (Uniform Convergence, MTH301-CH01), so $f\in C[a,b]$.
:::

:::example Difficult
Show $f(x) = \cos x$ has a unique fixed point in $\mathbb R$ using the Banach Fixed-Point Theorem on a suitable complete interval, given $|f'(x)|=|\sin x|\le \sin(1) < 1$ is not globally true on all of $\mathbb R$ — so restrict to $[0,1]$ (which $f$ maps into itself since $\cos(0)=1,\cos(1)\approx0.54\in[0,1]$) and use the Mean Value Theorem to bound $|\cos x - \cos y| \le \sin(1)\,|x-y|$ there. Since $\sin(1) \approx 0.841 < 1$ and $[0,1]$ (with the usual metric) is complete, the theorem applies.
:::

:::counterexample
**Statement that looks true:** "A contraction mapping on any metric space has a unique fixed point."

**Counterexample:** $T(x) = x/2$ on $X = (0,1]$ (with $d(x,y)=|x-y|$) satisfies $|Tx-Ty| = \tfrac12|x-y|$, a genuine contraction, yet has no fixed point in $X$ (the only candidate, $x=0$, is missing from the space).

**Why it fails:** $(0,1]$ is not complete — the "limit" the contraction is dragging every sequence toward lies outside the space.
:::

## Common mistakes

:::mistake
Confusing "bounded" with "complete." A bounded set need not be complete — $(0,1)$ is bounded but incomplete. Completeness is about limits existing *in the space*, not about the space's size.
:::

:::mistake
Trying to prove completeness of $C[a,b]$ by checking pointwise convergence alone. The whole subtlety is upgrading pointwise convergence (from the Cauchy condition at each fixed $x$) to *uniform* convergence — skipping that step is the most common gap in this proof.
:::

## Connections to other topics

:::connection
Completeness is the metric-space ingredient every existence theorem in this course leans on: the Picard–Lindelöf existence theorem for ODEs (MTH303) is literally an application of the Banach Fixed-Point Theorem on a complete function space.
:::

## Exam-ready answer

:::examready
$(X,d)$ is complete if every Cauchy sequence converges in $X$. Standard method to show completeness: take an arbitrary Cauchy sequence, construct a candidate limit (often coordinate-wise or pointwise), then show convergence to that candidate is in the required sense (often upgrading pointwise to uniform via the Cauchy estimate). Standard method to show incompleteness: exhibit one explicit Cauchy sequence with no limit in the space.
:::

## Viva preparation

:::viva
**Q: Is $\mathbb Q$ complete?**
No — Cauchy sequences of rationals can converge to irrationals, which lie outside $\mathbb Q$.

**Q: Why does the Banach Fixed-Point Theorem need completeness?**
Because the proof constructs the fixed point *as the limit* of the Cauchy sequence $x_0, Tx_0, T^2x_0,\dots$ — without completeness, that limit might not exist in the space at all.

**Follow-up:** Is completeness a property of the set, or of the metric?
Of the metric (equivalently, of the pair $(X,d)$) — the same set can be complete under one metric and incomplete under another.
:::

## Practice questions

:::example Practice — Level 3 (Standard)
Show that $(0,\infty)$ with $d(x,y)=|x-y|$ is not complete, but $([1,\infty), |\cdot|)$ is.
:::

:::example Practice — Level 5 (Difficult / proof)
Prove that a closed subset of a complete metric space is itself complete (with the inherited metric).
:::

## Topic mastery checklist

- I can state the definition of a Cauchy sequence and of completeness precisely.
- I can prove "convergent implies Cauchy" unaided.
- I can produce the standard incompleteness example for $\mathbb Q$.
- I can state the Banach Fixed-Point Theorem and explain why completeness is essential to it.
