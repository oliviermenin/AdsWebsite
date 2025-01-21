<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Patch;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(),
        new Get(),
        new Delete(),
        new Patch()
    ]
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, unique: true)]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $role = null;

    /**
     * @var Collection<int, Ad>
     */
    #[ORM\OneToMany(targetEntity: Ad::class, mappedBy: 'created_by')]
    private Collection $ads;

    /**
     * @var Collection<int, Chat>
     */
    #[ORM\OneToMany(targetEntity: Chat::class, mappedBy: 'sender')]
    private Collection $chats;

    #[ORM\Column(length: 255)]
    private ?string $address = null;

    #[ORM\Column(length: 255)]
    private ?string $zipcode = null;

    #[ORM\Column(length: 255)]
    private ?string $country = null;

    public function __construct()
    {
        $this->ads = new ArrayCollection();
        $this->chats = new ArrayCollection();
    }

    #[ORM\PrePersist]
    #[ORM\PreUpdate]
    public function hashPassword(): void
    {
        if ($this->password) {
            $hasher = new \Symfony\Component\PasswordHasher\Hasher\NativePasswordHasher();
            $this->password = $hasher->hash($this->password);
        }
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getRole(): ?string
    {
        return $this->role;
    }

    public function setRole(string $role): static
    {
        $this->role = $role;

        return $this;
    }

    /**
     * @return Collection<int, Ad>
     */
    public function getAds(): Collection
    {
        return $this->ads;
    }

    public function addAd(Ad $ad): static
    {
        if (!$this->ads->contains($ad)) {
            $this->ads->add($ad);
            $ad->setCreatedBy($this);
        }

        return $this;
    }

    public function removeAd(Ad $ad): static
    {
        if ($this->ads->removeElement($ad)) {
            if ($ad->getCreatedBy() === $this) {
                $ad->setCreatedBy(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Chat>
     */
    public function getChats(): Collection
    {
        return $this->chats;
    }

    public function addChat(Chat $chat): static
    {
        if (!$this->chats->contains($chat)) {
            $this->chats->add($chat);
            $chat->setSender($this);
        }

        return $this;
    }

    public function removeChat(Chat $chat): static
    {
        if ($this->chats->removeElement($chat)) {
            if ($chat->getSender() === $this) {
                $chat->setSender(null);
            }
        }

        return $this;
    }

    public function getRoles(): array
    {
        return [$this->role];
    }

    public function eraseCredentials(): void
    {

    }

    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $adress): static
    {
        $this->address = $adress;

        return $this;
    }

    public function getZipcode(): ?int
    {
        return $this->zipcode;
    }

    public function setZipcode(int $zipcode): static
    {
        $this->zipcode = $zipcode;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): static
    {
        $this->country = $country;

        return $this;
    }
}
