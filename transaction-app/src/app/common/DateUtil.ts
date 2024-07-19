export class DateUtil {

  public static getFormattedDate(date: string): string {
    return new Date(date).toLocaleString();
  }
}
