<?php

namespace App\Interfaces;

interface SaunaInterface {
    public function isAvailable(\DateTime $date, \DateTime $startTime): bool;
    public function getCapacity(): int;
}
