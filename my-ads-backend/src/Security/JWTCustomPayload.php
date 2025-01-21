<?php

namespace App\Security;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class JWTCustomPayload
{
    private JWTTokenManagerInterface $jwtManager;

    public function __construct(JWTTokenManagerInterface $jwtManager)
    {
        $this->jwtManager = $jwtManager;
    }

    /**
     *
     * @param UserInterface $user
     *
     * @return array
     */
    public function createCustomPayload(UserInterface $user): array
    {
        return [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'roles' => $user->getRoles(),
            'name' => $user->getName(),
            'address' => $user->getAddress(),
            'zipcode'=> $user->getZipcode(),
        ];
    }
}
