# 开发纪要 · 量子光子学课题组网站

> 最后更新：2026-02-11

---

## 项目概览

**技术栈**：Next.js 16 (App Router) + Tailwind CSS + Notion API (CMS) + Zeabur (部署)

**本地开发**：
```bash
cd /Users/qphit/quantum-photonics-lab
npm run dev   # http://localhost:3000
```

**部署**：推送到 GitHub → Zeabur 自动重新部署

---

## 已完成的工作

### 页面
| 页面 | 路径 | 数据来源 |
|------|------|---------|
| 首页 | `app/page.tsx` | Notion (Team, News, Publications) |
| 关于 | `app/about/page.tsx` | 静态（PI 信息硬编码）|
| 研究方向 | `app/research/page.tsx` | Notion Research DB + 本地 fallback |
| 论文 | `app/publications/page.tsx` | Notion Publications DB |
| 团队 | `app/team/page.tsx` | Notion Team DB |
| 新闻 | `app/news/page.tsx` | Notion News DB |

### Notion 数据库（均已初始化）
- **Team**：Name, Role, Email, Photo, Join Year, Institution, Research Focus, Homepage, Google Scholar, Status
- **Publications**：Title, Authors, Journal, Year, DOI, PDF Link, Category
- **News**：Title, Date, Content, Cover, Source, URL, Category
- **Research**：Title, Description, Order, Color, Keywords, Metrics

### 首页
- 深色 hero：左侧文字 + 右侧 SiC 封面图
- 统计栏：`30+` Publications、`4×` Nature Comms、`PRL`、`Sci. Adv.`
- 两个研究方向卡片
- PI 双人展示（宋清海 + 周宇，2列grid）
- 最新论文列表
- 最新新闻列表

### About 页面
- PI 顺序：**宋清海**（左）→ 周宇（右）
- 宋清海：教授 · 集成电路学院院长 · `国家级人才`
- 周宇：教授 · 集成电路学院 · `国家级青年人才`
- 联系邮箱：`zhouyu2022@hit.edu.cn`
- Research Focus：3列grid（SiC Chips、Quantum Sensing、Spin-Photon Interfaces）

### 图片资源
```
public/images/
├── cover-art-sic-ring.jpg        # 封面图（hero/banner 复用）
├── divacancy-sic-structure.jpg   # Research 页用
├── team/
│   ├── yu-zhou.png               # 周宇照片（原图）
│   └── qinghai-song.jpg          # 宋清海照片（处理中，见下）
├── news/
│   ├── keji-daily-2025-01-16.jpg
│   └── physorg-2025-10-10.jpg
└── papers/                       # 论文 PDF 缩略图（14张）
```

### 照片处理说明
- **周宇**：直接使用原图，效果正常
- **宋清海**：因原证件照比例问题，用 `rembg` 去背景处理
  - 处理脚本：见下方"常用命令"
  - 原始照片来源：`~/Downloads/` 各 Snipaste 截图

---

## 待完成 / 已知问题

- [ ] **宋清海照片**：比例问题仍在调试，最佳原图是 `Snipaste_2026-02-11_13-05-53.jpg`（带肩膀西装照）
- [ ] **部署**：所有改动需 `git push` 到 GitHub 后 Zeabur 才会更新线上版本
- [ ] **新成员照片**：新增学生需要把照片放到 `public/images/team/`，并在 `lib/notion.ts` 的 `LOCAL_PHOTOS` 里加一行

---

## 常用命令

```bash
# 启动开发服务器
npm run dev

# 彻底清除缓存并重启（照片不更新时用）
pkill -f "next dev"; rm -rf .next; npm run dev

# rembg 去背景处理照片
python3 -c "
from rembg import remove
from PIL import Image
img = Image.open('原图路径').convert('RGBA')
out = remove(img)
# ...缩放/合成到白底 960x960
"

# 推送部署
git add -A && git commit -m 'update' && git push
```

---

## 关键文件索引

| 文件 | 用途 |
|------|------|
| `lib/notion.ts` | Notion API 所有查询函数 + LOCAL_PHOTOS 映射 |
| `lib/types.ts` | TypeScript 类型定义 |
| `components/TeamMemberCard.tsx` | 团队成员卡片（aspect-square + object-cover object-top）|
| `components/NewsCard.tsx` | 新闻卡片（含本地 PDF 映射）|
| `components/PublicationList.tsx` | 论文列表 |
| `next.config.ts` | 图片域名白名单（Notion S3）|
| `.env.local` | Notion Token + 数据库 ID（不提交到 git）|
