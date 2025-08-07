import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useTabNavigation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get initial values from URL params
  const tabFromUrl = searchParams.get('tab') || 'trending';
  const [activeTab, setActiveTab] = useState(tabFromUrl);

  // Update state when URL params change
  useEffect(() => {
    const newTab = searchParams.get('tab') || 'trending';
    setActiveTab(newTab);
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (tab === 'trending') {
      newParams.delete('tab');
    } else {
      newParams.set('tab', tab);
    }
    setSearchParams(newParams);
  };

  return {
    activeTab,
    handleTabChange,
    searchParams
  };
};
