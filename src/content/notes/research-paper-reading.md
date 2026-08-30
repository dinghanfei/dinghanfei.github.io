---
title: "Practical Guide to Reading Research Papers"
summary: "A practical workflow for finding, reading, organizing, and reviewing academic papers."
category: "Research Methods"
order: 20260816
format: "Markdown"
icon: "READ"
tags: ["Research","Paper Reading","Workflow"]
---
# 读论文方法技巧

## 读论文方法技巧

➡️方法来自：[浙大计算机博士教你如何高效阅读学术论文](https://www.bilibili.com/video/BV13v4y1w7KG/?share_source=copy_web&vd_source=d80f309439bdd49df0b0808ccb80749a)

## 分类

1.没有任何价值的论文

→ 干脆不看

2.值得了解的论文

→ 大致看一遍，了解方法的大致水平和方法的大致思路即可

3.值得精读的论文

→ 花时间认真看，认真推敲细节。

4.经典论文

→搞清细节 + 复现

## 学术论文的结构

学术论文的八股文结构：

- 摘要abstract
- introduction
- 介绍问题的背景，作者提出的方法和创新点，大致的实验效果。
- related work
- 介绍本文的相关工作
- approach
- 介绍本文提出的方法的细节
- experiments
- 可以支撑本文所提出方法的实验细节
- conclusions
- 和introduction相互呼应

## 阅读论文的顺序和方法

一开始**不要**纠结细节，先掌握整体的思想。先读两遍摘要，好的`Abstract`包含的三个问题

①我们处理的是什么问题？

②针对这个问题我们提出了什么方法和创新点？

③我们的方法取得了何种效果？

跳过中间部分直接看`experiments`（计算机论文信息密度最大的部分，最能体现出作者提出方法的价值），注意：

①作者的实验环境是怎么搭建的？（使用了什么样的数据集、测试方法、评估指标）

②作者跟什么方法进行比较？ 一般跟领域经典方法或者SOTA（state of the art）方法进行比较才有说服力

③作者的方法取得了何种定性或定量的效果？

第二类论文读到这基本就可以了

接着看`introduction`部分，这是详细版的摘要。会详细讲述：

①前人遇到的困难

②作者为什么提出这样的方法

看完这里，基本上对论文的思路和创新点都有了较为详细的了解。

细节性的推导和算法的具体实现就要看论文的`approach`部分了。尤其是需要精读和复现的论文，这一部分要慢下来 **反复阅读+推导/讲解给他人** 以加速自己的理解，直到完全读懂。

最后就是读`related work`,这一部分服务于不是很了解这个领域的情况，可以看一些高引的`survey paper`
