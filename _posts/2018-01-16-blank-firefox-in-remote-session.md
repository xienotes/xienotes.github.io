---
layout: post
hidden: true
title: 远程桌面火狐窗口呈空白
date: 2018-01-16 09:49
tags: [Firefox, Anydesk]
category: HandyTools
note: "此文为旧博客搬运。 ——2020.05.17"
---

[Anydesk](https://anydesk.com/remote-desktop){:target="_blank"} 可以穿透外网和内网建立远程连接，比如希望在家里（外网）远程登录办公室的电脑（内网），则可以在两个电脑上分别安装Anydesk，然后通过帐号连接即可（Anydesk 还有移动版，也可以在手机上操作）。Anydesk 至今好像还没开发出[连接时自动锁定远程屏幕的功能](http://support.anydesk.com/forums/251923-general/suggestions/6011250-disable-remote-screen){:target="_blank"}，因此我现在的做法只是简单地把远程的屏幕关掉，并阻止远程的鼠标和键盘输入。

今天发现这么做有一个问题（除了最重要的隐私问题），就是 Firefox 打开的时候都是一片空白，而其他软件暂时没有问题。搜索了一下，发现可能是 Firefox 默认的（显卡）硬件加速引起的。如果关闭屏幕，Firefox 窗口就不能正常渲染了。

解决方式：在火狐里 `Option`—`General`—`Performance`，然后把 `Use recommended performance settings` 前的勾去掉，再把显示出来的 `Use hardware acceleration when available` 前的勾去掉即可。 此解决方法对 Firefox 57.0.4. 可用。

**来源**：<https://support.mozilla.org/en-US/questions/1097257>{:target="_blank"}

