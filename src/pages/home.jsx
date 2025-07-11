import React, {Component} from "react";
import axios from "axios";
import Productcard from "../components/Productcard";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    axios.get('https://uddavmagar.pythonanywhere.com/api/v1/product/')
      .then(res => this.setState({products: res.data}))
      .catch(err => console.error("Error fetching products:", err));
  }

  render() {
    return (
      <div className="container mx-auto pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {this.state.products.map(product => (
            <Productcard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
