<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/exhibition', name: 'exhibition.')]
#[IsGranted('ROLE_USER')]
class ExhibitionController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(): Response
    {
        return $this->render('exhibition/index.html.twig', [
            'controller_name' => 'ExhibitionController',
        ]);
    }
}
