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

    #[ORM\Column(type: 'string', length: 255)]
    private $name;

    #[ORM\Column(type: 'string', length: 255)]
    private $surname;

    #[ORM\Column(type: 'string', length: 20)]
    private $phone;

    #[ORM\Column(type: 'integer')]
    private $personNb;

    #[ORM\Column(type: 'date')]
    private $date;

    #[ORM\Column(type: 'time')]
    private $startTime;

    #[ORM\Column(type: 'boolean')]
    private $privatized;

    #[ORM\Column(type: 'text', nullable: true)]
    private $remarks;

    #[ORM\ManyToOne(targetEntity: SmallSauna::class)]
    #[ORM\JoinColumn(nullable: false)]
    private $sauna;

    public function __construct($name, $surname, $phone, $personNb, $date, $startTime, $privatized, $remarks, $sauna) {
        $this->name = $name;
        $this->surname = $surname;
        $this->phone = $phone;
        $this->personNb = $personNb;
        $this->date = $date;
        $this->startTime = $startTime;
        $this->privatized = $privatized;
        $this->remarks = $remarks;
        $this->sauna = $sauna;
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

    public function getPersonNb(): ?int
    {
        return $this->personNb;
    }

    public function setPersonNb(int $personNb): self
    {
        $this->personNb = $personNb;
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

    public function getStartTime(): ?\DateTimeInterface
    {
        return $this->startTime;
    }

    public function setStartTime(\DateTimeInterface $startTime): self
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

    public function getSauna(): ?SmallSauna
    {
        return $this->sauna;
    }

    public function setSauna(SmallSauna $sauna): self
    {
        $this->sauna = $sauna;
        return $this;
    }
}
