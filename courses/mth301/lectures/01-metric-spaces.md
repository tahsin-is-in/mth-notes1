## 1.1 Why metric spaces?

In first-year analysis, every idea of distance, convergence, and continuity was borrowed from the absolute value $|x - y|$ on $\mathbb{R}$. A **metric space** takes exactly the properties of $|x-y|$ that make analysis work, and turns them into axioms — so the same theory applies to $\mathbb{R}^n$, spaces of functions, spaces of sequences, and much more.

:::definition Metric Space
Let $X$ be a non-empty set. A function $d : X \times X \to \mathbb{R}$ is called a **metric** on $X$ if, for all $x, y, z \in X$:

1. $d(x, y) \geq 0$, and $d(x, y) = 0 \iff x = y$ (positivity)
2. $d(x, y) = d(y, x)$ (symmetry)
3. $d(x, z) \leq d(x, y) + d(y, z)$ (triangle inequality)

The pair $(X, d)$ is called a **metric space**.
:::

The triangle inequality is the axiom that does the real work — it is what lets us chain estimates together, which is the single most common move in analysis.

## 1.2 First examples

:::example Standard examples
* $\mathbb{R}$ with $d(x, y) = |x - y|$.
* $\mathbb{R}^n$ with the Euclidean metric $d(x, y) = \sqrt{\sum_{i=1}^n (x_i - y_i)^2}$.
* Any set $X$ with the **discrete metric**:
$$
d(x, y) = \begin{cases} 0 & x = y \\ 1 & x \neq y \end{cases}
$$
* $C[a, b]$, the space of continuous functions on $[a, b]$, with the **sup metric**:
$$
d(f, g) = \sup_{x \in [a, b]} |f(x) - g(x)|
$$
:::

The last example is the one to watch closely this semester — it is the bridge between "analysis on numbers" and "analysis on functions," and it is exactly the setting in which uniform convergence (Lecture 3) becomes a statement about distance.

## 1.3 Open balls and open sets

:::definition Open Ball
For $x_0 \in X$ and $r > 0$, the **open ball** of radius $r$ centred at $x_0$ is
$$
B(x_0, r) = \{ x \in X : d(x, x_0) < r \}.
$$
:::

A subset $U \subseteq X$ is **open** if every point of $U$ has some open ball around it that is entirely contained in $U$. This single definition — built purely from the metric — is what lets us later define continuity, convergence, and compactness without ever mentioning $\mathbb{R}$ explicitly.

:::theorem Convergence in a Metric Space
A sequence $(x_n)$ in $(X, d)$ **converges** to $x \in X$ if
$$
\forall \varepsilon > 0,\ \exists N \in \mathbb{N} \text{ such that } n \geq N \implies d(x_n, x) < \varepsilon.
$$
Equivalently, $d(x_n, x) \to 0$ as $n \to \infty$.
:::

:::important Exam tip
Whenever a question gives you an unfamiliar metric, go back to the three axioms and check them directly before doing anything else — most "show that $d$ is a metric" problems are really just a triangle-inequality computation in disguise.
:::

## 1.4 A worked example

**Problem.** Show that the discrete metric really is a metric.

**Solution.** Positivity and symmetry are immediate from the definition. For the triangle inequality, take any $x, y, z \in X$.

- If $x = z$, then $d(x, z) = 0 \leq d(x, y) + d(y, z)$ trivially.
- If $x \neq z$, then $d(x, z) = 1$. Since $x \neq z$, at least one of $x \neq y$ or $y \neq z$ must hold (otherwise $x = y = z$), so $d(x,y) + d(y,z) \geq 1$.

In both cases the triangle inequality holds, so $d$ is a metric. $\blacksquare$

## Next up

Lecture 2 asks the natural follow-up question: when does a Cauchy sequence in $(X, d)$ actually converge? That property — **completeness** — turns out to be exactly what makes a metric space "nice enough" to build a real analysis on.
