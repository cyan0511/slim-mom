const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      console.error("Error in controller:", error); // Log the error
      next(error);
    }
  };
  return func;
};

export { ctrlWrapper };
