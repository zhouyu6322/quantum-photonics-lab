/**
 * 自动创建 Notion 数据库
 *
 * 使用方法：
 * 1. 在 Notion 中创建一个空白页面
 * 2. 复制页面 URL，获取页面 ID
 * 3. 运行: npx tsx scripts/setup-notion-databases.ts <PAGE_ID>
 */

import { config } from 'dotenv';
import { Client } from '@notionhq/client';

// 加载环境变量
config({ path: '.env.local' });

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const PARENT_PAGE_ID = process.argv[2];

if (!PARENT_PAGE_ID) {
  console.error('❌ 错误：请提供父页面 ID');
  console.error('用法: npx tsx scripts/setup-notion-databases.ts <PAGE_ID>');
  process.exit(1);
}

async function createTeamDatabase() {
  console.log('📊 创建 Team Members 数据库...');

  const response = await notion.databases.create({
    parent: {
      type: 'page_id',
      page_id: PARENT_PAGE_ID,
    },
    title: [
      {
        type: 'text',
        text: {
          content: 'Team Members',
        },
      },
    ],
    properties: {
      Name: {
        title: {},
      },
      Photo: {
        files: {},
      },
      Role: {
        select: {
          options: [
            { name: 'PI', color: 'blue' },
            { name: 'Postdoc', color: 'green' },
            { name: 'PhD', color: 'purple' },
            { name: 'Master', color: 'pink' },
            { name: 'Undergraduate', color: 'orange' },
            { name: 'Alumni', color: 'gray' },
          ],
        },
      },
      Email: {
        email: {},
      },
      'Join Year': {
        number: {
          format: 'number',
        },
      },
      Institution: {
        rich_text: {},
      },
      'Research Focus': {
        multi_select: {
          options: [],
        },
      },
      Homepage: {
        url: {},
      },
      'Google Scholar': {
        url: {},
      },
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

  console.log('✅ Team Members 数据库创建成功！');
  console.log(`   ID: ${response.id}`);
  return response.id;
}

async function createResearchDatabase() {
  console.log('📊 创建 Research Areas 数据库...');

  const response = await notion.databases.create({
    parent: {
      type: 'page_id',
      page_id: PARENT_PAGE_ID,
    },
    title: [
      {
        type: 'text',
        text: {
          content: 'Research Areas',
        },
      },
    ],
    properties: {
      Title: {
        title: {},
      },
      Description: {
        rich_text: {},
      },
      Icon: {
        files: {},
      },
    },
  });

  console.log('✅ Research Areas 数据库创建成功！');
  console.log(`   ID: ${response.id}`);
  return response.id;
}

async function createPublicationsDatabase() {
  console.log('📊 创建 Publications 数据库...');

  const response = await notion.databases.create({
    parent: {
      type: 'page_id',
      page_id: PARENT_PAGE_ID,
    },
    title: [
      {
        type: 'text',
        text: {
          content: 'Publications',
        },
      },
    ],
    properties: {
      Title: {
        title: {},
      },
      DOI: {
        rich_text: {},
      },
      Journal: {
        rich_text: {},
      },
      Year: {
        number: {
          format: 'number',
        },
      },
      Authors: {
        rich_text: {},
      },
      'PDF Link': {
        url: {},
      },
      Category: {
        multi_select: {
          options: [],
        },
      },
    },
  });

  console.log('✅ Publications 数据库创建成功！');
  console.log(`   ID: ${response.id}`);
  return response.id;
}

async function createNewsDatabase() {
  console.log('📊 创建 News 数据库...');

  const response = await notion.databases.create({
    parent: {
      type: 'page_id',
      page_id: PARENT_PAGE_ID,
    },
    title: [
      {
        type: 'text',
        text: {
          content: 'News',
        },
      },
    ],
    properties: {
      Title: {
        title: {},
      },
      Date: {
        date: {},
      },
      Content: {
        rich_text: {},
      },
      Cover: {
        files: {},
      },
      Category: {
        select: {
          options: [
            { name: 'Award', color: 'yellow' },
            { name: 'Publication', color: 'blue' },
            { name: 'Event', color: 'green' },
            { name: 'Recruitment', color: 'purple' },
          ],
        },
      },
    },
  });

  console.log('✅ News 数据库创建成功！');
  console.log(`   ID: ${response.id}`);
  return response.id;
}

async function main() {
  console.log('🚀 开始创建 Notion 数据库...\n');

  if (!process.env.NOTION_TOKEN) {
    console.error('❌ 错误：未找到 NOTION_TOKEN');
    console.error('请确保 .env.local 文件中配置了 NOTION_TOKEN');
    process.exit(1);
  }

  try {
    const teamId = await createTeamDatabase();
    const researchId = await createResearchDatabase();
    const publicationsId = await createPublicationsDatabase();
    const newsId = await createNewsDatabase();

    console.log('\n\n🎉 所有数据库创建完成！\n');
    console.log('📋 请将以下 ID 添加到 .env.local 文件中：\n');
    console.log(`NOTION_DATABASE_TEAM=${teamId}`);
    console.log(`NOTION_DATABASE_RESEARCH=${researchId}`);
    console.log(`NOTION_DATABASE_PUBLICATIONS=${publicationsId}`);
    console.log(`NOTION_DATABASE_NEWS=${newsId}`);
    console.log('\n✅ 完成后重启开发服务器即可！');
  } catch (error) {
    console.error('\n❌ 创建数据库时出错：', error);
    process.exit(1);
  }
}

main();
