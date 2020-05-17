---
layout: post
hidden: true
title: LaTeX Snippet for Optimization Problems
date: 2018-06-06 09:05
tags: LaTeX
category: CodePlay
mathjax: true
note: "此文为旧博客搬运。 ——2020.05.17"
---

LaTeX snippet for constructing an optimization problem

```latex
\begin{equation*}
\begin{aligned}
    & \underset{\beta_0,\beta}{\text{maximize}} 
    & &  M  \\
    & \text{subject to} 
    & &  \dfrac{y_i(\beta^Tx_i+\beta_0)}{\lVert \beta \rVert} \geq M,  \; \forall i=1,2,\dots,N.
\end{aligned}
\end{equation*}
```

The output looks like the following:

$$
\displaystyle
\begin{equation}
\begin{aligned}
    & \underset{\beta_0,\beta}{\text{maximize}} 
    & &  M  \\\\
    & \text{subject to} 
    & &  \dfrac{y_i(\beta^Tx_i+\beta_0)}{\lVert \beta \rVert} \geq M,  \; \forall i=1,2,\dots,N.
\end{aligned}
\end{equation}
$$

Note that directly using `align` environment may introduce large space between columns. The positions of multiple ampersand sign `&` are to accommodate the left/right alternating alignments.

**Ref:**    
<https://jcnts.wordpress.com/2009/11/11/formatting-optimization-problems-with-latex/>{:target="_blank"}