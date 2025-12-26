const getAllUser = async (req, res) => {
    try {
        const user = req.user
        const users = await User.find({ _id: { $ne: user._id } })
        if (!users) {
            res.status(400).json({
                sucess: false,
                meassage: "users not found"
            })
        }
        res.status(200).json({
            sucess: true,
            all: users
        })
    } catch (err) {
        res.status(500).json({
            sucess: false,
            meassage: 'something want wrong'
        })
    }
}

module.exports ={getAllUser}