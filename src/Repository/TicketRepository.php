<?php

namespace App\Repository;

use App\Entity\Ticket;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Ticket>
 *
 * @method Ticket|null find($id, $lockMode = null, $lockVersion = null)
 * @method Ticket|null findOneBy(array $criteria, array $orderBy = null)
 * @method Ticket[]    findAll()
 * @method Ticket[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TicketRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Ticket::class);
    }

    public function findOneByCodeAndFutureReservation($code, $date): ?Ticket
    {
        return $this->createQueryBuilder('t')
            ->leftJoin('t.reservation', 'r')
            ->andWhere('t.code = :code')
            ->andWhere('r.reservationAt > :date')
            ->setParameter('code', $code)
            ->setParameter('date', $date)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findOneByUserAndCodeAndFutureReservation($email, $code, $date): ?Ticket
    {
        return $this->createQueryBuilder('t')
            ->leftJoin('t.reservation', 'r')
            ->leftJoin('t.user', 'u')
            ->andWhere('t.code = :code')
            ->andWhere('r.reservationAt > :date')
            ->andWhere('u.email = :email')
            ->setParameter('code', $code)
            ->setParameter('date', $date)
            ->setParameter('email', $email)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findByUserIdAndDate($userId, $date): ?Array
    {
        return $this->createQueryBuilder('t')
            ->leftJoin('t.user', 'u')
            ->leftJoin('t.reservation', 'r')
            ->andWhere('r.reservationAt > :date')
            ->andWhere('u.id = :userId')
            ->setParameter('userId', $userId)
            ->setParameter('date', $date)
            ->getQuery()
            ->getResult();
    }

    public function userHasTicketOnDate($userId, \DateTime $date): bool
    {
        $startPeriod = clone $date;
        $startPeriod->setTime(0, 0, 0);
    
        $endPeriod = clone $startPeriod;
        $endPeriod->modify('+1 day');
    
        $queryBuilder = $this->createQueryBuilder('t')
            ->select('COUNT(t.id)')
            ->leftJoin('t.user', 'u')
            ->leftJoin('t.reservation', 'r')
            ->andWhere('r.reservationAt >= :startPeriod')
            ->andWhere('r.reservationAt < :endPeriod')
            ->andWhere('u.id = :userId')
            ->setParameter('userId', $userId)
            ->setParameter('startPeriod', $startPeriod)
            ->setParameter('endPeriod', $endPeriod);
    
        $count = $queryBuilder->getQuery()->getSingleScalarResult();
    
        return $count > 0;
    }

    public function countTicketsForMonth(\DateTime $date): int
    {
        $firstDate = clone $date;
        $firstDate->setTime(0, 0, 0);
        $firstDate->modify('-1 month');
    
        $queryBuilder = $this->createQueryBuilder('t')
            ->select('COUNT(t.id)')
            ->leftJoin('t.reservation', 'r')
            ->andWhere('r.reservationAt > :firstDate')
            ->setParameter('firstDate', $firstDate);
    
        $count = $queryBuilder->getQuery()->getSingleScalarResult();
    
        return $count;
    }

    public function countTicketsPriceGainForYear(\DateTime $date): int
    {
        $firstDate = clone $date;
        $firstDate->setTime(0, 0, 0);
        $firstDate->modify('-1 year');
    
        $queryBuilder = $this->createQueryBuilder('t')
            ->select('SUM(c.price)')
            ->leftJoin('t.reservation', 'r')
            ->leftJoin('t.category', 'c')
            ->andWhere('r.reservationAt > :firstDate')
            ->setParameter('firstDate', $firstDate);
    
        $sum = $queryBuilder->getQuery()->getSingleScalarResult();
    
        return $sum;
    }

    public function averageGainPerReservation(\DateTime $date): float
    {
        $firstDate = clone $date;
        $firstDate->setTime(0, 0, 0);
        $firstDate->modify('-1 year');
    
        $queryBuilder = $this->createQueryBuilder('t')
            ->select('SUM(c.price) / COUNT(DISTINCT r.id)')
            ->leftJoin('t.reservation', 'r')
            ->leftJoin('t.category', 'c')
            ->andWhere('r.reservationAt > :firstDate')
            ->setParameter('firstDate', $firstDate);

        $average = $queryBuilder->getQuery()->getSingleScalarResult();
        
        return $average ? (float) $average : 0.0;
    }

    public function getLastEntries($numberOfEntries = 3)
    {
        return $this->createQueryBuilder('t')
            ->orderBy('t.id', 'DESC')
            ->leftJoin('t.category', 'c')
            ->leftJoin('t.user', 'u')
            ->setMaxResults($numberOfEntries)
            ->getQuery()
            ->getResult();
    }
    

    //    /**
    //     * @return Ticket[] Returns an array of Ticket objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('t')
    //            ->andWhere('t.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('t.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Ticket
    //    {
    //        return $this->createQueryBuilder('t')
    //            ->andWhere('t.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
