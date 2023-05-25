const mongoose =require("mongoose")


const dbConnect = async()=>{
    mongoose.connect(process.env.URL)
    .then(() => {
        console.log("DB Connected!!!")
    })
    .catch((err) => {
        console.log(err)
    })
}


module.exports = dbConnect;