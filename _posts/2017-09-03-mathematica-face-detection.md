---
layout: post
hidden: true
title: Mathematica 人脸识别
date: 2017-09-03 08:49
tags: [Mathematica]
category: CodePlay
note: "此文为旧博客搬运。 ——2020.05.17"
---
虽然还有十来天才开学，而且还有一个多月才开始上课（学生有实习），我已经在想能否利用 Mathematica 的人脸识别功能自动拍照点名——也是在家无聊憋的，我上课可从不点名。

Mathematica 内嵌进行人脸识别的函数是 [`FindFaces`](http://reference.wolfram.com/language/ref/FindFaces.html){:target="_blank"}，可如下使用：

```Mathematica
FindFaces[image]
```

`image` 为拟用于识别的图像，可以从外部 `Import`，自然在 Mathematica 里面也可以直接手动将图片拖到界面输入行。该函数返回的是识别出来的人脸头像的方框坐标列表，对应于每个方框的左下角点和右上角点，形式为 {x<sub>min</sub>, y<sub>min</sub>}, {x<sub>max</sub>, y<sub>max</sub>}。

如果想要简单通过控制拟识别的人脸大小来选择性识别人脸，可以在上述函数里加个尺寸控制的选项：

```Mathematica
FindFaces[image,{min,max}]
```

当然，在我假想的拍照点名系统中，我希望在照片中识别出这些人像后，将这些头像都截取出来，然后跟已有的数据库进行比对 （应该涉及到机器学习，可以用内嵌函数 [`Classify`](http://reference.wolfram.com/language/ref/Classify.html){:target="_blank"} 来实现）。截取头像可通过函数 [`ImageTrim`](http://reference.wolfram.com/language/ref/ImageTrim.html){:target="_blank"} 实现：

```Mathematica
faces = FindFaces[img];
ImageTrim[img, #] & /@ faces
```

这函数看起来很美好，但在实践时发现即使是「简单」的头像都会 miss 掉，人像上下倒立时也更难被识别出来；有时还会相反，把不是人脸的物体识别为人脸，所谓的 false positive。比如索尔维会议（Solvay Conference）物理学家们的合影用 `FindFaces` 识别的话，代码和效果如下：

```Mathematica
img = Import["http://i.imgur.com/M5tCc.jpg"];
HighlightImage[img, {"Boundary", EdgeForm[Thick], Cyan, Rectangle @@@ FindFaces[#] &}]
```

<img src="/assets/solvay-findfaces.jpg">
*用 `FindFaces` 这时可以把人脸都识别出来，但是也把不是人脸的识别为人脸了*

还好，我们可以通过调节用于人脸识别的算法文件来控制人脸识别的准确度。

Mathematica 内部采用的是 [OpenCV](http://opencv.org/){:target="_blank"} 的 *haarcascades* 「训练分类器」（trained classifier）进行人脸识别，其算法通过一个 XML 文件来控制，如在 Mathematica 里面，该文件位于安装目录下：

```Mathematica
FileNameJoin[{$InstallationDirectory,"SystemFiles", "Data", "Haarcacades", "frontalface.xml"}]
```

Mathematica (version 11.1.1) 只提供了这个文件用于人脸识别，OpenCV 的 [Github 库](https://github.com/opencv/opencv/tree/master/data/haarcascades){:target="_blank"}还提供了可用于识别眼睛、鼻子等的训练文件。我们可以通过`TrainingFile` 选项来指定要识别的类型，并通过 `ScaleDecreaseFraction` （数值在 0 和 1 之间，目前采取试错法确定） 选项控制识别的「准确度」。把 Github 库的文件保存到 `$UserDocumentsDirectory` ，可以写个如下的函数来调用：

```Mathematica
findfeatures[image_, file_, opts___] := Module[{features},
  features = FindFaces[image, 
    {"TrainingFile" -> FileNameJoin[{$UserDocumentsDirectory, file}], opts}];
  Show[image, Graphics[{EdgeForm[{Cyan, Thick}], Opacity[0], Rectangle @@@ features}]]]
```

对于上述索尔维会议合影的处理和效果如下

```Mathematica
findfeatures[img, "haarcascade_frontalface_alt2.xml",  "ScaleDecreaseFraction" -> 0.8]
```

<img src="/assets/solvay-findfeatures.jpg">
*指定 `TrainingFile` 和 `ScaleDecreaseFraction` 后的人脸识别*

更多内容参见 [StackExchange](https://mathematica.stackexchange.com/questions/16686/findfaces-how-to-improve-the-results-of-the-face-recognition-feature){:target="_blank"} 原帖。



