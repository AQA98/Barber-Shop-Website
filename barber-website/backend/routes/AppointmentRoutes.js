require('dotenv').config();
const express = require("express");
const router = express.Router();
const Appointment = require("../controllers/Appointment.js");
const JWT = require("jsonwebtoken");

/*
Takes --> Nothing

Returs --> returns --> res.status(200).json(AllBarbers.rows)
        || res.status(400).send(error)

It wil return in this format--> 

{
        "userid": 31,
        "firstname": "te2st",
        "lastname": "",
        "picturelink": null
}

*/

router.get('/getAllBarbers', Appointment.getAllBarbers)

/*
Takes --> Barbers Id as json
    {
    "BarberID": 43
    }


returns --> res.status(200).send(availableDates.rows)
        || res.status(400).send(error)

Notes and assumptions: This route will provide a list of available dates which is greater then and equal to the current date and sorted from low to high.
route: http://localhost:5001/Appointment/getBarberAvailablityDates

*/

router.get('/getBarberAvailablityDates',Appointment.BarberAvailablityDates)

/*
Takes --> Barbers Id and Available date as json
{
        "BarberID": "43",
        "Available_Date": "2023-01-17"
}

returns --> res.status(200).send(availableHours.rows)
        || res.status(400).send(error)

Notes and assumptions: This route will provide a list of available hours & corresponding appointment ID's when a specific date and barber is selected.

THIS METHOD WILL RETURN HOURS AND APPOINTMENT_id
{
        "hour": "11",
        "appointment_id": 41
    }

route: http://localhost:5001/Appointment/getBarberAvailablity_Hours

*/

router.get('/getBarberAvailablity_Hours',Appointment.getBarberAvailablity_Hours)

/*
Takes -->  as json following info
{
        "appointment_id":50,
        "Customer_First_name":"ALi",
        "Customer_Last_name":"Ali",
        "Customer_email":"...@gmail.com",
        "Customer_telephone":"0000",
        "service":"Haircut",
        "Customer_appointment_notes":"sa"
}

returns --> res.redirect(process.env.Frontend_URL+"appointment?appointment_id="+appointment_id))
        || res.status(400).send(error)

Notes and assumptions: This route will send the email to the customer's provided email (Check the spam folder as well). 

                        That email contains the link that will show all the appointment-related information.             

                        They will also be able to cancel or update existing appointments through that link.          

                        Right now I am routing to the frontend appointment page. please change it accordingly. 

I                       n the link redirecting the user, I have attached the jwt token, which encodes the appointment ID.

route: http://localhost:5001/Appointment/addAppointment

*/

router.put('/addAppointment',Appointment.addAppointment)

//When the customer clicks the link in the email they will get routed to this page//
router.get('/AppointmentDetails/:token', async (req,res)=>{
        try{
                let appointment_id = JWT.verify(req.params.token,process.env.ACCESS_TOKEN_SECRET)
                appointment_id=appointment_id.data;

                //change accordingly 
                res.redirect(process.env.Frontend_URL+"appointment?appointment_id="+appointment_id)
        }catch (error) {
                console.log(error)
                res.status(400).send(error)
        }
})

/*
Takes --> appointment_id as json
{
    "appointment_id": 50
}

returns --> res.status(200).json(appointmentDetails.rows)
        || res.status(400).send(error)

Notes and assumptions: This route will provide All the following appointment details,


{
        "barber_name": "Admin",
        "available_date": "2023-01-17T05:00:00.000Z",
        "hour": "20",
        "customer_first_name": "ALi",
        "customer_last_name": "Ali",
        "customer_email": "abdulqadir199853@gmail.com",
        "customer_telephone": "0000",
        "service": "Haircut",
        "customer_appointment_notes": "sa"
    }

route: http://localhost:5001/Appointment/customerAppointmentDetails

*/

router.get('/customerAppointmentDetails', Appointment.customerAppointmentDetails)

/*
Takes -->  as json following info
{
        "appointment_id":50,
        "Customer_First_name":"ALi",
        "Customer_Last_name":"Ali",
        "Customer_email":"...@gmail.com",
        "Customer_telephone":"0000",
        "service":"Haircut",
        "Customer_appointment_notes":"sa"
}

returns --> res.redirect(process.env.Frontend_URL+"appointment?appointment_id="+appointment_id))
        || res.status(400).send(error)

Notes and assumptions: Same as add appointment

route: http://localhost:5001/Appointment/updateAppointment

*/

router.put('/updateAppointment', Appointment.updateAppointment)

/*
Takes -->  as json following info
{
        "appointment_id":50,

}

returns --> res.render(process.env.Frontend_URL) --> to the home page
        || res.status(400).send(error)

Notes and assumptions: After the cancellation. The user will be redirected to the home page. And after the cancellation, the booked column will be false again in the database.

route: http://localhost:5001/Appointment/cancelAppointment

*/

router.put('/cancelAppointment', Appointment.cancelAppointment)

module.exports = router;