"use client";

import { usePathname } from "next/navigation";
import { ContainerType } from "@/types/layout.type";
import styled from "@emotion/styled";

const PageContainer = ({ children, className = "", style }: ContainerType) => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const Container = isHome ? StyledPageContainer : "div";

  return (
    <Container style={style} className={`${className} px-8`}>
      <div
        className={`mx-auto flex ${
          isHome ? "h-screen" : "min-h-screen"
        } max-w-5xl flex-col items-center gap-12 pt-40 pb-12`}
      >
        {children}
      </div>
    </Container>
  );
};

export default PageContainer;

const StyledPageContainer = styled.div`
  min-height: 0;
  background-image: radial-gradient(
    circle,
    var(--color-secondary-50),
    var(--color-primary-50),
    #fff
  );
`;
