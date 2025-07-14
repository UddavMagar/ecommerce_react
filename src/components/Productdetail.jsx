import React, { Component } from "react";
import { USDTONRP } from "../utils/priceutils";
import { withRouter } from "../utils/withRouter";
import axios from "axios";

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            loading: true,
            error: null,
            selectedImageIndex: 0,
        };
        this.slideInterval = null;
    }

  async componentDidMount() {
        const { id } = this.props.params;
        
        try {
            const response = await axios.get(`https://uddavmagar.pythonanywhere.com/api/v1/product/?id=${id}`);
            if (Array.isArray(response.data) && response.data.length > 0) {
                this.setState({ product: response.data[0], loading: false }, this.startSlideShow);
            } else {
                this.setState({ error: 'Product not found', loading: false });
        }
        } catch (error) {
            this.setState({ error: "Product Not Found", loading: false });
        }

    }   
    
  componentWillUnmount() {
      this.stopSlideShow();
    }

  startSlideShow = () => {
    this.slideInterval = setInterval(() => {
      this.setState(prevState => {
        const { product, selectedImageIndex } = prevState;
        if (!product || !product.gallery || product.gallery.length === 0) return null;
        const nextIndex = (selectedImageIndex + 1) % product.gallery.length;
        return { selectedImageIndex: nextIndex };
      });
    }, 4000); // change slide every 4 seconds
  };

  stopSlideShow = () => {
    if (this.slideInterval) clearInterval(this.slideInterval);
  };

  selectImage = index => {
    this.setState({ selectedImageIndex: index });
    this.stopSlideShow();
  };

    render() {
        const { product, loading, error, selectedImageIndex } = this.state;

        if (loading) return <div className="text-center">Loading...</div>;
        if (error) return <div className="text-center text-red-500">{error}</div>;
        if (!product) return <p>No product found.</p>;

        const images = product.gallery || [];

        return(
          <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8">
            <div className="flex-1 flex flex-col items-center">
            {images.length > 0 ? (
              <img
                src={images[selectedImageIndex].image}
                alt={product.name}
                className="w-full h-96 object-contain rounded-lg mb-4 shadow-lg"
              />
            ) : (
              <p>No images available</p>
            )}

          <div className="flex space-x-3 overflow-x-auto">
            {images.map((imgObj, index) => (
              <img
                key={index}
                src={imgObj.image}
                alt={product.name}
                onClick={() => this.selectImage(index)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                  index === selectedImageIndex ? 'border-primary' : 'border-transparent'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-700 whitespace-pre-line text-secondary-text">{product.description}</p>
          <p className="text-xl text-green-600">{USDTONRP(product.price)}</p>
          <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition">
            Add to Cart
          </button>
        </div>

      </div>
    );
  }
}

export default withRouter(ProductDetail);