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

    //ROUTE 2: DELETE an event using POST: "/api/events/delete_event". Login required

    router.delete("/delete_event/:id",fetchuser, 
        async(req, res)=>{
            try {
                let event = await Event.findById(req.params.id);

                if(!event){
                     return res.status(404  ).send("Not Found")
                }

                if(event.host.toString() !== req.user.id){
                    return res.status(401).send("Not Allowed");
                }

             event = await Event.findByIdAndDelete(req.params.id);
             res.json({"Success" : "Event has been deleted!!"})
            } catch(error){
                console.log(error.message);
                res.status(500).send("Internal sever error")
            }
        });

    //ROUTE 3: EDIT an event using POST: "/api/events/editevent"

    router.put("/editevent/:id", fetchuser,
        async(req, res)=>{
            try {
                const {title, description, location, date} = req.body;
                
                const newEvent={};
                if(title){newEvent.title=title};
                if(description){newEvent.description=description};
                if(date){newEvent.date=date};
                if(location){newEvent.location=location};

                //Find the event to be updated and UPDATE it:
                let event = await Event.findById(req.params.id);
                if(!event){
                    return res.status(404).send("Not Found")
                }

                //Allow deletion only if HOST owns it:
                if(event.host.toString() !== req.user.id){
                    return res.status(401).send("Not Allowed");
                }

                event = await Event.findByIdAndUpdate(req.params.id, {$set: newEvent}, {new: true});
                res.json({event});
            } catch (err) {
                 console.log(err.message);
                 res.status(500).send("Internal sever error")
            }
        });

    //ROUTE 4: Register for an event using: POST "/api/events/register"
    router.post("/register/:id", fetchuser, 
        async (req, res) => {
            let 
        })

    module.exports = router;