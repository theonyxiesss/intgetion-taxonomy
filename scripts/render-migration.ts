import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { renderSkillsMigration } from "../src/db/skill-catalog";

await writeFile(
  join(import.meta.dirname, "..", "migrations", "0003_skills.sql"),
  renderSkillsMigration(),
);
console.log("migrations/0003_skills.sql rendered");
