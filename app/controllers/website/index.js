const websiteController = {
  getHome: (_, response) => {
    response.redirect('/api-docs');
  },
};

module.exports = websiteController;
