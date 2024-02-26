import data from "../mocks/carMock.js";
const seedVehicles = async () => {
  data.map((item) => {
    let newVehicle = new Vehicle(item);
    newVehicle.save();
  });
};
const deleteAll = async () => {
  console.log("data", data.length);
  for (let item of data) {
    console.log("item", item);
    let deleteVehicle = await Vehicle.findOneAndDelete(item.plate);
  }
};
