import SuperAdmin from "../models/SuperAdmin";

const getAll = async (req,res) => {
    try{
        const superAdmins = await SuperAdmin.find()

        return res.status(200).json({
            message: 'Super Admins founded',
            data: superAdmins,
            error: false
        });
    }catch (error){
        return res.status(404).json({
            message:'An error occured',
            error: true,
        });
    }
};