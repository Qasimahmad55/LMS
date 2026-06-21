import Link from "next/link";

const Footer = () => {
    const currentYear = new Date().getFullYear()
    return (
        <footer className="border-t border-gray-200 dark:border-slate-800">
            <div className="w-[95%] md:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8 pt-12 pb-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-[20px] font-semibold text-black dark:text-white font-Poppins">
                            About
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors"
                                    href="/about"
                                >
                                    Our Story
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors"
                                    href="/privacy-policy"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors"
                                    href="/faq"
                                >
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-[20px] font-semibold text-black dark:text-white font-Poppins">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors"
                                    href="/courses"
                                >
                                    Courses
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors"
                                    href="/profile"
                                >
                                    My Account
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors"
                                    href="/course-dashboard"
                                >
                                    Course Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-[20px] font-semibold text-black dark:text-white font-Poppins">
                            Social Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors"
                                    href="https://www.youtube.com/"
                                >
                                    Youtube
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors"
                                    href="https://www.instagram.com/"
                                >
                                    Instagram
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors"
                                    href="https://github.com/Qasimahmad55"
                                >
                                    Github
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-[20px] font-semibold text-black dark:text-white font-Poppins">
                            Newsletter
                        </h3>
                        <p className="text-base text-gray-600 dark:text-gray-400">
                            Stay up-to-date with everything related to our brand and gain
                            invaluable insights for your programming journey by subscribing to
                            our newsletter.
                        </p>
                        <Link
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg inline-block transition-colors shadow-sm"
                            href={`mailto:qasimahmad2555@gmail.com`}
                        >
                            Connect
                        </Link>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-800">
                    <p className="text-center text-gray-500 dark:text-gray-400 font-Poppins">
                        {`Copyright © ${currentYear} ELearning | All Rights Reserved`}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;