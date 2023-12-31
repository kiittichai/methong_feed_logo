// เชื่อมต่อ WebSocket
const socket = new WebSocket('wss://www.sctgold.com/primepush/productPrice/100/ONLINE/A');

// สร้างฟังก์ชันเพื่ออัปเดตราคาและแสดงที่แสดงราคาที่เปลี่ยนแปลง
function updatePrice(priceElement, buyElement, productData) {
    const newSellPrice = productData.sellPrice;

    // อัปเดตราคาขาย (column A)
    priceElement.textContent = formatPrice(newSellPrice);

    // อัปเดตราคาซื้อ (column B)
    buyElement.textContent = formatPrice(productData.buyPrice);
}

// สร้างฟังก์ชันเพื่อใส่ , ในหลักพัน
function formatPrice(price) {
    const formattedPrice = price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return formattedPrice;
}

// หา elements ของราคา
const priceAElement = document.getElementById('priceA');
const priceBElement = document.getElementById('priceB');
const priceCElement = document.getElementById('priceC');
const priceDElement = document.getElementById('priceD');
const priceEElement = document.getElementById('priceE');
const priceFElement = document.getElementById('priceF');
const priceGElement = document.getElementById('priceG');
const priceHElement = document.getElementById('priceH');
const priceIElement = document.getElementById('priceI');
const priceJElement = document.getElementById('priceJ');
const priceKElement = document.getElementById('priceK');
const priceLElement = document.getElementById('priceL');
const priceMElement = document.getElementById('priceM');
const priceNElement = document.getElementById('priceN');
const priceOElement = document.getElementById('priceO');
const pricePElement = document.getElementById('priceP');


// เมื่อมีข้อมูลถึง
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    // อัปเดตราคาขายและราคาซื้อของแต่ละสินค้า
    updatePrice(priceAElement, priceBElement, data.productPriceDTOs[2]);
    updatePrice(priceCElement, priceDElement, data.productPriceDTOs[5]);
    updatePrice(priceEElement, priceFElement, data.productPriceDTOs[7]);
    updatePrice(priceGElement, priceHElement, data.productPriceDTOs[14]);
    updatePrice(priceIElement, priceJElement, data.productPriceDTOs[15]);
    updatePrice(priceKElement, priceLElement, data.productPriceDTOs[6]);
    updatePrice(priceMElement, priceNElement, data.productPriceDTOs[0]);
    updatePrice(priceOElement, pricePElement, data.productPriceDTOs[3]);
};

// เมื่อเชื่อมต่อ WebSocket สำเร็จ
socket.onopen = () => {
    console.log('เชื่อมต่อ WebSocket สำเร็จ');
};

// เมื่อการเชื่อมต่อถูกปิด
socket.onclose = () => {
    console.log('การเชื่อมต่อ WebSocket ถูกปิด');
};

// สร้างฟังก์ชันเพื่ออัปเดตราคาและแสดงที่แสดงราคาที่เปลี่ยนแปลง
function updatePrice(priceElement, buyElement, productData) {
    const newSellPrice = productData.sellPrice;

    // อัปเดตราคาขาย (column A)
    priceElement.textContent = formatPrice(newSellPrice);

    // อัปเดตราคาซื้อ (column B)
    buyElement.textContent = formatPrice(productData.buyPrice);
}

// สร้างฟังก์ชัน updateDateTime ที่ return updateTime
function updateDateTime() {
    const updateTime = new Date();

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };

    const formattedDateTime = new Intl.DateTimeFormat('th-TH', options).format(updateTime);

    // คืนค่า updateTime ถ้าต้องการให้ตัวแปรนี้สามารถใช้งานต่อไป
    return updateTime;
}

// เรียกใช้ฟังก์ชันเพื่ออัปเดตวันที่และเวลาและเก็บค่า updateTime
const updateTime = updateDateTime();

// ใช้ updateTime ในการอัปเดต element บนหน้าเว็บ
const updateTimeElement = document.getElementById('updateTimeElement');
updateTimeElement.textContent = `อัปเดต : ${updateTime.toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} เวลา ${updateTime.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.`;





