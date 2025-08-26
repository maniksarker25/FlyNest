import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import ClassService from "./class.services";

const createClass = catchAsync(async (req, res) => {
  const result = await ClassService.craeteClassIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Class created successfully",
    data: result,
  });
});
const enrollAStudentToClass = catchAsync(async (req, res) => {
  const result = await ClassService.enrollAStudentToClass(
    req.params.id,
    req.body.studentId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student enrolled successfully",
    data: result,
  });
});

const ClassController = {
  createClass,
  enrollAStudentToClass,
};

export default ClassController;
