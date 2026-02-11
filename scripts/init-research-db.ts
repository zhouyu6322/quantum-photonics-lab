/**
 * 初始化 Research 数据库字段并填入两个研究方向
 * 运行: npx tsx scripts/init-research-db.ts
 */

import { config } from 'dotenv';
import { Client } from '@notionhq/client';

config({ path: '.env.local' });
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DB = process.env.NOTION_DATABASE_RESEARCH || '';

async function init() {
  console.log('📊 初始化 Research 数据库字段...');

  // 1. 重命名 Name → Title
  try {
    await (notion.databases as any).update({
      database_id: DB,
      properties: { Name: { name: 'Title' } },
    });
    console.log('  ✅ Title 字段就绪');
  } catch { console.log('  ℹ️  Title 已存在'); }

  // 2. 添加其他字段
  await (notion.databases as any).update({
    database_id: DB,
    properties: {
      Description: { rich_text: {} },
      Order: { number: { format: 'number' } },
      Color: {
        select: {
          options: [
            { name: 'blue', color: 'blue' },
            { name: 'purple', color: 'purple' },
          ],
        },
      },
      Keywords: { multi_select: { options: [] } },
      Metrics: { rich_text: {} },  // pipe-separated: "~100% | Nuclear spin | On-chip | Entanglement"
    },
  });
  console.log('  ✅ 字段添加完成\n');
}

const DIRECTIONS = [
  {
    title: 'Integrated SiC Photonic Quantum Chips',
    description:
      'Silicon carbide (SiC) is an exceptional host for quantum emitters — its color centers (divacancy, silicon vacancy) possess long spin coherence times at room temperature and emit in the telecom band, making them uniquely suited for on-chip quantum photonic integration.\n\n' +
      'We design and fabricate SiC integrated photonic circuits that deterministically couple single color center emitters to guided modes. Our platform includes microring resonators for Purcell-enhanced emission and entangled photon pair generation, apodized grating couplers for efficient fiber-chip coupling, and on-chip beam splitters for all-integrated quantum optical operations.\n\n' +
      'In 2025, we demonstrated near-unity nuclear spin polarization of a single color center evanescently coupled inside an SiC waveguide — a key milestone toward scalable spin–photon interfaces.',
    order: 1,
    color: 'blue',
    keywords: ['Microring Resonator', 'Grating Coupler', 'On-chip Beam Splitter', 'Photon Entanglement', 'Spin–Photon Interface', 'Purcell Enhancement', 'Telecom Wavelength'],
    metrics: '~100% Nuclear spin polarization | On-chip Entangled photon pairs | Scalable Deterministic coupling',
  },
  {
    title: 'Color Center-Based Quantum Sensing',
    description:
      'The spin states of color centers are exquisitely sensitive to their local environment — magnetic fields, electric fields, strain, and temperature — making them ideal nanoscale sensors. We develop novel sensing protocols that exploit both SiC and diamond color center systems.\n\n' +
      'A central challenge in solid-state quantum sensing is achieving high spin readout contrast at room temperature. We have addressed this through strain engineering: by deliberately introducing and controlling strain in SiC thin membranes, we modulate the radiative and non-radiative transition rates of the divacancy spin states, boosting readout contrast to >60% — far exceeding bulk material values.\n\n' +
      'We also investigate all-optical thermometry using SiC color centers, exploiting the temperature dependence of zero-phonon line positions for non-invasive local temperature sensing in biological and micro-electromechanical contexts.',
    order: 2,
    color: 'purple',
    keywords: ['Strain Engineering', 'Spin Readout Contrast', 'Divacancy', 'NV Center', 'Thermometry', 'Magnetic Field Sensing', 'Room-Temperature Operation'],
    metrics: '>60% Spin readout contrast at RT | Strain Engineered enhancement | All-optical Non-contact thermometry',
  },
];

async function populate() {
  console.log('📝 写入研究方向...');
  for (const d of DIRECTIONS) {
    await (notion.pages as any).create({
      parent: { database_id: DB },
      properties: {
        Title: { title: [{ text: { content: d.title } }] },
        Description: { rich_text: [{ text: { content: d.description } }] },
        Order: { number: d.order },
        Color: { select: { name: d.color } },
        Keywords: { multi_select: d.keywords.map(k => ({ name: k })) },
        Metrics: { rich_text: [{ text: { content: d.metrics } }] },
      },
    });
    console.log(`  ✅ ${d.title}`);
  }
}

async function main() {
  if (!DB) { console.error('❌ NOTION_DATABASE_RESEARCH 未配置'); process.exit(1); }
  await init();
  await populate();
  console.log('\n🎉 完成！Research 数据库已就绪，在 Notion 里直接编辑即可同步到网站。');
}

main();
