const Category = require("../models/Category");


//create Category ka handler function

exports.createCategory = async (req, res) => {
  try {
    //fetch data
    const { name, description } = req.body;
    //validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: `all feilds are required :  ${error.message}`,
      });
    }

    //create entry in db
    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });
    
      console.log(categoryDetails);
      //return response

      return res.status(200).json({
        success: true,
        message: `category created successfully :  ${categoryDetails}`,
      });
      
  } catch (error) {
      
    return res.status(500).json({
      success: true,
      message: `error while cretaing category :  ${error.message}`,
    });
  }
};



//get all Category

exports.showAllCategories = async (req, res) => {
  try {
    const allCategory= await Category.find({}, { name: true, description: true });

    return res.status(200).json({
      success: true,
      message: `all categories return successfully successfully :`,
      allCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: `error while geting all category :  ${error.message}`,
    });
  }
};

