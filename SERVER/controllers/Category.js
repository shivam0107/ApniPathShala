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
      message: `category created successfully :`,
      Data:categoryDetails
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `error while cretaing category :  ${error.message}`,
    });
  }
};













//get all Category

exports.showAllCategories = async (req, res) => {
  try {
    const allCategory = await Category.find(
      {},
      { name: true, description: true }
    );

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












//get category page details

exports.categoryPageDetails = async (req, res) => {
  try {
    //get category id
    const { categoryId } = req.body;

    //get courses for specified category id
    const selectedCategory = await Category.findById({ _id:categoryId })
      .populate("course")
      .exec();
    //validation
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    //get courses for different category
    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate("course")
      .exec();

    //top selling courses
    //HW:- 
    // Get top-selling courses across all categories
		const allCategories = await Category.find().populate("course");
		const allCourses = allCategories.flatMap((category) => category.courses);
		const mostSellingCourses = allCourses
			.sort((a, b) => b.sold - a.sold)
			.slice(0, 10);


    //return
    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategories,
        mostSellingCourses,
      },
    });
  } catch (error) {
     return res.status(500).json({
       success: false,
       message: error.message,
     });
  }
};

    