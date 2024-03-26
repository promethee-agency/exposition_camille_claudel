<?php

namespace App\Controller;

use App\Entity\Reservation;
use App\Form\ReservationType;
use App\Repository\CategoryRepository;
use App\Repository\ExhibitionRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

#[Route('/boutique', name: 'store.')]
#[IsGranted('ROLE_USER')]
class StoreController extends AbstractController
{
    #[Route('/', name: 'create')]
    public function create(ExhibitionRepository $exhibitionRepository, CategoryRepository $categoryRepository, Request $request, EntityManagerInterface $entityManager, UserRepository $userRepository): Response
    {
        $reservation = new Reservation();
        
        $exhibitionId = $this->getParameter('app.exhibition_id');

        $exhibition = $exhibitionRepository->findOneById($exhibitionId);

        $categories = $categoryRepository->createQueryBuilder('r')
            ->where('r.exhibition = :exhibition')
            ->setParameter('exhibition', $exhibitionId)
            ->getQuery()
            ->getResult()
        ;

        $form = $this->createForm(ReservationType::class, $reservation);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $reservation->setExhibition($exhibition);
            $reservation->setUser($this->getUser());

            foreach($reservation->getTickets() as $ticket) {
                $dbUser = $userRepository->findOneByEmail($ticket->getUser()->getEmail());

                if ($dbUser) {
                    $ticket->setUser($dbUser);
                }
            }
            
            $entityManager->persist($reservation);
            $entityManager->flush();

            return $this->render('base.html.twig');
        }

        return $this->render('store/create.html.twig', [
            'form' => $form,
            'exhibition' => $exhibition,
            'categories' => $categories
        ]);
    }
}
