const Helper = {
  validateLink: (link) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
    + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
    + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
    + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
    + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
    + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    return pattern.test(link);
  },
  validateEmail: (email) => {
    const pattern = new RegExp('[\\w-]+@[\\w-.]+.[a-zA-Z]{2,}$');
    return pattern.test(email);
  },
};

module.exports = Helper;
