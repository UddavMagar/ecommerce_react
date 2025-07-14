import React, { Component } from 'react';
import { withRouter } from '../utils/withRouter';
import { Search, X } from 'lucide-react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      showResults: false,
      showMobileInput: false,
    };
    this.debounceTimer = null;
  }

  handleInputChange = (e) => {
    const query = e.target.value;
    this.setState({ query });

    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.searchProducts(query);
    }, 300);
  };

  searchProducts = async (query) => {
    if (query.length < 2) {
      this.setState({ results: [], showResults: false });
      return;
    }

    try {
      const response = await fetch(
        `https://uddavmagar.pythonanywhere.com/api/v1/product/?search=${query}`
      );
      const data = await response.json();
      this.setState({ results: data, showResults: true });
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  handleBlur = () => {
    setTimeout(() => this.setState({ showResults: false }), 150);
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSearch();
    }
  };

  handleSearch = () => {
    const { query } = this.state;
    this.setState({ showResults: false, showMobileInput: false });
    this.props.navigate(`/?query=${encodeURIComponent(query)}`);
  };

  handleSuggestionClick = (id) => {
    this.setState({ showResults: false, query: '', showMobileInput: false });
    this.props.navigate(`/product/${id}`);
  };

  highlightMatch = (text, query) => {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, `<span class='bg-yellow-200'>$1</span>`);
  };

  toggleMobileInput = () => {
    this.setState((prevState) => ({
      showMobileInput: !prevState.showMobileInput,
      showResults: false,
    }));
  };

  render() {
    const { query, results, showResults, showMobileInput } = this.state;

    return (
      <div className="relative">
        <button
          type="button"
          onClick={this.toggleMobileInput}
          className="md:hidden p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
        >
          {showMobileInput ? (
            <X className="h-5 w-5 text-gray-600" />
          ) : (
            <Search className="h-6 w-6 text-gray-600" />
          )}
        </button>

        <div className={`relative ${showMobileInput ? 'block' : 'hidden'} md:block w-64`}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              value={query}
              onChange={this.handleInputChange}
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeyDown}
              placeholder="Search products..."
              className="w-full pl-10 px-4 py-2 pr-10 border rounded focus:outline-none focus:ring focus:ring-primary bg-white"
            />
            {query && (
              <X
                className="absolute right-3 top-2.5 h-4 w-4 text-gray-500 cursor-pointer"
                onClick={() => this.setState({ query: '', results: [], showResults: false })}
              />
            )}
          </div>

          {showMobileInput && (
            <button
              className="mt-1 w-full md:hidden bg-primary text-white py-2 rounded hover:bg-primary-dark"
              onClick={this.handleSearch}
            >
              Search
            </button>
          )}

          {showResults && results.length > 0 && (
            <ul className="absolute z-30 w-full bg-white border rounded shadow max-h-60 overflow-y-auto">
              {results.map((item) => (
                <li
                  key={item.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer overflow-hidden text-ellipsis line-clamp-2"
                  onClick={() => this.handleSuggestionClick(item.id)}
                  dangerouslySetInnerHTML={{
                    __html: this.highlightMatch(item.name, query),
                  }}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(SearchBar);
