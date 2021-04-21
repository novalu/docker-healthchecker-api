import moment from "moment";
declare class TimeUtils {
    static readonly PATTERN_TIME_HUMAN = "HH:mm";
    static readonly PATTERN_DATE_TIME_HUMAN = "D.M.YYYY HH:mm";
    static readonly PATTERN_DATE_HUMAN = "D.M.YYYY";
    static readonly PATTERN_DATE_TIME_HUMAN_SHORT = "D.M. HH:mm";
    static moment: typeof moment;
}
export { TimeUtils };
