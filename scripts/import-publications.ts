/**
 * Script to import publications from CSV to Notion
 *
 * Usage:
 * 1. Prepare a CSV file with columns: title, doi, journal, year, authors, pdfLink, category
 * 2. Update the CSV_FILE_PATH below
 * 3. Run: npx tsx scripts/import-publications.ts
 *
 * Note: You'll need to install tsx: npm install -D tsx
 */

import { Client } from '@notionhq/client';
import * as fs from 'fs';
import * as path from 'path';

// Configuration
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_PUBLICATIONS = process.env.NOTION_DATABASE_PUBLICATIONS;
const CSV_FILE_PATH = path.join(__dirname, '../data/publications.csv'); // Update this path

// Initialize Notion client
const notion = new Client({
  auth: NOTION_TOKEN,
});

interface Publication {
  title: string;
  doi: string;
  journal: string;
  year: number;
  authors: string;
  pdfLink?: string;
  category?: string[];
}

/**
 * Parse CSV file to array of publications
 */
function parseCSV(filePath: string): Publication[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());

  const publications: Publication[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(',').map(v => v.trim());
    const pub: any = {};

    headers.forEach((header, index) => {
      pub[header] = values[index];
    });

    publications.push({
      title: pub.title || '',
      doi: pub.doi || '',
      journal: pub.journal || '',
      year: parseInt(pub.year) || 0,
      authors: pub.authors || '',
      pdfLink: pub.pdfLink || undefined,
      category: pub.category ? pub.category.split(';').map((c: string) => c.trim()) : [],
    });
  }

  return publications;
}

/**
 * Create a publication entry in Notion
 */
async function createPublication(pub: Publication) {
  try {
    await notion.pages.create({
      parent: {
        database_id: NOTION_DATABASE_PUBLICATIONS!,
      },
      properties: {
        Title: {
          title: [
            {
              text: {
                content: pub.title,
              },
            },
          ],
        },
        DOI: {
          rich_text: [
            {
              text: {
                content: pub.doi,
              },
            },
          ],
        },
        Journal: {
          rich_text: [
            {
              text: {
                content: pub.journal,
              },
            },
          ],
        },
        Year: {
          number: pub.year,
        },
        Authors: {
          rich_text: [
            {
              text: {
                content: pub.authors,
              },
            },
          ],
        },
        ...(pub.pdfLink && {
          'PDF Link': {
            url: pub.pdfLink,
          },
        }),
        ...(pub.category && pub.category.length > 0 && {
          Category: {
            multi_select: pub.category.map(c => ({ name: c })),
          },
        }),
      },
    });

    console.log(`✓ Created: ${pub.title}`);
  } catch (error) {
    console.error(`✗ Failed to create: ${pub.title}`);
    console.error(error);
  }
}

/**
 * Main function
 */
async function main() {
  console.log('Starting publication import...\n');

  // Validate environment variables
  if (!NOTION_TOKEN || !NOTION_DATABASE_PUBLICATIONS) {
    console.error('Error: Missing environment variables');
    console.error('Please ensure NOTION_TOKEN and NOTION_DATABASE_PUBLICATIONS are set in .env.local');
    process.exit(1);
  }

  // Check if CSV file exists
  if (!fs.existsSync(CSV_FILE_PATH)) {
    console.error(`Error: CSV file not found at ${CSV_FILE_PATH}`);
    console.error('Please update CSV_FILE_PATH in the script');
    process.exit(1);
  }

  // Parse CSV
  console.log(`Reading publications from: ${CSV_FILE_PATH}`);
  const publications = parseCSV(CSV_FILE_PATH);
  console.log(`Found ${publications.length} publications\n`);

  // Import publications (with rate limiting)
  for (let i = 0; i < publications.length; i++) {
    await createPublication(publications[i]);

    // Rate limiting: wait 350ms between requests (Notion API limit: ~3 requests/second)
    if (i < publications.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 350));
    }
  }

  console.log('\n✓ Import completed!');
}

// Run the script
main().catch(console.error);
