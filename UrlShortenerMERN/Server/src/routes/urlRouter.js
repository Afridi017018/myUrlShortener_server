const { Router } = require('express');
const router = Router()
const shortId = require("shortId")
const Url = require("../models/urlModel")

router.get("/", (req, res) => {
    res.send("DONE!!!")
})

router.post("/", async (req, res) => {
    // console.log(req.body)
    try {
        const { originalLink } = req.body;
        const urlCode = shortId.generate();
        const data = await Url.findOne({originalLink})
        if(data)
        {
            // console.log(data)
            return res.json(data)
        }


        if(req.body.name)
        {
            const {name} = req.body;
             newUrl = new Url({
                originalLink,
                urlCode,
                name
            }) 
        }

        else{
             newUrl = new Url({
                originalLink,
                urlCode
            })
        }
     
        const saved = await newUrl.save();
        return res.json(saved)
    }
    catch (err) {
        return res.status(400).json({err})
    }


})



router.get("/:urlCode",async(req,res)=>{
    const {urlCode} = req.params;
   
    const data = await Url.findOne({urlCode});
    if(!data)
    return res.status(400).json({message:"No such url found"})
    
    data.visitCount = data.visitCount + 1;


    await Url.findOneAndUpdate({ urlCode }, data);

    res.redirect(data.originalLink)
    
})


module.exports = router;