import { randomUUID } from "crypto";
import { getDb } from "./db";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Profile {
  id: string;
  name: string;
  title: string;
  summary: string;
  aboutBody: string;
  researchInterests: string;
  careerInterests: string;
  keyStrengths: string;
  profileImageUrl: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  linkedin: string | null;
  github: string | null;
  otherLinkLabel: string | null;
  otherLinkUrl: string | null;
  cvDocumentId: string | null;
  updatedAt: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  city: string | null;
  country: string | null;
  startDate: string;
  endDate: string;
  fieldOfStudy: string | null;
  details: string | null;
  order: number;
  createdAt: string;
}

export interface Experience {
  id: string;
  position: string;
  organization: string;
  location: string | null;
  startDate: string;
  endDate: string;
  responsibilities: string;
  skillsUsed: string;
  order: number;
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  role: string | null;
  methods: string;
  date: string | null;
  externalUrl: string | null;
  documentId: string | null;
  order: number;
  createdAt: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string | null;
  verificationUrl: string | null;
  documentId: string | null;
  order: number;
  createdAt: string;
}

export interface Doc {
  id: string;
  title: string;
  description: string | null;
  category: string;
  fileUrl: string | null;
  externalUrl: string | null;
  fileName: string | null;
  fileType: string | null;
  fileSize: number | null;
  isPublic: boolean;
  uploadedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  caption: string | null;
  order: number;
  isPublic: boolean;
  createdAt: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  order: number;
  isVisible: boolean;
  createdAt: string;
}

export interface SiteSettings {
  id: string;
  siteTitle: string;
  metaDescription: string;
  ogImageUrl: string | null;
  primaryColorNote: string;
}

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string;
  lastLoginAt: string | null;
}

// ---------------------------------------------------------------------------
// Row -> camelCase mappers
// ---------------------------------------------------------------------------

const toProfile = (r: any): Profile => ({
  id: r.id,
  name: r.name,
  title: r.title,
  summary: r.summary,
  aboutBody: r.about_body,
  researchInterests: r.research_interests,
  careerInterests: r.career_interests,
  keyStrengths: r.key_strengths,
  profileImageUrl: r.profile_image_url,
  email: r.email,
  phone: r.phone,
  location: r.location,
  linkedin: r.linkedin,
  github: r.github,
  otherLinkLabel: r.other_link_label,
  otherLinkUrl: r.other_link_url,
  cvDocumentId: r.cv_document_id,
  updatedAt: r.updated_at,
});

const toEducation = (r: any): Education => ({
  id: r.id,
  degree: r.degree,
  institution: r.institution,
  city: r.city,
  country: r.country,
  startDate: r.start_date,
  endDate: r.end_date,
  fieldOfStudy: r.field_of_study,
  details: r.details,
  order: r.sort_order,
  createdAt: r.created_at,
});

const toExperience = (r: any): Experience => ({
  id: r.id,
  position: r.position,
  organization: r.organization,
  location: r.location,
  startDate: r.start_date,
  endDate: r.end_date,
  responsibilities: r.responsibilities,
  skillsUsed: r.skills_used,
  order: r.sort_order,
  createdAt: r.created_at,
});

const toSkill = (r: any): Skill => ({
  id: r.id,
  name: r.name,
  category: r.category,
  order: r.sort_order,
});

const toProject = (r: any): Project => ({
  id: r.id,
  title: r.title,
  description: r.description,
  role: r.role,
  methods: r.methods,
  date: r.date,
  externalUrl: r.external_url,
  documentId: r.document_id,
  order: r.sort_order,
  createdAt: r.created_at,
});

const toCertification = (r: any): Certification => ({
  id: r.id,
  title: r.title,
  issuer: r.issuer,
  date: r.date,
  verificationUrl: r.verification_url,
  documentId: r.document_id,
  order: r.sort_order,
  createdAt: r.created_at,
});

const toDoc = (r: any): Doc => ({
  id: r.id,
  title: r.title,
  description: r.description,
  category: r.category,
  fileUrl: r.file_url,
  externalUrl: r.external_url,
  fileName: r.file_name,
  fileType: r.file_type,
  fileSize: r.file_size,
  isPublic: !!r.is_public,
  uploadedAt: r.uploaded_at,
});

const toMessage = (r: any): ContactMessage => ({
  id: r.id,
  name: r.name,
  email: r.email,
  subject: r.subject,
  message: r.message,
  isRead: !!r.is_read,
  createdAt: r.created_at,
});

const toGalleryItem = (r: any): GalleryItem => ({
  id: r.id, title: r.title, imageUrl: r.image_url, caption: r.caption, order: r.sort_order, isPublic: !!r.is_public, createdAt: r.created_at,
});

const toNavigationItem = (r: any): NavigationItem => ({
  id: r.id, label: r.label, href: r.href, order: r.sort_order, isVisible: !!r.is_visible, createdAt: r.created_at,
});

const toSettings = (r: any): SiteSettings => ({
  id: r.id,
  siteTitle: r.site_title,
  metaDescription: r.meta_description,
  ogImageUrl: r.og_image_url,
  primaryColorNote: r.primary_color_note,
});

const toAdminUser = (r: any): AdminUser => ({
  id: r.id,
  email: r.email,
  passwordHash: r.password_hash,
  name: r.name,
  createdAt: r.created_at,
  lastLoginAt: r.last_login_at,
});

// ---------------------------------------------------------------------------
// Profile
// ---------------------------------------------------------------------------

export function getProfile(): Profile {
  const db = getDb();
  const row = db.prepare(`SELECT * FROM profile WHERE id = 'singleton'`).get();
  return toProfile(row);
}

export function updateProfile(data: Partial<Omit<Profile, "id" | "updatedAt">>): Profile {
  const db = getDb();
  const current = getProfile();
  const merged = { ...current, ...data };
  db.prepare(
    `UPDATE profile SET name=?, title=?, summary=?, about_body=?, research_interests=?, career_interests=?, key_strengths=?, profile_image_url=?, email=?, phone=?, location=?, linkedin=?, github=?, other_link_label=?, other_link_url=?, cv_document_id=?, updated_at=datetime('now') WHERE id='singleton'`
  ).run(
    merged.name, merged.title, merged.summary, merged.aboutBody, merged.researchInterests,
    merged.careerInterests, merged.keyStrengths, merged.profileImageUrl, merged.email,
    merged.phone, merged.location, merged.linkedin, merged.github, merged.otherLinkLabel,
    merged.otherLinkUrl, merged.cvDocumentId
  );
  return getProfile();
}

// ---------------------------------------------------------------------------
// Education
// ---------------------------------------------------------------------------

export function listEducation(): Education[] {
  const db = getDb();
  return (db.prepare(`SELECT * FROM education ORDER BY sort_order ASC, created_at DESC`).all() as any[]).map(toEducation);
}

export function createEducation(data: Omit<Education, "id" | "createdAt">): Education {
  const db = getDb();
  const id = randomUUID();
  db.prepare(
    `INSERT INTO education (id, degree, institution, city, country, start_date, end_date, field_of_study, details, sort_order) VALUES (?,?,?,?,?,?,?,?,?,?)`
  ).run(id, data.degree, data.institution, data.city, data.country, data.startDate, data.endDate, data.fieldOfStudy, data.details, data.order);
  return toEducation(db.prepare(`SELECT * FROM education WHERE id=?`).get(id));
}

export function updateEducation(id: string, data: Partial<Omit<Education, "id" | "createdAt">>): Education | null {
  const db = getDb();
  const existing = db.prepare(`SELECT * FROM education WHERE id=?`).get(id);
  if (!existing) return null;
  const merged = { ...toEducation(existing), ...data };
  db.prepare(
    `UPDATE education SET degree=?, institution=?, city=?, country=?, start_date=?, end_date=?, field_of_study=?, details=?, sort_order=? WHERE id=?`
  ).run(merged.degree, merged.institution, merged.city, merged.country, merged.startDate, merged.endDate, merged.fieldOfStudy, merged.details, merged.order, id);
  return toEducation(db.prepare(`SELECT * FROM education WHERE id=?`).get(id));
}

export function deleteEducation(id: string): boolean {
  const db = getDb();
  const r = db.prepare(`DELETE FROM education WHERE id=?`).run(id);
  return r.changes > 0;
}

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

export function listExperience(): Experience[] {
  const db = getDb();
  return (db.prepare(`SELECT * FROM experience ORDER BY sort_order ASC, created_at DESC`).all() as any[]).map(toExperience);
}

export function createExperience(data: Omit<Experience, "id" | "createdAt">): Experience {
  const db = getDb();
  const id = randomUUID();
  db.prepare(
    `INSERT INTO experience (id, position, organization, location, start_date, end_date, responsibilities, skills_used, sort_order) VALUES (?,?,?,?,?,?,?,?,?)`
  ).run(id, data.position, data.organization, data.location, data.startDate, data.endDate, data.responsibilities, data.skillsUsed, data.order);
  return toExperience(db.prepare(`SELECT * FROM experience WHERE id=?`).get(id));
}

export function updateExperience(id: string, data: Partial<Omit<Experience, "id" | "createdAt">>): Experience | null {
  const db = getDb();
  const existing = db.prepare(`SELECT * FROM experience WHERE id=?`).get(id);
  if (!existing) return null;
  const merged = { ...toExperience(existing), ...data };
  db.prepare(
    `UPDATE experience SET position=?, organization=?, location=?, start_date=?, end_date=?, responsibilities=?, skills_used=?, sort_order=? WHERE id=?`
  ).run(merged.position, merged.organization, merged.location, merged.startDate, merged.endDate, merged.responsibilities, merged.skillsUsed, merged.order, id);
  return toExperience(db.prepare(`SELECT * FROM experience WHERE id=?`).get(id));
}

export function deleteExperience(id: string): boolean {
  const db = getDb();
  const r = db.prepare(`DELETE FROM experience WHERE id=?`).run(id);
  return r.changes > 0;
}

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

export function listSkills(): Skill[] {
  const db = getDb();
  return (db.prepare(`SELECT * FROM skills ORDER BY category ASC, sort_order ASC`).all() as any[]).map(toSkill);
}

export function createSkill(data: Omit<Skill, "id">): Skill {
  const db = getDb();
  const id = randomUUID();
  db.prepare(`INSERT INTO skills (id, name, category, sort_order) VALUES (?,?,?,?)`).run(id, data.name, data.category, data.order);
  return toSkill(db.prepare(`SELECT * FROM skills WHERE id=?`).get(id));
}

export function updateSkill(id: string, data: Partial<Omit<Skill, "id">>): Skill | null {
  const db = getDb();
  const existing = db.prepare(`SELECT * FROM skills WHERE id=?`).get(id);
  if (!existing) return null;
  const merged = { ...toSkill(existing), ...data };
  db.prepare(`UPDATE skills SET name=?, category=?, sort_order=? WHERE id=?`).run(merged.name, merged.category, merged.order, id);
  return toSkill(db.prepare(`SELECT * FROM skills WHERE id=?`).get(id));
}

export function deleteSkill(id: string): boolean {
  const db = getDb();
  const r = db.prepare(`DELETE FROM skills WHERE id=?`).run(id);
  return r.changes > 0;
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export function listProjects(): Project[] {
  const db = getDb();
  return (db.prepare(`SELECT * FROM projects ORDER BY sort_order ASC, created_at DESC`).all() as any[]).map(toProject);
}

export function createProject(data: Omit<Project, "id" | "createdAt">): Project {
  const db = getDb();
  const id = randomUUID();
  db.prepare(
    `INSERT INTO projects (id, title, description, role, methods, date, external_url, document_id, sort_order) VALUES (?,?,?,?,?,?,?,?,?)`
  ).run(id, data.title, data.description, data.role, data.methods, data.date, data.externalUrl, data.documentId, data.order);
  return toProject(db.prepare(`SELECT * FROM projects WHERE id=?`).get(id));
}

export function updateProject(id: string, data: Partial<Omit<Project, "id" | "createdAt">>): Project | null {
  const db = getDb();
  const existing = db.prepare(`SELECT * FROM projects WHERE id=?`).get(id);
  if (!existing) return null;
  const merged = { ...toProject(existing), ...data };
  db.prepare(
    `UPDATE projects SET title=?, description=?, role=?, methods=?, date=?, external_url=?, document_id=?, sort_order=? WHERE id=?`
  ).run(merged.title, merged.description, merged.role, merged.methods, merged.date, merged.externalUrl, merged.documentId, merged.order, id);
  return toProject(db.prepare(`SELECT * FROM projects WHERE id=?`).get(id));
}

export function deleteProject(id: string): boolean {
  const db = getDb();
  const r = db.prepare(`DELETE FROM projects WHERE id=?`).run(id);
  return r.changes > 0;
}

// ---------------------------------------------------------------------------
// Certifications
// ---------------------------------------------------------------------------

export function listCertifications(): Certification[] {
  const db = getDb();
  return (db.prepare(`SELECT * FROM certifications ORDER BY sort_order ASC, created_at DESC`).all() as any[]).map(toCertification);
}

export function createCertification(data: Omit<Certification, "id" | "createdAt">): Certification {
  const db = getDb();
  const id = randomUUID();
  db.prepare(
    `INSERT INTO certifications (id, title, issuer, date, verification_url, document_id, sort_order) VALUES (?,?,?,?,?,?,?)`
  ).run(id, data.title, data.issuer, data.date, data.verificationUrl, data.documentId, data.order);
  return toCertification(db.prepare(`SELECT * FROM certifications WHERE id=?`).get(id));
}

export function updateCertification(id: string, data: Partial<Omit<Certification, "id" | "createdAt">>): Certification | null {
  const db = getDb();
  const existing = db.prepare(`SELECT * FROM certifications WHERE id=?`).get(id);
  if (!existing) return null;
  const merged = { ...toCertification(existing), ...data };
  db.prepare(
    `UPDATE certifications SET title=?, issuer=?, date=?, verification_url=?, document_id=?, sort_order=? WHERE id=?`
  ).run(merged.title, merged.issuer, merged.date, merged.verificationUrl, merged.documentId, merged.order, id);
  return toCertification(db.prepare(`SELECT * FROM certifications WHERE id=?`).get(id));
}

export function deleteCertification(id: string): boolean {
  const db = getDb();
  const r = db.prepare(`DELETE FROM certifications WHERE id=?`).run(id);
  return r.changes > 0;
}

// ---------------------------------------------------------------------------
// Documents
// ---------------------------------------------------------------------------

export function listDocuments(opts: { publicOnly?: boolean } = {}): Doc[] {
  const db = getDb();
  const rows = opts.publicOnly
    ? db.prepare(`SELECT * FROM documents WHERE is_public=1 ORDER BY uploaded_at DESC`).all()
    : db.prepare(`SELECT * FROM documents ORDER BY uploaded_at DESC`).all();
  return (rows as any[]).map(toDoc);
}

export function getDocument(id: string): Doc | null {
  const db = getDb();
  const row = db.prepare(`SELECT * FROM documents WHERE id=?`).get(id);
  return row ? toDoc(row) : null;
}

export function createDocument(data: Omit<Doc, "id" | "uploadedAt">): Doc {
  const db = getDb();
  const id = randomUUID();
  db.prepare(
    `INSERT INTO documents (id, title, description, category, file_url, external_url, file_name, file_type, file_size, is_public) VALUES (?,?,?,?,?,?,?,?,?,?)`
  ).run(id, data.title, data.description, data.category, data.fileUrl, data.externalUrl, data.fileName, data.fileType, data.fileSize, data.isPublic ? 1 : 0);
  return toDoc(db.prepare(`SELECT * FROM documents WHERE id=?`).get(id));
}

export function updateDocument(id: string, data: Partial<Omit<Doc, "id" | "uploadedAt">>): Doc | null {
  const db = getDb();
  const existing = db.prepare(`SELECT * FROM documents WHERE id=?`).get(id);
  if (!existing) return null;
  const merged = { ...toDoc(existing), ...data };
  db.prepare(
    `UPDATE documents SET title=?, description=?, category=?, file_url=?, external_url=?, file_name=?, file_type=?, file_size=?, is_public=? WHERE id=?`
  ).run(merged.title, merged.description, merged.category, merged.fileUrl, merged.externalUrl, merged.fileName, merged.fileType, merged.fileSize, merged.isPublic ? 1 : 0, id);
  return toDoc(db.prepare(`SELECT * FROM documents WHERE id=?`).get(id));
}

export function deleteDocument(id: string): boolean {
  const db = getDb();
  const r = db.prepare(`DELETE FROM documents WHERE id=?`).run(id);
  return r.changes > 0;
}

// ---------------------------------------------------------------------------
// Contact messages
// ---------------------------------------------------------------------------

export function listMessages(): ContactMessage[] {
  const db = getDb();
  return (db.prepare(`SELECT * FROM contact_messages ORDER BY created_at DESC`).all() as any[]).map(toMessage);
}

export function createMessage(data: Omit<ContactMessage, "id" | "createdAt" | "isRead">): ContactMessage {
  const db = getDb();
  const id = randomUUID();
  db.prepare(`INSERT INTO contact_messages (id, name, email, subject, message) VALUES (?,?,?,?,?)`).run(id, data.name, data.email, data.subject, data.message);
  return toMessage(db.prepare(`SELECT * FROM contact_messages WHERE id=?`).get(id));
}

export function markMessageRead(id: string, isRead: boolean): boolean {
  const db = getDb();
  const r = db.prepare(`UPDATE contact_messages SET is_read=? WHERE id=?`).run(isRead ? 1 : 0, id);
  return r.changes > 0;
}

export function deleteMessage(id: string): boolean {
  const db = getDb();
  const r = db.prepare(`DELETE FROM contact_messages WHERE id=?`).run(id);
  return r.changes > 0;
}


// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------

export function listGalleryItems(opts: { publicOnly?: boolean } = {}): GalleryItem[] {
  const db = getDb();
  const rows = opts.publicOnly
    ? db.prepare(`SELECT * FROM gallery_items WHERE is_public=1 ORDER BY sort_order ASC, created_at DESC`).all()
    : db.prepare(`SELECT * FROM gallery_items ORDER BY sort_order ASC, created_at DESC`).all();
  return (rows as any[]).map(toGalleryItem);
}

export function createGalleryItem(data: Omit<GalleryItem, "id" | "createdAt">): GalleryItem {
  const db = getDb(); const id = randomUUID();
  db.prepare(`INSERT INTO gallery_items (id,title,image_url,caption,sort_order,is_public) VALUES (?,?,?,?,?,?)`).run(id,data.title,data.imageUrl,data.caption,data.order,data.isPublic?1:0);
  return toGalleryItem(db.prepare(`SELECT * FROM gallery_items WHERE id=?`).get(id));
}

export function updateGalleryItem(id: string, data: Partial<Omit<GalleryItem, "id" | "createdAt">>): GalleryItem | null {
  const db = getDb(); const existing = db.prepare(`SELECT * FROM gallery_items WHERE id=?`).get(id); if (!existing) return null;
  const merged = { ...toGalleryItem(existing), ...data };
  db.prepare(`UPDATE gallery_items SET title=?, image_url=?, caption=?, sort_order=?, is_public=? WHERE id=?`).run(merged.title,merged.imageUrl,merged.caption,merged.order,merged.isPublic?1:0,id);
  return toGalleryItem(db.prepare(`SELECT * FROM gallery_items WHERE id=?`).get(id));
}

export function deleteGalleryItem(id: string): boolean { return getDb().prepare(`DELETE FROM gallery_items WHERE id=?`).run(id).changes > 0; }

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export function listNavigationItems(opts: { visibleOnly?: boolean } = {}): NavigationItem[] {
  const db = getDb();
  const rows = opts.visibleOnly
    ? db.prepare(`SELECT * FROM navigation_items WHERE is_visible=1 ORDER BY sort_order ASC, created_at ASC`).all()
    : db.prepare(`SELECT * FROM navigation_items ORDER BY sort_order ASC, created_at ASC`).all();
  return (rows as any[]).map(toNavigationItem);
}

export function createNavigationItem(data: Omit<NavigationItem, "id" | "createdAt">): NavigationItem {
  const db = getDb(); const id = randomUUID();
  db.prepare(`INSERT INTO navigation_items (id,label,href,sort_order,is_visible) VALUES (?,?,?,?,?)`).run(id,data.label,data.href,data.order,data.isVisible?1:0);
  return toNavigationItem(db.prepare(`SELECT * FROM navigation_items WHERE id=?`).get(id));
}

export function updateNavigationItem(id: string, data: Partial<Omit<NavigationItem, "id" | "createdAt">>): NavigationItem | null {
  const db = getDb(); const existing = db.prepare(`SELECT * FROM navigation_items WHERE id=?`).get(id); if (!existing) return null;
  const merged = { ...toNavigationItem(existing), ...data };
  db.prepare(`UPDATE navigation_items SET label=?, href=?, sort_order=?, is_visible=? WHERE id=?`).run(merged.label,merged.href,merged.order,merged.isVisible?1:0,id);
  return toNavigationItem(db.prepare(`SELECT * FROM navigation_items WHERE id=?`).get(id));
}

export function deleteNavigationItem(id: string): boolean { return getDb().prepare(`DELETE FROM navigation_items WHERE id=?`).run(id).changes > 0; }

// ---------------------------------------------------------------------------
// Site settings
// ---------------------------------------------------------------------------

export function getSettings(): SiteSettings {
  const db = getDb();
  return toSettings(db.prepare(`SELECT * FROM site_settings WHERE id='singleton'`).get());
}

export function updateSettings(data: Partial<Omit<SiteSettings, "id">>): SiteSettings {
  const db = getDb();
  const current = getSettings();
  const merged = { ...current, ...data };
  db.prepare(`UPDATE site_settings SET site_title=?, meta_description=?, og_image_url=?, primary_color_note=? WHERE id='singleton'`).run(
    merged.siteTitle, merged.metaDescription, merged.ogImageUrl, merged.primaryColorNote
  );
  return getSettings();
}

// ---------------------------------------------------------------------------
// Admin users
// ---------------------------------------------------------------------------

export function countAdmins(): number {
  const db = getDb();
  const row = db.prepare(`SELECT COUNT(*) as c FROM admin_users`).get() as any;
  return row.c as number;
}

export function findAdminByEmail(email: string): AdminUser | null {
  const db = getDb();
  const row = db.prepare(`SELECT * FROM admin_users WHERE email=?`).get(email.toLowerCase().trim());
  return row ? toAdminUser(row) : null;
}

export function findAdminById(id: string): AdminUser | null {
  const db = getDb();
  const row = db.prepare(`SELECT * FROM admin_users WHERE id=?`).get(id);
  return row ? toAdminUser(row) : null;
}

export function createAdmin(email: string, passwordHash: string, name: string): AdminUser {
  const db = getDb();
  const id = randomUUID();
  db.prepare(`INSERT INTO admin_users (id, email, password_hash, name) VALUES (?,?,?,?)`).run(id, email.toLowerCase().trim(), passwordHash, name);
  return toAdminUser(db.prepare(`SELECT * FROM admin_users WHERE id=?`).get(id));
}

export function touchAdminLogin(id: string): void {
  const db = getDb();
  db.prepare(`UPDATE admin_users SET last_login_at=datetime('now') WHERE id=?`).run(id);
}
