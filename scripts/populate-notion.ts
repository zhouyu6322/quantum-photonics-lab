/**
 * 批量导入论文和团队成员到 Notion 数据库
 * 运行: npx tsx scripts/populate-notion.ts
 */

import { config } from 'dotenv';
import { Client } from '@notionhq/client';

config({ path: '.env.local' });

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const PUBLICATIONS_DB = process.env.NOTION_DATABASE_PUBLICATIONS || '';
const TEAM_DB = process.env.NOTION_DATABASE_TEAM || '';

// ============================================================
// 论文数据
// ============================================================
const publications = [
  {
    title: 'Strain-Enhanced Spin Readout Contrast in Silicon Carbide Membranes',
    authors: 'Haibo Hu, Guodong Bian, Ailun Yi, Chunhui Jiang, Junhua Tan, Qi Luo, Bo Liang, Zhengtong Liu, Xinfang Nie, Dawei Lu, Shumin Xiao, Xin Ou, Adam Gali, Yu Zhou, Qinghai Song',
    journal: 'Physical Review Letters',
    year: 2025,
    doi: '10.1103/tdb3-tqfv',
    pdfLink: '',
    category: ['Silicon Carbide', 'Spin Defects', 'Quantum Sensing'],
  },
  {
    title: 'Integration of coherent spins in 4H-SiC beam splitters',
    authors: 'Chengying Liu, Yao Zhang, Ailun Yi, Qi Luo, Yingjie Li, Haibo Hu, Tongyuan Bao, Shumin Xiao, Xin Ou, Yu Zhou, Qinghai Song',
    journal: 'Optics Letters',
    year: 2025,
    doi: '10.1364/OL.567850',
    pdfLink: '',
    category: ['Silicon Carbide', 'Integrated Photonics', 'Spin Defects'],
  },
  {
    title: 'Enhancement of silicon vacancy fluorescence intensity in silicon carbide using a dielectric cavity',
    authors: 'Qi-Cheng Hu, Ji Xu, Qin-Yue Luo, Hai-Bo Hu, Pei-Jie Guo, Cheng-Ying Liu, Shuang Zhao, Yu Zhou, Jun-Feng Wang',
    journal: 'Optics Letters',
    year: 2024,
    doi: '10.1364/OL.522770',
    pdfLink: '',
    category: ['Silicon Carbide', 'Silicon Vacancy', 'Cavity QED'],
  },
  {
    title: 'Emission Control in Metal Halide Perovskite Lasers',
    authors: 'Kaiyang Wang, Can Huang, Qifeng Ruan, Yu Zhou, Yimu Chen, Haoliang Liu, Shumin Xiao, Qinghai Song',
    journal: 'ACS Photonics',
    year: 2023,
    doi: '10.1021/acsphotonics.2c01658',
    pdfLink: '',
    category: ['Perovskite', 'Laser Photonics'],
  },
  {
    title: 'Deterministic and Scalable Coupling of Single 4H-SiC Spin Defects into Bullseye Cavities',
    authors: 'Tongyuan Bao, Qi Luo, Ailun Yi, Yingjie Li, Haibo Hu, Xin Ou, Yu Zhou, Qinghai Song',
    journal: 'Laser & Photonics Reviews',
    year: 2025,
    doi: '10.1002/lpor.202502377',
    pdfLink: '',
    category: ['Silicon Carbide', 'Quantum Photonics', 'Spin Defects'],
  },
  {
    title: 'Tunable Cavity Coupling to Spin Defects in a 4H-Silicon-Carbide-On-Insulator Platform',
    authors: 'Tongyuan Bao, Qi Luo, Ailun Yi, Bo Liang, Yao Zhang, Hai-Bo Hu, Shen Lai, Zhengtong Liu, Shumin Xiao, Xin Ou, Yu Zhou, Qinghai Song',
    journal: 'ACS Photonics',
    year: 2025,
    doi: '10.1021/acsphotonics.4c02574',
    pdfLink: 'https://pubs.acs.org/doi/10.1021/acsphotonics.4c02574',
    category: ['Silicon Carbide', 'Quantum Photonics', 'Spin Defects', 'Cavity QED'],
  },
  {
    title: 'Silicon Carbide: A Promising Platform for Scalable Quantum Networks',
    authors: 'Yu Zhou, Jin Tan, Haibo Hu, et al.',
    journal: 'Applied Physics Reviews',
    year: 2025,
    doi: '10.1063/5.0247215',
    pdfLink: '',
    category: ['Silicon Carbide', 'Quantum Networks', 'Review'],
  },
  {
    title: 'Room-temperature waveguide integrated quantum register in a semiconductor photonic platform',
    authors: 'Haibo Hu, Yu Zhou, Ailun Yi, Tongyuan Bao, Chengying Liu, Qi Luo, Yao Zhang, Ziteng Wang, Qing Li, Di Lu, et al.',
    journal: 'Nature Communications',
    year: 2024,
    doi: '10.1038/s41467-024-54625-3',
    pdfLink: '',
    category: ['Silicon Carbide', 'Quantum Register', 'Integrated Photonics'],
  },
  {
    title: 'All-optical nanoscale thermometry with silicon carbide color centers',
    authors: 'Chengying Liu, Haibo Hu, Zhengtong Liu, Shumin Xiao, Junfeng Wang, Yu Zhou, Qinghai Song',
    journal: 'Photonics Research',
    year: 2024,
    doi: '10.1364/PRJ.525971',
    pdfLink: 'https://opg.optica.org/prj/abstract.cfm?doi=10.1364/PRJ.525971',
    category: ['Silicon Carbide', 'Quantum Sensing', 'Thermometry'],
  },
  {
    title: 'Rapid and unconditional parametric reset protocol for tunable superconducting qubits',
    authors: 'Yu Zhou, Zhenxing Zhang, Zelong Yin, Sainan Huai, Xiu Gu, Xiong Xu, Jonathan Allcock, Fuming Liu, Guanglei Xi, Qiaonian Yu, et al.',
    journal: 'Nature Communications',
    year: 2021,
    doi: '10.1038/s41467-021-26205-y',
    pdfLink: 'https://www.nature.com/articles/s41467-021-26205-y',
    category: ['Superconducting Qubits', 'Quantum Computing'],
  },
  {
    title: 'Observation of Binary Spectral Jumps in Color Centers in Diamond',
    authors: 'Zhuoqian Mu, Yu Zhou, Disheng Chen, Johannes E. Fröch, Junwen Yang, Xinlu Li, Igor Aharonovich, Weibo Gao',
    journal: 'Advanced Optical Materials',
    year: 2020,
    doi: '10.1002/adom.202000495',
    pdfLink: '',
    category: ['Diamond', 'Color Centers'],
  },
  {
    title: 'Bright room temperature single photon source at telecom range in cubic silicon carbide',
    authors: 'Junfeng Wang, Yu Zhou, Ziyu Wang, Abdullah Rasmita, Jingyuan Yang, Xinlu Li, H. Jürgen von Bardeleben, Weibo Gao',
    journal: 'Nature Communications',
    year: 2018,
    doi: '10.1038/s41467-018-06605-3',
    pdfLink: 'https://www.nature.com/articles/s41467-018-06605-3',
    category: ['Silicon Carbide', 'Single Photon Emitter'],
  },
  {
    title: 'Direct writing of single germanium vacancy center arrays in diamond',
    authors: 'Yu Zhou, Zhuoqian Mu, Giorgio Adamo, Stephan Bauerdick, Axel Rudzinski, Igor Aharonovich, Weibo Gao',
    journal: 'New Journal of Physics',
    year: 2018,
    doi: '10.1088/1367-2630/aaf2ac',
    pdfLink: '',
    category: ['Diamond', 'Color Centers'],
  },
  {
    title: 'Room temperature solid-state quantum emitters in the telecom range',
    authors: 'Yu Zhou, Ziyu Wang, Abdullah Rasmita, Sungkun Kim, Agele Berhane, Zsolt Bodrog, Giorgio Adamo, Adam Gali, Igor Aharonovich, Weibo Gao',
    journal: 'Science Advances',
    year: 2018,
    doi: '10.1126/sciadv.aar3580',
    pdfLink: 'https://www.science.org/doi/10.1126/sciadv.aar3580',
    category: ['GaN', 'Single Photon Emitter', 'Telecom'],
  },
  {
    title: 'Self-protected thermometry with infrared photons and defect spins in silicon carbide',
    authors: 'Yu Zhou, Junfeng Wang, Xiaoming Zhang, Ke Li, Jianming Cai, Weibo Gao',
    journal: 'Physical Review Applied',
    year: 2017,
    doi: '10.1103/PhysRevApplied.8.044015',
    pdfLink: '',
    category: ['Silicon Carbide', 'Quantum Sensing', 'Thermometry'],
  },
  {
    title: 'Coherent control of a strongly driven silicon vacancy optical transition in diamond',
    authors: 'Yu Zhou, Abdullah Rasmita, Ke Li, Qihua Xiong, Igor Aharonovich, Weibo Gao',
    journal: 'Nature Communications',
    year: 2017,
    doi: '10.1038/ncomms14451',
    pdfLink: 'https://www.nature.com/articles/ncomms14451',
    category: ['Diamond', 'Silicon Vacancy', 'Coherent Control'],
  },
];

// ============================================================
// 团队成员数据 (PI)
// ============================================================
const teamMembers = [
  {
    name: 'Yu Zhou (周宇)',
    role: 'PI',
    email: 'zhouyu2022@hit.edu.cn',
    joinYear: 2022,
    institution: 'Harbin Institute of Technology, Shenzhen',
    researchFocus: ['Silicon Carbide Color Centers', 'Quantum Photonics', 'Quantum Sensing', 'Integrated Quantum Devices'],
    homepage: 'https://qphitsz.github.io',
    googleScholar: 'https://scholar.google.com/citations?user=qphitsz',
    status: 'Active',
  },
];

// ============================================================
// 导入函数
// ============================================================
async function addPublication(pub: typeof publications[0]) {
  await notion.pages.create({
    parent: { database_id: PUBLICATIONS_DB },
    properties: {
      Title: {
        title: [{ text: { content: pub.title } }],
      },
      Authors: {
        rich_text: [{ text: { content: pub.authors } }],
      },
      Journal: {
        rich_text: [{ text: { content: pub.journal } }],
      },
      Year: {
        number: pub.year,
      },
      DOI: {
        rich_text: [{ text: { content: pub.doi } }],
      },
      'PDF Link': {
        url: pub.pdfLink || null,
      },
      Category: {
        multi_select: pub.category.map((c) => ({ name: c })),
      },
    },
  });
}

async function addTeamMember(member: typeof teamMembers[0]) {
  await notion.pages.create({
    parent: { database_id: TEAM_DB },
    properties: {
      Name: {
        title: [{ text: { content: member.name } }],
      },
      Role: {
        select: { name: member.role },
      },
      Email: {
        email: member.email,
      },
      'Join Year': {
        number: member.joinYear,
      },
      Institution: {
        rich_text: [{ text: { content: member.institution } }],
      },
      'Research Focus': {
        multi_select: member.researchFocus.map((f) => ({ name: f })),
      },
      Homepage: {
        url: member.homepage,
      },
      'Google Scholar': {
        url: member.googleScholar,
      },
      Status: {
        select: { name: member.status },
      },
    },
  });
}

async function main() {
  console.log('🚀 开始导入数据到 Notion...\n');

  // 导入论文
  console.log(`📚 导入 ${publications.length} 篇论文...`);
  for (const pub of publications) {
    try {
      await addPublication(pub);
      console.log(`  ✅ ${pub.year} | ${pub.journal} | ${pub.title.substring(0, 50)}...`);
    } catch (e: any) {
      console.error(`  ❌ 失败: ${pub.title.substring(0, 40)}... | ${e.message}`);
    }
  }

  console.log('\n👥 导入团队成员...');
  for (const member of teamMembers) {
    try {
      await addTeamMember(member);
      console.log(`  ✅ ${member.name} (${member.role})`);
    } catch (e: any) {
      console.error(`  ❌ 失败: ${member.name} | ${e.message}`);
    }
  }

  console.log('\n🎉 导入完成！');
  console.log('现在可以刷新网站查看数据。');
}

main().catch(console.error);
