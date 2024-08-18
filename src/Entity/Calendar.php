<?php

namespace App\Entity;

use App\Interfaces\ReservationInterface;

class Calendar implements ReservationInterface {
    private $saunas;

    public function __construct() {
        $this->saunas = [];
    }

    public function addSauna($sauna) {
        $this->saunas[] = $sauna;
    }

    public function reserve($reservation) {
        foreach ($this->saunas as $sauna) {
            if ($sauna->isAvailable($reservation->date, $reservation->startTime)) {
                $sauna->addReservation($reservation);
                return true;
            }
        }
        return false;
    }

    public function getReservations() {
        $reservations = [];
        foreach ($this->saunas as $sauna) {
            $reservations = array_merge($reservations, $sauna->reservations);
        }
        return $reservations;
    }
}
