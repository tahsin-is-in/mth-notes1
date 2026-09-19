## Why this topic matters

Brownian motion is the canonical continuous-time random process — the "$e^x$" of stochastic calculus. Every stochastic differential equation in this course is built by driving an ordinary differential equation with Brownian motion instead of a deterministic input.

## Prerequisites

- Sigma-algebras and filtration
- Normal distribution basics

:::eli5
Picture a particle in water getting knocked around by countless tiny collisions with molecules. Zoom out far enough, and this jittery path looks like a continuous but *infinitely jagged* curve — never smooth, no matter how much you zoom in. Brownian motion is the mathematical idealisation of that path: it starts at $0$, its future increments don't care about its past path (only its current position), and the size of its wiggle over a time interval of length $t$ scales like $\sqrt t$, not $t$.
:::

## Formal definition

:::formal Standard Brownian Motion
A process $\{B(t)\}_{t\ge0}$ is a (standard) **Brownian motion** if:
1. $B(0)=0$
2. It has **independent increments**: for $0\le t_1<t_2<\cdots<t_n$, the increments $B(t_2)-B(t_1),\dots,B(t_n)-B(t_{n-1})$ are independent
3. For $s<t$, $B(t)-B(s) \sim N(0, t-s)$ (normally distributed with mean 0, variance $t-s$)
4. Sample paths are continuous in $t$ (almost surely)
:::

:::theorem Brownian Motion as a Scaling Limit of Random Walks
Let $X_1,X_2,\dots$ be i.i.d. with $P(X_i=\pm1)=\tfrac12$, and define the random walk $S_n=\sum_{i=1}^n X_i$. Define the rescaled process $W_n(t) = \dfrac{1}{\sqrt n}S_{\lfloor nt\rfloor}$. Then $W_n(t) \to B(t)$ in distribution as $n\to\infty$, where $B$ is standard Brownian motion.
:::

**Intuition for the $\sqrt n$ scaling:** $S_n$ has variance $n$ (sum of $n$ independent $\pm1$ steps), so dividing by $\sqrt n$ normalizes the variance of $W_n(1)$ to exactly $1$ — matching $\operatorname{Var}(B(1))=1$ required by the definition.

:::theorem Basic Moments and Covariance
$\mathbb E[B(t)]=0$, $\operatorname{Var}(B(t))=t$, and for $s<t$, $\operatorname{Cov}(B(s),B(t))=s$.
:::

:::proof
$\operatorname{Cov}(B(s),B(t)) = \mathbb E[B(s)B(t)]$. Write $B(t)=B(s)+(B(t)-B(s))$, so
$$
\mathbb E[B(s)B(t)] = \mathbb E[B(s)^2] + \mathbb E[B(s)(B(t)-B(s))].
$$
Since $B(s)$ and the increment $B(t)-B(s)$ are independent (property 2) and both have mean $0$, the second term is $\mathbb E[B(s)]\cdot\mathbb E[B(t)-B(s)] = 0$. The first term is $\operatorname{Var}(B(s)) = s$ (property 3 with the interval $[0,s]$). So $\operatorname{Cov}(B(s),B(t))=s$ for $s<t$. $\blacksquare$
:::

## Worked examples

:::example Easy
Find $P(B(4) > 2)$. Since $B(4)\sim N(0,4)$, standardize: $P(B(4)>2) = P\left(Z > \dfrac{2}{2}\right) = P(Z>1) \approx 0.159$.
:::

:::example Standard university level
Show $\Delta B := B(t+\Delta t)-B(t)$ has the same distribution as $\sqrt{\Delta t}\cdot Z$ where $Z\sim N(0,1)$. By property 3, $\Delta B \sim N(0,\Delta t)$; writing $\Delta B = \sqrt{\Delta t}\, Z$ with $Z\sim N(0,1)$ reproduces mean $0$ and variance $\Delta t \cdot 1 = \Delta t$ — matching exactly.
:::

:::example Exam level
Show $\mathbb E[(\Delta B)^2] = \Delta t$, and explain why this is *not* true for an ordinary (non-random) smooth function. Since $\Delta B\sim N(0,\Delta t)$, $\mathbb E[(\Delta B)^2] = \operatorname{Var}(\Delta B) = \Delta t$. For a smooth deterministic function $f$, $(\Delta f)^2 = O((\Delta t)^2)$, which vanishes faster than $\Delta t$ as $\Delta t \to 0$ — Brownian motion's increments are "large" in a mean-square sense precisely because its paths are nowhere differentiable, unlike smooth functions.
:::

:::example Difficult
Show that the quadratic variation of Brownian motion over $[0,T]$, defined as $Q_n = \sum_{k=0}^{n-1}\left[B(t_{k+1})-B(t_k)\right]^2$ for a partition with mesh $\to0$, converges to $T$ (not $0$) as $n\to\infty$. Sketch: each term has $\mathbb E[(\Delta B_k)^2]=\Delta t_k$, so $\mathbb E[Q_n] = \sum \Delta t_k = T$ exactly, for every partition. One shows $\operatorname{Var}(Q_n)\to0$ as the mesh shrinks (using independence of increments and finite fourth moments of the normal distribution), so $Q_n \to T$ in probability (and in $L^2$) — quite unlike a smooth curve, whose quadratic variation is always $0$.
:::

:::counterexample
**Statement that looks true:** "Since Brownian motion has continuous paths, it should be differentiable almost everywhere, like most continuous functions encountered in calculus."

**Counterexample:** Brownian motion is, with probability 1, **nowhere differentiable** — despite being continuous everywhere. Heuristically, $\dfrac{B(t+h)-B(t)}{h}$ has standard deviation $\dfrac{\sqrt h}{h} = \dfrac{1}{\sqrt h} \to \infty$ as $h\to0$, so the difference quotient does not settle down to any finite limit.

**Why it fails:** ordinary calculus intuition (continuous $\Rightarrow$ mostly differentiable, as for typical continuous functions built from elementary functions) simply does not transfer to Brownian motion — its quadratic variation being *positive* ($=t$, not $0$) is the direct mathematical reason ordinary calculus (which relies on quadratic variation being negligible) cannot be applied to it, and is exactly why Itô calculus (the next topic) needs to be built from scratch.
:::

## Common mistakes

:::mistake
Treating $dB$ like an ordinary infinitesimal (i.e. assuming $(dB)^2$ is negligible, as it would be for $dt$). In Itô calculus, the rule is $(dB)^2 = dt$ — this single substitution, not $0$, is the source of every "extra" term in Itô's formula compared to ordinary calculus.
:::

:::mistake
Computing $\operatorname{Var}(B(t+u)-B(t))$ by adding variances incorrectly when the two times overlap with earlier ones — always isolate genuinely independent increments before adding variances.
:::

## Connections to other topics

:::connection
The fact that quadratic variation of $B$ is $t$ (not $0$) is exactly why the Itô integral (MTH309-CH03) needs a new definition distinct from the Riemann–Stieltjes integral — ordinary calculus assumes vanishing quadratic variation, which Brownian motion violates.
:::

## Applications

:::application
**Finance:** geometric Brownian motion, $S(t)=S(0)\exp\{(\mu-\sigma^2/2)t+\sigma B(t)\}$, is the driving model behind the Black–Scholes option pricing formula.
:::

## Exam-ready answer

:::examready
Brownian motion $B(t)$: starts at 0, has independent normally-distributed increments $B(t)-B(s)\sim N(0,t-s)$, and continuous (but nowhere differentiable) paths. $\mathbb E[B(t)]=0$, $\operatorname{Var}(B(t))=t$, $\operatorname{Cov}(B(s),B(t))=\min(s,t)$. It arises as the scaling limit ($1/\sqrt n$ scaling) of a simple symmetric random walk. Its defining calculus fact: quadratic variation over $[0,T]$ equals $T$, not $0$ — the reason Itô calculus exists.
:::

## Viva preparation

:::viva
**Q: Why is Brownian motion scaled by $1/\sqrt n$ rather than $1/n$?**
Because the random walk $S_n$ has variance $n$; dividing by $\sqrt n$ (not $n$) normalizes the variance to $1$, matching the target Brownian motion's unit-time variance.

**Q: Is Brownian motion differentiable?**
No — almost surely nowhere differentiable, despite being continuous everywhere.

**Follow-up:** what single fact about Brownian motion forces the existence of Itô calculus as opposed to ordinary calculus?
Its quadratic variation is positive ($=t$ over $[0,t]$) rather than zero, so the usual Riemann–Stieltjes integration theory (which relies on vanishing quadratic variation of the integrator) breaks down.
:::

## Practice questions

:::example Practice — Level 2 (Understanding)
Find $\operatorname{Var}[B(t+u)-B(t)]$ for $u>0$, and confirm it does not depend on $t$.
:::

:::example Practice — Level 4 (Exam)
For $X(t) = \sqrt{\gamma}\,B(t/\gamma)$ ($\gamma>0$ constant), determine whether $X(t)$ is itself a standard Brownian motion by checking all four defining properties.
:::

## Topic mastery checklist

- I can state all four defining properties of standard Brownian motion.
- I can derive $\operatorname{Cov}(B(s),B(t))=\min(s,t)$ from the independent-increments property.
- I can explain, intuitively and via quadratic variation, why Brownian motion is nowhere differentiable.
- I can explain why $(dB)^2=dt$ is the key departure from ordinary calculus.
