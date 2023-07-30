const { Router } = require('express');
const router = Router()
const shortId = require("shortId")
const isUrlValid = require('url-validation');

const Url = require("../models/urlModel")

router.get("/", (req, res) => {
  
    res.send("DONE!!!")
})

router.post("/", async (req, res) => {

    try {
        const { originalLink, userId } = req.body;
        const urlCode = shortId.generate();


        const isValidUrl = isUrlValid(originalLink);
        // console.log(isUrlValid(originalLink))
        if(!isValidUrl){
            // console.log(isValidUrl)
            return res.json({isValidUrl: isValidUrl})
        }


        const data = await Url.findOne({originalLink})
        if(data)
        {
     
            return res.json({urlCode: data.urlCode,isValidUrl: isValidUrl})
        }

        
        if(req.body.name)
        {
            const {name} = req.body;
             newUrl = new Url({
                originalLink,
                urlCode,
                name,
                userId
            }) 
        }

        else{
             newUrl = new Url({
                originalLink,
                urlCode,
                userId
            })
        }
     
        const saved = await newUrl.save();
        return res.json({urlCode: saved.urlCode,isValidUrl: isValidUrl})
    }
    catch (err) {
        return res.status(400).json({err})
    }


})



router.put("/update-url",async(req,res)=>{
    // console.log(req.body)
     
    const {urlCode, name , originalLink} = req.body;

    const isValidUrl = isUrlValid(originalLink);
        // console.log(isUrlValid(originalLink))
        if(!isValidUrl){
            // console.log(isValidUrl)
            return res.json({message: "Invalid url !"})
        }

    if(!originalLink)
     {
        res.json({message:"Original link is needed!"})
     }

    else{
        const data = await Url.findOne({originalLink});

    if(!data || data && data.urlCode === urlCode){
        // console.log(data)
    const updated = await Url.findOneAndUpdate({urlCode},{ name: name, originalLink: originalLink })
    res.json({message:"Updated"})
    }

    else{
        // console.log(data)
        res.json({message:"Already generated short url for this original link"})
    }
    }
    
})


router.delete("/delete-url",async(req,res)=>{

    const {urlCode} = req.body
     const data = await Url.findOneAndDelete({urlCode: urlCode})
    res.json({message: data})
    // console.log(data)

})




router.get("/urlData/:id", async (req, res) => {
    try {
      const urlData = await Url.find({ userId: req.params.id });
    //   console.log(urlData);
    //   console.log(req.params.id)
      res.send(urlData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
  

router.get("/:urlCode",async(req,res)=>{
    const {urlCode} = req.params;
   
    const data = await Url.findOne({urlCode});
    if(!data)
    return res.status(400).json({message:"No such url found"})
    
    data.visitCount = data.visitCount + 1;


    const visitUpdate = await Url.findOneAndUpdate({ urlCode }, data);

    res.redirect(data.originalLink)
    
})


module.exports = router;