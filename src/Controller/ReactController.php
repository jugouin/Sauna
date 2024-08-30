<?php

namespace App\Controller;

use App\Repository\ReservationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\Context\Normalizer\ObjectNormalizerContextBuilder;
use Symfony\Component\Serializer\SerializerInterface;

class ReactController extends AbstractController
{
    #[Route('/', name: 'home')]
    public function index(): Response
    {
        return $this->render('home.html.twig');
    }

    #[Route('/reservation', name: 'reservation')]
    public function reservation(ReservationRepository $reservationRepository, SerializerInterface $serializer): Response
    {
        $reservations_data = $reservationRepository->findAll();

        $context = (new ObjectNormalizerContextBuilder())
            ->withGroups('reservation')
            ->toArray();

        $reservations_json = $serializer->serialize($reservations_data, 'json', $context);

        return $this->render('reservation/new.html.twig', [
            'reservations_json' => $reservations_json,
        ]);
    }

    #[Route('/about', name: 'about')]
    public function about(): Response
    {
        return $this->render('Pages/about.html.twig');
    }

    #[Route('/contact', name: 'contact')]
    public function contact(): Response
    {
        return $this->render('Pages/contact.html.twig');
    }
}
