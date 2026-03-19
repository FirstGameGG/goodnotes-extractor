# 📖 GoodNotes File Extractor

<div align="center">

![GoodNotes Extractor](https://img.shields.io/badge/GoodNotes-Extractor-2eac34?style=for-the-badge)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://firstgamegg.github.io/goodnotes-extractor/)
[![GitHub](https://img.shields.io/github/license/FirstGameGG/goodnotes-extractor?style=for-the-badge)](LICENSE)

**Extract MP3 audio, PDF documents, and images from your GoodNotes documents directly in your browser.**

[🚀 Try Now](https://firstgamegg.github.io/goodnotes-extractor/) • [🐛 Report Bug](https://github.com/FirstGameGG/goodnotes-extractor/issues)

</div>

---

## ✨ Features

- **Extract Media & Documents:** Automatically pull MP3s, PDFs, PNGs, and JPGs from `.goodnotes` files, filtering out tiny system artifacts.
- **100% Client-Side & Private:** All processing happens in your browser. No files are ever uploaded or stored on any server.
- **Smart Detection, Grouping & Renaming:** Uses magic numbers to identify files, groups them by their source document, and automatically renames them sequentially (e.g., `Audio_01.mp3`).
- **Rich Previews & Modals:** Play audio, view PDFs, and open full-screen modals for images before downloading.
- **Advanced Batch Downloading:** Supports the native File System Access API to let you download all files directly into a local folder in one click.

## 🚀 Quick Start

### Online Web App
1. Export your document from GoodNotes as **.goodnotes**.
2. Visit the [Live Extractor](https://firstgamegg.github.io/goodnotes-extractor/).
3. Select your `.goodnotes` file(s) and wait for the extraction to complete.
4. Preview and download your files.

### Run Locally
```bash
git clone https://github.com/FirstGameGG/goodnotes-extractor.git
cd goodnotes-extractor
python3 -m http.server 8000
# Open http://localhost:8000 in your browser
```

## 🔧 How It Works

GoodNotes documents are essentially ZIP archives. This tool uses [JSZip](https://stuk.github.io/jszip/) to read the archive offline in your browser, groups files by their source document, detects file types via magic numbers, and generates downloadable links for you.

## 📦 Supported Formats

| Format | Output | Note |
|--------|--------|------|
| Audio | `.mp3` | Standard GoodNotes audio recordings |
| Documents | `.pdf` | Native PDF attachments |
| Images | `.png`, `.jpg` | High-quality image media |

**Browser Compatibility:** Fully supported on Chrome (87+), Edge (87+), and Mobile Chrome. Safari and Firefox support extraction with fallback standard downloads.

## 🚨 Troubleshooting & FAQ

- **"No attachments found":** Ensure your document actually contains recordings, PDFs, or images, and was properly exported as `.goodnotes`.
- **Audio won't play**: Try renaming the downloaded file from `.mp3` to `.m4a`, or use a media player like VLC.
- **Slow processing:** Very large files (>500MB) may take time. Try processing one document at a time.
- **File limits:** There are no strict limits, but memory depends on your browser and device RAM.

## 🤝 Contributing

We welcome contributions! Please fork the repository, make your changes on a feature branch, and submit a Pull Request.

## 🙏 Credits & Attribution

- Forked from [alinuxpengui/goodnotes-extractor](https://github.com/alinuxpengui/goodnotes-extractor)
- JSZip Library: [Stuk/JSZip](https://github.com/Stuk/jszip)
- Maintained with ❤️ by [FirstGameGG](https://github.com/FirstGameGG)

*Disclaimer: This tool is for educational use. Not affiliated with GoodNotes or Time Base Technology Limited.*
