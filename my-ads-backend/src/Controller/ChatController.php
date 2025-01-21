<?php
namespace App\Controller;

use App\Entity\Chat;
use App\Repository\ChatRepository;
use App\Repository\AdRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;

class ChatController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/chats/{adId}', methods: ['GET'])]
    public function getMessages(int $adId, ChatRepository $chatRepository)
    {
        $chats = $chatRepository->findBy(['ad' => $adId], ['createdAt' => 'ASC']);
    
        $serializer = new Serializer([new ObjectNormalizer()], [new JsonEncoder()]);
        $data = $serializer->normalize($chats, null, ['groups' => 'chat:read']);
    
        return $this->json($data);
    }

    #[Route('/chats', methods: ['POST'])]
    public function sendMessage(Request $request, UserRepository $userRepository, AdRepository $adRepository)
    {
        $data = json_decode($request->getContent(), true);

        $sender = $userRepository->find($data['senderId']);
        $receiver = $userRepository->find($data['receiverId']);
        $ad = $adRepository->find($data['adId']);

        if (!$sender || !$receiver || !$ad) {
            return $this->json(['error' => 'Invalid sender, receiver, or ad'], 400);
        }

        $chat = new Chat();
        $chat->setSender($sender);
        $chat->setReceiver($receiver);
        $chat->setAd($ad);
        $chat->setMessage($data['message']);
        $chat->setCreatedAt(createdAt: new \DateTimeImmutable());

        $this->entityManager->persist($chat);
        $this->entityManager->flush();

        return new JsonResponse(['status' => 'Message sent'], 201);
    }
}
