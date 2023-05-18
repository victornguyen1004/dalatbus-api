import { MAX_RECORDS } from "../Global/constants.js";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { busRepository } from "../repositories/index.js";

async function getAllBusses(req, res) {
  //http:localhost:3000?page=1&size=100
  // if user intend to pass 9999 to "size"
  let { page = 1, size = MAX_RECORDS, searchString = "" } = req.query;
  size = size >= MAX_RECORDS ? MAX_RECORDS : size;
  try {
    let filteredBusses = await busRepository.getAllBusses({
      size,
      page,
      searchString,
    });
    res.status(HttpStatusCode.OK).json({
      message: "Get all busses successfully",
      size: filteredBusses.length,
      page,
      searchString,
      data: filteredBusses,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
}

async function insertBus(req, res) {
  try {
    const bus = await busRepository.insertBus(req.body);
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Insert bus successfully",
      data: bus,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Cannot insert bus:" + exception,
      validationErrors: exception.validationErrors,
    });
  }
}

async function insertMultipleBusses(req, res) {
  try {
    await busRepository.insertMultiple(req.body);
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Insert multiple busses successfully",
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Cannot insert multiple busses:" + exception,
      validationErrors: exception.validationErrors,
    });
  }
}

//  deleteBus,
//   deleteAllBusses,
//   getBusById,

async function deleteBus(req, res) {
  debugger
  const id = req.body.id;
  try {
    const result = await busRepository.deleteBus(id);
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Bus deleted successfully",
      data: result,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
}

async function getBusById(req, res) {
  try {
    let busId = req.params.id;
    const bus = await busRepository.getBusById(busId);
    res.status(HttpStatusCode.OK).json({
      message: "Get bus by Id successfully",
      data: bus,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
}

async function getBusBySlug(req, res) {
  try {
    let busSlug = req.params.slug;
    const bus = await busRepository.getBusBySlug(busSlug);
    res.status(HttpStatusCode.OK).json({
      message: "Get bus by slug successfully",
      data: bus,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
}

async function deleteAllBusses(req, res) {
  try {
    const result = await busRepository.deleteAllBusses();
    res.status(HttpStatusCode.OK).json({
      message: "All busses deleted successfully",
      data: result,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    });
  }
}

async function updateBus(req, res) {
  const {
    id,
    name,
    unit,
    length,
    route,
    phoneNumber,
    time,
    routeNumber,
    spacing,
    slug,
  } = req.body;

  try {
    const updatedBus = await busRepository.updateBus(req.body);

    res.status(HttpStatusCode.OK).json({
      message: `Updated bus with id ${id} successfully`,
      data: updatedBus,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: `Error updating bus with id ${id}`,
      validationErrors: exception.validationErrors,
    });
  }
}

export default {
  getAllBusses,
  insertBus,
  insertMultipleBusses,
  deleteBus,
  deleteAllBusses,
  updateBus,
  getBusById,
  getBusBySlug,
};
