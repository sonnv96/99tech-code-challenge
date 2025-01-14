var sum_to_n_a = function(n) {
    // basic
    return (n * (n + 1)) / 2;
};

var sum_to_n_b = function(n) {
    // use recursion
    if (n === 1) return 1;
    return n + sum_to_n_b(n - 1);
};

var sum_to_n_c = function(n) {
    // use function handle array
    return Array.from({ length: n }, (_, i) => i + 1).reduce((sum, num) => sum + num, 0);
};