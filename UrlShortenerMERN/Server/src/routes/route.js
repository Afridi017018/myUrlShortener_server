const { Router } = require('express');
const router = Router()
const shortId = require("shortId")
const Url = require("../models/urlModel")

router.get("/", (req, res) => {
    res.send("DONE!!!")
})

router.post("/", async (req, res) => {

    try {
        const { originalLink } = req.body;
        const urlCode = shortId.generate();
        const found = await Url.findOne({originalLink})
        if(found)
        {
            // console.log(found)
            return res.send(found)
        }

        const newUrl = new Url({
            originalLink,
            urlCode
        })

        const saved = await newUrl.save();

        return res.send(saved)
    }
    catch (err) {
        return res.send(err)
    }


})


module.exports = router;