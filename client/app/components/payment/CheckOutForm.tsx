import { useLoadUserQuery } from '@/app/redux/features/api/apiSlice';
import { useCreateOrderMutation } from '@/app/redux/features/orders/ordersApi';
import { styles } from '@/app/styles/styles';
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import socketIO from 'socket.io-client'

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || ""
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] })

type Props = {
    setOpen: any;
    data: any;
    user: any;
    refetch: any
};

const CheckOutForm = ({ data, user, refetch }: Props) => {

    const stripe = useStripe()
    const elements = useElements()

    const [loadUser, setLoadUser] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<any>("");

    const [createOrder, { error, data: orderData }] = useCreateOrderMutation({});
    const { } = useLoadUserQuery({ skip: loadUser ? false : true });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });
        if (error) {
            setMessage(error.message);
            setIsLoading(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            setIsLoading(false);
            createOrder({ courseId: data._id, payment_info: paymentIntent });
        }
    }

    useEffect(() => {
        if (orderData) {
            refetch();
            socketId.emit("notification", {
                title: "New Order",
                message: `You Have A New Order From ${data?.name}`,
                userId: user?._id,
            });
            setLoadUser(true);
            redirect(`/course-access/${data._id}`);
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [orderData, error, data._id, refetch, data.name, user._id])

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement
                id="link-authentication-element"
            />
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text" className={`${styles.button} mt-2 !h-[35px]`}>
                    {isLoading ? "Paying..." : "Pay Now"}
                </span>
            </button>

            {message && (
                <div id="payment-message" className="text-[red] font-Poppins pt-2">
                    {message}
                </div>
            )}
        </form>
    )
}

export default CheckOutForm