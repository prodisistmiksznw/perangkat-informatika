// Aplikasi Portal Perangkat Pembelajaran Informatika Kelas X (KBC & Deep Learning)
// Mendukung Preview Google Drive Interaktif, Direct Download Google Drive, dan Unduhan Lokal

(function () {
  const STORAGE_KEY_LINKS = "perangkat_informatika_kbc_drive_links_v2";
  const STORAGE_KEY_CONFIG = "perangkat_informatika_kbc_config_v2";
  const STORAGE_KEY_THEME = "perangkat_informatika_kbc_theme_v1";

  // State Aplikasi
  const state = {
    category: "all",
    semester: "all",
    search: "",
    viewMode: "grid", // 'grid' | 'list'
    activeDocId: null,
    activeModalTab: "drive", // 'drive' | 'content'
    activeDriveFolderKey: "modul", // 'main' | 'modul' | 'lkpd'
    activeDriveFolderView: "list", // 'list' | 'grid'
    customLinks: {},
    config: { ...window.DEFAULT_CONFIG }
  };

  // Muat konfigurasi & link tersimpan dari localStorage
  function loadSavedState() {
    try {
      const savedLinks = localStorage.getItem(STORAGE_KEY_LINKS);
      if (savedLinks) {
        state.customLinks = JSON.parse(savedLinks) || {};
      }
      const savedConfig = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (savedConfig) {
        state.config = { ...window.DEFAULT_CONFIG, ...JSON.parse(savedConfig) };
      }
    } catch (e) {
      console.warn("Gagal memuat state dari localStorage:", e);
    }
  }

  function saveLinksState() {
    try {
      localStorage.setItem(STORAGE_KEY_LINKS, JSON.stringify(state.customLinks));
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(state.config));
    } catch (e) {
      console.warn("Gagal menyimpan ke localStorage:", e);
    }
  }

  // Helper: Ekstrak File ID & buat URL Preview + Download dari berbagai format URL Google Drive / Google Docs
  function parseGoogleDriveUrl(rawInput) {
    if (!rawInput || typeof rawInput !== "string") return null;
    const input = rawInput.trim();
    if (!input) return null;

    let fileId = null;
    let docType = "file"; // 'file' | 'document' | 'spreadsheets' | 'presentation' | 'folder'

    // Cek apakah link folder
    const folderMatch = input.match(/\/folders\/([a-zA-Z0-9_-]{10,})/);
    if (folderMatch) {
      return {
        isFolder: true,
        id: folderMatch[1],
        viewUrl: `https://drive.google.com/drive/folders/${folderMatch[1]}`,
        previewUrl: `https://drive.google.com/embeddedfolderview?id=${folderMatch[1]}#list`,
        downloadUrl: `https://drive.google.com/drive/folders/${folderMatch[1]}`
      };
    }

    // Cek Google Docs / Sheets / Slides
    const docsMatch = input.match(/docs\.google\.com\/(document|spreadsheets|presentation)\/d\/([a-zA-Z0-9_-]{10,})/);
    if (docsMatch) {
      docType = docsMatch[1];
      fileId = docsMatch[2];
    }

    // Cek pola /file/d/{ID} atau /d/{ID}
    if (!fileId) {
      const fileMatch = input.match(/\/d\/([a-zA-Z0-9_-]{10,})/);
      if (fileMatch) fileId = fileMatch[1];
    }

    // Cek parameter ?id={ID} atau &id={ID}
    if (!fileId) {
      const idParamMatch = input.match(/[?&]id=([a-zA-Z0-9_-]{10,})/);
      if (idParamMatch) fileId = idParamMatch[1];
    }

    // Jika input berupa ID langsung (tanpa spasi/slash dan panjang mencukupi)
    if (!fileId && /^[a-zA-Z0-9_-]{18,}$/.test(input)) {
      fileId = input;
    }

    if (!fileId) return null;

    let previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
    let viewUrl = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
    let downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    if (docType === "document") {
      previewUrl = `https://docs.google.com/document/d/${fileId}/preview`;
      viewUrl = `https://docs.google.com/document/d/${fileId}/edit?usp=sharing`;
      downloadUrl = `https://docs.google.com/document/d/${fileId}/export?format=docx`;
    } else if (docType === "spreadsheets") {
      previewUrl = `https://docs.google.com/spreadsheets/d/${fileId}/preview`;
      viewUrl = `https://docs.google.com/spreadsheets/d/${fileId}/edit?usp=sharing`;
      downloadUrl = `https://docs.google.com/spreadsheets/d/${fileId}/export?format=xlsx`;
    } else if (docType === "presentation") {
      previewUrl = `https://docs.google.com/presentation/d/${fileId}/preview`;
      viewUrl = `https://docs.google.com/presentation/d/${fileId}/edit?usp=sharing`;
      downloadUrl = `https://docs.google.com/presentation/d/${fileId}/export/pptx`;
    }

    return {
      isFolder: false,
      id: fileId,
      docType,
      raw: input,
      previewUrl,
      viewUrl,
      downloadUrl
    };
  }

  function getDocDriveRawUrl(doc) {
    if (state.customLinks[doc.id] !== undefined && state.customLinks[doc.id].trim() !== "") {
      return state.customLinks[doc.id].trim();
    }
    return (doc.driveUrl || "").trim();
  }

  function getDocDriveInfo(doc) {
    const raw = getDocDriveRawUrl(doc);
    return parseGoogleDriveUrl(raw);
  }

  function getFilteredDocuments() {
    return window.DOCUMENTS_DATA.filter((doc) => {
      const matchCat = state.category === "all" || doc.category === state.category;
      const matchSem = state.semester === "all" || doc.semester.toLowerCase() === state.semester.toLowerCase();
      const q = state.search.trim().toLowerCase();
      const matchSearch =
        !q ||
        doc.title.toLowerCase().includes(q) ||
        doc.code.toLowerCase().includes(q) ||
        doc.summary.toLowerCase().includes(q) ||
        doc.categoryLabel.toLowerCase().includes(q) ||
        doc.objectives.some((o) => o.toLowerCase().includes(q));

      return matchCat && matchSem && matchSearch;
    });
  }

  // Warna badge berdasarkan kategori
  function getBadgeClasses(color) {
    const map = {
      indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
      violet: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
      amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      sky: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
      rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
      cyan: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
      teal: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
      fuchsia: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20"
    };
    return map[color] || map.indigo;
  }

  // Render Peta Elemen 9 Bab
  function renderElementsGrid() {
    const container = document.getElementById("elements-grid");
    if (!container) return;

    container.innerHTML = window.CURRICULUM_ELEMENTS.map((el) => {
      const badgeCls = getBadgeClasses(el.color);
      const semBadge =
        el.semester === "Ganjil"
          ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20"
          : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";

      return `
        <div class="group relative rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between gap-2 mb-4">
              <div class="flex items-center gap-2.5">
                <span class="px-3 py-1 rounded-lg text-xs font-bold border ${badgeCls}">
                  ${el.bab} • ${el.code}
                </span>
                <span class="px-2.5 py-1 rounded-md text-[11px] font-semibold border ${semBadge}">
                  Sem. ${el.semester}
                </span>
              </div>
              <span class="text-xs font-medium text-slate-400 dark:text-slate-500">${el.jp}</span>
            </div>

            <h3 class="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
              ${el.name}
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              ${el.description}
            </p>

            <div class="space-y-1.5 border-t border-slate-100 dark:border-slate-800/80 pt-3 mb-5">
              <p class="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Materi Esensial:</p>
              ${el.topics
                .map(
                  (t) => `
                <div class="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <span class="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                  <span>${t}</span>
                </div>
              `
                )
                .join("")}
            </div>
          </div>

          <div class="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
            <button
              onclick="window.PortalApp.openPreview('modul-${el.bab.toLowerCase().replace(/\s+/g, "")}')"
              class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-colors"
            >
              <i data-lucide="book-open" class="w-3.5 h-3.5"></i>
              Modul Ajar
            </button>
            <button
              onclick="window.PortalApp.openPreview('lkpd-${el.bab.toLowerCase().replace(/\s+/g, "")}')"
              class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 dark:hover:text-white transition-colors"
            >
              <i data-lucide="clipboard-list" class="w-3.5 h-3.5"></i>
              LKPD Siswa
            </button>
          </div>
        </div>
      `;
    }).join("");

    if (window.lucide) window.lucide.createIcons();
  }

  // Render Katalog Dokumen (Grid atau List)
  function renderDocuments() {
    const container = document.getElementById("documents-container");
    const countBadge = document.getElementById("results-count");
    if (!container) return;

    const filtered = getFilteredDocuments();
    if (countBadge) {
      countBadge.textContent = `Menampilkan ${filtered.length} dari ${window.DOCUMENTS_DATA.length} dokumen`;
    }

    // Update jumlah dokumen yang sudah punya tautan Drive
    updateDriveConnectionStats();

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-16 px-6 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40">
          <div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
            <i data-lucide="file-search" class="w-7 h-7"></i>
          </div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1">Dokumen Tidak Ditemukan</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-5">
            Tidak ada perangkat pembelajaran yang cocok dengan kata kunci atau filter yang dipilih.
          </p>
          <button
            onclick="window.PortalApp.resetFilters()"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
          >
            <i data-lucide="rotate-ccw" class="w-4 h-4"></i>
            Reset Filter Pencarian
          </button>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    if (state.viewMode === "list") {
      container.className = "space-y-3";
      container.innerHTML = filtered
        .map((doc) => {
          const driveInfo = getDocDriveInfo(doc);
          const badgeCls = getBadgeClasses(doc.badgeColor);
          const formatCls =
            doc.format === "PDF"
              ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
              : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";

          return `
            <div class="group rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all shadow-sm hover:shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${formatCls}">
                  <i data-lucide="${doc.format === "PDF" ? "book-marked" : "file-text"}" class="w-6 h-6"></i>
                </div>
                <div>
                  <div class="flex flex-wrap items-center gap-2 mb-1">
                    <span class="px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${badgeCls}">
                      ${doc.categoryLabel}
                    </span>
                    <span class="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      Sem: ${doc.semester}
                    </span>
                    <span class="text-xs text-slate-400 dark:text-slate-500">• ${doc.format} (${doc.fileSize})</span>
                    ${
                      driveInfo
                        ? `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <i data-lucide="cloud" class="w-3 h-3"></i> Google Drive Terhubung
                           </span>`
                        : `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                            <i data-lucide="hard-drive" class="w-3 h-3"></i> File Lokal & Siap Taut Drive
                           </span>`
                    }
                  </div>
                  <h3 class="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    ${doc.title}
                  </h3>
                  <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    ${doc.summary}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
                <button
                  onclick="window.PortalApp.openPreview('${doc.id}')"
                  class="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all"
                >
                  <i data-lucide="eye" class="w-4 h-4"></i>
                  Preview
                </button>
                <button
                  onclick="window.PortalApp.downloadDocument('${doc.id}')"
                  class="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-white transition-all shadow-sm"
                >
                  <i data-lucide="download" class="w-4 h-4"></i>
                  Download
                </button>
              </div>
            </div>
          `;
        })
        .join("");
    } else {
      container.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
      container.innerHTML = filtered
        .map((doc) => {
          const driveInfo = getDocDriveInfo(doc);
          const badgeCls = getBadgeClasses(doc.badgeColor);
          const formatCls =
            doc.format === "PDF"
              ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
              : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";

          return `
            <div class="group relative rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl hover:border-indigo-500/40 dark:hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <!-- Header Card -->
                <div class="flex items-start justify-between gap-3 mb-4">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="px-2.5 py-1 rounded-lg text-xs font-bold border ${badgeCls}">
                      ${doc.code}
                    </span>
                    <span class="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      ${doc.semester}
                    </span>
                  </div>
                  <span class="px-2.5 py-1 rounded-lg text-[11px] font-bold border ${formatCls}">
                    .${doc.format}
                  </span>
                </div>

                <!-- Title & Summary -->
                <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2 leading-snug">
                  ${doc.title}
                </h3>
                <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
                  ${doc.summary}
                </p>

                <!-- Key Objectives Preview -->
                <div class="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3.5 mb-5 border border-slate-100 dark:border-slate-800">
                  <div class="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center justify-between">
                    <span>Fokus & Cakupan Isi</span>
                    <span>${doc.jp}</span>
                  </div>
                  <ul class="space-y-1.5">
                    ${doc.outline
                      .slice(0, 3)
                      .map(
                        (item) => `
                      <li class="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5"></i>
                        <span class="line-clamp-1">${item}</span>
                      </li>
                    `
                      )
                      .join("")}
                  </ul>
                </div>
              </div>

              <div>
                <!-- Meta Info Bar -->
                <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span class="inline-flex items-center gap-1.5">
                    <i data-lucide="hard-drive" class="w-3.5 h-3.5 text-slate-400"></i>
                    ${doc.fileSize} • ${doc.pages}
                  </span>
                  ${
                    driveInfo
                      ? `<span class="inline-flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
                          <i data-lucide="check-circle" class="w-3.5 h-3.5"></i> Drive Aktif
                         </span>`
                      : `<button onclick="window.PortalApp.openPreview('${doc.id}', 'drive')" class="inline-flex items-center gap-1 font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                          <i data-lucide="link" class="w-3.5 h-3.5"></i> Tautkan Drive
                         </button>`
                  }
                </div>

                <!-- Action Buttons -->
                <div class="grid grid-cols-2 gap-2.5">
                  <button
                    onclick="window.PortalApp.openPreview('${doc.id}')"
                    class="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all"
                  >
                    <i data-lucide="eye" class="w-4 h-4"></i>
                    Preview Dokumen
                  </button>
                  <button
                    onclick="window.PortalApp.downloadDocument('${doc.id}')"
                    class="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white transition-all shadow-sm"
                  >
                    <i data-lucide="download" class="w-4 h-4"></i>
                    Download
                  </button>
                </div>
              </div>
            </div>
          `;
        })
        .join("");
    }

    if (window.lucide) window.lucide.createIcons();
  }

  function updateDriveConnectionStats() {
    const linkedCount = window.DOCUMENTS_DATA.filter((d) => !!getDocDriveInfo(d)).length;
    const el = document.getElementById("drive-linked-badge");
    if (el) {
      el.textContent = `${linkedCount}/${window.DOCUMENTS_DATA.length} Terhubung ke File Drive`;
    }
  }

  // Buka Modal Preview Dokumen
  function openPreview(docId, preferredTab) {
    const doc = window.DOCUMENTS_DATA.find((d) => d.id === docId);
    if (!doc) return;

    state.activeDocId = docId;
    const driveInfo = getDocDriveInfo(doc);

    if (preferredTab) {
      state.activeModalTab = preferredTab;
    } else {
      // Jika sudah ada link Google Drive atau format PDF, tampilkan tab Drive/Embed; jika belum, tetap bisa lihat Drive tab atau Content tab
      state.activeModalTab = "drive";
    }

    const modal = document.getElementById("preview-modal");
    if (!modal) return;

    renderPreviewModalContent(doc, driveInfo);
    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    if (window.lucide) window.lucide.createIcons();
  }

  function closePreview() {
    const modal = document.getElementById("preview-modal");
    if (modal) modal.classList.add("hidden");
    const iframe = document.getElementById("drive-preview-iframe");
    if (iframe) iframe.src = "about:blank";
    document.body.classList.remove("overflow-hidden");
    state.activeDocId = null;
  }

  function switchModalTab(tab) {
    state.activeModalTab = tab;
    const doc = window.DOCUMENTS_DATA.find((d) => d.id === state.activeDocId);
    if (!doc) return;
    renderPreviewModalContent(doc, getDocDriveInfo(doc));
    if (window.lucide) window.lucide.createIcons();
  }

  function renderPreviewModalContent(doc, driveInfo) {
    const titleEl = document.getElementById("modal-doc-title");
    const metaEl = document.getElementById("modal-doc-meta");
    const bodyEl = document.getElementById("modal-doc-body");
    const footerEl = document.getElementById("modal-doc-footer");
    const tabDriveBtn = document.getElementById("tab-btn-drive");
    const tabContentBtn = document.getElementById("tab-btn-content");

    if (titleEl) titleEl.textContent = doc.title;
    if (metaEl) {
      metaEl.innerHTML = `
        <span class="px-2.5 py-0.5 rounded-md text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">${doc.categoryLabel}</span>
        <span>•</span>
        <span>Semester: <strong>${doc.semester}</strong></span>
        <span>•</span>
        <span>Alokasi: <strong>${doc.jp}</strong></span>
        <span>•</span>
        <span>Format: <strong>.${doc.format} (${doc.fileSize})</strong></span>
      `;
    }

    // Update active state pada tombol tab
    if (tabDriveBtn && tabContentBtn) {
      if (state.activeModalTab === "drive") {
        tabDriveBtn.className =
          "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-sm transition-all";
        tabContentBtn.className =
          "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all";
      } else {
        tabContentBtn.className =
          "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-sm transition-all";
        tabDriveBtn.className =
          "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all";
      }
    }

    const rawUrl = getDocDriveRawUrl(doc);

    if (state.activeModalTab === "drive") {
      // Tab 1: Google Drive Live Preview (Iframe) + Quick Link Input
      let previewAreaHtml = "";

      if (driveInfo) {
        previewAreaHtml = `
          <div class="relative w-full h-[460px] sm:h-[520px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950">
            <iframe
              id="drive-preview-iframe"
              src="${driveInfo.previewUrl}"
              class="w-full h-full border-0"
              allow="autoplay"
              title="Preview Google Drive - ${doc.title}"
            ></iframe>
          </div>
        `;
      } else if (doc.format === "PDF" && doc.localPath) {
        // Untuk BUKU.pdf, kita bisa menampilkan pratinjau PDF lokal langsung sekalipun link Drive belum diisi
        previewAreaHtml = `
          <div class="relative w-full h-[460px] sm:h-[520px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900">
            <iframe
              id="drive-preview-iframe"
              src="${encodeURI(doc.localPath)}"
              class="w-full h-full border-0"
              title="Preview PDF - ${doc.title}"
            ></iframe>
          </div>
        `;
      } else {
        // Jika belum ada link Drive spesifik untuk file DOCX ini, tampilkan simulator pratinjau + form input instan link Drive
        const folderInfo = parseGoogleDriveUrl(state.config.driveFolderUrl);
        previewAreaHtml = `
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <!-- Kolom Kiri: Lembar Pratinjau Dokumen Cepat -->
            <div class="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-inner flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                      DOCX
                    </div>
                    <div>
                      <p class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">${state.config.schoolName}</p>
                      <p class="text-xs text-slate-500 dark:text-slate-400">Penyusun: ${state.config.teacherName}</p>
                    </div>
                  </div>
                  <span class="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    Siap Unduh & Cetak
                  </span>
                </div>

                <h4 class="text-base font-bold text-slate-900 dark:text-white mb-2">${doc.title}</h4>
                <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  ${doc.summary}
                </p>

                <div class="space-y-3">
                  <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <p class="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                      <i data-lucide="target" class="w-3.5 h-3.5 text-indigo-500"></i>
                      Tujuan Pembelajaran Utama:
                    </p>
                    <ul class="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      ${doc.objectives.map((o) => `<li class="flex items-start gap-2"><span class="text-indigo-500 font-bold">•</span><span>${o}</span></li>`).join("")}
                    </ul>
                  </div>

                  <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <p class="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                      <i data-lucide="list-tree" class="w-3.5 h-3.5 text-indigo-500"></i>
                      Struktur Bagian Dokumen:
                    </p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                      ${doc.outline.map((o) => `<div class="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">${o}</div>`).join("")}
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>Lokasi File: <code class="text-indigo-600 dark:text-indigo-400">${doc.localPath}</code></span>
                <span>${doc.pages}</span>
              </div>
            </div>

            <!-- Kolom Kanan: Panel Embed Google Drive -->
            <div class="lg:col-span-5 rounded-2xl border border-indigo-500/20 bg-gradient-to-b from-indigo-500/5 to-transparent p-6 flex flex-col justify-between">
              <div>
                <div class="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-4 shadow-lg shadow-indigo-600/20">
                  <i data-lucide="cloud" class="w-5 h-5"></i>
                </div>
                <h4 class="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                  Tautkan Google Drive Live Preview
                </h4>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Tempelkan link bagikan (<em>Share Link</em>) Google Drive atau Google Docs untuk dokumen <strong>${doc.code}</strong> di bawah ini agar tampilan embed dokumen tampil secara langsung di jendela ini.
                </p>

                <div class="space-y-3">
                  <div>
                    <label class="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                      URL Share Google Drive / File ID
                    </label>
                    <input
                      id="inline-drive-input"
                      type="text"
                      value="${rawUrl}"
                      placeholder="https://drive.google.com/file/d/1aBcDeFg.../view?usp=sharing"
                      class="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <button
                    onclick="window.PortalApp.saveInlineDriveUrl('${doc.id}')"
                    class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition-all shadow-sm"
                  >
                    <i data-lucide="sparkles" class="w-4 h-4"></i>
                    Aktifkan Live Preview Google Drive
                  </button>
                </div>

                <div class="mt-5 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 space-y-1">
                  <p class="font-bold flex items-center gap-1.5">
                    <i data-lucide="info" class="w-3.5 h-3.5"></i>
                    Tips Pengaturan Akses Google Drive:
                  </p>
                  <p class="text-[11px] leading-relaxed">
                    Pastikan akses file di Google Drive diatur ke <strong>"Siapa saja yang memiliki link" (Anyone with the link)</strong> agar pengunjung dapat melihat preview dan mengunduh tanpa kendala izin.
                  </p>
                </div>
              </div>

              ${
                folderInfo
                  ? `<div class="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800">
                      <a
                        href="${folderInfo.viewUrl}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-500 transition-all"
                      >
                        <i data-lucide="folder-open" class="w-4 h-4 text-indigo-500"></i>
                        Buka Folder Utama Google Drive
                      </a>
                    </div>`
                  : ""
              }
            </div>
          </div>
        `;
      }

      bodyEl.innerHTML = `
        <div class="space-y-4">
          <!-- Bar Tautan Google Drive Cepat -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800">
            <div class="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <i data-lucide="cloud" class="w-4 h-4 text-indigo-500 shrink-0"></i>
              ${
                driveInfo
                  ? `<span>Terhubung ke Google Drive ID: <code class="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-mono">${driveInfo.id}</code></span>`
                  : `<span>Anda dapat menautkan link Google Drive spesifik untuk dokumen ini kapan saja.</span>`
              }
            </div>
            <div class="flex items-center gap-2">
              ${
                driveInfo
                  ? `<a href="${driveInfo.viewUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700 hover:border-indigo-500">
                      <i data-lucide="external-link" class="w-3.5 h-3.5"></i> Buka di Tab Baru
                    </a>
                    <button onclick="window.PortalApp.promptEditSingleLink('${doc.id}')" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600">
                      <i data-lucide="edit-3" class="w-3.5 h-3.5"></i> Ubah Link
                    </button>`
                  : `<button onclick="window.PortalApp.openDriveManager()" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20">
                      <i data-lucide="settings-2" class="w-3.5 h-3.5"></i> Kelola Semua Link (25 Dokumen)
                    </button>`
              }
            </div>
          </div>

          ${previewAreaHtml}
        </div>
      `;
    } else {
      // Tab 2: Ringkasan Isi & Struktur Kurikulum Lengkap
      bodyEl.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 space-y-5">
            <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800">
              <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <i data-lucide="file-text" class="w-4 h-4 text-indigo-500"></i>
                Deskripsi & Rasional Dokumen
              </h4>
              <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                ${doc.summary}
              </p>
            </div>

            <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800">
              <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <i data-lucide="check-square" class="w-4 h-4 text-emerald-500"></i>
                Capaian & Tujuan Pembelajaran
              </h4>
              <ul class="space-y-2.5">
                ${doc.objectives
                  .map(
                    (obj, idx) => `
                  <li class="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <span class="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      ${idx + 1}
                    </span>
                    <span>${obj}</span>
                  </li>
                `
                  )
                  .join("")}
              </ul>
            </div>

            <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800">
              <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <i data-lucide="layers" class="w-4 h-4 text-violet-500"></i>
                Garis Besar Struktur Dokumen (Outline)
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                ${doc.outline
                  .map(
                    (section) => `
                  <div class="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2.5">
                    <i data-lucide="chevron-right" class="w-4 h-4 text-indigo-500 shrink-0"></i>
                    <span>${section}</span>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
          </div>

          <!-- Sidebar Informasi Metadata Dokumen -->
          <div class="space-y-4">
            <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3.5">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Identitas Perangkat
              </h4>
              <div class="space-y-2.5 text-xs">
                <div class="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span class="text-slate-500">Satuan Pendidikan</span>
                  <span class="font-semibold text-slate-900 dark:text-white text-right">${state.config.schoolName}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span class="text-slate-500">Guru Penyusun</span>
                  <span class="font-semibold text-slate-900 dark:text-white text-right">${state.config.teacherName}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span class="text-slate-500">Kelas / Fase</span>
                  <span class="font-semibold text-slate-900 dark:text-white">Kelas X / Fase E</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span class="text-slate-500">Semester</span>
                  <span class="font-semibold text-slate-900 dark:text-white">${doc.semester}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span class="text-slate-500">Alokasi Waktu</span>
                  <span class="font-semibold text-slate-900 dark:text-white">${doc.jp}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span class="text-slate-500">Format & Ukuran</span>
                  <span class="font-semibold text-slate-900 dark:text-white">.${doc.format} (${doc.fileSize})</span>
                </div>
                <div class="flex justify-between py-1.5">
                  <span class="text-slate-500">Pendekatan</span>
                  <span class="font-semibold text-indigo-600 dark:text-indigo-400">Deep Learning & KBC</span>
                </div>
              </div>
            </div>

            <div class="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-900 dark:text-indigo-200 space-y-2">
              <p class="font-bold flex items-center gap-1.5">
                <i data-lucide="heart-handshake" class="w-4 h-4 text-indigo-500"></i>
                Integrasi KBC & Deep Learning
              </p>
              <p class="leading-relaxed text-[11px] opacity-90">
                Perangkat ini dirancang dengan prinsip <strong>Mindful</strong> (berkesadaran), <strong>Meaningful</strong> (bermakna), dan <strong>Joyful</strong> (menggembirakan) serta menanamkan nilai cinta ilmu, kolaborasi, dan etika digital.
              </p>
            </div>
          </div>
        </div>
      `;
    }

    // Footer Modal Buttons (Download via Drive + Download File Lokal)
    if (footerEl) {
      footerEl.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-3 w-full">
          <button
            onclick="window.PortalApp.closePreview()"
            class="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Tutup Jendela
          </button>

          <div class="flex flex-wrap items-center gap-2.5">
            <a
              href="${encodeURI(doc.localPath)}"
              download
              class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              <i data-lucide="hard-drive-download" class="w-4 h-4 text-indigo-500"></i>
              Unduh File Lokal (.${doc.format})
            </a>

            ${
              driveInfo
                ? `
                <a
                  href="${driveInfo.viewUrl}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all"
                >
                  <i data-lucide="external-link" class="w-4 h-4"></i>
                  Buka di Google Drive
                </a>
                <a
                  href="${driveInfo.downloadUrl}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all"
                >
                  <i data-lucide="cloud-download" class="w-4 h-4"></i>
                  Download via Google Drive
                </a>
              `
                : `
                <button
                  onclick="window.PortalApp.downloadDocument('${doc.id}')"
                  class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all"
                >
                  <i data-lucide="download" class="w-4 h-4"></i>
                  Download Dokumen Sekarang
                </button>
              `
            }
          </div>
        </div>
      `;
    }
  }

  function saveInlineDriveUrl(docId) {
    const input = document.getElementById("inline-drive-input");
    if (!input) return;
    const val = input.value.trim();
    state.customLinks[docId] = val;
    saveLinksState();
    renderDocuments();

    const doc = window.DOCUMENTS_DATA.find((d) => d.id === docId);
    if (doc) {
      renderPreviewModalContent(doc, getDocDriveInfo(doc));
      if (window.lucide) window.lucide.createIcons();
    }
    showToast("Tautan Google Drive berhasil disimpan & diaktifkan!");
  }

  function promptEditSingleLink(docId) {
    const doc = window.DOCUMENTS_DATA.find((d) => d.id === docId);
    if (!doc) return;
    const current = getDocDriveRawUrl(doc);
    const updated = window.prompt(
      `Masukkan URL Share Google Drive / Google Docs untuk "${doc.title}" (kosongkan untuk mereset):`,
      current
    );
    if (updated === null) return;
    state.customLinks[docId] = updated.trim();
    saveLinksState();
    renderDocuments();
    renderPreviewModalContent(doc, getDocDriveInfo(doc));
    if (window.lucide) window.lucide.createIcons();
    showToast("Tautan dokumen berhasil diperbarui!");
  }

  // Fungsi Download Dokumen (prioritas: Direct Download Google Drive jika tersedia, atau File Lokal)
  function downloadDocument(docId) {
    const doc = window.DOCUMENTS_DATA.find((d) => d.id === docId);
    if (!doc) return;

    const driveInfo = getDocDriveInfo(doc);
    if (driveInfo && driveInfo.downloadUrl) {
      window.open(driveInfo.downloadUrl, "_blank", "noopener,noreferrer");
      showToast(`Mengunduh "${doc.code}" melalui Google Drive...`);
      return;
    }

    // Jika link Google Drive per-item belum diatur, unduh langsung dari path lokal
    if (doc.localPath) {
      const link = document.createElement("a");
      link.href = encodeURI(doc.localPath);
      link.setAttribute("download", doc.localPath.split("/").pop());
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast(`Mengunduh "${doc.title}" (${doc.fileSize})...`);
    }
  }

  // Modal Pengelola Tautan Google Drive Massal
  function openDriveManager() {
    const modal = document.getElementById("drive-manager-modal");
    if (!modal) return;

    const folderInput = document.getElementById("manager-folder-url");
    if (folderInput) folderInput.value = state.config.driveFolderUrl || "";

    const schoolInput = document.getElementById("manager-school-name");
    if (schoolInput) schoolInput.value = state.config.schoolName || "";

    const teacherInput = document.getElementById("manager-teacher-name");
    if (teacherInput) teacherInput.value = state.config.teacherName || "";

    const listContainer = document.getElementById("manager-links-list");
    if (listContainer) {
      listContainer.innerHTML = window.DOCUMENTS_DATA.map((doc) => {
        const val = getDocDriveRawUrl(doc);
        const info = parseGoogleDriveUrl(val);
        return `
          <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="sm:w-5/12">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">${doc.code}</span>
                <span class="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">${doc.title}</span>
              </div>
              <p class="text-[11px] text-slate-400 mt-0.5">File lokal: ${doc.localPath}</p>
            </div>
            <div class="sm:w-7/12 flex items-center gap-2">
              <input
                type="text"
                data-doc-link-input="${doc.id}"
                value="${val}"
                placeholder="Tempel link Google Drive (https://drive.google.com/file/d/.../view)"
                class="w-full px-3 py-2 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span class="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                info ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-200 dark:bg-slate-800 text-slate-400"
              }" title="${info ? "ID Terdeteksi: " + info.id : "Belum diisi"}">
                <i data-lucide="${info ? "check" : "minus"}" class="w-3.5 h-3.5"></i>
              </span>
            </div>
          </div>
        `;
      }).join("");
    }

    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    if (window.lucide) window.lucide.createIcons();
  }

  function closeDriveManager() {
    const modal = document.getElementById("drive-manager-modal");
    if (modal) modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }

  function saveAllDriveLinks() {
    const folderInput = document.getElementById("manager-folder-url");
    const schoolInput = document.getElementById("manager-school-name");
    const teacherInput = document.getElementById("manager-teacher-name");

    if (folderInput) state.config.driveFolderUrl = folderInput.value.trim();
    if (schoolInput && schoolInput.value.trim()) state.config.schoolName = schoolInput.value.trim();
    if (teacherInput && teacherInput.value.trim()) state.config.teacherName = teacherInput.value.trim();

    const inputs = document.querySelectorAll("[data-doc-link-input]");
    inputs.forEach((inp) => {
      const id = inp.getAttribute("data-doc-link-input");
      if (id) {
        state.customLinks[id] = inp.value.trim();
      }
    });

    saveLinksState();
    applyIdentityConfigToDOM();
    renderDocuments();
    renderElementsGrid();
    closeDriveManager();
    showToast("Seluruh konfigurasi & tautan Google Drive berhasil disimpan!");
  }

  function exportConfigJson() {
    const payload = {
      config: state.config,
      customLinks: state.customLinks,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "konfigurasi-drive-informatika-x.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("File konfigurasi JSON berhasil diunduh!");
  }

  function importConfigJson(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed.config) {
          state.config = { ...window.DEFAULT_CONFIG, ...parsed.config };
        }
        if (parsed.customLinks) {
          state.customLinks = { ...state.customLinks, ...parsed.customLinks };
        }
        saveLinksState();
        applyIdentityConfigToDOM();
        renderDocuments();
        renderElementsGrid();
        openDriveManager();
        showToast("Konfigurasi JSON berhasil diimpor!");
      } catch (err) {
        showToast("Format file JSON tidak valid.");
      }
    };
    reader.readAsText(file);
  }

  function applyIdentityConfigToDOM() {
    document.querySelectorAll("[data-bind-school]").forEach((el) => {
      el.textContent = state.config.schoolName;
    });
    document.querySelectorAll("[data-bind-teacher]").forEach((el) => {
      el.textContent = state.config.teacherName;
    });
    document.querySelectorAll("[data-bind-drive-folder]").forEach((el) => {
      el.setAttribute("href", state.config.driveFolderUrl || "#");
    });
  }

  // Kontrol Widget Embedded Folder Google Drive di Landing Page
  function switchDriveFolderEmbed(folderKey, viewType) {
    if (folderKey) state.activeDriveFolderKey = folderKey;
    if (viewType) state.activeDriveFolderView = viewType;

    const subfolders = (window.DEFAULT_CONFIG && window.DEFAULT_CONFIG.subfolders) || {};
    const activeFolder = subfolders[state.activeDriveFolderKey] || subfolders.main;
    if (!activeFolder) return;

    const iframe = document.getElementById("embedded-drive-folder-iframe");
    const openLink = document.getElementById("embedded-drive-folder-open");
    const titleEl = document.getElementById("embedded-drive-folder-title");

    if (iframe) {
      iframe.src = `https://drive.google.com/embeddedfolderview?id=${activeFolder.id}#${state.activeDriveFolderView}`;
    }
    if (openLink) {
      openLink.href = activeFolder.url;
    }
    if (titleEl) {
      titleEl.textContent = activeFolder.name;
    }

    document.querySelectorAll("[data-drive-folder-tab]").forEach((btn) => {
      const isAct = btn.getAttribute("data-drive-folder-tab") === state.activeDriveFolderKey;
      btn.className = isAct
        ? "px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
        : "px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/10 text-slate-200 hover:bg-white/20 border border-white/10 transition-all flex items-center gap-2";
    });

    document.querySelectorAll("[data-drive-folder-view]").forEach((btn) => {
      const isAct = btn.getAttribute("data-drive-folder-view") === state.activeDriveFolderView;
      btn.className = isAct
        ? "px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-500 text-white transition-all"
        : "px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white transition-all";
    });
  }

  // Toast Notification
  function showToast(message) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className =
      "flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold shadow-xl border border-slate-700/50 transition-all duration-300";
    toast.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-emerald-400 dark:bg-emerald-600 shrink-0"></span>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("opacity-0", "translate-y-2");
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Filter & Search Handlers
  function setCategory(cat) {
    state.category = cat;
    document.querySelectorAll("[data-filter-cat]").forEach((btn) => {
      const isMatch = btn.getAttribute("data-filter-cat") === cat;
      btn.className = isMatch
        ? "px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-sm shadow-indigo-600/20 transition-all"
        : "px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/40 transition-all";
    });
    renderDocuments();
  }

  function setSemester(sem) {
    state.semester = sem;
    document.querySelectorAll("[data-filter-sem]").forEach((btn) => {
      const isMatch = btn.getAttribute("data-filter-sem") === sem;
      btn.className = isMatch
        ? "px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 transition-all"
        : "px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all";
    });
    renderDocuments();
  }

  function setViewMode(mode) {
    state.viewMode = mode;
    const gridBtn = document.getElementById("view-btn-grid");
    const listBtn = document.getElementById("view-btn-list");
    if (gridBtn && listBtn) {
      if (mode === "grid") {
        gridBtn.className = "p-2 rounded-lg bg-indigo-600 text-white transition-all";
        listBtn.className = "p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all";
      } else {
        listBtn.className = "p-2 rounded-lg bg-indigo-600 text-white transition-all";
        gridBtn.className = "p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all";
      }
    }
    renderDocuments();
  }

  function resetFilters() {
    state.search = "";
    const searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.value = "";
    setCategory("all");
    setSemester("all");
  }

  // Tema Gelap / Terang
  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEY_THEME);
    if (saved === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      // Default dark/modern mode
      document.documentElement.classList.add("dark");
    }
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem(STORAGE_KEY_THEME, isDark ? "dark" : "light");
    if (window.lucide) window.lucide.createIcons();
  }

  // Inisialisasi saat DOM siap
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    loadSavedState();
    applyIdentityConfigToDOM();
    renderElementsGrid();
    renderDocuments();

    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        state.search = e.target.value;
        renderDocuments();
      });
    }

    // Shortcut Ctrl+K untuk fokus pencarian & Esc untuk menutup modal
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (searchInput) {
          searchInput.focus();
          searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else if (e.key === "Escape") {
        closePreview();
        closeDriveManager();
      }
    });

    if (window.lucide) window.lucide.createIcons();
  });

  // Ekspos API global untuk event handler inline
  window.PortalApp = {
    setCategory,
    setSemester,
    setViewMode,
    resetFilters,
    openPreview,
    closePreview,
    switchModalTab,
    saveInlineDriveUrl,
    promptEditSingleLink,
    downloadDocument,
    openDriveManager,
    closeDriveManager,
    saveAllDriveLinks,
    exportConfigJson,
    importConfigJson,
    switchDriveFolderEmbed,
    toggleTheme
  };
})();
