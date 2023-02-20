import { siteConfig } from "@/config/siteConfig";
import Link from "next/link";
import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

type CustomLinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

const CustomLink = (props: CustomLinkProps) => {
  const { href, children, ref, ...rest } = props;
  const isInternalLink =
    href && (href.startsWith("/") || href.startsWith(siteConfig.siteUrl));

  if (isInternalLink) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>
      {children}
      {typeof children === "string" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="ml-1 inline-block h-4 w-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          />
        </svg>
      )}
    </a>
  );
};

export default CustomLink;
