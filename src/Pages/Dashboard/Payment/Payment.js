import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51JwV9XKgZFMQxB9TackkCdsqfRnx58iIRf6FyImcMEuhIPcXPximLFbvQ0hGzlWsSzMPbcgd6pSBAz1jXRuk5W8q00cWLFisgr')


const Payment = () => {
    const{appointmentId} = useParams();
    const [appointment, setAppointment] = useState({});
    useEffect(()=>{
        fetch(`http://localhost:5000/appointments/${appointmentId}`)
            .then(res => res.json())
            .then(data => setAppointment(data))
    },[appointmentId])
    
    return (
        <div>
            <h2>Please pay for : {appointment.patientName} for {appointment.serviceName}</h2>
            <h4>Pay : $ {appointment.price}</h4>
            {appointment?.price && <Elements stripe={stripePromise}>
                <CheckoutForm
                    appointment ={appointment}
                />
            </Elements>}
        </div>
    );
};

export default Payment;