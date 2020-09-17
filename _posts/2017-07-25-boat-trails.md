---
layout: post
hidden: true
title: 船只经过后的平静水面
date: 2017-07-25 0:34
tags: [mechanics, fluid, wave, physics]
category: JustForFun
note: "此文档为旧博客搬运。——2020.05.11"
---

今天在下山去海边途中又看到了如图中所示的波纹痕迹, 那些波纹是船只经过后留下的, 看起来比周边要相对比较平静, 而且保持的时间很久（拍照时已经看不到船只, 而且从拍照到海边兜一圈回来经过时波纹还在, 时间大概有二三十分钟）.

<img src="{{site.jsdelivr.url}}/assets/img/boat_trails.jpg" style="width: 80%" />

因为这很不像船只经过时的Kelvin Wake, 我跟lcq猜测了下可能的原因: 

* 船只经过时螺旋桨搅动导致水里气体/物质（如浮游植物）发生变化, 因为物质发生变化导致光线反射/散射情况与周边不同, 但是仍然很难相信在周边那么明显波动情况下时间会持续这么久;
* 船只经过后形成的turbulence, 想不出如何联系起来.

晚上回来后, 稍微查了下, 有各种各样的解释: 如 [Reddit](https://www.reddit.com/r/askscience/comments/1mzw5s/why_do_boats_often_leave_paths_of_calm_water/){:target="_blank"} 给出的理由是因为船只经过后形成的 turbulence 需要比较大的能量才能改变状态, 而水波比较平静且没什么风, 但一是很怀疑维持这个状态的时间尺度, 另外也经常在波浪比较大的情况下看到这种情况; [The Naked Scientists](https://www.thenakedscientists.com/articles/questions/why-do-boat-trails-last-so-long){:target="_blank"} 给出的理由是深水开阔水域船只经过后产生的漩涡因为角动量守恒, 如果没有碰到什么固体物质的话就很难消失, 就像飞机经过后形成的[翼尖涡旋](https://en.wikipedia.org/wiki/Wingtip_vortices){:target="_blank"}一样, 但很显然水的“阻尼”应该比空气大很多, 应该可以很快耗散掉那角动量(?); 找来找去后来终于看到 [A Moment of Science](http://indianapublicmedia.org/amomentofscience/a-smooth-wake/){:target="_blank"} 有提到船只经过后的平静“兴波" (smooth wake), 理由是海水表面附近有很多的浮游生物 (有机物), 船只经过时推动前面海水往两边流动, 从而使得船只两边的条带上有机物质相对更多, 这条有机物质带能有效的抑制小波动, 保护中间部分, 好像跟所关注的问题更为接近, 但是没解释为什么有机物质条带能够抑制住小波动. 不过顺着这条思路, 用organic film, wave 之类的搜一下, 然后就搜到了 [*The Effect of Organic Films on Water Surface Motions*](https://link.springer.com/chapter/10.1007%2F978-94-009-4668-2_15){:target="_blank"} 这篇文章, 简单看了下摘要, 于是发现了我认为最靠谱的答案关键词：**pouring oil on troubled water**.

先看下油管上关于这个现象的两个视频:

<iframe width="560" height="315" src="https://www.youtube.com/embed/00PPPt7EJqo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/f2H418M3V6M" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

这句话在英文里是个俗语, 指平息争吵或纠纷, 可见人们应该很早就知道了油可以使水波平静下来这个现象. 中文没听说过相关的词语, 也导致了搜索这个现象花了那么多时间. 本杰明·富兰克林 (Benjamin Franklin) 最早开始研究了这个现象, 但并不知道其原理. 最近(2007...)发表在 *American Journal of Physics* 的文章 [*The calming effect of oil on water*](http://aapt.scitation.org/doi/full/10.1119/1.2710482){:target="_blank"} 给出了其原理(另参见 [physics.stackexchange](https://physics.stackexchange.com/questions/202213/pouring-oil-on-choppy-water-to-calm-it-does-it-work-and-if-so-how){:target="_blank"} 上的解读): 简单来讲, 波形成需要外部的能量输入, 不管是从周边的水波传递过来, 还是风吹过来. 单分子油层的存在使得周边水波传递过来的能量马上被耗散掉[^dissipation], 同时使得风更难“带动"水(减少风传递给水的能量), 二者的共同作用使得水波更难形成, 也即油层的存在使得水面平静下来. 

根据这项研究以及视频所见, 我觉得我所见到的船只经过后的保持很长时间的"平静水面"是因为船只发动机“漏"油[^oil], 水面油层的存在使得水面平静了下来. 当然, 这还有待进一步的观察和验证. 

2017年7月25日 写于 香港

----

2017年7月31日补充: 

目前停留在两个猜测上面:

1. 前面提到的微生物被排开, 而且在深海, 微风情况下, 水流对流比较小, 微生物大部分在竖直平面做圆周运动[^surfacewave], 微生物分布不均匀引起的光线不一致, 疑问在于这种"不均匀"情况能维持多久. 
2. “油层"说, 不过疑问在于是否真的有漏油. 

仍然需要想想如何进一步的观察或者如何做实验以排除或验证上述假说.


[^dissipation]: 具体如何被耗散参见原文(这句话的意思是我暂时也不清楚能量通过Gibbs surface elasticity耗散是怎么一回事), 不过值得注意的是, 油层对表面张力的影响在平静水波现象中的作用是次要的. 
[^oil]: “漏"加引号是因为并不是大的漏, 而是发动机周边出现的比如加油过程中漏出来的情况, 量虽不大, 但是考虑油层形成的是单分子层, 可覆盖面积也是很可观的. 另上文提到的“有机物质"条带, 因为其是悬浮在水中, 所以很难说可以跟浮在水面的油层现象相类比.
[^surfacewave]: <http://www.feynmanlectures.caltech.edu/I_51.html#Ch51-S4>{:target="_blank"}