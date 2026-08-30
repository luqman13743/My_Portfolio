import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";

// ---------------------------------------------------------------------------
// Storage abstraction.
//
// Local disk is used by default (public/uploads) and works immediately with
// zero configuration. It is NOT durable on most hosting platforms (files are
// wiped on redeploy/restart on Vercel, most containers, etc.) — fine for
// local use and small self-hosted deployments with a persistent disk.
//
// For real production hosting, set the STORAGE_S3_* variables in .env (see
// .env.example) and swap the two functions below for calls to an S3-
// compatible SDK (AWS S3, Cloudflare R2, Backblaze B2 all work the same
// way). The rest of the app only calls uploadFile()/deleteFile() and never
// touches the filesystem directly, so that's the only file to change.
// ---------------------------------------------------------------------------

const ALLOWED_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15 MB

export interface UploadResult {
  url: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}

export class UploadError extends Error {}

export async function uploadFile(file: File): Promise<UploadResult> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new UploadError(
      "That file type isn't allowed. Upload a PDF, JPG, PNG, WEBP, or GIF."
    );
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new UploadError("File is too large. Maximum size is 15 MB.");
  }

  const usingS3 = !!process.env.STORAGE_S3_BUCKET;
  const ext = safeExtension(file.name, file.type);
  const key = `${randomUUID()}${ext}`;

  if (usingS3) {
    // Swap this block for your S3-compatible SDK call, e.g.:
    // const client = new S3Client({ endpoint: process.env.STORAGE_S3_ENDPOINT, ... });
    // await client.send(new PutObjectCommand({ Bucket, Key: key, Body: buffer, ContentType: file.type }));
    // return { url: `${process.env.STORAGE_S3_PUBLIC_URL}/${key}`, ... };
    throw new UploadError(
      "S3 storage is configured but not wired up yet — implement the S3 branch in src/lib/storage.ts."
    );
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(uploadsDir, key), buffer);

  return {
    url: `/uploads/${key}`,
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size,
  };
}

export async function deleteFile(url: string | null): Promise<void> {
  if (!url || !url.startsWith("/uploads/")) return;
  const filePath = path.join(process.cwd(), "public", url);
  try {
    await fs.unlink(filePath);
  } catch {
    // File already gone / never existed locally (e.g. S3-hosted) — ignore.
  }
}

function safeExtension(fileName: string, mimeType: string): string {
  const known: Record<string, string> = {
    "application/pdf": ".pdf",
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
  };
  return known[mimeType] || path.extname(fileName).slice(0, 8) || "";
}
