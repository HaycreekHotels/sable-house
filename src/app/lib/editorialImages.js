import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";

export function availablePublicImage(imagePath) {
  if (typeof imagePath !== "string") return null;

  // Allow images hosted on the Sabal House CDN.
  if (imagePath.startsWith("https://")) {
    try {
      const url = new URL(imagePath);

      if (url.hostname === "sabal-house.b-cdn.net") {
        return imagePath;
      }
    } catch {
      return null;
    }

    return null;
  }

  // Continue supporting existing local images.
  if (!imagePath.startsWith("/images/")) return null;

  const relative = path.posix.normalize(imagePath).slice(1);

  if (!relative.startsWith("images/") || relative.includes("..")) {
    return null;
  }

  const absolute = path.join(process.cwd(), "public", relative);

  return existsSync(absolute) ? imagePath : null;
}
