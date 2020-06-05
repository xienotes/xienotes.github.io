---
layout: post
hidden: true
title: “圆弧面”太阳灶
date: 2018-07-05 23:56
tags: Mathematica
category: JustForFun
mathjax: true
note: "此文为旧博客搬运。 ——2020.05.17"
---

油管上看到一个[视频](https://www.youtube.com/watch?v=8CLRTa_ocmo&t=275s){:target="_blank"}，用铝箔制作一个简易太阳灶。从图中可以看出，制作的太阳灶确实能将光线聚焦到焦点上（抛物线的聚光特性，如何证明？:)）。

![太阳灶](/assets/img/paraboladish.jpg)

不过根据制作者后续展示的制作过程来看，这应该是一个圆弧面，而非抛物面。制作者将铝箔固定在平板上，然后往里充气，铝箔相应拱起，在这种情况下形成的曲面应该是个圆弧面（可复习结构力学拱部分）。

![充气](/assets/img/airsustainedsphere.jpg)

那么问题来了，圆弧面怎么还会聚光？

答案其实很简单，因为在弧度很小时（图中弧度确实也不大），抛物线和圆弧非常接近。如下图中给出了圆 $x^2+(y-1)^2=1$ 跟抛物线 $y=a x^2$ （$ a=0.54$）的部分曲线比较。

![](/assets/img/mma-parabola-circle.JPG)

事实上，当 $y$ 很小时，

$$
\begin{align*}
& x^2+(y-1)^2=1 \\\\
\Rightarrow &  x^2 + y^2-2y+1=1 \\\\
\Rightarrow & x^2 - 2y = -y^2 \approx 0 \\\\
\Rightarrow & y \approx 0.5 x^2
\end{align*}
$$

Mathematica 代码：

{% raw %}
```mathematica
circle = Graphics[Circle[{0, 1}, 1]];
Manipulate[
 Show[
  Plot[a x^2, {x, -1, 1}, PlotStyle -> Red, 
   PlotRange -> {{-1.1, 1.1}, {-0.1, 2.2}}, AspectRatio -> 1.],
  circle
  ],
 {a, 0.0, 5, 0.02}]
```
{% endraw %}

