import gmpy2
import sys
import time
from sympy import isprime, primerange, nextprime
from gmpy2 import mpz, next_prime, is_prime

sys.set_int_max_str_digits(20000)

# -------- Q1: Kaprekar-like numbers --------
def kaprekar_number(n: int) -> int:
    num = 0
    for i in range(1, n + 1):
        num = num * (10 ** len(str(i))) + i
    for i in range(n - 1, 0, -1):
        num = num * (10 ** len(str(i))) + i
    return num

def q1_stream():
    start_time = time.time()
    for n in range(1000, 3001):
        candidate = kaprekar_number(n)
        elapsed = round(time.time() - start_time, 2)
        yield f"data: {{\"current_n\": {n}, \"runtime_seconds\": {elapsed}}}\n\n"
        if gmpy2.is_prime(candidate):
            yield f"data: {{\"found\": true, \"n\": {n}, \"kaprekar_number\": \"{candidate}\", \"runtime_seconds\": {elapsed}}}\n\n"
            break

# -------- Q2: Repunit primes --------
def repunit(n):
    return int("1" * n)

def q2():
    start_time = time.time()
    repunit_primes = []
    for n in primerange(2, 1041):
        Rn = repunit(n)
        if isprime(Rn):
            repunit_primes.append({"n": n, "repunit": str(Rn)})
    elapsed = round(time.time() - start_time, 2)
    return {"repunit_primes": repunit_primes, "runtime_seconds": elapsed}

# -------- Q3: Mersenne primes --------
LAST_Q3 = None

def lucas_lehmer(p):
    if p == 2:
        return True
    M = gmpy2.mpz(2)**p - 1
    s = gmpy2.mpz(4)
    for _ in range(p - 2):
        s = (s * s - 2) % M
    return s == 0

def q3():
    global LAST_Q3
    start_time = time.time()
    mersenne_primes = []
    for p in range(2201, 2300):
        if gmpy2.is_prime(p) and lucas_lehmer(p):
            M = gmpy2.mpz(2)**p - 1
            mersenne_primes.append({"p": p, "mersenne_number": str(M)})
    elapsed = round(time.time() - start_time, 2)
    result = {"mersenne_primes": mersenne_primes, "runtime_seconds": elapsed}
    LAST_Q3 = result
    return result

# -------- Q4: Brocard's conjecture using Q3 results --------
def q4():
    start_time = time.time()
    if LAST_Q3 and LAST_Q3.get("mersenne_primes") and len(LAST_Q3["mersenne_primes"]) >= 2:
        mersennes = LAST_Q3["mersenne_primes"]
        M1 = mpz(mersennes[0]["mersenne_number"])
        M2 = mpz(mersennes[1]["mersenne_number"])
    else:
        M1 = mpz(2)**2203 - 1
        M2 = mpz(2)**2281 - 1

    low = M1**2
    high = M2**2
    primes = []
    candidate = next_prime(low)
    while candidate < high and len(primes) < 4:
        primes.append(candidate)
        candidate = next_prime(candidate)
    elapsed = round(time.time() - start_time, 2)
    return {"primes": [str(p) for p in primes], "runtime_seconds": elapsed}

# -------- Q5: Palindromic prime >=50 digits --------
def generate_palindrome(length):
    half = (length + 1) // 2
    start = 10 ** (half - 1)
    end = 10 ** half
    for i in range(start, end):
        s = str(i)
        pal = s + s[-2::-1]  # odd-length palindrome
        yield mpz(pal)

def q5(min_digits=50):
    start_time = time.time()
    length = min_digits if min_digits % 2 == 1 else min_digits + 1
    while True:
        for pal in generate_palindrome(length):
            if is_prime(pal):
                elapsed = round(time.time() - start_time, 2)
                return {"palindromic_prime": str(pal), "digits": len(str(pal)), "runtime_seconds": elapsed}
        length += 2

# -------- Q6: Perfect numbers from Mersenne primes --------
def q6():
    start_time = time.time()
    if LAST_Q3 and LAST_Q3.get("mersenne_primes"):
        mersennes = LAST_Q3["mersenne_primes"]
    else:
        mersennes = [
            {"p": 2203, "mersenne_number": str(mpz(2)**2203 - 1)},
            {"p": 2281, "mersenne_number": str(mpz(2)**2281 - 1)}
        ]

    perfect_numbers = []
    for item in mersennes:
        p = item["p"]
        M_p = mpz(item["mersenne_number"])
        N = (1 << (p - 1)) * M_p
        perfect_numbers.append({"p": p, "perfect_number": str(N)})
    elapsed = round(time.time() - start_time, 2)
    return {"perfect_numbers": perfect_numbers, "runtime_seconds": elapsed}

# -------- Q7: Goldbach Conjecture for 50+ digit even numbers --------
def q7():
    from sympy import isprime, nextprime
    start_time = time.time()

    def goldbach_pair(N: int):
        assert N % 2 == 0 and N > 2
        p = 2
        while p <= N // 2:
            q = N - p
            if isprime(p) and isprime(q):
                return p, q
            p = nextprime(p)
        return None

    N1 = 10 ** 49 + 12
    N2 = 10 ** 50 + 88

    pair1 = goldbach_pair(N1)
    pair2 = goldbach_pair(N2)
    elapsed = round(time.time() - start_time, 2)

    return {
        "numbers": [str(N1), str(N2)],
        "pairs": [[str(pair1[0]), str(pair1[1])], [str(pair2[0]), str(pair2[1])]],
        "runtime_seconds": elapsed
    }
