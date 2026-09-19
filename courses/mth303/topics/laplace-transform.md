## Why this topic matters

The Laplace transform turns differentiation into multiplication, converting an ODE with initial conditions directly into an algebraic equation — no separate step of solving for arbitrary constants is needed, which is exactly why it dominates engineering-style problems with discontinuous or impulsive forcing.

## Prerequisites

- Improper integrals
- Partial fractions

:::eli5
Think of the Laplace transform as translating a differential-equations problem into a different "language" (the $s$-language) where calculus becomes algebra. You translate the problem, solve simple algebra, then translate the answer back. The dictionary for translating back and forth is a table of standard transform pairs.
:::

## Formal definition

:::formal Laplace Transform
For $f(t)$ defined on $t\ge0$, $\mathcal L\{f(t)\}(s) = F(s) = \displaystyle\int_0^\infty e^{-st}f(t)\,dt$, wherever this integral converges.
:::

:::theorem Transform of Derivatives
$$
\mathcal L\{f'(t)\} = sF(s)-f(0), \qquad \mathcal L\{f''(t)\} = s^2F(s)-sf(0)-f'(0).
$$
:::

:::proof
Integrate by parts: $\mathcal L\{f'(t)\} = \int_0^\infty e^{-st}f'(t)\,dt = \left[e^{-st}f(t)\right]_0^\infty + s\int_0^\infty e^{-st}f(t)\,dt = -f(0) + sF(s)$, using $e^{-st}f(t)\to0$ as $t\to\infty$ (assuming $f$ has exponential order). Apply the same identity twice for $f''$. $\blacksquare$
:::

**Condition easy to miss:** the existence theorem for $\mathcal L\{f\}$ requires $f$ to be piecewise continuous and of **exponential order** (i.e. $|f(t)|\le Me^{at}$ for some constants) — without this, the defining integral may simply not converge for any $s$.

## Worked examples

:::example Easy
$\mathcal L\{e^{at}\} = \displaystyle\int_0^\infty e^{-st}e^{at}\,dt = \int_0^\infty e^{-(s-a)t}\,dt = \dfrac{1}{s-a}$ for $s>a$.
:::

:::example Standard university level
Solve $y''-3y'+2y=0$, $y(0)=1,y'(0)=0$. Transforming: $(s^2Y-s)-3(sY-1)+2Y=0 \implies Y(s)(s^2-3s+2)=s-3$. Partial fractions on $Y(s)=\dfrac{s-3}{(s-1)(s-2)} = \dfrac{2}{s-1}-\dfrac{1}{s-2}$ gives $y(t)=2e^t-e^{2t}$.
:::

:::example Exam level
Solve $y''-2y'+y=e^t$, $y(0)=0,y'(0)=1$, using the Laplace transform. Transforming: $(s^2Y-1)-2sY+Y = \dfrac{1}{s-1} \implies Y(s)(s-1)^2 = 1+\dfrac{1}{s-1} = \dfrac{s}{s-1}$, so $Y(s)=\dfrac{s}{(s-1)^3}$. Writing $s=(s-1)+1$: $Y(s)=\dfrac{1}{(s-1)^2}+\dfrac{1}{(s-1)^3}$, and inverting term by term (using $\mathcal L^{-1}\{1/(s-a)^n\}=t^{n-1}e^{at}/(n-1)!$) gives $y(t)=te^t+\dfrac{t^2}{2}e^t$.
:::

:::example Difficult
Solve $y''+4y=\delta(t-\pi)$, $y(0)=0,y'(0)=0$, where $\delta$ is the Dirac delta (unit impulse). Transforming (using $\mathcal L\{\delta(t-\pi)\}=e^{-\pi s}$): $Y(s)(s^2+4)=e^{-\pi s} \implies Y(s)=\dfrac{e^{-\pi s}}{s^2+4}$. Using the second shifting theorem with $\mathcal L^{-1}\{1/(s^2+4)\}=\tfrac12\sin(2t)$: $y(t)=\tfrac12\sin(2(t-\pi))\,u(t-\pi)$, where $u$ is the unit step — this is exactly the kind of discontinuous-forcing problem where the Laplace method dramatically outperforms classical methods.
:::

:::counterexample
**Statement that looks true:** "Every function $f(t)$ defined on $t\ge0$ has a Laplace transform."

**Counterexample:** $f(t) = e^{t^2}$ grows faster than any exponential $e^{at}$, so $\int_0^\infty e^{-st}e^{t^2}\,dt$ diverges for every value of $s$ — $f$ has no Laplace transform.

**Why it fails:** the existence theorem explicitly requires $f$ to be of exponential order; $e^{t^2}$ violates this, and no amount of choosing $s$ larger can fix a divergence that grows faster than any exponential decay $e^{-st}$ can counteract.
:::

## Common mistakes

:::mistake
Forgetting to include the initial-condition terms ($-f(0)$, $-sf(0)-f'(0)$, etc.) when transforming derivatives — this is the entire reason the method handles IVPs directly, and omitting them silently turns the problem into the wrong one.
:::

:::mistake
Sloppy partial fractions after transforming — since the whole payoff of the method is inverting $Y(s)$ term by term, an error here propagates directly into a wrong final answer even if the transform step was correct.
:::

## Applications

:::application
**Control systems and circuits:** the Laplace transform is the standard tool for analyzing linear systems with switches, impulses, or periodic forcing, because $\mathcal L\{\text{derivative}\}$ and $\mathcal L\{\text{convolution}\}$ turn differential/integral equations into rational functions of $s$ (transfer functions).
:::

## Exam-ready answer

:::examready
Three-stage method: (1) apply $\mathcal L$ to both sides, using $\mathcal L\{y'\}=sY-y(0)$, $\mathcal L\{y''\}=s^2Y-sy(0)-y'(0)$, to get an algebraic equation in $Y(s)$; (2) solve for $Y(s)$; (3) invert via partial fractions and a standard transform table. Initial conditions are built directly into step (1) — no separate step is needed to solve for arbitrary constants.
:::

## Viva preparation

:::viva
**Q: Why does the Laplace transform method avoid finding arbitrary constants separately?**
Because the initial conditions $y(0), y'(0)$ are plugged in during the transform of the derivatives themselves, so the algebraic equation for $Y(s)$ already encodes them.

**Q: What kind of forcing term is the Laplace method especially good at handling, that classical methods struggle with?**
Discontinuous or impulsive forcing (unit step functions, Dirac delta impulses) — the transform handles these as simple exponential factors ($e^{-as}$) rather than requiring the equation to be solved piecewise.

**Common examiner trap:** an equation where the forcing term itself needs a transform not on the standard table (e.g. $t\sin t$) — the trick is usually $\mathcal L\{t\,f(t)\} = -F'(s)$.
:::

## Practice questions

:::example Practice — Level 2 (Understanding)
Find $\mathcal L\{f''(t)\}$ in terms of $F(s)$, $f(0)$, $f'(0)$, and verify it by direct integration by parts.
:::

:::example Practice — Level 4 (Exam)
Solve $y'' + y = \cos t$, $y(0)=0, y'(0)=0$, using the Laplace transform (note the resonance case where the forcing frequency matches the natural frequency).
:::

## Topic mastery checklist

- I can state the defining integral for the Laplace transform and the conditions for its existence.
- I can transform $y'$ and $y''$ correctly, including initial-condition terms.
- I can invert a transformed solution via partial fractions.
- I can handle a forcing term involving a unit step or Dirac delta.
