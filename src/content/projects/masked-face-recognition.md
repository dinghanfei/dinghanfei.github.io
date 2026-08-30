---
title: "Masked Face Recognition with Machine Learning and OpenCV"
subtitle: "Team Leader, Visual Computing Summer Research Program, National University of Singapore"
summary: "Developed a machine learning and OpenCV-based face recognition system for both masked and unmasked faces, addressing the performance degradation of conventional face recognition methods under facial occlusion."
year: "May 2023 - Jul. 2023"
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

Developed an OpenCV-based face recognition system for masked and unmasked faces, addressing recognition degradation under facial occlusion.

## Dataset and Feature Extraction

Built a masked-face dataset using dlib facial landmarks, generated Gaussian-blurred and mean-filtered variants, and extracted SIFT descriptors for robust facial representation.

## Models and Results

Configured five decision branches using SVM, KNN, and Random Forest with different preprocessing strategies. Combined their outputs through a rule-based decision scheme, correctly rejecting 100% of unknown users, accepting 86% of registered users, and achieving 85% overall accuracy.
