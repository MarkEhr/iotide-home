const catchAsync = require("../utils/catchAsync");

const getHealth = catchAsync( async (req, res) => {
    res.json({health: 1});
});

module.exports = {
    getHealth,
};
