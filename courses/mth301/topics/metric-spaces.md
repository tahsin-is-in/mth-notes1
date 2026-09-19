## Why this topic matters

Every notion in analysis — convergence, continuity, compactness — is secretly built from one idea: distance. A metric space isolates exactly the properties of "distance" that make analysis work, so the same theorems apply to $\mathbb{R}^n$, function spaces, sequence spaces, and beyond.

## Prerequisites

- Absolute value and the triangle inequality on $\mathbb{R}$
- Basic set notation

:::eli5
Forget numbers for a second. A metric space is just "a set of points, plus a ruler that tells you how far apart any two points are" — as long as that ruler behaves sensibly: distance is never negative, the distance from A to B is the same as from B to A, and going directly is never longer than going via a detour (the triangle inequality). That's it. Once you have a sensible ruler, you can ask "did this sequence of points get closer and closer to some target?" even if the "points" are functions, matrices, or anything else.
:::

## Formal definition

:::formal Metric Space
Let $X$ be a non-empty set. A function $d: X\times X \to \mathbb R$ is a **metric** if for all $x,y,z\in X$:
1. $d(x,y)\ge 0$, and $d(x,y)=0 \iff x=y$
2. $d(x,y) = d(y,x)$ (symmetry)
3. $d(x,z) \le d(x,y)+d(y,z)$ (triangle inequality)

$(X,d)$ is then called a **metric space**.
:::

:::theorem Reverse Triangle Inequality
For any $x,y,z \in X$, $|d(x,z) - d(y,z)| \le d(x,y)$.
:::

:::proof
By the triangle inequality, $d(x,z)\le d(x,y)+d(y,z)$, so $d(x,z)-d(y,z)\le d(x,y)$. Swapping the roles of $x,y$ gives $d(y,z)-d(x,z)\le d(x,y)$. Combining both bounds gives $|d(x,z)-d(y,z)|\le d(x,y)$. $\blacksquare$
:::

## Worked examples

:::example Easy
$(\mathbb R, d)$ with $d(x,y)=|x-y|$ is a metric space — this is the metric every other example is compared to.
:::

:::example Standard university level
The **discrete metric** on any set $X$: $d(x,y)=0$ if $x=y$, else $d(x,y)=1$. Every subset is both open and closed here — a useful "extreme case" for testing whether a claimed theorem needs more than just "some metric."
:::

:::example Exam level
On $l^2 = \left\{(x_n): \sum x_n^2 < \infty\right\}$, define $d(x,y) = \left(\sum_{n=1}^\infty (x_n-y_n)^2\right)^{1/2}$. Showing this is well-defined and satisfies the triangle inequality uses the Cauchy\u2013Schwarz inequality — a standard "show this is a metric" exam question (see Past Questions below).
:::

:::example Difficult
On $C[a,b]$ (continuous functions on $[a,b]$), $d(f,g)=\sup_{x\in[a,b]}|f(x)-g(x)|$ is a metric (the **sup metric**). Convergence in this metric is *exactly* uniform convergence of functions — the link between this topic and Uniform Convergence.
:::

:::counterexample
**Statement that looks true:** "Any function $d(x,y)\ge 0$ with $d(x,x)=0$ is a metric."

**Counterexample:** on $\mathbb R$, let $d(x,y)=(x-y)^2$. This is non-negative and zero exactly on the diagonal, but the triangle inequality fails: with $x=0,y=1,z=2$, $d(x,z)=4$ but $d(x,y)+d(y,z)=1+1=2 < 4$.

**Why it fails:** squaring the distance breaks the triangle inequality because it grows too fast — this is why $d'=\sqrt{d}$-type constructions need care, and why "looks like a distance" is not the same as "is a metric."
:::

## Common mistakes

:::mistake
Forgetting to check $d(x,y)=0 \implies x=y$ (not just the converse). A function like $d(x,y)=0$ for all $x,y$ satisfies symmetry and the triangle inequality trivially but fails this direction, and is not a metric on a set with more than one point.
:::

## Connections to other topics

:::connection
Open/closed sets, closure, and continuity (later topics in this chapter and in MTH305 Topology) are all defined purely in terms of the metric $d$ — a metric space is the concrete "training wheels" version of a topological space.
:::

## Applications

:::application
Any normed vector space $(V, \|\cdot\|)$ automatically becomes a metric space via $d(x,y)=\|x-y\|$ — this is how metric-space theorems apply directly to $\mathbb R^n$, matrix spaces, and function spaces used throughout numerical analysis and stochastic calculus.
:::

## Exam-ready answer

:::examready
A metric space is a set $X$ with a distance function $d$ satisfying positivity/identity of indiscernibles, symmetry, and the triangle inequality. To show a given $d$ is a metric, check all three axioms explicitly — the triangle inequality is almost always the one requiring real work (often via Cauchy\u2013Schwarz or Minkowski's inequality for function/sequence spaces).
:::

## Viva preparation

:::viva
**Q: Is every norm a metric?**
Every norm induces a metric via $d(x,y)=\|x-y\|$, but not every metric comes from a norm (a metric space need not even be a vector space).

**Q: Why is the discrete metric useful pedagogically?**
It's a cheap way to test whether a proposed theorem secretly needs more structure than "any metric space" — in the discrete metric every set is open, so any theorem that fails there needs an extra hypothesis (completeness, connectedness, etc.).

**Common examiner trap:** asking you to verify the triangle inequality for $d(x,y)=|x-y|/(1+|x-y|)$ — algebra gets messy; the clean approach is to show $t\mapsto t/(1+t)$ is increasing and subadditive.
:::

## Practice questions

:::example Practice — Level 2 (Understanding)
Show that $d(x,y) = \dfrac{|x-y|}{1+|x-y|}$ defines a metric on $\mathbb R$.
:::

:::example Practice — Level 4 (Exam)
Show $d^*(x,y) = \max_{1\le i \le n}|x_i - y_i|$ is a metric on $\mathbb R^n$, and that $d^*(x,y) \le d(x,y) \le \sqrt n\, d^*(x,y)$ where $d$ is the Euclidean metric.
:::

## Topic mastery checklist

- I can state all three metric axioms without looking them up.
- I can verify the triangle inequality for a new candidate metric.
- I can name at least three genuinely different examples of metric spaces.
- I understand why $d(x,y)=(x-y)^2$ fails to be a metric.
