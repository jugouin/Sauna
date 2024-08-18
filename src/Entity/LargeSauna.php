<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class LargeSauna extends Sauna {
    private $reservations = [];

    public function __construct($location, $name) {
        parent::__construct($location, $name, 10);
    }

    public function isAvailable($date, $startTime) :bool
    {
        $reservationsCount = 0;
        foreach ($this->reservations as $reservation) {
            if ($reservation->date == $date && $reservation->startTime == $startTime) {
                $reservationsCount += $reservation->personNb;
            }
        }
        return $reservationsCount < 10;
    }

    public function addReservation($reservation) {
        $this->reservations[] = $reservation;
    }
}
