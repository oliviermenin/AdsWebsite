<?php

namespace App\Security;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class JWTCreator
{
    private $jwtManager;

    public function __construct(JWTTokenManagerInterface $jwtManager)
    {
        $this->jwtManager = $jwtManager;
    }

    public function createFromUser(UserInterface $user)
    {
        $payload = [
            'username' => $user->getUserIdentifier(),
            'roles' => $user->getRoles(),
        ];

        if ($user instanceof User) {
            $payload['id'] = $user->getId();
            $payload['name'] = $user->getName();
            $payload['address'] = $user->getAddress();
            $payload['zipcode'] = $user->getZipcode();
            $payload['country'] = $user->getCountry();
        }

        return $this->jwtManager->createFromPayload($user, $payload);
    }
}

