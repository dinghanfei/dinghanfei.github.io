---
title: "Evidence-Grounded Deep Research Agent"
subtitle: "LangGraph · Agentic RAG · Hybrid Retrieval · FastAPI"
summary: "An evidence-grounded research agent that decomposes open-ended questions, retrieves web evidence, identifies information gaps, and produces structured reports with traceable citations."
year: "May 2025"
order: 202505
section: "project"
image:
  src: "/projects/evidence-grounded-deep-research-agent/agent-demo.png"
  alt: "Evidence-Grounded Deep Research Agent interface"
tags:
  - LangGraph
  - Agentic RAG
  - Hybrid Retrieval
  - FastAPI
  - BM25
  - Chroma
accent: "teal"
links: []
---

## Overview

Built an evidence-grounded research agent that decomposes open-ended research questions, retrieves web evidence, identifies information gaps, and generates structured reports with traceable citations.

## Agent Workflow

Built a LangGraph workflow with structured state, execution budgets, and fair scheduling, raising research-task coverage from 32% to 94%. Added checkpoint recovery, citation validation, role-based handoffs, and an asynchronous FastAPI service.

## Hybrid Retrieval

Designed language-aware hybrid retrieval by fusing dense and BM25 results through Reciprocal Rank Fusion, followed by multilingual reranking. The pipeline achieved 100% Recall@5, 95% MRR, and 96.31% NDCG@5 on a 30-query offline benchmark.

## Research Output

The agent tracks sources and evidence throughout the workflow, then produces a structured research report whose claims can be traced back to their supporting citations.
