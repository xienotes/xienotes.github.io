---
layout: post
hidden: true
title: 批处理列出所有子文件夹中的文件名
date: 2017-07-06 16:35
tags: [batch, bash]
category: HandyTools
note: "此文档为旧博客搬运。——2020.05.11"
---

好吧，在处理一些无聊的文件，需要把当前目录下所有子文件中的文件名都提取出来，不要文件的完全路径。批处理命令如下：

``` batch
@ECHO OFF

REM %1 is the input filename for the output
REM if file exists, delete it
IF EXIST %1 (
	DEL %1
	)

FOR /D /r %%G IN ("*") Do (
	CD %%G
	REM append the file list name to filelist
	DIR /B >> ../%1
	CD ..)

ECHO DONE
```

其中 `>>` 表示把`dir`的输出append到已有的文件里面。把上述文件命名为 `listfile.bat` 。在`cmd` 里面输入 `listfile filelist.dat`，则所有文件的输出都在`filelist.dat` 文件里面。

上述命令行有个问题：如果文件名有数字，如`1,2,...,n`，则输出时候会出现`11`在`2`前面的情况。因为`dir`并不是自然排序。一种方法是把文件名数字前面补`0` （可再写batch file 或者用Total Commander批量重命名），或者，直接用`ls -cv` bash 命令来吧……

```bash
#!/bin/bash
# no space before and after =
filename=filelist.txt

# remove the file if it already exists
if [ -f $filename ]
then
	rm $filename
fi

for dir in */
do
	cd $dir
	ls -cv | sed -e 's/\.\(doc\|docx\)$//' >> ../$filename
	cd ..
done
echo "done"
```

`sed`部分主要用来去掉`.doc`和`.docx`的扩展。另：bash文件用`./bashfilename`来运行。

**参考**

* <https://ss64.com/nt/for_d.html>{:target="_blank"}
* <https://stackoverflow.com/questions/18748744/read-files-in-directory-in-order-of-filename-prefix-with-batch>{:target="_blank"}
* <https://unix.stackexchange.com/questions/33909/list-files-sorted-numerically>{:target="_blank"}
* <https://stackoverflow.com/questions/2107945/how-to-loop-over-directories-in-linux>{:target="_blank"}
* <https://www.cyberciti.biz/faq/bash-for-loop/>{:target="_blank"}