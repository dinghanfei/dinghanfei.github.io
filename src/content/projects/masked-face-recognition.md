---
title: "Masked Face Recognition with Machine Learning and OpenCV"
subtitle: "Team Leader, Visual Computing Summer Research Program, National University of Singapore"
summary: "Developed a machine learning and OpenCV-based face recognition system for both masked and unmasked faces, addressing the performance degradation of conventional face recognition methods under facial occlusion."
year: "Jul. 2023"
order: 202307
section: "research"
image:
  src: "/projects/masked-face-recognition/nus-summer-workshop.jpg"
  alt: "NUS computer vision summer research program"
tags:
  - Computer Vision
  - OpenCV
  - dlib
  - SIFT
  - SVM
  - KNN
  - Random Forest
accent: "teal"
links:
  - label: "Poster"
    href: "/projects/masked-face-recognition/poster.pdf"
  - label: "Slides"
    href: "/projects/masked-face-recognition/slides.pdf"
---

## Overview

Developed a machine learning and OpenCV-based face recognition system for both masked and unmasked faces, addressing the performance degradation of conventional face recognition methods under facial occlusion.

## Dataset and Feature Extraction

Constructed a masked-face dataset using facial landmarks extracted with dlib, and processed facial features with Gaussian blur, mean filtering, and SIFT-based feature extraction.

## Models and Results

Trained and compared SVM, KNN, and Random Forest classifiers, and designed a final decision model that achieved a 100% stranger interception rate, an 86% registered-user pass rate, and 85% overall recognition accuracy.
