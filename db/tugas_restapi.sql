-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 13 Sep 2024 pada 17.13
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tugas_restapi`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id`, `nama`, `email`, `password`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, 'Jidan', 'Jidan@gmail.com', '$2b$10$5USFN.OmHOLJCXhqK.aKLeUwxswrJx2woRC0wneB7vTw5o.XDQL6e', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxLCJuYW1hIjoiSmlkYW4iLCJlbWFpbCI6IkppZGFuQGdtYWlsLmNvbSIsImlhdCI6MTcyNjIzOTIyMiwiZXhwIjoxNzI2MzI1NjIyfQ.DznDyTQ0q7IhiC5Hh8aetkk6DjVfjRzDXjEGREGlVJk', '2024-09-13 14:46:40', '2024-09-13 14:53:42'),
(2, 'Bagas Purwantoro', 'bagasajah23@gmail.com', '$2b$10$oQBU.oD5EXogPh//r24eneR/cRQhOvD7hxnMysr.xSlNavsEbofyK', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoyLCJuYW1hIjoiQmFnYXMgUHVyd2FudG9ybyIsImVtYWlsIjoiYmFnYXNhamFoMjNAZ21haWwuY29tIiwiaWF0IjoxNzI2MjM5OTE4LCJleHAiOjE3MjYzMjYzMTh9.I449sfHUVURtTZ8qqqRvMT4TC3LWUA6OjEq9V4yJKsM', '2024-09-13 14:48:55', '2024-09-13 15:05:18');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kendaraan`
--

CREATE TABLE `kendaraan` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `merk` varchar(255) NOT NULL,
  `nomer_plat` varchar(255) NOT NULL,
  `tahun_pembuatan` int(11) NOT NULL,
  `kategori` varchar(255) NOT NULL,
  `harga` int(11) NOT NULL,
  `tipe` varchar(255) NOT NULL,
  `warna` varchar(255) NOT NULL,
  `gambar` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kendaraan`
--

INSERT INTO `kendaraan` (`id`, `nama`, `merk`, `nomer_plat`, `tahun_pembuatan`, `kategori`, `harga`, `tipe`, `warna`, `gambar`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Astrea', 'honda', 'B 1456 CI', 2002, 'sepeda motor', 30000, 'Astrea 700', 'hitam', 'https://img4.icarcdn.com/851531/prev-desktop_10-motor-honda-astrea-yang-pernah-dijual-di-indonesia-mulai-astrea-700-sampai-legenda-2-135158_000000851531_befd901e_4c61_4078_b5d5_00eeaeb36ac9.jpg', 1, '2024-09-13 14:46:40', '2024-09-13 14:46:40'),
(2, 'Civic', 'honda', 'AD 5664 MWQ', 2018, 'mobil', 2000000, 'R', 'merah', 'https://img5.icarcdn.com/1203436/gallery_used-car-mobil123-honda-civic-type-r-hatchback-indonesia_1203436_t34TSEVBbgfY396Ru7fkkp.jpg?smia=xTM', 0, '2024-09-13 14:46:40', '2024-09-13 14:46:40'),
(3, 'nMax', 'yamaha', 'B 2312 lM', 2018, 'sepeda motor', 500000, 'Turbo', 'hitam', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqS-e1qHZ-g1-MMCrMC_SEC9La_Ej281Lh0g&s', 1, '2024-09-13 14:46:40', '2024-09-13 15:01:56');

-- --------------------------------------------------------

--
-- Struktur dari tabel `peminjaman`
--

CREATE TABLE `peminjaman` (
  `id` int(11) NOT NULL,
  `tanggal_peminjaman` datetime NOT NULL,
  `tanggal_pengembalian` datetime NOT NULL,
  `total_harga` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `AdminId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `KendaraanId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `peminjaman`
--

INSERT INTO `peminjaman` (`id`, `tanggal_peminjaman`, `tanggal_pengembalian`, `total_harga`, `status`, `createdAt`, `updatedAt`, `AdminId`, `UserId`, `KendaraanId`) VALUES
(1, '2024-03-01 00:00:00', '2024-03-03 00:00:00', 90000, 0, '2024-09-13 14:46:40', '2024-09-13 14:46:40', 1, 1, 1),
(2, '2024-03-02 00:00:00', '2024-03-04 00:00:00', 400000, 1, '2024-09-13 14:46:40', '2024-09-13 14:46:40', 1, 1, 2),
(3, '2024-03-01 00:00:00', '2024-03-03 00:00:00', 150000, 0, '2024-09-13 14:57:13', '2024-09-13 15:01:56', 2, 2, 3);

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengembalian`
--

CREATE TABLE `pengembalian` (
  `id` int(11) NOT NULL,
  `tanggal_dikembalikan` datetime NOT NULL,
  `denda` int(11) NOT NULL,
  `kondisi` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PeminjamanId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pengembalian`
--

INSERT INTO `pengembalian` (`id`, `tanggal_dikembalikan`, `denda`, `kondisi`, `createdAt`, `updatedAt`, `PeminjamanId`) VALUES
(1, '2024-03-05 00:00:00', 0, 'baik seperti semula', '2024-09-13 14:46:40', '2024-09-13 14:46:40', 1),
(2, '2024-03-03 00:00:00', 0, 'baik seperti semula', '2024-09-13 15:01:56', '2024-09-13 15:01:56', 3);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `no_ktp` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `nama`, `telephone`, `email`, `alamat`, `no_ktp`, `createdAt`, `updatedAt`) VALUES
(1, 'Dava indos', '089765465467', 'davakeren12@gmail.com', 'Gg Rais, Pamulang, Tangerang Selatan', 6777493, '2024-09-13 14:46:39', '2024-09-13 14:59:39'),
(2, 'samsudin ucup', '089677895467', 'samsudinKece@gmail.com', 'Gg Rais, Pamulang, Tangerang Selatan', 6777493, '2024-09-13 14:47:19', '2024-09-13 14:47:19');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `kendaraan`
--
ALTER TABLE `kendaraan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `peminjaman`
--
ALTER TABLE `peminjaman`
  ADD PRIMARY KEY (`id`),
  ADD KEY `AdminId` (`AdminId`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `KendaraanId` (`KendaraanId`);

--
-- Indeks untuk tabel `pengembalian`
--
ALTER TABLE `pengembalian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PeminjamanId` (`PeminjamanId`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `kendaraan`
--
ALTER TABLE `kendaraan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `peminjaman`
--
ALTER TABLE `peminjaman`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `pengembalian`
--
ALTER TABLE `pengembalian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `peminjaman`
--
ALTER TABLE `peminjaman`
  ADD CONSTRAINT `peminjaman_ibfk_1` FOREIGN KEY (`AdminId`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `peminjaman_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `peminjaman_ibfk_3` FOREIGN KEY (`KendaraanId`) REFERENCES `kendaraan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pengembalian`
--
ALTER TABLE `pengembalian`
  ADD CONSTRAINT `pengembalian_ibfk_1` FOREIGN KEY (`PeminjamanId`) REFERENCES `peminjaman` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
