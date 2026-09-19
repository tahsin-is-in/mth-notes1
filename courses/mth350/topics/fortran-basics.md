## Why this topic matters

MTH 350's entire syllabus is "implement the numerical methods you're learning in MTH 306 (and elsewhere) as working FORTRAN programs." Before any algorithm can be coded, you need the small, fixed set of FORTRAN syntax rules this topic covers.

## Prerequisites

- Basic programming concepts (variables, loops, conditionals) from any language
- The specific numerical method being implemented (e.g. from MTH 306)

:::eli5
FORTRAN is one of the oldest programming languages, built specifically for "FORmula TRANslation" — turning mathematical formulas directly into number-crunching code. It looks old-fashioned (column-sensitive formatting in older standards, `DO` loops instead of `for`), but for straightforward numerical algorithms like the ones in this course, it reads almost exactly like the pseudocode you'd write by hand.
:::

## Core syntax reference

:::formal Program Structure
```fortran
PROGRAM MAIN
    IMPLICIT NONE
    INTEGER :: I, N
    REAL :: X, SUM

    N = 10
    SUM = 0.0
    DO I = 1, N
        X = REAL(I)
        SUM = SUM + X
    END DO

    PRINT *, 'Sum = ', SUM
END PROGRAM MAIN
```
:::

**Key rules:**
- `IMPLICIT NONE` forces every variable to be explicitly declared — always include it to catch typos as compile errors instead of silent bugs.
- `INTEGER`, `REAL`, `REAL*8` (double precision), `CHARACTER`, `LOGICAL` are the core types.
- `DO ... END DO` is the loop construct; `IF (...) THEN ... ELSE ... END IF` is the conditional.
- Arrays: `REAL :: A(10)` declares a 1-indexed array of 10 reals by default.
- `PRINT *, ...` writes to standard output; `READ *, ...` reads input.

## Worked examples

:::example Easy
Print the first 10 squares:
```fortran
PROGRAM SQUARES
    IMPLICIT NONE
    INTEGER :: I
    DO I = 1, 10
        PRINT *, I, I*I
    END DO
END PROGRAM SQUARES
```
:::

:::example Standard university level
Bisection method for finding a root of $f(x)=x^3-x-2$ on $[1,2]$:
```fortran
PROGRAM BISECTION
    IMPLICIT NONE
    REAL :: A, B, C, FA, FC, TOL
    INTEGER :: I, MAXIT

    A = 1.0
    B = 2.0
    TOL = 1.0E-6
    MAXIT = 100

    DO I = 1, MAXIT
        C = (A + B) / 2.0
        FA = A**3 - A - 2.0
        FC = C**3 - C - 2.0
        IF (FA * FC < 0.0) THEN
            B = C
        ELSE
            A = C
        END IF
        IF (ABS(B - A) < TOL) EXIT
    END DO

    PRINT *, 'Root approx = ', C
END PROGRAM BISECTION
```
:::

:::example Exam level
Jacobi iteration for a linear system (matches the MTH 306 method directly): given $A\mathbf x=\mathbf b$, iterate $x_i^{(k+1)} = \dfrac{1}{a_{ii}}\left(b_i - \sum_{j\ne i} a_{ij}x_j^{(k)}\right)$.
```fortran
PROGRAM JACOBI
    IMPLICIT NONE
    INTEGER, PARAMETER :: N = 3
    REAL :: A(N,N), B(N), X(N), XNEW(N)
    INTEGER :: I, J, K

    A = RESHAPE([4.0,1.0,2.0, 1.0,5.0,1.0, 2.0,1.0,3.0], [N,N])
    B = [4.0, 7.0, 3.0]
    X = 0.0

    DO K = 1, 25
        DO I = 1, N
            XNEW(I) = B(I)
            DO J = 1, N
                IF (J /= I) XNEW(I) = XNEW(I) - A(I,J) * X(J)
            END DO
            XNEW(I) = XNEW(I) / A(I,I)
        END DO
        X = XNEW
    END DO

    PRINT *, 'Solution: ', X
END PROGRAM JACOBI
```
:::

:::counterexample
**Statement that looks true:** "FORTRAN arrays are 0-indexed, like C or Python."

**Counterexample:** `REAL :: A(10)` declares indices `1` through `10` by default in FORTRAN — accessing `A(0)` is out of bounds unless you explicitly declare `REAL :: A(0:9)`.

**Why it fails:** FORTRAN's default array indexing convention is 1-based, a frequent source of off-by-one bugs for students coming from C-family languages.
:::

## Common mistakes

:::mistake
Omitting `IMPLICIT NONE` and then misspelling a variable name — FORTRAN silently creates a new variable (defaulting to `INTEGER` or `REAL` based on the first letter) instead of raising an error, causing bugs that are very hard to trace.
:::

:::mistake
Using integer division accidentally — `1/2` in FORTRAN evaluates to `0` (integer division) unless at least one operand is declared/cast as `REAL`. Numerical methods relying on fractions like `1.0/2` must be written with explicit decimal points.
:::

## Applications

:::application
Every numerical method from MTH 306 (Jacobi, Gauss–Seidel, Newton's method, Runge–Kutta, Adams–Bashforth) can be directly transcribed into a FORTRAN `DO`-loop implementation following the pattern shown above — MTH 350's lab exercises are exactly these implementations.
:::

## Exam-ready answer

:::examready
A minimal FORTRAN program needs `PROGRAM name`, `IMPLICIT NONE`, explicit type declarations, and `END PROGRAM name`. Loops use `DO i = start, end ... END DO`; conditionals use `IF (...) THEN ... END IF`; arrays default to 1-based indexing. Always declare `IMPLICIT NONE` and watch for accidental integer division.
:::

## Viva preparation

:::viva
**Q: Why should you always write `IMPLICIT NONE`?**
Without it, FORTRAN silently infers variable types from the first letter of the name and creates undeclared variables automatically — masking typos as new (wrongly-initialized) variables rather than compile errors.

**Q: What does `1/2` evaluate to in FORTRAN, and why?**
`0`, because both operands are integers, triggering integer division; write `1.0/2` or `1/2.0` for the real result `0.5`.
:::

## Practice / lab exercises

:::example Practice — Level 2 (Lab)
Write a FORTRAN program implementing Newton's method to find a root of $f(x)=\cos x - x$ starting from $x_0=0.5$.
:::

:::example Practice — Level 4 (Lab / debugging)
The following snippet is intended to compute the average of an array but has a bug — find and fix it:
```fortran
REAL :: A(5), AVG
INTEGER :: I, SUM
A = [1.0, 2.0, 3.0, 4.0, 5.0]
SUM = 0
DO I = 1, 5
    SUM = SUM + A(I)
END DO
AVG = SUM / 5
```
(Hint: two separate bugs — one about variable naming/typing, one about integer division.)
:::

## Topic mastery checklist

- I can write a minimal, correctly structured FORTRAN program with `IMPLICIT NONE`.
- I can translate a `DO` loop and an `IF/THEN/ELSE` block correctly.
- I know FORTRAN's default array indexing convention.
- I can spot an accidental integer-division bug.
