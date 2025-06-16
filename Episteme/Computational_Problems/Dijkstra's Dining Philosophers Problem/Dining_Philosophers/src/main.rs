use std::thread;
use rand::prelude::*;
use std::sync::Mutex;
use std::sync::Arc;
use std::sync::MutexGuard;

fn random() ->i32{
    let mut rng = rand::rng();
    let random: i32 = rng.random_range(400..800);
    return random;
}

pub struct Process {
    num: i32,
    mutex_reference: Arc<Vec<Mutex<i32>>>,
    num_philosophers: i32,
}

impl Process {
    fn left_resource(&self) -> i32{
        return (self.num -1 + self.num_philosophers) % self.num_philosophers;
    }

    fn right_resource(&self) -> i32{
        return(self.num +1) % self.num_philosophers;
    }

    fn think(&self){
        let value = std::time::Duration::from_millis(random() as u64);
        thread::sleep(value);
    }
}

trait PickingStrategy {
    fn eat<'a>(&self, process: &'a Process) -> (MutexGuard<'a, i32>, MutexGuard<'a, i32>);
}

struct DeadlockStrategy;

impl PickingStrategy for DeadlockStrategy {
    fn eat<'a>(&self, process: &'a Process) -> (MutexGuard<'a, i32>, MutexGuard<'a, i32>) {

        let left_reference = process.left_resource();
        let mutex_guard_1 = process.mutex_reference[left_reference as usize].lock().unwrap();

        let right_reference = process.right_resource();
        let mutex_guard_2 = process.mutex_reference[right_reference as usize].lock().unwrap();

        (mutex_guard_1, mutex_guard_2)
    }
}

struct Solution;

impl PickingStrategy for Solution {
    fn eat<'a>(&self, process: &'a Process) -> (MutexGuard<'a, i32>, MutexGuard<'a, i32>) {

        let left_reference = process.left_resource();
        let right_reference = process.right_resource();

        let priority = left_reference.min(right_reference);
        let secondary = left_reference.max(right_reference);

        let mutex_guard_1 = process.mutex_reference[priority as usize].lock().unwrap();
        let mutex_guard_2 = process.mutex_reference[secondary as usize].lock().unwrap();

        (mutex_guard_1, mutex_guard_2)
    }
}

fn run_simulation<S: PickingStrategy + Sync + Send + 'static>(process: Process, deadlock_strategy: S){
    loop{
        let (_guard1, _guard2) = deadlock_strategy.eat(&process);
        println!("Process {} is eating", process.num);
        process.think();
    }
}

fn main(){
    let num_philosophers: i32 = 5;
    let mutex_vec = Arc::new(
        (0..5).map(|_| Mutex::new(0)).collect::<Vec<_>>()
    );

    let mut handles = vec![];
    for i in 0..5{
        let temp_mut =  Arc::clone(&mutex_vec);
        let strategy = DeadlockStrategy;
        let handle = thread::spawn(move||{
            let thread = Process{num:i, mutex_reference: temp_mut, num_philosophers };
            run_simulation(thread, strategy)
        });
        handles.push(handle);
    }
    for handle in handles{
        handle.join().unwrap();
    }

}