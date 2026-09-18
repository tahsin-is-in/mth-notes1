## 1.1 Ordinary points

Consider a linear second-order ODE
$$
y'' + p(x)y' + q(x)y = 0.
$$

:::definition Ordinary Point
$x_0$ is an **ordinary point** of the ODE if $p$ and $q$ are both analytic at $x_0$ (i.e. have convergent power series expansions there). Otherwise $x_0$ is a **singular point**.
:::

:::theorem Existence of Power Series Solutions
If $x_0$ is an ordinary point, the ODE has two linearly independent solutions of the form
$$
y(x) = \sum_{n=0}^{\infty} a_n (x - x_0)^n,
$$
each converging in a neighbourhood of $x_0$.
:::

## 1.2 The method

**Worked example.** Solve $y'' - xy = 0$ about $x_0 = 0$ (the Airy equation).

Assume $y = \sum_{n=0}^{\infty} a_n x^n$, so $y'' = \sum_{n=2}^{\infty} n(n-1) a_n x^{n-2}$. Substituting:
$$
\sum_{n=2}^{\infty} n(n-1) a_n x^{n-2} - x \sum_{n=0}^{\infty} a_n x^n = 0.
$$

Re-indexing the first sum ($n \to n+2$) and the second ($n \to n - 1$) to line up powers of $x^n$ gives the **recurrence relation**:
$$
(n+2)(n+1) a_{n+2} = a_{n-1}, \qquad n \geq 1,
$$
with $a_2 = 0$ fixed separately. Choosing $a_0 = 1, a_1 = 0$ and $a_0 = 0, a_1 = 1$ gives two independent solutions built entirely from the recurrence.

:::important Exam tip
The recurrence relation is the entire content of these problems — once you have it correctly indexed, generating as many terms as asked is mechanical. Spend your care on the re-indexing step, since that is where marks are usually lost.
:::

## 1.3 Radius of convergence

:::theorem Radius of Convergence
The power series solution about an ordinary point $x_0$ converges at least on the interval $|x - x_0| < R$, where $R$ is the distance from $x_0$ to the nearest singular point of the ODE (allowing complex singular points).
:::

## Next up

Lecture 2 changes strategy entirely: instead of solving in the time domain directly, the Laplace transform converts the ODE into an algebraic equation — especially useful once initial conditions are involved.
