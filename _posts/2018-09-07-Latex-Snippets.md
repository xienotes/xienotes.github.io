---
layout: post
hidden: true
title: LaTeX snippets
date: 2018-09-07 12:54
tags: LaTeX
mathjax: true
category: CodePlay
note: "此文为旧博客搬运。 ——2020.05.17"
---

* stopping hyphenation

  ```latex
  \hyphenpenalty 10000
  \exhyphenpenalty 5000
  ```

  **more:** <https://texfaq.org/FAQ-hyphoff>

* line break in a table cell

   `\shortstack`, in the corresponding cell, `\shortstack{a \\ b}`

   or  `makecell` package. 

    **more:** 

     <https://tex.stackexchange.com/questions/2441/how-to-add-a-forced-line-break-inside-a-table-cell>{:target="_blank"}

     <https://tex.stackexchange.com/questions/331716/newline-in-multirow-environment>{:target="_blank"}

* figure/table occupying two columns

  use `\begin{figure*}` environment rather than `\begin{figure}`.

  **more:**

  <https://tex.stackexchange.com/questions/235623/placing-a-figure-in-the-bottom-of-a-page-spanning-the-two-columns-of-an-ieee-doc>{:target="_blank"}

  <https://stackoverflow.com/questions/1856189/fullpage-picture-in-two-column-layout>{:target="_blank"}

* line numbers missing for paragraph with equations followed

   wrap the math environment by  `\begin{linenomath} ` and `\end{linenomath}`, use `linenomath*` if the math equations also need to be line numbered

   **more**:

   <https://tex.stackexchange.com/questions/25784/why-doesnt-lineno-number-a-paragraph-when-it-is-followed-by-an-indented-equatio>{:target="_blank"}

* registered trademark symbol (encircled R)

   ```latex
   \usepackage[T1]{fontenc}
   ```

   then use it as `\textsuperscript{\textregistered}`. 