const getUser = (email) => {
    if(email) {
        return {
            email: "ananth@gmail.com",
            password: "nullvoid"
        }
    }
    else {
        return false
    }
}

module.exports = { getUser }