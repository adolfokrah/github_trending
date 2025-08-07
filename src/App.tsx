import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "@features/repository-explorer/pages";
import NotFound from "@/components/not-found";
import ErrorBoundary from "@/components/error-boundary";
import { useErrorHandler } from "@/hooks/use-error-handler";

const queryClient = new QueryClient();

const AppContent = () => {
  useErrorHandler();
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    </QueryClientProvider>
  );
};

const App = () => (
  <ErrorBoundary>
    <AppContent />
  </ErrorBoundary>
);

export default App;
