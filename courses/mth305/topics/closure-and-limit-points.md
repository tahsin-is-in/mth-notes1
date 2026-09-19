## Why this topic matters

Once "open" is defined, everything else — closed, closure, limit point, dense — is built from it by pure set logic. This topic is where topology stops being "just axioms" and starts letting you actually classify points and sets, which is exactly what past exam questions in this course repeatedly test.

## Prerequisites

- Topological spaces (definitions and axioms)

:::eli5
A set is "closed" if it contains all the points it's "leaning toward" — no matter how you approach the set from outside using its neighbourhoods, you can't sneak up on it from a point it doesn't already contain. A **limit point** of $A$ is exactly such a point: every neighbourhood around it catches some other point of $A$, so it's a point the set is "leaning toward," whether or not it's actually inside $A$.
:::

## Formal definition

:::formal Closed Set, Limit Point, Closure
A set $F\subseteq X$ is **closed** if $X\setminus F$ is open.

$p\in X$ is a **limit point** of $A\subseteq X$ if every open set (neighbourhood) containing $p$ also contains a point of $A$ other than $p$ itself.

The **closure** $\bar A$ is $A$ together with all its limit points: $\bar A = A \cup A'$, where $A'$ is the **derived set** (set of all limit points of $A$).
:::

:::theorem Closed Set Properties
In any topological space $X$: (1) $\emptyset$ and $X$ are closed; (2) an arbitrary intersection of closed sets is closed; (3) a **finite** union of closed sets is closed.
:::

:::proof
These are exactly De Morgan's laws applied to the topology axioms. For (2): if $\{F_i\}$ are closed, $X\setminus\bigcap_i F_i = \bigcup_i(X\setminus F_i)$, a union of open sets, hence open by axiom 2 — so $\bigcap_i F_i$ is closed. For (3): if $F_1,\dots,F_n$ are closed, $X\setminus\bigcup_{k=1}^n F_k = \bigcap_{k=1}^n(X\setminus F_k)$, a *finite* intersection of open sets, hence open by axiom 3 — so the union is closed. $\blacksquare$
:::

**Condition easy to miss (mirrors the open-set axiom):** only *finite* unions of closed sets are guaranteed closed — arbitrary unions of closed sets need not be closed, exactly dual to the open-set case.

:::theorem Closure Formula
$\bar A = \operatorname{int}(A) \cup \partial A$ (interior union boundary), and $\bar A$ is the smallest closed set containing $A$.
:::

## Worked examples

:::example Easy
In $(\mathbb R,\text{usual})$, $\overline{(0,1)} = [0,1]$: the derived set of $(0,1)$ is $[0,1]$ (every point of $[0,1]$ has points of $(0,1)$ arbitrarily close), and $\overline{(0,1)}=(0,1)\cup[0,1]=[0,1]$.
:::

:::example Standard university level
For $\tau=\{X,\emptyset,\{a\},\{c,d\},\{a,c,d\},\{b,c,d,e\}\}$ on $X=\{a,b,c,d,e\}$ and $A=\{a,c\}$: is $b$ a limit point of $A$? Every open set containing $b$ must be $X$ or $\{b,c,d,e\}$ (the only open sets containing $b$); both contain $c\in A$ (other than $b$ itself), so **yes**, $b$ is a limit point of $A$.
:::

:::example Exam level
Same setup: is $a$ a limit point of $A=\{a,c\}$? The open sets containing $a$ are $\{a\},\{a,c,d\},X$. Take the smallest, $\{a\}$: it contains no point of $A$ *other than* $a$ itself. So $a$ is **not** a limit point of $A$ (even though $a\in A$) — this distinction (a point can be in a set without being a limit point of it) is the crux of nearly every University of Dhaka exam question on this topic.
:::

:::example Difficult
Is $A=\{1,\tfrac12,\tfrac13,\dots\}$ dense in $(\mathbb R,\text{usual})$? A set is dense if $\bar A = \mathbb R$. Here, $\bar A = A \cup \{0\}$ (the only limit point is $0$, since the terms are isolated except for their accumulation at $0$), which is far from all of $\mathbb R$ — so $A$ is **not** dense in $\mathbb R$.
:::

:::counterexample
**Statement that looks true:** "If $p \in A$, then $p$ is a limit point of $A$."

**Counterexample:** in $(\mathbb R,\text{usual})$, let $A = \{0\} \cup (1,2)$. The point $p=0$ is in $A$, but the open interval $(-0.1, 0.1)$ contains $0$ and no other point of $A$ — so $0$ is **not** a limit point of $A$ (it's an **isolated point** of $A$ instead).

**Why it fails:** the definition of a limit point requires *every* neighbourhood to catch a point of $A$ *different from $p$ itself* — being a member of $A$ says nothing about whether other points of $A$ cluster nearby.
:::

## Common mistakes

:::mistake
Confusing "$p\in A$" with "$p$ is a limit point of $A$" — as the counterexample shows, these are genuinely different conditions, and an isolated point of $A$ satisfies the first but not the second.
:::

:::mistake
Forgetting that limit-point checks in a non-metric topology must use *every* open set containing the point, but it's always enough to check the *smallest* open set containing that point when one exists (as in the worked "exam level" example) — using a larger open set can wrongly suggest a point is a limit point when a smaller neighbourhood would rule it out.
:::

## Connections to other topics

:::connection
This machinery — closed sets, closure, limit points — is exactly what's needed to define continuity abstractly in the next topic (Continuous Functions, MTH305-CH02): $f$ is continuous iff $f(\bar A)\subseteq\overline{f(A)}$ for every $A$, a purely topological restatement of the $\varepsilon$-$\delta$ definition.
:::

## Exam-ready answer

:::examready
$F$ closed $\iff$ $X\setminus F$ open. $p$ is a limit point of $A$ iff every open set containing $p$ contains a point of $A\setminus\{p\}$. $\bar A = A\cup A'$ is the smallest closed set containing $A$. To test a specific point in a finite topology: find the *smallest* open set containing that point and check directly whether it meets $A$ elsewhere — this is faster than checking every open set in $\tau$.
:::

## Viva preparation

:::viva
**Q: Can a point be in a set without being one of its limit points?**
Yes — an isolated point of $A$ is a standard example; see the counterexample above.

**Q: Is an arbitrary union of closed sets always closed?**
No, dual to open sets — only finite unions of closed sets are guaranteed closed.

**Follow-up:** give an example where an infinite union of closed sets is not closed.
In $\mathbb R$, $F_n = [1/n, 1]$ is closed for each $n$, but $\bigcup_{n=1}^\infty F_n = (0,1]$, which is not closed.
:::

## Practice questions

:::example Practice — Level 2 (Understanding)
For $\tau=\{X,\emptyset,\{a\},\{c,d\},\{a,c,d\},\{b,c,d,e\}\}$ on $X=\{a,b,c,d,e\}$, find a subset of $X$ that is neither open nor closed.
:::

:::example Practice — Level 4 (Exam)
Prove that for any $A\subseteq X$, if $A$ is closed then $A' \subseteq A$ (a closed set contains all its limit points).
:::

## Topic mastery checklist

- I can determine whether a given point is a limit point of a set in a specific finite topology.
- I can explain the difference between "$p\in A$" and "$p$ is a limit point of $A$."
- I can prove the closed-set properties from the open-set axioms via De Morgan's laws.
- I can determine whether a given subset of $\mathbb R$ is dense.
