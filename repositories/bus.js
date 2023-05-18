import Exception from "../exceptions/Exception.js";
import { Bus } from "../models/index.js";
import { print, OutputType } from "../helpers/print.js";

const getAllBusses = async ({ page, size, searchString }) => {
  // aggregate data for all students
  page = parseInt(page);
  size = parseInt(size);
  // searchString? name, route
  let filteredBusses = await Bus.aggregate([
    {
      $match: {
        $or: [
          {
            name: { $regex: `.*${searchString}.*`, $options: "i" }, //ignore case
          },
          {
            slug: { $regex: `.*${searchString}.*`, $options: "i" }, //ignore case
          },
        ],
      },
    },
    {
      $skip: (page - 1) * size,
    },
    {
      $limit: size,
    },
  ]);
  return filteredBusses;
};

const insertBus = async ({
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
}) => {
  try {
    const bus = await Bus.create({
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
    });
    return bus;
  } catch (exception) {
    if (!!exception.errors) {
      //error from validation
      throw new Exception("Input error", exception.errors);
    }
  }
};

async function insertMultiple(receivedBusses) {
  try {
    debugger
    let busses = [];
    for (let i = 0; i < receivedBusses.length; i++) {
      let bus = {
        name: receivedBusses[i].name,
        unit: receivedBusses[i].unit,
        length: receivedBusses[i].length,
        route: receivedBusses[i].route,
        phoneNumber: receivedBusses[i].phoneNumber,
        time: receivedBusses[i].time,
        routeNumber: receivedBusses[i].routeNumber,
        spacing: receivedBusses[i].spacing,
        slug: receivedBusses[i].slug,
      };
      busses.push(bus);
    }
    debugger;
    await Bus.insertMany(busses);
  } 
  catch (exception) {
    if (!!exception.errors) {
      debugger;
      //error from validation
      throw new Exception("Input error", exception.errors);
    }
  }
}

const deleteAllBusses = async () => {
  try {
    const result = await Bus.deleteMany({});
    return result;
  } catch (exception) {
    throw new Exception("Error deleting all busses");
  }
};

const deleteBus = async (id) => {
  try {
    const result = await Bus.findByIdAndDelete(id);
    if (!result) {
      throw new Exception("Cannot find bus with id " + id);
    }
    return result;
  } catch (exception) {
    throw new Exception("Error deleting bus with id " + id);
  }
};

const getBusById = async (busId) => {
  const bus = await Bus.findById(busId);
  if (!bus) {
    throw new Exception("Cannot find bus with id " + busId);
  }
  return bus ?? {}; // default value
};

const getBusBySlug = async (busSlug) => {
  try {
    const bus = await Bus.find({ slug: busSlug });
    if (!bus) {
      return [];
    }
    return bus;
  } catch (exception) {
    throw new Exception("Error...");
  }
};

const updateBus = async ({
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
}) => {
  const bus = await Bus.findById(id);
  bus.name = name ?? bus.name;
  bus.unit = unit ?? bus.unit;
  bus.length = length ?? bus.length;
  bus.route = route ?? bus.route;
  bus.phoneNumber = phoneNumber ?? bus.phoneNumber;
  bus.time = time ?? bus.time;
  bus.routeNumber = routeNumber ?? bus.routeNumber;
  bus.spacing = spacing ?? bus.spacing;
  bus.slug = slug ?? bus.slug;
  await bus.save();
  return bus;
};

export default {
  getAllBusses,
  insertBus,
  insertMultiple,
  deleteBus,
  deleteAllBusses,
  getBusById,
  getBusBySlug,
  updateBus,
};
