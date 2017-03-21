/**
 * DateArrBuilder
 * builds dates into the format to be stored in the database
 */
export class DateArrBuilder {
  public static build(year: number, month: number, day: number, hour: number, min: number, sec: number) {
    let date_arr = []
    date_arr.push(year);
    date_arr.push(month);
    date_arr.push(day);
    date_arr.push(min);
    date_arr.push(hour);
    date_arr.push(sec);
    return date_arr
  }
}