"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
exports.TimeUtils = void 0;
const moment_1 = __importDefault(require("moment"));

class TimeUtils {
}

exports.TimeUtils = TimeUtils;
TimeUtils.PATTERN_TIME_HUMAN = "HH:mm";
TimeUtils.PATTERN_DATE_TIME_HUMAN = "D.M.YYYY HH:mm";
TimeUtils.PATTERN_DATE_HUMAN = "D.M.YYYY";
TimeUtils.PATTERN_DATE_TIME_HUMAN_SHORT = "D.M. HH:mm";
TimeUtils.moment = moment_1.default;
//# sourceMappingURL=TimeUtils.js.map