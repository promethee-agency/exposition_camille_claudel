<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectController extends AbstractController
{
    public function redirectToLocale(Request $request): Response
    {
        $userLocale = $request->getLocale();
        $supportedLocales = explode('|', $this->getParameter('app.supported_locales'));

        if (in_array($userLocale, $supportedLocales)) {
            return $this->redirectToRoute('home.index', ['_locale' => $userLocale], 301);
        } else {
            return $this->redirectToRoute('home.index', status: 301);
        }
    }
}
