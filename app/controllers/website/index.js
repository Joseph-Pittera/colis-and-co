const websiteController = {
  getHome: (_, res) => {
    res.send('hello world!');
  },
};

module.exports = websiteController;
