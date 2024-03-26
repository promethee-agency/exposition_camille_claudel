<?php

namespace App\Form;

use App\Entity\User;
use App\Entity\Ticket;
use App\Entity\Category;
use App\Repository\UserRepository;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class TicketType extends AbstractType
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('users', CollectionType::class, [
                'entry_type' => UserType::class,
                'by_reference' => false,
                'label' => false,
                // 'mapped' => false,
                'allow_add' => true,
                'allow_delete' => true,
                'entry_options' => [
                    'label' => false
                ]
            ])
            ->add('category', EntityType::class, [
                'class' => Category::class,
                'label' => false,
                'required' => false,
                'attr' => [
                    'style' => 'display: none;',
                ]
            ])
            // ->addEventListener(FormEvents::PRE_SUBMIT, function (FormEvent $event) {
            //     $formData = $event->getData();
            
            //     // Vérifiez si un utilisateur avec le même e-mail existe dans la base de données
            //     $dbUser = $this->userRepository->findOneByEmail($formData['users'][0]['email']);
            
            //     if ($dbUser !== null) {
            //         // Associer l'utilisateur existant au ticket
            //         $formData['ticket']['user'] = $dbUser;
            //         // Supprimer le champ 'users' de la structure de données du formulaire
            //         unset($formData['users']);
            //     }
                
            //     $event->setData($formData);
            // })
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Ticket::class,
        ]);
    }
}
