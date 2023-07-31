const app = require("./app")
const mongoose =require("mongoose")

const port = process.env.port || 5000;



const dbConnect = async()=>{
    mongoose.connect(process.env.URL)
    .then(() => {
        console.log("DB Connected!!!")
        app.listen(port,()=>{
            console.log(`Server is listening on port ${port}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })
}

dbConnect();

// module.exports = dbConnect;

