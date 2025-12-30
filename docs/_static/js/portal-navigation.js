// docs/_static/js/portal-navigation.js
(function() {
  const config = {
    portalUrl: 'https://test-sphinx-multiproject-portal.readthedocs.io',
    userUrl: 'https://test-sphinx-multiproject.readthedocs.io',
    devUrl: 'https://test-sphinx-multiproject-developers.readthedocs.io'
  };
  
  function getCurrentSiteType() {
    const host = window.location.hostname;
    if (host.includes('test-sphinx-multiproject-portal')) return 'portal';
    if (host.includes('test-sphinx-multiproject-developers')) return 'dev';
    return 'user';
  }
  
  function createFloatingButton() {
    const currentType = getCurrentSiteType();
    const button = document.createElement('div');
    button.className = 'floating-doc-nav left-bottom';
    button.innerHTML = `
      <div class="floating-menu">
        ${currentType !== 'portal' ? `<a href="${config.portalUrl}" class="menu-item portal-link">🏠 门户网站</a>` : ''}
        ${currentType !== 'user' ? `<a href="${config.userUrl}" class="menu-item user-link">👤 用户文档</a>` : ''}
        ${currentType !== 'dev' ? `<a href="${config.devUrl}" class="menu-item dev-link">👨‍💻 开发者文档</a>` : ''}
      </div>
      <button class="floating-button">
        🔄 文档切换
      </button>
    `;
    
    document.body.appendChild(button);
    
    button.querySelector('.floating-button').addEventListener('click', function() {
      button.classList.toggle('expanded');
    });
    
    document.addEventListener('click', function(e) {
      if (!button.contains(e.target)) {
        button.classList.remove('expanded');
      }
    });
  }
  
  function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .floating-doc-nav.left-bottom {
        position: fixed;
        bottom: 30px;
        left: 30px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      
      .floating-doc-nav.left-bottom .floating-menu {
        order: 2;
        margin-bottom: 10px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        min-width: 180px;
        max-height: 0;
        opacity: 0;
        overflow: hidden;
        transition: all 0.3s ease;
        transform: translateY(20px);
      }
      
      .floating-doc-nav.left-bottom.expanded .floating-menu {
        max-height: 300px;
        opacity: 1;
        transform: translateY(0);
      }
      
      .floating-doc-nav.left-bottom .floating-button {
        order: 1;
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
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .floating-doc-nav.left-bottom .floating-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
      }
      
      .floating-doc-nav.left-bottom .floating-button::after {
        content: '▼';
        font-size: 10px;
        transition: transform 0.3s ease;
      }
      
      .floating-doc-nav.left-bottom.expanded .floating-button::after {
        transform: rotate(180deg);
      }
      
      .menu-item {
        display: block;
        padding: 12px 16px;
        color: #333;
        text-decoration: none;
        border-bottom: 1px solid #eee;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .menu-item:hover {
        background: #f5f5f5;
        color: #667eea;
        padding-left: 20px;
      }
      
      .menu-item:last-child {
        border-bottom: none;
      }
      
      .portal-link::before { content: "🏠"; }
      .user-link::before { content: "👤"; }
      .dev-link::before { content: "👨‍💻"; }
      
      @media (max-width: 768px) {
        .floating-doc-nav.left-bottom {
          bottom: 20px;
          left: 20px;
        }
        .floating-doc-nav.left-bottom .floating-button {
          padding: 10px 20px;
          font-size: 13px;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    addStyles();
    createFloatingButton();
  });
})();