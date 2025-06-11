// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

let wisataList = [
  {
    name: 'Candi Prambanan',
    address: 'Jl. Raya Solo - Yogyakarta No.16, Klaten',
    lat: -7.7520,
    lng: 110.4910
  },
  {
    name: 'Malioboro',
    address: 'Jl. Malioboro, Yogyakarta',
    lat: -7.7928,
    lng: 110.3658
  },
  {
    name: 'Keraton Yogyakarta',
    address: 'Jl. Rotowijayan Blok No.1, Yogyakarta',
    lat: -7.8056,
    lng: 110.3649
  },
  {
    name: 'Taman Sari',
    address: 'Jl. Tamanan, Patehan, Yogyakarta',
    lat: -7.8076,
    lng: 110.3588
  },
  {
    name: 'Candi Ratu Boko',
    address: 'Jl. Raya Piyungan - Prambanan, Sleman',
    lat: -7.7702,
    lng: 110.4915
  },
  {
    name: 'Pantai Parangtritis',
    address: 'Kretek, Bantul, Yogyakarta',
    lat: -8.0265,
    lng: 110.3287
  },
  {
    name: 'Alun-Alun Kidul',
    address: 'Patehan, Kraton, Yogyakarta',
    lat: -7.8090,
    lng: 110.3645
  },
  {
    name: 'Museum Ullen Sentalu',
    address: 'Jl. Boyong, Kaliurang Barat, Sleman',
    lat: -7.5862,
    lng: 110.4308
  },
  {
    name: 'Goa Pindul',
    address: 'Bejiharjo, Karangmojo, Gunungkidul',
    lat: -7.9297,
    lng: 110.6301
  },
  {
    name: 'Hutan Pinus Mangunan',
    address: 'Dlingo, Bantul, Yogyakarta',
    lat: -7.8907,
    lng: 110.4210
  }
];

io.on('connection', (socket) => {
  socket.emit('initData', wisataList);

  socket.on('addWisata', (data) => {
    wisataList.push(data);
    io.emit('newWisata', data); // Broadcast to all clients
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
