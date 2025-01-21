<?php

namespace App\Controller;

use App\Entity\Ad;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Routing\Annotation\Route;


class AdController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function createAd(Request $request, SerializerInterface $serializer, ValidatorInterface $validator): Response
    {
        $title = $request->get('title');
        $description = $request->get('description');
        $price = $request->get('price');
        $location = $request->get('location');
        $category = $request->get('category');
        
        /** @var UploadedFile $file */
        $file = $request->files->get('picture');

        if ($file) {
            $filename = uniqid() . '.' . $file->guessExtension();
            $file->move($this->getParameter('upload_directory'), $filename);
        }

        $ad = new Ad();
        $ad->setTitle($title);
        $ad->setDescription($description);
        $ad->setPrice($price);
        $ad->setLocation($location);
        $ad->setCategory($category);
        $ad->setPicture($filename);
        $ad->setCreatedAt(createdAt: new \DateTimeImmutable());


        $errors = $validator->validate($ad);
        if (count($errors) > 0) {
            return $this->json(['errors' => $errors], Response::HTTP_BAD_REQUEST);
        }

        $this->entityManager->persist($ad);
        $this->entityManager->flush();

        return $this->json($ad, Response::HTTP_CREATED);
    }

    #[Route('/users/{id}/ads', name: 'get_user_ads', methods: ['GET'])]
    public function getUserAds(int $id): Response
    {
        $user = $this->entityManager->getRepository(User::class)->find($id);

        if (!$user) {
            return $this->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $ads = $this->entityManager->getRepository(Ad::class)->findBy(['created_by' => $user]);

        return $this->json($ads, Response::HTTP_OK, [], ['groups' => 'ad:read']);
    }
}
