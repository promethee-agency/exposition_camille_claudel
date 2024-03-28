<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use function Symfony\Component\Translation\t;

class RegistrationFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('lastName', TextType::class, [
                'label' => t('register.form.lastName', domain: 'security'),
            ])
            ->add('firstName', TextType::class, [
                'label' => t('register.form.firstName', domain: 'security'),
            ])
            ->add('email', EmailType::class, [
                'label' => t('register.form.email', domain: 'security'),
            ])
            ->add('plainPassword', PasswordType::class, [
                'label' => t('register.form.password', domain: 'security'),
                'mapped' => false,
                'attr' => ['autocomplete' => 'new-password'],
                'constraints' => [
                    new NotBlank([
                        'message' => t('register.form.message.notBlank', domain: 'security'),
                    ]),
                    new Length([
                        'min' => 6,
                        'minMessage' => t('register.form.message.min', domain: 'security'),
                        'max' => 4096,
                    ]),
                ],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
