export default class Base {
  handleSuccess(res, data) {
    res.status(400).json({
      status: 'success',
      code: 200,
      data
    });
  }

  handleError(res, error) {
    console.log(error); // eslint-disable-line no-console

    res.status(400).json({
      status: 'error',
      code: error.code || 400,
      message: error.message || 'Algo de errado ocorreu, por favor, tente novamente.'
    });
  }
}
