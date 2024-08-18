<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;


#[ORM\Entity]
#[ORM\Table(name: 'sauna')]
#[ORM\InheritanceType("SINGLE_TABLE")]
#[ORM\DiscriminatorColumn(name: 'type', type: 'string')]
#[ORM\DiscriminatorMap(['small' => 'SmallSauna', 'large' => 'LargeSauna'])]
abstract class Sauna {
    
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer')]
    protected ?int $id = null;

    #[ORM\Column(type: 'string', length: 255)]
    protected string $location;

    #[ORM\Column(type: 'integer')]
    protected int $capacity;

    public function __construct(string $location, int $capacity) {
        $this->location = $location;
        $this->capacity = $capacity;
    }

    public function getId(): ?int {
        return $this->id;
    }

    public function getLocation(): string {
        return $this->location;
    }

    public function setLocation(string $location): self {
        $this->location = $location;
        return $this;
    }
    
    public function getCapacity(): int {
        return $this->capacity;
    }
    
    public function setCapacity(int $capacity): self {
        $this->capacity = $capacity;
        return $this;
    }

        abstract public function isAvailable(\DateTime $date, \DateTime $startTime): bool;
    }