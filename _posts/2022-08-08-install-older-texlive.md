---
layout: post
hidden: true
title: 安装旧版本 TeX Live
date: 2022-08-08 15:30
tags: LaTeX
category: CodePlay
---

在利用 Techno 提供的 [LaTeX 模板](http://www.techno-press.org/papers/)准备论文时，会发现一个关于 `\setremarkmarkup` 的错误，主要是由于最新版的 `changes` package 里面并没有定义该命令。根据网上信息[^1][^2]，安装旧版的 TeX Live （比如 2017）即可解决。

[TUG 服务器](https://tug.org/historic/)上存档了历史版本的 TeX Live，以南大镜像为例，安装过程如下：

1. 进入 <https://mirror.nju.edu.cn/tex-historic/systems/texlive/2017/tlnet-final/>；
2. 下载 `install-tl.zip`，并解压缩；
3. 进入该目录，命令行运行 `install-tl-advanced.bat -repository https://mirror.nju.edu.cn/tex-historic/systems/texlive/2017/tlnet-final/`，此处需要用 `-repository` 指定安装包的来源；
4. 此后就会跳出安装界面，根据需要点击安装即可。

使用清华镜像安装的时候一直会出现 `open tlpdb failed ... Inappropriate I/O control operation ...` 的错误，换成南大的镜像无此问题。

[^1]: <https://tex.stackexchange.com/questions/584546/error-undefined-control-sequence-in-cls-file>
[^2]: <https://tex.stackexchange.com/questions/605314/using-latex-template-of-techno-press>