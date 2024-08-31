<?php

namespace App\Entity;

use App\Traits\TimestampTrait;
use App\Repository\ReservationRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\Table;
use Symfony\Component\Serializer\Annotation\Groups;

#[Groups(['reservation'])]
#[Table('reservation')]
#[ORM\Entity(repositoryClass: ReservationRepository::class)]
class Reservation {
    use TimestampTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(name: 'name', type: 'string', length: 255)]
    private $name;

    #[ORM\Column(name: 'surname', type: 'string', length: 255)]
    private $surname;

    #[ORM\Column(name: 'phone', type: 'string', length: 20)]
    private $phone;

    #[ORM\Column(name: 'date', type: 'date')]
    private $date;

    #[ORM\Column(name: 'startTime',type: 'string', length: 20)]
    private $startTime;

    #[ORM\Column(name: 'privatized', type: 'boolean')]
    private $privatized;

    #[ORM\Column(name: 'remarks', type: 'string', length: 255, nullable: true)]
    private $remarks;

    #[ORM\Column(name: 'personNb', type: 'integer')]
    private $personNb;

    public function __construct($name, $surname, $phone, $date, $startTime, $privatized, $remarks, $personNb) {
        $this->name = $name;
        $this->surname = $surname;
        $this->phone = $phone;
        $this->date = $date;
        $this->startTime = $startTime;
        $this->privatized = $privatized;
        $this->remarks = $remarks;
        $this->personNb = $personNb;
        $this->setTimestamps();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getSurname(): ?string
    {
        return $this->surname;
    }

    public function setSurname(string $surname): self
    {
        $this->surname = $surname;
        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): self
    {
        $this->phone = $phone;
        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;
        return $this;
    }

    public function getStartTime(): ?string
    {
        return $this->startTime;
    }

    public function setStartTime(string $startTime): self
    {
        $this->startTime = $startTime;
        return $this;
    }

    public function isPrivatized(): ?bool
    {
        return $this->privatized;
    }

    public function setPrivatized(bool $privatized): self
    {
        $this->privatized = $privatized;
        return $this;
    }

    public function getRemarks(): ?string
    {
        return $this->remarks;
    }

    public function setRemarks(?string $remarks): self
    {
        $this->remarks = $remarks;
        return $this;
    }

    public function getPersonNb(): ?int
    {
        return $this->personNb;
    }

    public function setPersonNb(int $personNb): self
    {
        $this->personNb = $personNb;
        return $this;
    }
}
