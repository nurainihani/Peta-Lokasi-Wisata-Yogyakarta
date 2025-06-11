const map = L.map('map').setView([-7.8, 110.37], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const socket = io();

socket.on('initData', (data) => {
  data.forEach(addMarker);
});

socket.on('newWisata', (data) => {
  addMarker(data);
  renderWisata(data);
});

function addMarker({ nama, alamat, deskripsi, lat, lng }) {
  const marker = L.marker([lat, lng]).addTo(map);
  marker.bindPopup(`<b>${nama}</b><br>${alamat}<br><i>${deskripsi}</i>`);
}

function renderWisata({ nama, alamat, deskripsi }) {
  const card = document.createElement("div");
  card.className = "bg-white rounded-xl shadow p-4 hover:shadow-md transition";
  card.innerHTML = `
    <h2 class="text-xl font-bold text-rose-700">${nama}</h2>
    <p class="text-sm text-gray-600 italic">${alamat}</p>
    <p class="text-gray-700 text-sm mt-1">${deskripsi}</p>
  `;
  document.getElementById("lokasi-list").appendChild(card);
}

document.getElementById("form-wisata").addEventListener("submit", function(e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const alamat = document.getElementById("alamat").value.trim();
  const deskripsi = document.getElementById("deskripsi").value.trim();
  const lat = parseFloat(document.getElementById("lat").value);
  const lng = parseFloat(document.getElementById("lng").value);

  if (!nama || !alamat || !deskripsi || isNaN(lat) || isNaN(lng)) {
    alert("Harap isi semua field dengan benar.");
    return;
  }

  const lokasiBaru = { nama, alamat, deskripsi, lat, lng };

  // Emit ke server
  socket.emit('addWisata', lokasiBaru);

  // Render di sisi client
  addMarker(lokasiBaru);
  renderWisata(lokasiBaru);

  // Bersihkan form
  e.target.reset();
});
