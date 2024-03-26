<?php

namespace App\Service;

use App\Repository\TicketRepository;

class TicketCodeGenerator
{
    private const CODE_LENGTH = 6;
    private const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    private $ticketRepository;

    public function __construct(TicketRepository $ticketRepository)
    {
        $this->ticketRepository = $ticketRepository;
    }

    public function generateReservationCode(): string
    {
        do {
            $code = $this->generateRandomCode();
            $ticket = $this->ticketRepository->findOneByCodeAndFutureReservation($code, new \DateTime());

        } while ($ticket);

        return $code;
    }

    private function generateRandomCode(): string
    {
        $code = '';

        for ($i = 0; $i < self::CODE_LENGTH; $i++) {
            $code .= self::CHARACTERS[rand(0, strlen(self::CHARACTERS) - 1)];
        }

        return $code;
    }
}