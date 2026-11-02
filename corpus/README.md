# Corpus

Plain-text versions of the raw materials, one `.md` file per source, grouped by the branch the raw file lives on.
The raw files (HTML, PDF, images, videos) stay on their case branches; this folder is the working copy for reading, coding and quoting.

- `inventory.csv` - curated list of **all** materials (incl. videos and images that have no text yet): case, genre, outlet, date, whose voice, notes.
- `<branch>/*.md` - extracted text with a YAML header (source branch/file, extraction method, page metadata).
- Rebuild with `tools/build_corpus.py` (instructions inside).

## Caveats
- Text is machine-extracted. Some files still contain site navigation ("page chrome") at the top: 经济观察网, 人民网, 中国科学院.
- Dates come from page metadata and are flagged in `inventory.csv` (`date_status`); verify before citing.
- `GYSB12` (公益时报 newspaper page): line joins were automated; check quotes against the PDF. The page also carries an unrelated article.
- `QT01` and `HA01` are the same CyberDaily article (both paywalled after the intro).
- Privacy: the Taobao login name and Xiaohongshu profile URLs/tokens were removed. Xiaohongshu usernames remain in ND03 for traceability. **Anonymise before quoting.**

## Not yet in text form
- Videos: transcribed from burnt-in subtitles (see `[视频字幕]` files; tool: `tools/subtitle_strip.py`). QT-V2 has no subtitles, so it has a visual description instead. ZX01 (新华网 video) was not saved as a file. Audio-only speech is not captured.
- Screenshots in the two Xiaohongshu exports (ND02, ND03) and the AL04 cover image.
