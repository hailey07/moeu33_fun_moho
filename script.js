let allData = [];
let currentView = "board"; // 默认为看板
let currentSort = "default";

document.addEventListener("DOMContentLoaded", () => {
    // 1. 初始化检查：页面刚打开时判断一次
    checkMobileMode();

    // 2. 【新增】动态监听：防止用户拖拽窗口或手机旋转屏幕时，视图卡在看板模式
    window.addEventListener("resize", () => {
        checkMobileMode();
    });

    fetch("data.json")
        .then((res) => res.json())
        .then((data) => {
            // 数据预处理：生成全能搜索字符串
            allData = data.map((item) => {
                const searchString = Object.values(item).flat().join(" ").toLowerCase();
                return { ...item, _searchStr: searchString };
            });

            // 读取 URL 搜索参数
            const params = new URLSearchParams(window.location.search);
            const query = params.get("q");
            if (query) {
                const searchInput = document.getElementById("search-input");
                if (searchInput) {
                    searchInput.value = decodeURIComponent(query);
                }
            }

            // 渲染页面
            render();

            // 绑定搜索输入事件
            const searchInput = document.getElementById("search-input");
            if (searchInput) {
                searchInput.addEventListener("input", () => {
                    render();
                });
            }
        })
        .catch((err) => console.error("读取 data.json 失败", err));
});

// 【核心逻辑】检查移动端模式
function checkMobileMode() {
    const isMobile = window.innerWidth <= 768;

    // 如果是移动端，且当前不是表格视图，强制切换
    if (isMobile && currentView !== "table") {
        currentView = "table";
        updateButtonState(); // 更新按钮样式（虽然看不见，但逻辑要对）

        // 如果数据已经加载完毕，立即重新渲染
        if (allData.length > 0) {
            render();
        }
    }
}

// 切换视图主函数
function switchView(mode) {
    currentView = mode;
    updateButtonState();
    render();
}

// 更新按钮的高亮状态
function updateButtonState() {
    const btnBoard = document.getElementById("btn-board");
    const btnTable = document.getElementById("btn-table");

    if (btnBoard) btnBoard.className = currentView === "board" ? "active" : "";
    if (btnTable) btnTable.className = currentView === "table" ? "active" : "";
}

// 排序处理
function handleSort() {
    currentSort = document.getElementById("sort-select").value;
    render();
}

// 搜索处理
function handleSearch() {
    render();
}

// 获取链接
function getLink(id) {
    const isLocal =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";
    return isLocal ? `detail.html?id=${id}` : `scripts/${id}`;
}

// --- 核心渲染函数 ---
function render() {
    const container = document.getElementById("app-container");
    const searchInput = document.getElementById("search-input");
    if (!container || !searchInput) return;

    // 1. 过滤
    const searchText = searchInput.value.toLowerCase().trim();
    let processedData = allData.filter((item) => {
        if (!searchText) return true;
        return item._searchStr.includes(searchText);
    });

    // 2. 排序
    if (currentSort !== "default") {
        processedData.sort((a, b) => {
            if (currentSort === "date-desc") {
                return new Date(b.date) - new Date(a.date);
            } else if (currentSort === "date-asc") {
                return new Date(a.date) - new Date(b.date);
            } else if (currentSort === "name-asc") {
                return a.name.localeCompare(b.name, "zh-CN");
            } else if (currentSort === "name-desc") {
                return b.name.localeCompare(a.name, "zh-CN");
            }
            return 0;
        });
    }

    container.innerHTML = "";

    // 3. 根据视图模式渲染
    if (currentView === "board") {
        renderBoard(container, processedData);
    } else {
        renderTable(container, processedData);
    }
}

function renderBoard(container, data) {
    container.className = "board-view";
    const colorMap = {
        绘图: "color-orange",
        图层: "color-blue",
        动画: "color-red",
        骨骼: "color-purple",
        其他: "color-yellow",
        软件协作: "color-teal",
        文档清理: "color-gray",
    };
    // 这里保持你原有的分类逻辑
    const categoryOrder = [
        "绘图",
        "图层",
        "动画",
        "骨骼",
        "其他",
        "软件协作",
        "文档清理",
    ];

    let categories = [...new Set(data.map((item) => item.category).flat())];

    categories.sort((a, b) => {
        let indexA = categoryOrder.indexOf(a);
        let indexB = categoryOrder.indexOf(b);
        if (indexA === -1) indexA = 999;
        if (indexB === -1) indexB = 999;
        return indexA - indexB;
    });

    if (data.length === 0) {
        container.innerHTML = `<div style="width:100%;text-align:center;color:#999;margin-top:50px;">没有找到匹配 "${document.getElementById("search-input").value
            }" 的内容 🍃</div>`;
        return;
    }

    categories.forEach((cat) => {
        if (!cat) return;
        const items = data.filter((item) => {
            if (Array.isArray(item.category)) {
                return item.category.includes(cat);
            }
            return item.category === cat;
        });
        if (items.length === 0) return;

        const colDiv = document.createElement("div");
        colDiv.className = "board-column";
        const colorClass = colorMap[cat] || "color-gray";

        const cardsHtml = items
            .map(
                (item) => `
            <a href="${getLink(
                    item.id
                )}" class="board-card ${colorClass}" target="_blank">
            <div class="card-area">
                <div class="card-logo">
                    <span class="card-icon">${item.icon}</span>
                </div>
                <div class="card-test">
                    <div class="card-header">
                        <span class="card-title">${item.name}</span>
                    </div>
                    <div class="card-meta">
                        <span>v${item.version}</span>
                        <span>${item.date}</span>
                    </div>
                </div>
            </div>
            </a>
        `
            )
            .join("");

        colDiv.innerHTML = `
            <div class="column-header">
                <span class="tag-badge tag-blue">${cat}</span> 
                <span class="column-count">${items.length}</span>
            </div>
            ${cardsHtml}
        `;
        container.appendChild(colDiv);
    });
}

function renderTable(container, data) {
    container.className = "table-mode-container";
    if (data.length === 0) {
        container.innerHTML = `<div style="text-align:center;color:#999;margin-top:50px;">没有找到匹配 "${document.getElementById("search-input").value
            }" 的内容 🍃</div>`;
        return;
    }

    const table = document.createElement("table");
    table.className = "table-view";

    // 注意：CSS 会自动隐藏移动端不需要的列，这里保留完整结构即可
    const colWidths = {
        name: "40%",
        category: "15%",
        tags: "20%",
        version: "15%",
        author: "20%",
        date: "15%",
    };

    table.innerHTML = `
        <thead>
            <tr>
                <th style="width: ${colWidths.name}">名称</th>
                <th style="width: ${colWidths.category}">分类</th>
                <th style="width: ${colWidths.tags}">标签</th> 
                <th style="width: ${colWidths.version}">版本</th>
                <th style="width: ${colWidths.author}">作者</th> 
                <th style="width: ${colWidths.date}">更新日期</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");

    function generateBadges(input, colorClass) {
        if (!input) return "";
        let arr = [];
        if (Array.isArray(input)) {
            arr = input;
        } else if (typeof input === "string") {
            arr = input.includes(",")
                ? input.split(",").map((s) => s.trim())
                : [input];
        } else {
            return "";
        }
        return arr
            .map(
                (text) =>
                    `<span class="tag-badge ${colorClass}" style="margin-bottom:0">${text}</span>`
            )
            .join("");
    }

    data.forEach((item) => {
        const tr = document.createElement("tr");
        tr.addEventListener("click", (e) => {
            if (e.target.closest("a")) return;
            window.open(getLink(item.id), "_blank");
        });

        const nameHtml = `
            <span class="table-icon">${item.icon}</span>
            <a href="${getLink(item.id)}" target="_blank" class="row-title">${item.name
            }</a>
        `;
        const categoryHtml = generateBadges(item.category, "tag-blue");
        const tagsHtml = generateBadges(item.tags, "tag-orange");
        const authorHtml = generateBadges(item.author || "Unknown", "tag-purple");

        tr.innerHTML = `
            <td>${nameHtml}</td>
            <td>${categoryHtml}</td>
            <td>${tagsHtml}</td>
            <td>v${item.version}</td>
            <td>${authorHtml}</td>
            <td style="color:#999">${item.date}</td>
        `;
        tbody.appendChild(tr);
    });

    container.appendChild(table);
}
