// 文档网站间导航
(function() {
  // 配置
  const config = {
    portalUrl: 'https://test-sphinx-multiproject-portal.readthedocs.io',
    userUrl: 'https://test-sphinx-multiproject.readthedocs.io',
    devUrl: 'https://test-sphinx-multiproject-developers.readthedocs.io',
    currentSite: window.location.hostname
  };
  
  // 当前网站类型
  function getCurrentSiteType() {
    const host = window.location.hostname;
    if (host.includes('test-sphinx-multiproject-portal')) return 'portal';
    if (host.includes('test-sphinx-multiproject-developers')) return 'dev';
    return 'user';
  }
  
  // 创建浮动按钮
  function createFloatingButton() {
    const currentType = getCurrentSiteType();
    const button = document.createElement('div');
    button.className = 'floating-doc-nav';
    button.innerHTML = `
      <button class="floating-button">
        🔄 切换文档
      </button>
      <div class="floating-menu">
        ${currentType !== 'portal' ? `<a href="${config.portalUrl}" class="menu-item">🏠 返回门户</a>` : ''}
        ${currentType !== 'user' ? `<a href="${config.userUrl}" class="menu-item">👤 用户文档</a>` : ''}
        ${currentType !== 'dev' ? `<a href="${config.devUrl}" class="menu-item">👨‍💻 开发者文档</a>` : ''}
      </div>
    `;
    
    document.body.appendChild(button);
    
    // 点击切换
    button.querySelector('.floating-button').addEventListener('click', function() {
      button.classList.toggle('active');
    });
    
    // 点击外部关闭
    document.addEventListener('click', function(e) {
      if (!button.contains(e.target)) {
        button.classList.remove('active');
      }
    });
  }
  
  // 添加样式
  function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .floating-doc-nav {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 9999;
      }
      
      .floating-button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 12px 24px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        transition: all 0.3s ease;
      }
      
      .floating-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
      }
      
      .floating-menu {
        position: absolute;
        bottom: 60px;
        right: 0;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        min-width: 180px;
        display: none;
        overflow: hidden;
      }
      
      .floating-doc-nav.active .floating-menu {
        display: block;
      }
      
      .menu-item {
        display: block;
        padding: 12px 16px;
        color: #333;
        text-decoration: none;
        border-bottom: 1px solid #eee;
        transition: all 0.2s ease;
      }
      
      .menu-item:hover {
        background: #f5f5f5;
        color: #667eea;
      }
      
      .menu-item:last-child {
        border-bottom: none;
      }
    `;
    document.head.appendChild(style);
  }
  
  // 初始化
  document.addEventListener('DOMContentLoaded', function() {
    addStyles();
    createFloatingButton();
  });
})();