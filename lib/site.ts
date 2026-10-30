/** The one place the canonical home of this site is written down. Everything
 *  that has to know where the original lives — canonical tags, the clone
 *  notice, the hotlink guard — reads it from here. */
export const SITE_URL = "https://neeraj-kumar-portfolio-eight.vercel.app";

export const SITE_HOST = new URL(SITE_URL).host;

/** Hosts allowed to render the site and to load its images. Preview deploys of
 *  this project are included; add a custom domain here when you buy one. */
export const ALLOWED_HOSTS = [
  SITE_HOST,
  "localhost",
  "127.0.0.1",
];

export const isOwnHost = (host: string | null | undefined) => {
  if (!host) return false;
  const bare = host.split(":")[0].toLowerCase();
  if (ALLOWED_HOSTS.some((h) => h.split(":")[0] === bare)) return true;
  // Vercel preview deployments of this same project
  return /^neeraj-kumar-portfolio[a-z0-9-]*\.vercel\.app$/.test(bare);
};
