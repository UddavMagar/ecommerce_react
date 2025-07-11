import React, {Component} from "react";
import { USDTONRP } from "../utils/priceutils";
import { Link } from "react-router-dom";


class Productcard extends Component {
  render() {
    const { product } = this.props;
    return (
        <Link to={`/product/${product.id}`} key={product.id}>
      <div className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <img src={product.gallery[0].image} alt={product.name} loading="lazy" className="w-full h-48 object-cover mb-4 rounded" />
        <h2 className="text-xl font-semibold mb-2 line-clamp-2 text-text">{product.name}</h2>
        <p className="mb-2 line-clamp-1 text-secondary-text">{product.description}</p>
        <p className="text-lg font-bold text-primary">{USDTONRP(product.price)}</p>
      </div>
      </Link>
    );
  }
}

export default Productcard;