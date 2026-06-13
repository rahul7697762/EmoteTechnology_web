import axios from 'axios';

const BUNNY_STORAGE_ZONE = process.env.BUNNY_STORAGE_ZONE;
const BUNNY_ACCESS_KEY = process.env.BUNNY_ACCESS_KEY;
const BUNNY_STORAGE_REGION = process.env.BUNNY_STORAGE_REGION;
const BUNNY_PULL_ZONE_URL = process.env.BUNNY_PULL_ZONE_URL;

export async function uploadToBunny(fileBuffer: Buffer, fileName: string): Promise<string> {
  if (!BUNNY_STORAGE_ZONE || !BUNNY_ACCESS_KEY || !BUNNY_PULL_ZONE_URL) {
    throw new Error('Bunny Storage configuration is missing');
  }

  // Handle region specific endpoints. If no region, use main endpoint.
  let storageEndpoint = 'storage.bunnycdn.com';
  if (BUNNY_STORAGE_REGION && BUNNY_STORAGE_REGION !== 'de') {
    storageEndpoint = `${BUNNY_STORAGE_REGION}.storage.bunnycdn.com`;
  }

  const url = `https://${storageEndpoint}/${BUNNY_STORAGE_ZONE}/${fileName}`;

  try {
    await axios.put(url, fileBuffer, {
      headers: {
        AccessKey: BUNNY_ACCESS_KEY,
        'Content-Type': 'application/octet-stream',
      },
    });

    return `https://${BUNNY_PULL_ZONE_URL}/${fileName}`;
  } catch (error) {
    console.error('Error uploading to Bunny Storage:', error);
    throw new Error('Upload to Bunny Storage failed');
  }
}
