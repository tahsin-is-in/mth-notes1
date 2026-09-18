## 2.1 Definition

:::definition Laplace Transform
For a function $f(t)$ defined on $t \geq 0$, the **Laplace transform** is
$$
\mathcal{L}\{f(t)\}(s) = F(s) = \int_0^{\infty} e^{-st} f(t)\, dt,
$$
defined for all $s$ where the integral converges.
:::

The transform turns **differentiation** in $t$ into **multiplication** in $s$, which is exactly why it is so effective on differential equations.

:::theorem Transform of a Derivative
$$
\mathcal{L}\{f'(t)\} = sF(s) - f(0), \qquad \mathcal{L}\{f''(t)\} = s^2 F(s) - sf(0) - f'(0).
$$
:::

## 2.2 Solving an IVP

**Worked example.** Solve $y'' - 3y' + 2y = 0$, $y(0) = 1$, $y'(0) = 0$.

Taking the Laplace transform of both sides and writing $Y(s) = \mathcal{L}\{y(t)\}$:
$$
\big(s^2 Y - s\cdot 1 - 0\big) - 3\big(sY - 1\big) + 2Y = 0.
$$

Collecting terms in $Y$:
$$
Y(s)(s^2 - 3s + 2) = s - 3 \quad\Longrightarrow\quad Y(s) = \frac{s - 3}{(s-1)(s-2)}.
$$

Partial fractions give $Y(s) = \dfrac{2}{s - 1} - \dfrac{1}{s - 2}$, so
$$
y(t) = 2e^{t} - e^{2t}.
$$

:::important Exam tip
The whole method reduces to three mechanical stages: transform the ODE using initial conditions, solve the resulting algebraic equation for $Y(s)$, then invert using partial fractions and a transform table. Most marks are lost in the partial-fractions step, not the calculus — check your algebra there carefully.
:::

## 2.3 Why this beats direct methods here

Unlike the characteristic-equation method, the Laplace transform builds the initial conditions **directly into the algebra**, so there is no separate step of solving for arbitrary constants afterwards. This becomes especially valuable for systems of ODEs and for equations with discontinuous forcing terms (step and impulse functions), which are difficult to handle by other means.
