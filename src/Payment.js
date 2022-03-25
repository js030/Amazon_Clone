import React, { useEffect, useState } from 'react'
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { useStateValue } from './StateProvider';
import {Link, useNavigate} from "react-router-dom";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './Reducer';
import axios from 'axios';

function Payment() {

    const navigate = useNavigate();

    const [{basket}, dispatch] = useStateValue();

    const stripe= useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("")
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
      
      const getClientSecret = async () => {
        const response = await axios({
          method : 'post',
          url: `/payments/create?total=${getBasketTotal(basket) * 100}`
        });
        setClientSecret(response.data.clientSecret)
      }
      getClientSecret();
    }, [basket])


    const handleSubmit = async (event) => {
      event.preventDefault();
      setProcessing(true);

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method : {
          card : elements.getElement(CardElement)
        }
      }).then(({paymentIntent}) => {
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        navigate('/orders')      
      })
    }

    const handleChange = e => {
      setDisabled(e.empty);
      setError(e.error ? e.error.message : "");
    }

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          CheckOut (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>123 Reate Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => {
              return (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              );
            })}
          </div>
        </div>

        <div className="payment__section">

          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>

          <div className="payment__details">
          <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />
            </form>
            </div>

            <div className="payment__priceContainer">
              <CurrencyFormat
                renderText={(value) => (
                  <>
                    <p>
                      Subtotal ({basket.length} items): <strong>{value}</strong>
                    </p>
                    <small className="subtotal__gift">
                      <input type="checkbox" /> This order contains a gift
                    </small>
                  </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
              <button disabled={processing || disabled || succeeded}>
                <span>{processing ? <p>Processing</p> : "Buy Now" }</span>
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Payment