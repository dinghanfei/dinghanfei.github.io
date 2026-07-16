---
title: "Fine-Tuning SAM for Brain Tumor Segmentation"
subtitle: "Team Leader, Undergraduate Research Assistant, Deep Intelligence Laboratory, Harbin Engineering University"
summary: "Adapted SAM and MedSAM to BraTS 2020 brain tumor segmentation through data-efficient and parameter-efficient fine-tuning."
year: "Dec. 2024"
order: 202412
section: "research"
image:
  src: "/projects/fine-tuning-sam-brain-tumor-segmentation/SAM.jpg"
  alt: "SAM"
tags:
  - Medical Image Segmentation
  - SAM
  - MedSAM
  - BraTS 2020
  - MRI
accent: "indigo"
links:
  - label: "GitHub"
    href: "https://github.com/dinghanfei/Fine-Tuning-SAM-for-Brain-Tumor-Segmentation"
  - label: "Slides"
    href: "/projects/fine-tuning-sam-brain-tumor-segmentation/slides.pptx"
---

## Overview

Adapted SAM and MedSAM to BraTS 2020 brain tumor segmentation through data-efficient and parameter-efficient fine-tuning.

## Data Preparation

Constructed pseudo-RGB MRI inputs from FLAIR, T1ce, and T2 modalities and generated WT/TC/ET binary masks for hierarchical tumor-region segmentation.

## Fine-Tuning Strategy

Fine-tuned only the Mask Decoder with stochastic box prompts and BCE-Dice loss while freezing the Image Encoder and Prompt Encoder to reduce computational cost and overfitting risk.

## Results

Achieved an average Dice score of 0.7984 with MedSAM, outperforming SAM ViT-B and SAM ViT-H baselines, and built an interactive web-based tumor segmentation prototype.
