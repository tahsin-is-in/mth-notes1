## 4.1 From sequences to series

A series of functions $\sum_{n=1}^{\infty} f_n(x)$ **converges uniformly** on $S$ if its sequence of partial sums $S_N(x) = \sum_{n=1}^N f_n(x)$ converges uniformly on $S$. Everything from Lecture 3 — continuity of the limit, the Cauchy criterion — carries straight over.

## 4.2 The Weierstrass M-test

:::theorem Weierstrass M-test
Suppose $|f_n(x)| \leq M_n$ for all $x \in S$, where $\sum M_n$ converges. Then $\sum f_n(x)$ converges **uniformly** (and absolutely) on $S$.
:::

**Proof.** By the Cauchy criterion, for $m > n$,
$$
\Big|\sum_{k=n+1}^{m} f_k(x)\Big| \leq \sum_{k=n+1}^{m} |f_k(x)| \leq \sum_{k=n+1}^{m} M_k.
$$
Since $\sum M_n$ converges, its tail sums $\to 0$, so the right side can be made $< \varepsilon$ for all $m, n \geq N$, uniformly in $x$. $\blacksquare$

:::example Applying the M-test
Consider $\sum_{n=1}^{\infty} \dfrac{\cos(nx)}{n^2}$ on $\mathbb{R}$. Since $\left|\dfrac{\cos(nx)}{n^2}\right| \leq \dfrac{1}{n^2}$ and $\sum \dfrac{1}{n^2}$ converges, the M-test gives uniform convergence on all of $\mathbb{R}$ — with almost no work.
:::

## 4.3 Why uniform convergence matters here

:::theorem Term-by-term Integration
If $f_n \to f$ uniformly on $[a, b]$ and each $f_n$ is continuous, then
$$
\int_a^b f(x)\,dx = \lim_{n \to \infty} \int_a^b f_n(x)\,dx.
$$
:::

Pointwise convergence alone is **not** enough for this to hold — it is possible to construct a pointwise-convergent sequence of continuous functions whose integrals do not converge to the integral of the limit. Uniform convergence is precisely the extra ingredient that lets you swap $\lim$ and $\int$.

:::important Exam tip
When asked to justify swapping a limit with an integral, derivative, or sum, examiners are almost always testing whether you remember that **pointwise convergence is not sufficient** — uniform convergence (often via the M-test) is the tool that makes it legal.
:::

## Course recap

Across these four lectures: metric spaces gave us a general notion of distance; completeness told us which spaces have "no holes"; uniform convergence told us which limits of functions preserve continuity; and the M-test gave a practical way to establish it. This chain of ideas is the backbone of the rest of the course.
