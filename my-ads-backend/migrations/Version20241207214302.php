<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241207214302 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE ad (id INT AUTO_INCREMENT NOT NULL, created_by_id INT DEFAULT NULL, category_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, price DOUBLE PRECISION NOT NULL, location VARCHAR(255) NOT NULL, picture VARCHAR(255) NOT NULL, INDEX IDX_77E0ED58B03A8386 (created_by_id), INDEX IDX_77E0ED5812469DE2 (category_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, slug VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE chat (id INT AUTO_INCREMENT NOT NULL, sender_id INT DEFAULT NULL, receiver_id INT DEFAULT NULL, ad_id INT DEFAULT NULL, message LONGTEXT NOT NULL, INDEX IDX_659DF2AAF624B39D (sender_id), INDEX IDX_659DF2AACD53EDB6 (receiver_id), INDEX IDX_659DF2AA4F34D596 (ad_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, role VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE ad ADD CONSTRAINT FK_77E0ED58B03A8386 FOREIGN KEY (created_by_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE ad ADD CONSTRAINT FK_77E0ED5812469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('ALTER TABLE chat ADD CONSTRAINT FK_659DF2AAF624B39D FOREIGN KEY (sender_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE chat ADD CONSTRAINT FK_659DF2AACD53EDB6 FOREIGN KEY (receiver_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE chat ADD CONSTRAINT FK_659DF2AA4F34D596 FOREIGN KEY (ad_id) REFERENCES ad (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE ad DROP FOREIGN KEY FK_77E0ED58B03A8386');
        $this->addSql('ALTER TABLE ad DROP FOREIGN KEY FK_77E0ED5812469DE2');
        $this->addSql('ALTER TABLE chat DROP FOREIGN KEY FK_659DF2AAF624B39D');
        $this->addSql('ALTER TABLE chat DROP FOREIGN KEY FK_659DF2AACD53EDB6');
        $this->addSql('ALTER TABLE chat DROP FOREIGN KEY FK_659DF2AA4F34D596');
        $this->addSql('DROP TABLE ad');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE chat');
        $this->addSql('DROP TABLE user');
    }
}
