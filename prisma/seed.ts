// Load env vars the same way Next.js would when running standalone via tsx.
import { config } from "dotenv";
config();

import {
  updateProfile,
  listEducation,
  createEducation,
  listExperience,
  createExperience,
  listSkills,
  createSkill,
  updateSettings,
} from "../src/lib/repo";

function main() {
  // ---------- Profile ----------
  updateProfile({
    name: "Muhammad Luqman",
    title: "BS Microbiology Graduate",
    summary:
      "Motivated BS Microbiology graduate with practical laboratory experience in clinical microbiology, immunology, microbial culture, microscopy, and basic biochemical testing. Strong interest in environmental microbiology, microbial ecology, molecular biology, and research.",
    aboutBody:
      "I am a BS (Hons) Microbiology student at Kohat University of Science and Technology, with hands-on internship experience in clinical and diagnostic microbiology at the National Institute of Health, Islamabad, and Hayatabad Medical Complex, Peshawar. My lab work spans clinical chemistry, immunology and serology, microbial culture and identification, and specimen processing under aseptic conditions. I am skilled in modern digital and AI tools, and passionate about continuous learning, scientific research, and developing practical solutions through technology.",
    researchInterests: "Environmental Microbiology, Microbial Ecology, Molecular Biology",
    careerInterests:
      "Scientific research and developing practical solutions through technology, with a foundation in clinical and diagnostic microbiology.",
    keyStrengths:
      "Aseptic technique, clinical sample processing, microbial culture and identification, and a strong interest in combining laboratory science with modern digital and AI tools.",
    email: "luqman13743@gmail.com",
    phone: "+92 330 9996658",
    location: "Kohat, Pakistan",
  });

  // ---------- Education ----------
  const eduData = [
    {
      degree: "BS (Hons) in Microbiology",
      institution: "Kohat University of Science and Technology",
      city: "Kohat",
      country: "Pakistan",
      startDate: "2022-10-03",
      endDate: "2026-11-27",
      fieldOfStudy: "Microbiology",
      details: null,
      order: 0,
    },
    {
      degree: "Higher Secondary School Certificate (HSSC)",
      institution: "Oxford Science School & College, Pindi Road",
      city: "Kohat",
      country: "Pakistan",
      startDate: "2019-09-02",
      endDate: "2021-09-22",
      fieldOfStudy: "Pre-Medical",
      details: null,
      order: 1,
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "The School of Wisdom",
      city: "Kohat",
      country: "Pakistan",
      startDate: "2017-04-03",
      endDate: "2019-06-27",
      fieldOfStudy: null,
      details: null,
      order: 2,
    },
  ];
  const existingEdu = listEducation();
  for (const e of eduData) {
    const exists = existingEdu.some((x) => x.degree === e.degree && x.institution === e.institution);
    if (!exists) createEducation(e);
  }

  // ---------- Experience ----------
  const expData = [
    {
      position: "Microbiology Intern",
      organization: "National Institute of Health (NIH)",
      location: "Islamabad, Pakistan",
      startDate: "2025-08-04",
      endDate: "2025-08-29",
      responsibilities:
        "Clinical Chemistry: Assisted with clinical tests like Glucose, HbA1c, LFT and RFT using automated analyzers.\nImmunology: Assisted with HCV, HBsAg and routine serological testing using diagnostic kits.\nMicrobiology: Gained experience in specimen handling, microscopy, culture, streaking and basic microbial identification.",
      skillsUsed: "Clinical Chemistry, Immunology/Serology, Microscopy, Culture & Streaking",
      order: 0,
    },
    {
      position: "Microbiology Intern",
      organization: "Hayatabad Medical Complex (HMC)",
      location: "Peshawar, Pakistan",
      startDate: "2025-08-30",
      endDate: "2025-09-22",
      responsibilities:
        "Assisted with collection, handling, and processing of clinical specimens, including automated blood culture procedures.\nAssisted with microbial culture, streaking, inoculation, microscopy, and basic identification techniques.\nAssisted with HCV and Hepatitis B (HBsAg) screening using diagnostic kits while following aseptic and safety procedures.",
      skillsUsed: "Specimen Processing, Blood Culture, Aseptic Technique, Microbial Identification",
      order: 1,
    },
  ];
  const existingExp = listExperience();
  for (const x of expData) {
    const exists = existingExp.some(
      (e) => e.position === x.position && e.organization === x.organization && e.startDate === x.startDate
    );
    if (!exists) createExperience(x);
  }

  // ---------- Skills ----------
  const skillGroups: Record<string, string[]> = {
    "Microbiology & Laboratory Skills": [
      "Aseptic Techniques",
      "Microbial Culture & Cultivation",
      "Clinical Sample Processing",
      "Bacterial Isolation & Identification",
      "Serial Dilution",
      "Streaking & Inoculation",
      "Gram Staining",
      "Microscopy",
      "Biochemical Testing",
    ],
    "Molecular Biology": ["Basic Molecular Biology & PCR"],
    "Digital & AI Skills": ["Modern Digital Tools", "AI Tools"],
    Languages: ["Pashto (Mother tongue)", "English", "Urdu"],
  };
  const existingSkills = listSkills();
  let order = 0;
  for (const [category, names] of Object.entries(skillGroups)) {
    for (const name of names) {
      const exists = existingSkills.some((s) => s.name === name && s.category === category);
      if (!exists) createSkill({ name, category, order: order++ });
    }
  }

  // ---------- Site settings ----------
  updateSettings({
    siteTitle: "Muhammad Luqman — Microbiology",
    metaDescription:
      "Portfolio of Muhammad Luqman, BS Microbiology graduate with laboratory experience in clinical microbiology, immunology and molecular biology.",
  });

  console.log("Seed complete.");
}

main();
