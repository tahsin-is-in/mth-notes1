## Why this topic matters

Complex differentiability looks like a trivial generalization of real differentiability, but it is astonishingly restrictive — it forces a function to be infinitely differentiable and equal to its own Taylor series. The Cauchy–Riemann equations are the concrete test that reveals whether a function has this rigidity.

## Prerequisites

- Complex numbers and functions $f=u+iv$
- Partial derivatives

:::eli5
For a real function, "differentiable" just means the graph has no sharp corner. For a complex function, the derivative has to come out the *same* no matter which direction you approach from in the 2D plane — left, right, up, down, diagonally, all of it. That's a much stronger demand than the real case, and the Cauchy–Riemann equations are just the algebra of forcing "approach from the x-direction" and "approach from the y-direction" to agree.
:::

## Formal definition

:::formal Analytic (Holomorphic) Function
$f$ is analytic at $z_0$ if $f'(z)=\lim_{h\to0}\frac{f(z_0+h)-f(z_0)}{h}$ exists ($h\in\mathbb C$) at every point in some open neighbourhood of $z_0$.
:::

:::theorem Cauchy\u2013Riemann Equations
Write $f(x+iy)=u(x,y)+iv(x,y)$. If $f$ is differentiable at $z_0=x_0+iy_0$, then
$$
u_x = v_y, \qquad u_y = -v_x \quad \text{at } (x_0,y_0).
$$
Conversely, if $u,v$ have continuous partials near $(x_0,y_0)$ satisfying these equations, $f$ is differentiable at $z_0$.
:::

:::proof
Differentiability means $f'(z_0)$ is the same limit along every path. Along the real axis ($h$ real, $h\to0$):
$$
f'(z_0) = \lim_{h\to0}\frac{u(x_0+h,y_0)-u(x_0,y_0)}{h} + i\frac{v(x_0+h,y_0)-v(x_0,y_0)}{h} = u_x + iv_x.
$$
Along the imaginary axis ($h=ik$, $k\to0$ real):
$$
f'(z_0) = \lim_{k\to0}\frac{u(x_0,y_0+k)-u(x_0,y_0)}{ik} + i\frac{v(x_0,y_0+k)-v(x_0,y_0)}{ik} = -iu_y + v_y.
$$
Equating real and imaginary parts of $u_x+iv_x = v_y - iu_y$ gives $u_x=v_y$ and $v_x=-u_y$. $\blacksquare$
:::

**Condition that's easy to miss:** satisfying the Cauchy–Riemann equations at a single isolated point does **not** imply differentiability there — continuity of the partial derivatives *near* the point is also required (see counterexample).

## Worked examples

:::example Easy
$f(z)=z^2=(x^2-y^2)+i(2xy)$: $u_x=2x=v_y$, $u_y=-2y=-v_x$ — both hold everywhere, partials are continuous, so $f$ is entire (analytic on all of $\mathbb C$).
:::

:::example Standard university level
$f(z)=\bar z = x - iy$: $u=x,v=-y$, so $u_x=1$ but $v_y=-1$. The equations fail everywhere, so $\bar z$ is nowhere differentiable — a standard "show this is NOT analytic" exam question.
:::

:::example Exam level
If $f=u+iv$ is analytic, show $u$ is harmonic ($u_{xx}+u_{yy}=0$). From $u_x=v_y$ and $u_y=-v_x$, differentiate the first w.r.t. $x$ and the second w.r.t. $y$: $u_{xx}=v_{yx}$, $u_{yy}=-v_{xy}$. Since mixed partials of $v$ agree (continuity), $u_{xx}+u_{yy}=v_{yx}-v_{xy}=0$.
:::

:::example Difficult
Show $v(x,y)=e^x(x\sin y + y\cos y)$ is harmonic and find $u$ such that $f=u+iv$ is analytic (find the harmonic conjugate). Using $u_x=v_y$ and integrating, then matching with $u_y=-v_x$ to pin down the constant of integration, gives $u(x,y)=e^x(x\cos y - y\sin y)+C$.
:::

:::counterexample
**Statement that looks true:** "If the Cauchy–Riemann equations hold at $z_0$, then $f$ is differentiable at $z_0$."

**Counterexample:** $f(z)=\sqrt{|xy|}$ (with $u=\sqrt{|xy|},\,v=0$). At the origin, $u_x(0,0)=u_y(0,0)=0=v_x=v_y$, so the Cauchy–Riemann equations hold at $(0,0)$. But the difference quotient $\dfrac{f(h)-f(0)}{h}$ along $h=re^{i\pi/4}$ does not have a consistent limit as $h\to 0$ from different directions, so $f$ is **not** differentiable at $0$.

**Why it fails:** the partial derivatives of $u$ are not continuous near the origin — the converse direction of the Cauchy–Riemann theorem requires continuity of the partials, not just their existence at one point.
:::

## Common mistakes

:::mistake
Checking only $u_x=v_y$ and forgetting $u_y=-v_x$ — both equations are required, and students often verify one and assume the other by symmetry.
:::

:::mistake
Concluding "analytic" from Cauchy–Riemann holding at one isolated point, without checking continuity of the partial derivatives nearby (see the counterexample).
:::

## Connections to other topics

:::connection
Harmonic functions here reappear in MTH307 (Mathematical Methods) as solutions of Laplace's equation for steady-state temperature/potential problems — the real and imaginary parts of any analytic function automatically solve Laplace's equation.
:::

## Applications

:::application
**Physics:** the real and imaginary parts of analytic functions model 2D steady-state heat flow, electrostatics, and irrotational fluid flow, because both satisfy Laplace's equation.
:::

## Exam-ready answer

:::examready
$f=u+iv$ analytic at $z_0$ $\implies$ Cauchy–Riemann ($u_x=v_y,\,u_y=-v_x$) holds at $z_0$; conversely, C–R plus continuous partials near $z_0$ $\implies$ analytic. Standard exam pattern: compute $u_x,u_y,v_x,v_y$, check both equations, and state the domain where they (and continuity of the partials) hold.
:::

## Viva preparation

:::viva
**Q: Does satisfying Cauchy\u2013Riemann guarantee analyticity?**
Only together with continuity of the first partial derivatives near the point — otherwise no.

**Q: Why is $u_{xx}+u_{yy}=0$ automatic for analytic $f=u+iv$?**
Because differentiating the Cauchy–Riemann equations and using equality of mixed partials cancels the cross terms exactly.

**Common examiner trap:** giving a function where C–R holds only at an isolated point and asking whether it's analytic there — the correct answer is "not necessarily," with the counterexample above as justification.
:::

## Practice questions

:::example Practice — Level 2 (Understanding)
Verify the Cauchy\u2013Riemann equations for $f(z)=e^z=e^x\cos y + ie^x\sin y$ and conclude $f$ is entire.
:::

:::example Practice — Level 4 (Exam)
Show $u(x,y)=x^3-3xy^2$ is harmonic and find its harmonic conjugate $v$ such that $f=u+iv$ is analytic.
:::

## Topic mastery checklist

- I can derive the Cauchy\u2013Riemann equations from the definition of complex differentiability.
- I can check both equations (not just one) on a new function.
- I can find a harmonic conjugate given one harmonic function.
- I can explain why C\u2013R alone (without continuity of partials) is insufficient for differentiability.
