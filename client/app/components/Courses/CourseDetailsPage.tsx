import { useGetCourseDetailsQuery } from '@/app/redux/features/courses/coursesApi'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import Heading from '@/app/utils/Heading'
import Header from '../Header'
import Footer from '../Footer'
import CourseDetails from './CourseDetails'
import { useCreatePaymentIntentMutation, useGetStripePublishableKeyQuery } from '@/app/redux/features/orders/ordersApi'
import { loadStripe } from '@stripe/stripe-js'

type Props = {
    id: string
}

const CourseDetailsPage = ({ id }: Props) => {
    const { data, isLoading } = useGetCourseDetailsQuery(id)
    const { data: config } = useGetStripePublishableKeyQuery({})
    const [createPaymentIntent, { data: paymentIntentData }] = useCreatePaymentIntentMutation()

    const [stripePromise, setStripePromise] = useState<any>(null);
    const [clientSecret, setClientSecret] = useState("");

    const [route, setRoute] = useState("Login")
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (config) {
            const publishableKey = config?.publishableKey;
            // initializes the Stripe.js SDK using your public Stripe publishable key
            setStripePromise(loadStripe(publishableKey));
        }
        if (data) {
            const amount = Math.round(data?.course?.price * 100);
            createPaymentIntent(amount);
        }
    }, [config, data, createPaymentIntent])

    useEffect(() => {
        if (paymentIntentData) {
            setClientSecret(paymentIntentData.client_secret);
        }
    }, [paymentIntentData]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Heading
                        title={`${data?.course?.name}-ELearning`}
                        description="ELearning is a platform for online learning and education."
                        keywords={data?.course?.tags}
                    />
                    <Header
                        route={route}
                        open={open}
                        setRoute={setRoute}
                        setOpen={setOpen}
                        activeItem={1}
                    />
                    {stripePromise && (
                        < CourseDetails
                            setRoute={setRoute}
                            setOpen={setOpen}
                            data={data.course}
                            stripePromise={stripePromise}
                            clientSecret={clientSecret}
                        />
                    )
                    }
                    <Footer />
                </>
            )}
        </>
    )
}

export default CourseDetailsPage