<?php

namespace App\Traits;

trait TimestampTrait {
    private $createdAt;
    private $updatedAt;

    public function setTimestamps() {
        $this->createdAt = new \DateTime();
        $this->updatedAt = new \DateTime();
    }

    public function updateTimestamp() {
        $this->updatedAt = new \DateTime();
    }

    public function getCreatedAt() {
        return $this->createdAt;
    }

    public function getUpdatedAt() {
        return $this->updatedAt;
    }
}
