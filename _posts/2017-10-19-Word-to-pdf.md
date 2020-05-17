---
layout: post
hidden: true
title: 批量 Word 转 PDF
date: 2017-10-19 10:05
category: HandyTools
tags: script
note: "此文为旧博客搬运。 ——2020.05.17"
---

又是无聊的办公需求，需要将目录下所有 word 文档 (.doc 或 .docx)转成 pdf 格式的，一个一个点开 save as 不是办法，于是上网找了下，「也许」有两种办法吧。

1. [**PowerShell Script**](https://gallery.technet.microsoft.com/office/Script-to-convert-Word-f702844d){:target="_blank"}

   利用 Office 官网上提供的 Powershell 脚本，运行中可能会出现 `execution of scripts is disabled on this system` 的错误（微软的东西就是如此的不友好），解决办法参见 <https://stackoverflow.com/questions/4037939/powershell-says-execution-of-scripts-is-disabled-on-this-system>{:target="_blank"}, 不过解决后仍然没有转换成功，就没再试了。

2. [**DocTo**](https://github.com/tobya/DocTo){:target="_blank"}

   把 DocTo 下载后，把相应目录添加到环境变量后，就可以在任意文件夹里调用了。针对当前情况，在有嵌套目录下的 word 文档转换，并且希望转换后的 PDF 文档就在相应目录里，可用如下命令行：

   ```
   docto -f . -T wdFormatPDF -OX .pdf
   ```

   更详细的命令可参见 <https://github.com/tobya/DocTo>{:target="_blank"}