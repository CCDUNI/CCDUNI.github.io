Introduced in 1964 by Edsger Dijstra, the dining philosophers problem is an example of a problem used in concurrent algorithm design to illustrate synchronisation issues and techniques for resolving them.

Problem Statement

There are five philosophers that dine together at the same table. Each philosopher has their own plate at the table. There is a fork between each plate. The dish served is a kind of spaghetti which has to be eaten with two forks. Each philosopher can only alternately think and eat. Moreover, a philosopher can only eat their spaghetti when they both have a left and right fork. Thus two forks will only be available when their two nearest neighbours are thinking, not eating. After an individual philosopher finishes eating, they will put down both their forks. The problem is how to design a regimen (a concurrent algorithm) such that no philosopher will starve, each can forever continue to alternate between eating and thinking, assuming that no philosopher can know when others may want to eat or think (an issue of incomplete information).

Explanation of the deadlock

Following Coffman's conditions, there are four conditions that cause a deadlock: Mutual exclusion: multiple resources are not sharable, and only one process at a time may use each resource - such is the nature of the Dining problem as it is assume by Dijkstra to be occurring on tape driver peripherals (which is inherently non-sharable); Hold and wait or resource holding: a process may currently hold one resource and request additional resources which is being held by other resources; No preemption: a resource can only be released voluntarily by the process holding it; Circular wait: Where each process is waiting for a resource which is being held by another process. In turn, process P1 is waiting for P2, P2 is waiting for P3 and PN is waiting for P1. 

Particularly in the dining problem, each fork represents a resource that each of the philosophers (processes) want. One of the main caveats of this problem is that there is incomplete information shared between the processes, and that if each of the processes requests a resource while holding another, it leads to a deadlock (Circular wait).

Solution


References:

Deadlock: https://en.wikipedia.org/wiki/Deadlock_(computer_science)
Problem: https://en.wikipedia.org/wiki/Dining_philosophers_problem