import { ContainerType } from "@/types/layout.type";

const PageContainer = ({ children, className, style }: ContainerType) => {
  return (
    <main style={style} className={`${className} flex-1 px-8 py-40`}>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-24">
        {children}
      </div>
    </main>
  );
};

export default PageContainer;
