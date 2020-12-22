-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 22, 2020 at 02:57 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.3.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `api_zwallet`
--

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `id_profile` int(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT '/default/picture.png',
  `phone` varchar(13) DEFAULT NULL,
  `pin` varchar(6) DEFAULT NULL,
  `balance` int(255) DEFAULT 0,
  `verified` tinyint(1) NOT NULL DEFAULT 0,
  `role` int(3) NOT NULL DEFAULT 20,
  `device_token` varchar(999) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`id_profile`, `name`, `email`, `password`, `photo`, `phone`, `pin`, `balance`, `verified`, `role`, `device_token`) VALUES
(1, 'Drajat Fikri Alfianto', 'drajat@gmail.com', '$2b$10$NTXE5eDkU/zCo0jbaKTFzuThyXO.PhbHOq1r6we.HjQ9hRcCou0Su', '1607626142250-6TmQoM902D.jpg', '0895358084317', '111111', 89036, 0, 20, 'eaOr9neyTpqytyjzKLe_pz:APA91bG0vaUVgRY0dd9s4ULoMW60PPSNRwOd-0IaI33EvmNCHGgvjM9jQUEk9Ct7yCG-_6ybBIFlLc0PY5bV2Y-KRUZpByh9Ge6j442NOcPir88DqetQyaOwhBYIBoXvElxW7OpoYDTn'),
(2, 'Kipli Saprol', 'kipli@gmail.com', '$2b$10$352hsop1xyXtCMfiaRfQ4Op7QZDI0jG5oJ48NX/UxGN/Ct0.6i1zi', '/default/picture.png', NULL, '222222', 4213, 0, 20, 'eaOr9neyTpqytyjzKLe_pz:APA91bG0vaUVgRY0dd9s4ULoMW60PPSNRwOd-0IaI33EvmNCHGgvjM9jQUEk9Ct7yCG-_6ybBIFlLc0PY5bV2Y-KRUZpByh9Ge6j442NOcPir88DqetQyaOwhBYIBoXvElxW7OpoYDTn'),
(4, 'Peter Parker', 'peter@gmail.com', '$2b$10$KR2Dda3.I6CPHc.tQPGKwuRPIim15na8g3B082Ttimr0tAgXrAziq', '/default/picture.png', NULL, NULL, 1755, 0, 20, NULL),
(5, 'Jon Bon Jovi', 'jon@gmail.com', '$2b$10$s8lqIsga9lF/5Kum8X2wMuotTDUlDpSk4QwwxEDZ/7nGp/E26y2Gy', '/default/picture.png', NULL, NULL, 6642, 0, 20, NULL),
(6, 'Roma Irama', 'roma@gmail.com', '$2b$10$V7hrKUvKCDdq401mFx8js.wvuOO34L0Ksi6hgYz9iayR.mtlJ/lNS', '/default/picture.png', NULL, NULL, 22, 0, 20, NULL),
(7, 'Popuri', 'popuri@gmail.com', '$2b$10$IfAczDZdMlySeP8Ij4ZzyuyZoB2VnRIS.FORWg5z55JiFZO6A6Cle', '/default/picture.png', NULL, NULL, 2691, 0, 20, ''),
(8, 'Karen', 'karen@gmail.com', '$2b$10$rxK/ITH.P9A3zC/niDpYbOpvtYEkfVBgR3YTaK67sZzXxHoXouQRa', '/default/picture.png', NULL, NULL, 234, 0, 20, '');

-- --------------------------------------------------------

--
-- Table structure for table `topup`
--

CREATE TABLE `topup` (
  `id` int(20) NOT NULL,
  `number` int(20) NOT NULL,
  `step` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `topup`
--

INSERT INTO `topup` (`id`, `number`, `step`) VALUES
(44, 1, 'Go to the nearest ATM or you can use E-Banking.'),
(45, 2, 'Type your security number on the ATM or E-Banking.'),
(46, 3, 'Select “Transfer” in the menu'),
(47, 4, 'Type the virtual account number that we provide you at the top.'),
(48, 5, 'Type the amount of the money you want to top up.'),
(49, 6, 'Read the summary details'),
(50, 7, 'Press transfer / top up'),
(51, 8, 'You can see your money in Zwallet within 3 hours.');

-- --------------------------------------------------------

--
-- Table structure for table `transfer`
--

CREATE TABLE `transfer` (
  `id_sender` int(20) NOT NULL,
  `id_receiver` int(20) NOT NULL,
  `photo_receiver` varchar(50) NOT NULL,
  `name_receiver` varchar(100) NOT NULL,
  `id_transfer` int(20) NOT NULL,
  `amount` int(255) NOT NULL,
  `notes` varchar(255) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transfer`
--

INSERT INTO `transfer` (`id_sender`, `id_receiver`, `photo_receiver`, `name_receiver`, `id_transfer`, `amount`, `notes`, `date`) VALUES
(1, 2, '/default/picture.png', 'Peter Parker', 247, 1233, 'ppp', '2020-11-01 11:41:13'),
(1, 2, '/default/picture.png', 'Kipli Saprol', 248, 1233, 'ppp', '2020-12-22 11:30:11'),
(2, 1, '/default/picture.png', 'Kipli Saprol', 249, 1233, 'ppp', '2020-12-22 09:31:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id_profile`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `topup`
--
ALTER TABLE `topup`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transfer`
--
ALTER TABLE `transfer`
  ADD PRIMARY KEY (`id_transfer`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `id_profile` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `topup`
--
ALTER TABLE `topup`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `transfer`
--
ALTER TABLE `transfer`
  MODIFY `id_transfer` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=250;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
