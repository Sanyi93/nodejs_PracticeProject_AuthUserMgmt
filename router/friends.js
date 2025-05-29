const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};


// GET request: Retrieve all friends
router.get("/",(req,res)=>{

  // Update the code here
  res.send(JSON.stringify(friends, null, 4));

});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email",(req,res)=>{
  // email from the req body
  const email = req.body.email;
 //retrieving info on friends according to the email provided
  res.send(friends[email]);


});


// POST request: Add a new friend
router.post("/",(req,res)=>{
    //if email provided
    if(req.body.email){
        //add new user with firstName, lastName, DOB
        friends[req.body.email] = {
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "DOB": req.body.DOB
        };
    }
    res.send("The user " + req.body.firstName + " has been added");
});


// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
    const email = req.body.email;
    let friend = friends[email]; //retrieving friend object based on email (passed in the request)

    if(friend){

        let DOB = req.body.DOB;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;

        //id DOB provided in the request
        if(DOB){
            friend["DOB"] = DOB;
        }
        //id firstName provided in the request
        if(firstName){
            friend["firstName"] = firstName;
        }
        //id lastName provided in the request
        if(lastName){
            friend["lastName"] = lastName;
        }

        friends[email] = friend; // updating friend object based on email
        res.send(`Friend with the email ${email} has been updated`);
    }

    //if friend with the provided email not found
        res.send(`Friend with the email ${email} not found`);
});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {

    const email = req.body.email;
    let friend = friends[email];

    if(friend){
        delete friends[email];
    }

    res.send(`Friend with the email ${email} has been deleted`);
    


});

module.exports=router;

NO
