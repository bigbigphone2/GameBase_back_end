const Joi = require('joi');

function validatePost(post){
    const schema =Joi.object({
        post_id: Joi.number().optional(),
        user_id: Joi.number().required(),
        title:   Joi.string().min(1).max(100).required(),
        type:    Joi.string().min(1).max(100).required(), 
        content: Joi.string().min(0).max(20000),
        price:   Joi.number().min(0).max(2000).required(),
        place:   Joi.string().min(1).max(100).required(),
        contact: Joi.string().min(1).max(200).required().allow('').optional(),
        create_date: Joi.string().optional(),
        //file: Joi.string().required(),   
    });

    return schema.validate(post);

}

 module.exports.validatePost= validatePost;