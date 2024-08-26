import { ReactNode } from "react";
import { ClipLoader } from "react-spinners";

interface LoadingProps {
  isLoading: boolean;
  children: ReactNode;
}

export function Loading({ isLoading, children }: LoadingProps) {
  return (
    <>
      {isLoading ? (
        <ClipLoader
          color="#0FF"
          loading={isLoading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        children
      )}
    </>
  );
}
