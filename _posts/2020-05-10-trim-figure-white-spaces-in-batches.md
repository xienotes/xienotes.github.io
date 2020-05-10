---
layout: post
title: 批量去除图片的白边
category: HandyTools
date: 2020-05-10 09:27
tags: bash
---
有些软件在导出图片时（比如JPEG或者PNG格式）并没有去除白边，可以用图片处理软件点开处理，但是如果图片比较多时，那就有点繁琐了。自然，还是要祭上命令行。

网上简单搜索了下，[ImageMagick][im]{:target="_blank"} 就可以满足要求。ImageMagick 有个 `convert -trim` 命令，如果不再设置其他[选项][option]{:target="_blank"}的话，就自动去除最大范围的白边，例如：
```bash
convert -trim figin.png figout.png
```
则会将图片 `figin.png` 的白边去掉，并存为 `figout.png`。

明确下问题：当前目录下有很多图片，希望一次性将它们的白边都去掉。为了不跟当前的图片混淆，可以新建一个目录 `figout`，用于存放去除白边后的图片。此外，为了区分，所有去除白边后的图片的名字为原名后加上 `out`。

整体代码片段如下：
```bash
#!/bin/bash
mkdir "figout"
for fig in *.png
do 
    figname="${fig%.*}"
    echo $figname
    figout="figout/${figname}-out.png"
    echo $figout
    convert -trim $fig $figout
done
```
其中，获取文件名和后缀的方法参加如下[例子][soexample]{:target="_blank"}：
```bash
~% FILE="example.tar.gz"

~% echo "${FILE%%.*}"
example

~% echo "${FILE%.*}"
example.tar

~% echo "${FILE#*.}"
tar.gz

~% echo "${FILE##*.}"
gz
```

此外，如果是要去除 pdf 文档白边的话，TeX 有个 `pdfcrop` 工具，相当顺手。

[im]: https://imagemagick.org/
[option]: https://imagemagick.org/script/command-line-options.php
[soexample]: https://stackoverflow.com/a/965069

**参考**：
* <https://askubuntu.com/questions/631689/cropping-images-using-command-line-tools-only>{:target="_blank"}
* <https://stackoverflow.com/questions/965053/extract-filename-and-extension-in-bash>{:target="_blank"}
* <https://www.ctan.org/pkg/pdfcrop>{:target="_blank"}
* <https://tex.stackexchange.com/questions/434404/remove-only-top-and-bottom-margins-using-pdfcrop>{:target="_blank"}