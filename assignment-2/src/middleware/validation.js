const validateTask = (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
      const { name, status } = req.body;
      next();
    };
}    

module.exports = validateTask;