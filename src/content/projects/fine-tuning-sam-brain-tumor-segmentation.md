---
title: "Parameter-Efficient Adaptation of SAM for Brain Tumor Segmentation"
subtitle: "Undergraduate Research Assistant (Team Leader), Deep Intelligence Laboratory, Harbin Engineering University"
summary: "Adapted and evaluated SAM-based models for multimodal brain MRI segmentation on BraTS 2020, investigating domain-specific adaptation under limited labeled medical data."
year: "Dec. 2024 - Jan. 2025"
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

Led the adaptation and evaluation of SAM-based models for multimodal brain MRI segmentation on the BraTS 2020 dataset, investigating domain-specific adaptation under limited labeled medical data.

## Data Preparation

Designed a modality-aware preprocessing pipeline by converting 3D MRI volumes into normalized pseudo-RGB slices from FLAIR, T1ce, and T2 modalities. Generated WT/TC/ET masks and patient-level splits to prevent data leakage.

## Fine-Tuning Strategy

Implemented parameter-efficient fine-tuning by freezing the Image Encoder and Prompt Encoder while optimizing only the Mask Decoder with stochastic box prompts and BCE-Dice loss, reducing trainable parameters and overfitting risk.

## Results

Validated SAM-based adaptation on BraTS 2020, achieving an average Dice score of 0.7984 with MedSAM and developing an interactive web-based prototype for prompt-guided tumor segmentation.
