import Category from "../models/category.js";
import Link from "../models/link.js";
import { validateLink } from "../utils/schemaValidation.js";

// create Link
export async function createLink(req, res){
    const {error, value} = validateLink(req.body);

    if(error){
        return res.status(400).json({
            error: true,
            message:"Invalid Link Information"
        })
    }

    try {
        const checkLink = await Link.findOne({url:value.url, createdBy:req.user.id})
        if(checkLink){
            return res.status(409).json({
                error:true,
                message: "Link Already Exists"
            })
        }
        
        
        const newLink = await Link.create({
            title: value.title,
            description: value.description,
            url: value.url,
            logo: value.logo,
            createdBy: req.user.id,
        })


        return res.status(200).json({
            error:false,
            message: "Link created successfully",
            link: newLink
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:true,
            message: "Internal Server Error"
        })
    }

}

export async function updateLink(req, res){
    const {error, value} = validateLink(req.body);

    if(error){
        return res.status(400).json({
            error: true,
            message:"Invalid Link Information"
        })
    }

    try {
         const link = await Link.findOneAndUpdate(
            {_id:req.params.linkId, createdBy:req.user.id},
            {
                title: value.title,
                description: value.description,
                url: value.url,
                logo: value.logo,
            },
            {
                new: true,
                runValidators:true
            }
        )

    if(!link){
        return res.status(404).json({
            error: true,
            message: "Link not found"
        })
    }

    return res.status(200).json({
        error: false,
        message: "Link updated successfully",
        link: link
    })
    
    } catch (error) {
        return res.status(500).json({
        error: true,
        message: `Failed to get link: \n ${error}`
    })
    }
}

// add topic to a specific subject
export async function categorizeLink(req, res){
    try {
    const category = await Category.findOne({_id:req.params.categoryId, createdBy:req.user.id})

    if(!category){
        return res.status(404).json({
            error: true,
            message: "Subject not found"
        })
    }
    
    
    const link = await Link.findOneAndUpdate({_id:req.params.linkId, createdBy:req.user.id},
        {categoryId:category._id, hasCategory:true},
        {
            new:true,
            runValidators:true
        }
    )

    if(!link){
        return res.status(404).json({
            error: true,
            message: "link not found"
        })
    }

    return res.status(200).json({
        error: false,
        message: "link categorized successfully",
        link: link
    })
    
    } catch (error) {
        return res.status(500).json({
        error: true,
        message: `Failed to get link: \n ${error}`
    })
    }
}

// delete link
export async function deleteLink(req, res){
    try {
        const link = await Link.findOneAndDelete({_id:req.params.linkId, createdBy:req.user.id})
        
        if(!link){
             return res.status(404).json({
                error: true,
                message: "Subject not found"
            })
        }

         return res.status(200).json({
            error: false,
            message: "Link deleted successsfully",
            linkId:req.params.linkId
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:true,
            message: "Internal Server Error"
        })
    }
}