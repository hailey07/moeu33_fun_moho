let allData = [];
let currentView = 'board'; 
let currentFilter = 'all';
let currentSort = 'default';

document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            allData = data;
            initFilterOptions(data);
            const params = new URLSearchParams(window.location.search);
            const query = params.get('q');
            if (query) {
                const searchInput = document.getElementById('search-input');
                if(searchInput) searchInput.value = decodeURIComponent(query);
            }
            render(); 
        })
        .catch(err => console.error("读取 data.json 失败", err));
});

function initFilterOptions(data) {
    const filterSelect = document.getElementById('filter-select');
    
    // 【修改点】先用 map 获取所有分类，再用 flat() 把数组拍平
    // 例如：[["绘图"], ["绘图", "骨骼"]] 变成 ["绘图", "绘图", "骨骼"]
    const allCategories = data.map(item => item.category).flat();
    
    // 然后用 Set 去重
    const categories = [...new Set(allCategories)];
    
    // 可选：让分类按中文拼音排序，这样更整齐
    // categories.sort((a, b) => a.localeCompare(b, 'zh-CN'));

    categories.forEach(cat => {
        // 过滤掉可能存在的空值
        if (!cat) return; 
        
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = `🏷️ ${cat}`;
        filterSelect.appendChild(option);
    });
}

function switchView(mode) {
    currentView = mode;
    document.getElementById('btn-board').className = mode === 'board' ? 'active' : '';
    document.getElementById('btn-table').className = mode === 'table' ? 'active' : '';
    render();
}

function handleSearch() { render(); }
function handleFilter() { 
    currentFilter = document.getElementById('filter-select').value;
    render(); 
}
function handleSort() { 
    currentSort = document.getElementById('sort-select').value;
    render(); 
}

function getLink(id) {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    return isLocal ? `detail.html?id=${id}` : `scripts/${id}`;
}

// --- 核心渲染函数 ---
function render() {
    const container = document.getElementById('app-container');
    const searchInput = document.getElementById('search-input');
    if (!container || !searchInput) return;

    const searchText = searchInput.value.toLowerCase().trim();

    // 1. 搜索过滤
    let processedData = allData.filter(item => 
        item.name.toLowerCase().includes(searchText) || 
        item.category.toLowerCase().includes(searchText) || 
        (item.author && item.author.toLowerCase().includes(searchText)) ||
        (item.supportVer && item.supportVer.toLowerCase().includes(searchText)) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchText))
    );

    // 2. 类别筛选
    if (currentFilter !== 'all') {
        processedData = processedData.filter(item => {
            // 如果 item.category 是数组 (例如 ["绘图", "骨骼"])
            if (Array.isArray(item.category)) {
                return item.category.includes(currentFilter);
            }
            // 如果 item.category 是普通字符串 (例如 "绘图")
            return item.category === currentFilter;
        });
    }

    // 3. 排序 logic
    if (currentSort !== 'default') {
        processedData.sort((a, b) => {
            if (currentSort === 'date-desc') {
                return new Date(b.date) - new Date(a.date);
            } else if (currentSort === 'date-asc') {
                return new Date(a.date) - new Date(b.date);
            } else if (currentSort === 'name-asc') {
                // A-Z
                return a.name.localeCompare(b.name, 'zh-CN');
            } else if (currentSort === 'name-desc') {
                // 【新增】 Z-A
                return b.name.localeCompare(a.name, 'zh-CN');
            }
            return 0;
        });
    }

    container.innerHTML = ''; 

    if (currentView === 'board') {
        renderBoard(container, processedData);
    } else {
        renderTable(container, processedData);
    }
}

function renderBoard(container, data) {
    container.className = 'board-view';
    const colorMap = {
        "绘图": "color-orange", "图层": "color-blue", "动画": "color-red", "骨骼": "color-purple", 
        "其他": "color-yellow", "软件协作":"color-teal", "文档清理": "color-gray"
    };
    const categoryOrder = ["绘图", "图层", "动画", "骨骼", "软件协作", "文档清理", "其他"];
    
    // 【修改点 1】提取分类时，使用 flat() 把数组拆开，确保列名是单一的
    let categories = [...new Set(data.map(item => item.category).flat())];

    // 排序逻辑保持不变
    categories.sort((a, b) => {
        let indexA = categoryOrder.indexOf(a);
        let indexB = categoryOrder.indexOf(b);
        if (indexA === -1) indexA = 999;
        if (indexB === -1) indexB = 999;
        return indexA - indexB;
    });

    if (data.length === 0) {
        container.innerHTML = `<div style="width:100%;text-align:center;color:#999;margin-top:50px;">没有找到相关内容 🍃</div>`;
        return;
    }

    categories.forEach(cat => {
        // 过滤出空分类（以防万一）
        if (!cat) return;

        // 【修改点 2】筛选属于当前列（cat）的卡片
        // 逻辑：如果 item.category 包含当前列名，就把它放进来
        const items = data.filter(item => {
            if (Array.isArray(item.category)) {
                return item.category.includes(cat);
            }
            return item.category === cat;
        });
        
        // 如果某一列没有数据，是否显示的逻辑（当前是只要分类存在就显示，即使为空）
        // 如果你想隐藏空列，可以在这里加： if (items.length === 0) return;

        const colDiv = document.createElement('div');
        colDiv.className = 'board-column';
        const colorClass = colorMap[cat] || "color-gray"; 

        const cardsHtml = items.map(item => `
            <a href="${getLink(item.id)}" class="board-card ${colorClass}" target="_blank">
                <div class="card-top">
                    <span class="card-icon">${item.icon}</span>
                    <span class="card-title">${item.name}</span>
                </div>
                <div class="card-meta">
                    <span>v${item.version}</span>
                    <span>${item.date}</span>
                </div>
            </a>
        `).join('');

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
    container.className = 'table-mode-container'; 
    
    if (data.length === 0) {
        container.innerHTML = `<div style="text-align:center;color:#999;margin-top:50px;">没有找到相关内容 🍃</div>`;
        return;
    }

    const table = document.createElement('table');
    table.className = 'table-view';

    // ============================================================
    // 1. 【自定义列宽】在这里修改每一列的宽度
    //    你可以使用百分比 (20%) 或 像素 (150px)
    // ============================================================
    const colWidths = {
        name:     "35%",  // 名称
        category: "15%",  // 分类
        tags:     "15%",  // 标签
        version:  "15%",   // 版本
        author:   "30%",  // 作者
        date:     "20%"   // 更新日期
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
    const tbody = table.querySelector('tbody');
    
    // --- 辅助函数：生成多个标签 ---
    // 支持输入：数组 ["A", "B"] 或 逗号分隔字符串 "A, B" 或 单一字符串 "A"
    function generateBadges(input, colorClass) {
        if (!input) return ''; 
        let arr = [];
        if (Array.isArray(input)) {
            arr = input;
        } else if (typeof input === 'string') {
            // 如果包含逗号，尝试分割；否则直接作为单个元素
            arr = input.includes(',') ? input.split(',').map(s => s.trim()) : [input];
        } else {
            return '';
        }
        return arr.map(text => `<span class="tag-badge ${colorClass}" style="margin-bottom:0">${text}</span>`).join('');
    }
    
    data.forEach(item => {
        const tr = document.createElement('tr');
        tr.addEventListener('click', (e) => {
            // 防止点击内部链接时触发整行跳转
            if (e.target.closest('a')) return;
            window.open(getLink(item.id), '_blank');
        });

        // 2. 【多标签识别】现在对 category, tags, author 都使用 generateBadges 函数
        const nameHtml = `
            <span class="table-icon">${item.icon}</span>
            <a href="${getLink(item.id)}" target="_blank" class="row-title">${item.name}</a>
        `;
        
        // 生成各列的 HTML
        const categoryHtml = generateBadges(item.category, 'tag-blue');
        const tagsHtml     = generateBadges(item.tags, 'tag-orange');
        const authorHtml   = generateBadges(item.author || 'Unknown', 'tag-purple');

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
