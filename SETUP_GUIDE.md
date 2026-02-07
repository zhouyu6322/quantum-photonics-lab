# 完整配置指南 | Complete Setup Guide

## 中文指南

### 第一步：创建 Notion Integration

1. 访问 https://www.notion.so/my-integrations
2. 点击"创建新的集成"（Create new integration）
3. 填写基本信息：
   - 名称：例如"量子实验室网站"
   - 选择你的工作区
4. 点击"提交"（Submit）
5. **重要**：复制显示的 Integration Token（格式：`secret_xxxxx...`）

### 第二步：在 Notion 中创建数据库

#### 2.1 创建"团队成员"数据库

1. 在 Notion 中创建新页面，命名为"Team Members"
2. 在页面中创建一个 Database - Table
3. 添加以下属性（Properties）：

| 属性名 | 类型 | 选项值（如适用） |
|--------|------|------------------|
| Name | Title | - |
| Photo | Files & Media | - |
| Role | Select | PI, Postdoc, PhD, Master, Undergraduate, Alumni |
| Email | Email | - |
| Join Year | Number | - |
| Institution | Text | - |
| Research Focus | Multi-select | 根据需要自定义标签 |
| Homepage | URL | - |
| Google Scholar | URL | - |
| Status | Select | Active, Alumni |

4. 点击右上角的"..."→"Add connections"→ 选择你的 Integration
5. 获取数据库 ID：
   - 在数据库页面，点击右上角"Share"→"Copy link"
   - URL 格式：`https://www.notion.so/{workspace}/{database_id}?v={view_id}`
   - 复制其中32位字符的 `database_id`（包含连字符）

#### 2.2 创建"研究方向"数据库

重复上述步骤，创建名为"Research Areas"的数据库，包含：

| 属性名 | 类型 |
|--------|------|
| Title | Title |
| Description | Text |
| Icon | Files & Media |

#### 2.3 创建"论文发表"数据库

创建名为"Publications"的数据库：

| 属性名 | 类型 | 说明 |
|--------|------|------|
| Title | Title | 论文标题 |
| DOI | Text | 数字对象标识符 |
| Journal | Text | 期刊名称 |
| Year | Number | 发表年份 |
| Authors | Text | 作者列表 |
| PDF Link | URL | PDF 链接 |
| Category | Multi-select | 分类标签 |

#### 2.4 创建"新闻动态"数据库

创建名为"News"的数据库：

| 属性名 | 类型 | 选项值 |
|--------|------|--------|
| Title | Title | - |
| Date | Date | - |
| Content | Text | - |
| Cover | Files & Media | - |
| Category | Select | Award, Publication, Event, Recruitment |

### 第三步：配置本地环境

1. 打开项目目录中的 `.env.local` 文件
2. 填入你的配置：

```env
NOTION_TOKEN=secret_你的Integration_Token
NOTION_DATABASE_TEAM=团队数据库ID
NOTION_DATABASE_RESEARCH=研究方向数据库ID
NOTION_DATABASE_PUBLICATIONS=论文数据库ID
NOTION_DATABASE_NEWS=新闻数据库ID
```

3. 保存文件

### 第四步：运行项目

```bash
# 安装依赖（如果还没有安装）
npm install

# 启动开发服务器
npm run dev
```

打开浏览器访问 http://localhost:3000

### 第五步：添加示例数据

在 Notion 中向各个数据库添加一些测试数据，刷新网站查看效果。

### 第六步：部署到 Vercel

1. 将代码推送到 GitHub
2. 访问 https://vercel.com 并登录
3. 点击"Add New Project"
4. 导入你的 GitHub 仓库
5. 在"Environment Variables"中添加所有环境变量
6. 点击"Deploy"

---

## English Guide

### Step 1: Create Notion Integration

1. Go to https://www.notion.so/my-integrations
2. Click "Create new integration"
3. Fill in:
   - Name: e.g., "Quantum Lab Website"
   - Select your workspace
4. Click "Submit"
5. **Important**: Copy the Integration Token (format: `secret_xxxxx...`)

### Step 2: Create Notion Databases

#### 2.1 Create "Team Members" Database

1. Create a new page in Notion, name it "Team Members"
2. Create a Database - Table inside
3. Add these properties:

| Property | Type | Options |
|----------|------|---------|
| Name | Title | - |
| Photo | Files & Media | - |
| Role | Select | PI, Postdoc, PhD, Master, Undergraduate, Alumni |
| Email | Email | - |
| Join Year | Number | - |
| Institution | Text | - |
| Research Focus | Multi-select | Custom tags |
| Homepage | URL | - |
| Google Scholar | URL | - |
| Status | Select | Active, Alumni |

4. Click "..." in top right → "Add connections" → Select your Integration
5. Get database ID:
   - On database page, click "Share" → "Copy link"
   - URL format: `https://www.notion.so/{workspace}/{database_id}?v={view_id}`
   - Copy the 32-character `database_id` (with dashes)

#### 2.2 Create "Research Areas" Database

Repeat for "Research Areas" with:

| Property | Type |
|----------|------|
| Title | Title |
| Description | Text |
| Icon | Files & Media |

#### 2.3 Create "Publications" Database

Create "Publications" with:

| Property | Type | Description |
|----------|------|-------------|
| Title | Title | Paper title |
| DOI | Text | Digital Object Identifier |
| Journal | Text | Journal name |
| Year | Number | Publication year |
| Authors | Text | Author list |
| PDF Link | URL | PDF URL |
| Category | Multi-select | Tags |

#### 2.4 Create "News" Database

Create "News" with:

| Property | Type | Options |
|----------|------|---------|
| Title | Title | - |
| Date | Date | - |
| Content | Text | - |
| Cover | Files & Media | - |
| Category | Select | Award, Publication, Event, Recruitment |

### Step 3: Configure Local Environment

1. Open `.env.local` in project directory
2. Fill in your credentials:

```env
NOTION_TOKEN=secret_your_integration_token
NOTION_DATABASE_TEAM=your_team_database_id
NOTION_DATABASE_RESEARCH=your_research_database_id
NOTION_DATABASE_PUBLICATIONS=your_publications_database_id
NOTION_DATABASE_NEWS=your_news_database_id
```

3. Save file

### Step 4: Run Project

```bash
# Install dependencies (if not already)
npm install

# Start development server
npm run dev
```

Open browser at http://localhost:3000

### Step 5: Add Sample Data

Add some test data to each database in Notion, refresh website to see results.

### Step 6: Deploy to Vercel

1. Push code to GitHub
2. Go to https://vercel.com and login
3. Click "Add New Project"
4. Import your GitHub repository
5. Add all environment variables in "Environment Variables"
6. Click "Deploy"

---

## 常见问题 | FAQ

### Q: 如何获取数据库 ID？
A: 打开数据库完整页面，URL 中的32位字符串（含连字符）即为数据库 ID

### Q: Integration Token 在哪里？
A: 在 https://www.notion.so/my-integrations 创建 Integration 后会显示

### Q: 为什么网站显示空白？
A: 检查：1) 环境变量是否正确配置 2) Integration 是否已连接到数据库 3) 数据库属性名称是否正确

### Q: 图片不显示？
A: 确保 Integration 有访问包含图片的页面的权限

### Q: 如何更新网站内容？
A: 直接在 Notion 数据库中编辑，网站会在1小时内自动更新

---

## 技术支持 | Support

如有问题，请查看：
- README.md 文件
- GitHub Issues
- 或联系技术支持

For help:
- Check README.md
- Open GitHub Issue
- Contact support
