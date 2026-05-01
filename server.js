import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Client } from '@notionhq/client';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

app.post('/api/submit-form', async (req, res) => {
  try {
    const { name, phone, branch, goal, experience, time, inquiries } = req.body;

    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
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
          rich_text: [
            {
              text: { content: phone || '' },
            },
          ],
        },
        '희망 지점': {
          select: { name: branch },
        },
        '운동 목적': {
          select: { name: goal },
        },
        '운동 경험': {
          select: { name: experience },
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
    res.status(500).json({ error: 'Failed to submit form to Notion' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
