const getToken = () => {
  const token = Math.floor(Math.random() * 99999).toString().padStart(5 ,'0')
  
  return token
}

module.exports = getToken