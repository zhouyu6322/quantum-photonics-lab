# Quantum Photonics Lab Website

哈尔滨工业大学（深圳）量子光子学课题组网站

A modern, responsive academic research group website built with Next.js 14 and Notion as CMS.

## 🚀 Features

- **Notion as CMS**: Easy content management through Notion databases
- **Modern Design**: Clean, professional design with responsive layout
- **SSG/ISR**: Static Site Generation with Incremental Static Regeneration
- **SEO Optimized**: Proper metadata and semantic HTML
- **Auto-deployment**: Automatic deployment to Vercel when Notion content updates
- **TypeScript**: Full type safety
- **Tailwind CSS**: Modern styling with utility-first CSS

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Notion account
- A Vercel account (for deployment)

## 🛠️ Setup Instructions

### 1. Notion Setup

#### Create Notion Integration

1. Visit [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Give it a name (e.g., "Quantum Lab Website")
4. Select your workspace
5. Copy the **Integration Token** (starts with `secret_`)

#### Create Notion Databases

Create the following databases in your Notion workspace:

**Team Members Database:**
- Name (Title)
- Photo (Files & Media)
- Role (Select: PI, Postdoc, PhD, Master, Undergraduate, Alumni)
- Email (Email)
- Join Year (Number)
- Institution (Text)
- Research Focus (Multi-select)
- Homepage (URL)
- Google Scholar (URL)
- Status (Select: Active, Alumni)

**Research Areas Database:**
- Title (Title)
- Description (Text - Rich)
- Icon (Files & Media)

**Publications Database:**
- Title (Title)
- DOI (Text)
- Journal (Text)
- Year (Number)
- Authors (Text)
- PDF Link (URL)
- Category (Multi-select)

**News Database:**
- Title (Title)
- Date (Date)
- Content (Text - Rich)
- Cover (Files & Media)
- Category (Select: Award, Publication, Event, Recruitment)

#### Connect Integration to Databases

For each database:
1. Open the database page
2. Click "..." (three dots) in the top right
3. Click "Add connections"
4. Select your integration

#### Get Database IDs

For each database:
1. Open the database as a full page
2. Copy the URL: `https://www.notion.so/{workspace}/{database_id}?v={view_id}`
3. The `database_id` is the 32-character string (with dashes)

### 2. Local Development Setup

#### Install Dependencies

```bash
npm install
```

#### Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NOTION_TOKEN=secret_your_integration_token_here
NOTION_DATABASE_TEAM=your_team_database_id
NOTION_DATABASE_RESEARCH=your_research_database_id
NOTION_DATABASE_PUBLICATIONS=your_publications_database_id
NOTION_DATABASE_NEWS=your_news_database_id
```

#### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Vercel Deployment

#### Initial Deployment

1. Push your code to GitHub:

```bash
git add .
git commit -m "Initial commit: Quantum Photonics Lab website"
git remote add origin https://github.com/YOUR_USERNAME/quantum-lab.git
git push -u origin main
```

2. Visit [https://vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure the project:
   - Framework Preset: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`

#### Add Environment Variables

In Vercel project settings → Environment Variables, add:

- `NOTION_TOKEN`
- `NOTION_DATABASE_TEAM`
- `NOTION_DATABASE_RESEARCH`
- `NOTION_DATABASE_PUBLICATIONS`
- `NOTION_DATABASE_NEWS`

#### Deploy

Click "Deploy" and wait for the deployment to complete.

### 4. Content Updates & Auto-Sync

The website uses **ISR (Incremental Static Regeneration)** with a revalidation time of 3600 seconds (1 hour).

**How it works:**
- When you update content in Notion, changes will appear on the website within 1 hour
- The first visitor after the revalidation period triggers a rebuild
- No manual action required

**For immediate updates:**
You can manually trigger a redeploy in Vercel or set up Notion webhooks using services like:
- Zapier
- Make.com
- n8n

## 📁 Project Structure

```
quantum-photonics-lab/
├── app/                          # Next.js app directory
│   ├── layout.tsx                # Root layout with Header & Footer
│   ├── page.tsx                  # Home page
│   ├── team/page.tsx             # Team members page
│   ├── research/page.tsx         # Research areas page
│   ├── publications/page.tsx     # Publications list page
│   ├── news/page.tsx             # News & events page
│   └── about/page.tsx            # About us page
├── components/                   # React components
│   ├── Header.tsx                # Navigation header
│   ├── Footer.tsx                # Footer
│   ├── TeamMemberCard.tsx        # Team member card
│   ├── PublicationList.tsx       # Publication list
│   └── NewsCard.tsx              # News card
├── lib/                          # Utility functions
│   ├── notion.ts                 # Notion API client & queries
│   └── types.ts                  # TypeScript type definitions
├── public/                       # Static assets
├── .env.local                    # Environment variables (gitignored)
├── .env.local.example            # Environment variables template
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── package.json                  # Dependencies
```

## 🎨 Customization

### Styling

The website uses **Tailwind CSS**. To customize colors, fonts, or other styles:

1. Edit `tailwind.config.ts` for global theme settings
2. Modify component files for specific styling

### Content

All content is managed through Notion:

1. **Team members**: Add/edit in the Team Members database
2. **Research areas**: Add/edit in the Research Areas database
3. **Publications**: Add/edit in the Publications database
4. **News**: Add/edit in the News database

Changes will appear on the website automatically (within 1 hour with ISR).

### Adding New Pages

1. Create a new directory in `app/` (e.g., `app/contact/`)
2. Add a `page.tsx` file in that directory
3. Update the navigation in `components/Header.tsx`

## 📊 Importing Existing Publications

If you have a large number of publications to import, you can create a script to batch-import them to Notion.

See the plan document for guidance on creating an import script.

## 🔧 Troubleshooting

### Images not loading

- Ensure your Notion integration has access to the pages with images
- Check that `next.config.ts` includes the correct image domains
- Notion image URLs expire after some time; they need to be refreshed

### Data not updating

- Check ISR revalidation time (3600 seconds = 1 hour)
- Manually trigger a redeploy in Vercel
- Check Vercel deployment logs for errors

### Build errors

- Verify all environment variables are set correctly
- Check Notion database property names match the code
- Ensure Notion integration has access to all databases

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or support, please contact: contact@example.com

---

Built with ❤️ using [Next.js](https://nextjs.org), [Notion](https://www.notion.so), and [Vercel](https://vercel.com)
