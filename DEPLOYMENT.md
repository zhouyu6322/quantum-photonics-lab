# Deployment Guide

## 部署到 Vercel | Deploy to Vercel

### 前置条件 | Prerequisites

1. 已完成 Notion 配置（参考 SETUP_GUIDE.md）
2. 代码已推送到 GitHub
3. 拥有 Vercel 账号

### 步骤 1：准备 GitHub 仓库 | Step 1: Prepare GitHub Repository

如果还没有推送代码到 GitHub：

```bash
# 初始化 git (如果还没有)
git init

# 添加所有文件
git add .

# 创建第一次提交
git commit -m "Initial commit: Quantum Photonics Lab website"

# 添加远程仓库 (替换为你的 GitHub 用户名和仓库名)
git remote add origin https://github.com/YOUR_USERNAME/quantum-lab.git

# 推送到 GitHub
git push -u origin main
```

### 步骤 2：连接 Vercel | Step 2: Connect Vercel

1. 访问 [https://vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "Add New Project"
4. 选择你的 GitHub 仓库 `quantum-lab`

### 步骤 3：配置项目 | Step 3: Configure Project

在 Vercel 导入页面：

**Framework Preset:**
- 选择 "Next.js"（应该会自动检测）

**Root Directory:**
- 保持默认（留空或选择根目录）

**Build Settings:**
- Build Command: `npm run build` (自动填充)
- Output Directory: `.next` (自动填充)
- Install Command: `npm install` (自动填充)

### 步骤 4：添加环境变量 | Step 4: Add Environment Variables

点击 "Environment Variables" 部分，添加以下变量：

| Name | Value | Description |
|------|-------|-------------|
| `NOTION_TOKEN` | `secret_xxxxx...` | 你的 Notion Integration Token |
| `NOTION_DATABASE_TEAM` | `xxx-xxx-xxx...` | Team Members 数据库 ID |
| `NOTION_DATABASE_RESEARCH` | `xxx-xxx-xxx...` | Research Areas 数据库 ID |
| `NOTION_DATABASE_PUBLICATIONS` | `xxx-xxx-xxx...` | Publications 数据库 ID |
| `NOTION_DATABASE_NEWS` | `xxx-xxx-xxx...` | News 数据库 ID |

**重要提示：**
- 每个变量都要添加到 **Production**, **Preview**, 和 **Development** 环境
- 可以点击 checkbox 一次性选择所有环境

### 步骤 5：部署 | Step 5: Deploy

1. 点击 "Deploy" 按钮
2. 等待部署完成（通常需要 1-3 分钟）
3. 部署成功后，会显示部署的 URL（如 `https://your-project.vercel.app`）

### 步骤 6：验证部署 | Step 6: Verify Deployment

1. 访问部署的 URL
2. 检查所有页面是否正常显示
3. 如果 Notion 数据库有内容，应该能看到实际数据
4. 如果 Notion 数据库为空，会显示占位符内容

## 自定义域名 | Custom Domain (可选 | Optional)

### 添加自定义域名 | Add Custom Domain

1. 在 Vercel 项目页面，点击 "Settings"
2. 选择 "Domains"
3. 输入你的域名（如 `qphit.com` 或 `lab.qphit.com`）
4. 点击 "Add"

### 配置 DNS | Configure DNS

Vercel 会提供 DNS 配置说明：

**使用子域名（推荐）| Using subdomain (recommended):**
```
Type: CNAME
Name: lab (或其他子域名)
Value: cname.vercel-dns.com
```

**使用根域名 | Using root domain:**
```
Type: A
Name: @
Value: 76.76.21.21
```

等待 DNS 传播（可能需要几分钟到48小时）

## 持续部署 | Continuous Deployment

### 自动部署 | Automatic Deployment

Vercel 已自动配置了 CI/CD：

- **推送到 main 分支** → 自动部署到生产环境
- **推送到其他分支** → 自动创建预览部署
- **Pull Request** → 自动创建预览部署

### 手动触发部署 | Manual Deployment

如果需要手动触发重新部署：

1. 访问 Vercel 项目页面
2. 点击 "Deployments"
3. 点击最新部署右侧的"..."
4. 选择 "Redeploy"

## ISR 配置 | ISR Configuration

### 当前配置 | Current Configuration

网站使用 ISR（增量静态再生成），revalidate 时间为 **3600 秒（1小时）**：

```typescript
export const revalidate = 3600;
```

### 工作原理 | How it works

1. 用户访问页面
2. 如果缓存时间未超过1小时，显示缓存的内容
3. 如果超过1小时：
   - 立即显示旧内容
   - 后台重新生成页面
   - 下一个访问者看到新内容

### 调整 revalidate 时间 | Adjust revalidate time

在各个页面文件中修改：

```typescript
// 更频繁更新（10分钟）
export const revalidate = 600;

// 更少更新（6小时）
export const revalidate = 21600;

// 每次访问都更新（不推荐，会增加 Notion API 调用）
export const revalidate = 0;
```

## Notion Webhook 实时更新 | Real-time Updates with Webhooks (高级 | Advanced)

Notion 本身不提供 webhook，但可以通过第三方服务实现：

### 使用 Zapier

1. 创建 Zap: Notion → Webhooks by Zapier
2. Trigger: "Updated Database Item"
3. Action: "POST" to Vercel Deploy Hook
4. Deploy Hook URL: `https://api.vercel.com/v1/integrations/deploy/[project]/[token]`

获取 Deploy Hook：
- Vercel 项目 → Settings → Git → Deploy Hooks
- 创建新的 Deploy Hook

### 使用 Make.com (Integromat)

类似 Zapier，配置流程：
1. Watch Database Items (Notion)
2. HTTP Request (Webhooks)
3. 目标 URL: Vercel Deploy Hook

## 监控和调试 | Monitoring and Debugging

### 查看部署日志 | View Deployment Logs

1. Vercel 项目页面 → Deployments
2. 点击具体的部署
3. 查看 "Build Logs" 和 "Function Logs"

### 常见错误 | Common Errors

**错误：Environment variables not configured**
- 检查 Vercel 环境变量设置
- 确保变量名拼写正确

**错误：Notion API error**
- 检查 Integration Token 是否有效
- 确保 Integration 已连接到所有数据库
- 检查数据库 ID 是否正确

**错误：Images not loading**
- 检查 `next.config.ts` 中的 `remotePatterns`
- 确保 Notion 图片 URL 可访问

### Vercel Analytics (可选)

启用 Vercel Analytics：
1. Vercel 项目 → Analytics
2. Enable Analytics
3. 查看访问数据、性能指标

### 监控 Notion API 使用量

Notion 免费计划限制：
- 个人：无限制
- 团队：每秒 3 请求

如果流量大，考虑：
- 增加 `revalidate` 时间
- 使用 Vercel Edge Cache
- 升级 Notion 计划

## 备份和恢复 | Backup and Recovery

### 备份 Notion 数据

定期导出 Notion 数据：
1. Notion → Settings & Members → Settings
2. Export content → Export all workspace content
3. 选择 HTML 或 Markdown 格式

### 回滚部署

如果新部署有问题：
1. Vercel → Deployments
2. 找到稳定的旧部署
3. 点击右侧"..."→ "Promote to Production"

## 性能优化建议 | Performance Optimization

### 1. 图片优化
- 在 Notion 中使用压缩的图片（建议 < 500KB）
- 使用 WebP 格式
- Next.js Image 组件会自动优化

### 2. 缓存策略
- 根据内容更新频率调整 `revalidate`
- 新闻：较短的 revalidate（如 10分钟）
- 团队成员：较长的 revalidate（如 6小时）

### 3. 数据库查询优化
- 限制返回数量（使用 `page_size`）
- 只查询需要的属性
- 使用适当的 filter 和 sort

### 4. 边缘网络
- Vercel 自动使用全球 CDN
- 静态资源自动缓存
- 考虑使用 Edge Functions（高级）

## 故障排除 | Troubleshooting

### 问题：部署失败

**解决方案：**
1. 检查 Build Logs 中的错误信息
2. 确保所有依赖已正确安装
3. 本地运行 `npm run build` 确保可以成功构建

### 问题：页面显示空白

**解决方案：**
1. 检查浏览器控制台错误
2. 确保环境变量已设置
3. 检查 Notion 数据库是否有数据

### 问题：Notion 数据不更新

**解决方案：**
1. 等待 revalidate 时间过期
2. 手动触发重新部署
3. 检查 Notion Integration 权限

### 问题：部署速度慢

**解决方案：**
1. 减少数据库查询数量
2. 使用并行查询（Promise.all）
3. 优化图片大小
4. 考虑使用 ISR 而非 SSR

## 联系支持 | Contact Support

- **Vercel Support**: https://vercel.com/support
- **Notion Support**: https://www.notion.so/help/contact-support
- **Next.js Documentation**: https://nextjs.org/docs
- **Project Issues**: GitHub Issues

---

## 快速检查清单 | Quick Checklist

部署前检查：

- [ ] 代码已推送到 GitHub
- [ ] Notion Integration 已创建
- [ ] 所有 Notion 数据库已创建并配置
- [ ] Integration 已连接到所有数据库
- [ ] 已获取所有数据库 ID
- [ ] 本地测试通过 (`npm run build`)

部署后检查：

- [ ] 所有页面可以访问
- [ ] Notion 数据正确显示
- [ ] 图片正常加载
- [ ] 响应式设计在移动端正常
- [ ] 导航菜单功能正常
- [ ] 链接都正常工作

---

祝部署顺利！ Good luck with your deployment! 🚀
