const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
require('dotenv').config();


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Data sementara menggunakan array
let dataKunjungan = [
  { id: 1, tanggal: "2024-11-20", jumlah: 4, paket: "Family", harga: 200000 },
  { id: 2, tanggal: "2024-11-21", jumlah: 2, paket: "Couple", harga: 100000 },
];

// Routes
app.get("/", (req, res) => {
  res.render("index", { data: dataKunjungan });
});

app.post("/tambah", (req, res) => {
  const { tanggal, jumlah, paket, harga } = req.body;
  const id = dataKunjungan.length ? dataKunjungan[dataKunjungan.length - 1].id + 1 : 1;
  dataKunjungan.push({
    id,
    tanggal,
    jumlah: parseInt(jumlah),
    paket,
    harga: parseInt(harga),
  });
  res.redirect("/");
});

app.post("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { tanggal, jumlah, paket, harga } = req.body;
  const kunjungan = dataKunjungan.find((item) => item.id === id);
  if (kunjungan) {
    kunjungan.tanggal = tanggal;
    kunjungan.jumlah = parseInt(jumlah);
    kunjungan.paket = paket;
    kunjungan.harga = parseInt(harga);
  }
  res.redirect("/");
});

app.post("/hapus/:id", (req, res) => {
  const id = parseInt(req.params.id);
  dataKunjungan = dataKunjungan.filter((item) => item.id !== id);
  res.redirect("/");
});

// Start server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
