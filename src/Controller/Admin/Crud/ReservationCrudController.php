<?php

namespace App\Controller\Admin\Crud;

use App\Entity\Ticket;
use App\Entity\Reservation;
use App\Repository\ExhibitionRepository;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use EasyCorp\Bundle\EasyAdminBundle\Field\CollectionField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

#[IsGranted('ROLE_ADMIN')]
class ReservationCrudController extends AbstractCrudController
{
    private $exhibitionRepository;

    public function __construct(ExhibitionRepository $exhibitionRepository)
    {
        $this->exhibitionRepository = $exhibitionRepository;
    }
    
    public static function getEntityFqcn(): string
    {
        return Reservation::class;
    }

    public function persistEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        $exhibition = $this->exhibitionRepository->findOneById(1);
        $entityInstance->setExhibition($exhibition);

        parent::persistEntity($entityManager, $entityInstance);
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            DateTimeField::new('reservationAt'),
            AssociationField::new('user'),
            CollectionField::new('tickets')
                ->useEntryCrudForm()
        ];
    }
}