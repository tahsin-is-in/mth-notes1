## Why this topic matters

Almost every "can I swap a limit with an integral / derivative / sum" question in analysis has the same one-word answer buried in it: **uniformly**. Pointwise convergence is too weak to protect continuity, integrals, or derivatives from breaking in the limit. Uniform convergence is the exact extra condition that makes limits of functions behave.

## Prerequisites

- Pointwise convergence of a sequence of functions
- $\varepsilon$–$N$ definitions of convergence for sequences of numbers
- Continuity of a real function

:::eli5
Picture a sequence of functions as a sequence of *wobbly rubber bands* drawn above the x-axis. **Pointwise convergence** only promises that at every single x-value, if you wait long enough, the band gets close to the target curve at *that* x — but "long enough" is allowed to be a different amount of waiting for every x. **Uniform convergence** promises something much stronger: there's a single point in the sequence after which *the entire band*, top to bottom across the whole domain, is squeezed into a thin tube around the target curve. Nothing lags behind.
:::

## Formal definition

:::formal Pointwise Convergence
A sequence of functions $f_n : S \to \mathbb{R}$ converges **pointwise** to $f : S \to \mathbb{R}$ if for every $x \in S$,
$$
\lim_{n\to\infty} f_n(x) = f(x),
$$
i.e. for every $x \in S$ and every $\varepsilon > 0$ there exists $N$ (which may depend on both $x$ **and** $\varepsilon$) such that $n \geq N \implies |f_n(x) - f(x)| < \varepsilon$.
:::

:::definition Uniform Convergence
$f_n \to f$ **uniformly** on $S$ if
$$
\forall \varepsilon > 0,\ \exists N \in \mathbb{N} \text{ (depending only on } \varepsilon \text{) such that } n \geq N \implies \sup_{x \in S} |f_n(x) - f(x)| < \varepsilon.
$$
:::

The single change — $N$ no longer depends on $x$ — is the entire difference, and it is the reason uniform convergence is strictly stronger.

:::connection
Uniform convergence is exactly convergence in the **sup metric** $d(f,g) = \sup_{x\in S}|f(x)-g(x)|$ on the space of bounded functions on $S$. This links this topic directly to Metric Spaces (MTH301-CH02) — "uniformly convergent" and "convergent in $(B(S), d_\sup)$" are the same statement in two languages.
:::

## Core theorems

:::theorem Uniform Limit Theorem
If $f_n \to f$ uniformly on $S$ and each $f_n$ is continuous on $S$, then $f$ is continuous on $S$.
:::

**Conditions, and what fails without them:**
- *Uniform* convergence is essential — drop it to only pointwise, and $f_n(x) = x^n$ on $[0,1]$ (each continuous) converges pointwise to a discontinuous limit. See the counterexample below.
- The domain $S$ plays no special role here (it need not be compact or even bounded) — this is purely a statement about the convergence mode.

:::proof
Fix $x_0 \in S$ and $\varepsilon > 0$. By uniform convergence, choose $n$ such that $\sup_{x\in S}|f_n(x)-f(x)| < \varepsilon/3$. Since $f_n$ is continuous at $x_0$, choose $\delta>0$ such that $|x-x_0|<\delta \implies |f_n(x)-f_n(x_0)|<\varepsilon/3$. Then for $|x-x_0|<\delta$,
$$
|f(x)-f(x_0)| \le |f(x)-f_n(x)| + |f_n(x)-f_n(x_0)| + |f_n(x_0)-f(x_0)| < \frac{\varepsilon}{3}+\frac{\varepsilon}{3}+\frac{\varepsilon}{3} = \varepsilon.
$$
Hence $f$ is continuous at $x_0$, and $x_0$ was arbitrary. $\blacksquare$
:::

*Intuition behind the proof:* we route the estimate through $f_n$ for one fixed, large $n$ — uniform convergence guarantees $f_n$ is uniformly close to $f$ everywhere, and continuity of that single $f_n$ handles the local wiggle near $x_0$. Three short hops, each controlled to $\varepsilon/3$.

:::theorem Cauchy Criterion for Uniform Convergence
$(f_n)$ converges uniformly on $S$ if and only if for every $\varepsilon>0$ there is $N$ such that $m,n\ge N \implies \sup_{x\in S}|f_m(x)-f_n(x)|<\varepsilon$.
:::

## Worked examples

:::example Easy
Let $f_n(x) = x/n$ on $S=[0,1]$. Then $f_n \to 0$ pointwise, and
$$\sup_{x\in[0,1]}|f_n(x)-0| = \sup_{x\in[0,1]}\frac{x}{n} = \frac{1}{n} \to 0,$$
so the convergence is uniform on $[0,1]$.
:::

:::example Standard university level
Let $f_n(x)=\dfrac{nx}{1+n^2x^2}$ on $S=[0,1]$. Pointwise, $f_n(x)\to 0$ for every fixed $x$ (check $x=0$ directly, and for $x>0$ the denominator dominates). But
$$
\sup_{x\in[0,1]} f_n(x) \ge f_n\!\left(\tfrac1n\right) = \frac{n\cdot \frac1n}{1+n^2\cdot\frac1{n^2}} = \frac12,
$$
which does **not** tend to $0$. So $f_n \to 0$ pointwise but **not** uniformly on $[0,1]$.
:::

:::example Exam level
Show $f_n(x) = \dfrac{\sin(nx)}{\sqrt n}$ converges uniformly to $0$ on $\mathbb{R}$.

Since $|\sin(nx)|\le 1$ for all $x$, $\sup_{x\in\mathbb R}|f_n(x)-0| \le \dfrac{1}{\sqrt n} \to 0$. This single bound (independent of $x$) is exactly what the definition asks for — uniform convergence follows immediately.
:::

:::example Difficult
Let $f_n(x) = n^2x(1-x^2)^n$ on $[0,1]$. Show $f_n\to 0$ pointwise but $\int_0^1 f_n(x)\,dx \not\to 0$, and use this to conclude the convergence cannot be uniform.

Pointwise: at $x=0$, $f_n(0)=0$. For $x\in(0,1]$, $(1-x^2)^n\to 0$ exponentially, which dominates the polynomial factor $n^2x$, so $f_n(x)\to 0$.

Now compute the integral by substitution $u=1-x^2$, $du=-2x\,dx$:
$$
\int_0^1 n^2 x(1-x^2)^n\,dx = \frac{n^2}{2}\int_0^1 u^n\,du = \frac{n^2}{2(n+1)} \to \infty.
$$
Since $\int_0^1 f_n \to \infty \ne 0 = \int_0^1 0\,dx$, the term-by-term integration theorem (which requires uniform convergence) must fail here — confirming $f_n \to 0$ is *not* uniform on $[0,1]$, without ever computing a sup directly.
:::

:::counterexample
**Statement that looks true:** "If $f_n \to f$ pointwise and every $f_n$ is continuous, then $f$ is continuous."

**Counterexample:** $f_n(x) = x^n$ on $[0,1]$. Each $f_n$ is continuous. Pointwise,
$$
f_n(x) \to f(x) = \begin{cases} 0 & 0\le x<1\\ 1 & x=1\end{cases}
$$
which is discontinuous at $x=1$.

**Why it fails:** the convergence is not uniform. Near $x=1$, no matter how large $n$ is, there are points $x$ slightly less than $1$ where $x^n$ is still far from $0$ (e.g. $x = (1/2)^{1/n} \to 1$ gives $f_n(x)=1/2$ for every $n$). So $\sup_{[0,1]}|f_n-f|=1$ for every $n$ — it never shrinks.
:::

## Common mistakes

:::mistake
Computing $\lim_{n\to\infty} f_n(x)$ for a few sample values of $x$ and concluding "it converges uniformly" — pointwise behavior at finitely many points says nothing about the *supremum* of the error. Always bound $\sup_x|f_n(x)-f(x)|$ as a function of $n$ alone.
:::

:::mistake
Assuming uniform convergence on a *smaller* set transfers to a *larger* one. $f_n(x)=x^n$ converges uniformly on $[0, 1-\delta]$ for any fixed $\delta>0$, but not on $[0,1]$ itself — the domain matters.
:::

## Applications

:::application
**Power series:** a power series converges uniformly on any closed subinterval strictly inside its interval of convergence, which is exactly why term-by-term differentiation/integration of power series is legitimate there.
:::

:::application
**Numerical approximation:** uniform convergence of an approximating sequence (e.g. Bernstein polynomials, Fourier partial sums under extra conditions) guarantees the approximation error is controlled *everywhere* on the domain simultaneously, not just at sampled points — the property numerical analysts actually need.
:::

## Exam-ready answer

:::examready
Uniform convergence of $f_n\to f$ on $S$ means $\sup_{x\in S}|f_n(x)-f(x)|\to 0$, i.e. one $N$ works for all $x$ simultaneously. It is strictly stronger than pointwise convergence. Its main payoff: it preserves continuity of the limit, permits interchange of $\lim$ with $\int$, and (with a uniform bound on derivatives) with $\dfrac{d}{dx}$. Standard tool to prove it: bound $\sup_x|f_n(x)-f(x)|$ directly, or use the Weierstrass M-test for series. Standard tool to disprove it: exhibit $x_n\in S$ (often depending on $n$) with $|f_n(x_n)-f(x_n)|\not\to 0$.
:::

## Viva preparation

:::viva
**Q: Is uniform convergence stronger or weaker than pointwise convergence?**
Stronger — uniform convergence always implies pointwise convergence, but not conversely.

**Q: Give one-line intuition for why uniform convergence preserves continuity.**
Because for large $n$, $f$ and $f_n$ are uniformly (everywhere) close, so any local wiggle-room argument that works for the single continuous function $f_n$ transfers to $f$ with only a small, uniform error added.

**Follow-up:** Does uniform convergence preserve differentiability of the limit?
No — not without an extra hypothesis (uniform convergence of the *derivatives* $f_n'$ as well). Uniform convergence of $f_n$ alone is not enough.

**Common examiner trap:** asking you to "prove" uniform convergence by checking convergence at $x=0$ and $x=1$ only. There is no shortcut around bounding the supremum over the *whole* domain.
:::

## Practice questions

:::example Practice — Level 1 (Basic)
Show $f_n(x) = \dfrac{1}{n}\cos(nx)$ converges uniformly to $0$ on $\mathbb R$.
:::

:::example Practice — Level 3 (Standard)
Determine whether $f_n(x) = \dfrac{x}{1+nx^2}$ converges uniformly on $[0,\infty)$.
:::

:::example Practice — Level 5 (Difficult / proof)
Prove that if $f_n\to f$ uniformly on $S$ and $g$ is uniformly continuous on the range of every $f_n$ and $f$, then $g\circ f_n \to g\circ f$ uniformly on $S$.
:::

## Topic mastery checklist

- I can state the $\varepsilon$–$N$ definition of uniform convergence precisely, including exactly where it differs from pointwise convergence.
- I can prove the Uniform Limit Theorem from scratch.
- I can produce the standard counterexample ($x^n$ on $[0,1]$) without looking it up.
- I can decide uniform vs. pointwise for a new sequence by bounding the supremum.
- I can explain, in one sentence, why uniform convergence lets you swap limits with integrals.
