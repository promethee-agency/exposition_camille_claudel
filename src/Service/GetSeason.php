<?php

namespace App\Service;

use DateTimeImmutable;
use DateTime;

class GetSeason
{
    public function getSeasonName(DateTimeImmutable $date): ?string
    {
        $year = (int)$date->format('Y');

        $seasons = array(
            'winter' => array(
                'start' => new DateTime($year . '-12-21'),
                'end' => new DateTime(($year + 1) . '-03-20')
            ),
            'spring' => array(
                'start' => new DateTime($year . '-03-21'),
                'end' => new DateTime($year . '-06-20')
            ),
            'summer' => array(
                'start' => new DateTime($year . '-06-21'),
                'end' => new DateTime($year . '-09-20')
            ),
            'autumn' => array(
                'start' => new DateTime($year . '-09-21'),
                'end' => new DateTime($year . '-12-20')
            )
        );

        foreach ($seasons as $season => $dates) {
            if ($date >= $dates['start'] && $date < $dates['end']) {
                return $season;
            }
        }

        return null;
    }
}