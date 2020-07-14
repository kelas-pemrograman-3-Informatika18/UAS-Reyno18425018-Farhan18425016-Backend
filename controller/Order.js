const orderModel = require('../model/Order')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId

exports.insert = (data) =>
    new Promise((resolve, reject)  => {
        try {
            orderModel.create(data)
            .then(() => resolve(requestResponse.sukses('Berhasil Memproses Pesanan')))
            .catch(() => reject(requestResponse.serverError))
        } catch (error) {
            console.log(error)
        }
    })

exports.getAllOrder = () =>
    new Promise((resolve, reject) => {
        orderModel.aggregate([
            {
                $lookup: {
                    from: "makanans",
                    localField: "idMakanan",
                    foreignField: "_id",
                    as: "datamakanan"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "idUser",
                    foreignField: "_id",
                    as: "datauser"
                }
            }
        ]).then(res => {
            resolve(requestResponse.suksesWithData(res))
        }).catch(() => reject(requestResponse.serverError))
    })

exports.getOrderByUser = (id) =>
    new Promise((resolve, reject) => {
        orderModel.aggregate([
            {
                $match: {
                    idUser: objectId(id)
                }
            },
            {
                $lookup: {
                    from: "makanans",
                    localField: "idMakanan",
                    foreignField: "_id",
                    as: "datamakanan"
                }
            }
        ]).then(res => {
            resolve(requestResponse.suksesWithData(res))
        }).catch(() => reject(requestResponse.serverError))
    })

exports.konfirmasiOrder = (id) =>
    new Promise((resolve, reject) => {
        orderModel.updateOne({
            _id: objectId(id)
        },
        {
            status: 2
        }).then(() => resolve(requestResponse.sukses('Berhasil Konfirmasi Order')))
        .catch(() => reject(requestResponse.serverError))
    })

    exports.terimaBarang = (id) =>
    new Promise((resolve, reject) => {
        orderModel.updateOne({
            _id: objectId(id)
        },
        {
            status: 3
        }).then(() => resolve(requestResponse.sukses('Berhasil Menerima Pesanan')))
        .catch(() => reject(requestResponse.serverError))
    })