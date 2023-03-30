const websiteController = {
  getHome: (_, res) => {
    res.send(hello);
  },
};

module.exports = websiteController;
