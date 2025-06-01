import { create } from 'zustand';
import { Product } from './products';

interface SearchState {
  searchQuery: string;
  searchResults: Product[];
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: Product[]) => void;
  clearSearch: () => void;
}

const useSearchStore = create<SearchState>((set) => ({
  searchQuery: '',
  searchResults: [],
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchResults: (results) => set({ searchResults: results }),
  clearSearch: () => set({ searchQuery: '', searchResults: [] })
}));

export default useSearchStore;