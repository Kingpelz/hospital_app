const express = require('express')
const app = express()
const config = require("config")
const port = config.get("port")
const cors = require("cors")

app.use(cors("http://localhost:6500"))
//body parser
app.use(express.json());

//import file routes
const doctorRoute = require("./routes/doctor");
const errorHandler = require("./middleware/error")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const surgeryRoute = require("./routes/surgery")
const profileRoute = require("./routes/profile")
//routes
// app.use("/nurse", nurseRoute);
app.use("/doctor", doctorRoute);
app.use("/auth", authRoute)
app.use("/user", userRoute)
app.use("/profile", profileRoute)
app.use("/surgery", surgeryRoute)





app.use(errorHandler)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
