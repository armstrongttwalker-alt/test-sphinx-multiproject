// 文档网站间导航 - 左下角浮动按钮
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
  
  // 检查是否在移动端
  function isMobile() {
    return window.innerWidth <= 768;
  }
  
  // 获取左侧导航栏宽度
  function getSidebarWidth() {
    const sidebar = document.querySelector('.wy-nav-side, .sphinxsidebar, .sidebar');
    if (sidebar) {
      return sidebar.getBoundingClientRect().width;
    }
    return 0;
  }
  
  // 创建浮动按钮
  function createFloatingButton() {
    const currentType = getCurrentSiteType();
    
    // 移除已存在的按钮（防止重复）
    const existingButton = document.querySelector('.floating-doc-nav');
    if (existingButton) {
      existingButton.remove();
    }
    
    const button = document.createElement('div');
    button.className = 'floating-doc-nav';
    button.innerHTML = `
      <button class="floating-button" title="切换文档网站">
        🔄
        <span class="button-text">切换文档</span>
      </button>
      <div class="floating-menu">
        ${currentType !== 'portal' ? `<a href="${config.portalUrl}" class="menu-item">🏠 返回门户网站</a>` : ''}
        ${currentType !== 'user' ? `<a href="${config.userUrl}" class="menu-item">👤 切换到用户文档</a>` : ''}
        ${currentType !== 'dev' ? `<a href="${config.devUrl}" class="menu-item">👨‍💻 切换到开发者文档</a>` : ''}
      </div>
    `;
    
    document.body.appendChild(button);
    
    // 点击切换菜单
    button.querySelector('.floating-button').addEventListener('click', function(e) {
      e.stopPropagation();
      button.classList.toggle('active');
    });
    
    // 点击菜单项
    button.querySelectorAll('.menu-item').forEach(item => {
      item.addEventListener('click', function() {
        button.classList.remove('active');
      });
    });
    
    // 点击外部关闭菜单
    document.addEventListener('click', function(e) {
      if (!button.contains(e.target)) {
        button.classList.remove('active');
      }
    });
    
    // 调整按钮位置，避开侧边栏
    adjustButtonPosition();
    
    // 监听窗口大小变化
    window.addEventListener('resize', adjustButtonPosition);
  }
  
  // 调整按钮位置
  function adjustButtonPosition() {
    const button = document.querySelector('.floating-doc-nav');
    if (!button) return;
    
    const sidebarWidth = getSidebarWidth();
    const isMobileView = isMobile();
    
    if (isMobileView) {
      // 移动端：放在右下角
      button.style.left = 'auto';
      button.style.right = '20px';
      button.style.bottom = '80px';
    } else {
      // 桌面端：放在左下角，避开侧边栏
      const leftPosition = Math.max(sidebarWidth + 20, 300);
      button.style.left = leftPosition + 'px';
      button.style.right = 'auto';
      button.style.bottom = '30px';
    }
  }
  
  // 添加样式
  function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* 浮动按钮容器 */
      .floating-doc-nav {
        position: fixed;
        z-index: 1000;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      
      /* 主按钮 */
      .floating-button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50px;
        padding: 12px 20px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 120px;
        justify-content: center;
      }
      
      .floating-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
      }
      
      .floating-button:active {
        transform: translateY(-1px);
      }
      
      /* 按钮文本 */
      .button-text {
        display: inline;
      }
      
      /* 下拉菜单 */
      .floating-menu {
        position: absolute;
        bottom: 60px;
        left: 0;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        min-width: 200px;
        display: none;
        overflow: hidden;
        z-index: 1001;
      }
      
      .floating-doc-nav.active .floating-menu {
        display: block;
        animation: fadeInUp 0.3s ease;
      }
      
      /* 菜单项 */
      .menu-item {
        display: block;
        padding: 12px 16px;
        color: #333;
        text-decoration: none;
        border-bottom: 1px solid #eee;
        transition: all 0.2s ease;
        font-size: 14px;
      }
      
      .menu-item:hover {
        background: #f5f5f5;
        color: #667eea;
      }
      
      .menu-item:last-child {
        border-bottom: none;
      }
      
      /* 动画 */
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      /* 移动端优化 */
      @media (max-width: 768px) {
        .floating-button {
          padding: 14px;
          min-width: auto;
          border-radius: 50%;
          width: 56px;
          height: 56px;
          justify-content: center;
        }
        
        .button-text {
          display: none;
        }
        
        .floating-menu {
          min-width: 180px;
          bottom: 70px;
          right: 0;
          left: auto;
        }
        
        .floating-doc-nav.active .floating-button {
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
        }
      }
      
      /* 打印时隐藏 */
      @media print {
        .floating-doc-nav {
          display: none !important;
        }
      }
      
      /* RTD主题特定调整 */
      .wy-body-for-nav .floating-doc-nav {
        left: 320px; /* RTD侧边栏默认宽度 */
      }
      
      /* 侧边栏收起时的调整 */
      .wy-body-for-nav.wy-nav-shift .floating-doc-nav {
        left: 100px;
      }
    `;
    document.head.appendChild(style);
  }
  
  // 监听DOM加载完成
  function init() {
    // 确保RTD主题已加载
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        setTimeout(initializeButton, 500); // 等待RTD主题完全加载
      });
    } else {
      setTimeout(initializeButton, 500);
    }
  }
  
  // 初始化按钮
  function initializeButton() {
    addStyles();
    createFloatingButton();
  }
  
  // 启动
  init();
})();