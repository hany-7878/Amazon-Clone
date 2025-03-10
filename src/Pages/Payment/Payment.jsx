import React, { useContext, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard.jsx";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/Currencyformat/CurrencyFormat.jsx";
import { axiosInstance } from "../../Api/axios.js";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase.js";
import { useNavigate } from "react-router-dom";
import { type } from "../../Utility/action.type.js";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => (item?.amount ?? 0) + amount, 0) || 0;

  const total = basket.reduce((amount, item) => {
    return amount + (item?.price ?? 0) * (item?.amount ?? 0);
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCardError(e?.error?.message || "");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || total <= 0 || basket.length === 0) {
      return;
    }

    try {
      setProcessing(true);
      
      const response = await axiosInstance.post(`/payment/create?total=${total * 100}`);
      const clientSecret = response.data?.clientSecret;

      if (!clientSecret) {
        throw new Error("Failed to retrieve client secret.");
      }

      const confirmation = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (confirmation.error) {
        throw new Error(confirmation.error.message);
      }

      const { paymentIntent } = confirmation;
      if (!paymentIntent) {
        throw new Error("Payment was not successful.");
      }

      await db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        // empty the basket
        dispatch({type:type.EMPTY__BASKET})


      setProcessing(false);
      navigate("/orders", {state:{msg:"you have placed new  order"}})

    } catch (error) {
      console.error("Payment failed:", error);
      setCardError(error.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Layout>
      <div>
        <div className={classes.payment__header}>
          Checkout ({totalItem} {totalItem === 1 ? "item" : "items"})
        </div>
        <section className={classes.payment}>
          <div className={classes.flex}>
            <h3>Delivery Address</h3>
            <div>
              <div>{user?.email || "Guest User"}</div>
              <div>123 Addis Ababa</div>
              <div>Bishoftu, Oromia</div>
            </div>
          </div>
          <div className={classes.flex}>
            <h3>Review Items and Delivery</h3>
            <div>
              {basket?.length > 0 ? (
                basket.map((item) => (
                  <ProductCard key={item.id} product={item} flex={true} />
                ))
              ) : (
                <p>Your basket is empty.</p>
              )}
            </div>
          </div>
          <hr />
          <div className={classes.flex}>
            <h3>Payment Method</h3>
            <div className={classes.payment__card__container}>
              <div className={classes.payment__details}>
                <form onSubmit={handlePayment}>
                  {cardError && <small style={{ color: "red" }}>{cardError}</small>}
                  <CardElement onChange={handleChange} />
                  <div className={classes.payment__price}>
                    <div>
                      <span style={{ display: "flex", gap: "10px" }}>
                        <p>Total Order | </p> <CurrencyFormat amount={total} />
                      </span>
                    </div>
                    <button type="submit" disabled={processing || !stripe || total <= 0 || basket.length === 0}>
                      {processing ? (
                        <div className={classes.loader}>
                          <ClipLoader color="#ffa006" size={15} />
                          <p>Please wait...</p>
                        </div>
                      ) : (
                        "Pay Now"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Payment;



