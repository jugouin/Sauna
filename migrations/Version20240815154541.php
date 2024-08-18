<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240815154541 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C84955D4BD751 FOREIGN KEY (sauna_id) REFERENCES sauna (id)');
        $this->addSql('CREATE INDEX IDX_42C84955D4BD751 ON reservation (sauna_id)');
        $this->addSql('ALTER TABLE sauna CHANGE id id INT AUTO_INCREMENT NOT NULL, CHANGE location location VARCHAR(255) NOT NULL, CHANGE type type VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C84955D4BD751');
        $this->addSql('DROP INDEX IDX_42C84955D4BD751 ON reservation');
        $this->addSql('ALTER TABLE sauna CHANGE id id INT NOT NULL, CHANGE location location VARCHAR(50) NOT NULL, CHANGE type type VARCHAR(50) NOT NULL');
    }
}
