/**
 * 为 Notion News 数据库添加 URL 字段，并给有外链的新闻更新链接
 * 运行: npx tsx scripts/update-news-urls.ts
 */

import { config } from 'dotenv';
import { Client } from '@notionhq/client';

config({ path: '.env.local' });

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const NEWS_DB = process.env.NOTION_DATABASE_NEWS || '';

// title keyword → external URL
const URL_MAP: Record<string, string> = {
  '高性能量子器件': 'https://news.sciencenet.cn/htmlnews/2025/10/552898.shtm',
  '缺陷': 'https://baijiahao.baidu.com/s?id=1854445789561211272&wfr=spider&for=pc',
};

async function main() {
  // 1. 添加 URL 字段
  try {
    await (notion.databases as any).update({
      database_id: NEWS_DB,
      properties: { URL: { url: {} } },
    });
    console.log('✅ URL 字段已添加');
  } catch (e: any) {
    console.log('ℹ️  URL 字段已存在，跳过');
  }

  // 2. 查出所有新闻并更新
  const res = await (notion.databases as any).query({ database_id: NEWS_DB });
  console.log(`\n📰 共 ${res.results.length} 条新闻\n`);

  for (const page of res.results) {
    const title: string = page.properties?.Title?.title?.[0]?.plain_text || '';
    const match = Object.keys(URL_MAP).find((k) => title.includes(k));
    if (!match) {
      console.log(`  ⏭️  无外链: ${title.slice(0, 50)}`);
      continue;
    }
    await (notion.pages as any).update({
      page_id: page.id,
      properties: { URL: { url: URL_MAP[match] } },
    });
    console.log(`  ✅ ${title.slice(0, 50)}`);
    console.log(`     → ${URL_MAP[match]}`);
  }

  console.log('\n🎉 完成！');
}

main();
