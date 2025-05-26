function parseFeatures(raw) {
  if (!raw) return []

  const str = Array.isArray(raw) ? raw[0] : raw

  return str
    .split(/[,;\n]/) // bisa pakai koma, titik koma, atau newline
    .map(f => f.trim())
    .filter(f => f.length > 0)
}

function parseRequirements(raw) {
  if (!raw) return []

  const str = Array.isArray(raw) ? raw[0] : raw

  return str
    .split(/[,;\n]/)
    .map(r => r.trim())
    .filter(r => r.length > 0)
}

export {
  parseFeatures,
  parseRequirements
}