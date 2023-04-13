const websiteController = {
  getHome: (_, res) => {
    res.redirect('/api-docs');
  },
};

module.exports = websiteController;
