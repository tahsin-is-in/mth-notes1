## Why this topic matters

Most linear ODEs with variable coefficients (Legendre's, Bessel's, Hermite's, and more) cannot be solved with elementary functions. The power series method builds a solution term by term directly from the equation, and is the gateway to every special function used later in this course.

## Prerequisites

- Taylor/power series and their radius of convergence
- Linear second-order ODEs

:::eli5
If you can't guess the whole solution at once, guess it one coefficient at a time. Assume the answer is an infinite polynomial $a_0+a_1x+a_2x^2+\cdots$, plug it into the equation, and the equation itself tells you a formula (a recurrence relation) linking each new coefficient to the earlier ones — like a row of dominoes where each one knocks over the next.
:::

## Formal definition

:::formal Ordinary Point
For $y''+p(x)y'+q(x)y=0$, $x_0$ is an **ordinary point** if $p,q$ are both analytic at $x_0$; otherwise $x_0$ is a **singular point**.
:::

:::theorem Existence of Power Series Solutions
If $x_0$ is an ordinary point, the ODE has two linearly independent solutions $y=\sum_{n=0}^\infty a_n(x-x_0)^n$, each convergent in a neighbourhood of $x_0$ (at least out to the nearest singular point, real or complex).
:::

## Worked examples

:::example Easy
Solve $y'-y=0$ by power series about $x_0=0$. With $y=\sum a_nx^n$, $y'=\sum na_nx^{n-1}$, matching coefficients of $x^n$ gives $a_{n+1}=\dfrac{a_n}{n+1}$, so $a_n=a_0/n!$ and $y=a_0e^x$ — recovering the known solution.
:::

:::example Standard university level
Solve the Airy equation $y''-xy=0$ about $x_0=0$. Substituting $y=\sum a_nx^n$ and re-indexing gives the recurrence $(n+2)(n+1)a_{n+2}=a_{n-1}$ for $n\ge1$, with $a_2=0$ fixed separately. Choosing $(a_0,a_1)=(1,0)$ and $(0,1)$ gives two independent series solutions.
:::

:::example Exam level
Find the first four terms of the power series solution to $y''+xy=0$ about $x=0$. With $y=\sum a_nx^n$: $y''=\sum_{n\ge2}n(n-1)a_nx^{n-2}$, and $xy=\sum_{n\ge0}a_nx^{n+1}$. Re-indexing both to powers of $x^n$ and matching coefficients gives $a_{n+2}=\dfrac{-a_{n-1}}{(n+2)(n+1)}$ for $n\ge1$, with $a_2=0$. Starting from $a_0,a_1$ arbitrary: $a_3=-a_0/6$, $a_4=-a_1/12$, giving $y = a_0\left(1-\dfrac{x^3}{6}+\cdots\right) + a_1\left(x-\dfrac{x^4}{12}+\cdots\right)$.
:::

:::example Difficult
Explain (without fully solving) why the radius of convergence of the power series solution to $(1+x^2)y''+xy'-y=0$ about $x_0=0$ is exactly $1$. The coefficients $p(x)=x/(1+x^2)$ and $q(x)=-1/(1+x^2)$ have singularities at $x=\pm i$ (complex!), each at distance $1$ from $0$ — the theorem's guarantee extends to the nearest singularity **in the complex plane**, not just on the real line, so the radius is $1$ even though the real-line coefficients look perfectly smooth everywhere.
:::

:::counterexample
**Statement that looks true:** "A power series solution always converges for all $x$, since the coefficients keep getting smaller."

**Counterexample:** for $(1-x^2)y''-2xy'+2y=0$ (a Legendre-type equation) about $x_0=0$, $x=0$ is ordinary, but $p(x)=-2x/(1-x^2)$ has singularities at $x=\pm1$. The resulting power series solution has radius of convergence exactly $1$, not $\infty$ — it diverges outside $(-1,1)$ even though nothing about the recurrence "looks" like it should stop converging.

**Why it fails:** the radius of convergence is governed by the *nearest singular point* of the equation's coefficients, which is easy to overlook if you only inspect the recurrence relation's arithmetic and not the original coefficient functions.
:::

## Common mistakes

:::mistake
Misaligning the index shift when substituting $y''=\sum n(n-1)a_nx^{n-2}$ into the equation — forgetting that this sum effectively starts at $n=2$ (the $n=0,1$ terms vanish) causes an off-by-one error in the recurrence relation. This is the single most common point-loss in these problems.
:::

## Connections to other topics

:::connection
Legendre's equation, Bessel's equation, and Hermite's equation (later chapters in this course) are all solved by exactly this method — the special functions named after them are just the power series solutions that come out of the recurrence, given standard names because they show up so often in physics.
:::

## Applications

:::application
**Physics:** Legendre and Bessel functions arising from this method describe angular and radial parts of solutions to Laplace's and the wave equation in spherical/cylindrical coordinates — used throughout electromagnetism and quantum mechanics.
:::

## Exam-ready answer

:::examready
At an ordinary point $x_0$, substitute $y=\sum a_n(x-x_0)^n$, differentiate term by term, re-index every sum to a common power of $(x-x_0)^n$, and equate coefficients to get a recurrence relation. Solve the recurrence to express $a_n$ in terms of $a_0,a_1$ (the two free constants matching a second-order ODE). The radius of convergence is at least the distance from $x_0$ to the nearest singular point of $p,q$, including complex ones.
:::

## Viva preparation

:::viva
**Q: What's the difference between an ordinary point and a regular singular point?**
At an ordinary point, $p,q$ themselves are analytic; at a regular singular point, $p,q$ may blow up, but $(x-x_0)p(x)$ and $(x-x_0)^2q(x)$ are still analytic — this weaker condition is what the Frobenius method (not this topic) is built for.

**Q: Why can complex singularities affect a real-valued problem's radius of convergence?**
Because a power series is really a complex-analytic object; a singularity anywhere in $\mathbb C$ at distance $R$ from the center caps the disc of convergence at radius $R$, regardless of whether the singularity is on the real axis.
:::

## Practice questions

:::example Practice — Level 2 (Understanding)
Find the recurrence relation for the power series solution of $y''-2xy'+4y=0$ about $x_0=0$ (this is the Hermite equation with parameter $2$).
:::

:::example Practice — Level 4 (Exam)
Find the first four nonzero terms of the power series solution to $y''-y=x$, $y(0)=1,y'(0)=0$, about $x_0=0$.
:::

## Topic mastery checklist

- I can correctly re-index a differentiated power series without an off-by-one error.
- I can derive a recurrence relation from a given ODE.
- I can determine the guaranteed radius of convergence from the coefficient functions, including complex singularities.
- I can explain why two free constants appear, matching the order of the ODE.
