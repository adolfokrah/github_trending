import { LanguageFilter } from "@/components/language-filter";

interface IndexFilterBarProps {
  activeTab: string;
  languages: string[];
}

export const IndexFilterBar = ({ activeTab, languages }: IndexFilterBarProps) => {
  if (activeTab !== "trending" || languages.length === 0) {
    return null;
  }

  return (
    <LanguageFilter languages={languages} />
  );
};
