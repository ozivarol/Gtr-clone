const hs = require("http-status");
const path = require("path")
const ProductService = require("../services/ProductService")
const { checkSecureFile } = require("../scripts/utils/helper")
const ApiError = require("../errors/ApiError");
class ProductController {
    index(req, res) {
        ProductService.list()
            .then((itemList) => {
                if (!itemList) {
                    return next(new ApiError("Sorun oluştu"));

                }
                res.status(hs.OK).send({
                    code: 0,
                    msg: "Listeleme başarılı.",
                    itemList
                })
            })
            .catch((e) => {
                next(new ApiError(e?.message))
            })

    }
    create(req, res) {
        req.body.user_id = req.user;
        ProductService.insert(req.body)
            .then((createdDoc) => {
                if (!createdDoc) {
                    res.status(hs.INTERNAL_SERVER_ERROR).send({ error: "Bir sorun oluştu.." })
                }
                res.status(hs.OK).send({
                    code: 0,
                    msg: "Ürün başarı ile oluşturuldu.",
                    createdDoc
                });

            })
            .catch((e) => {
                next(new ApiError(e?.message))
            })
    }
    update(req, res) {
        if (!req.params.id) {
            return res.status(hs.BAD_REQUEST).send({ message: "Eksik bilgi..." })
        }
        ProductService.updateDoc(req.params.id, req.body)
            .then((updateDoc) => {
                if (!updateDoc) {
                    res.status(hs.NOT_FOUND).send({ error: "Böyle bir ürün bulunmamaktadır.." })
                }
                res.status(hs.OK).send({
                    code: 0,
                    msg: "Güncelleme işlemi başarılı",
                    updateDoc
                });
            })
            .catch((e) => {
                next(new ApiError(e?.message))
            })

    }
    addComment(req, res) {
        if (!req.params.id) {
            return res.status(hs.NOT_FOUND).send({ message: "Eksik bilgi..." })
        }
        ProductService.findOne({ _id: req.params.id })
            .then((mainProduct) => {
                if (!mainProduct) {
                    return res.status(hs.NOT_FOUND).send({ error: "Böyle bir ürün bulunmamaktadır" })

                }
                const comment = {
                    ...req.body,
                    created_at: new Date(),
                    user_id: req.user,
                };
                mainProduct.comments.push(comment);
                updateDoc(req.params.id, mainProduct)
                    .then((updatedDoc) => {
                        if (!updateDoc) {
                            return res.status(hs.NOT_FOUND).send({ message: "Böyle bir ürün bulunmamaktadır.." })
                        }
                        res.status(hs.OK).send({
                            code: 0,
                            msg: "Yorum başarı ile eklendi.",
                            updatedDoc
                        });
                    })
                    .catch((e) => {
                        next(new ApiError(e?.message))
                    })
            })
    }
    deleteProduct(req, res) {
        if (!req.params?.id) {
            return res.status(hs.BAD_REQUEST).send({ message: "ID bilgisi eksik" });
        }

        ProductService.remove(req.params?.id)
            .then((deletedProduct) => {
                console.log(deletedProduct)
                if (!deletedProduct) {
                    return res.status(hs.NOT_FOUND).send({ message: "Böyle bir ürün bulunmamaktadır." })
                }
                res.status(hs.OK).send({
                    code: 0,
                    msg: "Ürün başarı ile silindi.",
                    update
                });
            })
            .catch((e) => {
                next(new ApiError(e?.message))
            })

    }
    addMedia(req, res) {
        console.log(req.files.media)
        if (!req.params.id || !req.files?.media || !checkSecureFile(req?.files?.media?.mimetype)) return res.status(hs.BAD_REQUEST).send({ message: "Eksik bilgi.." });

        ProductService.findOne({ _id: req.params.id }).then((mainProduct) => {
            if (!mainProduct) return res.status(hs.NOT_FOUND).send({ message: "Böyle bir ürün bulunmamaktadır" });

            const extension = path.extname(req.files.media.name);
            const fileName = `${mainProduct._id?.toString()}${extension}`;
            const folderPath = path.join(__dirname, "../", "uploads/Products", fileName);

            req.files.media.mv(folderPath, function (err) {
                if (err) return res.status(hs.INTERNAL_SERVER_ERROR).send(err);
                mainProduct.media = fileName;
                ProductService.updateDoc(req.params.id, mainProduct)
                    .then((updatedDoc) => {
                        if (!updatedDoc) return res.status(hs.NOT_FOUND).send({ message: "Böyle bir ürün bulunmamaktadır" });
                        res.status(hs.OK).send({
                            code: 0,
                            msg: "Medya başarı ile eklendi",
                            updatedDoc
                        });
                    })
                    .catch((e) => next(new ApiError(e?.message)));
            });
        });
    }
}


module.exports = new ProductController()

