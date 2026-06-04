# minGPT — A Clean, Educational GPT

**An interactive, slide-by-slide walkthrough of Andrej Karpathy's [minGPT](https://github.com/karpathy/minGPT) — the small, clean, hackable PyTorch GPT that loads real GPT-2 weights.**

In ~300 readable lines, minGPT packages the full GPT architecture as a reusable library: a model, a generic trainer, a BPE tokeniser, and a config system. This deck explains its design and contrasts it with the single-file [nanoGPT](https://brendanjameslynskey.github.io/nanoGPT_presentation/).

---

## [Launch Presentation](https://brendanjameslynskey.github.io/minGPT_presentation/)

---

## What's Covered

| Part | Topic |
|------|-------|
| 1 | **What is minGPT & Why** — the small/clean/interpretable/educational philosophy; the three-file library; the whole user-facing API |
| 2 | **CausalSelfAttention** — the combined `c_attn` projection, reshaping to `(B, nh, T, hs)`, scaled dot-product, the registered causal `bias` mask, and the output projection |
| 3 | **The Block & GPT Module** — pre-LayerNorm attention + 4× GELU MLP with residuals; the `wte`/`wpe`/`h`/`ln_f`/`lm_head` assembly; init and the special scaled residual init |
| 4 | **Configuration & Model Zoo** — the `CfgNode` config system; `from_pretrained()` and the Conv1D→Linear weight surgery; `configure_optimizers` selective weight decay |
| 5 | **The Trainer** — a framework-agnostic loop with an event/callback system, device handling and dataloader; the sorting, adder and chargpt demos |
| 6 | **minGPT vs nanoGPT** — clean & educational library vs the faster GPT-2-reproducing successor (single-file, `torch.compile`, DDP, flash attention) |

The presentation closes with a summary grid, a "where this fits in Zero-to-Hero" context slide cross-linking the nanoGPT deck, and key takeaways.

## Format

Built with [Reveal.js](https://revealjs.com/). Use `→` to advance, `↓` for sub-sections, and `Esc` for the slide overview. Includes an interactive **model-zoo selector** (real GPT-2 `n_layer`/`n_head`/`n_embd` and parameter counts) and a clickable **causal mask grid**.

## Part of

This project is part of [Karpathy: Neural Networks Zero to Hero](https://github.com/BrendanJamesLynskey/LLM_Hub_Karpathy_Zero_to_Hero), itself part of the [LLMs](https://github.com/BrendanJamesLynskey/LLMs) hub — a set of interactive resources covering transformer internals, agent architectures, CUDA programming, and more.

Credit: Andrej Karpathy's [minGPT](https://github.com/karpathy/minGPT).
