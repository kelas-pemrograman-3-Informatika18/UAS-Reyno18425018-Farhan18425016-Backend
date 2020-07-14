const makananModel = require('../model/Makanan')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId
const { deleteImage } = require('../uploadConfig')
exports.insertMakanan = (data) =>
    new Promise((resolve, reject) => {
        makananModel.create(data)
        .then(() => resolve(requestResponse.sukses('Berhasil Input Makanan')))
        .catch(() => reject(requestResponse.serverError))
    })

 exports.getAllMakanan = () =>
    new Promise((resolve, reject) => {
        makananModel.find({})
        .then(makanan => resolve(requestResponse.suksesWithData(makanan)))
        .catch(error => reject(requestResponse.serverError))
    })

exports.getbyId = (id) =>
    new Promise((resolve, reject) => {
        makananModel.findOne({
            _id: objectId(id)
        }).then(makanan => resolve(requestResponse.suksesWithData(makanan)))
        .catch(error => reject(requestResponse.serverError))
    })

exports.editmakanan = (data, idmakanan, changeImage) =>
    new Promise((resolve, reject) => {
        makananModel.updateOne({
            _id: objectId(idmakanan)
        }, data)
        .then (() => {
            if (changeImage) {
                deleteImage(data.oldImage)
            }
            resolve(requestResponse.sukses('Berhasil Edit Makanan'))
        }).catch(() => reject(requestResponse.serverError))
    })

exports.delete = (id) =>
    new Promise((resolve, reject) => {
        makananModel.findOne({
            _id: objectId(id)
        }).then(makanan => {
            makananModel.deleteOne({
                _id: objectId(id)
            }).then(() => {
                deleteImage(makanan.image)
                resolve(requestResponse.sukses('Berhasil Delete Makanan'))
            }).catch(() => reject(requestResponse.serverError))
        })
    })