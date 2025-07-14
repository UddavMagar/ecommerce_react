import React, { Component } from "react";
import axios from "axios";
import Productcard from "../components/Productcard";
import { withRouter } from "../utils/withRouter";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      categories: [],
      selectedCategories: new Set(),
      loading: true,
    };
  }

async componentDidMount() {
  await this.fetchCategories();

  const queryParams = new URLSearchParams(this.props.location.search);
  const reset = queryParams.get("reset");
  const searchQuery = queryParams.get("query") || "";

  if (reset === "true") {
    this.setState({ selectedCategories: new Set() }, () => {
      this.props.navigate("/", { replace: true }); // clean the URL
      this.fetchProducts(""); // load all products
    });
  } else {
    this.fetchProducts(searchQuery);
  }
}



componentDidUpdate(prevProps, prevState) {
  const prevQuery = new URLSearchParams(prevProps.location.search);
  const currentQuery = new URLSearchParams(this.props.location.search);

  const prevReset = prevQuery.get("reset");
  const currentReset = currentQuery.get("reset");

  // Trigger reset when reset=true is newly added
  if (currentReset === "true" && prevReset !== "true") {
    this.setState({ selectedCategories: new Set() }, () => {
      this.props.navigate("/", { replace: true }); // clean the URL
      this.fetchProducts(""); // Load all products
    });
    return;
  }

  // Handle category or search changes
  if (
    this.props.location.search !== prevProps.location.search ||
    this.state.selectedCategories !== prevState.selectedCategories
  ) {
    const searchQuery = currentQuery.get("query") || "";
    this.fetchProducts(searchQuery);
  }
}


  fetchCategories = async () => {
    try {
      const res = await axios.get("https://uddavmagar.pythonanywhere.com/api/v1/category/");
      this.setState({ categories: res.data });
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  fetchProducts = async (searchQuery = "") => {
    const { selectedCategories } = this.state;
    const categoryParams = Array.from(selectedCategories).map(name => `category=${name}`).join("&");
    const url = `https://uddavmagar.pythonanywhere.com/api/v1/product/?search=${searchQuery}&${categoryParams}`;

    try {
      const res = await axios.get(url);
      this.setState({ products: res.data, loading: false });
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  handleCategoryChange = (name) => {
    this.setState(prevState => {
      const updated = new Set(prevState.selectedCategories);
      updated.has(name) ? updated.delete(name) : updated.add(name);
      return { selectedCategories: updated };
    });
  };

  render() {
    const { products, categories, selectedCategories, loading } = this.state;

    return (
      <div className="container mx-auto pt-8 pb-16 flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 mt-10 lg:mt-0 lg:pl-6">
          <h2 className="text-lg font-semibold mb-4">Category</h2>
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.has(category.name)}
                  onChange={() => this.handleCategoryChange(category.name)}
                  className="accent-primary"
                />
                <span>{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="w-full lg:w-3/4 pr-4">
          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map(product => (
                <Productcard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
