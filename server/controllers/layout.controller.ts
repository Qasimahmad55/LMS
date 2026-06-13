import { NextFunction, Request, Response } from "express";
import { CatchAsyncHandler } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import LayoutModel from "../models/layout.model";
import { v2 as cloudinary } from 'cloudinary'


//create layout 
export const createLayout = CatchAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type } = req.body
        const isTypeExists = await LayoutModel.findOne({ type })

        if (isTypeExists) {
            return next(new ErrorHandler(`${type} already exists`, 400))
        }

        if (type === "Banner") {
            const { image, title, subTitle } = req.body
            const myCloud = await cloudinary.uploader.upload(image, {
                folder: "layout"
            })

            const banner: any = {
                type: "Banner",
                banner: {
                    image: {
                        public_id: myCloud.public_id,
                        url: myCloud.secure_url
                    },
                    title,
                    subTitle
                }
            }
            await LayoutModel.create(banner)
        }

        if (type === "FAQ") {
            const { faq } = req.body
            const faqItems = await Promise.all(
                faq.map((item: any) => {
                    return {
                        question: item.question,
                        answer: item.answer
                    }
                })
            )
            await LayoutModel.create({ type: "FAQ", faq: faqItems })
        }

        if (type === "Categories") {
            const { categories } = req.body
            const categoriesItem = await Promise.all(
                categories.map((item: any) => {
                    return {
                        title: item.title,
                    }
                })
            )
            await LayoutModel.create(
                {
                    type: "Categories",
                    categories: categoriesItem
                })
        }

        res.status(201).json({
            success: true,
            message: "Layout created successfully"
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})
//edit layout
export const editLayout = CatchAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type } = req.body;
        if (type == "Banner") {
            const bannerData: any = await LayoutModel.findOne({ type: 'Banner' });
            if (!bannerData) {
                return next(new ErrorHandler("Banner not found", 404));
            }
            const { image, title, subTitle } = req.body;
            const data = image.startsWith('https') ? bannerData : await cloudinary.uploader.upload(image, {
                folder: "Banner",
            });
            const banner = {
                type: "Banner",
                image: {
                    public_id: image.startsWith('https') ? bannerData.banner.image.public_id : data.public_id,
                    url: image.startsWith('https') ? bannerData.banner.image.url : data.secure_url,
                },
                title,
                subTitle,
            };

            await LayoutModel.findByIdAndUpdate(bannerData._id, { banner });
        }
        if (type === 'FAQ') {
            const { faq } = req.body;
            const faqData: any = await LayoutModel.findOne({ type: 'FAQ' });
            if (!faqData) {
                return next(new ErrorHandler("FAQ not found", 404));
            }
            // Validate faq structure
            const faqItems = await Promise.all(faq.map(async (item: any) => {
                return {
                    question: item.question,
                    answer: item.answer
                }
            }))
            await LayoutModel.findByIdAndUpdate(faqData._id, { type: 'FAQ', faq: faqItems });
        }
        if (type === 'Categories') {
            const { categories } = req.body;
            const categoriesData: any = await LayoutModel.findOne({ type: 'Categories' });
            if (!categoriesData) {
                return next(new ErrorHandler("Categories not found", 404));
            }
            const categoriesItems = await Promise.all(categories.map(async (item: any) => {
                return {
                    title: item.title
                }
            }))
            await LayoutModel.findByIdAndUpdate(categoriesData._id, {
                type: 'Categories',
                categories: categoriesItems
            });
        }
        res.status(201).json({
            success: true,
            message: "Layout Updated successfully",
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})
export const getLayoutByType = CatchAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { type } = req.params;
            const layout = await LayoutModel.findOne({ type });

            res.status(200).json({
                success: true,
                layout
            })

        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500));
        }
    })