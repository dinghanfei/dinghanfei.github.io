---
title: "Multimodal Fault Diagnosis for Microservice Systems"
subtitle: "Undergraduate Thesis Project, Harbin Engineering University"
summary: "A three-stage multimodal fault diagnosis tool integrating logs, traces, and metrics for joint anomaly detection and root cause localization in microservice systems."
year: "Mar. 2025 - Jun. 2025"
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

Independently designed and implemented a three-stage multimodal fault diagnosis tool as an undergraduate thesis project, integrating logs, traces, and metrics for joint anomaly detection and root cause localization.

## Multimodal Feature Fusion

Encoded heterogeneous observability signals with modality-specific encoders and GLU-based adaptive fusion to generate service-level node embeddings.

## Graph Representation Learning and Joint Diagnosis

Constructed service invocation graphs and learned topology-aware representations with GAT and GGNN to capture dynamic service dependencies and long-range fault propagation. Developed a parameter-shared joint classifier for cascaded anomaly detection and root cause localization.

## Results

Achieved the best overall performance among multiple baselines across five evaluation metrics on the Eadro dataset and received the Outstanding Undergraduate Thesis (Design) Award.
