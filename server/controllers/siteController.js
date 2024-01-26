const { siteService } = require("../services");

const siteController = {
  postSiteArgs: async (req, res, next) => {
    try {
      const site = await siteService.postSiteArgs(req.body);

      res.json(site);
    } catch (error) {
      next(error);
    }
  },
  getSiteArgs: async (req, res, next) => {
    try {
      const site = await siteService.getSiteArgs();

      res.json(site);
    } catch (error) {
      next(error);
    }
  },
  updateSiteArgs: async (req, res, next) => {
    try {
      const site = await siteService.updateSiteArgs(req.body);

      res.json(site);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = siteController;
