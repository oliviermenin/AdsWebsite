<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241225144230 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Adds a created_at column to the ad table.';
    }

    public function up(Schema $schema): void
    {
        // Add the created_at column to the ad table
        $this->addSql('ALTER TABLE ad ADD created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP');

        // Update existing rows with a default value (e.g., the current timestamp)
        $this->addSql('UPDATE ad SET created_at = NOW() WHERE created_at IS NULL');
    }

    public function down(Schema $schema): void
    {
        // Remove the created_at column
        $this->addSql('ALTER TABLE ad DROP created_at');
    }
}
