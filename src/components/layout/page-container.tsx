import { ContainerType } from "@/types/layout.type";

const PageContainer = ({ children, className, style }: ContainerType) => {
  return (
    <main style={style} className={`${className} px-8`}>
      <div className="mx-auto flex h-screen max-w-5xl flex-col items-center gap-12 pt-40 pb-12">
        {children}
      </div>
    </main>
  );
};

export default PageContainer;
