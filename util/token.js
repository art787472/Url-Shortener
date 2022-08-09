const getToken = (length) => {
  
  let token = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  const n = length || 5
  for (let i = 0; i < n; i++) {
      token += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return token
}

module.exports = getToken