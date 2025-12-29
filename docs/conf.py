import os
import sys
from datetime import datetime

# -- 多项目配置 -------------------------------------------------------
extensions = [
    "myst_parser",
    # "autodoc2",
    "sphinx.ext.intersphinx",
    "sphinx.ext.viewcode",
    "sphinx.ext.autodoc",
    "sphinx.ext.autosummary",
    "sphinx_design",
    "sphinx_copybutton",
    # "sphinxext.rediraffe",
    # disabled due to https://github.com/mgaitan/sphinxcontrib-mermaid/issues/109
    "sphinxcontrib.mermaid",
    "sphinxext.opengraph",
    "sphinx_pyscript",
    "sphinx_tippy",
    "sphinx_togglebutton",
]

# 1. 定义多项目映射
multiproject_projects = {
    "product_a": {
        "path": "product_a",
        "title": "Product A Documentation",
        "version": "1.0",
    },
    "product_b": {
        "path": "product_b", 
        "title": "Product B Guide",
        "version": "2.1",
    },
}

# 2. 从环境变量获取当前构建的项目 (由 .readthedocs.yaml 传递)
current_project = os.environ.get('multiproject', 'product_a')

# -- 根据当前项目进行条件配置 -----------------------------------------
if current_project == 'product_a':
    # 产品A专属配置
    project = 'Product A'
    html_title = f"{project} Docs v1.0"
    # 源文件路径
    master_doc = 'index'
    exclude_patterns = ['product_b/**', 'shared/_templates/**']
    
elif current_project == 'product_b':
    # 产品B专属配置  
    project = 'Product B'
    html_title = f"{project} User Guide v2.1"
    master_doc = 'index'
    exclude_patterns = ['product_a/**', 'shared/_templates/**']

# -- 通用配置 (所有项目共享) -----------------------------------------
author = 'Your Team'
copyright = f'{datetime.now().year}, {author}'

# MyST 配置
myst_enable_extensions = [
    "dollarmath",
    "amsmath",
    "deflist",
    "fieldlist",
    "html_admonition",
    "html_image",
    "colon_fence",
    "smartquotes",
    "replacements",
    # "linkify",
    "strikethrough",
    "substitution",
    "tasklist",
    "attrs_inline",
    "attrs_block",
]

# 主题配置
html_theme = 'sphinx_rtd_theme'
html_theme_options = {
    'logo_only': True,
    'display_version': True,
    'style_external_links': True,
}

# 路径设置
templates_path = ['shared/_templates']
html_static_path = ['shared/_static', f'{current_project}/_static']
html_css_files = ['custom.css']

# 源文件后缀
source_suffix = {
    '.md': 'markdown',
    '.rst': 'restructuredtext',
}