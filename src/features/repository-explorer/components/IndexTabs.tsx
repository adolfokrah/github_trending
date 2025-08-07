import { Star, Filter } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface IndexTabsProps {
  activeTab: string;
  filteredReposCount: number;
  starredCount: number;
}

export const IndexTabs = ({ activeTab, filteredReposCount, starredCount }: IndexTabsProps) => {
  return (
    <TabsList className="bg-card border border-border">
      <TabsTrigger 
        value="trending" 
        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
      >
        <Filter className="w-4 h-4 mr-2" />
        Trending ({filteredReposCount})
      </TabsTrigger>
      <TabsTrigger 
        value="starred" 
        className="data-[state=active]:bg-star data-[state=active]:text-star-foreground"
      >
        <Star className="w-4 h-4 mr-2" />
        Starred ({starredCount})
      </TabsTrigger>
    </TabsList>
  );
};
