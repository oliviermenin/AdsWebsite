<?php

namespace App\Security;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use App\Security\JWTCustomPayload;
use Symfony\Component\Security\Core\User\UserInterface;

class JWTCreatedListener
{
    private JWTCustomPayload $customPayload;

    public function __construct(JWTCustomPayload $customPayload)
    {
        $this->customPayload = $customPayload;
    }

    /**
     *
     * @param JWTCreatedEvent $event
     */
    public function onJWTCreated(JWTCreatedEvent $event): void
    {
        $user = $event->getUser();

        if ($user instanceof UserInterface) {
            $payload = $this->customPayload->createCustomPayload($user);
            $event->setData($payload);
        }
    }
}
