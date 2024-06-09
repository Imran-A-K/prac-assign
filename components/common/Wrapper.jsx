import { cn } from "@/lib/utils";

export default function Wrapper({ children, extraClassName }) {
  const wrapperClassCollection = cn(
    "mx-auto",
    "max-w-7xl",
    "px-4",
    "py-5",
    "lg:py-8",
    extraClassName
  );

  return <main className={wrapperClassCollection}>{children}</main>;
}
