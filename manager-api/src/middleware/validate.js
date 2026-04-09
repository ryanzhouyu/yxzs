function sanitize(value) {
  if (typeof value !== 'string') {
    return value;
  }

  return value.replace(/<[^>]*>/g, '').trim();
}

function validate(fields, rules = {}) {
  return (req, res, next) => {
    const missing = fields.filter((field) => {
      const value = req.body[field];
      return value === undefined || value === null || value === '';
    });

    if (missing.length) {
      return res.status(400).json({ error: `缺少必填字段: ${missing.join(', ')}` });
    }

    for (const field of Object.keys(req.body)) {
      req.body[field] = sanitize(req.body[field]);
    }

    for (const [field, config] of Object.entries(rules)) {
      const value = req.body[field];
      if (value === undefined || value === null) {
        continue;
      }

      if (config.minLength && String(value).length < config.minLength) {
        return res.status(400).json({ error: `${field} 长度不能少于 ${config.minLength}` });
      }

      if (config.maxLength && String(value).length > config.maxLength) {
        return res.status(400).json({ error: `${field} 长度不能超过 ${config.maxLength}` });
      }

      if (config.pattern && !config.pattern.test(String(value))) {
        return res.status(400).json({ error: `${field} 格式不正确` });
      }
    }

    next();
  };
}

module.exports = validate;
