# 🐧 alinuxpengui Goodnotes File Extractor

**Privacy-First GoodNotes File Extractor**  
📌 *No files are stored - All processing happens in your browser!*  

---

## 🌟 Features
- **100% Client-Side**: No server involved, no data leaves your computer  
- **Auto-Detect Audio**: Largest file first (usually the audio recording)  
- **One-Click Export**: Direct download with `.mp3` extension  
- **Secure & Private**: Files processed locally, zero tracking  

---

## 🔒 Privacy First
- 🛡️ **No Uploads**: Files never leave your browser  
- 💻 **Local Processing**: Powered by JavaScript & WebAssembly  
- 🗑️ **Instant Deletion**: Files cleared after processing  

---

## 📱 How to Use (3 Steps)

### 1️⃣ Export from GoodNotes:
1. Open your GoodNotes document with recordings  
2. Tap `Share` → `Export as .goodnotes`  
3. Save to your device  

### 2️⃣ Use This Website:
1. **[Open Extractor](https://alinuxpengui.github.io/goodnotes-extractor)**  
2. Click `📁 Select GoodNotes File`  
3. Choose your `.goodnotes` file  

### 3️⃣ Download Audio:
1. Wait for processing (~5-30 seconds)  
2. **First file is usually the audio** (sorted by size)  
3. Click `Download ⬇️` on `file_1.mp3`  

---

## ❓ Why Is the First File Usually Audio?
GoodNotes stores files in `attachments/` folder with random names.  
🔍 **Our detection logic**:  
1. Extract all files from `.goodnotes` (ZIP format)  
2. Sort files by size (audio = largest → smallest)  
3. Force `.mp3` extension for compatibility  

---

## 🚨 Troubleshooting
- **"File not found" error?**  
  → Ensure document contains recordings  
  → Check GoodNotes export settings  

- **File won't play?**  
  → Rename `.mp3` → `.m4a` (most recordings use this format)  

- **Slow processing?**  
  → Works best with files <500MB  

---

## 💡 FAQ
**Q: Is this safe?**  
→ **Yes!** We never see your files - [View Source Code](https://github.com/alinuxpengui/goodnotes-extractor)

---

## 🛠️ Development
Contribute on GitHub:  
[⭐ Star on GitHub](https://github.com/alinuxpengui/goodnotes-extractor)  
[🐛 Report Issues](https://github.com/alinuxpengui/goodnotes-extractor/issues)

---

## Star History

<a href="https://star-history.com/#alinuxpengui/goodnotes-extractor&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=alinuxpengui/goodnotes-extractor&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=alinuxpengui/goodnotes-extractor&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=alinuxpengui/goodnotes-extractor&type=Date" />
 </picture>
</a>

---

*Made with 🐧 by alinuxpengui - No affiliation with GoodNotes*  
*⚠️ Disclaimer: For educational use only*
