import { useSearchParams } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { LanguageFilterProps } from "@/lib/types";

export const LanguageFilter = ({ languages }: LanguageFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedLanguage = searchParams.get('language') || 'all';

  const handleLanguageChange = (language: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (language === 'all') {
      newParams.delete('language');
    } else {
      newParams.set('language', language);
    }
    setSearchParams(newParams);
  };
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground">Filter by language:</span>
      <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[180px] bg-card border-border">
          <SelectValue placeholder="All languages" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          <SelectItem value="all">All languages</SelectItem>
          {languages.map((language) => (
            <SelectItem key={language} value={language}>
              {language}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};