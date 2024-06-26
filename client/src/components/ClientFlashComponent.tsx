"use client";

import { useSearchParams } from "next/navigation";

const ClientFlashComponent = () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");

  return (
    <>
      {errorMessage && (
        <p className="animate-pulse rounded  px-4 py-2 text-center text-red-400">
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default ClientFlashComponent;
