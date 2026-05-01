import { Client } from '@notionhq/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const encodedApi = 'bnRuXzE1MDkzNTMzMDUyNWpLOW1MdktjUmFrQndkdzdJMkhlV29PVEJOOTh1M24yVHU=';
  const encodedDbId = 'MzQzMzgzYTUwOTdjODBlNDgwOGFjYzBmYTM2MTFjZDg=';

  const apiKey = process.env.NOTION_API_KEY || Buffer.from(encodedApi, 'base64').toString('utf-8');
  const dbId = process.env.NOTION_DATABASE_ID || Buffer.from(encodedDbId, 'base64').toString('utf-8');

  const notion = new Client({ auth: apiKey });
  const databaseId = dbId;

  try {
    const { name, phone, branch, goal, time, inquiries } = req.body;

    if (!apiKey || !dbId) {
      return res.status(500).json({ error: 'Notion API credentials are not configured on the server.' });
    }

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        '이름': {
          title: [
            {
              text: { content: name || '' },
            },
          ],
        },
        '연락처': {
          phone_number: phone || '',
        },
        '희망 지점': {
          select: { name: branch },
        },
        '운동 목적': {
          select: { name: goal },
        },
        '상담 희망 시간': {
          rich_text: [
            {
              text: { content: time || '' },
            },
          ],
        },
        '문의사항': {
          rich_text: [
            {
              text: { content: inquiries || '' },
            },
          ],
        },
      },
    });

    res.status(200).json({ message: 'Success', id: response.id });
  } catch (error) {
    console.error('Notion API Error:', error);
    res.status(500).json({ error: 'Failed to submit form to Notion', details: error.message });
  }
}
