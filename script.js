let allData = [];
let currentView = 'board'; // 默认是看板视图

// 页面加载完毕后执行
document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            allData = data;
            render(); // 开始渲染
        })
        .catch(err => console.error("读取 data.json 失败，请检查文件是否存在", err));
});

// 切换视图
function switchView(mode) {
    currentView = mode;
    document.getElementById('btn-board').className = mode === 'board' ? 'active' : '';
    document.getElementById('btn-table').className = mode === 'table' ? 'active' : '';
    render();
}

// 搜索功能
function handleSearch() {
    render();
}

// 主渲染函数
function render() {
    const container = document.getElementById('app-container');
    const searchText = document.getElementById('search-input').value.toLowerCase();
    
    // 过滤数据（搜索逻辑）
    const filteredData = allData.filter(item => 
        item.name.toLowerCase().includes(searchText) || 
        item.tags.some(tag => tag.toLowerCase().includes(searchText))
    );

    container.innerHTML = ''; // 清空当前内容

    if (currentView === 'board') {
        renderBoard(container, filteredData);
    } else {
        renderTable(container, filteredData);
    }
}

// 渲染看板视图
// 渲染看板视图
function renderBoard(container, data) {
    container.className = 'board-view';
    
    // --- 🔴 新增：定义分类与颜色的对应关系 ---
    // 这里的 key (左边) 必须和你 data.json 里的 "category" 完全一致
    const colorMap = {
        "骨骼": "color-red",
        "绘图": "color-blue",
        "动画": "color-green",
        "图层": "color-purple",
        "其他": "color-orange",
        "脚本": "color-gray"
    };

    const categories = [...new Set(data.map(item => item.category))];

    categories.forEach(cat => {
        const items = data.filter(item => item.category === cat);
        const colDiv = document.createElement('div');
        colDiv.className = 'board-column';
        
        // --- 🔴 新增：获取当前分类的颜色类名 ---
        // 如果找不到对应分类，就默认用 color-gray
        const colorClass = colorMap[cat] || "color-gray"; 

        const cardsHtml = items.map(item => `
            <a href="detail.html?id=${item.id}" class="board-card ${colorClass}" target="_blank">
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
                <span class="tag-badge tool">${cat}</span> 
                <span class="column-count">${items.length}</span>
            </div>
            ${cardsHtml}
        `;
        container.appendChild(colDiv);
    });
}
// 渲染表格视图
function renderTable(container, data) {
    container.className = ''; 
    
    const table = document.createElement('table');
    table.className = 'table-view';
    table.innerHTML = `
        <thead>
            <tr>
                <th width="35%">名称</th>
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
        const tagsHtml = item.tags.map(t => `<span class="tag-badge">${t}</span>`).join('');
        
        tr.innerHTML = `
            <td>
                <span class="table-icon">${item.icon}</span>
                <a href="detail.html?id=${item.id}" target="_blank" style="font-weight:500;">${item.name}</a>
            </td>
            <td>${tagsHtml}</td>
            <td>${item.version}</td>
            <td>${item.author}</td>
            <td style="color:#999">${item.date}</td>
        `;
        tbody.appendChild(tr);
    });

    container.appendChild(table);
}