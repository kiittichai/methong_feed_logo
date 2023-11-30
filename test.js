// เชื่อมต่อ WebSocket
const socket = new WebSocket('wss://www.sctgold.com/primepush/productPrice/100/ONLINE/A');

// หา elements ของราคา
const priceAElement = document.getElementById('priceA');
const priceBElement = document.getElementById('priceB');
const priceCElement = document.getElementById('priceC');

// ราคา SCT Gold
const priceDElement = document.getElementById('priceD');
const priceEElement = document.getElementById('priceE');
const priceFElement = document.getElementById('priceF');


// สร้างตัวแปรเพื่อเก็บราคาก่อนหน้า
let previousTimestampSellPrice;
let previousTimestampSellPrice_1;

// เมื่อมีข้อมูลถึง
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    // ตรวจสอบว่ามีข้อมูลก่อนหน้าหรือไม่
    if (previousTimestampSellPrice !== null) {
        // ตรวจสอบว่ามีการเปลี่ยนแปลงจากค่า Timestamp ที่เท่ากับ 0 หรือไม่
        if (previousTimestampSellPrice === 0) {
            // ถ้าค่า Timestamp เท่ากับ 0 ให้แสดงค่าเป็นราคาก่อนหน้าที่ Timestamp เท่ากับราคาปัจจุบัน
            priceCElement.textContent = (data.productPriceDTOs[1].sellPrice - previousTimestampSellPrice_1).toFixed(2);
        } else {
            priceCElement.textContent
            // คำนวณและอัปเดตราคาที่เปลี่ยนแปลง (column C)
            const priceChange = data.productPriceDTOs[1].sellPrice - previousTimestampSellPrice;
            priceCElement.textContent = priceChange.toFixed(2); // แสดงเป็นทศนิยม 2 ตำแหน่ง
        }
    } else {
        // กรณีไม่มีข้อมูลก่อนหน้า ไม่สามารถคำนวณราคาที่เปลี่ยนแปลงได้
        priceCElement.textContent = '0';
    }

    // อัปเดตราคาก่อนหน้า (column A)
    priceAElement.textContent = data.productPriceDTOs[1].sellPrice;

    // อัปเดตราคาที่เปลี่ยนแปลง (column B)
    priceBElement.textContent = data.productPriceDTOs[1].buyPrice;

    // // อัปเดตราคาก่อนหน้าเป็นค่าปัจจุบัน
    previousTimestampSellPrice = data.productPriceDTOs[1].sellPrice;

};

// เมื่อเชื่อมต่อ WebSocket สำเร็จ
socket.onopen = () => {
    console.log('เชื่อมต่อ WebSocket สำเร็จ');
};

// เมื่อการเชื่อมต่อถูกปิด
socket.onclose = () => {
    console.log('การเชื่อมต่อ WebSocket ถูกปิด');
};
