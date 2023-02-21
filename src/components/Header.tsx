import MobileNav from "@/components/MobileNav";
import SectionContainer from "@/components/SectionContainer";
import { headerConfig } from "@/config/headerConfig";
import CommandPaletteToggle from "./CommandPalette/CommandPaletteToggle";
import CustomLink from "./custom-mdx/CustomLink";
import ThemeSwitch from "./ThemeSwitch";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-primary-content py-3 backdrop-blur transition-colors">
      <SectionContainer>
        <div className="flex items-center justify-between">
          <div>
            <CustomLink href="/" aria-label={headerConfig.title}>
              <div className="flex items-center justify-between">
                <div className="flex items-center h-6 text-2xl font-semibold ">
                  {headerConfig.title}
                </div>
              </div>
            </CustomLink>
          </div>

          <div className="flex items-center text-base leading-5 sm:gap-1">
            <div className="hidden gap-1 sm:flex">
              {headerConfig.navLinks.map((link) => (
                <CustomLink
                  key={link.title}
                  href={link.href}
                  className="rounded p-3 font-medium transition-color"
                >
                  {link.title}
                </CustomLink>
              ))}
            </div>

            <ThemeSwitch />
            <CommandPaletteToggle />
            <MobileNav />
          </div>
        </div>
      </SectionContainer>
    </header>
  );
}
