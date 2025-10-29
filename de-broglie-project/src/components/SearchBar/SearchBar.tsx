import { type FC } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQueryAction, useSearchQuery } from '../../store/slices/particlesSlice';
import searchIcon from '../../assets/search_icon.png';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export const SearchBar: FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Найти...", 
  initialValue = "" 
}) => {
  const dispatch = useDispatch();
  const searchQuery = useSearchQuery();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQueryAction(e.target.value));
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder={placeholder}
          className="search-input"
          value={searchQuery || initialValue}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-button">
          <img src={searchIcon} alt="Search" className="search-icon" />
        </button>
      </form>
    </div>
  );
};
