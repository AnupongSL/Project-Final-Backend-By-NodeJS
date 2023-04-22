const managerService = require("../services/manager.services");

exports.getManager = async (req, res) => res.json(await managerService.findManagerAll());

exports.getManagerByID = async (req, res) => {
  const result = await managerService.findManagerByID(req.params.id)
  if(result.length>0){
    res.json(result[0])
  } else {
    res.status(404).json({})
  }
};

exports.addManager = async (req, res) =>
  res.status(201).json(await managerService.findAddManager(req.body));

exports.updateManager = async (req, res) => {
  const result = await managerService.findUpdateManager(req.params.id, req.body);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({});
  }
};

exports.deleteManager = async (req, res) => {
  const result = await managerService.findDeleteManager(req.params.id)
  if (result) {
    res.status(204).json()
  } else {
    res.status(404).json({})
  }
};
