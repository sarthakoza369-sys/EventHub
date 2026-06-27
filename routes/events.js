const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Event = require('../models/Events');
const {body, validationResult} = require('express-validator');

//ROUTE 1: Add an event using POST: "/api/events/addevent". Login required

router.post("/addevent", fetchuser, [
     body('title','Enter a valid title').isLength({min: 3}),
     body('description','Decription must be atlast 5 characters').isLength({min: 5}),
     body('date', 'Please enter a valid date').isISO8601(),
],
    async(req, res)=>{
        try {
            const {title, description, location, date} = req.body;

        //if there are errors, return BAD REQUEST
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        //Creating an event:
        const event = new Event({
            title, description, host: req.user.id, date, location
        });

        const savedEvent = await event.save();
        await savedEvent.populate('host', 'name email');
        res.json(savedEvent)

        } catch (err) {
            console.log(err.message);
            res.status(500).send({error: err.message});
        }
    });

    module.exports = router;