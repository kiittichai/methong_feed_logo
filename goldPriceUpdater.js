const ADODB = require('node-adodb');
const connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\Users\poom\Downloads\test (1)\Feed_Mehtong_Website\GoldPriceDB\database.accdb;Persist Security Info=False;');

const socket = new WebSocket('wss://www.sctgold.com/primepush/productPrice/100/ONLINE/A');

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    // ดึงราคาทองปัจจุบันและราคาก่อนหน้า
    const currentPrice = data.productPriceDTOs[2].sellPrice; // ตั้งตามโครงสร้างข้อมูลจริง
    const previousPrice = getPreviousPriceFromDatabase();

    // บันทึกราคาทองลงใน Access
    saveGoldPriceToDatabase(currentPrice, previousPrice);
};

function getPreviousPriceFromDatabase() {
    // ดึงราคาทองก่อนหน้าจาก Access
    const sql = 'SELECT TOP 1 GoldPrice FROM GoldPricesTable ORDER BY Date DESC';
    const result = connection.query(sql);
    return result.length > 0 ? result[0].GoldPrice : null;
}

function saveGoldPriceToDatabase(currentPrice, previousPrice) {
    // บันทึกราคาทองลงใน Access
    const sql = `INSERT INTO GoldPricesTable (Date, GoldPrice, PreviousPrice) VALUES (NOW(), ${currentPrice}, ${previousPrice})`;
    connection.execute(sql);
}
