export interface ProjectConfig {
  /** Display name used in emails and response messages. */
  name: string;
  /** Relative or absolute path to the brochure PDF that is emailed to leads. */
  brochurePath: string;
  /** Optional override for internal lead-notification recipient. */
  internalNotifyEmail?: string;
}

/**
 * To add a new project: add one entry here and drop the brochure PDF in /server/assets/.
 * No other files need to change.
 */
const registry: Record<string, ProjectConfig> = {
  aurora: {
    name: "Code Name: The Aurora, Luxury Residences",
    brochurePath: "./assets/aurora-brochure.pdf",
  },
};

export function getProject(rawName: string): ProjectConfig {
  const key = rawName.toLowerCase();
  // The site sends full display names, e.g. "Code Name: The Aurora, Luxury Residences".
  const match = registry[key] ?? Object.entries(registry).find(([k]) => key.includes(k))?.[1];
  return (
    match ?? {
      name: rawName,
      brochurePath: `./assets/${key}-brochure.pdf`,
    }
  );
}

export function knownProjectNames(): string[] {
  return Object.values(registry).map((p) => p.name);
}
