
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    const updateMatches = () => {
      setMatches(media.matches);
    };
    
    updateMatches();
    media.addEventListener('change', updateMatches);
    
    return () => {
      media.removeEventListener('change', updateMatches);
    };
  }, [query]);

  return matches;
}
