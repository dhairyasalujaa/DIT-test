/**
 * The vendors decodingIT names on its own technology strip.
 *
 * This is the live site's list, in the live site's order — seventeen brands
 * from the "Technology we work with" marquee. It replaces a list previously
 * derived from the solution stacks, which was both shorter and ordered
 * differently. Nothing here is a partnership claim: the strip says the
 * company works with this technology, which is what the source says.
 *
 * `logo` is the file the client supplies in `public/logos/`. Until a given
 * file exists the marquee sets the vendor's name instead — the live site's
 * own pill component in its non-logo state. See
 * `components/sections/technology-strip.tsx`.
 */
export interface Vendor {
  name: string;
  /** Filename inside public/logos/. */
  logo: string;
}

export const vendors: Vendor[] = [
  { name: "Microsoft", logo: "microsoft.svg" },
  { name: "HPE", logo: "hpe.svg" },
  { name: "Dell", logo: "dell.svg" },
  { name: "Cisco", logo: "cisco.svg" },
  { name: "Fortinet", logo: "fortinet.svg" },
  { name: "Trend Micro", logo: "trend-micro.svg" },
  { name: "Huawei", logo: "huawei.svg" },
  { name: "Sangfor", logo: "sangfor.svg" },
  { name: "APC by Schneider Electric", logo: "apc.svg" },
  { name: "Vertiv", logo: "vertiv.svg" },
  { name: "Forcepoint", logo: "forcepoint.svg" },
  { name: "Veeam", logo: "veeam.svg" },
  { name: "Suprema", logo: "suprema.svg" },
  { name: "Exagrid", logo: "exagrid.svg" },
  { name: "Nutanix", logo: "nutanix.svg" },
  { name: "Omnissa", logo: "omnissa.svg" },
  { name: "Citrix", logo: "citrix.svg" },
];
