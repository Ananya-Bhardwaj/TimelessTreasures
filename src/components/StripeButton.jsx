// import React from 'react';
// import { loadStripe } from '@stripe/stripe-js';

// // Load Stripe.js outside the component to avoid recreating the Stripe object on each render
// const stripePromise = loadStripe('pk_test_51NspSUSDfaeqN3M53rcXbMMJF0r84fUcztTSkQmvLeki6iSY5WHzkGTYZF8UWLf0I2n6HRhjUytnX1QP7Wn2AV6z00yYSumKd9');

// const StripeButton = ({ priceId }) => {
//   const handleClick = async () => {
//     const stripe = await stripePromise;

//     // Redirect to Stripe Checkout with the passed priceId
//     const { error } = await stripe.redirectToCheckout({
//       lineItems: [{
//         price: priceId, // Use the priceId passed as a prop
//         quantity: 1,
//       }],
//       mode: 'payment',
//       successUrl: 'https://example.com/success',
//       cancelUrl: 'https://example.com/cancel',
//     });

//     // Error handling
//     if (error) {
//       console.error('Error redirecting to checkout:', error.message);
//       alert(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <button role="link" onClick={handleClick}>
//       Checkout
//     </button>
//   );
// };

// export default StripeButton;


import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe.js outside the component to avoid recreating the Stripe object on each render
const stripePromise = loadStripe('pk_test_51NspSUSDfaeqN3M53rcXbMMJF0r84fUcztTSkQmvLeki6iSY5WHzkGTYZF8UWLf0I2n6HRhjUytnX1QP7Wn2AV6z00yYSumKd9');

const StripeButton = ({ priceId }) => {
  const handleClick = async () => {
    const stripe = await stripePromise;

    // Redirect to Stripe Checkout with the proper parameters
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{
        price: priceId,  // Use the priceId passed as a prop
        quantity: 1,
      }],
      mode: 'payment',
      successUrl: `${window.location.origin}/app`, // Use /app route on success
      cancelUrl: `${window.location.origin}/app?status=cancel`, // Use /app route with query parameter on cancellation
      billingAddressCollection: 'required',  // Collect billing address
      // customerEmail: 'ananya.bhar@gmail.com', // Optional: pass customer email if available
      shippingAddressCollection: {
        allowedCountries: ['IN'], // Ensure the shipping address collection is allowed for India
      },
    });

    // Error handling
    if (error) {
      console.error('Error redirecting to checkout:', error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <button
      role="link"
      onClick={handleClick}
      style={{
        padding: '12px 24px',
        backgroundColor: '#008080',  // Teal color
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
      }}
      onMouseEnter={(e) => e.target.style.backgroundColor = '#006666'} // Darker teal on hover
      onMouseLeave={(e) => e.target.style.backgroundColor = '#008080'} // Back to original color
    >
      Pay
    </button>
  );
  
  
};

export default StripeButton;
