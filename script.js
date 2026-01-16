let allData = [];
let currentView = "board"; // 默认为看板
let currentSort = "date-desc";

document.addEventListener("DOMContentLoaded", () => {
    // --- [新增] 1. 主题初始化逻辑 (必须放在最前面) ---
    initTheme();
    // --- [新增] 修复移动端 :active 状态卡死的问题 ---
    fixMobileActiveState();
// --- [新增] 彩蛋初始化 ---
    initEasterEgg(); // <--- 添加这一行
    // 2. 初始化检查：页面刚打开时判断一次
    checkMobileMode();

    // 3. 动态监听：防止用户拖拽窗口或手机旋转屏幕时，视图卡在看板模式
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

// 定义图标 HTML 字符串
// 太阳图标 (用于深色模式下，提示点击切换回白天)
// =========================================
// [新增] 深色模式逻辑 (Dark Mode Logic)
// =========================================

const iconSun = '<svg class="icon-svg" aria-hidden="true"><use xlink:href="#icon-taiyang"></use></svg>';
const iconMoon = '<svg class="icon-svg" aria-hidden="true"><use xlink:href="#icon-yueliang"></use></svg>';

// 1. 初始化主题
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 逻辑优化：
    // 1. 如果有缓存，用缓存
    // 2. 如果没缓存，用系统状态
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
        applyDark(true);
    } else {
        applyDark(false);
    }
}

// 2. 核心应用函数 (抽离出来方便复用)
function applyDark(isDark) {
    const html = document.documentElement;
    const btn = document.getElementById('theme-toggle');
    
    if (isDark) {
        html.setAttribute('data-theme', 'dark');
        if(btn) btn.innerHTML = iconSun;
    } else {
        html.removeAttribute('data-theme');
        if(btn) btn.innerHTML = iconMoon;
    }
}

// 3. 切换按钮点击事件
function toggleTheme() {
    const html = document.documentElement;
    const isDarkNow = html.getAttribute('data-theme') === 'dark';
    
    // 既然用户手动点击了，我们就保存用户的偏好，不再跟随系统
    if (isDarkNow) {
        applyDark(false); // 变亮
        localStorage.setItem('theme', 'light');
    } else {
        applyDark(true);  // 变暗
        localStorage.setItem('theme', 'dark');
    }
}

// 4. [新增] 监听系统变化
// 当用户没有手动设置过偏好(localStorage为空)时，实时跟随系统变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const savedTheme = localStorage.getItem('theme');
    // 只有在用户"未手动锁定"过主题的情况下，才自动切换
    if (!savedTheme) {
        applyDark(e.matches);
    }
});
// =========================================
// [新增] 彩蛋逻辑 (Easter Egg)
// =========================================
function initEasterEgg() {
    // 同时选择主页的 Logo 和详情页的面包屑 Icon
    const targets = document.querySelectorAll('.index-logo, .breadcrumb-home-icon');
    let clickCount = 0;
    let resetTimer = null;

    targets.forEach(el => {
        el.addEventListener('click', (e) => {
            // 如果你原本的 HTML 结构中图片被包裹在链接里，这里需要阻止跳转
            // 根据你的代码，index.html 的图片没包在 a 标签里，但为了保险起见：
            // e.preventDefault(); 

            clickCount++;
            
            // 添加一个点击的抖动效果 (可选，增加交互感)
            el.style.transition = "transform 0.1s";
            el.style.transform = `scale(0.9) rotate(${Math.random() * 20 - 10}deg)`;
            setTimeout(() => {
                el.style.transform = ""; // 恢复原样（会回到 CSS hover 定义的状态）
            }, 100);

            // 清除之前的重置计时器（如果用户连续点击，就不重置）
            if (resetTimer) clearTimeout(resetTimer);

            // 如果点击超过 6 次
            if (clickCount > 10) {
                showToast("别点了，回首页点旁边的字！😠");
                clickCount = 0; // 重置计数，避免一直弹
            }

            // 如果用户停止点击 2 秒，计数清零
            resetTimer = setTimeout(() => {
                clickCount = 0;
            }, 2000);
        });
    });
}

// 显示浮动提示框的通用函数
function showToast(msg) {
    // 防止重复创建堆叠
    if (document.querySelector('.egg-toast')) return;

    const toast = document.createElement('div');
    toast.className = 'egg-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);

    // 动画结束后（对应 CSS 的 3s），移除元素
    setTimeout(() => {
        if(toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}
function fixMobileActiveState() {
    // 1. 激活 iOS 的 CSS :active 支持 (这是一个著名的 Hack)
    document.body.addEventListener('touchstart', function() {}, {passive: true});

    // 2. 强制在点击后失去焦点 (移除 :focus 状态，防止样式残留)
    // 监听所有的点击事件
    document.addEventListener('touchend', (e) => {
        // 给一点点延迟，让点击动画播放完，然后移除焦点
        setTimeout(() => {
            // 获取当前聚焦的元素
            const activeEl = document.activeElement;
            if (activeEl && (activeEl.tagName === 'A' || activeEl.tagName === 'BUTTON' || activeEl.classList.contains('btn-download'))) {
                activeEl.blur(); // 移除焦点，浏览器会随之移除 :active 和 :focus 样式
            }
        }, 300); // 300ms 刚好够你看清按下的动画
    });
}