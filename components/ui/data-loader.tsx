import type { ReactNode } from "react";
import { LoadingSpinner } from "./loading-spinner";

interface DataLoaderProps<T> {
  isLoading: boolean;
  data: T | null | undefined;
  error?: Error | null;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
  emptyComponent?: ReactNode;
  children: (data: T) => ReactNode;
}

export function DataLoader<T>({
  isLoading,
  data,
  error,
  loadingComponent,
  errorComponent,
  emptyComponent,
  children,
}: DataLoaderProps<T>) {
  if (isLoading) {
    return loadingComponent ? (
      <>{loadingComponent}</>
    ) : (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <LoadingSpinner className="h-8 w-8 text-primary" />
        <p className="text-muted-foreground">Loading data...</p>
      </div>
    );
  }

  if (error) {
    return errorComponent ? (
      <>{errorComponent}</>
    ) : (
      <div className="p-4 border border-destructive/50 rounded-md bg-destructive/10 text-destructive">
        <p>Error loading data: {error.message}</p>
      </div>
    );
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return emptyComponent ? (
      <>{emptyComponent}</>
    ) : (
      <div className="p-4 border border-muted rounded-md bg-muted/50 text-muted-foreground">
        <p>No data available</p>
      </div>
    );
  }

  return <>{children(data)}</>;
}
