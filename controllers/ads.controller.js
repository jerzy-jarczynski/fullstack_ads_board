const fs = require('fs');
const escapeHtml = require('escape-html');
const getImageFileType = require("../utils/getImageFileType");
const Ad = require('../models/Ad.model');

// GET
exports.getAll = async (req, res) => {
  try {
    const adv = await Ad.find().populate('seller');
    res.json(adv);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const adv = await Ad.findById(req.params.id).populate('seller');
    if(!adv) res.status(404).json({ message: 'Not found...' });
    else res.json(adv);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getBySearchPhrase = async (req, res) => {
  const searchPhrase = req.params.searchPhrase;

  // Validation
  if (!searchPhrase || searchPhrase.trim().length === 0) {
    return res.status(400).json({ message: "Search phrase is required and cannot be empty." });
  }

  // Construct the aggregation
  const aggregation = [
    {
      $lookup: {
        from: "users", // Adjust this to the actual name of your users collection
        localField: "seller",
        foreignField: "_id",
        as: "sellerData"
      }
    },
    {
      $match: {
        $or: [
          { title: { $regex: searchPhrase, $options: 'i' } },
          { content: { $regex: searchPhrase, $options: 'i' } },
          { location: { $regex: searchPhrase, $options: 'i' } },
          { "sellerData.login": { $regex: searchPhrase, $options: 'i' } }, // Assuming 'name' is the field you want to search in User collection
        ]
      }
    }
  ];

  try {
    const results = await Ad.aggregate(aggregation);
    res.json({ results: results });
  } catch (err) {
    console.error("Error fetching advertisements:", err);
    res.status(500).json({ message: "An error occurred while processing your request." });
  }
};
  
// POST
exports.addNew = async (req, res) => {
  try {
    const { title, description, publishDate, price, location } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    const escapedTitle = escapeHtml(title);
    const escapedDescription = escapeHtml(description);
    const escapedDate = escapeHtml(publishDate);
    const escapedPrice = escapeHtml(price);
    const escapedLocation = escapeHtml(location);

    if (
      escapedTitle 
      && typeof escapedTitle === "string"
      && escapedTitle.length >= 10 
      && escapedTitle.length <= 50 
      && escapedDescription 
      && typeof escapedDescription === "string" 
      && escapedDescription.length >= 20 
      && escapedDescription.length <= 1000 
      && escapedDate 
      && typeof escapedDate === "string" 
      && escapedPrice 
      && typeof escapedPrice === "string" 
      && escapedLocation 
      && typeof escapedLocation === "string" 
      && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
    ) {
      const newAd = new Ad({
        title: escapedTitle,
        description: escapedDescription,
        publishDate: escapedDate,
        price: escapedPrice,
        image: req.file.filename,
        location: escapedLocation,
        seller: req.session.user.id
      });
      
      await newAd.save();
      res.json({ message: 'OK' });
    } else {
      if (req.file) {
        fs.unlinkSync(`${__dirname}/../public/uploads/${req.file.filename}`);
      }
      // I am getting this
      res.status(400).json({ message: "Bad request test" });
    }
  } catch (err) {
    console.error("Error while adding or updating the ad:", err); // It's good to log the error for debugging
    res.status(500).json({ message: "An error occurred while processing your request." });
  }
};

// PUT
exports.modifyById = async (req, res) => {
  const { title, content, publish_date, price, location } = req.body;

  try {
    const adv = await Ad.findById(req.params.id);
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    // Input validation and ad ownership check
    const escapedTitle = escapeHtml(title);
    const escapedContent = escapeHtml(content);
    const escapedDate = escapeHtml(publish_date);
    const escapedPrice = escapeHtml(price);
    const escapedLocation = escapeHtml(location);

    if (
      adv
      && adv.userId === req.session.user.id
      && title
      && content
      && publish_date
      && price
      && location
      && (escapedTitle.length >= 10 && escapedTitle.length <= 50)
      && (escapedContent.length >= 20 && escapedContent.length <= 1000)
      && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
    ) {
      if (req.file) {
        // Delete the old image
        fs.unlinkSync(`./public/uploads/${adv.image}`);
        adv.image = req.file.filename;
      }

      adv.title = escapedTitle;
      adv.description = escapedContent;
      adv.publishDate = escapedDate;
      adv.price = escapedPrice;
      adv.location = escapedLocation;

      await adv.save();
      res.json({ message: 'OK' });

    } else {

      if (req.file) {
        fs.unlinkSync(`${__dirname}/../public/uploads/${req.file.filename}`);
      }

      res.status(400).json({ message: "Bad request or you don't have permission to edit this ad." });
    }
  } catch (err) {
    console.error("Error while updating the ad:", err); // Logging for debugging
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.removeById = async (req, res) => {
  try {
    const adv = await Ad.findById(req.params.id);
    if(adv && (req.session.userId === adv.seller.toString())) {  // <-- modified here
      // If there's an image, delete it from the filesystem
      if (adv.image) {
        fs.unlinkSync(`./public/uploads/${adv.image}`);
      }

      await Ad.deleteOne({ _id: req.params.id });
      res.json({ deletedAd: adv });
    } else {
      res.status(401).json({ message: "You do not have access to delete this ad or ad not found." });
    }
  }
  catch(err) {
    console.error("Error deleting advertisement:", err);
    res.status(500).json({ message: err.message });
  }
};

