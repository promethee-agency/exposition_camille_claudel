<?php

namespace App\EventListener;

use App\Repository\TicketRepository;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Security\Http\Event\LoginFailureEvent;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

final class LoginFailureEventListener
{
    public function __construct(
        private TicketRepository $ticketRepository, private TokenStorageInterface $tokenStorage, private EventDispatcherInterface $dispatcher, private UrlGeneratorInterface $urlGenerator
    ) {}

    #[AsEventListener(event: LoginFailureEvent::class)]
    public function onLoginFailureEvent(LoginFailureEvent $event): void
    {
        $username = $event->getRequest()->request->get('email');
        $code = $event->getRequest()->request->get('password');

        $ticket = $this->ticketRepository->findOneByUserAndCodeAndFutureReservation($username, $code, new \DateTime());

        if ($ticket !== null && $ticket->getUser()->getEmail() === $username) {
            $token = new UsernamePasswordToken($ticket->getUser(), 'main', $ticket->getUser()->getRoles());
            $this->tokenStorage->setToken($token);

            $this->dispatcher->dispatch(new InteractiveLoginEvent($event->getRequest(), $token));

            $url = $this->urlGenerator->generate('exhibition.index');
            $event->setResponse(new RedirectResponse($url));
        }
    }
}
