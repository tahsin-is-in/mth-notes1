## Why this topic matters

Almost every real financial product — a mortgage, a pension, a savings plan — is a sequence of equal payments. Annuity formulas are the single tool that values all of them, and getting "immediate" vs. "due" vs. "deferred" right is the most common source of exam errors in actuarial mathematics.

## Prerequisites

- Compound interest and present/accumulated value
- Geometric series

:::eli5
An annuity is just "the same payment, over and over, on a schedule." The only real question is *timing*: do you pay at the **end** of each period (annuity-immediate) or the **start** (annuity-due)? And does the whole schedule start right away, or only after waiting a while (deferred)? Once timing is nailed down, valuing it is just adding up a geometric series of discounted payments.
:::

## Formal definition

:::formal Annuity-Immediate and Annuity-Due
For $n$ payments of $1$ at effective interest rate $i$ per period:

**Annuity-immediate** (payments at the *end* of each period), present value:
$$
a_{\overline n|} = \frac{1-v^n}{i}, \qquad v = \frac{1}{1+i}.
$$

**Annuity-due** (payments at the *start* of each period), present value:
$$
\ddot a_{\overline n|} = \frac{1-v^n}{d} = (1+i)\,a_{\overline n|}, \qquad d = \frac{i}{1+i}.
$$
:::

:::formal Deferred Annuity
An $m$-year **deferred**, $n$-year annuity-immediate has present value $v^m \cdot a_{\overline n|}$ — simply the ordinary annuity's value, discounted back an extra $m$ years for waiting.
:::

:::theorem Relation Between Immediate and Due
$\ddot a_{\overline n|} = (1+i)\, a_{\overline n|} = 1 + a_{\overline{n-1}|}$.
:::

:::proof
Each annuity-due payment happens exactly one period earlier than the corresponding annuity-immediate payment, so every discounted term is multiplied by $(1+i)$: $\ddot a_{\overline n|} = (1+i) a_{\overline n|}$ directly from the definitions. Alternatively, split off the first (due) payment of $1$ at time $0$, leaving $n-1$ further payments at times $1,\dots,n-1$ — exactly an $(n-1)$-year annuity-immediate: $\ddot a_{\overline n|} = 1 + a_{\overline{n-1}|}$. $\blacksquare$
:::

## Worked examples

:::example Easy
Find the present value of an annuity-immediate paying $1000$ per year for $5$ years at $i=6\%$. $a_{\overline 5|} = \dfrac{1-1.06^{-5}}{0.06} \approx 4.2124$, so PV $\approx 1000\times4.2124 = 4212.40$.
:::

:::example Standard university level
A 16-year temporary annuity-due, deferred 15 years, on a life aged 60 (life-contingent version uses commutation functions, but the pure-interest deferred case is): PV $= v^{15}\,\ddot a_{\overline{16}|}$ at the given rate — the deferral factor $v^{15}$ simply discounts the whole annuity-due's value back to today.
:::

:::example Exam level
Find the discounted and accumulated value at rate $i$ per period of a simple **increasing** annuity paying $R, 2R, 3R,\dots,nR$ at the ends of periods $1,\dots,n$. The present value is
$$
(Ia)_{\overline n|} = R\sum_{k=1}^n k\,v^k = R\cdot\frac{\ddot a_{\overline n|} - n v^n}{i}.
$$
Derivation sketch: write $\sum_{k=1}^n kv^k$ as a sum of "tail" annuities $\sum_{k=1}^n \sum_{j=k}^n v^j = \sum_{k=1}^n v^{k-1} a_{\overline{n-k+1}|}$, which telescopes to the stated closed form after simplification. The accumulated value is $(Ia)_{\overline n|}\cdot(1+i)^n$.
:::

:::example Difficult
A borrower takes an 18,000 loan at $j_{12}=18\%$ over 4 years, with an early-repayment penalty of 3 months' payments. After the 20th payment, a bank offers $j_{12}=14\%$. Should the borrower refinance? Method: (1) compute the level monthly payment $P$ from $18000 = P\cdot a_{\overline{48}|j}$ at the original monthly rate $j=0.18/12=0.015$; (2) compute the outstanding balance $B$ after 20 payments using the **prospective method**, $B=P\cdot a_{\overline{28}|j}$ (value of the 28 remaining payments); (3) at the new rate $j'=0.14/12$, compute the new payment $P'$ needed to amortize $B+3P$ (balance plus penalty) over the remaining 28 months: $P'=(B+3P)/a_{\overline{28}|j'}$; (4) refinance is worthwhile if $P' < P$.
:::

:::counterexample
**Statement that looks true:** "An annuity-due is always worth more than the corresponding annuity-immediate, so you should never prefer immediate payments."

**Counterexample:** this compares present *values* of payments, not overall financial preference — from the *payer's* perspective, annuity-due (paying earlier) is worse, not better, since you part with money sooner. "Worth more" in $\ddot a_{\overline n|} > a_{\overline n|}$ refers to the *receiver's* present value, since receiving money earlier is always preferable to receiving the same nominal amount later.

**Why the confusion happens:** the same formula answers a different question depending on whether you're the payer or the receiver — always identify which side of the transaction the "present value" is being computed for before interpreting the comparison.
:::

## Common mistakes

:::mistake
Using $a_{\overline n|}$ (immediate) when the problem describes payments starting *now* (due), or vice versa — always identify the timing of the *first* payment explicitly before choosing a formula.
:::

:::mistake
Forgetting the extra discount factor $v^m$ for deferred annuities — a deferred annuity's formula is not a new formula, it is the ordinary annuity formula multiplied by $v^m$ for the waiting period.
:::

## Connections to other topics

:::connection
Life annuities (MTH310-CH07) are exactly these same formulas, except each payment is additionally weighted by the probability of survival to that payment date — the pure-interest annuity formulas here are the skeleton every life-contingent annuity formula is built on.
:::

## Applications

:::application
**Retirement planning and loan amortization:** every fixed-payment mortgage, car loan, or pension payout is valued using exactly $a_{\overline n|}$ or $\ddot a_{\overline n|}$, making this the single most practically-used formula in the whole course.
:::

## Exam-ready answer

:::examready
$a_{\overline n|} = \dfrac{1-v^n}{i}$ (end-of-period payments); $\ddot a_{\overline n|}=(1+i)a_{\overline n|}=\dfrac{1-v^n}{d}$ (start-of-period payments); an $m$-year deferred version of either is the un-deferred value times $v^m$. Always state which convention (immediate/due) and which payment amount and rate you're using before substituting into a formula — most exam-answer marks are lost to a timing mismatch, not an arithmetic error.
:::

## Viva preparation

:::viva
**Q: What is the single relationship connecting $a_{\overline n|}$ and $\ddot a_{\overline n|}$?**
$\ddot a_{\overline n|} = (1+i)\,a_{\overline n|}$ — every payment in the due annuity is discounted one less period.

**Q: How do you value a deferred annuity?**
Value the ordinary (un-deferred) annuity as usual, then multiply by $v^m$ to discount the entire value back over the deferral period.

**Common examiner trap:** a problem describing "payments starting one year from now for $n$ years" — students sometimes read this as annuity-due; it is annuity-immediate (first payment at the end of year 1, i.e. time 1, matching $a_{\overline n|}$ exactly, with no deferral needed).
:::

## Practice questions

:::example Practice — Level 2 (Understanding)
Find the present value of a 10-year annuity-due of 500 per year at $i=5\%$.
:::

:::example Practice — Level 4 (Exam)
A 12-year temporary immediate annuity is deferred 15 years, paying 1 per year, at $i=6\%$. Find its present value.
:::

## Topic mastery checklist

- I can distinguish annuity-immediate from annuity-due from a word problem's timing description.
- I can derive $\ddot a_{\overline n|}=(1+i)a_{\overline n|}$ from first principles.
- I can correctly apply the deferral discount factor $v^m$.
- I can set up (not necessarily fully compute) an increasing-annuity valuation.
