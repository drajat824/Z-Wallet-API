-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 10, 2020 at 09:52 AM
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
  `photo` varchar(255) DEFAULT NULL,
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
(1, 'Drajat Fikri Alfianto', 'drajat@gmail.com', '$2b$10$NTXE5eDkU/zCo0jbaKTFzuThyXO.PhbHOq1r6we.HjQ9hRcCou0Su', '1607444426119-profile.jpg', '0895358084317', '111111', 89788, 0, 20, 'cfMr-ecaRe2lsXyfpP6iq3:APA91bGIBIUxgzcqc7nN8UUtZPoFFxzNgcfpW6UXMlFvD7ePq59YK1uUkU7zlOpfzvxTvMhC6z9k20CBIqPFp6mJhA_JX3g4Jms3D_vvOC5u13POt4q3KrKDhyS-rw1LXZ-PQPYc99z-'),
(2, 'Kipli Saprol', 'kipli@gmail.com', '$2b$10$352hsop1xyXtCMfiaRfQ4Op7QZDI0jG5oJ48NX/UxGN/Ct0.6i1zi', '1606289915303-image-e1b7eae6-a5e5-420a-b927-d6efd31813aa.jpg', NULL, '222222', 2980, 0, 20, ''),
(3, 'Anya Geraldine', 'anya@gmail.com', '$2b$10$IjhG135sJJMkw/WR7OTo1uUKPQIVFDZCWE8olj2coLURniEKTZP06', '1606145353376-Screenshot_20201123-222802_1.jpg', NULL, '111112', 0, 0, 20, ''),
(4, 'Peter Parker', 'peter@gmail.com', '$2b$10$KR2Dda3.I6CPHc.tQPGKwuRPIim15na8g3B082Ttimr0tAgXrAziq', NULL, NULL, NULL, 522, 0, 20, NULL),
(5, 'Jon Bon Jovi', 'jon@gmail.com', '$2b$10$s8lqIsga9lF/5Kum8X2wMuotTDUlDpSk4QwwxEDZ/7nGp/E26y2Gy', NULL, NULL, NULL, 6620, 0, 20, NULL),
(6, 'Roma Irama', 'roma@gmail.com', '$2b$10$V7hrKUvKCDdq401mFx8js.wvuOO34L0Ksi6hgYz9iayR.mtlJ/lNS', NULL, NULL, NULL, 22, 0, 20, NULL),
(7, 'Popuri', 'popuri@gmail.com', '$2b$10$IfAczDZdMlySeP8Ij4ZzyuyZoB2VnRIS.FORWg5z55JiFZO6A6Cle', '1606238489465-P_20200912_163404.jpg', NULL, NULL, 2666, 0, 20, ''),
(8, 'Karen', 'karen@gmail.com', '$2b$10$rxK/ITH.P9A3zC/niDpYbOpvtYEkfVBgR3YTaK67sZzXxHoXouQRa', '1606238218832-P_20201122_074252.jpg', NULL, NULL, 234, 0, 20, ''),
(66, 'werdan', 'werdan@gmail.com', '$2b$10$/8EeEN/TjiW2pZ7tR.FeXuzY9unaKcFVn0kgMOjeHTTezUM6wflii', NULL, NULL, '111111', 0, 0, 20, NULL);

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
  `id_transfer` int(20) NOT NULL,
  `amount` int(255) NOT NULL,
  `notes` varchar(255) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transfer`
--

INSERT INTO `transfer` (`id_sender`, `id_receiver`, `id_transfer`, `amount`, `notes`, `date`) VALUES
(1, 3, 120, 211, ' ppp', '2020-12-10'),
(1, 7, 121, 1230, ' qwert', '2020-12-10'),
(1, 7, 122, 1230, ' qwert', '2020-12-10'),
(3, 5, 123, 6593, ' qwer', '2020-12-10'),
(3, 5, 124, 6, ' q', '2020-12-10'),
(3, 6, 125, 0, ' qw', '2020-12-10'),
(1, 8, 126, 12, ' qq', '2020-12-10'),
(3, 1, 127, 0, ' qwe', '2020-12-10');

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
  MODIFY `id_profile` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `topup`
--
ALTER TABLE `topup`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `transfer`
--
ALTER TABLE `transfer`
  MODIFY `id_transfer` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
