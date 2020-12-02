
const originalModule = require("./originalModule");
require("./monkeyPatching");
originalModule.addNewFunction();
