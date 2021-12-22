const hs = require("http-status");
const RestautrantService = require("../services/RestaurantService");
const ApiError = require("../errors/ApiError");
const checkSecureFile = require("../scripts/utils/helper")
const path = require("path")

class ResturantController{
    index(req,res){
        RestautrantService.list()
        .then((itemList)=>{
            if(!itemList){
                return next(new ApiError("Sorun oluştu"));
            }
            res.status(hs.OK).send(itemList)
        })
        .catch((e)=>{
            next(new ApiError(e?.message));
        })
    }
    create(req,res){
        
        req.body.owner_id = req.user;
        console.log(req.body.owner_id)
        RestautrantService.insert(req.body)
        .then((createdDoc)=>{
            if(!createdDoc){
                res.status(hs.INTERNAL_SERVER_ERROR).send({error:"Bir sorun oluştu.."})
            }
            res.status(hs.OK).send(createdDoc)
        })
        .catch((e)=>{
            res.status(hs.INTERNAL_SERVER_ERROR).send(e);
        })
    }
    update(req,res){
        if(!req.params.id){
            return res.status(hs.BAD_REQUEST).send({message:"Eksik bilgi..."})
        }
        RestautrantService.updateDoc(req.params.id,req.body)
        .then((updateDoc)=>{
            if(!updateDoc){
                res.status(hs.NOT_FOUND).send({error:"Böyle bir ürün bulunmamaktadır.."})
            }
            res.status(hs.OK).send(updateDoc);
        })
        .catch((e)=>{
            res.status(hs.INTERNAL_SERVER_ERROR).send(e)
        })
    }
    deleteRestaurant(req,res){
        if(!req.params?.id){
            return res.status(hs.BAD_REQUEST).send({message:"ID bilgisi eksik"})
        }
        RestautrantService.remove(req.params?.id)
        .then((deleteRestaurant)=>{
            if(!deleteRestaurant){
                return res.status(hs.NOT_FOUND).send({message:"Böyle bir restorant bulunamadı.."})
            }
            res.status(hs.OK).send({meesage:"Restorant başarı ile silindi.."})
        })
        .catch((e)=>{
            res.status(hs.INTERNAL_SERVER_ERROR).send({error:"Silme işlemi sırasında sorun oldu.."})
        })
    }
    addMedia(req,res){
        if(!req.params.id || !req.files?.media || checkSecureFile(req?.files?.media?.mimetype)){
            return res.status(hs.BAD_REQUEST).send({message:"Eksik Bilgi..."})

        }
        RestautrantService.findOne({_id:req.params.id})
        .then((mainProduct)=>{
            if(!mainProduct){
                return res.status(hs.NOT_FOUND).send({message:"Böyle bir restorant bulunmamaktadır."})

            }
            const extension = path.extname(req.files.media.name);
            const fileName = `${mainProduct._id?.toString()}${extension}`
            const folderPath = path.join(__dirname,"../","uploads/Restaurant",fileName);

            req.files.media.mv(folderPath,function(err){
                if(err){
                    return res.status(hs.INTERNAL_SERVER_ERROR).send(err);
                }
                mainProduct.media = fileName;
                RestautrantService.updateDoc(req.params.id,mainProduct)
                .then((updatedDoc)=>{
                    if(!updatedDoc){
                        return res.status(hs.NOT_FOUND).send({message:"Böyle bir restorant bulunmamaktadır."})

                    }
                    res.status(hs.OK).send(updatedDoc);

                })
                .catch((e)=>{
                    res.status(hs.INTERNAL_SERVER_ERROR).send((e));
                })
            })
        })
    }
}


module.exports= new ResturantController()