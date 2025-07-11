import React, { Component } from 'react';
import { Search, X } from 'lucide-react'; 

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMobileInput: false,
      searchText: '',
    };
  }

  toggleMobileInput = () => {
    this.setState((prevState) => ({
      showMobileInput: !prevState.showMobileInput,
    }));
  };
  handleChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  render() {
    const { showMobileInput, searchText } = this.state;

    return (
         <div className="flex items-center space-x-2">
        {/* Search Box - Always visible on desktop, toggle on mobile */}
        <div
          className={`transition-all duration-300 ease-in-out 
            md:block ${showMobileInput ? 'block' : 'hidden'} 
            w-40 md:w-64 rounded-lg border bg-card text-card-foreground shadow-sm`}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={this.handleChange}
              className="w-full pl-10 px-4 py-2 text-sm text-gray-800 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Search Icon Button - Always visible on mobile */}
        <button
          type="button"
          onClick={this.toggleMobileInput}
          className="md:hidden p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
        >
          {showMobileInput ? (
        <X className="h-5 w-5 text-gray-600" />
            ) : (
        <Search className="h-5 w-5 text-gray-600" />
)}

        </button>
      </div>
    );
  }
}

export default SearchBar;
