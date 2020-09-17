---
layout: post
hidden: true
title: 简单统计城市的天气情况
date: 2019-01-05 16:19
tags: Mathematica
category: JustForFun
note: "此文为旧博客搬运。 ——2020.05.17"
---

前两天在刷订阅号的时候看到了“象限仪座流星雨”，就在这两天。按以前也许还会查看下天气情况，但经过这几年的“熏陶”，我早已波澜不惊了——不用多想，在福州是肯定看不到的。福州的晴空——尤其是夜里的晴空——少得可怜。即便在秋高气爽的那么短短几天，到夜里的时候还是会云层密布。非常影响心情！为了验证下我的这种感觉，我从网上爬了点相关的数据，简单查看了下。

这里使用的数据来自“[天气后报](http://www.tianqihoubao.com/){:target="_blank"}”网站（假定上面数据是可靠的），简单来讲，我这里是要用 Mathematica 爬取相关数据，然后简单统计下。

首先，我们先定义一个指向指定 `城市`  和 `月份`  的历史天气链接的函数：

```mathematica
url[city_String, date_Integer] := 
 "http://www.tianqihoubao.com/lishi/" <> city <> "/month/" <> 
  ToString[date] <> ".html"
```

比如输入`"fujianfuzhou"` 和 `201811` 就会有

```mathematica
url["fujianfuzhou",201811]
(*http://www.tianqihoubao.com/lishi/fujianfuzhou/month/201811.html*)
```

打开这个页面，我们发现我们关注的数据以表格的形式给出：

![fuzhouweatherhistory]({{site.jsdelivr.url}}/assets/img/fuzhouweatherhistory.JPG)

html 页面中的数据一般存储在列表 `<li>..</li>` 或者表格 `<table>..</table>` 里面，利用Mathematica `Import` 函数并指定 `"Data"`元素即可将其提取出来：

```mathematica
importdata[dataurl_String] := 
 Import[dataurl, "Data", 
  CharacterEncoding -> "MacintoshChineseSimplified"]
```

这里我们利用 `"MacintoshChineseSimplified"` 字符编码来提取简体字，要不然会是一堆乱码。其它的可能也可以（？）。

尝试提取一个月份的数据看下其数据结构：

```mathematica
data = importdata[url["fujianfuzhou", 201811]];
Short[data,5]
```

可得到如下结果

![shortdata]({{site.jsdelivr.url}}/assets/img/shortdata.JPG)

可以看出，除了表格里的内容，还有很多不需要的数据。我们先查看下所需数据所在的层次：

```mathematica
FirstPosition[data, " 日期"]
(*{2, 1, 1, 1, 1}*)
```

因此，我们需要的数据所在的层次就是 `{2,1,1}` 了：

```mathematica
table = data[[2, 1, 1]];
Short[table, 5]
```

![shortdata2]({{site.jsdelivr.url}}/assets/img/shortdata2.JPG)

正好就是我们所需的数据表格了。

我们再写两个简单的函数来分别提取白天和晚上的天气：

```mathematica
day = StringTrim[StringCases[#, x__ ~~ "/" ~~ _ -> x]] & ;
night = StringTrim[StringCases[#, _ ~~ "/" ~~ x__ -> x]] & ;
```

例如，我们可以查看下2018年11月份白天和晚上的天气情况：

```mathematica
day /@ table[[2 ;;, 2]] // Flatten // Counts
(*<|"小雨" -> 15, "中雨" -> 2, "阴" -> 6, "多云" -> 7|>*)

night /@ table[[2 ;;, 2]] // Flatten // Counts
(*<|"中雨" -> 2, "阴" -> 12, "多云" -> 6, "小雨" -> 10|>*)
```

至此，把前述函数整合成给出指定城市指定月份白天和黑夜的天气情况的函数：

```mathematica
daycount[city_String, date_Integer] :=
 Module[
  {data, table, dayweather, nightweather},
  PrintTemporary[date];
  data = importdata[url[city, date]];
  table = data[[2, 1, 1]];
  dayweather = Counts[Flatten[day /@ table[[2 ;;, 2]]]];
  nightweather = Counts[Flatten[night /@ table[[2 ;;, 2]]]];
  Association["day" -> dayweather, "night" -> nightweather]
  ]
```

比如：

```mathematica
daycount["fujianfuzhou", 201811]
(*<|"day" -> <|"小雨" -> 15, "中雨" -> 2, "阴" -> 6, "多云" -> 7|>, 
 "night" -> <|"中雨" -> 2, "阴" -> 12, "多云" -> 6, "小雨" -> 10|>|>*)
```

当然，我们还想要指定多个月份的天气统计情况，比如从2018年1月到2018年12月。因此，写个简单的函数给出指定月份范围的整数型表达式：

```mathematica
monthlist[startdate_Integer, enddate_Integer] /; startdate <= enddate := 
 If[Mod[#, 100] > 12 || Mod[#, 100] == 0, Nothing, #] & /@ Range[startdate, enddate]
```

然后把 `daycount` 函数 `Map` 到月份列表上即可：

```mathematica
rangecount[city_String, startdate_Integer, enddate_Integer] /; startdate <= enddate :=
 Module[
  {data},
  data = AssociationMap[daycount[city, #] &, 
    monthlist[startdate, enddate]];
  Association[
   "day" -> Merge[#["day"] & /@ Values[data], Total],
   "night" -> Merge[#["night"] & /@ Values[data], Total]
   ]
  ]
```

我们先看下福州2018年的天气情况：

```mathematica
fz=rangecount["fujianfuzhou", 201801, 201812]
(*
<|"day" -> <|"多云" -> 134, "阴" -> 79, "中雨" -> 19, "小雨" -> 78, 
   "大雨" -> 8, "晴" -> 22, "雷阵雨" -> 24, "零散雷雨" -> 1, "大暴雨" -> 1|>, 
 "night" -> <|"多云" -> 162, "阴" -> 76, "小雨" -> 86, "中雨" -> 13, 
   "大雨" -> 3, "晴" -> 17, "雷阵雨" -> 7, "雷雨" -> 1, "暴雨" -> 1|>|>
*)
```

夜间晴的天数只能用“惨惨惨”来形容了。

画成柱状图为：

```mathematica
BarChart[#, LabelingFunction -> (Placed[#, Above] &), 
   ChartLabels -> Keys[#], PlotLabel -> Style["福州夜间天气情况", 14]] &@fz[
  "night"]
```

![fznightweather]({{site.jsdelivr.url}}/assets/img/fznightweather.jpg)

作为对比，简单查看下待过的北京和香港的天气情况：

```mathematica
rangecount["beijing", 201801, 201812]
(*
<|"day" -> <|"晴" -> 142, "多云" -> 162, "阴" -> 14, "小雪" -> 2, 
   "雨夹雪" -> 1, "扬沙" -> 1, "小雨" -> 16, "中雨" -> 2, "雷阵雨" -> 21, 
   "大雨" -> 2, "雾" -> 2, "浮尘" -> 1, "霾" -> 1|>, 
 "night" -> <|"多云" -> 164, "阴" -> 14, "晴" -> 137, "小雪" -> 2, 
   "小雨" -> 12, "雷阵雨" -> 29, "大雨" -> 1, "中雨" -> 6, "霾" -> 2|>|>
*)
```

果然是帝都，天气的名词都这么多。那晴天数，实在让人口水。

```mathematica
rangecount["xianggang", 201801, 201812]
(*
<|"day" -> <|"多云" -> 235, "阴" -> 11, "小雨-中雨" -> 3, "小雨" -> 46, 
   "晴" -> 8, "阵雨" -> 19, "雷阵雨" -> 19, "中雨" -> 9, "大雨-暴雨" -> 1, 
   "晴间多云" -> 1, "大雨" -> 11, "暴雨" -> 2|>, 
 "night" -> <|"多云" -> 258, "小雨" -> 20, "中雨-大雨" -> 1, "阴" -> 19, 
   "晴" -> 9, "阵雨" -> 17, "雷阵雨" -> 21, "中雨" -> 9, "大雨" -> 9, 
   "大雨-暴雨" -> 1, "暴雨" -> 1|>|>
*)
```

香港的晴天数比福州还惨。印象里在香港的时候晚上回住的地方路上经常能看到星星，然而在福州几乎没看过。不过可能因为来福州这几年晚上几乎没有出门过。

这里我只关注一年或一个月里晴天的数量，而对观星影响非常大的温度以及光污染这里没有涉及。不过可以确定的是，在福州当一个天文（观星）爱好者不是一件容易的事情。

从数据“挖掘”的角度来看，可以一次性把所有城市的数据都爬下来，然后 `DumpSave` 起来，后面重复利用时效率就高多了。还可以“大数据”对比/寻找下各大城市，给个观星“友好城市”排名:) 不过这些都是 minor 的事情了。

**参考**：

* <https://reference.wolfram.com/language/howto/CleanUpDataImportedFromAWebsite.html>{:target="_blank"}
* <http://blog.wolfram.com/2018/03/02/web-scraping-with-the-wolfram-language-part-1-importing-and-interpreting/>{:target="_blank"}