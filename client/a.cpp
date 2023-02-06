#include<bits/stdc++.h>

using namespace std;

#define fastio() ios_base::sync_with_stdio(false);cin.tie(NULL);cout.tie(NULL)
#define mod 1000000007
#define nline "\n"
#define read(arr, n)            \
    for (int i = 0; i < n; i++) \
        cin >> arr[i];
#define write(arr, n)          \
    for (int i = 0; i < n; i++) \
        cout << arr[i] << " " ; \
    cout << "\n" ; 
#define loop(i, n) for (int i = 0; i < n; i++)

typedef long long ll;
typedef unsigned long long ull;
typedef long double lld;

#ifndef ONLINE_JUDGE
#define debug(x) cerr << #x <<" "; _print(x); cerr << endl;
#else
#define debug(x)
#endif

void _print(ll t) {cerr << t;}
void _print(int t) {cerr << t;}
void _print(string t) {cerr << t;}
void _print(char t) {cerr << t;}
void _print(lld t) {cerr << t;}
void _print(double t) {cerr << t;}
void _print(ull t) {cerr << t;}

template <class T, class V> void _print(pair <T, V> p);
template <class T> void _print(vector <T> v);
template <class T> void _print(set <T> v);
template <class T, class V> void _print(map <T, V> v);
template <class T> void _print(multiset <T> v);
template <class T, class V> void _print(pair <T, V> p) {cerr << "{"; _print(p.first); cerr << ","; _print(p.second); cerr << "}";}
template <class T> void _print(vector <T> v) {cerr << "[ "; for (T i : v) {_print(i); cerr << " ";} cerr << "]";}
template <class T> void _print(set <T> v) {cerr << "[ "; for (T i : v) {_print(i); cerr << " ";} cerr << "]";}
template <class T> void _print(multiset <T> v) {cerr << "[ "; for (T i : v) {_print(i); cerr << " ";} cerr << "]";}
template <class T, class V> void _print(map <T, V> v) {cerr << "[ "; for (auto i : v) {_print(i); cerr << " ";} cerr << "]";}
mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());
 
inline int getRand(int L, int R) {
    if (L > R) swap(L, R);
    return (int)(rng() % ((uint64_t)R - L + 1) + L);
}
 
void init_code()
{
    #ifndef ONLINE_JUDGE
    freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);
    freopen("debug.txt", "w", stderr);
    #endif
}
void factorials(int N){
    vector<int> fact(N+1, 1);
    vector<vector<int>> cnm(N + 1, vector<int>(N + 1, 0));

    for (int i = 1; i <= N; ++i) fact[i] = fact[i-1] * i % mod;
    
    for (int i = 0; i <= N; ++i) cnm[i][0] = cnm[i][i] = 1;
    for (int i = 2; i <= N; ++i) {
        for (int j = 1; j < i; ++j) cnm[i][j] = (cnm[i-1][j-1] + cnm[i-1][j]) % mod;
    }
}


signed main(int argc, char **argv){
    fastio();
    init_code();

    int t = 0;
    cin >> t;

    while (t--){
        int n;
        cin >> n;
        vector<int>arr(n);
        read(arr, n);

    }
    return 0;


}