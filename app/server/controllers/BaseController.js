const BaseController = (req, res, next) => {
  const now = +new Date();
  const uptime = now - req.app.START_TIME
  res.status(200).json({uptime});
}

module.exports = BaseController;
