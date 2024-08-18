<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class SmallSauna extends Sauna {
    private $reservations = [];

    public function __construct($location) {
        parent::__construct($location, 4);
    }
    

    public function isAvailable($date, $startTime) :bool
    {
        $reservationsCount = 0;
        foreach ($this->reservations as $reservation) {
            if ($reservation->date == $date && $reservation->startTime == $startTime) {
                if ($reservation->privatized || $reservation->personNb >= 2) {
                    return false;
                }
                $reservationsCount += $reservation->personNb;
            }
        }
        return $reservationsCount < 2;
    }

    public function addReservation($reservation) {
        $this->reservations[] = $reservation;
    }
}
