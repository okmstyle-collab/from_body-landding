import dotenv from 'dotenv';
import { Client } from '@notionhq/client';

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = "343383a5-097c-805d-adcb-000bebcee502";

async function checkDb() {
  try {
    const db = await notion.databases.retrieve({ database_id: databaseId });
    console.log("Database Response:");
    console.log(JSON.stringify(db, null, 2));
  } catch (err) {
    console.error(err.body || err);
  }
}
checkDb();
