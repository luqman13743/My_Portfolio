import { NextResponse } from "next/server";
import { requireAdminOrResponse, isResponse } from "@/lib/api-helpers";
import { listEducation, listExperience, listSkills, listProjects, listCertifications, listDocuments, listMessages } from "@/lib/repo";

export async function GET() {
  const auth = await requireAdminOrResponse();
  if (isResponse(auth)) return auth;

  const messages = listMessages();
  return NextResponse.json({
    education: listEducation().length,
    experience: listExperience().length,
    skills: listSkills().length,
    projects: listProjects().length,
    certifications: listCertifications().length,
    documents: listDocuments().length,
    messages: messages.length,
    unreadMessages: messages.filter((m) => !m.isRead).length,
  });
}
