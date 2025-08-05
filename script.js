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

function submitOrder() {
  if (cart.length === 0) {
    alert('សូមជ្រើសរើសម្ហូបមុនបញ្ជូនកម្មង់។');
    return;
  }

  let summary = '📦 កម្មង់ថ្មី៖\n';
  cart.forEach(entry => {
    summary += `- ${entry.item} x${entry.qty} = $${entry.price * entry.qty}\n`;
  });
  summary += `\n💰 សរុប: $${total}`;

  const token = 'YOUR_BOT_TOKEN';       // 🛠️ ប្ដូរជា Bot Token របស់អ្នក
  const chat_id = '@SithEmoji';         // 🛠️ ឬ @channelname / ID
  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(summary)}`;

  fetch(url)
    .then(() => alert('📬 កម្មង់ត្រូវបានបញ្ជូនទៅ Telegram'))
    .catch(() => alert('❌ បរាជ័យក្នុងការបញ្ជូន'));
}

function sendTelegramMessage(item, qty, price) {
  const message = `មានកម្មង់ថ្មី៖ ${item} x${qty} = $${price * qty}`;
  const token = 'YOUR_BOT_TOKEN';      // អាចប្រើដូចខាងលើ
  const chat_id = 'YOUR_CHAT_ID';      // ឬ @SithEmoji
  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(message)}`;
  fetch(url);
}
