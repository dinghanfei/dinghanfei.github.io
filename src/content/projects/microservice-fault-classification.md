---
title: "Design and Implementation of a Fault Classification Tool for Microservice Systems"
subtitle: "Undergraduate Thesis Project, Harbin Engineering University"
summary: "Outstanding Undergraduate Thesis Award, Harbin Engineering University, 2025: A multimodal fault classification tool for microservice systems, designed to improve fault diagnosis under complex runtime environments."
year: "Jun. 2025"
order: 202506
image:
  src: "/projects/microservice-fault-classification/multimodal_data_fusion_module.png"
  alt: "Fault classification tool project"
tags:
  - Microservice Systems
  - Fault Diagnosis
  - Multimodal Learning
  - GAT
  - GGNN
accent: "indigo"
links:
  - label: "Slides"
    href: "/projects/microservice-fault-classification/2021108303-dinghanfei.pdf"
---

## Overview

A multimodal fault classification tool for microservice systems, designed to improve fault diagnosis under complex runtime environments. The project integrates logs, traces, and metrics through a three-stage framework consisting of feature fusion, graph representation learning, and joint diagnosis.

## Multimodal Feature Fusion

I designed a multimodal feature extraction module that encodes log intensity features, extracts trace temporal patterns with dilated causal convolution, and captures metric dependencies using multi-head attention. The extracted features are adaptively fused with GLU to generate node embeddings for service invocation graphs.

## Graph Representation Learning and Joint Diagnosis

To model service dependencies, I implemented a graph representation learning module based on GAT and GGNN, combined with attention pooling for global system representation. A parameter-shared joint classifier was further designed for anomaly detection and root cause localization.

## Results

Experiments on the Eadro dataset show that the proposed GAT+GGNN fusion architecture achieves the best overall performance among several baseline models and outperforms Eadro on all evaluated metrics except convergence speed.
