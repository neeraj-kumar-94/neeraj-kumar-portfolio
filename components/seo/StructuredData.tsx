import { profile, projects, skillGroups } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

/** Machine-readable facts about who this is and what the work is.
 *
 *  Search engines use it for rich results, and the answer engines people now
 *  ask for recommendations read it to decide what a site is about. Everything
 *  here mirrors what the page already says: no claims that are not on screen. */
export default function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: profile.name,
        jobTitle: profile.role,
        description: profile.tagline,
        url: SITE_URL,
        image: `${SITE_URL}/og.jpg`,
        email: `mailto:${profile.email}`,
        telephone: profile.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Shamli",
          addressRegion: "Uttar Pradesh",
          addressCountry: "IN",
        },
        sameAs: [profile.socials.github, profile.socials.linkedin],
        knowsAbout: skillGroups.flatMap((group) => group.skills),
        worksFor: { "@type": "Organization", name: "Softles" },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: `${profile.name} — ${profile.role}`,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#work`,
        name: "Selected work",
        itemListElement: projects.map((project, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "WebSite",
            name: project.title,
            url: project.liveUrl,
            description: project.result,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // The payload is built from our own data file, not from user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
