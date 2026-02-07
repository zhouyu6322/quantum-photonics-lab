# 项目启动检查清单 | Project Launch Checklist

## 📋 Notion 配置 | Notion Configuration

### Step 1: 创建 Integration
- [ ] 访问 https://www.notion.so/my-integrations
- [ ] 创建新 Integration，命名如 "Quantum Lab Website"
- [ ] 复制 Integration Token (secret_xxxxx)
- [ ] 保存 Token 到安全位置

### Step 2: 创建数据库

#### Team Members Database
- [ ] 创建 "Team Members" 数据库
- [ ] 添加属性：Name (Title), Photo (Files), Role (Select), Email (Email)
- [ ] 添加属性：Join Year (Number), Institution (Text), Research Focus (Multi-select)
- [ ] 添加属性：Homepage (URL), Google Scholar (URL), Status (Select)
- [ ] 连接 Integration 到此数据库
- [ ] 复制数据库 ID

#### Research Areas Database
- [ ] 创建 "Research Areas" 数据库
- [ ] 添加属性：Title (Title), Description (Text), Icon (Files)
- [ ] 连接 Integration 到此数据库
- [ ] 复制数据库 ID

#### Publications Database
- [ ] 创建 "Publications" 数据库
- [ ] 添加属性：Title (Title), DOI (Text), Journal (Text), Year (Number)
- [ ] 添加属性：Authors (Text), PDF Link (URL), Category (Multi-select)
- [ ] 连接 Integration 到此数据库
- [ ] 复制数据库 ID

#### News Database
- [ ] 创建 "News" 数据库
- [ ] 添加属性：Title (Title), Date (Date), Content (Text)
- [ ] 添加属性：Cover (Files), Category (Select)
- [ ] 连接 Integration 到此数据库
- [ ] 复制数据库 ID

---

## 💻 本地开发配置 | Local Development Setup

### 环境配置
- [ ] 打开 `.env.local` 文件
- [ ] 填入 `NOTION_TOKEN`
- [ ] 填入 `NOTION_DATABASE_TEAM`
- [ ] 填入 `NOTION_DATABASE_RESEARCH`
- [ ] 填入 `NOTION_DATABASE_PUBLICATIONS`
- [ ] 填入 `NOTION_DATABASE_NEWS`
- [ ] 保存文件

### 安装和运行
- [ ] 运行 `npm install`
- [ ] 运行 `npm run build` (验证构建)
- [ ] 运行 `npm run dev`
- [ ] 访问 http://localhost:3000
- [ ] 确认网站正常显示

---

## 📝 添加测试数据 | Add Test Data

### Team Members
- [ ] 添加至少 1 个 PI
- [ ] 添加几个 PhD 学生
- [ ] 设置正确的 Role 和 Status
- [ ] 上传照片（可选）
- [ ] 填写 Email 和其他信息

### Research Areas
- [ ] 添加 2-3 个研究方向
- [ ] 填写详细描述
- [ ] 上传图标（可选）

### Publications
- [ ] 添加几篇代表性论文
- [ ] 填写完整信息（Title, Authors, Journal, Year, DOI）
- [ ] 设置正确的年份（用于分组）

### News
- [ ] 添加 1-2 条新闻
- [ ] 设置日期
- [ ] 选择合适的 Category
- [ ] 上传封面图（可选）

### 验证数据显示
- [ ] 刷新网站
- [ ] 检查首页显示数据
- [ ] 检查 Team 页面
- [ ] 检查 Research 页面
- [ ] 检查 Publications 页面
- [ ] 检查 News 页面

---

## 🚀 部署到 Vercel | Deploy to Vercel

### GitHub 准备
- [ ] 确保代码已提交到 git
- [ ] 创建 GitHub 仓库
- [ ] 推送代码到 GitHub
  ```bash
  git remote add origin https://github.com/YOUR_USERNAME/quantum-lab.git
  git push -u origin main
  ```

### Vercel 配置
- [ ] 访问 https://vercel.com
- [ ] 使用 GitHub 登录
- [ ] 点击 "Add New Project"
- [ ] 选择你的仓库
- [ ] Framework: 确认为 Next.js

### 添加环境变量
- [ ] 添加 `NOTION_TOKEN` (Production + Preview + Development)
- [ ] 添加 `NOTION_DATABASE_TEAM` (所有环境)
- [ ] 添加 `NOTION_DATABASE_RESEARCH` (所有环境)
- [ ] 添加 `NOTION_DATABASE_PUBLICATIONS` (所有环境)
- [ ] 添加 `NOTION_DATABASE_NEWS` (所有环境)

### 部署
- [ ] 点击 "Deploy"
- [ ] 等待部署完成（1-3 分钟）
- [ ] 访问提供的 URL
- [ ] 验证网站正常工作

---

## ✅ 部署后验证 | Post-Deployment Verification

### 功能测试
- [ ] 所有页面可以访问
- [ ] 导航菜单正常工作
- [ ] 团队成员正确显示
- [ ] 论文列表正确显示
- [ ] 新闻正确显示
- [ ] 图片正常加载
- [ ] 链接都能正常跳转

### 响应式测试
- [ ] 在桌面浏览器测试
- [ ] 在平板设备测试
- [ ] 在手机设备测试
- [ ] 导航菜单在移动端正常

### 性能测试
- [ ] 运行 Google Lighthouse
- [ ] Performance > 85
- [ ] Accessibility > 90
- [ ] Best Practices > 90
- [ ] SEO > 90

---

## 🎨 内容完善 | Content Enhancement

### Team Members
- [ ] 补充所有成员信息
- [ ] 上传高质量照片
- [ ] 填写个人主页和 Google Scholar
- [ ] 更新 Alumni 状态

### Research Areas
- [ ] 详细描述研究方向
- [ ] 添加相关图片
- [ ] 确保描述准确且吸引人

### Publications
- [ ] 导入所有重要论文
- [ ] 验证 DOI 链接
- [ ] 添加 PDF 链接（如有）
- [ ] 设置合适的分类标签

### News
- [ ] 添加近期新闻
- [ ] 添加获奖信息
- [ ] 添加招生信息
- [ ] 定期更新

### About Page
- [ ] 更新课题组介绍
- [ ] 更新联系方式
- [ ] 确认地址信息正确

---

## 🔧 可选配置 | Optional Configuration

### 自定义域名
- [ ] 在 Vercel 添加自定义域名
- [ ] 配置 DNS 记录
- [ ] 等待 DNS 传播
- [ ] 验证域名可访问

### Analytics
- [ ] 启用 Vercel Analytics
- [ ] 或配置 Google Analytics
- [ ] 设置转化目标

### SEO 优化
- [ ] 生成 sitemap.xml
- [ ] 创建 robots.txt
- [ ] 提交到 Google Search Console
- [ ] 提交到百度站长平台

### 社交媒体
- [ ] 设置 Open Graph 标签
- [ ] 添加 Twitter Card
- [ ] 准备社交媒体封面图

---

## 📊 长期维护 | Long-term Maintenance

### 每周
- [ ] 在 Notion 更新新闻
- [ ] 添加新发表的论文
- [ ] 检查网站是否正常

### 每月
- [ ] 更新团队成员信息
- [ ] 检查 Vercel Analytics
- [ ] 优化性能问题
- [ ] 备份 Notion 数据

### 每季度
- [ ] 更新 npm 依赖
- [ ] 检查安全更新
- [ ] 审查和优化内容
- [ ] 收集用户反馈

### 每年
- [ ] 重新设计考虑（如需要）
- [ ] 添加新功能
- [ ] 更新技术栈
- [ ] 域名续费

---

## 🆘 故障排除 | Troubleshooting

### 如果数据不显示
1. [ ] 检查环境变量是否正确
2. [ ] 检查 Integration 是否连接到数据库
3. [ ] 检查数据库中是否有数据
4. [ ] 查看 Vercel 部署日志

### 如果图片不加载
1. [ ] 检查 Notion Integration 权限
2. [ ] 检查 next.config.ts 图片域名配置
3. [ ] 确认图片 URL 可访问

### 如果构建失败
1. [ ] 查看错误日志
2. [ ] 本地运行 `npm run build`
3. [ ] 检查 TypeScript 错误
4. [ ] 验证所有依赖已安装

---

## 📚 资源链接 | Resources

- **文档**: README.md, SETUP_GUIDE.md, DEPLOYMENT.md
- **Next.js**: https://nextjs.org/docs
- **Notion API**: https://developers.notion.com
- **Vercel**: https://vercel.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

---

## ✨ 完成标志 | Completion Criteria

当以下所有项都完成时，你的网站就可以正式发布了：

- [x] ✅ Notion 数据库创建完成
- [x] ✅ 环境变量配置完成
- [x] ✅ 本地测试通过
- [x] ✅ 测试数据添加完成
- [x] ✅ Vercel 部署成功
- [x] ✅ 所有页面功能正常
- [x] ✅ 响应式设计验证通过
- [x] ✅ 真实内容填充完成

---

**祝贺！你的量子光子学实验室网站即将上线！🎉**

**Congratulations! Your Quantum Photonics Lab website is ready to launch! 🎉**
