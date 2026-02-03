import fs from 'fs';
import path from 'path';
import axios from 'axios';

// We will use 'offset' to skip what we already have
const DOWNLOAD_DIR = path.join(process.cwd(), 'public/assets');
if (!fs.existsSync(DOWNLOAD_DIR)) fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function downloadFile(url, slug) {
  const ext = url.split('.').pop().split(/\#|\?/)[0] || 'jpg';
  const fileName = `${slug}.${ext}`;
  const filePath = path.join(DOWNLOAD_DIR, fileName);

  if (fs.existsSync(filePath)) {
    // console.log(`   ⏭️  Skipping existing: ${fileName}`);
    return 'skipped'; 
  }

  try {
    const response = await axios({
      url, method: 'GET', responseType: 'stream',
      headers: { 'User-Agent': 'Mozilla/5.0 Chrome/119.0.0.0' }
    });
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);
    return new Promise((resolve) => {
      writer.on('finish', () => resolve('downloaded'));
      writer.on('error', () => resolve('error'));
    });
  } catch (err) {
    return 'error';
  }
}

async function runBatch(endpoint, offset = 0) {
  console.log(`📡 Fetching batch starting at offset: ${offset}...`);
  try {
    const { data } = await axios.get(endpoint, {
      params: { per_page: 10, offset: offset, _embed: 1 },
      headers: { 'User-Agent': 'Mozilla/5.0 Chrome/119.0.0.0' }
    });

    if (data.length === 0) return false; // Stop if no more data

    for (const item of data) {
      let mediaUrl = item._embedded?.['wp:featuredmedia']?.[0]?.source_url;
      if (!mediaUrl) {
        const imgMatch = item.content?.rendered?.match(/<img[^>]+src="([^">]+)"/);
        mediaUrl = imgMatch ? imgMatch[1] : null;
      }

      if (mediaUrl) {
        const result = await downloadFile(mediaUrl, item.slug);
        if (result === 'downloaded') console.log(`   ✅ Saved: ${item.slug}`);
      }
      await sleep(300); // Politeness delay
    }
    return true; // Keep going
  } catch (err) {
    console.error(`   ❌ Batch failed at offset ${offset}: ${err.message}`);
    return false;
  }
}

async function main() {
  const target = 'https://danubeproperties.com/wp-json/wp/v2/posts'; // Using posts since pages 500s
  let currentOffset = 0;
  const batchSize = 10;

  console.log("🚀 STARTING PERSISTENT SYNC...");
  
  // We will run until we reach approximately the 225 items we found
  while (currentOffset < 250) { 
    const hasMore = await runBatch(target, currentOffset);
    if (!hasMore) break;
    currentOffset += batchSize;
    console.log(`--- Finished batch. Moving to offset ${currentOffset} ---`);
    await sleep(2000); // Wait 2 seconds between batches to avoid 500 errors
  }

  console.log("\n✨ Done! You now have a massive library of assets in /public/assets");
}

main();