# 快速开始 | Quick Start Guide

这是一个 5 分钟快速开始指南。详细说明请参考 SETUP_GUIDE.md 和 DEPLOYMENT.md。

This is a 5-minute quick start guide. For detailed instructions, see SETUP_GUIDE.md and DEPLOYMENT.md.

---

## 第 1 步：创建 Notion Integration | Step 1: Create Notion Integration

1. 访问 https://www.notion.so/my-integrations
2. 点击 "New integration"
3. 填写名称，点击 "Submit"
4. 复制 **Integration Token**（格式：`secret_xxxxx`）

---

## 第 2 步：创建 Notion 数据库 | Step 2: Create Notion Databases

在 Notion 中创建 4 个数据库（Table 类型）：

### 数据库 1: Team Members

创建数据库，添加以下列：

```
Name (Title)
Photo (Files & Media)
Role (Select: PI, Postdoc, PhD, Master, Undergraduate, Alumni)
Email (Email)
Join Year (Number)
Institution (Text)
Research Focus (Multi-select)
Homepage (URL)
Google Scholar (URL)
Status (Select: Active, Alumni)
```

### 数据库 2: Research Areas

```
Title (Title)
Description (Text)
Icon (Files & Media)
```

### 数据库 3: Publications

```
Title (Title)
DOI (Text)
Journal (Text)
Year (Number)
Authors (Text)
PDF Link (URL)
Category (Multi-select)
```

### 数据库 4: News

```
Title (Title)
Date (Date)
Content (Text)
Cover (Files & Media)
Category (Select: Award, Publication, Event, Recruitment)
```

---

## 第 3 步：连接 Integration 到数据库 | Step 3: Connect Integration

对每个数据库：
1. 点击右上角 "..."
2. "Add connections"
3. 选择你的 Integration

---

## 第 4 步：获取数据库 ID | Step 4: Get Database IDs

对每个数据库：
1. 以完整页面打开
2. 复制 URL 中的 32 位字符 ID（包含连字符）
   - URL: `https://notion.so/{workspace}/{DATABASE_ID}?v={view_id}`
   - 复制 `DATABASE_ID` 部分

---

## 第 5 步：配置环境变量 | Step 5: Configure Environment

```bash
cd quantum-photonics-lab
cp .env.local.example .env.local
```

编辑 `.env.local`：

```env
NOTION_TOKEN=secret_你的Token
NOTION_DATABASE_TEAM=团队数据库ID
NOTION_DATABASE_RESEARCH=研究数据库ID
NOTION_DATABASE_PUBLICATIONS=论文数据库ID
NOTION_DATABASE_NEWS=新闻数据库ID
```

---

## 第 6 步：本地运行 | Step 6: Run Locally

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

---

## 第 7 步：添加测试数据 | Step 7: Add Test Data

在 Notion 各数据库中添加一些测试数据，刷新网站查看效果。

---

## 第 8 步：部署到 Vercel | Step 8: Deploy to Vercel

### 推送到 GitHub:

```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/quantum-lab.git
git push -u origin main
```

### 部署:

1. 访问 https://vercel.com
2. "Add New Project"
3. 导入你的 GitHub 仓库
4. 添加环境变量（与 .env.local 相同）
5. "Deploy"

---

## 完成！ | Done!

你的网站现在已经上线了！🎉

Your website is now live! 🎉

**后续操作：**

- 📝 在 Notion 中添加真实内容
- 🌐 配置自定义域名（可选）
- 📊 启用 Vercel Analytics（可选）
- 🔄 内容会在 1 小时内自动同步

---

## 常见问题 | FAQ

### Q: 看不到数据？
A: 检查：
1. 环境变量是否正确
2. Integration 是否已连接到数据库
3. Notion 数据库中是否有数据

### Q: 图片不显示？
A: 确保 Integration 有访问页面的权限

### Q: 如何更新内容？
A: 直接在 Notion 中编辑，1 小时内自动更新

### Q: 如何立即更新？
A: 在 Vercel 中手动触发 Redeploy

---

## 需要帮助？ | Need Help?

查看详细文档：
- 📖 README.md - 项目介绍
- 🔧 SETUP_GUIDE.md - 详细配置指南
- 🚀 DEPLOYMENT.md - 部署指南
- 📋 PROJECT_SUMMARY.md - 项目总结

或访问：
- https://nextjs.org/docs
- https://developers.notion.com
- https://vercel.com/docs

---

**预计总时间：30-60 分钟**

**Time Estimate: 30-60 minutes**
