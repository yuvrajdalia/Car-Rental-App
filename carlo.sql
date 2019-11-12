-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: carlo
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookings` (
  `no` int(11) NOT NULL AUTO_INCREMENT,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `reg_no` varchar(10) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`no`),
  KEY `reg_no` (`reg_no`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`reg_no`) REFERENCES `vehicle` (`reg_no`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (4,'2019-11-03 07:00:00','2019-11-03 09:00:00','CH02BJ2756',4),(5,'2019-11-03 07:00:00','2019-11-03 09:00:00','PB02Y0001',4),(6,'2019-11-03 07:00:00','2019-11-03 09:00:00','CH02BJ2356',4),(7,'2019-11-03 05:00:00','2019-11-03 09:00:00','PB10Y0031',4),(8,'2019-11-11 07:00:00','2019-11-11 09:00:00','CH02BJ2356',4);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `centers`
--

DROP TABLE IF EXISTS `centers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `centers` (
  `no` int(11) NOT NULL,
  `address` varchar(200) NOT NULL,
  `x_co` double NOT NULL,
  `y_co` double NOT NULL,
  `manager_no` varchar(10) NOT NULL,
  PRIMARY KEY (`no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `centers`
--

LOCK TABLES `centers` WRITE;
/*!40000 ALTER TABLE `centers` DISABLE KEYS */;
INSERT INTO `centers` VALUES (1,'surathkal carlo center , NH66 , DK district ',12.9951,74.8094,'7999036797'),(2,'Mangalore  carlo center , City center , DK district ',12.9141,74.856,'8320156667'),(3,'Manipal  carlo center , Tiger Circle , Udupi district ',13.349,74.7951,'8568863778');
/*!40000 ALTER TABLE `centers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  `dl` varchar(50) NOT NULL,
  `phone_no` varchar(50) NOT NULL,
  `current_status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'yuvraj','dalia','','','2019-10-19 22:36:14','2019-10-19 22:36:14','','',0),(2,'yuvraj','','','','2019-10-19 22:36:25','2019-10-19 22:36:25','','',0),(3,'yuvraj','','','','2019-10-19 22:37:05','2019-10-19 22:37:05','','',0),(4,'yuvraj','dalia','abc@xyz.com','1234','2019-10-19 22:37:27','2019-10-19 22:37:27','','',0),(5,'abc','xyz','sss@gmail.com','12345','2019-10-23 12:00:38','2019-10-23 12:00:38','','',0),(6,'abc','xyzq','sss@gmail.com','12345','2019-10-23 12:01:53','2019-10-23 12:01:53','','',0),(7,'abcd','xyzq','sss@gmail.com','12345','2019-10-23 12:02:16','2019-10-23 12:02:16','','',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle`
--

DROP TABLE IF EXISTS `vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehicle` (
  `model` varchar(30) NOT NULL,
  `reg_no` varchar(10) NOT NULL,
  `seats` int(11) NOT NULL,
  `class` varchar(20) NOT NULL,
  `rateperhour` int(11) NOT NULL,
  `currentstatus` int(11) NOT NULL,
  `rateperday` int(11) NOT NULL,
  `km` int(11) NOT NULL,
  `current_status` int(11) NOT NULL,
  `available_at` int(11) NOT NULL,
  PRIMARY KEY (`reg_no`),
  KEY `vehicle_avail` (`available_at`),
  CONSTRAINT `vehicle_avail` FOREIGN KEY (`available_at`) REFERENCES `centers` (`no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle`
--

LOCK TABLES `vehicle` WRITE;
/*!40000 ALTER TABLE `vehicle` DISABLE KEYS */;
INSERT INTO `vehicle` VALUES ('verna','CH02BJ2356',5,'sedan',250,0,1800,9600,0,0),('honda city','CH02BJ2756',5,'sedan',250,0,1800,45600,0,0),('swift Dzire','PB02Y0001',5,'hatchback',150,0,1200,10000,0,0),('i 20','PB02Y0031',5,'hatchback',200,0,1300,10600,0,0),('figo','PB10Y0031',5,'hatchback',200,0,1300,200,0,0),('discovery','PBX1',7,'SUV',300,0,2300,20500,0,0),('sqorpio','PBX3',7,'SUV',270,0,2100,2600,0,0);
/*!40000 ALTER TABLE `vehicle` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-12 21:42:30
