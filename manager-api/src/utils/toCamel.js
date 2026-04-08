function toCamelKey(str) {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

function toCamel(row) {
  if (!row) return row;
  const out = {};
  for (const [k, v] of Object.entries(row)) {
    out[toCamelKey(k)] = v;
  }
  return out;
}

function toCamelArray(rows) {
  return rows.map(toCamel);
}

module.exports = { toCamel, toCamelArray };
