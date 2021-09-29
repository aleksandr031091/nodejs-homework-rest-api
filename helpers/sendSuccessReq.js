const sendSuccessReq = (res, data, code = 200, status = "succes") => {
  res.status(code).json({
    status,
    code,
    data,
  });
};

module.exports = sendSuccessReq;
