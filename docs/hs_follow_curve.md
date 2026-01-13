## HS Follow Curve 版本 5.20
发布日期：2018 年 2 月 1 日

### 概述
此工具类似于“跟随路径”功能。其主要区别在于，它将“要跟随的路径”中的控制点用作时间点。

当矢量图层、骨骼层或切换层（包括逐帧切换）处于活动状态时，此工具可用。

使用光标选择任意矢量图层上的任意路径，选定的点或骨骼将沿着所选路径平移。

工具栏包含四个主要字段：

- 关键帧间隔 – 有效值介于 1 到 60 之间（含 1 和 60），默认值为 3。
- 一个复选框，用于控制是否将新生成的关键帧添加到时间线并保留现有关键帧，或者是否删除新路径范围内的关键帧。默认情况下，重叠的关键帧将被删除。
- 一对单选按钮，用于控制是沿着所选路径平移骨骼，还是使用逆运动学 (IK) 沿路径移动所选骨骼的末端。
- 一个用于选择点以使用套索模式的复选框（从标准点选择工具复制/复制）（套索选项不适用于骨骼选择）。

---

### 使用方法
选择包含要移动对象的图层。

（可选）选择要移动的点或骨骼。

激活“跟随曲线”工具。

选择所需的关键帧间隔。

如果选择了骨骼图层，请决定骨骼是沿路径平移还是旋转（使用反向运动学）。请注意，如果选择反向运动学，则只能处理一根骨骼。如果选择骨骼平移，则所选骨骼不能位于同一链中（见下文）。

按住 Alt 键可以选择目标点集或目标骨骼。在首次单击鼠标时按住 Alt 键，选择模式将启用，直到松开鼠标为止。请注意，移动鼠标时无需按住 Alt 键。

>> 在矢量图层（即实际的矢量图层或逐帧组中的活动矢量图层）上，选择模式允许您修改要平移的点的选择。可以平移任意数量的点。系统会调用标准点选择工具，因此可以使用 Alt 和 Shift 键来移除或添加选区中的点。
>>
>> 在骨骼类型图层（例如骨骼或开关图层）上，选择模式允许您选择单个骨骼。

按住鼠标按钮并将光标移动到要跟随的路径上的任意位置——此时会出现一个选择栏，显示起点（大标记）和终点（小标记）。沿线点的颜色由“清除重叠”复选框的选中状态决定。颜色设置来自“首选项/编辑器颜色”：“选择”表示要删除关键帧；“对象”表示不删除关键帧。

按住 Shift 键可以改变沿路径的方向。

只有在松开鼠标按钮时选中要跟随的曲线，才会生成关键帧。关键帧会按照选定的间隔，使用“要跟随的路径”上的每个点生成。 （例如，如果“要跟随的路径”有 7 个点，选择的间隔为 2，时间轴位于第 15 帧，则会在第 15、17、19、21、23、25 和 27 帧生成关键帧。）这些是所选点的点平移关键帧或所选骨骼的骨骼平移关键帧。如果在生成的动画持续时间内，任何所选项目存在关键帧，则除非取消选中“清除重叠”复选框，否则这些关键帧将被删除。生成的动画之前和之后的关键帧不受影响（可能需要手动删除这些关键帧）。

如果要跟随的路径是闭合路径，则会生成额外的关键帧，使平移循环。（例如，如果“要跟随的路径”有 7 个点，选择的间隔为 2，时间线位于第 15 帧，则会在第 15 帧到第 27 帧生成关键帧，并在第 29 帧生成一个循环关键帧。）选择闭合路径时，会在选择线上绘制一个圆圈。

请注意，要跟随的路径不必是形状（换句话说，它可以只是一个没有描边或填充的路径，因此在渲染时将不可见）。

如果使用此工具时选择了多个骨骼进行平移，则所有具有父骨骼的骨骼都将被取消选择，并且只会平移最早的父骨骼。（尝试沿完全相同的路径平移父骨骼和子骨骼可能会导致不可预测的结果）。

如果使用此工具时选择了多个骨骼进行 IK 处理，则会生成错误消息，并且不会执行任何其他操作。

如果选择多个点或骨骼进行平移，则选择的中心点将沿着曲线移动。

---

### 安装
Moho 发布系统包含用户自定义文件夹。如果尚未创建此结构，则需要创建（请参阅“帮助/设置自定义内容文件夹”）。

工具图标、光标和脚本本身（hs_follow_curve.png、hs_follow_curve_cursor.png 和 hs_follow_curve.lua）需要放在以下目录中：

`<自定义内容文件夹>\scripts\tool`

---

### 自 V5.10（2016 年 2 月）以来有哪些更改？
新增对 Moho 12 用户界面的支持；此版本仅可在 Moho 12 或更高版本上运行。除此之外，基础代码保持不变：没有报告或检测到任何错误，核心功能也没有任何变化。

### 注意事项和已知问题
此版本的工具设计用于 Moho 12 或更高版本。

欢迎通过 Moho 官方或非官方论坛提出意见、错误报告、功能请求等。

此版本不支持本地化。

---

#### 下一版本的计划变更包括 ：
- 根据需求添加新功能
- 修复已报告或已解决的错误

#### 后续版本可能进行的变更包括 ：
- 骨骼旋转/缩放，使骨骼尖端能够沿路径移动
- 使点与路径方向对齐
- 使骨骼与路径方向对齐


```javascript
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
```