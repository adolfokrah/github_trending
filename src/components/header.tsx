import { Github, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeaderProps } from "@/lib/types";

const Header = ({ loading, onRefresh }: HeaderProps) => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg">
              <Github className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">GitHub Trending</h1>
              <p className="text-sm text-muted-foreground">Discover popular repositories from the last 7 days</p>
            </div>
          </div>
          <Button 
            onClick={onRefresh} 
            variant="outline" 
            size="sm"
            disabled={loading}
            className="bg-card border-border hover:bg-accent"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
