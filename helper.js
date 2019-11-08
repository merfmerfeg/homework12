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
  getErrorNumber: (err) => {
    let errNumber;

    // Ошибка валидации
    if (err.name === 'ValidationError') {
      errNumber = 400;
    // Ошибка при обработке запроса в БД (одинаковые емэйл, например)
    } else if (err.name === 'MongoError') {
      errNumber = 400;
    // Прочие ошибки
    } else {
      errNumber = 500;
    }
    return errNumber;
  },
};

module.exports = Helper;
