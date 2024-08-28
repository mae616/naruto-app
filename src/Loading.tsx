import { CSSProperties, ReactNode } from "react";
import { CircleLoader } from "react-spinners";

interface LoadingProps {
  isLoading: boolean;
  children: ReactNode;
}

const override: CSSProperties = {
  display: "block",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export function Loading({ isLoading, children }: LoadingProps) {
  return (
    <>
      {isLoading ? (
        <CircleLoader
          color="#0FF"
          loading={isLoading}
          cssOverride={override}
          size={100}
          aria-label="Loading Spinner"
        />
      ) : (
        children
      )}
    </>
  );
}
