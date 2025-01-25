<?php

namespace App\Form;

use App\Entity\Reservation;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ReservationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
        ->add('name', TextType::class, [
            'label' => 'Prénom'
        ])
        ->add('surname', TextType::class, [
            'label' => 'Nom'
        ])
        ->add('phone', TextType::class, [
            'label' => 'Téléphone'
        ])
        ->add('email', TextType::class, [
            'label' => 'E-mail'
        ])
        ->add('date', DateTimeType::class, [
            'widget' => 'single_text',
            'label' => 'Date de réservation',
            'input' => 'datetime',
            'model_timezone' => 'Europe/Paris',
            'view_timezone' => 'Europe/Paris',
        ])
        ->add('privatized', CheckboxType::class, [
            'label' => 'privatized',
            'required' => false,
        ])
        ->add('remarks', TextareaType::class, [
            'label' => 'Remarque',
            'required' => false,
        ])
        ->add('personNb', IntegerType::class, [
            'label' => 'Nombre de personne'
        ])
        ->add('saunaType', TextType::class, [
            'label' => 'Type de sauna',
        ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Reservation::class,
        ]);
    }
}