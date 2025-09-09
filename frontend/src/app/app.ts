import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App {
  private activeStreamReader: ReadableStreamDefaultReader<any> | null = null;
  questions = [
    {
      id: 1,
      title: 'Question 1',
      question: 'A prime number is 12345678910987654321. Here n is 10. Find the next number that follows this pattern. That number n lies between 1000 and 3000. This was discovered by an Indian',
      solution: '-',
      endpoint: 'http://127.0.0.1:5000/api/q1/stream ',
      stream: true
    },
    {
      id: 2,
      title: 'Question 2',
      question: '11 is prime, 111 is not prime. We use the notation, In means N ones. nes. For example, 17, we mean seven ones:1111111. 1n is represented by (10N-1)/9. If N is prime In might be prime. If N is not prime, In can not be prime. Thus we have to check only for N being prime. Determine the 5 primes between N=2 and N=1040.',
      solution: '-',
      endpoint: 'http://127.0.0.1:5000/api/q2',
      stream: false
    },
    {
      id: 3,
      title: 'Question 3',
      question: 'We are interested in Mersenne primes. A Mersenne prime is a prime number that is one less than a power of two. The largest Mersenne prime discovered was on Oct 12, 2024 when 2P-1 where p=136,279,841. This has 41,024,320 digits. Find the two primes where p lies between 2201 and 2299. These primes were discovered d in in 1952.',
      solution: '-',
      endpoint: 'http://127.0.0.1:5000/api/q3',
      stream: false
    },
    {
      id: 4,
      title: 'Question 4',
      question: 'Brocard s conjecture is the conjecture (open problem) that there are at least four prime numbers between (pr)2 and (p+1)2, where pn is the nth prime number, for every n≥ 2. Use the two prime numbers you obtained in #3 and determine at least four prime numbers between the squares of those numbers.',
      solution: '-',
      endpoint: 'http://127.0.0.1:5000/api/q4',
      stream: false
    },
    {
      id: 5,
      title: 'Question 5',
      question: 'Palindromic prime numbers are prime numbers that are also palindromes. The simpler ones are 11 and 122333221. More interesting ones are 1223334444555554444333221 and 12233355555333221. The largest found so far is 101888529 - 10944264 - 1 which has 1,888,529 digits. Find a palindromic prime that has at least 50 digits.',
      solution: '-',
      endpoint: 'http://127.0.0.1:5000/api/q5',
      stream: false
    },
    {
      id: 6,
      title: 'Question 6',
      question: 'A perfect number is a positive integer that is equal to the sum of its positive proper divisors, that is, divisors excluding the number itself. For instance, 6 has proper divisors 1, 2 and 3, and 1 + 2+ 3 = 6, so 6 is a perfect number. The next perfect number is 28, since 1+2+4+ 7+ 14 = 28. Euclid proved that if 2º - 1 is prime, then 2°-1(2° - 1) is a perfect number and then Euler proved that all even perfect numbers followed this form. The existence of odd perfect numbers is an open problem and it can be shown if such a number exists it should be > 101500.. Using the primes in #3, prove that the above expression yields a perfect number',
      solution: '-',
      endpoint: 'http://127.0.0.1:5000/api/q6',
      stream: false
    },
    {
      id: 7,
      title: 'Question 7',
      question: `Take some interesting problem in prime numbers, which are all open problems. Some are as follows and prove them for a number that has greater than 50 digits. Take one of the following conjectures or choose one of your own.

a) A Wieferich prime is a prime p such that p2 is a divisor of 2(P-1) - 1. We only know two Wieferich primes: 1093 and 3511. The crazy thing is that we conjecture that there are infinitely many Wieferich primes... but we only know two of them!

b) Goldbach's conjecture: Every even n > 2 is the sum of two primes.

c) The Weak Goldbach Problem: Every odd n > 5 is the sum of three primes.

d) Every even number is the difference of two primes.

e) Legendre's conjecture that there is a prime between consecutive integer squares directly implies that there are at least two primes between prime squares for pn≥3 since pn+1 - pn≥2.

f) Oppermann's conjecture is that for any integer n greater than 1, there is always a prime number between n(n - 1) and n², and another between n2 and n(n + 1).`,
      solution: '-',
      endpoint: 'http://127.0.0.1:5000/api/q7',
      stream: false
    }
  ];    

  selectedQuestion: any = null;
  result: string = '';
  loading: boolean = false;
  lastEndpoint: string = '';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  selectQuestion(q: any) {
    // Cancel any active stream
    if (this.activeStreamReader) {
      this.activeStreamReader.cancel();
      this.activeStreamReader = null;
    }
    this.selectedQuestion = q;
    this.result = '';
    this.loading = false;
    this.lastEndpoint = '';
  }

  async runSolution() {
    if (!this.selectedQuestion) return;
    this.loading = true;
    this.lastEndpoint = this.selectedQuestion.endpoint;
    this.result = '';
    this.cdr.detectChanges();

    if (this.selectedQuestion.stream) {
      // Handle streaming response using fetch
      try {
        const response = await fetch(this.lastEndpoint);
        if (!response.body) throw new Error('No stream');
        const reader = response.body.getReader();
        this.activeStreamReader = reader;
        const decoder = new TextDecoder();
        let done = false;
        while (!done) {
          const { value, done: streamDone } = await reader.read();
          if (value) {
            this.result += decoder.decode(value);
            this.cdr.detectChanges();
          }
          done = streamDone;
        }
        this.activeStreamReader = null;
        this.loading = false;
        this.cdr.detectChanges();
      } catch (err) {
        this.activeStreamReader = null;
        this.result = this.selectedQuestion.solution;
        this.loading = false;
        this.cdr.detectChanges();
      }
    } else {
      this.http.get<any>(this.lastEndpoint).subscribe({
        next: (res) => {
          this.result = JSON.stringify(res, null, 2);
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.result = this.selectedQuestion.solution;
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
    }
  }
}
