//ye ( promices ) vala hai

const asyncHandler = (func) => {
  return (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch((err) => {});
  };
};

export { asyncHandler };

//ye (async-await) try-catch block vala hai
/*
const asyncHandler = (func) => async (req,res,next) => {
try {
    await func(req,res,next)
} catch (error) {
    res
    .status(error.code || 500)
    .json({
        success:false,
        message:err.message
    })
}
}

*/
