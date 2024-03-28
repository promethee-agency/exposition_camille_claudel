<?php

namespace App\Twig;

use App\Service\GetSeason;
use DateTime;
use DateTimeImmutable;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class AppExtension extends AbstractExtension
{
    public function __construct(
        private GetSeason $getSeason
    ) {}
    public function getFilters(): array
    {
        return [
            new TwigFilter('season', [$this, 'season']),
        ];
    }

    public function season(DateTimeImmutable $season): string
    {
        $seasonName = $this->getSeason->getSeasonName($season);

        return $seasonName;
    }
}