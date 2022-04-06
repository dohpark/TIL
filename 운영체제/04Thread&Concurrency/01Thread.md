## 4.1 Overview

- 쓰레드는 basic unit of CPU utilization. 쓰레드는 thread ID, a program counter(PC), a register set, and a stack으로 구성됨.
- 전통적으로 process는 하나의 쓰레드를 지니지만, 만약에 multiple threads를 control할 수 있으면, 한 개 이상의 일을 동시에 진행할 수 있음

### 4.1.1 Motivation

- 현대의 컴퓨터와 모바일 기기들은 multi thread임.
- 활용 예시:
  - 워드 프로세서가 첫번째 쓰레드에서는 graphic display, 두번째 쓰레드에서는 keystroke response, 세번째에서는 spelling and grammer check을 수행할 수 있음
  - 웹 브라우저에서 첫번째 쓰레드는 image/text display, 두번째 쓰레드는 네트워크에서 data를 받아올 수 있음
- 쓰레드를 통해 멀티코어 시스템의 장점을 더 극대화할 수 있음.
- 웹서버의 경우, 만약에 싱글 쓰레드 프로세스로 동작했다면, 한번에 하나의 클라이언트에게 서비스를 이행할 수 있음. 이에 대한 방안으로 여러개의 프로세스를 생성할 수 있지만, 프로세스 생성은 time consuming and reource intensive. 또, 같은 task를 이행하는데 굳이 새로운 프로세스를 만드는 것도 아쉬움. 차라리 하나의 프로세스에서 여러개의 쓰레드를 만들어, 한가지 일에 하나의 프로세스 그러나 여러개의 쓰레드를 활용하는 것이 훨씬 효율적임.
- 리눅스 또한 멀티 쓰레드임. ps -ef 명령어를 통해 현재 실행중인 kernel threads를 확인할 수 있음.
- 그 외에 basic sorting, trees, and graph algorithm 등에도 멀티 쓰레드를 사용할 수 있음
- cpu가 많이 활용되는 data mining, graphic, ai 등에도 병렬적으로 실행 가능하게 디자인하여 현대의 멀티코어 시스템의 힘을 더 극대화 할 수 있음.

### 4.1.2 Benefits

- Responsiveness
  - 멀티쓰레딩을 통해 block / performing a length operation 상태에도 지속적으로 실행할 수 있게 하여 유저에게 더 responsive할 수 있도록 함.
  - 시간이 소요되는 작업은 별도의 비동기적 쓰레드에게 맡겨, 남는 스레드가 사용자에게 응답가능하도록 할 수 있음
- Resource sharing
  - 쓰레드는 process 내부에 속하기 때문에 memory와 resource를 공유할 수 있음
- Economy
  - 쓰레드는 process 생성보다 리소스를 덜 소요하며 context switching이 process보다 더 빠름
- Scalability
  - thread를 생성가능함으로써 scalability 상승

## 4.2 Multicore Programming

- 컴퓨팅 성능의 향상에 대한 니즈는 멀티 cpu 시스템으로 나아갔음. 그리고 멀티쓰레드 프로그래밍은 멀티 컴퓨팅 코어의 효율적인 사용으로 이어짐.
  - 싱글 컴퓨팅 코어를 사용하는 시스템은 프로세싱 코어가 한번에 하나의 쓰레드만 실행할 수 있기에 concurrency means execution of the threads will be interleaved over time.
  - 멀티 코어 시스템은 각 코어에 별개의 쓰레드를 줄 수 있어 쓰레드를 병렬적으로 실행 가능함.
- concurrency와 parallelism의 차이점
  - concurrency system은 supports more than one task by allowing all the tasks to make progress. processes 실행을 하나식 하지만 엄청 빠르게 하나씩 스위칭하여 동시에 사용할 수 있는 느낌이 들게끔 하는 것이 concurrency. (가짜 병렬 느낌적인 느낌)
  - parallelism system은 병렬적으로 실행하여 진짜로 동시에 두개의 일을 진행시키는 것. (진짜 병렬 느낌적인 느낌)

### 4.2.1 Programming Challenges

- 멀티쓰레드에 알맞는 디자인에 대한 고민들
  - Identifying tasks
    - 어플리케이션에서 동시에 실행시킬 수 있도록 나눌 수 있는 task 찾기
    - 이상적으로 task는 서로간에 독립적이기에 각 코어에서 병렬적으로 실행할 수 있기에...!
  - Balance
    - 병렬적으로 실행할 수 있는 task를 찾으면 이게 값어치가 있는지 체크해야힘.
    - task를 여러가지로 나눠도 그 전보다 효율이 안나오는 경우들도 있기 때문.
  - Data splitting
    - task가 나눠지기게 되면 이에 대한 데이터 접근과 작성 또한 나눠져야함.
  - Data dependency
    - 만약에 둘로 나눠진 task들이 데이터간의 dependent이어야 한다면 task들의 실행이 synchronized가 되도록 해야함.
  - Testing and debugging
    - 멀티코어에 병렬적으로 프로그램을 실행하는 경우, 여러가지 가능한 실행 경로들이 존재하기에 싱글 쓰레드 어플리케이션보다 테스팅과 디버깅이 어려움.
- 이러한 고민들 때문에 가까운 미래에는 새로운 디자인 접근이 필요할지도 모름

### 4.2.2 Types of Parallelism

- 두가지 타입의 parallelism이 있음
- Data parallelism
  - focueses on distributing subsets of the same data across multiple computing cores and performing the same operation on each core.
  - 듀얼코어에서 0부터 n-1까지 숫자를 센다면, A thread는 0부터 (n/2 - 1)까지 세고 B thread는 n/2 부터 (n - 1)까지 숫자를 셈. 각 코어에서 쓰레드들은 병렬적으로 수행함
  - distribution of data across multiple cores
- Task parallelism
  - involves distributing not data but tasks across multiple computing cores.
  - thread가 서로 다른 완전 독립적인 일을 따로 함.
  - distribution of tasks across multiple cores
- 두 parallelism은 하이브리드하게 어플리케이션에서 사용 가능함.

## 4.3 Multithreading Models

- thread도 사용 레벨에 따라 다름
  - user thread
    - user level
    - supported above the kernel and and managed without kernel support
  - kernel thread
    - kernel level
    - supported and managed directly by the os.
    - 현대의 os (윈도우, 리눅스 macOS 등을 포함하여)는 kernel thread를 지원함
- user thread와 kernel thread에서 다양한 관계가 존재함
  - many-to-one model
  - one-to-one model
  - many-to-many model

### 4.3.1 Many-to-One Model

- maps many user-level threads to one kernel thread
- 장점
  - Thread management는 user space 내의 thread library에서 실행되어 효율적임 (4.4에서 설명할듯)
- 단점
  - 만약에 쓰레드가 blocking system call을 실행한다면 전체 프로세스가 block 됨.
  - 쓰레드 한개가 kernel 쓰레드에 한번씩 접근이 가능하기에 multicore system에서 multiple thread를 병렬적으로 사용 못함. 그래서 요즘 사용 안함
- ex. Green threads: a thread library available for Solaris systems and adopted in early versions of Java

### 4.3.2 One-to-One Model

- maps each user thread to a kernel thread
- 장점
  - provides more concurrency that many-to-one model. 한개의 쓰레드가 blocking system call을 해도, 다른 쓰레드가 실행 가능하기 때문임!
  - allows multiple threads to run in parallel on multiprocessors
- 단점
  - user thread를 생성하기 위해서는 이에 상응하는 kernel thread도 생성해야함
  - 그 때문에 kernel thread가 많이 생성될 수 있어, 시스템의 performance에 부적적인 영향을 줄 수 있음
- 리눅스, 윈도우가 이 모델을 사용함.

### 4.3.3 Many-to-Many Model

- multiplexes many user-lvel threads to a smaller or equal number of kernel threads.
- 장점
  - many-to-many 모델은 many-to-one, one-to-one model의 단점을 상쇄가능함. 쓰레드를 필요하다면 많이 만들어도 되고, 멀티 프로세서에서 병렬적으로 실행 가능함. 또한, 쓰레드가 blocking system call을 호출한다면 kernel이 다른 쓰레드 실행하도록 조율할 수 있음
- two-level model: many-to-many model의 변형으로 allows a user-level thread to be bound to a kernel thread.
- 언급한 모델들중에 가장 유연하지만 구현하기 어려움. 또한 많은 시스템에 processing cores가 나타남에 따라 kernel thread의 수를 제한하는 것은 덜 중요해짐. 그래서 대부분의 os는 현재 one-to-one 모델을 사용하고 있음.
- 그래도 어떤 contemporary concurrency libraries들은 many-to-many model을 사용함.
