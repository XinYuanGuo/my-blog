import { FC, PropsWithChildren } from "react";
import Header from "./Header";
import SectionContainer from "./SectionContainer";

const LayoutWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col justify-between">
      <div>
        <Header />

        <SectionContainer>
          <main className="mb-auto">{children}</main>
        </SectionContainer>
      </div>
    </div>
  );
};

export default LayoutWrapper;
