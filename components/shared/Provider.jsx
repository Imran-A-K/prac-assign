import { Toaster } from "sonner";

export default function Provider({ children }) {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      {children}
    </>
  );
}
