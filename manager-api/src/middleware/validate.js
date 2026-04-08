function validate(fields) {
  return (req, res, next) => {
    const missing = fields.filter((f) => !req.body[f]);
    if (missing.length) {
      return res.status(400).json({ error: `缺少必填字段: ${missing.join(', ')}` });
    }
    next();
  };
}

module.exports = validate;
