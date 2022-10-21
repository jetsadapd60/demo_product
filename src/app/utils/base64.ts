export class Base64 {
    // ตัดส่วนด้านหน้าของไฟล์ base64
    // ตัดตามชนิดไฟล์
    static modify(base64: string): string {

        if (base64.includes("png")) {
            const textCut = "data:image/png;base64,";
            console.log("png")
            return base64.substring(textCut.length+1);
        }

        const textCut = "data:image/jpeg;base64,";
        console.log("jpeg")
        return base64.substring(textCut.length);

    }
}