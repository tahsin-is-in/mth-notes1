## Why this topic matters

Every life insurance premium, annuity value, and pension calculation ultimately rests on one function: the probability a person survives to a given age. The survival function and force of mortality are the two equivalent languages actuaries use to describe this, and converting fluently between them is tested in nearly every incourse exam in this course.

## Prerequisites

- Basic probability (continuous random variables, density functions)
- Differentiation and integration

:::eli5
Imagine tracking one specific newborn forever. The **survival function** $S(t)$ answers "what's the chance they're still alive at age $t$?" — it starts at $1$ (certainly alive at birth) and decreases to $0$ eventually. The **force of mortality** $\mu(x)$ answers a sharper, instantaneous question: "right now, at age $x$, exactly how 'risky' is this instant?" — like an instantaneous death rate, the way speed is an instantaneous rate of change of position.
:::

## Formal definition

:::formal Survival Function and Force of Mortality
Let $T$ (a person's age at death) have survival function $S(t) = P(T>t)$, with $S(0)=1$, $S$ non-increasing, $S(\infty)=0$ (or $S(\omega)=0$ for a limiting age $\omega$).

The **force of mortality** is
$$
\mu(x) = \lim_{h\to0^+} \frac{P(x<T\le x+h \mid T>x)}{h} = -\frac{S'(x)}{S(x)} = -\frac{d}{dx}\ln S(x).
$$
:::

:::theorem Recovering S from mu
$$
S(x) = \exp\left(-\int_0^x \mu(t)\,dt\right).
$$
:::

:::proof
From $\mu(x)=-\dfrac{d}{dx}\ln S(x)$, integrate both sides from $0$ to $x$:
$$
\int_0^x \mu(t)\,dt = -\big[\ln S(t)\big]_0^x = -\ln S(x) + \ln S(0) = -\ln S(x)
$$
since $S(0)=1 \Rightarrow \ln S(0)=0$. Exponentiating both sides gives $S(x) = \exp\left(-\int_0^x\mu(t)\,dt\right)$. $\blacksquare$
:::

**Condition easy to miss:** this requires $S$ to be differentiable and strictly positive on the interval of integration — at the limiting age $\omega$ where $S(\omega)=0$, $\mu(x)\to\infty$ as $x\to\omega^-$ typically, and the formula is understood as a limit.

## Worked examples

:::example Easy
Given $S(x) = 1-x/100$ for $0\le x\le100$ (a uniform/De Moivre model), find $\mu(50)$. $S'(x)=-1/100$, so $\mu(50) = -S'(50)/S(50) = (1/100)/(1-50/100) = (1/100)/(1/2) = 1/50$.
:::

:::example Standard university level
Given $S(x)=\left(\dfrac{7700-40x-x^2}{7700}\right)$, find the limiting age $\omega$. Set $S(\omega)=0$: $7700-40\omega-\omega^2=0 \implies \omega^2+40\omega-7700=0$. By the quadratic formula, $\omega = \dfrac{-40+\sqrt{1600+30800}}{2} = \dfrac{-40+180}{2}=70$. (The negative root is rejected since $\omega>0$.)
:::

:::example Exam level
For $F_0(t) = 1-(1-t/120)^{1.5}$, $0\le t\le120$ (so $S(t)=(1-t/120)^{1.5}$): find the median future lifetime at age $50$. We need $t_{0.5}$ such that $P(T-50 > t_{0.5} \mid T>50)=0.5$, i.e. $\dfrac{S(50+t_{0.5})}{S(50)}=0.5$. Compute $S(50)=(1-50/120)^{1.5}=(7/12)^{1.5}$. Solve $(1-(50+t_{0.5})/120)^{1.5} = 0.5\,(7/12)^{1.5}$ for $t_{0.5}$ by raising both sides to the power $2/3$ and rearranging — this is the standard median-remaining-lifetime calculation pattern seen repeatedly in past exams for this course.
:::

:::example Difficult
Given a life table with $q_{55}=0.01001,\,q_{56}=0.01038,\,q_{57}=0.01081,\,q_{58}=0.01122,\,q_{59}=0.01172$, and $600$ deaths observed between ages $55$–$56$ out of a group aged $55$ (so $l_{55}\,q_{55}=600 \Rightarrow l_{55}=600/0.01001\approx59940$), find the total expected deaths between ages $55$ and $60$. Compute $l_{56}=l_{55}(1-q_{55})$, $l_{57}=l_{56}(1-q_{56})$, etc., successively, then total deaths $= l_{55}-l_{60} = \sum_{k=55}^{59} l_k\,q_k$ — a direct application of the life-table recursion $l_{x+1}=l_x(1-q_x)$.
:::

:::counterexample
**Statement that looks true:** "The force of mortality $\mu(x)$ is a probability, so it must lie between 0 and 1."

**Counterexample:** for many standard mortality laws (e.g. Gompertz's law, $\mu(x)=Bc^x$), $\mu(x)$ grows without bound as $x$ increases and can easily exceed $1$ at advanced ages — e.g. $\mu(100)$ can be well above $1$ under realistic parameter choices.

**Why it fails:** $\mu(x)$ is a *rate* (an instantaneous hazard rate, with units of "per unit time"), not a probability — it is analogous to a probability *density*, which can also exceed $1$, rather than to a probability itself, which cannot.
:::

## Common mistakes

:::mistake
Confusing $\mu(x)$ (instantaneous rate at exact age $x$) with $q_x$ (the *probability* of dying within one year, given alive at age $x$) — they satisfy $q_x = 1-\exp\left(-\int_0^1 \mu(x+t)\,dt\right)$, but are not numerically interchangeable, and mixing them up is one of the most common exam errors.
:::

:::mistake
Forgetting the negative sign in $\mu(x) = -S'(x)/S(x)$ — since $S$ is decreasing, $S'(x)<0$, and the negative sign is exactly what makes $\mu(x)$ come out positive.
:::

## Connections to other topics

:::connection
Force of mortality is the life-contingent analogue of force of interest $\delta$ (MTH310-CH01) — both are instantaneous rates recovered from an accumulation/decay function via a logarithmic derivative, and life insurance net premium formulas (MTH310-CH08) combine both simultaneously.
:::

## Applications

:::application
**Insurance pricing:** every life insurance premium and annuity valuation integrates $S(x)$ (or equivalently $\mu(x)$) against a discount factor $v^t$ — accurate mortality modeling here is the actuarial industry's central statistical problem.
:::

## Exam-ready answer

:::examready
$S(x)=P(T>x)$; $\mu(x) = -S'(x)/S(x) = -\frac{d}{dx}\ln S(x)$; conversely $S(x)=\exp\left(-\int_0^x\mu(t)dt\right)$. Standard exam pattern: given $S(x)$ in closed form, differentiate to get $\mu(x)$ directly; given $\mu(x)$, integrate and exponentiate to recover $S(x)$. Always verify $S(0)=1$ and $S$ is non-increasing as a sanity check on any given formula.
:::

## Viva preparation

:::viva
**Q: Can the force of mortality exceed 1?**
Yes — it's a rate, not a probability, and commonly exceeds 1 at advanced ages under realistic mortality laws.

**Q: What's the difference between $\mu(x)$ and $q_x$?**
$\mu(x)$ is the instantaneous force of mortality at the exact instant age $x$; $q_x$ is the probability of dying sometime within the *following full year*, given alive at $x$ — related but not equal.

**Common examiner trap:** giving $S(x)$ as a fraction with a variable both requiring simplification before differentiating, and expecting students to still correctly extract $\mu(x)=-S'(x)/S(x)$ without arithmetic slips.
:::

## Practice questions

:::example Practice — Level 2 (Understanding)
Given $S(x) = e^{-x/100}$, find $\mu(x)$ and comment on whether this force of mortality is realistic for human populations (constant force models are used for simplified problems, but real mortality increases with age).
:::

:::example Practice — Level 4 (Exam)
Given $S(x)=(7200-10x-x^2)/7200$, find the limiting age $\omega$, verify $S$ satisfies the survival-function criteria, and compute $\mu(65)$.
:::

## Topic mastery checklist

- I can state the relationship $\mu(x)=-S'(x)/S(x)$ and its inverse (exponential of an integral) fluently.
- I can find the limiting age $\omega$ from a given $S(x)$ formula.
- I can distinguish $\mu(x)$ from $q_x$ precisely.
- I can compute a median or expected future lifetime from a given survival function.
