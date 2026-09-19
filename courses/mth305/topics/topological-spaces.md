## Why this topic matters

A metric space needs a distance function to define "open." Topology asks: what if you throw away the distance and keep only the collection of open sets themselves? Astonishingly, almost everything about convergence, continuity, and compactness can be rebuilt from just that — a topological space is the most general setting where these ideas still make sense.

## Prerequisites

- Metric spaces and open sets (MTH301)
- Basic set operations (union, intersection, complement)

:::eli5
Forget about distance entirely. Just declare, in advance, which subsets of your set you're going to *call* "open" — as long as your declared list obeys three sensible rules (the whole set and the empty set are open; any union of open sets is open; any *finite* intersection of open sets is open). That's a topology. It's a stripped-down skeleton of "openness" with no ruler required.
:::

## Formal definition

:::formal Topological Space
A **topology** on a set $X$ is a collection $\tau$ of subsets of $X$ (called **open sets**) such that:
1. $\emptyset, X \in \tau$
2. Any union of members of $\tau$ is in $\tau$
3. Any **finite** intersection of members of $\tau$ is in $\tau$

$(X,\tau)$ is a **topological space**.
:::

**Condition easy to miss:** intersection is only guaranteed for *finitely* many sets. Infinite intersections of open sets need not be open — this is the single most tested subtlety in the whole chapter.

:::theorem Every Metric Space Induces a Topology
If $(X,d)$ is a metric space, the collection of all sets that are unions of open balls $B(x,r)$ forms a topology on $X$ (the **metric topology**).
:::

## Worked examples

:::example Easy
The **indiscrete topology** $\tau=\{\emptyset,X\}$ and the **discrete topology** $\tau=\mathcal P(X)$ (every subset open) are topologies on any set $X$ — the two extremes.
:::

:::example Standard university level
The **cofinite topology**: $\tau = \{U\subseteq X : X\setminus U \text{ is finite}\}\cup\{\emptyset\}$. Checking axiom 3: if $U_1,\dots,U_n\in\tau$, then $X\setminus(U_1\cap\cdots\cap U_n) = (X\setminus U_1)\cup\cdots\cup(X\setminus U_n)$, a finite union of finite sets, hence finite — so the intersection is in $\tau$.
:::

:::example Exam level
On $X=\{a,b,c,d,e\}$, is $\tau=\{X,\emptyset,\{a\},\{c,d\},\{a,c,d\},\{b,c,d,e\}\}$ a topology? Check all pairwise unions and intersections stay in $\tau$: e.g. $\{a\}\cup\{c,d\}=\{a,c,d\}\in\tau$ \u2713, $\{a,c,d\}\cap\{b,c,d,e\}=\{c,d\}\in\tau$ \u2713. Checking every combination confirms $\tau$ is indeed a topology — this exact example appears repeatedly in University of Dhaka exams as the base case for closure/limit-point questions.
:::

:::example Difficult
Show the union of two topologies need not be a topology. On $X=\{a,b,c\}$, let $\tau_1=\{X,\emptyset,\{a\}\}$ and $\tau_2=\{X,\emptyset,\{b\}\}$ — both valid topologies. Their union $\{X,\emptyset,\{a\},\{b\}\}$ fails axiom 2: $\{a\}\cup\{b\}=\{a,b\}$ is not in the union. So $\tau_1\cup\tau_2$ is not a topology, even though each $\tau_i$ individually is.
:::

:::counterexample
**Statement that looks true:** "An arbitrary (infinite) intersection of open sets is open, just like a finite one."

**Counterexample:** in $(\mathbb R,\text{usual topology})$, the sets $U_n=(-1/n,1/n)$ are open for every $n\in\mathbb N$, but $\bigcap_{n=1}^\infty U_n = \{0\}$, which is **not** open in $\mathbb R$.

**Why it fails:** the topology axioms explicitly restrict intersection-closure to *finite* collections — infinite intersections can shrink open sets down to single points or worse, which is precisely why the axiom is stated the way it is.
:::

## Common mistakes

:::mistake
Trying to verify "is this a topology?" by checking only $\emptyset,X\in\tau$ and one union — every pairwise union AND every pairwise intersection among all listed sets must be checked, since a single missing combination invalidates it.
:::

:::mistake
Assuming any intersection of open sets is open, forgetting the "finite" qualifier (see counterexample) — this is the most frequently tested trap in topology exams.
:::

## Connections to other topics

:::connection
Closed sets, closure, interior, and limit points (the next topic in this chapter) are all defined as complements or combinations of these open sets — everything downstream in MTH305 is built on getting this one axiom set exactly right.
:::

## Applications

:::application
**Abstracting continuity:** once "open set" is defined abstractly, continuity of $f:X\to Y$ can be defined purely as "preimages of open sets are open" — no distance function needed at all, which is essential once you work with spaces that have no natural metric (e.g. certain function spaces with weak topologies).
:::

## Exam-ready answer

:::examready
A topology $\tau$ on $X$ must contain $\emptyset$ and $X$, be closed under arbitrary unions, and closed under **finite** intersections only. To verify a given collection is a topology, systematically check axiom 1 (trivial), then every pairwise union, then every pairwise intersection — for a finite $\tau$, checking pairs suffices since general unions/intersections reduce to iterating pairs.
:::

## Viva preparation

:::viva
**Q: Why is only "finite" intersection required, not arbitrary intersection?**
Because arbitrary intersections of open sets in familiar spaces (like $\mathbb R$) can collapse to single points, which are not open — requiring arbitrary intersection-closure would make almost no interesting topology satisfy the axioms.

**Q: Is the union of two topologies on the same set always a topology?**
No — see the counterexample above. The intersection of two topologies on the same set, however, *is* always a topology.

**Common examiner trap:** giving a finite collection of subsets and asking "is this a topology" where one specific pairwise union or intersection is missing — always check every pair systematically rather than a few obvious ones.
:::

## Practice questions

:::example Practice — Level 1 (Basic)
Give two examples of subsets of $X=\{a,b,c\}$: one collection that is a topology, and one that is not (and explain which axiom fails).
:::

:::example Practice — Level 3 (Standard)
Show that for an indexed family of topologies $\{\tau_i\}$ on $X$, $\bigcap_i \tau_i$ is also a topology on $X$.
:::

## Topic mastery checklist

- I can state all three topology axioms precisely, including the "finite" qualifier on intersections.
- I can verify or refute whether a given finite collection is a topology by systematic checking.
- I can produce the standard counterexample showing infinite intersections of open sets need not be open.
- I can explain why the union of two topologies need not be a topology.
