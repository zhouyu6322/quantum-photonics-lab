/**
 * 初始化 News 数据库字段并导入新闻
 * 运行: npx tsx scripts/import-news.ts
 */

import { config } from 'dotenv';
import { Client } from '@notionhq/client';

config({ path: '.env.local' });

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const NEWS_DB = process.env.NOTION_DATABASE_NEWS || '';

const NEWS_ITEMS = [
  {
    title: '碳化硅集成光量子纠缠器件领域研究获突破',
    date: '2025-01-16',
    content: '科技日报报道：哈尔滨工业大学（深圳）宋清海教授和周宇教授团队在碳化硅集成光量子纠缠器件领域取得突破，在光波导中实现近100%核自旋极化，相关成果发表于 Nature Communications。',
    source: '科技日报',
    category: 'Publication',
  },
  {
    title: 'Strain Engineering Enhances Spin Readout in Quantum Technologies',
    date: '2025-10-10',
    content: 'Phys.org reports: Researchers at Harbin Institute of Technology (Shenzhen) demonstrated that strain engineering can significantly enhance spin readout contrast in silicon carbide quantum systems, achieving over 60% contrast at room temperature. The work was published in Physical Review Letters.',
    source: 'Phys.org',
    category: 'Publication',
  },
  {
    title: '研究人员在高性能量子器件领域取得新进展',
    date: '2025-10-10',
    content: '中国科学报报道：哈尔滨工业大学（深圳）宋清海、周宇团队利用碳化硅材料的固有应变，将碳化硅量子比特的室温自旋读出对比度提升至60%以上，为量子传感等实际应用场景的高性能量子器件开发提供了新途径。相关成果发表于 Physical Review Letters。',
    source: '中国科学报',
    category: 'Publication',
  },
  {
    title: '周宇："缺陷"变"资源"！哈工大深圳团队实现碳化硅光量子芯片关键突破',
    date: '2026-01-16',
    content: '读特新闻报道：哈尔滨工业大学（深圳）周宇团队将材料"缺陷"转化为量子资源，在碳化硅光量子芯片领域实现关键突破。',
    source: '读特新闻',
    category: 'Publication',
  },
];

async function initNewsDB() {
  console.log('📊 初始化 News 数据库字段...');
  try {
    // 先尝试重命名默认标题字段 Name → Title
    await (notion.databases as any).update({
      database_id: NEWS_DB,
      properties: {
        Name: { name: 'Title' },
      },
    });
    console.log('  ✅ 标题字段重命名为 Title');
  } catch {
    console.log('  ℹ️  标题字段可能已是 Title，跳过');
  }

  // 添加其他字段
  await (notion.databases as any).update({
    database_id: NEWS_DB,
    properties: {
      Date: { date: {} },
      Content: { rich_text: {} },
      Source: { rich_text: {} },
      Category: {
        select: {
          options: [
            { name: 'Publication', color: 'blue' },
            { name: 'Award', color: 'yellow' },
            { name: 'Event', color: 'green' },
            { name: 'Recruitment', color: 'pink' },
          ],
        },
      },
    },
  });
  console.log('  ✅ 字段添加完成');
}

async function importNews() {
  console.log('\n📰 导入新闻条目...');
  for (const item of NEWS_ITEMS) {
    try {
      await (notion.pages as any).create({
        parent: { database_id: NEWS_DB },
        properties: {
          Title: {
            title: [{ text: { content: item.title } }],
          },
          Date: {
            date: { start: item.date },
          },
          Content: {
            rich_text: [{ text: { content: item.content } }],
          },
          Source: {
            rich_text: [{ text: { content: item.source } }],
          },
          Category: {
            select: { name: item.category },
          },
        },
      });
      console.log(`  ✅ ${item.source}: ${item.title.slice(0, 40)}...`);
    } catch (e: any) {
      console.error(`  ❌ 失败: ${item.title.slice(0, 40)}`, e.message);
    }
  }
}

async function main() {
  if (!NEWS_DB) {
    console.error('❌ NOTION_DATABASE_NEWS 未配置');
    process.exit(1);
  }
  console.log(`🚀 News DB: ${NEWS_DB}\n`);
  await initNewsDB();
  await importNews();
  console.log('\n🎉 完成！');
}

main();
