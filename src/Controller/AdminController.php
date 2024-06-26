<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Reservation;
use App\Entity\User;
use App\Repository\ReservationRepository;
use App\Repository\TicketRepository;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/admin', name: 'admin.')]
#[IsGranted('ROLE_ADMIN')]
class AdminController extends AbstractDashboardController
{
    public function __construct(
        private TicketRepository $ticketRepository,
        private ReservationRepository $reservationRepository,
    ) {}

    #[Route('/', name: 'index')]
    public function index(): Response
    {
       $ticketsThisMonth = $this->ticketRepository->countTicketsForMonth(new \DateTime());
       $reservationsThisMonth = $this->reservationRepository->countReservationsForMonth(new \DateTime());
       $gainsThisYear = $this->ticketRepository->countTicketsPriceGainForYear(new \DateTime());
       $averageGains = $this->ticketRepository->averageGainPerReservation(new \DateTime());
       $lastTickets = $this->ticketRepository->getLastEntries();

        return $this->render('admin/index.html.twig', [
            'ticketsThisMonth' => $ticketsThisMonth,
            'reservationsThisMonth' => $reservationsThisMonth,
            'gainsThisYear' => $gainsThisYear,
            'averageGains' => $averageGains,
            'lastTickets' => $lastTickets
        ]);
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Camille Claudel, l\'art en 4 temps')
            ->setFaviconPath('favicon.ico')
            ->setTranslationDomain('admin')
            ->setLocales([
                'fr' => 'Français',
                'en' => 'English'
            ])
        ;
    }

    public function configureMenuItems(): iterable
    {
        return [
            MenuItem::linkToDashboard('Dashboard', 'fa fa-home'),
            MenuItem::linkToCrud('Users', 'fa fa-user', User::class),
            MenuItem::linkToCrud('Reservations', 'fa fa-ticket', Reservation::class),
            MenuItem::linkToCrud('Categories', 'fa fa-list', Category::class)
        ];
    }
}
