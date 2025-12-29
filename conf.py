import os

project = 'Documentation Portal'
copyright = '2024, Your Company'
author = 'Your Team'

extensions = [
    'myst_parser',
    'sphinx_design',  # 用于创建卡片网格
    'sphinx_copybutton',
]

# 主题设置
html_theme = 'sphinx_rtd_theme'
html_theme_options = {
    'analytics_id': 'G-XXXXXXX',
    'logo_only': True,
    'display_version': False,
    'prev_next_buttons_location': 'none',  # 门户不需要上一篇/下一篇
    'style_external_links': True,
    'collapse_navigation': False,
}

# 路径设置
templates_path = ['_templates']
html_static_path = ['_static']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

# 自定义CSS
html_css_files = [
    'portal.css',
]

# 移除不需要的元素
html_show_sourcelink = False
html_show_sphinx = False

# 门户特有配置
html_title = "Your Company Documentation Hub"
html_logo = "_static/logo-portal.png"
html_favicon = "_static/favicon-portal.ico"

# 上下文变量（可用于模板）
html_context = {
    'portal_projects': {
        'product_a': {
            'title': 'Product A',
            'description': 'API reference and developer guide',
            'url': 'https://product-a.readthedocs.io/en/latest/',
            'badge': 'https://readthedocs.org/projects/product-a/badge/?version=latest',
            'color': '#1a237e',
        },
        'product_b': {
            'title': 'Product B', 
            'description': 'User guide and tutorials',
            'url': 'https://product-b.readthedocs.io/en/latest/',
            'badge': 'https://readthedocs.org/projects/product-b/badge/?version=latest',
            'color': '#004d40',
        },
    }
}