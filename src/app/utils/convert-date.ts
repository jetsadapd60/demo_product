export abstract class ConverDate {
  static readonly MONTH = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ];

  // 1983-03-15
  static thaiToGlobal(date: any): string {
    let birthDay = "";
    if (date) {
      let takeOnlyDate: string[] = (date as string).substring(0,10).split("-");
      birthDay = `${takeOnlyDate[2]} ${ConverDate.numberToMonth(takeOnlyDate[1])} ${ConverDate.adToBE(takeOnlyDate[0])}`;
    }
    return birthDay;
  }

    // 1983-03-15
    static globalTothai(date: any): string {
      return "";
    }

  // แปลงเลขเป็น เดือน
  static numberToMonth(numMonth: string): string {
    return ConverDate.MONTH[Number(numMonth) - 1];
  }

    // แปลง คศ เป็น พศ
    // AD คือ คศ
    // BE คือ พศ
    static adToBE(AD: string): string {
        return `${Number(AD) + 543}`;
      }
}
