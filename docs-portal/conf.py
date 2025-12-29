# docs-portal/conf.py

# ... 其他原有配置 ...

# 启用扩展
extensions = [
    'myst_parser',           # 必须：Markdown支持
    'sphinx_design',         # 用于卡片网格
    'sphinx_copybutton',     # 可选：代码块复制按钮
]

# MyST 配置
# 启用所有可选语法组件（推荐）
myst_enable_extensions = [
    "dollarmath",           # 支持 $...$ 行内数学公式
    "amsmath",              # 支持数学公式环境
    "deflist",              # 支持定义列表
    "fieldlist",            # 支持字段列表
    "html_admonition",      # 支持HTML格式的警示框
    "html_image",           # 支持HTML图片语法
    "colon_fence",          # 支持 ::: 代码块围栏
    "smartquotes",          # 智能引号转换
    "replacements",         # 特殊符号替换
    "linkify",              # 自动识别URL为链接
    "substitution",         # 支持变量替换
    "tasklist",             # 支持任务列表
    "attrs_inline",         # 支持行内属性
]

# 设置Markdown文件扩展名
source_suffix = {
    '.rst': 'restructuredtext',
    '.md': 'markdown',
}

# 如果门户完全使用Markdown，可以设置默认后缀
# primary_domain = 'markdown'

# ... 其他配置保持不变 ...