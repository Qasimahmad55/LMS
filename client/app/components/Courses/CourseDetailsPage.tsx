import { useGetCourseDetailsQuery } from '@/app/redux/features/courses/coursesApi'
import React, { useState } from 'react'
import Loader from '../Loader/Loader'
import Heading from '@/app/utils/Heading'
import Header from '../Header'
import Footer from '../Footer'
import CourseDetails from './CourseDetails'

type Props = {
    id: string
}

const CourseDetailsPage = ({ id }: Props) => {
    const { data, isLoading } = useGetCourseDetailsQuery(id)
    const [route, setRoute] = useState("Login")
    const [open, setOpen] = useState(false)

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
                    {
                        <CourseDetails
                            setRoute={setRoute}
                            setOpen={setOpen}
                            data={data.course}
                            // stripePromise={stripePromise}
                            // clientSecret={clientSecret}
                        />
                    }
                    <Footer />
                </>
            )}
        </>
    )
}

export default CourseDetailsPage