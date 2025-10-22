import Category from "../models/category.js";
import Link from "../models/link.js";
import { validateCategory } from "../utils/schemaValidation.js";
import { ObjectId } from "mongodb";

export async function createCategory(req, res){
    const {error, value} = validateCategory(req.body)

    if(error){
        return res.status(400).json({
            error: true,
            message: "Invalid Category information provided"
        })
    }

    try {
        const checkCategory = await Category.findOne({title:value.title, createdBy:req.user.id})
        if(checkCategory){
            return res.status(409).json({
                error:true,
                message: "Category Already Exists"
            })
        }
        
        
        const newCategory = await Category.create({
            title: value.title,
            description: value.description,
            createdBy: req.user.id,
        })


        return res.status(200).json({
            error:false,
            message: "Category created successfully",
            category: newCategory
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:true,
            message: "Internal Server Error"
        })
    }
}

export async function getCategory(req, res){
    try {
        const Category = await Category.aggregate([
                {$match:{$expr:{
                    $and:[
                        {$eq: ["$_id", new ObjectId(req.params.CategoryId)]},
                        {$eq: ["$createdBy", new ObjectId(req.user.id)]},
                    ]
                }}},
                {$lookup:{
                    from: "links",
                    let: {userId: "$createdBy", CategoryId:"$_id"},
                    pipeline:[
                        {$match:{$expr:{
                            $and:[
                                {$eq: ["$createdBy", "$$userId"]},
                                {$eq: ["$CategoryId", "$$CategoryId"]},
                            ]
                        }}},
        
                        {$project:{_id:1, title:1, description:1, url:1, logo:1, createdBy:1, CategoryId:1, title:1, hasCategory: 1 }}
                    ],
                    as: "topics"
                }},
        
            ])

        if(Category.length === 0){
            return res.status(404).json({
                error:true,
                message: "Category Not Found"
            })
        }

        return res.status(200).json({
            error: false,
            message: "Category Found",
            category: Category
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:true,
            message: "Internal Server Error"
        })
    }
}

export async function updateCategory(req, res){
    const {error, value} = validateCategory(req.body)

    if(error){
        return res.status(400).json({
            error: true,
            message: "Invalid Category information provided"
        })
    }

    try {
        const category = await Category.findOneAndUpdate(
            {_id:req.params.categoryId, createdBy:req.user.id},
            {
                title: value.title,
                description: value.description
            },
            {
                new: true,           
                runValidators: true 
            }
        )

        if(!category){
            return res.status(404).json({
                error:true,
                message: "Category Not Found"
            })
        }

        return res.status(200).json({
            error: false,
            message: "Category Updated",
            category:category
        })
    } catch (error) {
        return res.status(500).json({
            error:true,
            message: "Internal Server Error"
        })
    }
}

export async function deleteCategory(req, res){
     try {
        const category = await Category.findOneAndDelete({_id:req.params.categoryId, createdBy:req.user.id})
    
        if(!category){
            return res.status(404).json({
                error: true,
                message: "Category not found"
            })
        }
        // cascade delete, when topic is deleted all the related messages will also be deleted
        await Link.deleteMany({categoryId:req.params.categoryId, createdBy:req.user.id})
    
        return res.status(200).json({
            error: false,
            message: "Category deleted successsfully",
            categoryId: req.params.categoryId
        })
        
        } catch (error) {
            return res.status(500).json({
            error: true,
            message: `Failed to get category: \n ${error}`,

        })
        }
}

