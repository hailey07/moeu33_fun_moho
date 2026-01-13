let allData = [];
let currentView = 'board';
let currentSort = 'default';

document.addEventListener('DOMContentLoaded', () => {
    // 【新增】检测是否为移动端 (小于 768px)，如果是，强制使用表格视图
    if (window.innerWidth <= 768) {
        currentView = 'table';
        // 更新按钮状态（虽然 CSS 会隐藏它，但逻辑上保持一致）
        const btnBoard = document.getElementById('btn-board');
        const btnTable = document.getElementById('btn-table');
        if (btnBoard) btnBoard.className = '';
        if (btnTable) btnTable.className = 'active';
    }
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            // 【关键步骤】预处理数据：给每个条目生成一个“全能搜索字符串”
            // 这样搜索速度极快，而且不会漏掉任何信息
            allData = data.map(item => {
                // 将该条目的所有属性值（不包含属性名）提取出来，转为小写字符串
                // 例如：name, author, id, tags, realName 全部拼在一起
                const searchString = Object.values(item)
                    .flat()             // 把数组属性（如 tags）拍平
                    .join(' ')          // 用空格连接
                    .toLowerCase();     // 转小写以便忽略大小写差异
                
                return { ...item, _searchStr: searchString };
            });

            // 初始化：检查 URL 是否有搜索参数 ?q=xxx
            const params = new URLSearchParams(window.location.search);
            const query = params.get('q');
            if (query) {
                const searchInput = document.getElementById('search-input');
                if (searchInput) {
                    searchInput.value = decodeURIComponent(query);
                }
            }
            
            // 渲染初始页面
            render();

            // 【绑定输入事件】实现“边打字边搜索”
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                // 'input' 事件：每次按键都会触发，实现自动匹配
                searchInput.addEventListener('input', () => {
                    render();
                });
            }
        })
        .catch(err => console.error("读取 data.json 失败", err));
});

function switchView(mode) {
    currentView = mode;
    document.getElementById('btn-board').className = mode === 'board' ? 'active' : '';
    document.getElementById('btn-table').className = mode === 'table' ? 'active' : '';
    render();
}

// 保留此函数用于排序下拉框调用
function handleSort() {
    currentSort = document.getElementById('sort-select').value;
    render();
}

// 兼容 html 中的 oninput="handleSearch()"，虽然上面已经绑定了
function handleSearch() {
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

    // 获取输入内容，转小写，去空格
    const searchText = searchInput.value.toLowerCase().trim();

    // 1. 【全字段深度匹配】
    let processedData = allData.filter(item => {
        if (!searchText) return true; // 没输入就显示所有
        // 直接检查我们预处理好的“全能字符串”是否包含关键词
        return item._searchStr.includes(searchText);
    });

    // 2. 排序逻辑
    if (currentSort !== 'default') {
        processedData.sort((a, b) => {
            if (currentSort === 'date-desc') {
                return new Date(b.date) - new Date(a.date);
            } else if (currentSort === 'date-asc') {
                return new Date(a.date) - new Date(b.date);
            } else if (currentSort === 'name-asc') {
                return a.name.localeCompare(b.name, 'zh-CN');
            } else if (currentSort === 'name-desc') {
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
        "其他": "color-yellow", "软件协作": "color-teal", "文档清理": "color-gray"
    };
    const categoryOrder = ["绘图", "图层", "动画", "骨骼", "其他", "软件协作", "文档清理"]; // 按照这个顺序排序

    // 提取分类并去重
    let categories = [...new Set(data.map(item => item.category).flat())];

    // 排序分类
    categories.sort((a, b) => {
        let indexA = categoryOrder.indexOf(a);
        let indexB = categoryOrder.indexOf(b);
        if (indexA === -1) indexA = 999;
        if (indexB === -1) indexB = 999;
        return indexA - indexB;
    });

    if (data.length === 0) {
        container.innerHTML = `<div style="width:100%;text-align:center;color:#999;margin-top:50px;">没有找到匹配 "${document.getElementById('search-input').value}" 的内容 🍃</div>`;
        return;
    }

    categories.forEach(cat => {
        if (!cat) return;

        const items = data.filter(item => {
            if (Array.isArray(item.category)) {
                return item.category.includes(cat);
            }
            return item.category === cat;
        });

        if (items.length === 0) return; 

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
        container.innerHTML = `<div style="text-align:center;color:#999;margin-top:50px;">没有找到匹配 "${document.getElementById('search-input').value}" 的内容 🍃</div>`;
        return;
    }

    const table = document.createElement('table');
    table.className = 'table-view';

    const colWidths = {
        name: "35%", category: "15%", tags: "15%", version: "15%", author: "30%", date: "20%"
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

    function generateBadges(input, colorClass) {
        if (!input) return '';
        let arr = [];
        if (Array.isArray(input)) {
            arr = input;
        } else if (typeof input === 'string') {
            arr = input.includes(',') ? input.split(',').map(s => s.trim()) : [input];
        } else {
            return '';
        }
        return arr.map(text => `<span class="tag-badge ${colorClass}" style="margin-bottom:0">${text}</span>`).join('');
    }

    data.forEach(item => {
        const tr = document.createElement('tr');
        tr.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;
            window.open(getLink(item.id), '_blank');
        });

        const nameHtml = `
            <span class="table-icon">${item.icon}</span>
            <a href="${getLink(item.id)}" target="_blank" class="row-title">${item.name}</a>
        `;

        const categoryHtml = generateBadges(item.category, 'tag-blue');
        const tagsHtml = generateBadges(item.tags, 'tag-orange');
        const authorHtml = generateBadges(item.author || 'Unknown', 'tag-purple');

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