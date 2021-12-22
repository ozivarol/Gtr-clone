const hs = require("http-status");
const MealsService = require("../services/MealsService");
const ApiError = require("../errors/ApiError")
const checkSecureFile = require("../scripts/utils/helper")
const path = require("path");
const { update } = require("./Products");

class MealsController{
    index(req,res){
        MealsService.list()
        .then((itemList)=>{
            if(!itemList){
                return next(new ApiError("Sorun oluştu"));
            }
            res.status(hs.OK).send(itemList);
        })
        .catch((e)=>{
            next(new ApiError(e?.message));
        })
    }

    create(req,res){
        req.body.res_id = req.user;
        MealsService.insert(req.body)
        .then((createDoc)=>{
            if(!createDoc){
                res.status(hs.INTERNAL_SERVER_ERROR).send({error:"Bir sorun oluştu"})
            }
            res.status(hs.OK).send(createDoc)
        })
        .catch((e)=>{
            res.status(hs.INTERNAL_SERVER_ERROR).send(e)
        })
    }
    update(req,res){
        if(!req.params.id){
            return res.status(hs.BAD_REQUEST).send({message:"Eksik bilgi..."})
        }
        MealsService.updateDoc(req.params.id,req.body)
        .then((updateDoc)=>{
            if(!updateDoc){
                res.status(hs.NOT_FOUND).send({error:"Böyle bir ürün bulunmamaktadır..."})
            }
            res.status(hs.OK).send(updateDoc)
        })
        .catch((e)=>{
            res.status(hs.INTERNAL_SERVER_ERROR).send(e);
        })
    }
    deleteMeal(req,res){
        if(!req.params?.id){
            return res.status(hs.BAD_REQUEST).send({message:"ID bilgisi eksik"})
        }
        MealsService.remove(req.params?.id)
        .then((deletedMeals)=>{
            if(!deletedMeals){
                return res.status(hs.NOT_FOUND).send({message:"Böyle bir ürün bulunmamaktaıdr"})
            }
            res.status(hs.OK).send({message:"Ürün başarı ile silindi."})
        })
        .catch((e)=>{
            res.status(hs.INTERNAL_SERVER_ERROR).send({error:"Silme işlemi sırasında sorun oldu.."});
        })
    }
    addMedia(req,res){
        if(!req.params.id || req.files?.media || !checkSecureFile(req?.files?.media)){
            return res.status(hs.BAD_REQUEST).send({message:"Eksik bilgi..."})
        }
        MealsService.findOne({_id:req.params.id})
        .then((mainProduct)=>{
            if(!mainProduct){
                return res.status(hs.NOT_FOUND).send({message:"Böyle bir ürün bulunmamaktadır."})
            }
            const extension = path.extname(req.files.media.name);
            const fileName = `${mainProduct._id?.toString()}${extension}`
            const folderPath = path.join(__dirname,"../","uploads/Meals",fileName);

            req.files.media.mv(folderPath,function(err){
                if(err){
                    return res.status(hs.INTERNAL_SERVER_ERROR).send(err)
                }
                mainProduct.media = fileName;
                MealsService.updateDoc(req.params.id,mainProduct)
                .then((updateDoc)=>{
                    if(!updateDoc){
                        return res.status(hs.NOT_FOUND).send({message:"Böyle bir ürün bulunmamaktadır."})
                    }
                    res.status(hs.OK).send(updateDoc);
                })
                .catch((e)=>{
                    res.status(hs.INTERNAL_SERVER_ERROR).send(e)
                })
            })
        })
    }
}

module.exports = new MealsController();