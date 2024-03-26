<?php

namespace App\EventListener;

use App\Entity\Ticket;
use Doctrine\ORM\Events;
use App\Service\TicketCodeGenerator;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;

#[AsEntityListener(event: Events::prePersist, method: 'prePersist', entity: Ticket::class)]
class TicketLifecycleListener
{
    private $ticketCodeGenerator;

    public function __construct(TicketCodeGenerator $ticketCodeGenerator)
    {
        $this->ticketCodeGenerator = $ticketCodeGenerator;
    }

    public function prePersist(Ticket $ticket): void
    {
        $code = $this->ticketCodeGenerator->generateReservationCode();
        $ticket->setCode($code);
    }
}