import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface IndexLoadingErrorProps {
  loading: boolean;
  error: string | null;
}

export const IndexLoadingError = ({ loading, error }: IndexLoadingErrorProps) => {
  return (
    <>
      {/* Error state */}
      {error && (
        <Alert className="mb-6 border-destructive/50 bg-destructive/10">
          <AlertDescription className="text-destructive">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-muted-foreground">Fetching trending repositories...</p>
        </div>
      )}
    </>
  );
};
