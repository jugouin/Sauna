<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240815153125 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY fk_constraint');
        $this->addSql('DROP INDEX fk_constraint ON reservation');
        $this->addSql('ALTER TABLE reservation ADD sauna_id INT NOT NULL, ADD person_nb INT NOT NULL, DROP sauna, DROP personNb, CHANGE id id INT AUTO_INCREMENT NOT NULL, CHANGE name name VARCHAR(255) NOT NULL, CHANGE surname surname VARCHAR(255) NOT NULL, CHANGE phone phone VARCHAR(20) NOT NULL, CHANGE remarks remarks LONGTEXT DEFAULT NULL, CHANGE startTime start_time TIME NOT NULL, CHANGE privatizated privatized TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C84955D4BD751 FOREIGN KEY (sauna_id) REFERENCES sauna (id)');
        $this->addSql('CREATE INDEX IDX_42C84955D4BD751 ON reservation (sauna_id)');
        $this->addSql('ALTER TABLE sauna CHANGE location location VARCHAR(255) NOT NULL, CHANGE type type VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C84955D4BD751');
        $this->addSql('DROP INDEX IDX_42C84955D4BD751 ON reservation');
        $this->addSql('ALTER TABLE reservation ADD sauna INT NOT NULL, ADD personNb INT NOT NULL, DROP sauna_id, DROP person_nb, CHANGE id id INT NOT NULL, CHANGE name name VARCHAR(50) NOT NULL, CHANGE surname surname VARCHAR(50) NOT NULL, CHANGE phone phone VARCHAR(50) NOT NULL, CHANGE remarks remarks VARCHAR(255) DEFAULT NULL, CHANGE start_time startTime TIME NOT NULL, CHANGE privatized privatizated TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT f_constraint FOREIGN KEY (sauna) REFERENCES sauna (id)');
        $this->addSql('CREATE INDEX f_constraint ON reservation (sauna)');
        $this->addSql('ALTER TABLE sauna CHANGE location location VARCHAR(50) NOT NULL, CHANGE type type VARCHAR(50) NOT NULL');
    }
}
