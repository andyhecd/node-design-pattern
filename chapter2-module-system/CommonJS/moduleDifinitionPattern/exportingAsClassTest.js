const exportingAsClass = require("./exportingAsClass");
const dbLogger = new exportingAsClass("DB");
dbLogger.info("This is an informational message");
const accessLogger = new exportingAsClass("ACCESS");
accessLogger.verbose("This is a verbose message");
