const router = require('express').Router()
const makananController = require('../controller/Makanan')
const uploadSetting = require('../uploadConfig')
const fields = uploadSetting.upload.fields([
    {
        name: 'image',
        maxCount: 1
    }
])

router.post('/insert', fields, (req, res) => {
    const imageName = uploadSetting.cekNull(req.files['image'])

    const data = Object.assign(JSON.parse(req.body.data), {
        image: imageName
    })

    makananController.insertMakanan(data)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.get('/getallmakanan', (req, res) => {
    makananController.getAllMakanan()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

router.get('/getbyid/:id', (req, res) => {
    makananController.getbyId(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.put('/editmakanan/:idmakanan', fields,(req, res) => {
    const imageName = uploadSetting.cekNull(req.files['image'])
    let data = JSON.parse(req.body.data)
    let changeImage = false
    if (imageName) {
        changeImage = true
        data = Object.assign(data, {
            image: imageName,
            oldImage: data.image
        })
    }

    makananController.editmakanan(data, req.params.idmakanan, changeImage)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.delete('/delete/:id', (req, res) => {
    makananController.delete(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

module.exports = router