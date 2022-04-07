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
- two-level model: many-to-many model의 변형 중 하나로 allows a user-level thread to be bound to a kernel thread.
- 언급한 모델들중에 가장 유연하지만 구현하기 어려움. 또한 많은 시스템에 processing cores가 나타남에 따라 kernel thread의 수를 제한하는 것은 덜 중요해짐. 그래서 대부분의 os는 현재 one-to-one 모델을 사용하고 있음.
- 그래도 어떤 contemporary concurrency library들은 many-to-many model을 사용함.

## 4.4 Thread Libraries

- thread library는 개발자에게 쓰레드 생성 및 관리 api를 제공함.
- thread library 구현에는 두가지 방법이 있음
  - 1. to provide a library entirely in user space with no kernel support
    - 라이브러리를 위한 코드 및 자료구조는 user space에서 존재함
    - library 내의 함수를 불렀으면 user space 내의 local function call로 귀결됨. (system call은 안함)
  - 2. to implement a kernel-level library supported directly by the os.
    - 라이브러리를 위한 코드 및 자료구조는 kernel space에 존재
    - 라이브러리 함수 사용시 kernel에게 system call로 귀결함.
- 오늘날 3개의 주요 threa library가 있음: POSIX Pthreads, Windows, Java
  - Pthread
    - extension of the POSIX standard로 user-level 및 kernel-level 라이브러리를 제공함
  - Windows
    - 윈도우 시스템에서 사용할 수 있는 kernel-lvel library임
  - Java
    - 자바 프로그램에서 쓰레드 생성 및 관리를 도움
    - JVM은 host os 위에서 실행되기에, Java thread API는 host system내에서 사용가능한 thread library로 구현되어있음.
- POSIX와 Window 쓰레딩의 경우, 전역으로 선언한 데이터는 해당 프로세스의 모든 스레드와 공유할 수 있음. 그러나 Java의 경우 전역 데이터의 개념이 없기에 공유하는 데이터를 접근하기 위해서는 쓰레드끼리 맞추어야함.

- 이제 세개의 쓰레드 라이브러리를 1부터 n까지의 덧셈하는 함수를 사용하여 비교할 것임.
- 그전에 multiple thread 생성의 두가지 전략을 알아보겠음
  - asynchronous threading
    - parent가 child thread를 만들면 parent느 다시 할꺼함. 그래야 parent와 child가 concurrently, indendently하게 실행할 수 있음.
    - thread끼리 independent하기에 data 공유는 적은 편임.
  - synchronous threading
    - parent thread가 child thread를 생성하면, parent는 child thread들이 terminate 될때까지 대기 후에 다시 할꺼할 수 있음.
    - child thread가 terminate되면 parent에 join 함.
    - synchronous threading은 쓰레드간의 데이터 공유 빈도가 높음. 예를 들어 parent thread가 children thread의 계산 결과들을 합치는 경우.
- 아래의 예시들은 모두 synchronous threading임.

### 4.4.1 Pthreads

- 구현이 아닌 사양, 설명서.
- 리눅스 및 macOS는 이를 통해 구현함. Windows의 경우 지원하지 않지만 3rd party가 존재함.
- 예문은 직접 확인하는걸로... p.170 figure 4.11

### 4.4.2 Windows Threads

- Pthreads와 비슷함.
- CreateThread() function을 통해 thread를 생성하고, WaitForMultipleObjects() function을 통해 multiple thread의 실행이 끝날때까지 대기할 수 있음.
- 예문 - figure 4.12

### 4.4.3 Java Threads

- JVM을 제공하는 window, linux, macOS, android 어플리케이션 등에서 사용 가능함.
- 사용 방법은 두가지임.
  - Thread class를 상속하는 신규 class를 생성하여 run() 메소드를 오버라이드하여 사용할 수 있고,
  - Runnable interface를 implement하는 class를 정의하여 사용가능함.
- 예문 - figure 4.14

## 4.5 Implicit Threading

- thread 사용을 더 효율적이며 쉽게 하기 위해 어플리케이션 개발자가 직접 threading을 생성 및 관리하는 방법보다는 컴파일러 및 run-time library가 thread를 생성 및 관리하도록 하는 전략이 요즘 트렌드임.
- 이 전략을 implicit threading이라 하는데, 이와 관련된 4개의 방법들을 알아보도록 하겠음
- implicit threading은 어플리케이션 개발자에게 parallel task (thread 아님)를 identify하도록 하여, 라이브러리가 알아서 thread 생성 및 관리에 대한 세부적 디테일을 결정하도록 함.
- 대부분 many-to-many model을 활용함.

### 4.5.1 Thread Pools

- 멀티쓰레디드 웹서버의 경우 요청이 들어오면 해당 요청에 대하여 쓰레드를 생성하여 응답할 수 있음. 그런데 이는 두가지 문제점을 지닐 수 있음
  - 첫번째 이슈: 쓰레드 생성하는데 드는 시간과, 임무를 완료하면 바로 삭제하는 것이 먼가 아쉬움.
  - 두번째 이슈: 쓰레드 생성에 대한 한계를 정하지 않았다면, 한번에 많은 요청이 동시에 들어오는 경우 쓰레드가 그 요청 수에 맞게 많은 쓰레드들을 생성하여 cpu와 memory에 악영향을 줄 수 있음
- 이에 대한 해결책은 thread pool임.
- thread pool은 이미 필요한 양의 쓰레드를 생성한 다음에 일이 들어올때까지 pool에서 대기하는 방법임.
- 요청이 들어오면 thread pool 내에서 가용 가능한 thread를 사용하고, 만약 가용 가능한 쓰레드가 없다면 해당 task는 queue에서 대기하는거임.
- 장점
  - faster than waiting to create a thread
  - limits the number of the threads that exist at any one point.
  - 생성과 실행을 구분하게 되어 task 실행하는데에 다른 전략들을 사용 가능하게끔 함. ex. the task could be scheduled to execute after a time delay or to execute periodically
- 경험에 의해 해당 시스템에 알맞는 thread pool을 만들면 됨. 좀 더 정교한 아키텍처들은 사용 패턴에 따라 thread pool을 조정하게끔 함.

#### 4.5.1.1 Java Thread Pools

- java.util.concurrent 패키지는 여러가지 thread pool 아키텍처들을 지원함.
  - single thread executor: create pool of size 1
  - fixed thread executor: 특정 개수(파라미터로 정하는듯ㅋ)의 thread를 지닌 thread pool 생성
  - cached thread executor: creates an unbounded thread pool, reusing threads in many instances

### 4.5.2 Fork Join

- fork-join 모델. 이미 설명했던 모델임
- main parent thread가 한개 이상의 child thread를 생성함(fork) => children이 terminate 될때까지 기달림 => 끝나면 join하여 결과들을 retrieve하여 combine함.
- explicit thread creation이라고 묘사하기도 함.
- thread pool과 같이 사용하면 fork 단계에서 construct하기 보다는 thread pool에서 대기하는 thread에게 task를 지정함.

#### 4.5.2.1 Fork Join in Java

- 1.7 버전에 fork-join 라이브러리가 추가되었으며, quicksort 및 mergesort과 같은 recursive divide-and-conquer 알고리즘을 사용할 수 있도록 디자인됨.
- divide할 step 때 task를 fork하여 점점 더 작은 task로 나뉘어 이를 conquer 단계에서 병렬적으로 실행할 수 있는 느낌인듯
- 구체적인 설명은 p.181 figure 4.17

### 4.5.3 OpenMP

- a set of compiler directives as well as an API for programs written in C, C++ or FORTRAN
- provides support for parallel programming in shared-memory environments
- parallel region을 병렬적으로 실행가능한 코드 블록들로 생각함.
- 개발자들은 parallel region에 compiler directives를 삽입하면, compiler directives는 OpenMP에게 해당 region을 병렬적으로 실행 가능하도록 지시함.
- levels of parallelism을 직접 선택할 수 있음. ex. number of threads, 쓰레드간 데이터 공유가 가능한지 아닌지 등.

### 4.5.4 Grand Central Dispatch

- 갓 애플이 만든 기술로 macOS와 iOS에서 사용됨.
- run-time library, an API, language extension(task를 identify할 수 있도록 도움)으로 구성됨.
- dispatch queue에 새로 생긴 task를 넣음 => thread pools 내의 가용 가능한 thread에 해당 task를 할당하며 진행됨
- dispatch queue는 두가지 종류가 있음
  - serial queue
    - FIFO 순으로 제거됨.
    - task가 queue에서 제거되면 그 다음 queue에서 task가 제거되기 전까지 무조건 끝내야함.
    - 각 process는 자기들만의 serial queue를 가지며, 개발자들은 특정 process에는 serial queue를 추가적으로 생성 가능함
    - useful for ensuring the sequential execution of several tasks
  - concurrent queue
    - removed in FIFO order
    - several tasks may be removed at a time, thus allowing multiple tasks to execute in parallel.
    - system-wide concurrent queue도 있으며 4가지의 primary quality-of-service class로 나뉨. (global dispatch queue로도 불림)
      - QOS_CLASS_USER_INTERACTIVE: 유저와 상호작용하는 task와 관련.
      - QOS_CLASS_USER_INITIATED: 유저 상호작용 task과 관련되지만 file 열기 등의 오래걸리는 task들. 유저가 다시 상호작용하기 위해서는 실행이 완료되어야함.
      - QOS_CLASS_USER_UTILITY: 오래 걸리는 task이지만, 당장의 결과를 demand하지 않는 task. data importing 등
      - QOS_CLASS_USER_BACKGROUND: not visible to the user and are not time sensitive. 메일박스 시스템 등
- dispatch queue에 전달된 task들은 두가지 방법 중으로 express 될 수 있음
  - C, C++, Objective-C language의 경우, GCD는 identifies a language extension known as a block
  - Swift lanuage의 경우, task is defined using a closure
- GCD thread pool은 POSIX thread로 구성됨. GCD는 active하게 pool을 관리함. (application 요구 및 시스템 capacity에 맞게 thread 수를 늘리거나 줄임)

### 4.5.5 Intel Thread Building Blocks

- Intel Thread Building Blocks (TBB)는 C++에서 parallel application 디자인에 대하여 지원하는 template library임.

## 4.6 Threading Issues

- multi-threaded program 디자인시에 고려해야하는 몇가지 이슈들에 대하여 알아보겠음

### 4.6.1 The forck() and exec() System Calls

- 멀티쓰레디드 프로그램에서 fork()와 exec() system call은 살짝 바뀜
- 챕터3에서 fork() system call은 별도의 복사된 process를 생성하는걸로 묘사함.
- thread의 경우 두가지 종류의 fork()가 있음
  - duplicates all threads
  - duplicates only the thread that invoked the fork() system call
- exec() systen call은 챕터3에서와 같이 동작됨. thread가 exec() system call을 하면, the program specified in the parameter to exec() will replace the entire process - including all threads.

### 4.6.2 Signal Handling

- signal은 특정 이벤트가 발생했음을 알리기 위해 UNIX 시스템에서 사용됨.
- signal은 아래의 패턴을 따름
  - a signal is generated by the occurrence of a particular event
  - the signal is delivered to a process
  - once delivered, the signal must be handled
- 예를 들어 불법 메모리 접근 or n/0의 경우 해당 문제가 발생했음을 프로세스에게 알리는데,
  - synchronous signal은 signal을 발생한 해당 프로세스에 알림
  - asynchronous signal은 signal을 발생한 해당 프로세스가 아닌 외부의 다른 프로세스에게 알림
- signal은 두가지 경우의 핸들러를 통해 처리됨
  - a default signal handler
  - a user defined signal handler: default signal handler를 override한 것임.
- 싱글 스레드의 경우 signal handeling은 명확하나 멀티쓰레디드 프로그램의 경우 다소 복잡해짐. 여러가지의 옵션들이 있음.
  - deliver the signal to the thread to which the sinal applies
  - deliver the signal to every thread in the process
  - deliver the signal to certain threads in the process
  - assign a specific thread to receive all signals for the process
- signal 유형에 따라 방법이 결정됨.

### 4.6.3 Thread Cancellation

- 실행은 했지만 아직 완료하지 못한 thread를 terminate하는 것을 thread cancellation이라 함.
- 취소 되는 thread를 target thread라 하는데, target thread는 아래 두개의 다른 시나리오가 발생할 수 있음
  - asynchronous cancellation: 즉시 thread 강제종료
  - deferred cancellation: 주기적으로 취소할 수 있는지 확인하여 종료가 가능한 상황에 다다르면 종료함.
- thread cancellation은 데이터 업데이트 중의 종료와 같은 상황에서 어려움을 부딪침.
  - asynchrouns의 경우 가장 위험한 상황. 리소스들을 되찾을 수도 있긴 하지만 전부 되찾기에는 힘듬. 그래서 중요한 전역 시스템의 리소스의 경우 해제하지 않을 수도 있음.
  - deferred의 경우 종료되어야함을 인지한 후 종료하기에 안전한 상황에 다다르면 비로소 종료함.

### 4.6.4 Thread-Local Storage

### 4.6.5 Scheduler Activations

## 4.7 Operating-System Examples

- 윈도우와 리눅스에서 쓰레드가 어떻게 구현되어 있는지 알아보며 이번 챕터를 마무리 하겠음

### 4.7.1 Windows Threads

### 4.7.2 Linux Threads
