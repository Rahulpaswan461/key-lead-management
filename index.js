require("dotenv").config()

const express = require("express")
const { connectMongoDB } = require("./connection")
const KAMRoute = require("./routes/KAM")
const contactRoute = require("./routes/contact")
const restaurantRoute = require("./routes/restaurant")
const interactionRoute = require("./routes/interaction")
const { checkForAuthenticatedUser } = require("./middlewares/authentication")
const cookieParser = require("cookie-parser")

const app = express()
const PORT = process.env.PORT || 8000

// connect to the database
connectMongoDB(process.env.MONGO_URL)
.then(() => console.log("MongoDB is conencted !!"))
.catch(error => console.log("There is some error",error.message))

app.get("/",(req,res)=>{
    return res.send("From the server")
})

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(checkForAuthenticatedUser("token"))

// routes
app.use("/api/kam",KAMRoute)
app.use("/api/contacts",contactRoute)
app.use("/api/restaurants",restaurantRoute)
app.use("/api/interactions",interactionRoute)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
