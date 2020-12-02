// add new functions to another module

require("./originalModule").addNewFunction = () => {
  console.log("This is function add by monkey patching module");
};
