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

    #[ORM\Column(name: 'email', type: 'string', length: 50)]
    private $email;

    #[ORM\Column(name: 'date', type: 'datetime')]
    private $date;

    #[ORM\Column(name: 'privatized', type: 'boolean')]
    private $privatized;

    #[ORM\Column(name: 'remarks', type: 'string', length: 255, nullable: true)]
    private $remarks;

    #[ORM\Column(name: 'personNb', type: 'integer')]
    private $personNb;

    #[ORM\Column(name: 'saunaType', type: 'string')]
    private $saunaType;

    public function __construct($name, $surname, $phone, $email, $date, $privatized, $remarks, $personNb, $saunaType) {
        $this->name = $name;
        $this->surname = $surname;
        $this->phone = $phone;
        $this->email = $email;
        $this->date = $date;
        $this->privatized = $privatized;
        $this->remarks = $remarks;
        $this->personNb = $personNb;
        $this->saunaType = $saunaType;
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

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;
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

    public function getSaunaType(): ?string
    {
        return $this->saunaType;
    }

    public function setSaunaType(?string $saunaType): self
    {
        $this->saunaType = $saunaType;
        return $this;
    }
}
