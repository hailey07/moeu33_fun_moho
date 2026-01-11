let allData = [];
let currentView = 'board'; 

document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            allData = data;
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

function switchView(mode) {
    currentView = mode;
    document.getElementById('btn-board').className = mode === 'board' ? 'active' : '';
    document.getElementById('btn-table').className = mode === 'table' ? 'active' : '';
    render();
}

function handleSearch() {
    render();
}

// --- 【新增】核心辅助函数：根据环境生成链接 ---
function getLink(id) {
    // 检测是否是本地环境 (localhost 或 127.0.0.1)
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isLocal) {
        // 如果是本地，返回旧格式（Live Server 能识别）
        return `detail.html?id=${id}`;
    } else {
        // 如果是线上，返回漂亮格式
        return `scripts/${id}`;
    }
}
// -------------------------------------------

function render() {
    const container = document.getElementById('app-container');
    const searchInput = document.getElementById('search-input');
    if (!container || !searchInput) return;

    const searchText = searchInput.value.toLowerCase().trim();
    
    const filteredData = allData.filter(item => 
        item.name.toLowerCase().includes(searchText) || 
        item.category.toLowerCase().includes(searchText) || 
        (item.author && item.author.toLowerCase().includes(searchText)) ||
        (item.supportVer && item.supportVer.toLowerCase().includes(searchText)) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchText))
    );

    container.innerHTML = ''; 

    if (currentView === 'board') {
        renderBoard(container, filteredData);
    } else {
        renderTable(container, filteredData);
    }
}

function renderBoard(container, data) {
    container.className = 'board-view';
    
    const colorMap = {
        "绘图": "color-orange", "图层": "color-blue", "动画": "color-red", "骨骼": "color-purple", 
        "其他": "color-yellow", "软件协作":"color-teal", "文档清理": "color-gray"
    };

    // --- 【修改开始】自定义排序逻辑 ---
    
    // 1. 在这里定义你想要的显示顺序
    const categoryOrder = ["绘图", "图层", "动画", "骨骼", "软件协作", "文档清理", "其他"];

    // 2. 获取数据中实际存在的所有分类
    let categories = [...new Set(data.map(item => item.category))];

    // 3. 根据你定义的顺序进行排序
    categories.sort((a, b) => {
        let indexA = categoryOrder.indexOf(a);
        let indexB = categoryOrder.indexOf(b);

        // 如果某个分类没在 categoryOrder 里定义（比如新加的），就把它放到最后
        if (indexA === -1) indexA = 999;
        if (indexB === -1) indexB = 999;

        return indexA - indexB;
    });
    // --- 【修改结束】 ---

    categories.forEach(cat => {
        const items = data.filter(item => item.category === cat);
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
    const table = document.createElement('table');
    table.className = 'table-view';
    
    table.innerHTML = `
        <thead>
            <tr>
                <th width="30%">名称</th>
                <th width="10%">分类</th>
                <th>标签</th>
                <th>版本</th>
                <th>作者</th>
                <th>更新日期</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector('tbody');
    
    data.forEach(item => {
        const tr = document.createElement('tr');
        
        tr.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;
            // 【修改】这里使用了 getLink 函数
            window.open(getLink(item.id), '_blank');
        });

        const tagsHtml = item.tags.map(t => `<span class="tag-badge tag-orange">${t}</span>`).join('');
        const authorName = item.author || 'Unknown';

        tr.innerHTML = `
            <td>
                <span class="table-icon">${item.icon}</span>
                <a href="${getLink(item.id)}" target="_blank" class="row-title">
                    ${item.name}
                </a>
            </td>
            <td><span class="tag-badge tag-blue">${item.category}</span></td>
            <td>${tagsHtml}</td>
            <td>v${item.version}</td>
            <td><span class="tag-badge tag-purple" style="margin:0">${authorName}</span></td>
            <td style="color:#999">${item.date}</td>
        `;
        tbody.appendChild(tr);
    });

    container.appendChild(table);
}