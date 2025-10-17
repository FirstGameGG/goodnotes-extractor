# 🎵 GoodNotes File Extractor

<div align="center">

![GoodNotes Extractor](https://img.shields.io/badge/GoodNotes-Extractor-2eac34?style=for-the-badge)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://firstgamegg.github.io/goodnotes-extractor/)
[![GitHub](https://img.shields.io/github/license/FirstGameGG/goodnotes-extractor?style=for-the-badge)](LICENSE)
[![Stars](https://img.shields.io/github/stars/FirstGameGG/goodnotes-extractor?style=for-the-badge)](https://github.com/FirstGameGG/goodnotes-extractor/stargazers)

**Extract audio recordings and PDF files from your GoodNotes documents with complete privacy**

[🚀 Try Now](https://firstgamegg.github.io/goodnotes-extractor/) • [📖 Documentation](#documentation) • [🐛 Report Bug](https://github.com/FirstGameGG/goodnotes-extractor/issues)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Privacy & Security](#-privacy--security)
- [Quick Start](#-quick-start)
- [How It Works](#-how-it-works)
- [Supported File Types](#-supported-file-types)
- [Browser Compatibility](#-browser-compatibility)
- [Troubleshooting](#-troubleshooting)
- [FAQ](#-faq)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Core Functionality
- 🎯 **Extract Audio & PDFs** - Automatically extract all attachments from GoodNotes documents
- 📊 **Smart Detection** - Files sorted by size with automatic format detection
- 🎨 **Live Preview** - Play audio and preview PDFs directly in the browser
- 📦 **Batch Processing** - Handle multiple `.goodnotes` files simultaneously
- ⬇️ **Flexible Downloads** - Download files individually or all at once

### User Experience
- 🎨 **Modern Interface** - Clean, intuitive design with smooth animations
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- 🌓 **Visual Feedback** - Loading states, progress indicators, and clear error messages
- ♿ **Accessible** - Built with accessibility best practices

### Technical Excellence
- 🔒 **100% Client-Side** - Zero server involvement, all processing in your browser
- 🚀 **No Installation** - Works directly in any modern web browser
- ⚡ **Fast Processing** - Optimized for quick extraction and preview
- 🔄 **Memory Efficient** - Automatic cleanup prevents memory leaks

---

## 🔒 Privacy & Security

**Your privacy is our top priority.** This tool is designed with a privacy-first approach:

### 🛡️ Complete Privacy Guarantees

| Feature | Status | Description |
|---------|--------|-------------|
| **No Server Uploads** | ✅ | Files never leave your device |
| **Local Processing** | ✅ | All operations run in your browser |
| **No Tracking** | ✅ | Zero analytics or user tracking |
| **No Storage** | ✅ | Files are not saved anywhere |
| **Open Source** | ✅ | Full transparency - inspect the code |

### 🔐 How We Ensure Privacy

1. **Client-Side Only** - Uses JavaScript and the browser's File API
2. **No Network Requests** - Except for loading the page and JSZip library
3. **Temporary Memory** - Files exist only in browser memory during processing
4. **Automatic Cleanup** - All data cleared when you close or reset

---

## � Quick Start

### Using the Web App

1. **Export from GoodNotes**
   - Open your GoodNotes document
   - Tap the share button (•••)
   - Select **Export as .goodnotes**
   - Save the file to your device

2. **Visit the Extractor**
   - Go to [https://firstgamegg.github.io/goodnotes-extractor/](https://firstgamegg.github.io/goodnotes-extractor/)
   - Click **Choose GoodNotes File**
   - Select your `.goodnotes` file(s)

3. **Extract & Download**
   - Wait for processing (5-30 seconds)
   - Preview files directly in the browser
   - Download individual files or all at once

### Running Locally

```bash
# Clone the repository
git clone https://github.com/FirstGameGG/goodnotes-extractor.git
cd goodnotes-extractor

# Serve with any static file server
python3 -m http.server 8000
# or
npx serve

# Open http://localhost:8000 in your browser
```

---

## 🔧 How It Works

### Technical Overview

GoodNotes documents (`.goodnotes` files) are essentially ZIP archives containing:
- Document metadata
- Page images
- **Attachments folder** with audio recordings and PDFs

This extractor:

1. **Reads** the `.goodnotes` file using [JSZip](https://stuk.github.io/jszip/)
2. **Identifies** files in the `Attachments/` directory
3. **Detects** file types using magic number signatures
4. **Sorts** by size (largest first - typically audio recordings)
5. **Generates** blob URLs for preview and download
6. **Cleans up** memory when done

### File Detection Logic

```javascript
// Audio files (M4A/MP3)
Signature: [0x66, 0x74, 0x79, 0x70] - 'ftyp' (M4A/MP4)
Signature: [0x49, 0x44, 0x33] - 'ID3' (MP3)

// PDF files
Signature: [0x25, 0x50, 0x44, 0x46] - '%PDF'

// PNG images
Signature: [0x89, 0x50, 0x4E, 0x47] - PNG
```

---

## 📦 Supported File Types

| Format | Extension | Preview | Download | Notes |
|--------|-----------|---------|----------|-------|
| Audio (M4A) | `.mp3` | ✅ | ✅ | Most GoodNotes recordings |
| Audio (MP3) | `.mp3` | ✅ | ✅ | Standard MP3 files |
| PDF | `.pdf` | ✅ | ✅ | Embedded PDFs |
| PNG | `.png` | ❌ | ✅ | Image attachments |
| Other | `.bin` | ❌ | ✅ | Unknown formats |

**Note:** Audio files are automatically labeled as `.mp3` for compatibility, even if they're M4A format. If playback fails, try renaming to `.m4a`.

---

## 🌐 Browser Compatibility

| Browser | Minimum Version | File System API | Notes |
|---------|----------------|-----------------|-------|
| Chrome | 87+ | ✅ | Full support |
| Edge | 87+ | ✅ | Full support |
| Firefox | 85+ | ⚠️ | Fallback download |
| Safari | 14+ | ⚠️ | Fallback download |
| Mobile Safari | iOS 14+ | ⚠️ | Fallback download |
| Mobile Chrome | Android 87+ | ✅ | Full support |

**File System API** allows you to choose where to save files. Browsers without this feature will use standard downloads.

---

## 🚨 Troubleshooting

### Common Issues

<details>
<summary><strong>❌ "No attachments found" error</strong></summary>

**Possible causes:**
- Document doesn't contain any recordings or PDFs
- File is not a valid `.goodnotes` file
- Corrupted export

**Solutions:**
- Verify the document has recordings in GoodNotes
- Try exporting again from GoodNotes
- Test with a different document
</details>

<details>
<summary><strong>🔇 Audio file won't play</strong></summary>

**Possible causes:**
- Browser codec support
- File format mismatch

**Solutions:**
- Try downloading and playing in a media player
- Rename from `.mp3` to `.m4a`
- Use VLC or other universal media player
</details>

<details>
<summary><strong>⏱️ Slow processing or browser freezing</strong></summary>

**Possible causes:**
- Very large files (>500MB)
- Limited device memory
- Too many files at once

**Solutions:**
- Process files one at a time
- Close other browser tabs
- Try on a device with more RAM
- Use smaller documents
</details>

<details>
<summary><strong>📄 PDF preview not showing</strong></summary>

**Possible causes:**
- Browser PDF support disabled
- Large PDF file

**Solutions:**
- Enable PDF viewer in browser settings
- Download the PDF instead
- Try in a different browser
</details>

---

## 💡 FAQ

**Q: Is this tool safe to use?**  
A: Yes! All processing happens locally in your browser. No files are uploaded to any server. You can verify this by checking the source code or monitoring network traffic.

**Q: Do I need to install anything?**  
A: No. It works directly in your web browser without any installation.

**Q: What happens to my files?**  
A: Files are processed in your browser's memory and automatically cleared when you close the page or click reset.

**Q: Can I process multiple files at once?**  
A: Yes! You can select multiple `.goodnotes` files and process them simultaneously.

**Q: Why is the first file usually the audio recording?**  
A: Files are sorted by size (largest first), and audio recordings are typically the largest files in GoodNotes documents.

**Q: Does this work offline?**  
A: After the first load, the app can work offline except for the JSZip library which is loaded from CDN.

**Q: Is there a file size limit?**  
A: No hard limit, but performance may degrade with files larger than 500MB depending on your device.

**Q: Can I contribute to this project?**  
A: Absolutely! See the [Contributing](#-contributing) section below.

---

## 🛠️ Development

### Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: Pure CSS with CSS Variables
- **Zip Handling**: [JSZip](https://stuk.github.io/jszip/) v3.7.1
- **Hosting**: GitHub Pages

### Project Structure

```
goodnotes-extractor/
├── index.html          # Main HTML file
├── script.js           # Core extraction logic
├── styles.css          # Styling
├── assets/
│   └── images/         # Logo and images
├── .nojekyll          # GitHub Pages config
└── README.md          # Documentation
```

### Local Development

```bash
# Clone the repository
git clone https://github.com/FirstGameGG/goodnotes-extractor.git
cd goodnotes-extractor

# Start a local server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

### Building for Production

No build step required! This is a static site that works as-is.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Ways to Contribute

- 🐛 **Report bugs** - Open an issue with detailed reproduction steps
- 💡 **Suggest features** - Share your ideas for improvements
- 📝 **Improve documentation** - Help make the docs clearer
- 🔧 **Submit pull requests** - Fix bugs or add features

### Contribution Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Use vanilla JavaScript (no frameworks)
- Follow existing code style
- Add comments for complex logic
- Test thoroughly before submitting

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Credits & Attribution

### Original Project
This project is a fork of [alinuxpengui/goodnotes-extractor](https://github.com/alinuxpengui/goodnotes-extractor)

### Acknowledgments
- **Original Author**: [alinuxpengui](https://github.com/alinuxpengui)
- **Thank You Image**: [shigureni.com](https://www.shigureni.com/)
- **JSZip Library**: [Stuk/JSZip](https://github.com/Stuk/jszip)

### Maintainer
Made with ❤️ by [FirstGameGG](https://github.com/FirstGameGG)

---

## 📊 Star History

<a href="https://star-history.com/#FirstGameGG/goodnotes-extractor&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=FirstGameGG/goodnotes-extractor&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=FirstGameGG/goodnotes-extractor&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=FirstGameGG/goodnotes-extractor&type=Date" />
 </picture>
</a>

---

## ⚠️ Disclaimer

This tool is provided for educational and personal use only. It is not affiliated with, endorsed by, or connected to GoodNotes or Time Base Technology Limited. GoodNotes is a trademark of Time Base Technology Limited.

Use this tool responsibly and respect copyright laws and terms of service.

---

<div align="center">

**[⬆ Back to Top](#-goodnotes-file-extractor)**

Made with ❤️ by the open source community

</div>
