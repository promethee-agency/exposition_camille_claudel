<?php

namespace App\Controller\Admin\Crud;

use App\Entity\Category;
use App\Repository\ExhibitionRepository;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted('ROLE_ADMIN')]
class CategoryCrudController extends AbstractCrudController
{
    private $exhibitionRepository;

    public function __construct(ExhibitionRepository $exhibitionRepository)
    {
        $this->exhibitionRepository = $exhibitionRepository;
    }

    public static function getEntityFqcn(): string
    {
        return Category::class;
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
            IntegerField::new('price'),
            TextField::new('name'),
            IntegerField::new('minAge'),
            IntegerField::new('maxAge')
        ];
    }
}
