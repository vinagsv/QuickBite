import { Property } from "../models/propertyModel.js"; 
import { APIFeatures } from "../utils/APIFeatures.js";
import imagekit from "../utils/imagekitIO.js";

const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (property) {
      return res.status(200).json({
        status: "success",
        data: property,
      });
    }

    res.status(404).json({
      status: "fail",
      message: "Property not found",
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server Error",
      error: error.message,
    });
  }
};

const createProperty = async (req, res) => {
  try {
    const {
      propertyName,
      description,
      propertyType,
      roomType,
      extraInfo,
      address,
      amenities,
      checkInTime,
      checkOutTime,
      maximumGuest,
      price,
      images,
    } = req.body; 

    
    const uploadedImages = [];

    for (const image of images) {
      const result = await imagekit.upload({
        file: image.url, 
        fileName: `property_${Date.now()}.jpg`,
        folder: "property_images",
      });

      uploadedImages.push({
        url: result.url,
        public_id: result.fileId,
      });
    }

    
    const newProperty = await Property.create({
      propertyName,
      description,
      propertyType,
      roomType,
      extraInfo,
      address,
      amenities,
      checkInTime,
      checkOutTime,
      maximumGuest,
      price,
      images: uploadedImages,
      userId: req.userId, 
    });

    
    res.status(201).json({
      status: "success",
      data: newProperty,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create property",
      error: error.message,
    });
  }
};

const getProperties = async(req,res)=>{
    try {
        const features = new APIFeatures(Property.find(),req.query).filter().search().paginate();

        const allProperties = await Property.find();
        const doc = await features.query;

res.status(200).json({
    status:"sucess",
    no_of_responses: doc.length,
    all_properites:allProperties.length,
    data:doc,
});
    } catch (error) {
        console.error("Error sreaching Properties:" , error);
        res.status(500).json({status:"fail", error:"internal server Error"})
        
    }
};

const getUsersProperties =async(req,res)=>{
    try {
        const userId = req.user._id;
        const property = await Property.find({userId});
        res.status(200).json({
            status:"succuess",
            data:property,
        });
    } catch (error) {
        console.error("Error fetching Properties:" , error);
        res.status(500).json({status:"fail", error:"Error fetching"})
        
    }
}


export { getProperty ,createProperty, getProperties,getUsersProperties};
