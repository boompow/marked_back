import { auth } from "../auth.js"
import { ObjectId } from "mongodb";
import Link from "../models/link.js";
import Category from "../models/category.js";
import "dotenv/config"

const client = process.env.CLIENT

// handling google callback
export async function googleCallbackHandler(req, res){
    try {
        const session = await auth.handleOAuthCallback(req, "google");

        console.log(session)
        res.redirect(`${client}/dashboard`);
    } catch (error) {
        res.status(500).json({error:true, message:error})
    }
}


// getting all the users topic and category data
export async function getUserData(req, res){
    try {
        const userId = new ObjectId(req.user.id)
        const [links, categories] = await Promise.all([
            //  make sure to edit this to filter those that are not categorized
            Link.aggregate([
                {$match:{createdBy: userId,}},
                {$project:{_id:1, title:1, description:1, url:1, screenshot:1, createdBy:1, categoryId:1, title:1, hasCategory: 1 }}
            ]),

            Category.aggregate([
                {$match: {createdBy: userId}},
                {$lookup:{
                    from: "links",
                    let:{userId: "$createdBy", categoryId: "$_id"},
                    pipeline:[
                        {$match: {
                            $expr:{
                                $and:[
                                    {$eq: ["$createdBy", "$$userId"]},
                                    {$eq: ["$categoryId", "$$categoryId"]},
                                    {$eq: ["$hascategory", true]},
                                ]
                            }
                        }},

                        {$project:{_id:1, title:1, description:1, url:1, screenshot:1, createdBy:1, categoryId:1, title:1, hasCategory: 1 }}
                    ],
                    as: "topics"
                }}
            ])
        ])

        res.status(200).json({
            error:false,
            data:{
                links: links,
                categories: categories
            }
        })

        
    } catch (error) {
        res.status(500).json({error:true, message:error.message})
    }
}
