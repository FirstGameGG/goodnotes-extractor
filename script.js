function resetFileInput() {
    // Clean up blob URLs to prevent memory leaks
    if (window.fileData) {
        Object.values(window.fileData).forEach(data => {
            if (data.url) {
                URL.revokeObjectURL(data.url);
            }
        });
        window.fileData = {};
    }
    
    document.getElementById('goodnotesFile').value = '';
    document.getElementById('results').innerHTML = '';
}

document.getElementById('goodnotesFile').addEventListener('change', async (e) => {
    try {
        const files = Array.from(e.target.files);
        if (!files || files.length === 0) return;

        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `
            <div class="loading">
                <div class="loading-spinner"></div>
                <div>Processing ${files.length} GoodNotes file${files.length > 1 ? 's' : ''}...</div>
            </div>
        `;

        let allAttachments = [];
        let fileIndex = 0;

        // Process each GoodNotes file
        for (const file of files) {
            const zip = await JSZip.loadAsync(file);

            zip.forEach((relativePath, zipEntry) => {
                if (zipEntry.name.toLowerCase().includes('attachments/') && !zipEntry.dir) {
                    allAttachments.push({
                        zipEntry: zipEntry,
                        sourceFile: file.name,
                        fileIndex: fileIndex
                    });
                }
            });

            fileIndex++;
        }

        if (allAttachments.length === 0) {
            resultsDiv.innerHTML = `
                <div class="empty-state">
                    <svg class="empty-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                    <div>No attachments found in ${files.length > 1 ? 'these files' : 'this file'}</div>
                </div>
            `;
            return;
        }

        // Sort by size
        const sortedFiles = allAttachments.sort((a, b) =>
            b.zipEntry._data.uncompressedSize - a.zipEntry._data.uncompressedSize
        );

        const filesHTML = await Promise.all(
            sortedFiles.map(async (item, index) => {
                const { zipEntry, sourceFile } = item;
                const blob = await zipEntry.async('blob');
                let extension = await guessExtension(blob);

                // Create blob URL with proper MIME type
                let mimeType = 'application/octet-stream';
                
                if(['m4a', 'mp4'].includes(extension)) {
                    mimeType = 'audio/mp4';
                    extension = 'mp3'; // Keep extension as mp3 for download
                } else if (extension === 'mp3') {
                    mimeType = 'audio/mpeg';
                } else if (extension === 'bin') {
                    // Try to assume it's audio if we can't detect
                    mimeType = 'audio/mpeg';
                    extension = 'mp3';
                } else if (extension === 'pdf') {
                    mimeType = 'application/pdf';
                } else if (extension === 'png') {
                    mimeType = 'image/png';
                }
                
                const typedBlob = new Blob([blob], { type: mimeType });
                const fileUrl = URL.createObjectURL(typedBlob);
                const fileSizeMB = (blob.size / 1024 / 1024).toFixed(2);
                const isAudio = ['mp3', 'm4a'].includes(extension) || mimeType.startsWith('audio/');
                const isPDF = extension === 'pdf';

                // Store file data for later use
                window.fileData = window.fileData || {};
                window.fileData[`file_${index}`] = {
                    url: fileUrl,
                    extension: extension,
                    blob: typedBlob,
                    sourceFileName: sourceFile.replace('.goodnotes', ''),
                    index: index
                };

                let previewHTML = '';
                
                if (isAudio) {
                    previewHTML = `
                        <div class="audio-player">
                            <audio controls preload="metadata" controlsList="nodownload">
                                <source src="${fileUrl}" type="audio/mpeg">
                                <source src="${fileUrl}" type="audio/mp4">
                                <source src="${fileUrl}" type="audio/x-m4a">
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    `;
                } else if (isPDF) {
                    previewHTML = `
                        <div class="file-preview">
                            <iframe src="${fileUrl}#view=FitH" type="application/pdf" loading="lazy"></iframe>
                        </div>
                    `;
                } else {
                    previewHTML = `
                        <div class="file-preview">
                            <div class="preview-placeholder">
                                <svg class="preview-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                    <polyline points="14 2 14 8 20 8"/>
                                </svg>
                                <div>Preview not available</div>
                            </div>
                        </div>
                    `;
                }

                return `
                    <div class="file-card">
                        ${previewHTML}
                        <div class="file-info">
                            <div class="file-header">
                                <span class="file-number">#${index + 1}</span>
                                <span class="file-type-badge ${isAudio ? 'audio' : isPDF ? 'pdf' : ''}">${extension}</span>
                            </div>
                            <div class="file-meta">
                                <span class="file-size">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle;">
                                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                                    </svg>
                                    ${fileSizeMB} MB
                                </span>
                                ${files.length > 1 ? `<span class="source-file" title="${sourceFile}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle;">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                        <polyline points="14 2 14 8 20 8"/>
                                    </svg>
                                    ${sourceFile.length > 20 ? sourceFile.substring(0, 20) + '...' : sourceFile}
                                </span>` : ''}
                            </div>
                            <div class="file-actions">
                                <button class="btn btn-primary" onclick="downloadFile('file_${index}')">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                        <polyline points="7 10 12 15 17 10"/>
                                        <line x1="12" y1="15" x2="12" y2="3"/>
                                    </svg>
                                    Download
                                </button>
                                <button class="btn btn-secondary" onclick="viewFile('file_${index}')">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                        <circle cx="12" cy="12" r="3"/>
                                    </svg>
                                    View
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            })
        );

        resultsDiv.innerHTML = `
            <div class="results-header">
                <div>
                    <h2 class="results-title">Extracted Files</h2>
                    <span class="results-count">${allAttachments.length} files from ${files.length} document${files.length > 1 ? 's' : ''}</span>
                </div>
                <button class="btn btn-primary" onclick="downloadAll()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download All
                </button>
            </div>
            <div class="files-grid">
                ${filesHTML.join('')}
            </div>
        `;

        // Ensure audio elements are properly initialized
        const audioElements = resultsDiv.querySelectorAll('audio');
        audioElements.forEach(audio => {
            audio.load(); // Force load the audio
        });

    } catch (error) {
        console.error('Error:', error);
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `
            <div class="error-message">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                <div>Error: ${error.message}</div>
            </div>
        `;
    }
});

async function guessExtension(blob) {
    const signatures = {
        'mp3': [0x49, 0x44, 0x33],        // ID3 tag (MP3)
        'm4a': [0x66, 0x74, 0x79, 0x70],  // ftyp (M4A/MP4)
        'pdf': [0x25, 0x50, 0x44, 0x46],  // %PDF
        'png': [0x89, 0x50, 0x4E, 0x47]   // PNG
    };

    const header = await blob.slice(0, 8).arrayBuffer();
    const bytes = new Uint8Array(header);

    // Special check for PDF at offset 4
    if(bytes[4] === 0x25 && bytes[5] === 0x50 && bytes[6] === 0x44) return 'pdf';

    for (const [ext, sig] of Object.entries(signatures)) {
        if (sig.every((byte, i) => bytes[i] === byte)) {
            return ext;
        }
    }
    return 'bin';
}

// Download file function
async function downloadFile(fileId) {
    const fileData = window.fileData[fileId];
    if (!fileData) {
        console.error('File data not found');
        return;
    }
    
    // Create meaningful filename
    const baseName = fileData.sourceFileName || 'file';
    const cleanBaseName = baseName.replace(/[^a-z0-9_\-]/gi, '_'); // Remove invalid characters
    const filename = `${cleanBaseName}_${fileData.index + 1}.${fileData.extension}`;
    
    // Check if File System Access API is supported
    if ('showSaveFilePicker' in window) {
        try {
            // Let user choose where to save the file
            const handle = await window.showSaveFilePicker({
                suggestedName: filename,
                types: [{
                    description: fileData.extension.toUpperCase() + ' File',
                    accept: {
                        [`${fileData.mimeType}`]: [`.${fileData.extension}`]
                    }
                }]
            });
            
            // Fetch the blob data
            const response = await fetch(fileData.url);
            const blob = await response.blob();
            
            // Write to the selected file
            const writable = await handle.createWritable();
            await writable.write(blob);
            await writable.close();
            
            console.log('File saved successfully');
        } catch (err) {
            // User cancelled or error occurred
            if (err.name !== 'AbortError') {
                console.error('Error saving file:', err);
                // Fallback to traditional download
                fallbackDownload(fileData.url, filename);
            }
        }
    } else {
        // Fallback for browsers that don't support File System Access API
        fallbackDownload(fileData.url, filename);
    }
}

// Fallback download method
function fallbackDownload(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// View file in new tab
function viewFile(fileId) {
    const fileData = window.fileData[fileId];
    if (!fileData) {
        console.error('File data not found');
        return;
    }
    
    window.open(fileData.url, '_blank');
}

// Download all files
async function downloadAll() {
    if (!window.fileData) {
        console.error('No files to download');
        return;
    }
    
    const files = Object.entries(window.fileData);
    
    // Check if File System Access API is supported for directory selection
    if ('showDirectoryPicker' in window) {
        try {
            // Let user choose a directory
            const directoryHandle = await window.showDirectoryPicker();
            
            // Download all files to the selected directory
            for (const [fileId, fileData] of files) {
                const baseName = fileData.sourceFileName || 'file';
                const cleanBaseName = baseName.replace(/[^a-z0-9_\-]/gi, '_');
                const filename = `${cleanBaseName}_${fileData.index + 1}.${fileData.extension}`;
                
                try {
                    const fileHandle = await directoryHandle.getFileHandle(filename, { create: true });
                    const writable = await fileHandle.createWritable();
                    
                    const response = await fetch(fileData.url);
                    const blob = await response.blob();
                    
                    await writable.write(blob);
                    await writable.close();
                } catch (err) {
                    console.error(`Error saving ${filename}:`, err);
                }
            }
            
            console.log('All files saved successfully');
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error('Error saving files:', err);
                // Fallback to sequential downloads
                downloadAllFallback(files);
            }
        }
    } else {
        // Fallback for browsers that don't support Directory Picker
        downloadAllFallback(files);
    }
}

// Fallback download all method
function downloadAllFallback(files) {
    let downloadIndex = 0;
    
    // Download files with a delay to avoid browser blocking
    const downloadNext = () => {
        if (downloadIndex >= files.length) return;
        
        const [fileId, fileData] = files[downloadIndex];
        
        downloadFile(fileId);
        
        downloadIndex++;
        if (downloadIndex < files.length) {
            setTimeout(downloadNext, 300); // 300ms delay between downloads
        }
    };
    
    downloadNext();
}
