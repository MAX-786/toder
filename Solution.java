import java.io.*;
import java.util.*;

public class Solution {
    static BufferedReader br;
    static PrintWriter out;
    static StringTokenizer st;

    public static void main(String[] args) throws IOException {
        br = new BufferedReader(new InputStreamReader(System.in));
        out = new PrintWriter(System.out);

        int t = 1;
        // t = nextInt(); // Uncomment for multiple testcases
        while (t-- > 0) {
            solve();
        }

        out.flush();
        out.close();
        br.close();
    }
    
    // Example input
    // int n = nextInt();
    //     int[] a = new int[n];
    //     for (int i = 0; i < n; i++) a[i] = nextInt();

    // Example output
    //     for (int x : a) out.print(x + " ");
    //     out.println();

    static void solve() throws IOException {
        // Write here Brother!

        
    }

    // Input methods
    static String next() throws IOException {
        while (st == null || !st.hasMoreTokens())
            st = new StringTokenizer(br.readLine());
        return st.nextToken();
    }

    static int nextInt() throws IOException {
        return Integer.parseInt(next());
    }

    static long nextLong() throws IOException {
        return Long.parseLong(next());
    }

    static double nextDouble() throws IOException {
        return Double.parseDouble(next());
    }

    static String nextLine() throws IOException {
        return br.readLine();
    }
}
