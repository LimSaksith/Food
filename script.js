let cart = [];
let total = 0;

function addToCart(item, price, qtyInputId) {
  const qty = parseInt(document.getElementById(qtyInputId).value);
  if (qty > 0) {
    cart.push({ item, price, qty });
    total += price * qty;
    renderCart();
    sendTelegramMessage(item, qty, price);
  }
}

function renderCart() {
  const list = document.getElementById('cart-list');
  list.innerHTML = '';
  cart.forEach(entry => {
    const li = document.createElement('li');
    li.innerText = `${entry.item} x${entry.qty} - $${entry.price * entry.qty}`;
    list.appendChild(li);
  });
  document.getElementById('total').innerText = `សរុប: $${total}`;
}

function showQR() {
  document.getElementById('qr-section').style.display = 'block';
}

function sendTelegramMessage(item, qty, price) {
  const message = `មានកម្មង់ថ្មី៖ ${item} x${qty} = $${price * qty}`;
  const token = 'YOUR_BOT_TOKEN'; // ប្ដូរជា Bot Token របស់អ្នក
  const chat_id = 'YOUR_CHAT_ID'; // ប្ដូរជា Chat ID របស់អ្នក
  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(message)}`;
  fetch(url);
}
