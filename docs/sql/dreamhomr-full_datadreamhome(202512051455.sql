-- MySQL dump 10.13  Distrib 8.4.7, for Linux (x86_64)
--
-- Host: mysql-dbproject-dh-mgoodie-ce2d.g.aivencloud.com    Database: dreamhome
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '0cd56ec1-c31a-11f0-9742-862ccfb023a4:1-74,
a8dcff7e-b8c8-11f0-b393-862ccfb05470:1-33';

--
-- Table structure for table `Branches`
--

DROP TABLE IF EXISTS `Branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Branches` (
  `branch_no` varchar(10) NOT NULL,
  `street` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `postcode` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`branch_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Branches`
--

LOCK TABLES `Branches` WRITE;
/*!40000 ALTER TABLE `Branches` DISABLE KEYS */;
INSERT INTO `Branches` VALUES ('B001','123 Sample St.','Toronto','M1M 1M1','2025-11-26 21:39:39','2025-11-26 21:39:39'),('B002','88 Harbour View','Toronto','M5J 2N3','2025-11-26 21:39:39','2025-11-26 21:39:39'),('B003','402 King Street','Ottawa','K1R 5L7','2025-11-26 21:39:39','2025-11-26 21:39:39'),('B111','123 la rue','Toronto','h0h 0h0','2025-12-03 22:20:17','2025-12-03 22:21:43');
/*!40000 ALTER TABLE `Branches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Clients`
--

DROP TABLE IF EXISTS `Clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Clients` (
  `client_id` varchar(10) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `preferred_contact` enum('email','phone','sms') NOT NULL,
  `notes` text,
  `registration_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`client_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Clients`
--

LOCK TABLES `Clients` WRITE;
/*!40000 ALTER TABLE `Clients` DISABLE KEYS */;
INSERT INTO `Clients` VALUES ('CL101','Jordan','Sample','client0@example.com','(647) 555-1800','email',NULL,'2025-11-26 21:40:27','2025-11-26 21:40:27'),('CL102','Sydney','Shaw','client1@example.com','(647) 555-1801','phone',NULL,'2025-11-26 21:40:27','2025-11-26 21:40:27'),('CL103','Robin','Diaz','client2@example.com','(647) 555-1802','sms',NULL,'2025-11-26 21:40:27','2025-11-26 21:40:27'),('CL104','Parker','Singh','client3@example.com','(647) 555-1803','email',NULL,'2025-11-26 21:40:27','2025-11-26 21:40:27');
/*!40000 ALTER TABLE `Clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Inquiries`
--

DROP TABLE IF EXISTS `Inquiries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Inquiries` (
  `inquiry_id` int NOT NULL AUTO_INCREMENT,
  `property_id` varchar(20) NOT NULL,
  `client_id` varchar(10) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `inquirer_name` varchar(100) DEFAULT NULL,
  `inquirer_email` varchar(255) DEFAULT NULL,
  `inquirer_phone` varchar(20) DEFAULT NULL,
  `question` text NOT NULL,
  `response` text,
  `status` enum('open','answered','closed') DEFAULT 'open',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`inquiry_id`),
  KEY `property_id` (`property_id`),
  KEY `client_id` (`client_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Inquiries_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `Properties` (`property_id`) ON DELETE CASCADE,
  CONSTRAINT `Inquiries_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `Clients` (`client_id`) ON DELETE SET NULL,
  CONSTRAINT `Inquiries_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Inquiries`
--

LOCK TABLES `Inquiries` WRITE;
/*!40000 ALTER TABLE `Inquiries` DISABLE KEYS */;
/*!40000 ALTER TABLE `Inquiries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Properties`
--

DROP TABLE IF EXISTS `Properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Properties` (
  `property_id` varchar(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `status` varchar(50) NOT NULL,
  `beds` int DEFAULT NULL,
  `baths` decimal(3,1) DEFAULT NULL,
  `area` varchar(50) DEFAULT NULL,
  `lot_size` varchar(50) DEFAULT NULL,
  `year_built` int DEFAULT NULL,
  `monthly_fees` decimal(10,2) DEFAULT NULL,
  `type` varchar(100) NOT NULL,
  `hero_image` varchar(255) DEFAULT NULL,
  `description` text,
  `lifestyle_narrative` text,
  `neighborhood` text,
  `walk_score` int DEFAULT NULL,
  `transit_score` int DEFAULT NULL,
  `open_house` varchar(100) DEFAULT NULL,
  `mls_number` varchar(50) DEFAULT NULL,
  `taxes` decimal(10,2) DEFAULT NULL,
  `last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `agent_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`property_id`),
  KEY `agent_id` (`agent_id`),
  CONSTRAINT `Properties_ibfk_1` FOREIGN KEY (`agent_id`) REFERENCES `Staff` (`staff_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Properties`
--

LOCK TABLES `Properties` WRITE;
/*!40000 ALTER TABLE `Properties` DISABLE KEYS */;
INSERT INTO `Properties` VALUES ('PROP001','Modern Downtown Condo with Stunning Views','123 King St W, Toronto, ON',899000.00,'For Sale',2,2.0,'850 sqft','N/A',2018,650.00,'Condo','/images/condo1.jpg','Beautiful 2-bed, 2-bath condo in the heart of downtown Toronto. Floor-to-ceiling windows with breathtaking city views.','Perfect for young professionals who want to be in the center of the action. Walk to work, restaurants, and entertainment.','The downtown core offers vibrant nightlife, top restaurants, and easy access to transit.',95,100,'Sat, Jun 15, 2:00-4:00 PM','W5678901',3200.50,'2025-11-26 22:32:27','2025-11-26 22:32:27','DH101'),('PROP002','Luxury Waterfront Estate','45 Lakeshore Dr, Mississauga, ON',2499000.00,'Featured',4,3.5,'3200 sqft','0.5 acre',2015,NULL,'Detached','/images/estate1.jpg','Stunning waterfront property with private dock. 4 bedrooms, 3.5 baths, and a chef\'s kitchen with premium appliances.','Ideal for families who love water activities and entertaining. The spacious backyard leads directly to the lake.','Mississauga\'s prestigious Lakeshore neighborhood offers top-rated schools and easy highway access.',75,60,'Sun, Jun 16, 1:00-3:00 PM','W5678902',7800.75,'2025-11-26 22:32:27','2025-11-26 22:32:27','DH102'),('PROP003','Charming Family Home in Leaside','78 Bayview Ave, Toronto, ON',1499000.00,'New Listing',3,2.0,'1800 sqft','40x100 ft',1998,NULL,'Detached','/images/house1.jpg','Beautiful 3-bedroom family home in sought-after Leaside. Updated kitchen and bathrooms, finished basement, and a large backyard.','Perfect for growing families. Close to excellent schools and parks. The finished basement provides extra living space.','Leaside is one of Toronto\'s most desirable family neighborhoods, known for its excellent schools and community feel.',88,75,'Sat, Jun 15, 12:00-2:00 PM','E5678903',5200.25,'2025-11-26 22:32:27','2025-11-26 22:32:27','DH103'),('PROP004','Downtown Loft with Rooftop Terrace','300 Front St W, Toronto, ON',1299000.00,'For Sale',1,1.0,'1200 sqft','N/A',2010,800.00,'Loft','/images/loft1.jpg','Stunning 1-bed + den loft in the Fashion District. 12-foot ceilings, exposed brick, and a private rooftop terrace with BBQ hookup.','Ideal for urban professionals who love to entertain. The open-concept layout is perfect for hosting, and the rooftop terrace offers amazing city views.','The Fashion District is one of Toronto\'s trendiest neighborhoods, with art galleries, boutique shops, and some of the city\'s best restaurants.',98,95,'Sun, Jun 16, 2:00-4:00 PM','C5678904',4800.00,'2025-11-26 22:32:27','2025-11-26 22:32:27','DH101'),('PROP005','Luxury Penthouse with Panoramic Views','1 Bloor St E, Toronto, ON',3999000.00,'Featured',3,3.0,'2500 sqft','N/A',2020,1800.00,'Condo','/images/penthouse1.jpg','Exclusive penthouse in Toronto\'s most luxurious building. 3 beds, 3 baths, and a wrap-around terrace with panoramic city views. Top-of-the-line finishes throughout.','For discerning buyers who want the absolute best. The building offers 24-hour concierge, a spa, and a residents-only lounge.','Located at the intersection of Yonge and Bloor, in the heart of Toronto\'s most prestigious neighborhood.',99,100,'By Appointment','C5678905',12500.00,'2025-11-26 22:32:27','2025-11-26 22:32:27','DH102');
/*!40000 ALTER TABLE `Properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Property_Documents`
--

DROP TABLE IF EXISTS `Property_Documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Property_Documents` (
  `document_id` int NOT NULL AUTO_INCREMENT,
  `property_id` varchar(20) NOT NULL,
  `document_url` varchar(255) NOT NULL,
  `label` varchar(100) NOT NULL,
  `order` int DEFAULT NULL,
  PRIMARY KEY (`document_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `Property_Documents_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `Properties` (`property_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Property_Documents`
--

LOCK TABLES `Property_Documents` WRITE;
/*!40000 ALTER TABLE `Property_Documents` DISABLE KEYS */;
INSERT INTO `Property_Documents` VALUES (1,'PROP001','/documents/condo1-features.pdf','Feature Sheet',0),(2,'PROP001','/documents/condo1-disclosure.pdf','Property Disclosure',1),(3,'PROP001','/documents/condo1-floorplan.pdf','Floor Plan',2),(4,'PROP002','/documents/estate1-features.pdf','Feature Sheet',0),(5,'PROP002','/documents/estate1-survey.pdf','Property Survey',1),(6,'PROP002','/documents/estate1-disclosure.pdf','Property Disclosure',2),(7,'PROP003','/documents/house1-features.pdf','Feature Sheet',0),(8,'PROP003','/documents/house1-disclosure.pdf','Property Disclosure',1),(9,'PROP004','/documents/loft1-features.pdf','Feature Sheet',0),(10,'PROP004','/documents/loft1-disclosure.pdf','Property Disclosure',1),(11,'PROP005','/documents/penthouse1-features.pdf','Feature Sheet',0),(12,'PROP005','/documents/penthouse1-disclosure.pdf','Property Disclosure',1),(13,'PROP005','/documents/penthouse1-bylaws.pdf','Condo Bylaws',2);
/*!40000 ALTER TABLE `Property_Documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Property_Floorplans`
--

DROP TABLE IF EXISTS `Property_Floorplans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Property_Floorplans` (
  `floorplan_id` int NOT NULL AUTO_INCREMENT,
  `property_id` varchar(20) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `label` varchar(100) NOT NULL,
  `order` int DEFAULT NULL,
  PRIMARY KEY (`floorplan_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `Property_Floorplans_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `Properties` (`property_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Property_Floorplans`
--

LOCK TABLES `Property_Floorplans` WRITE;
/*!40000 ALTER TABLE `Property_Floorplans` DISABLE KEYS */;
INSERT INTO `Property_Floorplans` VALUES (1,'PROP001','/floorplans/condo1-main.jpg','Main Floor',0),(2,'PROP002','/floorplans/estate1-main.jpg','Main Floor',0),(3,'PROP002','/floorplans/estate1-upper.jpg','Upper Floor',1),(4,'PROP002','/floorplans/estate1-basement.jpg','Basement',2),(5,'PROP003','/floorplans/house1-main.jpg','Main Floor',0),(6,'PROP003','/floorplans/house1-upper.jpg','Upper Floor',1),(7,'PROP003','/floorplans/house1-basement.jpg','Basement',2),(8,'PROP004','/floorplans/loft1-main.jpg','Main Floor',0),(9,'PROP005','/floorplans/penthouse1-main.jpg','Main Floor',0);
/*!40000 ALTER TABLE `Property_Floorplans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Property_Gallery`
--

DROP TABLE IF EXISTS `Property_Gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Property_Gallery` (
  `gallery_id` int NOT NULL AUTO_INCREMENT,
  `property_id` varchar(20) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `is_hero` tinyint(1) DEFAULT '0',
  `order` int DEFAULT NULL,
  PRIMARY KEY (`gallery_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `Property_Gallery_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `Properties` (`property_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Property_Gallery`
--

LOCK TABLES `Property_Gallery` WRITE;
/*!40000 ALTER TABLE `Property_Gallery` DISABLE KEYS */;
INSERT INTO `Property_Gallery` VALUES (1,'PROP001','/images/condo1.jpg',1,0),(2,'PROP001','/images/condo1-kitchen.jpg',0,1),(3,'PROP001','/images/condo1-bedroom.jpg',0,2),(4,'PROP001','/images/condo1-bathroom.jpg',0,3),(5,'PROP001','/images/condo1-view.jpg',0,4),(6,'PROP002','/images/estate1.jpg',1,0),(7,'PROP002','/images/estate1-kitchen.jpg',0,1),(8,'PROP002','/images/estate1-living.jpg',0,2),(9,'PROP002','/images/estate1-master.jpg',0,3),(10,'PROP002','/images/estate1-backyard.jpg',0,4),(11,'PROP002','/images/estate1-dock.jpg',0,5),(12,'PROP003','/images/house1.jpg',1,0),(13,'PROP003','/images/house1-kitchen.jpg',0,1),(14,'PROP003','/images/house1-living.jpg',0,2),(15,'PROP003','/images/house1-master.jpg',0,3),(16,'PROP003','/images/house1-backyard.jpg',0,4),(17,'PROP004','/images/loft1.jpg',1,0),(18,'PROP004','/images/loft1-kitchen.jpg',0,1),(19,'PROP004','/images/loft1-living.jpg',0,2),(20,'PROP004','/images/loft1-bedroom.jpg',0,3),(21,'PROP004','/images/loft1-terrace.jpg',0,4),(22,'PROP005','/images/penthouse1.jpg',1,0),(23,'PROP005','/images/penthouse1-kitchen.jpg',0,1),(24,'PROP005','/images/penthouse1-living.jpg',0,2),(25,'PROP005','/images/penthouse1-master.jpg',0,3),(26,'PROP005','/images/penthouse1-terrace.jpg',0,4),(27,'PROP005','/images/penthouse1-view.jpg',0,5);
/*!40000 ALTER TABLE `Property_Gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Property_Highlights`
--

DROP TABLE IF EXISTS `Property_Highlights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Property_Highlights` (
  `highlight_id` int NOT NULL AUTO_INCREMENT,
  `property_id` varchar(20) NOT NULL,
  `highlight_text` varchar(255) NOT NULL,
  `order` int DEFAULT NULL,
  PRIMARY KEY (`highlight_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `Property_Highlights_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `Properties` (`property_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Property_Highlights`
--

LOCK TABLES `Property_Highlights` WRITE;
/*!40000 ALTER TABLE `Property_Highlights` DISABLE KEYS */;
INSERT INTO `Property_Highlights` VALUES (1,'PROP001','Floor-to-ceiling windows with stunning city views',0),(2,'PROP001','Prime downtown location - walk to everything',1),(3,'PROP001','Modern kitchen with quartz countertops and stainless steel appliances',2),(4,'PROP001','24-hour concierge and top-notch building amenities',3),(5,'PROP001','Steps from subway, streetcar, and major transit hubs',4),(6,'PROP002','Private waterfront with direct lake access',0),(7,'PROP002','Spacious 0.5 acre lot with mature trees',1),(8,'PROP002','Chef\'s kitchen with premium appliances and large island',2),(9,'PROP002','Four generous bedrooms including a luxurious master suite',3),(10,'PROP002','Three-car garage with additional storage space',4),(11,'PROP003','Located in highly sought-after Leaside neighborhood',0),(12,'PROP003','Updated kitchen with granite countertops',1),(13,'PROP003','Finished basement with recreation room',2),(14,'PROP003','Large backyard with mature trees and garden',3),(15,'PROP003','Walking distance to top-rated schools and parks',4),(16,'PROP004','12-foot ceilings with exposed brick and ductwork',0),(17,'PROP004','Private rooftop terrace with BBQ hookup',1),(18,'PROP004','Open-concept living space perfect for entertaining',2),(19,'PROP004','Located in Toronto\'s trendy Fashion District',3),(20,'PROP004','Steps from art galleries, boutique shops, and restaurants',4),(21,'PROP005','Panoramic city views from wrap-around terrace',0),(22,'PROP005','Top-of-the-line finishes throughout',1),(23,'PROP005','24-hour concierge and luxury building amenities',2),(24,'PROP005','Three spacious bedrooms with ensuites',3),(25,'PROP005','Prime location at Yonge and Bloor',4);
/*!40000 ALTER TABLE `Property_Highlights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Property_Nearby`
--

DROP TABLE IF EXISTS `Property_Nearby`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Property_Nearby` (
  `nearby_id` int NOT NULL AUTO_INCREMENT,
  `property_id` varchar(20) NOT NULL,
  `item` varchar(100) NOT NULL,
  `order` int DEFAULT NULL,
  PRIMARY KEY (`nearby_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `Property_Nearby_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `Properties` (`property_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Property_Nearby`
--

LOCK TABLES `Property_Nearby` WRITE;
/*!40000 ALTER TABLE `Property_Nearby` DISABLE KEYS */;
INSERT INTO `Property_Nearby` VALUES (1,'PROP001','St. Lawrence Market',0),(2,'PROP001','Eaton Centre',1),(3,'PROP001','CN Tower',2),(4,'PROP001','Rogers Centre',3),(5,'PROP001','Union Station',4),(6,'PROP002','Port Credit Marina',0),(7,'PROP002','Port Credit Memorial Park',1),(8,'PROP002','Lakefront Promenade',2),(9,'PROP002','Port Credit Village shops',3),(10,'PROP003','Leaside Village shops',0),(11,'PROP003','Trace Manes Park',1),(12,'PROP003','Leaside Memorial Community Gardens',2),(13,'PROP003','Bayview Avenue restaurants',3),(14,'PROP004','Kensington Market',0),(15,'PROP004','Art Gallery of Ontario',1),(16,'PROP004','OCAD University',2),(17,'PROP004','Queen Street West shops',3),(18,'PROP005','Yorkville Village',0),(19,'PROP005','Royal Ontario Museum',1),(20,'PROP005','Bloor Street Luxury Shopping',2),(21,'PROP005','University of Toronto',3),(22,'PROP005','The ROM and AGO',4);
/*!40000 ALTER TABLE `Property_Nearby` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Property_Schools`
--

DROP TABLE IF EXISTS `Property_Schools`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Property_Schools` (
  `school_id` int NOT NULL AUTO_INCREMENT,
  `property_id` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `distance` varchar(50) NOT NULL,
  `order` int DEFAULT NULL,
  PRIMARY KEY (`school_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `Property_Schools_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `Properties` (`property_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Property_Schools`
--

LOCK TABLES `Property_Schools` WRITE;
/*!40000 ALTER TABLE `Property_Schools` DISABLE KEYS */;
INSERT INTO `Property_Schools` VALUES (1,'PROP001','Toronto District School Board - Elementary','0.5 km',0),(2,'PROP001','Central Technical School','1.2 km',1),(3,'PROP001','University of Toronto','1.8 km',2),(4,'PROP002','Lakeshore Public School','1.5 km',0),(5,'PROP002','Port Credit Secondary School','2.3 km',1),(6,'PROP002','St. Joseph Secondary School','3.1 km',2),(7,'PROP003','Bessborough Drive Elementary and Middle School','0.8 km',0),(8,'PROP003','Leaside High School','1.2 km',1),(9,'PROP003','Branksome Hall','2.5 km',2),(10,'PROP004','Ryerson Community School','0.7 km',0),(11,'PROP004','Central Technical School','1.5 km',1),(12,'PROP004','OCAD University','1.8 km',2),(13,'PROP005','Jesse Ketchum Public School','0.9 km',0),(14,'PROP005','Jarvis Collegiate Institute','1.2 km',1),(15,'PROP005','University of Toronto','1.5 km',2);
/*!40000 ALTER TABLE `Property_Schools` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Property_Sustainability`
--

DROP TABLE IF EXISTS `Property_Sustainability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Property_Sustainability` (
  `sustainability_id` int NOT NULL AUTO_INCREMENT,
  `property_id` varchar(20) NOT NULL,
  `feature` varchar(255) NOT NULL,
  `order` int DEFAULT NULL,
  PRIMARY KEY (`sustainability_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `Property_Sustainability_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `Properties` (`property_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Property_Sustainability`
--

LOCK TABLES `Property_Sustainability` WRITE;
/*!40000 ALTER TABLE `Property_Sustainability` DISABLE KEYS */;
INSERT INTO `Property_Sustainability` VALUES (1,'PROP001','Energy-efficient LED lighting throughout',0),(2,'PROP001','Low-flow water fixtures',1),(3,'PROP001','Building has green roof',2),(4,'PROP002','Geothermal heating and cooling system',0),(5,'PROP002','Solar panels for electricity generation',1),(6,'PROP002','Rainwater collection system for irrigation',2),(7,'PROP002','Energy Star rated appliances',3),(8,'PROP003','Updated insulation for better energy efficiency',0),(9,'PROP003','Double-paned windows throughout',1),(10,'PROP003','Energy-efficient furnace',2),(11,'PROP004','LEED-certified building',0),(12,'PROP004','Energy-efficient HVAC system',1),(13,'PROP004','Low-VOC paints and materials used',2),(14,'PROP004','Bike storage and shower facilities',3),(15,'PROP005','Geothermal heating and cooling',0),(16,'PROP005','Triple-glazed windows for maximum efficiency',1),(17,'PROP005','Solar-ready roof',2),(18,'PROP005','EV charging stations in parking garage',3),(19,'PROP005','Greywater recycling system',4);
/*!40000 ALTER TABLE `Property_Sustainability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Property_Tags`
--

DROP TABLE IF EXISTS `Property_Tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Property_Tags` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `property_id` varchar(20) NOT NULL,
  `tag` varchar(50) NOT NULL,
  PRIMARY KEY (`tag_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `Property_Tags_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `Properties` (`property_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Property_Tags`
--

LOCK TABLES `Property_Tags` WRITE;
/*!40000 ALTER TABLE `Property_Tags` DISABLE KEYS */;
INSERT INTO `Property_Tags` VALUES (1,'PROP001','Downtown'),(2,'PROP001','Luxury'),(3,'PROP001','City Views'),(4,'PROP001','Modern'),(5,'PROP001','Investment'),(6,'PROP002','Waterfront'),(7,'PROP002','Luxury'),(8,'PROP002','Family Home'),(9,'PROP002','Private Dock'),(10,'PROP002','Large Lot'),(11,'PROP003','Family Home'),(12,'PROP003','Leaside'),(13,'PROP003','Backyard'),(14,'PROP003','Updated'),(15,'PROP003','Good Schools'),(16,'PROP004','Loft'),(17,'PROP004','Downtown'),(18,'PROP004','Trendy'),(19,'PROP004','Open Concept'),(20,'PROP004','Rooftop Terrace'),(21,'PROP005','Luxury'),(22,'PROP005','Penthouse'),(23,'PROP005','Panoramic Views'),(24,'PROP005','Downtown'),(25,'PROP005','Concierge');
/*!40000 ALTER TABLE `Property_Tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Showings`
--

DROP TABLE IF EXISTS `Showings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Showings` (
  `showing_id` int NOT NULL AUTO_INCREMENT,
  `property_id` varchar(20) NOT NULL,
  `client_id` varchar(10) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `requested_by_name` varchar(100) DEFAULT NULL,
  `requested_by_email` varchar(255) DEFAULT NULL,
  `requested_by_phone` varchar(20) DEFAULT NULL,
  `requested_time` datetime NOT NULL,
  `status` enum('requested','confirmed','completed','cancelled') DEFAULT 'requested',
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`showing_id`),
  KEY `property_id` (`property_id`),
  KEY `client_id` (`client_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Showings_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `Properties` (`property_id`) ON DELETE CASCADE,
  CONSTRAINT `Showings_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `Clients` (`client_id`) ON DELETE SET NULL,
  CONSTRAINT `Showings_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Showings`
--

LOCK TABLES `Showings` WRITE;
/*!40000 ALTER TABLE `Showings` DISABLE KEYS */;
/*!40000 ALTER TABLE `Showings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Staff`
--

DROP TABLE IF EXISTS `Staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Staff` (
  `staff_id` varchar(10) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `position` varchar(100) NOT NULL,
  `branch_no` varchar(10) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `salary` decimal(10,2) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `hire_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`staff_id`),
  UNIQUE KEY `email` (`email`),
  KEY `branch_no` (`branch_no`),
  CONSTRAINT `Staff_ibfk_1` FOREIGN KEY (`branch_no`) REFERENCES `Branches` (`branch_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Staff`
--

LOCK TABLES `Staff` WRITE;
/*!40000 ALTER TABLE `Staff` DISABLE KEYS */;
INSERT INTO `Staff` VALUES ('DH101','Jamie','Carter','Sales Associate','B001','1985-05-15',55000.00,'(416) 555-0001',NULL,'jamie.carter@example.com','2025-11-26 21:40:10','2025-11-26 21:40:10'),('DH102','Morgan','Lee','Branch Manager','B002','1980-08-22',62000.00,'(416) 555-0002',NULL,'morgan.lee@example.com','2025-11-26 21:40:10','2025-11-26 21:40:10'),('DH103','Alexis','Grant','Sales Agent','B003','1990-03-10',58500.00,'(416) 555-0003',NULL,'alexis.grant@example.com','2025-11-26 21:40:10','2025-11-26 21:40:10'),('dh123','Michael','Goodie','manager','B001','2020-02-03',55000.00,'7050003333','','mike@home.net','2025-12-03 22:19:16','2025-12-03 22:19:35');
/*!40000 ALTER TABLE `Staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserApprovals`
--

DROP TABLE IF EXISTS `UserApprovals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserApprovals` (
  `approval_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `approved_by` int NOT NULL,
  `approved_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`approval_id`),
  KEY `user_id` (`user_id`),
  KEY `approved_by` (`approved_by`),
  CONSTRAINT `UserApprovals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `UserApprovals_ibfk_2` FOREIGN KEY (`approved_by`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserApprovals`
--

LOCK TABLES `UserApprovals` WRITE;
/*!40000 ALTER TABLE `UserApprovals` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserApprovals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserProfiles`
--

DROP TABLE IF EXISTS `UserProfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserProfiles` (
  `profile_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `zip_code` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`profile_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `UserProfiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserProfiles`
--

LOCK TABLES `UserProfiles` WRITE;
/*!40000 ALTER TABLE `UserProfiles` DISABLE KEYS */;
INSERT INTO `UserProfiles` VALUES (4,1,'Admin','User','416-555-0000',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `UserProfiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('agent','manager','support','admin') DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '0',
  `is_approved` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'mike@home.net','Michael Goodie','$2b$10$8aKrjBX9a157AkVjojGXg.ENruUrn4Podri2LtlG5j22i7pj0rEpe','admin',1,1,'2025-11-22 21:39:09','2025-12-03 19:09:35'),(2,'alexkachur98@gmail.com','alex Kachur','$2b$10$cKxU/iK.erDCKHnuk3uHlekQTqCShLQEw.Bw6./2qeBoHFYr2k/x6','agent',1,1,'2025-12-03 20:03:18','2025-12-03 20:03:18');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'dreamhome'
--
/*!50003 DROP PROCEDURE IF EXISTS `new_branch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER="avnadmin"@"%" PROCEDURE "new_branch"(
    IN p_branchno VARCHAR(10),
    IN p_street VARCHAR(255),
    IN p_city VARCHAR(100),
    IN p_postcode VARCHAR(20),
    OUT p_success BOOLEAN,
    OUT p_message VARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_success = FALSE;
        SET p_message = 'Error creating branch';
    END;

    -- Check if branch number already exists
    IF EXISTS (SELECT 1 FROM Branches WHERE branch_no = p_branchno) THEN
        SET p_success = FALSE;
        SET p_message = 'Branch number already exists';
    ELSE
        START TRANSACTION;

        -- Insert the new branch
        INSERT INTO Branches (
            branch_no, street, city, postcode
        ) VALUES (
            p_branchno, p_street, p_city, p_postcode
        );

        SET p_success = TRUE;
        SET p_message = 'Branch created successfully';

        COMMIT;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Staff_hire_sp` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'REAL_AS_FLOAT,PIPES_AS_CONCAT,ANSI_QUOTES,IGNORE_SPACE,ONLY_FULL_GROUP_BY,ANSI,STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER="avnadmin"@"%" PROCEDURE "Staff_hire_sp"(
    IN p_staff_id VARCHAR(10),
    IN p_first_name VARCHAR(100),
    IN p_last_name VARCHAR(100),
    IN p_position VARCHAR(100),
    IN p_branch_no VARCHAR(10),
    IN p_date_of_birth DATE,
    IN p_salary DECIMAL(10, 2),
    IN p_telephone VARCHAR(20),
    IN p_mobile VARCHAR(20),
    IN p_email VARCHAR(255),
    OUT p_success BOOLEAN,
    OUT p_message VARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_success = FALSE;
        SET p_message = 'Error hiring staff member';
    END;

    -- Check if staff ID already exists
    IF EXISTS (SELECT 1 FROM Staff WHERE staff_id = p_staff_id) THEN
        SET p_success = FALSE;
        SET p_message = 'Staff ID already exists';
    -- Check if email already exists
    ELSEIF EXISTS (SELECT 1 FROM Staff WHERE email = p_email) THEN
        SET p_success = FALSE;
        SET p_message = 'Email already in use';
    -- Check if branch exists
    ELSEIF NOT EXISTS (SELECT 1 FROM Branches WHERE branch_no = p_branch_no) THEN
        SET p_success = FALSE;
        SET p_message = 'Branch does not exist';
    ELSE
        START TRANSACTION;

        -- Insert the new staff member
        INSERT INTO Staff (
            staff_id, first_name, last_name, position, branch_no,
            date_of_birth, salary, telephone, mobile, email
        ) VALUES (
            p_staff_id, p_first_name, p_last_name, p_position, p_branch_no,
            p_date_of_birth, p_salary, p_telephone, p_mobile, p_email
        );

        SET p_success = TRUE;
        SET p_message = 'Staff member hired successfully';

        COMMIT;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-05 14:55:20
