import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

// ---------------------------------------------------------------------------
// Single shared SQLite connection for local/dev + small production use.
//
// MOVING TO POSTGRES: this file is the only place that needs to change.
// Replace the `better-sqlite3` calls below with a `pg` Pool and give the
// functions in src/lib/repo.ts the same shape (they already isolate all
// call sites from the raw driver). See README.md for the full checklist.
// ---------------------------------------------------------------------------

declare global {
  // eslint-disable-next-line no-var
  var __db: Database.Database | undefined;
}

function createConnection(): Database.Database {
  const dbPath = process.env.DATABASE_URL?.replace(/^file:/, "") || "./dev.db";
  const resolved = path.isAbsolute(dbPath) ? dbPath : path.join(process.cwd(), dbPath);

  const db = new Database(resolved);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  const schemaPath = path.join(process.cwd(), "src", "lib", "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");
  db.exec(schema);

  // Ensure singleton rows exist.
  db.prepare(
    `INSERT OR IGNORE INTO profile (id) VALUES ('singleton')`
  ).run();
  db.prepare(
    `INSERT OR IGNORE INTO site_settings (id) VALUES ('singleton')`
  ).run();
  const navDefaults = [
    ["nav-about", "About", "/#about", 0],
    ["nav-education", "Education", "/#education", 1],
    ["nav-experience", "Experience", "/#experience", 2],
    ["nav-research", "Research", "/#research", 3],
    ["nav-skills", "Skills", "/#skills", 4],
    ["nav-certifications", "Certifications", "/#certifications", 5],
    ["nav-projects", "Projects", "/#projects", 6],
    ["nav-gallery", "Gallery", "/#gallery", 7],
    ["nav-documents", "Documents", "/#documents", 8],
    ["nav-contact", "Contact", "/#contact", 9],
  ];
  const insertNav = db.prepare(`INSERT OR IGNORE INTO navigation_items (id, label, href, sort_order, is_visible) VALUES (?,?,?,?,1)`);
  for (const item of navDefaults) insertNav.run(...item);

  return db;
}

export function getDb(): Database.Database {
  if (!global.__db) {
    global.__db = createConnection();
  }
  return global.__db;
}
