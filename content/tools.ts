import { liveSite } from "@/content/site";

/**
 * The free calculators decodingIT publishes.
 *
 * Names and one-line descriptions are transcribed from the "calculators our
 * own engineers use" section. The calculators themselves are live
 * applications on decodingit.com, so each entry links there.
 */
export interface Tool {
  name: string;
  description: string;
  href: string;
  /** The live site flags the CCTV calculator as new. */
  isNew?: boolean;
}

export const tools: Tool[] = [
  {
    name: "CCTV NVR Storage Calculator",
    description: "Cameras, codec and retention to disks and bandwidth",
    href: `${liveSite}/tools/cctv-nvr-storage-calculator`,
    isNew: true,
  },
  {
    name: "Backup Storage Calculator",
    description: "Retention and change rate to repository size",
    href: `${liveSite}/tools/backup-storage-calculator`,
  },
  {
    name: "M365 Licence Cost Estimator",
    description: "Compare plan mixes before you commit",
    href: `${liveSite}/tools/m365-cost-estimator`,
  },
  {
    name: "Downtime Cost Calculator",
    description: "What an hour offline actually costs you",
    href: `${liveSite}/tools/downtime-cost-calculator`,
  },
  {
    name: "IP Subnet Calculator",
    description: "Ranges, masks and usable hosts",
    href: `${liveSite}/tools/subnet-calculator`,
  },
  {
    name: "Windows Server Licence Calculator",
    description: "Core licensing without the guesswork",
    href: `${liveSite}/tools/windows-server-license-calculator`,
  },
];
