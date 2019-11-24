class NotFoundError extends Error {
  constructor(message = 'Ресурс не найден') {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
