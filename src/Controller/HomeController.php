<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\TicketCodeGenerator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/', name: 'home.')]
class HomeController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(): Response
    {
        // dd($this->getParameter('app.exhibition_id'));
        return $this->render('home/index.html.twig');
    }

    #[Route('/test', name: 'test')]
    public function test(EntityManagerInterface $entityManagerInterface): Response
    {
        $user = new User();
        $user
            ->setEmail('testMDP@test.fr')
            ->setRoles(['ROLE_ADMIN'])
            ->setLastName('sansmdp')
            ->setFirstName('sansmdp')
        ;

        $entityManagerInterface->persist($user);
        $entityManagerInterface->flush();

        return $this->render('home/index.html.twig');
    }

    // #[Route('/test', name: 'test')]
    // public function test(TicketCodeGenerator $codeGenerator): Response
    // {
    //     dd($codeGenerator->generateReservationCode());
    //     // EntityManagerInterface $entityManagerInterface, UserPasswordHasherInterface $userPasswordHasherInterface

    //     // $user = new User();
    //     // $user
    //     //     ->setEmail('admin@test.fr')
    //     //     ->setPassword($userPasswordHasherInterface->hashPassword($user, 'test'))
    //     //     ->setRoles(['ROLE_ADMIN'])
    //     //     ->setLastName('AdminNom')
    //     //     ->setFirstName('AdminPrenom')
    //     // ;

    //     // $entityManagerInterface->persist($user);
    //     // $entityManagerInterface->flush();
    //     return $this->render('home/index.html.twig');
    // }
}