#include <iostream>
using namespace std;

int main()
{

    for (int i = 1; i < 5; i++)
    {
        printf("i = %d \t", i);
        for (int j = 0; j <= i; ++j)
        {
            cout << "";
        }
        for (int k = 0; k <= i; ++k)
        {
            cout << "*";
        }
            printf("j = %d \t", i);
        cout << endl;
    }
}