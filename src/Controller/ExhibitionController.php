<?php

namespace App\Controller;

use App\Repository\TicketRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/exhibition', name: 'exhibition.')]
#[IsGranted('ROLE_USER')]
class ExhibitionController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(TicketRepository $ticketRepository): Response
    {
        $user = $this->getUser();

        $hasTodayEvent = $ticketRepository->userHasTicketOnDate($user->getId(), new \DateTime());

        if (!$hasTodayEvent) {
            $tickets = $ticketRepository->findByUserIdAndDate($user->getId(), new \DateTime());

            return $this->render('exhibition/wait.html.twig', [
                'tickets' => $tickets
            ]);
        }

        return $this->render('exhibition/index.html.twig');
    }
}
