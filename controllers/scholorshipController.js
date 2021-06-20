const { fail } = require("assert");
const fs = require("fs");
const { pathToFileURL } = require("url");
const Scholorship = require("./../models/scholorshipModel");
const APIfeatures = require("./../utils/apiFeatures");

exports.aliasScholorship = (req, res, next) => {
  req.query.latest = true;
  req.query.fields = "-latest,-__v";
  next();
};

exports.getScholorships = async (req, res) => {
  try {
    const features = new APIfeatures(Scholorship, req.query)
      .filter()
      .sort()
      .fieldLimiting()
      .paginate();
    const scholorships = await features.query;
    res.status(200).json({
      status: "success",
      data: {
        scholorships,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getScholorship = async (req, res) => {
  try {
    const scholorship = await Scholorship.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        scholorship,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data",
    });
  }
};

exports.updateScholorship = async (req, res) => {
  try {
    const scholorship = await Scholorship.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      result: "<updated>",
      data: {
        scholorship,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteScholorship = async (req, res) => {
  try {
    await Scholorship.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      result: "<deleted>",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createScholorship = async (req, res) => {
  try {
    const newScholorship = await Scholorship.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newScholorship,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
