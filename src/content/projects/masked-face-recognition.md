---
title: "Masked Face Recognition with Machine Learning and OpenCV"
subtitle: "National University of Singapore, Computer Vision Summer Research Program"
summary: "A machine learning and OpenCV-based project for masked and unmasked face recognition, designed to address the reduced accuracy of traditional face recognition systems when users wear facial masks."
year: "Jul. 2023"
order: 202307
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

## Implementation
The project constructed a masked-face dataset by extracting facial landmarks with dlib, processed facial features using Gaussian blur, mean filtering, and SIFT, and trained recognition models with SVM, KNN, and Random Forest. A final decision model was developed to improve recognition reliability.
## Results
99% stranger interception rate, 92% registered-user pass rate, and 86% overall recognition accuracy.
