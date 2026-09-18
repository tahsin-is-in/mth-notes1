## 1.1 Complex differentiability

For $f : U \to \mathbb{C}$ on an open set $U \subseteq \mathbb{C}$, the derivative is defined exactly as in the real case:
$$
f'(z_0) = \lim_{h \to 0} \frac{f(z_0 + h) - f(z_0)}{h}, \qquad h \in \mathbb{C}.
$$

The difference — and it is enormous — is that $h$ may approach $0$ from **any direction** in the complex plane, and the limit must be the same from all of them.

:::definition Analytic (Holomorphic) Function
$f$ is **analytic** (or holomorphic) at $z_0$ if $f'(z)$ exists at every point in some open neighbourhood of $z_0$. $f$ is analytic on $U$ if it is analytic at every point of $U$.
:::

## 1.2 The Cauchy–Riemann equations

Write $f(x + iy) = u(x, y) + iv(x, y)$, where $u, v$ are real-valued.

:::theorem Cauchy\u2013Riemann Equations
If $f = u + iv$ is differentiable at $z_0 = x_0 + iy_0$, then the partial derivatives of $u$ and $v$ exist there and satisfy
$$
\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y}, \qquad \frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}.
$$
Conversely, if $u, v$ have continuous partial derivatives satisfying these equations near $z_0$, then $f$ is differentiable at $z_0$.
:::

**Why this happens.** Differentiability requires the limit defining $f'(z_0)$ to agree along the real axis ($h \to 0$ real) and the imaginary axis ($h \to 0$ purely imaginary). Equating the two resulting expressions for $f'(z_0)$ gives exactly the Cauchy–Riemann equations.

:::example Checking analyticity
Let $f(z) = z^2 = (x^2 - y^2) + i(2xy)$, so $u = x^2 - y^2$ and $v = 2xy$.
$$
u_x = 2x = v_y, \qquad u_y = -2y = -v_x.
$$
Both equations hold everywhere, and the partials are continuous, so $f(z) = z^2$ is analytic on all of $\mathbb{C}$.
:::

:::important Exam tip
The Cauchy–Riemann equations are **necessary** for differentiability but only **sufficient** when the partial derivatives are also continuous. A very common exam trap is a function satisfying C–R at a single point without continuous partials nearby — always check both conditions.
:::

## 1.3 Harmonic functions

If $f = u + iv$ is analytic, differentiating the Cauchy–Riemann equations shows that $u$ and $v$ both satisfy Laplace's equation,
$$
\nabla^2 u = u_{xx} + u_{yy} = 0,
$$
i.e. $u$ and $v$ are **harmonic**. This is one of the deepest connections in the course: complex analysis and potential theory are, in a precise sense, the same subject.

## Next up

Lecture 2 turns to integration: Cauchy's Integral Formula shows that the values of an analytic function *inside* a contour are completely determined by its values *on* the contour — a phenomenon with no real-variable analogue at all.
