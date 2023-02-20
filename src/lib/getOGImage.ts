import { siteConfig } from "@/config/siteConfig";

export const getPostOGImage = (socialImage: string | undefined) => {
  if (!socialImage) {
    return siteConfig.socialImage;
  }
  if (socialImage.startsWith("http")) {
    return socialImage;
  }
  return siteConfig.fqdn + socialImage;
};
