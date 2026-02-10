import { Client } from '@notionhq/client';
import { TeamMember, Publication, ResearchArea, NewsItem } from './types';

// 初始化 Notion 客户端
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// 数据库 ID 配置
export const DATABASE_IDS = {
  TEAM: process.env.NOTION_DATABASE_TEAM || '',
  RESEARCH: process.env.NOTION_DATABASE_RESEARCH || '',
  PUBLICATIONS: process.env.NOTION_DATABASE_PUBLICATIONS || '',
  NEWS: process.env.NOTION_DATABASE_NEWS || '',
};

// 辅助函数：从 Notion 属性中提取文本
function getPlainText(property: any): string {
  if (!property) return '';

  if (property.type === 'title' && property.title) {
    return property.title.map((t: any) => t.plain_text).join('');
  }
  if (property.type === 'rich_text' && property.rich_text) {
    return property.rich_text.map((t: any) => t.plain_text).join('');
  }
  if (property.type === 'text' && property.text) {
    return property.text.map((t: any) => t.plain_text).join('');
  }
  return '';
}

// 辅助函数：从 Notion 属性中提取数字
function getNumber(property: any): number {
  if (property?.type === 'number' && typeof property.number === 'number') {
    return property.number;
  }
  return 0;
}

// 辅助函数：从 Notion 属性中提取 URL
function getUrl(property: any): string {
  if (property?.type === 'url' && property.url) {
    return property.url;
  }
  return '';
}

// 辅助函数：从 Notion 属性中提取 Email
function getEmail(property: any): string {
  if (property?.type === 'email' && property.email) {
    return property.email;
  }
  return '';
}

// 辅助函数：从 Notion 属性中提取 Select
function getSelect(property: any): string {
  if (property?.type === 'select' && property.select) {
    return property.select.name;
  }
  return '';
}

// 辅助函数：从 Notion 属性中提取 Multi-select
function getMultiSelect(property: any): string[] {
  if (property?.type === 'multi_select' && property.multi_select) {
    return property.multi_select.map((item: any) => item.name);
  }
  return [];
}

// 辅助函数：从 Notion 属性中提取文件
function getFiles(property: any): string {
  if (property?.type === 'files' && property.files && property.files.length > 0) {
    const file = property.files[0];
    if (file.type === 'external') {
      return file.external.url;
    } else if (file.type === 'file') {
      return file.file.url;
    }
  }
  return '';
}

// 辅助函数：从 Notion 属性中提取日期
function getDate(property: any): string {
  if (property?.type === 'date' && property.date) {
    return property.date.start;
  }
  return '';
}

// 本地照片映射（Notion files 字段不支持本地路径，用此兜底）
const LOCAL_PHOTOS: Record<string, string> = {
  'Yu Zhou (周宇)': '/images/team/yu-zhou.png',
};

/**
 * 获取团队成员列表
 * @param status 过滤状态：'Active', 'Alumni', 或不传则获取全部
 */
export async function getTeamMembers(status?: 'Active' | 'Alumni'): Promise<TeamMember[]> {
  if (!DATABASE_IDS.TEAM) {
    console.warn('NOTION_DATABASE_TEAM is not configured');
    return [];
  }

  try {
    const response = await (notion.databases as any).query({
      database_id: DATABASE_IDS.TEAM,
      filter: status ? {
        property: 'Status',
        select: { equals: status },
      } : undefined,
      sorts: [
        { property: 'Role', direction: 'ascending' },
        { property: 'Join Year', direction: 'descending' },
      ],
    });

    return response.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        name: getPlainText(props.Name),
        photo: getFiles(props.Photo) || LOCAL_PHOTOS[getPlainText(props.Name)] || '',
        role: getSelect(props.Role) as TeamMember['role'],
        email: getEmail(props.Email),
        joinYear: getNumber(props['Join Year']),
        institution: getPlainText(props.Institution),
        researchFocus: getMultiSelect(props['Research Focus']),
        homepage: getUrl(props.Homepage),
        googleScholar: getUrl(props['Google Scholar']),
        status: getSelect(props.Status) as 'Active' | 'Alumni',
      };
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

/**
 * 获取研究方向列表
 */
export async function getResearchAreas(): Promise<ResearchArea[]> {
  if (!DATABASE_IDS.RESEARCH) {
    console.warn('NOTION_DATABASE_RESEARCH is not configured');
    return [];
  }

  try {
    const response = await (notion.databases as any).query({
      database_id: DATABASE_IDS.RESEARCH,
    });

    return response.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        title: getPlainText(props.Title),
        description: getPlainText(props.Description),
        icon: getFiles(props.Icon),
      };
    });
  } catch (error) {
    console.error('Error fetching research areas:', error);
    return [];
  }
}

/**
 * 获取论文发表列表
 * @param year 可选：按年份过滤
 * @param limit 可选：限制返回数量
 */
export async function getPublications(year?: number, limit?: number): Promise<Publication[]> {
  if (!DATABASE_IDS.PUBLICATIONS) {
    console.warn('NOTION_DATABASE_PUBLICATIONS is not configured');
    return [];
  }

  try {
    const response = await (notion.databases as any).query({
      database_id: DATABASE_IDS.PUBLICATIONS,
      filter: year ? {
        property: 'Year',
        number: { equals: year },
      } : undefined,
      sorts: [
        { property: 'Year', direction: 'descending' },
      ],
      page_size: limit || 100,
    });

    return response.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        title: getPlainText(props.Title),
        doi: getPlainText(props.DOI),
        journal: getPlainText(props.Journal),
        year: getNumber(props.Year),
        authors: getPlainText(props.Authors),
        pdfLink: getUrl(props['PDF Link']),
        category: getMultiSelect(props.Category),
      };
    });
  } catch (error) {
    console.error('Error fetching publications:', error);
    return [];
  }
}

/**
 * 获取新闻动态列表
 * @param limit 可选：限制返回数量
 */
export async function getNews(limit?: number): Promise<NewsItem[]> {
  if (!DATABASE_IDS.NEWS) {
    console.warn('NOTION_DATABASE_NEWS is not configured');
    return [];
  }

  try {
    const response = await (notion.databases as any).query({
      database_id: DATABASE_IDS.NEWS,
      sorts: [
        { property: 'Date', direction: 'descending' },
      ],
      page_size: limit || 50,
    });

    return response.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        title: getPlainText(props.Title),
        date: getDate(props.Date),
        content: getPlainText(props.Content),
        cover: getFiles(props.Cover),
        category: getSelect(props.Category) as NewsItem['category'],
      };
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

/**
 * 获取单个 Notion 页面内容（用于详情页）
 */
export async function getPage(pageId: string) {
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    return page;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

/**
 * 获取页面的所有块内容（用于富文本内容展示）
 */
export async function getBlocks(blockId: string) {
  try {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
    });
    return response.results;
  } catch (error) {
    console.error('Error fetching blocks:', error);
    return [];
  }
}
