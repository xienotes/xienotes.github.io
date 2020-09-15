---
layout: post
hidden: true
title: 将多张图片聚合到一个 PDf 文件
category: HandyTools
date: 2020-09-15 16:08
---
今天一边听网络讲座一边将里面的 PPT 截图保存下来，因为时间紧急，就采用了 QQ 截图发送到我的 iPad 上 QQ 的做法。听完讲座后，在 QQ 里面将图片批量复制出来。复制出来的图片名都是一堆乱七八糟的字符，不过好在都有截图时间。保存到本地后，利用 Total Commander 的批量命名功能，将图片按时间顺序命名为如 `01.png`，`02.png` 等等。

现在有了一堆按顺序命名的图片，需要将其整合到同一个文件里面，如同一个 PDF 文档。简单搜索了一下，发现神器 ImageMagick 的 `convert` 命令可以非常方便地完成这项功能，就一行命令：

```bash
convert *.png out.pdf
```

不过要注意 Windows 也有自带的 `convert` 命令，其功能是将 FAT 转到 NTFS 格式。上述 ImageMagick 的 `convert` 功能是在 Linux （如 Windows 的 WSL）系统里面完成。


**参考**

* <https://stackoverflow.com/questions/8955425/how-can-i-convert-a-series-of-images-to-a-pdf-from-the-command-line-on-linux>{:target="_blank"}