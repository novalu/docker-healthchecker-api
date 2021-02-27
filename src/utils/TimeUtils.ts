import moment from "moment";

class TimeUtils {
  public static readonly PATTERN_TIME_HUMAN = "HH:mm";
  public static readonly PATTERN_DATE_TIME_HUMAN = "D.M.YYYY HH:mm";
  public static readonly PATTERN_DATE_HUMAN = "D.M.YYYY";
  public static readonly PATTERN_DATE_TIME_HUMAN_SHORT = "D.M. HH:mm";

  public static moment = moment;
}

export { TimeUtils };
