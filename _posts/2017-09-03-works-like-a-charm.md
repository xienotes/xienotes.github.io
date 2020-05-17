---
layout: post
hidden: true
title: It works like a charm
date: 2017-09-03 21:35
tags: 科研
category: BlahBulah
note: "此文为旧博客搬运。 ——2020.05.17"
---

搞科研（或者「被科研搞」）让人激动的时刻不多，大多数时候是无止尽的 [depression](https://www.youtube.com/watch?v=qOtRnb7dThQ){:target="_blank"}。夏天回港「访学」了两个月，算来真正让我觉得 It works like a charm 的感慨的时刻有 2.5 个，虽然不会「[系呢个moment，我要爆咗](https://www.youtube.com/watch?v=QtabT2dOh_M){:target="_blank"}」，还是值得记录一下。

第一是弄清楚了扩展 model 的具体内容。这过程中我清楚了 bounding surface model  和传统 plasticity theory 在 formulation 上处理的不同，以及统一了超哥本构里面没讲清楚的内容，在给出了一定的假设后，顺理成章一路推导下去。让我激动的是，一开始看似毫不相关甚至相互矛盾的地方，后来都 smooth out了, consistent and coherent。It's simply beautiful。

第二算是半个，是由公式推导失误造成的。公式的错误导致代码运行很诡异，在不同方向上 debug 花了好几天，后来发现问题时，只在两行小代码上简单改了下，模型就如我所愿地画出该有的曲线出来了。 ——用个粗俗的比喻，真有便秘良久后突然畅通的感觉。

第三是我用 Mathematica 在 Matlab 的基础上重新 prototype 了模型，写就的 Mathematica 代码出现了几个小 bug， 快速改正后也同样画出了漂亮的曲线，速度也丝毫不亚于 Matlab。我对此很兴奋是因为一直想从 Matlab 转移到 Python 和 Mathematica 上，但每次想用的时候，还是直接开启了 Matlab，因为最顺手。如此以后就可以完全抛弃 Matlab 了。