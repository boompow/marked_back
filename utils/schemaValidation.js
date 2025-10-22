import Joi from "joi";

const joiCategorySchema = Joi.object({
    title:Joi.string().trim().min(1).max(200).label("Category Title").default("New Category"),
    description: Joi.string().trim().allow("").max(200).label("Category Description") 
})

const joiLinkSchema = Joi.object({
    title:Joi.string().trim().min(1).label("Link Title").required(),
    url:Joi.string().uri().trim().label("Link URL").required(),
    logo: Joi.string().uri().trim().label("Link Logo URL"),
    description: Joi.string().trim().allow("").max(200).label("Link Description") 
})


function JoiValidator(schema, body){
    const {error, value} = schema.validate(body, {
        abortEarly: false,
        stripUnknown: true,
    });

    if(error){
        const message = error.details.map(d=>d.message)
        return ({
            success: false,
            error:message
        })
    }

    return({
        success: true,
        value
    })
}


export function validateCategory(body){
    return JoiValidator(joiCategorySchema, body);
}

export function validateLink(body){
    return JoiValidator(joiLinkSchema, body);
}