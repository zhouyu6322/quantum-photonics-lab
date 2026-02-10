/**
 * 为已有 Notion 数据库添加所需字段
 * 运行: npx tsx scripts/init-db-properties.ts
 */

import { config } from 'dotenv';
import { Client } from '@notionhq/client';

config({ path: '.env.local' });

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const PUBLICATIONS_DB = process.env.NOTION_DATABASE_PUBLICATIONS || '';
const TEAM_DB = process.env.NOTION_DATABASE_TEAM || '';

async function initPublicationsDB() {
  console.log('📊 初始化 Publications 数据库字段...');
  // 先把默认的 "Name" 标题字段重命名为 "Title"
  await notion.databases.update({
    database_id: PUBLICATIONS_DB,
    properties: {
      Name: { name: 'Title' } as any,
    },
  });
  // 再添加其他字段
  await notion.databases.update({
    database_id: PUBLICATIONS_DB,
    properties: {
      Authors: { rich_text: {} },
      Journal: { rich_text: {} },
      Year: { number: { format: 'number' } },
      DOI: { rich_text: {} },
      'PDF Link': { url: {} },
      Category: { multi_select: { options: [] } },
    },
  });
  console.log('✅ Publications 字段初始化完成');
}

async function initTeamDB() {
  console.log('📊 初始化 Team 数据库字段...');
  // "Name" 已经是标题字段，直接添加其他字段
  await notion.databases.update({
    database_id: TEAM_DB,
    properties: {
      Role: {
        select: {
          options: [
            { name: 'PI', color: 'blue' },
            { name: 'Postdoc', color: 'green' },
            { name: 'PhD', color: 'purple' },
            { name: 'Master', color: 'pink' },
            { name: 'Alumni', color: 'gray' },
          ],
        },
      },
      Email: { email: {} },
      'Join Year': { number: { format: 'number' } },
      Institution: { rich_text: {} },
      'Research Focus': { multi_select: { options: [] } },
      Homepage: { url: {} },
      'Google Scholar': { url: {} },
      Status: {
        select: {
          options: [
            { name: 'Active', color: 'green' },
            { name: 'Alumni', color: 'gray' },
          ],
        },
      },
    },
  });
  console.log('✅ Team 字段初始化完成');
}

async function main() {
  console.log('🚀 初始化数据库字段...\n');
  try {
    await initPublicationsDB();
    await initTeamDB();
    console.log('\n🎉 完成！现在可以运行 populate-notion.ts 导入数据了。');
  } catch (e: any) {
    console.error('❌ 错误:', e.message);
  }
}

main();
