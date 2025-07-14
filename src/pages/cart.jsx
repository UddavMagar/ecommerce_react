import React, { Component } from 'react';
import axios from 'axios';
import AuthContext from '../context/Authcontext';
import { withRouter } from '../utils/withRouter';
import { USDTONRP } from '../utils/priceutils';

class Cart extends Component {
    static contextType = AuthContext;
    
    constructor(props) {
    super(props);
    this.state = {
        cartItems: [],
        total: 0,
        loading: true,
        error: null,
        selectedItems: new Set(),
    };
  }

  componentDidMount() {
    this.fetchCart();
  }

  fetchCart = async () => {
    const { token } = this.context;

    try {
      const response = await axios.get(
        `https://uddavmagar.pythonanywhere.com/api/v1/cart/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log("Cart response:", response.data);
      const cartItems = response.data;
     const inStockItems = cartItems
        .filter(item => item.inventory_quantity > 0)
            .map(item => item.id);
      const allIds = new Set(inStockItems);
      this.setState({  cartItems, selectedItems: allIds, loading: false });
    } catch (error) {
      this.setState({ error: 'Failed to load cart.', loading: false });
    }
  };

  handleIncrease = (id) => {
    this.setState(prevState => ({
      cartItems: prevState.cartItems.map(item =>
        item.id === id && item.quantity < item.inventory_quantity
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    }));
  };

  handleDecrease = (id) => {
    this.setState(prevState => ({
      cartItems: prevState.cartItems.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    }));
  };

handleCheckboxChange = (itemId) => {
  const item = this.state.cartItems.find(item => item.id === itemId);
  if (!item || item.inventory_quantity === 0) return;

  this.setState(prevState => {
    const selectedItems = new Set(prevState.selectedItems);
    if (selectedItems.has(itemId)) {
      selectedItems.delete(itemId);
    } else {
      selectedItems.add(itemId);
    }
    return { selectedItems };
  });
};


  handlePlaceOrder = () => {

const selectedItemsArray = Array.from(this.state.selectedItems);  // Convert Set to Array

const orderedItems = this.state.cartItems
  .filter(item => selectedItemsArray.includes(item.id))
  .map(item => ({
    name: item.product_name,
    quantity: item.quantity,
  }));

this.props.navigate('/order', {
  state: {
    orderedItems,
  },
});



    // TODO: axios.post('order-api-endpoint', { items: orderItems })
    // then handle success or error
  };

  render() {
    const { cartItems, loading, error, selectedItems } = this.state;

    if (loading) return <div className="text-center p-4">Loading cart...</div>;
    if (error) return <div className="text-center p-4 text-red-600">{error}</div>;
    if (cartItems.length === 0) return <div className="text-center p-4">Your cart is empty.</div>;

    return (
      <div className="min-h-screen max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
        <div className="space-y-6">
          {cartItems.map(item => (
            <div key={item.id} className="flex border rounded-lg p-4 shadow-sm items-center">
              <input
                type="checkbox"
                checked={selectedItems.has(item.id)}
                onChange={() => this.handleCheckboxChange(item.id)}
                disabled={item.inventory_quantity === 0}
                className={`mr-4 w-5 h-5 accent-primary-dark ${
                    item.inventory_quantity === 0 ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                />
              <img
                src={item.product_image}
                alt={item.product_name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex flex-col flex-grow ml-4">
                <h3 className="text-lg font-medium">{item.product_name}</h3>
                <p className="text-gray-600 mt-1">Price: {USDTONRP(item.product_price)}</p>

                {item.inventory_quantity === 0 ? (
                  <p className="mt-2 text-red-600 font-semibold">Currently Not Available</p>
                ) : (
                  <div className="flex items-center space-x-4 mt-2">
                    <button
                      onClick={() => this.handleDecrease(item.id)}
                      disabled={item.quantity <= 1}
                      className={`px-3 py-1 rounded border ${
                        item.quantity <= 1
                          ? 'text-gray-400 border-gray-400 cursor-not-allowed'
                          : 'text-primary border-primary hover:bg-primary hover:text-white'
                      }`}
                    >
                      -
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => this.handleIncrease(item.id)}
                      disabled={item.quantity >= item.inventory_quantity}
                      className={`px-3 py-1 rounded border ${
                        item.quantity >= item.inventory_quantity
                          ? 'text-gray-400 border-gray-400 cursor-not-allowed'
                          : 'text-primary border-primary hover:bg-primary hover:text-white'
                      }`}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
              <div className="ml-4 text-right font-semibold text-lg">
                Rs {(parseFloat(USDTONRP(item.product_price).replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={this.handlePlaceOrder}
          className="mt-6 px-6 py-3 bg-primary text-white rounded hover:bg-primary-dark transition"
        >
          Place Order
        </button>
      </div>
    );
  }
}

export default withRouter(Cart);
