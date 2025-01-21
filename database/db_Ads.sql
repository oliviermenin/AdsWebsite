-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: localhost    Database: db_Ads
-- ------------------------------------------------------
-- Server version	8.0.40-0ubuntu0.20.04.1

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

--
-- Table structure for table `ad`
--

DROP TABLE IF EXISTS `ad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ad` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_by_id` int DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `picture` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_77E0ED58B03A8386` (`created_by_id`),
  KEY `IDX_77E0ED5812469DE2` (`category_id`),
  CONSTRAINT `FK_77E0ED5812469DE2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `FK_77E0ED58B03A8386` FOREIGN KEY (`created_by_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ad`
--

LOCK TABLES `ad` WRITE;
/*!40000 ALTER TABLE `ad` DISABLE KEYS */;
INSERT INTO `ad` VALUES (2,10,'PS5','TEST DESCRIPTION',550,'Bordeaux','/uploads/493b40f5ac78e8bfa22f545bf84636d0.jpg',1,'2024-12-25 15:51:22'),(3,10,'Twingo','Je vends une Renault Twingo de 1995 en bon état général. Cette petite citadine est idéale pour les trajets quotidiens et les jeunes conducteurs.  \n\nKilométrage : [indiquez le kilométrage, par exemple 150 000 km].  \nMoteur : Essence, faible consommation.  \nCouleur : [indiquez la couleur, par exemple rouge].  \nÉquipement : [mentionnez les équipements, par exemple vitres manuelles, autoradio, sièges rabattables].  \n\nLa voiture a toujours été entretenue avec soin, les révisions sont à jour et le contrôle technique est valide jusqu’à [date du contrôle technique].  \n\nQuelques traces d’usure normales pour son âge, mais elle reste en bon état de fonctionnement.  \n\nPrix : [indiquez le prix, par exemple 1 200 €].  \n\nPour toute information supplémentaire ou pour venir la voir, contactez-moi via [ajoutez le moyen de contact, par exemple le chat du site ou un numéro de téléphone].  \n\nPremier arrivé, premier servi ! 🚗',1600,'Nice','/uploads/282a349afc7cb9569b603b8215224ba0.jpg',3,'2024-12-27 13:53:53'),(4,10,'Airforce One','Je vends une paire de Nike Air Force 1 en très bon état.  \n\nTaille : [indiquez la taille, par exemple 42].  \nCouleur : [indiquez la couleur, par exemple blanche].  \nElles ont été portées [mentionnez le nombre approximatif de fois ou \"quelques fois\"], et elles sont encore en excellent état, avec une semelle propre et une bonne tenue.  \n\nPrix : [indiquez le prix, par exemple 70 €].  \n\nRemise en main propre possible sur [votre ville ou région], ou envoi à votre charge.  \n\nPour toute question ou pour plus de photos, contactez-moi via [ajoutez votre moyen de contact].  \n\nPremier arrivé, premier servi ! 👟',150,'Strasbourg','/uploads/318e406542117c3cffe3b1be995cbef7.webp',4,'2024-12-27 20:35:31'),(5,10,'iPhone 13','Je vends un iPhone 13 noir en excellent état.\n\nCapacité : 256 Go.  \nLe téléphone a été utilisé avec soin : aucun défaut, ni rayures sur l’écran ou le boîtier. La batterie est en très bon état et le téléphone fonctionne parfaitement.\n\nIl est fourni avec sa boîte d’origine, un câble de charge, et tous les accessoires d’origine.\n\nPrix : 680 €.\n\nPossibilité de tester avant achat. Paiement en espèces ou via [mentionnez un moyen de paiement accepté].\n\nPour plus d’informations ou si vous êtes intéressé(e), contactez-moi via [ajoutez votre moyen de contact].\n\nPremier arrivé, premier servi ! 📱',680,'PARIS 12','/uploads/4d6a7fbecf5a91f8808d8ad8dbc0f0fc.jpg',1,'2024-12-27 22:31:19'),(6,10,'Honda CB500F','Je vends une Honda CB500F de 2019 en excellent état.\n\nKilométrage : 15 000 km.  \nMoteur : 471 cm³, très économique et puissant.  \nCouleur : Noir mat.  \nElle a toujours été entretenue en concession et possède un carnet d\'entretien à jour. La moto roule parfaitement et a un comportement agile et réactif.\n\nÉquipements :  \n- Système ABS  \n- Plaques de protection  \n- Pneus en bon état  \n- Complet avec béquille centrale et chargeur de batterie.\n\nPrix : 3 800 €.\n\nMoto disponible pour un essai. Paiement en espèces.\n\nPremier arrivé, premier servi ! 🏍️',3800,'Colombes','/uploads/1c781a1b8fbc945042dc2c4a5e35a587.jpg',3,'2024-12-27 22:34:26'),(7,10,'Converse','Je vends une paire de Converse classiques en très bon état.\n\nTaille 42, couleur blanche, modèle Chuck Taylor All Star. Les chaussures ont été portées quelques fois mais restent en excellent état, avec une semelle propre et aucune usure visible.\n\nPrix : 45 €.\n\nRemise en main propre possible ou envoi à votre charge.\n\nPour plus de détails ou si vous êtes intéressé(e), contactez-moi.  \n\nPremier arrivé, premier servi ! 👟',45,'Meaux','/uploads/4e307a4338e2ceb8b9fa197170bcb4ac.jpg',4,'2024-12-27 22:37:31'),(8,12,'Location d\'un appartement','Je propose à la location un appartement de 2 pièces situé à Paris, dans le quartier de Montmartre, à 5 minutes à pied du métro et proche des commerces.\n\nL’appartement comprend :  \n- 1 chambre spacieuse avec placard intégré  \n- 1 salon lumineux avec vue sur la ville  \n- Cuisine équipée avec réfrigérateur, plaques de cuisson et micro-ondes  \n- Salle de bain avec baignoire et lavabo  \n- WC séparés  \n- Chauffage central  \n- Balcon  \n\nSurface : 55 m².  \nLoyer mensuel : 900 € charges comprises.  \n\nDisponible à partir du 1er février.  \nDépôt de garantie : 1 800 €.  \n\nPour plus d’informations ou pour organiser une visite, contactez-moi directement au 06 12 34 56 78.\n\nPremier arrivé, premier servi !',900,'PARIS 18','/uploads/921083af7f6a79a88d073730a2a97589.jpg',5,'2024-12-27 22:47:04'),(9,12,'Studio étudiant','Je propose à la location un studio idéal pour étudiant, situé à Lyon, à proximité des universités et transports en commun.\n\nLe studio comprend :  \n- 1 pièce principale avec lit, bureau et étagères  \n- Cuisine équipée avec réfrigérateur, plaques de cuisson et micro-ondes  \n- Salle de bain avec douche, lavabo et WC  \n- Chauffage électrique  \n- Internet haut débit inclus  \n\nSurface : 20 m².  \nLoyer mensuel : 550 € charges comprises.  \n\nDisponible à partir du 15 janvier.  \nDépôt de garantie : 1 100 €.  \n\nPour plus d’informations ou pour organiser une visite, contactez-moi directement au 07 98 76 54 32.\n\nPremier arrivé, premier servi !',550,'Lyon','/uploads/6bb034fd43d2c71f2014f90be48b5ea4.jpg',5,'2024-12-27 22:55:29'),(10,10,'Macbook','Je vends un MacBook Air 13 pouces de 2020 en excellent état.\n\nCaractéristiques :  \n- Processeur Apple M1  \n- 8 Go de RAM  \n- 256 Go de stockage SSD  \n- Écran Retina 13 pouces  \n- Autonomie de batterie de 15 heures  \n- Clavier Magic Keyboard  \n- Couleur : Argent  \n\nLe MacBook est comme neuf, aucune rayure ni fissure, utilisé avec soin. Il est fourni dans sa boîte d\'origine avec tous les accessoires (chargeur, câble USB-C).\n\nPrix : 1 050 €.\n\nPossibilité d\'expédition à votre charge ou remise en main propre.\n\nPour plus d’informations ou pour toute question, contactez-moi directement au 06 11 22 33 44.\n\nPremier arrivé, premier servi !',1050,'Herblay-sur-Seine','/uploads/64c0693319b63e0185b36681b525889d.jpg',1,'2024-12-27 23:23:02'),(11,10,'Maillot de basket','Je vends un maillot de basket des Chicago Bulls, numéro 8, de Zach LaVine, en excellent état.\n\nTaille : L  \nCouleur : Rouge avec les détails noirs et blancs caractéristiques des Chicago Bulls.  \nLe maillot est officiel, fabriqué par Nike, avec le logo de l’équipe et le numéro de LaVine imprimés de manière nette. Il est confortable et léger, parfait pour les matchs ou la collection.\n\nPrix : 70 €.\n\nLe maillot n’a été porté que quelques fois et est en parfait état. Il peut être expédié ou récupéré en main propre.\n\nPour plus d\'informations ou pour l\'acheter, contactez-moi directement au 06 12 34 56 78.\n\nPremier arrivé, premier servi !',70,'Asnières-sur-Seine','/uploads/3a39327a9e44b9e8da0908b4257b35a2.png',4,'2024-12-27 23:30:27'),(12,10,'BMW Série 3','Je vends une BMW Série 3 de 2017 en excellent état.\n\nModèle : 320d  \nKilométrage : 75 000 km  \nMoteur : Diesel, 2.0L, 190 chevaux  \nCouleur : Noir  \nÉquipements :  \n- GPS intégré  \n- Climatisation automatique  \n- Sièges chauffants  \n- Caméra de recul  \n- Jantes alliage  \n- Système audio Hi-Fi  \n- Contrôle de traction et mode sport  \n\nLe véhicule a été entretenu régulièrement avec toutes les révisions effectuées. Aucun accident, il est en parfait état de marche, avec une consommation de carburant très économique.\n\nPrix : 18 500 €.\n\nContrôle technique à jour et validé. Le véhicule est disponible pour un essai.\n\nPour plus d’informations ou pour organiser une visite, contactez-moi au 06 23 45 67 89.\n\nPremier arrivé, premier servi ! 🚗',18500,'Rungis','/uploads/50caffe335f0cefc86f4a223797d6aff.jpg',3,'2024-12-27 23:35:08');
/*!40000 ALTER TABLE `ad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Electronique','Electronique'),(3,'Véhicules','Véhicules'),(4,'Vêtements','Vêtements'),(5,'Immobilier','Immobilier');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int DEFAULT NULL,
  `receiver_id` int DEFAULT NULL,
  `ad_id` int DEFAULT NULL,
  `message` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_659DF2AAF624B39D` (`sender_id`),
  KEY `IDX_659DF2AACD53EDB6` (`receiver_id`),
  KEY `IDX_659DF2AA4F34D596` (`ad_id`),
  CONSTRAINT `FK_659DF2AA4F34D596` FOREIGN KEY (`ad_id`) REFERENCES `ad` (`id`),
  CONSTRAINT `FK_659DF2AACD53EDB6` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_659DF2AAF624B39D` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES (1,NULL,NULL,NULL,'Hey ','2024-12-27 14:05:30'),(2,NULL,NULL,NULL,'Salut','2024-12-27 17:19:29'),(3,10,12,NULL,'Salut','2024-12-27 17:28:41'),(4,NULL,NULL,NULL,'TEST','2024-12-27 20:09:10'),(5,NULL,NULL,NULL,'Bonjour est ce que l\'annonce est toujours disponible ?','2024-12-27 20:37:32'),(6,NULL,NULL,NULL,'TEST receiver','2024-12-27 21:00:31'),(7,NULL,NULL,NULL,'TEST2','2024-12-27 21:10:47');
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctrine_migration_versions`
--

DROP TABLE IF EXISTS `doctrine_migration_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8mb3_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctrine_migration_versions`
--

LOCK TABLES `doctrine_migration_versions` WRITE;
/*!40000 ALTER TABLE `doctrine_migration_versions` DISABLE KEYS */;
INSERT INTO `doctrine_migration_versions` VALUES ('DoctrineMigrations\\Version20241207214302','2024-12-07 21:43:09',915),('DoctrineMigrations\\Version20241212173016','2024-12-12 17:30:25',178),('DoctrineMigrations\\Version20241212173932','2024-12-12 17:39:39',78),('DoctrineMigrations\\Version20241214120326','2024-12-14 12:03:33',404),('DoctrineMigrations\\Version20241214120612','2024-12-14 12:06:15',74),('DoctrineMigrations\\Version20241225144230','2024-12-25 14:51:21',98),('DoctrineMigrations\\Version20241225152714','2024-12-25 15:27:22',134);
/*!40000 ALTER TABLE `doctrine_migration_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zipcode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'John Doe','john@example.com','mot_de_passe_sécurisé','utilisateur','','0',''),(10,'OliBaz','molivierbazou@gmail.com','$2y$13$KMI.4m9DkmEhrqLE5MXgeOEPCmxMHj3jqxPo9UJlrbhzpTEtbm20i','user','3 Rue Lucie Aubrac','93140','France'),(12,'Bazou','olivier@live.fr','$2y$13$su5Id/79j3tDM.rdTIE9VO.gk/rR3QyzYpcbB/.STY9vV7aBBekEW','user','3 Rue Lucie Aubrac','93140','France');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-21 15:15:11
