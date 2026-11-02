# Project: book chapter on Chinese AI products for autism

## The chapter
- Author: Mengzhu AN. Written in **English**.
- Book: *Artificial Empathy: Emotion AI, Robots and Autism*, edited by the author's PI (EMOROB project, Czech Science Foundation EXPRO GX23-05692X).
- This is the **China chapter** (Ch. 3). Content as agreed with the PI (this replaces the earlier abstract): after the generative-AI boom, a wave of Chinese AI products for autism appeared. The chapter analyses the social / sociotechnical imaginaries of autism built into several of these products, and neurodivergent people's own use of (mostly general-purpose) AI. The open task is aligning this with the book's theme of "artificial empathy" (computed empathy applied to both autistic people and machines). The PI's current one-line summary of Ch. 3 ("Children of the Stars", caregiver suffering) reflects the OLD abstract; those motifs are possible findings, not the frame.
- Book-level frame: see the PI brief (`notes/book_brief.md`, to be added once the repo is private).
- The chapter's theoretical frame is still open; most likely STS work on sociotechnical imaginaries.
- Conventions: identity-first language ("autistic people") except where diagnostic discourse is itself the object.
- The full PI brief is kept out of this repo while the repo is public (it is an unpublished draft).

## Repository layout
- `main`: working desk. Contains `corpus/` (extracted text + `inventory.csv`), `tools/`, plus notes/drafts to come (`notes/`, `drafts/`).
- Raw materials live on case branches. Do not move raw files back to main.
  - `alsolife`: ALSOLIFE "AI个训机器人" (commercial home-rehab system)
  - `追星星的AI`: Alibaba/Tongyi "追星星的AI" AI picture-book tool (philanthropy/CSR)
  - `其他产品`: StellarCare AI (Chinese Academy of Sciences), 启音APP
  - `how-AI-help-ASD`: industry and tech-media overviews
  - `神经多元人士的自主AI使用`: neurodivergent people's own AI use, and the 理想者大会 forum fieldnote
- When new raw files are uploaded to a case branch, re-run `tools/build_corpus.py` and update `corpus/inventory.csv`.

## Working rules
- Never invent citations. Flag any reference that has not been verified.
- Quote from the corpus with its inventory ID (e.g. AL03, ZX04).
- Pseudonymise private social-media users before quoting them.
