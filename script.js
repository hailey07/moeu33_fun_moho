let allData = [];
let currentView = 'board'; // 默认是看板视图

// 页面加载完毕后执行
document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            allData = data;

            // --- 新增功能：检查 URL 是否带有搜索参数 (?q=xxx) ---
            const params = new URLSearchParams(window.location.search);
            const query = params.get('q');
            if (query) {
                const searchInput = document.getElementById('search-input');
                if(searchInput) {
                    searchInput.value = decodeURIComponent(query);
                }
            }
            // ------------------------------------------------

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
    const searchInput = document.getElementById('search-input');
    // 防止报错：如果还没加载 HTML 元素
    if (!container || !searchInput) return;

    const searchText = searchInput.value.toLowerCase().trim();
    
    // 过滤数据（搜索逻辑）
    // 修改：增加了对分类 (category)、作者 (author)、适配版本 (supportVer) 的搜索支持
    const filteredData = allData.filter(item => 
        item.name.toLowerCase().includes(searchText) || 
        item.category.toLowerCase().includes(searchText) || 
        (item.author && item.author.toLowerCase().includes(searchText)) ||
        (item.supportVer && item.supportVer.toLowerCase().includes(searchText)) ||
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
function renderBoard(container, data) {
    container.className = 'board-view';
    
    // 左侧彩条颜色映射
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
                <span class="tag-badge tag-blue">${cat}</span> 
                <span class="column-count">${items.length}</span>
            </div>
            ${cardsHtml}
        `;
        container.appendChild(colDiv);
    });
}

// 渲染表格视图
function renderTable(container, data) {
    container.className = 'table-mode-container'; 
    
    const table = document.createElement('table');
    table.className = 'table-view';
    
    // 修改：表头增加了“分类”列
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
        
        // --- 整行点击事件 ---
        tr.addEventListener('click', (e) => {
            if (e.target.closest('a')) return; // 防止点击链接时双重跳转
            window.open(`detail.html?id=${item.id}`, '_blank');
        });

        // 标签渲染
        const tagsHtml = item.tags.map(t => 
            `<span class="tag-badge tag-orange">${t}</span>`
        ).join('');
        
        const authorName = item.author || 'Unknown';

        // 修改：行内容增加了 category 列 (蓝色 Badge)
        tr.innerHTML = `
            <td>
                <span class="table-icon">${item.icon}</span>
                <a href="detail.html?id=${item.id}" target="_blank" class="row-title">
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