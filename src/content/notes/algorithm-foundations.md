---
title: "Algorithm Foundations"
summary: "Systematic notes on algorithms, data structures, dynamic programming, graph theory, and competitive programming topics."
category: "Computer Science"
order: 20260820
format: "Markdown"
icon: "ALG"
tags: ["Algorithms","Data Structures","Dynamic Programming","Graph Theory"]
---
# 基础算法

算法的模板需要**理解**背过，默写出来的模板需要可以通过调试，需要默写3-5次

## 排序

### 快速排序



![image.png](/notes/algorithm-foundations/asset-001.png)

调整区间是最难的部分！

时间复杂度O（nlogn）

暴力做法

![image.png](/notes/algorithm-foundations/asset-002.png)

比较优雅的做法就是在区间两边设立两个指针，左i右j，整个快速排序的目的是要设立一个区间分界值，保证整个数组左边是小于x的值右边是大于x的值，如果i指的值比x小就往后移动指针，如果j指的值比x大就往前移动指针。移不动的时候交换i，j的值，直到i，j移到一起。

```cpp
#include<iostream>
using namespace std;

const int N = 100010;
int n;
int q[N];

void quick_sort(int q[], int l, int r) {

	if (l >= r) return;//只有一个数的话一定是有序的

	int x = q[l+r>>1], i = l - 1, j = r + 1;
    //x是分界点，i,j是两个指针，初始时刻分别指向数组的边界外
	//x=q[l+r>>1] 是位运算 ，相当于除二
	while (i < j) {
		do i++; while (q[i] < x);
		//左边都是比x小的，所以如果比x小指针就直接往中间移动
		do j--; while (q[j] > x);
		//右边都是比x大的，所以如果比x大指针就直接往中间移动
		if (i < j) swap(q[i], q[j]);
	}
	quick_sort(q, l, j);
	quick_sort(q, j + 1, r);
}

int main() {

	scanf("%d", &n);//建议使用scanf，比cin读入数据的速度更快一点
	
	for (int i = 0; i < n; i++) scanf("%d", &q[i]);//读数据

	quick_sort(q, 0, n - 1);//快排

	for (int i = 0; i < n; i++) printf("%d ", q[i]);//输出

	return 0;
}
```



### 归并排序



![image.png](/notes/algorithm-foundations/asset-003.png)

先把左边排好序，再把右边排好序，然后将排好序的两个合二为一。时间复杂度O（nlogn）

![image.png](/notes/algorithm-foundations/asset-004.png)

双指针算法：

两个指针指向分开的两个有序的数组，比较两个指针所指值的大小，小的放到最终的数组里面。直到有一个指针指到尽头，另一个数组剩余的内容直接全放进答案数组。

注意：因为归并排序是稳定的排序，所以指针相同的时候，把第一个序列的放到答案数组。

```cpp
#include<iostream>
using namespace std;

const int N = 1e6 + 10;
int q[N], tmp[N];
int n;

void merge_sort(int q[], int l, int r) {
	if (l >= r) return;//如果只有一个数怎么都是有序的

	int mid = l + r >> 1;//区间中点
	merge_sort(q, l, mid);
	merge_sort(q, mid + 1, r);
	
	int k = 0, i = l, j = mid + 1;
	//k表示tmp数组中现有元素的个数，i和j是指向两个序列起点的指针
	while (i <= mid && j <= r) {
		if (q[i] <= q[j]) tmp[k++] = q[i++];
         //如果i指针的数比j的小就把i指向的数放进tmp数组
		else tmp[k++] = q[j++];
        //否则把j指向的数放进tmp数组
	}
	while (i <= mid) tmp[k++] = q[i++];//把某个序列剩余的部分直接全放进tmp数组
	while (j <= r) tmp[k++] = q[j++];

	//把临时数组的结果复制回来
	for (i = l,j = 0; i <= r; i++,j++) q[i] = tmp[j];
}

int main() {
	scanf("%d", &n);
	for (int i = 0; i < n; i++) scanf("%d", &q[i]);

	merge_sort(q, 0, n - 1);

	for (int i = 0; i < n; i++) printf("%d ", q[i]);
}
```

788逆序对数量思路：先假设merge_sort可以算出来逆序对的个数，所以分成了下面三种情况。从第三种情况下推出来公式。在合并的时候采用了双指针，如果现在q[j]<q[i],那么q[i]~mid都是大于q[j]的，数量为mid-i+1，这就是对于q[j]来说逆序对的个数

![image.png](/notes/algorithm-foundations/asset-005.png)

ac代码

```cpp
#include<iostream>
using namespace std;

//前面一个数比后面一个数大就构成一个逆序对
typedef long long ll;//逆序对最多有n（n-1）/2所以需要long long
const int N = 1e6+10;
int q[N],tmp[N];
int n;

ll merge_sort(int l,int r){
    if(l>=r) return 0;
    //递归求逆序对
    int mid = l+r>>1;
    ll res = merge_sort(l,mid)+merge_sort(mid+1,r);
    
    //归并
    int k=0,i=l,j=mid+1;
    while(i<=mid && j<=r){
        if(q[i]<=q[j]) tmp[k++] = q[i++];
        else{
            tmp[k++] = q[j++];
            res += mid-i+1;
        }
    }
    //扫尾
    while(i<=mid) tmp[k++] = q[i++];
    while(j<=r) tmp[k++] = q[j++];
    //物归原主
    for(i=l,j=0;i<=r;i++,j++){
        q[i] = tmp[j];
    }
    
    return res;
}
int main(){
    scanf("%d",&n);
    for(int i=0;i<n;i++){
        scanf("%d",&q[i]);
    }
    cout<<merge_sort(0,n-1)<<endl;
}
```

### 二分排序

#### 整数

有单调性一定可以二分，但二分不一定需要单调性。

二分排序需要根据某一种【性质】，将整个区间分成两部分，一部分满足这个性质另一部分不满足这个性质。二分可以找到区分的边界。

![image.png](/notes/algorithm-foundations/asset-006.png)

红色段表示满足性质的部分，绿色段表示不满足性质的部分。

1.找出红色段部分的边界（箭头指的地方）

check表示检查mid是否满足条件，如果满足，则mid在红色段（包括边界），不满足则表示在绿色段。

图中表示的是在，mid满足、不满足条件下边界所在区间以及区间的更新方式。



2.找出绿色段部分的边界                      

check表示的是检查mid是否符合绿颜色表示的性质

![image.png](/notes/algorithm-foundations/asset-007.png)

如果更新方式是l=mid r=mid-1则mid在计算时为（l+r+1）/2，否则不需要加一

模板：

```cpp
bool check(int x){
  //检查x是否满足某种性质
}
//区间[l,r]被划分成[l,mid]和[mid+1,r]时使用：
int bsearch_1(int l,int r)
{
  while(l<r)
  {
    int mid = l+r>>1;
    if(check(mid)) r=mid;
    else l = mid+1;
  }
  return l;
}
//区间[l,r]被划分成[l,mid-1]和[mid,r]时使用：
int bsearch_2(int l,int r)
{
  while(l<r){
  int mid = l+r+1>>1;
    if(check(mid)) l = mid;
    else r = mid-1;
  }
  return l;
}
```

模板题：

![image.png](/notes/algorithm-foundations/asset-008.png)

```cpp
#include<iostream>
using namespace std;

const int N = 1000006;
int q[N];
int n, m;

int main() {
	scanf("%d%d", &n, &m);
	for (int i = 0; i < n; i++) scanf("%d", &q[i]);

	while (m--) {
		//共有m次询问，每次询问的数设为x
		int x;
		scanf("%d", &x);
		
		int l = 0, r = n - 1;//设置区间的左右端点
		
		while (l < r) {
			int mid = l + r >> 1;//先写上l+r，然后根据后面的看需不需要加一
			if (q[mid] >= x) r = mid;
            //求左边界时划分区间的性质为>=x，此时为r=mid所以不需要加一
			else l = mid + 1;
		}
		
		if (q[l] != x) cout << "-1 -1" << endl;//序列中不存在x时返回的是第一个大于x的值
		else {
			cout << l << ' ';
            //先把左边界输出，整个循环结束的时候l和r的值是一样的，输出哪个都ok
			
			int l = 0, r = n - 1;
			//求右边界划分性质是<=x
			while (l < r) {
				int mid = l + r + 1>> 1;
				if (q[mid] <= x) l = mid;
				else r = mid - 1;
			}
			cout << l << endl;
		}

	}
	return 0;
}
```

![image.png](/notes/algorithm-foundations/asset-009.png)



#### 浮点数

因为是浮点数，（l+r）/ 2 没有下取整的问题，算出来都是正好除以二的值，所以浮点数二分没有边界值的问题。当区间长度趋于无穷小的时候可以视作找到了区间边界。

模板：数的二次方根

![image.png](/notes/algorithm-foundations/asset-010.png)

```cpp
#include<iostream>
using namespace std;

double Max(double x,double y){
  if(x<y) return y;
  else return x;
}
  
int main() {
	double x;
	cin << x;

	double l = 0, r = Max(1,x);
  //如果x为0.01，开根号为0.1就不在区间里面了，所以右边界起码要比1大
	while (r - l < 1e-8) {
		//比题目要求精度小两位
		double mid = (l + r) / 2;
		if (mid * mid >= x) r = mid;
		else l = mid;
	}
	printf("%lf\n", l);
	return 0;
}
```

模板:数的三次方根

```cpp
#include<bits/stdc++.h>
using namespace std;
double Max(double x,double y){
  if(x<y) return y;
  else return x;
}
int main(){
    double x;
    scanf("%lf",&x);
    int flag = 0;
    if(x<0) {
        x = -x;
        flag = 1;
    } 
    double l=0,r=Max(1,x);
    while(r-l>1e-8){
        double mid = (l+r)/2;
        if(mid*mid*mid>=x) r = mid;
        else l=mid;
    }
    if(flag) printf("%lf",-r);
    else printf("%lf",r);
    return 0;
}
```





## 高精度

### 高精度加法

1.大整数存储，用数组进行存储，每一位存一个数字，数组下标为0的存这个整数的个位（比较容易处理进位的问题）加减乘除的高精度算法里面存储都是这么存储的

2.运算，每一位的运算包括三部分，即两个加数的这一位以及对应的进位。

```cpp
#include<iostream>
#include<vector>
using namespace std;

//C = A + B
vector<int> add(vector<int> &A,vector<int> &B){//加引用更快
	vector<int> C;
	int t = 0;//存储进位
	for(int i = 0;i<A.size() || i<B.size();i++){

		if(i<A.size()) t += A[i];//如果a有这一位就加上
		if(i<B.size()) t += B[i];

		C.push_back(t%10);//存储计算结果的个位
		t /= 10;//计算进位
	}

	if(t) C.push_back(1);//最高位有没有进位
	return C;
}


int main(){
	string a,b;//因为数位太长了所以需要用字符串进行读入
	vector<int> A,B;

	cin>>a>>b;//a = "123456"
	for(int i = a.size()-1;i>=0;i--) A.push_back(a[i]-'0');
	//下标为0的数组存的是大整数的个位，存每一位的时候需要倒着遍历
	//a是一个字符串，里面存的是字符，需要-'0'转化为数字
	//A = [6,5,4,3,2,1]
	for(int i = b.size()-1;i>=0;i--) B.push_back(b[i]-'0');

	auto C = add(A,B);
	//auto表示编译器会自己推断这是一个什么类型的变量
	
	for(int i = C.size()-1;i>=0;i--) printf("%d",C[i]);

	return 0;

}
```

### 高精度减法

![image.png](/notes/algorithm-foundations/asset-011.png)

```cpp
#include<iostream>
#include<vector>
using namespace std;


//判断是否有A>=B
bool cmp(vector<int> &A,vector<int> &B){
	//位数不同，位数越多数越大
	if(A.size() != B.size()) return A.size()>B.size();
	//位数相同，从高位比较
	for(int i = A.size()-1;i>=0;i--)
		if(A[i] != B[i])
			return A[i]>B[i];
	//都相同则两个数相等
	return true;
}

//C = A - B,A一定比B大
vector<int> sub(vector<int> &A,vector<int> &B){//加引用更快
	vector<int> C;
	for(int i = 0,t = 0;i < A.size();i++){
		t = A[i] - t;
		if(i<B.size()) t-=B[i];
		C.push_back((t+10)%10);
		if(t < 0) t = 1;//有借位
		else t = 0;	
	}

	//A有多少位C就有多少位，比如123-120=003，所以需要把C中的0去掉
	while(C.size()>1 && C.back()==0) C.pop_back();
  
	return C;
}


int main(){
	string a,b;//因为数位太长了所以需要用字符串进行读入
	vector<int> A,B;

	cin>>a>>b;//a = "123456"
	for(int i = a.size()-1;i>=0;i--) A.push_back(a[i]-'0');
	//下标为0的数组存的是大整数的个位，存每一位的时候需要倒着遍历
	//a是一个字符串，里面存的是字符，需要-'0'转化为数字
	//A = [6,5,4,3,2,1]
  
	for(int i = b.size()-1;i>=0;i--) B.push_back(b[i]-'0');

	if(cmp(A,B)){
		auto C = sub(A,B);
		for(int i = C.size()-1;i>=0;i--) printf("%d",C[i]);
	}
	else{
		auto C = sub(B,A);
		printf("-");
		for(int i = C.size()-1;i>=0;i--) printf("%d",C[i]);
	}

	return 0;
}
```



### 高精度乘法

一个比较大的数和一个比较小的数相乘，每次将比较小的数与比较大的数的每一位相乘得到一个结果t，t%10就是该位的答案，t/10就是该位的进位大小。

![image.png](/notes/algorithm-foundations/asset-012.png)

模板：

```cpp
#include<iostream>
#include<vector>
using namespace std;

vector<int> mul(vector<int> &A,int b){
	vector<int> C;
	int t = 0;
	for(int i = 0;i<A.size()||t;i++){
		//循环条件是A还没遍历完以及遍历完后进位不为0
		if(i<A.size()) t += b * A[i];
		C.push_back(t % 10);
		t /= 10;
	}

	//A有多少位C就有多少位，比如123-120=003，所以需要把C中的0去掉
	while(C.size()>1 && C.back()==0) C.pop_back();
	
	return C;
}

int main(){
	string a;
	int b;

	cin>>a>>b;
	vector<int> A;

	for(int i = a.size()-1;i >= 0;i--)  A.push_back(a[i]-'0');

	auto C = mul(A,b);
	
	for(int i = C.size()-1;i >= 0;i--) printf("%d",C[i]);

	return 0;
}
```



### 高精度除法

一开始先把最高位看成是余数，除以b的答案就是商；再将最高位与b取模，得到这一步的余数；将这个余数乘10加上下一位，得到一个新的数，这个数除b得到下一位的商，以此类推。

![image.png](/notes/algorithm-foundations/asset-013.png)

模板：

```cpp
#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;

//C = A/b，余数为r
vector<int> div(vector<int> &A,int b,int &r){
	vector<int> C;
	r = 0;
	for(int i = A.size();i >= 0;i--){
		r = r*10 + A[i];
		C.push_back(r / b);
		r %= b; 
	}

	//C0存的是最高位，与之前加减乘的情况是逆过来的
	reverse(C.begin(),C.end());
	//去前导0
	while(C.size()>1 && C.back()==0) C.pop_back();

	return C;
}

int main(){
	string a;
	int b;

	cin>>a>>b;
	vector<int> A;

	for(int i = a.size()-1;i >= 0;i--)  A.push_back(a[i]-'0');

	int r;//余数
	auto C = div(A,b,r);
	
	for(int i = C.size()-1;i >= 0;i--) printf("%d",C[i]);
	cout<<endl;
	cout<<r<<endl;

	return 0;
}
```



---

## 前缀和

前缀和与差分是一对逆运算。**前缀和求解的数列的下标是从1开始的**

前缀和可以帮助快速的求出原数组中一段数的和

![image.png](/notes/algorithm-foundations/asset-014.png)

```cpp
前缀和S[i] = a[1] + a[2] + ... + a[i] = S[i-1] + a[i]
```

前缀和模板or思想：

```cpp
#include<iostream>
using namespace std;

const int N = 100010;

int n,m;
int a[N],s[N];

int main(){
	scanf("%d%d",&n,&m);
	for(int i = 1;i <= n;i++) scanf("%d",&a[i]);
	//前缀和下标从1开始

	for(int i = 1;i <= n;i++) s[i] = s[i-1] + a[i];

	while(m--){
		int l,r;
		scanf("%d%d",&l,&r);
		printf("%d\n",s[r] - s[l - 1]);
	}
	return 0;
}
```



**拓展到二维--求子矩阵的和**

S[i][j] 表示该点左上角所有元素的和

![image.png](/notes/algorithm-foundations/asset-015.png)

举例：

![image.png](/notes/algorithm-foundations/asset-016.png)

```cpp
#include<iostream>
using namespace std;

const int N = 1010;
int a[N][N],s[N][N];
int n,m,q;

int main(){
    scanf("%d%d%d",&n,&m,&q);
    //读入矩阵
    for(int i = 1;i <= n;i++)
        for(int j = 1;j <= m;j++)
            scanf("%d",&a[i][j]);
    //求前缀和
    for(int i = 1;i <= n;i++)
        for(int j = 1;j <= m;j++)
            s[i][j] = a[i][j] + s[i-1][j] + s[i][j-1] - s[i-1][j-1];//公式
    //询问
    while(q--){
        int x1,y1,x2,y2;
        scanf("%d%d%d%d",&x1,&y1,&x2,&y2);
        printf("%d\n",s[x2][y2]-s[x1-1][y2]-s[x2][y1-1]+s[x1-1][y1-1]);
        //算子矩阵和
    }
    return 0;
}
```





## 差分

对于已知的A数组构造出一个B数组，使得A是B的前缀和，则B是A的差分

可以用于解决a数组某一段连续区间全加上或者减去某一个数的问题

![image.png](/notes/algorithm-foundations/asset-017.png)

先假设a数组所有值均为0，b数组所有值也均为0，看成是进行了n次插入操作

```text
先假设原数组全为0，第一次让原数组的[1,1]插入a[1],然后让原数组的[2,2]插入a[2]
以此类推，直到让原数组的[n,n]插入a[n]
此时a数组同题目给出，b差分数组直接被构造出来了
```

![image.png](/notes/algorithm-foundations/asset-018.png)



```cpp
#include<iostream>
using namespace std;

const int N = 100010;
int a[N],b[N];//a为原数组，b为差分数组
int n,m;//n个整数，m个操作
//插入函数
void insert(int l,int r,int c){
    b[l] += c;
    b[r+1] -= c;
}
int main(){
    scanf("%d%d",&n,&m);
    for(int i = 1;i <= n; i++) scanf("%d",&a[i]);
    for(int i = 1;i <= n; i++) insert(i,i,a[i]);
    //从前往后每个数插入一遍，相当于在i到i区间内插入a[i]的值
    while(m--){
        int l,r,c;
        scanf("%d%d%d",&l,&r,&c);
        insert(l,r,c);
    }
    for(int i = 1;i <= n; i++) b[i] += b[i-1];
    //求前缀和，将b变为b的前缀和，即原数组
    for(int i = 1;i <= n; i++) printf("%d ",b[i]);
    
    return 0;
}
```

二维差分

无论是一维的差分还是二维的差分，其实在算的时候并不考虑构造的问题，只需要考虑如何通过插入对其进行更新就可以了。

给某个子矩阵全加上c

![image.png](/notes/algorithm-foundations/asset-019.png)

初始化：

![image.png](/notes/algorithm-foundations/asset-020.png)

```cpp
#include<iostream>
using namespace std;

const int N = 1010;
int n,m,q;
int a[N][N],b[N][N];

void insert(int x1,int y1,int x2,int y2,int c){
    b[x1][y1] += c;
    b[x2+1][y1] -= c;
    b[x1][y2+1] -= c;
    b[x2+1][y2+1] += c;
}

int main(){
    scanf("%d%d%d",&n,&m,&q);
    //读入a数组
    for(int i = 1;i <= n;i ++)
        for(int j = 1;j <= m;j ++)
            scanf("%d",&a[i][j]);
    //插值构造出b数组
    for(int i = 1;i <= n;i ++)
        for(int j = 1;j <= m;j ++)
            insert(i,j,i,j,a[i][j]);
    while(q--){
        int x1,y1,x2,y2,c;
        cin>>x1>>y1>>x2>>y2>>c;
        insert(x1,y1,x2,y2,c);
    }
    //计算原数组,即计算前缀和
    for(int i = 1;i <= n;i ++)
        for(int j = 1;j <= m;j ++)
            b[i][j] += b[i-1][j] + b[i][j-1] - b[i-1][j-1];
    //输出结果
    for(int i = 1;i <= n;i ++){
        for(int j = 1;j <= m;j ++) printf("%d ",b[i][j]);
        puts(" ");
    }
    return 0;
}
```



## 双指针算法

分类：两个指针各指向一个序列 两个指针指向一个序列

![image.png](/notes/algorithm-foundations/asset-021.png)

举例：读入一个单词序列，每个单词之间有空格，需要将每个单词输出出来，并占一行

```cpp
输入：
abc def ghi
输出：
abc
def
ghi
```

指针：

![image.png](/notes/algorithm-foundations/asset-022.png)

```cpp
#include<iostream>
#include<stdio.h>
#include<string.h>
using namespace std;

int main(){
    char str[1000];
    
    gets(str);
    int n = strlen(str);
    
    for(int i = 0;i < n;i ++){
        int j = i;
        while(j < n && str[j] != ' ') j++;//双指针
        //这道题的具体逻辑
        for(int k = i;k < j;k ++) cout<<str[j];
        cout<<endl;
        i = j;
        
    }
}
```

最长连续不重复子序列

先写出朴素算法，再从朴素算法中寻找一些性质（单调性），而后使用双指针简化复杂度。

最长连续不重复子序列的两个指针具有单调性，即两个指针只会往一个方向移动，绿指针即j表示的是往左最远能走多远。若红指针后移，绿指针前移则会产生矛盾，比如由[2,3]移动成为[2,2,3,5]则产生了重复。

![image.png](/notes/algorithm-foundations/asset-023.png)

![image.png](/notes/algorithm-foundations/asset-024.png)

check表示i每次移动都要检查一下当前 [j,i] 区间内是否有重复元素，如果有就移动j，直至其中没有重复元素。

可以通过开一个数组，记录每个数出现的次数

```cpp
s[N] //记录每个数出现次数的数组
s[a[i]] ++ //i向后移动
s[a[j]] -- //j向前移动
```

注意到：若在i移动之后出现了重复，则重复的一定是a[i]这个元素，因为在移动之前的[j,i]区间内没有重复的元素。

```cpp
#include<iostream>
using namespace std;

const int N = 100010;

int n;
int a[N],s[N];//a为题目给出的整数序列，s用来存当前每个数出现的次数；

int main(){
    cin>>n;
    for(int i = 0;i < n;i ++) cin>>a[i];
    int res = 0; //初始化连续区间长度
    for(int i = 0,j = 0;i < n;i++){
        s[a[i]] ++;
        while(s[a[i]]>1){
            //不需要像模板中限制j的范围，因为若j比i大则区间内没有数
            //当[j,i]区间内有与当前a[i]相同的元素时j就一直右移直到不重复
            s[a[j]]--;
            j++;
        }
        res = max(res,i-j+1);
    }
    cout<<res<<endl;
    return 0;
}

```

## 位运算

作用：求二进制中1的个数

![image.png](/notes/algorithm-foundations/asset-025.png)

位运算举例：

![image.png](/notes/algorithm-foundations/asset-026.png)

输出：1010

lowbit作用：

![image.png](/notes/algorithm-foundations/asset-027.png)

lowbit运算：

![image.png](/notes/algorithm-foundations/asset-028.png)

```cpp
#include<iostream>
using namespace std;

int lowbit(int x){
    return x & -x;
}
int main(){
    int n;
    cin>>n;
    while(n--){
        int x;
        cin>>x;
        int res = 0;
        while(x){
            x -= lowbit(x);//x不是0的时候，每次减去x的最后一位1
            res++;
        }
        cout<<res<<' ';
    }
    return 0;
}
```



## 整数离散化

某数组内的数值域非常大，但值的个数相对较少。因此将该数组内的元素进行映射

![image.png](/notes/algorithm-foundations/asset-029.png)

```cpp
vector<int> alls;//存储所有离散化的值
sort(alls.begin(),alls.end());//将所有值排序
//unique会将alls数组中所有重复的元素放到最后，其余元素按序排列，数组中不重复序列的最后一个元素
//用erase将不重复序列后的全部删除，即可得到没有重复元素的数组
alls.erase(unique(alls.begin(),alls.end()),alls.end());//去掉重复元素

//二分找出x对应的离散化的值
int find(int x){
  //找到第一个大于等于x的位置
    int l = 0, r = alls.size() - 1;
    while(l < r){
        int mid = l + r >> 1;
        if(alls[mid] >= x) r = mid;
        else l = mid + 1;
    }
    return r + 1;//映射到1，2，3，...,n
}
```

例题：区间和

![image.png](/notes/algorithm-foundations/asset-030.png)

思路：先将x进行映射，任何对x的操作转化成对x映射后k的操作；对区间[L,R]的操作转化为映射后区间的操作。

![image.png](/notes/algorithm-foundations/asset-031.png)



```cpp
#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;

typedef pair<int,int> PII;//每次插入和查询操作都需要两个值，故用pair存

const int N = 300010;//插入需要100000，查询有两个下标，各100000

int n,m;
int a[N],s[N];//a为原数组，s为前缀和

vector<int> alls;//存所有要离散化的值
vector<PII> add,query;

int find(int x){
    //二分查找下标x在离散化之后变成什么
    int l = 0,r = alls.size()-1;
    while(l<r){
        int mid = l+r >> 1;
        if(alls[mid]>=x) r = mid;
        else l = mid+1;
    }
    return r+1;//映射到从1开始，方便求前缀和
}
int main(){
    //基本思路：所有的先读进来，对用到的下标离散化
    cin>>n>>m;
    for(int i = 0;i < n;i++){
        //读入插入操作的值，在下标为x的地方插入c
        int x,c;
        cin>>x>>c;
        add.push_back({x,c});//加入插入数组
        alls.push_back(x);//将需要操作的下标加入待离散化的数组里面去
    }
    for(int i = 0;i < m;i++){
        //读入所有的左右区间
        int l,r;
        cin>>l>>r;
        query.push_back({l,r});//加入查询数组
        alls.push_back(l);//将需要操作的下标加入待离散化的数组里面去
        alls.push_back(r);
    }
    
    sort(alls.begin(),alls.end());//排序
    alls.erase(unique(alls.begin(),alls.end()),alls.end());//去重
    
    //插入操作
    for(auto item : add){
        //item是变量名，auto可以自动识别是什么类型
        //pair有两个属性first和second
        
        int x = find(item.first);//离散化后的下标
        a[x] += item.second;//插入
    }
    //预处理前缀和
    for(int i = 1;i <= alls.size();i++) s[i] += s[i-1]+a[i];
    
    //询问操作
    for(auto item:query){
        int l = find(item.first),r = find(item.second);
        cout << s[r] - s[l-1] << endl;
    }
    
    return 0;
}
```



## 区间合并

如果区间与区间之间有交集，则合并。注意：在端点处相交也算有交集。

输入样例：

```cpp
5
1 2
2 4
5 6
7 8
7 9
```

输出样例：

```cpp
3
```

![image.png](/notes/algorithm-foundations/asset-032.png)

解题思路：

![image.png](/notes/algorithm-foundations/asset-033.png)

因为第一步已经按区间左端点进行排序了，所以在第二部中不会出现下一个区间的左端点比当前区间的左端点更靠左的情况了。

绿色情况：不变

黄色情况：更新右端点

粉色情况：结果加一，当前维护区间更新成粉色区间

```cpp
#include<iostream>
#include<algorithm>
#include<vector>

using namespace std;

typedef pair<int,int> PII;

const int N = 100010;

int n;

vector<PII> segs;//存区间

void merge(vector<PII> &segs){
    vector<PII> res;
    
    sort(segs.begin(),segs.end());//排序，优先以左端点排序，再以右端点排序
    
    int st = -2e9,ed = -2e9;
    for(auto seg: segs){
        if(ed<seg.first){//粉色情况
            if(st != -2e9) res.push_back({st,ed});
            st = seg.first,ed = seg.second;
        }
        else ed = max(ed,seg.second);//绿色情况和黄色情况
    }
    
    if(st != -2e9) res.push_back({st,ed});
    segs = res;
}
int main(){
    cin>>n;
    for(int i = 0;i < n;i++){
        int l,r;
        cin>>l>>r;
        segs.push_back({l,r});//存区间左右端点
    }
    merge(segs);//合并
    cout<<segs.size()<<endl;
    
    return 0;
}
```

---

# 数学知识

## 数论

### 质数

#### 试除法判断质数

![image.png](/notes/algorithm-foundations/asset-034.png)

题目：

![image.png](/notes/algorithm-foundations/asset-035.png)

代码：

```cpp
#include<iostream>
#include<algorithm>

using namespace std;

bool is_prime(int x){
    if(x < 2) return false;
    for(int i = 2;i <= x / i;i ++)
    {
        if(x % i == 0) return false;
    }
    return true;
}

int main()
{
    int n;
    cin >> n;
    while(n--)
    {
        int x;
        cin >> x;
        if(is_prime(x)) puts("Yes");
        else puts("No");
    }
    return 0;
}
```

#### 分解质因数

![image.png](/notes/algorithm-foundations/asset-036.png)

题目：

![image.png](/notes/algorithm-foundations/asset-037.png)

代码：

```cpp
#include<iostream>
#include<algorithm>

using namespace std;

void divide(int n)
{
    for(int i = 2;i <= n / i;i ++)
    {
        if(n % i == 0) //i一定是质数
        {
            int s = 0;
            while(n % i == 0)
            {
                s ++;
                n /= i;
            }
            printf("%d %d\n",i,s);
        }
    }
    if(n > 1) printf("%d %d\n",n,1); //大于根号n的质因数
    puts("");
}

int main()
{
    int n;
    cin >> n;
    while(n--)
    {
        int x;
        scanf("%d",&x);
        divide(x);
    }
    return 0;
}
```

## 组合计数



## 高斯消元



## 简单博弈论

---

# 数据结构

## 链表

---

### 单链表

用的最多的是邻接表：存图和存数

![image.png](/notes/algorithm-foundations/asset-038.png)

```cpp
e[N]表示值
ne[N]表示next指针
```

![image.png](/notes/algorithm-foundations/asset-039.png)

翻译一下就是：

1.向链表头部插入一个数

2.删除下标为k-1后面的结点

3.将x插入到下标为k-1的结点的后面

注意：第k个插入的点下标是k-1

```cpp
#include<iostream>
using namespace std;

const int N = 100010;

// head 表示头结点的下标
// e[i] 表示节点i的值
// ne[i] 表示节点i的next指针是多少
// idx 存储当前已经用到了哪个点

int head, e[N], ne[N], idx;

//初始化
void init(){
    head = -1;
    idx = 0;
}

// 将x插到头结点
void add_to_head(int x){
    e[idx] = x, ne[idx] = head,head = idx,idx ++;
}

// 将x插到下标是k的点后面
void add(int k,int x){
    e[idx] = x, ne[idx] = ne[k], ne[k] = idx,idx ++;
}

//将下标是k的点后面的点删掉
void remove(int k){
    ne[k] = ne[ne[k]];
}

int main(){
    int m;
    cin>>m;
    
    init();
    
    while(m--){
        int k,x;
        char op;
        
        cin>>op;
        if(op == 'H'){
            cin >> x;
            add_to_head(x);
        }
        else if(op == 'D'){
            cin >> k;
            if(!k) head = ne[head];
            else remove(k-1);
        }
        else{
            cin>>k>>x;
            add(k-1,x);
        }
    }
    for(int i = head; i != -1;i = ne[i]) cout << e[i] <<' ';
    cout<<endl;
    return 0;
}
```

### 双链表

用来优化某些问题



初始化：假设0表示左端点，1表示右端点

假设：l表示左边相邻结点，r表示右边相邻结点

在k的右边插入：先把这个结点连上

![image.png](/notes/algorithm-foundations/asset-040.png)

修改插入位置前后结点的指针：一定要先修改k右侧结点的左指针，否则会出现找不到k原来右侧的结点，导致无法进行相应的修改。

![image.png](/notes/algorithm-foundations/asset-041.png)

在k的左边插入x：等价于在k的左边结点 的右边 插入一个x，转化成上面的形式



删除第k个结点：将左右两边的结点连起来就可以了。让左边结点的右指针指向k右边，k右边结点的左边指向k左边。

![image.png](/notes/algorithm-foundations/asset-042.png)

```cpp
#include<iostream>
using namespace std;

const int N = 100010;

int m;

int e[N],l[N],r[N],idx;

//初始化
//0是左端点，1是右端点
void init(){
    r[0] = 1;
    l[1] = 0;
    idx = 2;
}
//在k的右边插入一个x
void add(int k,int x){
    e[idx] = x;
    r[idx] = r[k];
    l[idx] = k;
    l[r[k]] = idx;//这步一定要先于后面那步
    r[k] = idx;
    idx++;//插入后一定要移idx；
}
//删除第k个点
void remove(int k){
    r[l[k]] = r[k];
    l[r[k]] = l[k];
}

int main(){
    cin>>m;
    init();
    while(m--){
        string op;
        cin>>op;
        int k,x;
        if(op == "L"){
            cin>>x;
            add(0,x);
        }
        else if(op == "R"){
            cin>>x;
            add(l[1],x);
        }
        //第k个插入的数下标为k+1，因为idx从2开始
        else if(op == "D"){
            cin>>k;
            remove(k+1);
        }
        else if(op == "IL"){
            cin>>k>>x;
            add(l[k+1],x);
        }
        else{
            cin>>k>>x;
            add(k+1,x);
        }
    }
    for(int i = r[0]; i != 1;i = r[i]) cout<<e[i]<<' ';
    cout<<endl;
    return 0;
}
```



---



## 栈与队列

栈：先进后出 队列：先进先出

栈基本操作：

```cpp
#include<iostream>
using namespace std;

const int N = 100010;

int stk[N],tt;//tt表示栈顶下标

//插入
stk[++tt] = x;

//弹出
tt--;

//判断是否为空
if(tt > 0) not empty;
else empty

//栈顶
stk[tt];
```

模拟栈：

```cpp
#include<iostream>
using namespace std;

const int N = 100010;

int m;
int stk[N],tt;//tt表示栈顶下标

int main(){
    cin >> m;
    while(m--){
        string op;
        int x;
        cin >> op;
        if(op == "push"){
            cin>>x;
            stk[++ tt] = x;
        }
        else if(op == "pop") tt--;
        else if(op == "empty") cout<<(tt ? "NO" : "YES") <<endl;
        else cout<<stk[tt]<<endl;
    }
    return 0;
}
```

表达式求值：

![image.png](/notes/algorithm-foundations/asset-043.png)

```cpp
#include <iostream>
#include <cstring>
#include <algorithm>
#include <stack>
#include <unordered_map>

using namespace std;

stack<int> num;
stack<char> op;

//操作末尾两个数
void eval()
{
    auto b = num.top(); num.pop();//第二个运算数
    auto a = num.top(); num.pop();//第一个运算数
    auto c = op.top(); op.pop();//操作符
    int x;
    if (c == '+') x = a + b;
    else if (c == '-') x = a - b;
    else if (c == '*') x = a * b;
    else x = a / b;
    num.push(x);//运算结果压入栈
}

int main()
{
  //哈希表，定义优先级
    unordered_map<char, int> pr{{'+', 1}, {'-', 1}, {'*', 2}, {'/', 2}};
    string str;
    cin >> str;
    for (int i = 0; i < str.size(); i ++ )
    {
        auto c = str[i];
        //数字
        if (isdigit(c))
        {
            int x = 0, j = i;
            while (j < str.size() && isdigit(str[j]))
                x = x * 10 + str[j ++ ] - '0';
            i = j - 1;
            num.push(x);
        }
        else if (c == '(') op.push(c);//左括号->直接堆入栈
        else if (c == ')')
        {
            //eval表示用末尾的运算符操作末尾的两个数
            while (op.top() != '(') eval();
            op.pop();//左括号弹出
        }
        else
        {
          //一般运算符
          //栈不空且栈顶元素优先级大于等于当前元素优先级->操作栈顶元素
          //否则将当前元素插入栈中
            while (op.size() && op.top() != '(' && pr[op.top()] >= pr[c]) eval();
            op.push(c);
        }
    }
    while (op.size()) eval();//所有没有操作完的运算符从右往左操作一遍
    cout << num.top() << endl;//栈顶元素即为答案
    return 0;
}


```

队列基本操作：

```cpp
int q[N],hh,tt = -1;//在队尾插入元素，在队头弹出元素

//插入
q[++tt] = x;

//弹出
hh++;

//判断队列是否为空
if(hh <= tt) not empty
else empty

//取出队头元素
q[hh];

//取队尾
q[tt];

```

模拟队列：

```cpp
#include<iostream>
using namespace std;

const int N = 1000010;

int m;
int q[N],hh,tt = -1;

int main(){
    cin >> m;
    while(m--){
        string op;
        int x;
        cin >> op;
        if(op == "push"){
            cin >> x;
            q[++ tt] = x;
        }
        else if(op == "pop") hh++;
        else if(op == "empty") cout<< (hh <= tt ? "NO" : "YES")<<endl;
        else cout<<q[hh]<<endl;
    }
    return 0;
}
```

---



## 单调栈与单调队列

单调栈：给定一个序列，求每一个数左边离它最近的且小于它的数

假设a[i] 在 a[j] 的左边，且 a[i] < a[j] 则根据题目条件可以看出a[j]不可能被输出出来，因此可以直接删掉这样的逆序对，最终得到一个单调上升的序列。

在放入一个元素前可以查栈顶，若比这个元素小则找到了最近的比它小的数，否则边删现在栈顶边比较该元素与新栈顶。

```cpp
#include<iostream>
using namespace std;

const int N = 100010;

int n;
int stk[N],tt;

int main(){
    cin >> n;
    for(int i = 0;i < n;i++){
        int x;
        cin >> x;
        //栈不空且栈顶元素大于当前元素的时候，将栈顶删除，继续和新栈顶比较
        while(tt && stk[tt] >= x) tt--;
        //栈空了 or 栈顶元素比当前元素小
        if(tt) cout<< stk[tt]<<' ';//栈不空，则输出
        else cout<< -1 << ' ';//栈删空了都没找到，则左侧找不到小于该元素的
        
        stk[++tt] = x;//新元素放进栈里
    }
    return 0;
}
```



单调队列：求滑动窗口内的最大最小值

原理同单调栈，删除所有逆序对，得到递增序列，取极值就可以直接考虑端点。

例题：求滑动窗口内最大最小值

![image.png](/notes/algorithm-foundations/asset-044.png)

```cpp
#include<iostream>
using namespace std;

const int N = 1000010;

int n,k;
int a[N],q[N];//a存值，q存下标

int main(){
    scanf("%d%d",&n,&k);
    for(int i = 0;i < n;i++) scanf("%d",&a[i]);
    //最小值
    int hh = 0,tt = -1;//队列初始化hh为队头，tt为队尾
    for(int i = 0;i < n;i++){
        //判断队头是否滑出窗口:队列不空并且窗口最左端下标大于队头下标
        if(hh <= tt && i - k + 1 > q[hh]) hh++;//一次滑动一下所以用if不用while
        //如果当前队列不空，并且队尾的值大于当前元素
        //则队尾的值不可能是区间内最小的，所以直接删去
        //插入元素必然比插入前的队列的队尾大
        while(hh <= tt && a[q[tt]] >= a[i]) tt--;
        q[++tt] = i;//将当前值下标加入队列（q数组）
        if(i >= k - 1) printf("%d ",a[q[hh]]);
        //由于插入过程中直接删除了逆序对，所以得到的队列一定是升序的，队头即为最小值
    }
    puts("");//回车
    
    //最大值
    hh = 0,tt = -1;
    for(int i = 0;i < n;i++){
        //检查队头是否滑出
        if(hh <= tt && i - k + 1 > q[hh]) hh++;
        //删除逆序对使得得到一个降序序列，新插入元素必然比插入前队尾小
        //所以判断条件就是：如果当前队尾比现在的元素小，就删除
        while(hh <= tt && a[q[tt]] <= a[i]) tt--;
        q[++ tt] = i;
        if(i >= k - 1) printf("%d ",a[q[hh]]);
    }
    puts("");
    return 0;
    
}
```



## KMP

kmp下标从1开始，s是要匹配的串，p是模板串

先思考暴力如何做，然后再对它进行优化，暴力做法如下：

![image.png](/notes/algorithm-foundations/asset-045.png)

当两个字符串匹配出现错误之后，最少移动多少能使两者继续匹配；

![image.png](/notes/algorithm-foundations/asset-046.png)

因为已经匹配过一部分了，如果出现错误之后就往后移动一位然后再重新开始匹配，则会造成很多不必要的浪费。思路就是在模板串中找出来最长的和从头开始的一段相同的另一段，如果出现匹配不成功的情况直接从后面一段末尾开始匹配，也就是找到最少往后移动的长度。

next[i] 表示：以i为终点的后缀和从1开始的前缀相等，并且后缀长度最长。

next[i] = j 表示：在模板串p中 p[1~j] 与 p[i-j+1~i] 是完全一样的，并且长度最长。





![image.png](/notes/algorithm-foundations/asset-047.png)



![image.png](/notes/algorithm-foundations/asset-048.png)

匹配失败时，匹配串向后移动，直接调用next[j]

![image.png](/notes/algorithm-foundations/asset-049.png)

![image.png](/notes/algorithm-foundations/asset-050.png)

![image.png](/notes/algorithm-foundations/asset-051.png)

*注：绿色线标记的三段完全相等*

原理图如下：

![image.png](/notes/algorithm-foundations/asset-052.png)

举例：

![image.png](/notes/algorithm-foundations/asset-053.png)



```cpp
#include<iostream>
using namespace std;

const int N = 100010,M = 1000010;

int n,m;
char p[N],s[M];
int ne[N];//next数组

int main(){
    //scanf("%d%s%d%s",&n,p+1,&m,s+1);
    cin >> n >> p+1 >> m >>s+1;
    
    //求next数组
    //从2开始，next[1] = 0,第一个字母失败了就只能从0开始
    //其余思路和kmp相同，每次失败就再退一点重新开始匹配
    for(int i = 2,j = 0;i <= n;i++){
        while(j && p[i] != p[j+1]) j = ne[j];
        if(p[i] == p[j+1]) j++;
        ne[i] = j;
    }
    //kmp匹配过程
    for(int i = 1,j = 0;i <= m;i++){
        //每次和s[i]进行匹配的是p[j+1]
        //如果j不是匹配串的第一个，并且模板串与匹配串不能匹配时，将j移动到next[j]再匹配
        while(j && s[i] != p[j+1]) j = ne[j];
        if(s[i] == p[j+1]) j++;//模板串和匹配串能匹配上就继续向后匹配
        if(j == n){
            //匹配成功,输出匹配的起始位置
            printf("%d ",i - n );//字符串下标从1开始
            j = ne[j];//本次成功后使下次匹配时匹配串最少往后移动多少
        }
    }
    return 0;
}
```



## Trie树

基本用法：快速高效地存储和查找字符串集合的数据结构

给定一个字符串集合：

```cpp
abcdef
abdef
aced
bcdf
bcff
cdaa
bcdc
```

trie树存储：从根节点开始依次往下建立。字符串的开头和根节点相连，如果之前没有这个节点就创建一个新的，否则直接用之前创建好的。并且给每个字符串结尾打一个标记。创建结果如图：

![image.png](/notes/algorithm-foundations/asset-054.png)

为什么要打标记：如果现在要存abc，发现它在abcdef这个串中间就结束了，所以需要标记一下这里c是abc的结束。

trie树查找：沿着根节点往下查找，并检查末尾是否有结束标记。

```cpp
#include<iostream>
using namespace std;

const int N = 100010;

char str[N];
//trie树每个节点的儿子，由于仅包含小写字母，所以最多26个儿子
int son[N][26];
int cnt[N];//以当前这个点结尾的单词有多少个
int idx;//当前使用到的下标
//下标为0的点既是根节点，又是空节点
 
//插入
void insert(char str[]){
    int p = 0;//从根节点开始遍历
    for(int i = 0;str[i];i++){//字符串结尾是0，据此判断是否走到头
        int u = str[i]-'a';//字母对应编号,转成0~25
        if(!son[p][u]) son[p][u] = ++idx;//若p没有u这个儿子就创建一个
        p = son[p][u];//往下一个走
    }
    cnt[p] ++;//以该点为结尾的单词的数量增加了一个
}
//查询
int query(char str[]){
    //查询字符串出现多少次
    int p = 0;
    for(int i = 0;str[i];i++){
        int u = str[i] - 'a';
        if(!son[p][u]) return 0;//不存在该子节点，说明当前集合不存在所查串
        p = son[p][u];//继续向下查询
    }
    return cnt[p];//返回以p结尾的串的数目
}

int main(){
    int n;
    scanf("%d",&n);
    while(n--){
        char op[2];//操作类型
        scanf("%s%s",op,str);
        if(op[0] == 'I') insert(str);
        else printf("%d\n",query(str));
    }
    return 0;
}
```

注意：son[x][y]x节点的第y个儿子，x为父结点，y为子节点



例题：最大异或对

![image.png](/notes/algorithm-foundations/asset-055.png)

注：异或规则，相同为0不同为1（不进位加法）

举例：先对每一个数的二进制建trie，求异或的过程中尽量往不同于当前位的分支走,如果不存在则只能往与当前位相同的分支走

![image.png](/notes/algorithm-foundations/asset-056.png)

一种位运算操作：x >> k & 1 表示求x的第k位是0还是1

```cpp
#include<iostream>
#include<algorithm>

using namespace std;

const int N = 100010,M = 3100010;//M表示节点个数

int n;
int a[N],son[M][2],idx;//每个点最多只有0 or 1两个儿子

void insert(int x){
    int p = 0;//根节点
    for(int i = 30;i >= 0;i--){
        int &s = son[p][x >> i & 1];
        if(!s) s = ++idx;//如果没有就新建
        p = s;
    }
}

int query(int x){
    int p = 0,res = 0;
    
    for(int i = 30;i >= 0;i--){
        int s = x >> i & 1;
        if(son[p][!s]){//尽量往不同于当前位的情况走
            res += 1 << i;//如果存在则该位异或结果为1
            p = son[p][!s];
        }
        else p = son[p][s];
    }
    
    return res;
}

int main(){
    scanf("%d",&n);
    for(int i = 0;i < n;i ++){
        scanf("%d",&a[i]);
        insert(a[i]);
    }
    int res = 0;
    for(int i = 0;i < n;i ++) res = max(res,query(a[i]));
    
    printf("%d\n",res);
    
    return 0;
}
```





---



## 并查集

![image.png](/notes/algorithm-foundations/asset-057.png)

并查集存储合并集合：

![image.png](/notes/algorithm-foundations/asset-058.png)

基本用法：近乎O(1)

- 将两个集合合并

- 询问两个元素是否在一个集合当中

基本思想：

- 用树维护所有集合（不一定是二叉树）

- 每一个集合的编号为根节点的编号，即根节点为代表元素；其余每个节点都需要存储该节点的父结点是谁

- 通过不断找该节点的父结点并判断父结点是否为根节点来找到集合的编号从而确定该节点所在的集合

并查集的**优化(路径压缩)**：

找到根节点之后，将整个路径上的点全指向根节点





![image.png](/notes/algorithm-foundations/asset-059.png)



![image.png](/notes/algorithm-foundations/asset-060.png)







```cpp
#include<iostream>
using namespace std;

const int N = 100010;

int n,m;
int p[N];//存每个元素的父结点

//返回x所在集合的编号，即该节点的祖宗节点+路径压缩
int find(int x){
    //如果x不是根节点，就让该点的父结点等于该点的祖宗节点
    if(p[x] != x) p[x] = find(p[x]);
    return p[x];
}

int main(){
    scanf("%d%d",&n,&m);
    //初始时每个点都是一个集合，树根就是自己,即自己是自己的父结点
    for(int i = 1;i <= n;i ++) p[i] = i;
    while(m--){
        char op[2];
        int a,b;
        scanf("%s%d%d",op,&a,&b);
        
        //合并，让a的祖宗节点的父结点是b的祖宗节点
        if(op[0] == 'M') p[find(a)] = find(b);
        else{
            if(find(a) == find(b)) puts("Yes");
            else puts("No");
        }
    }
    return 0;
}
```



并查集还可以在做的过程中动态的维护一些信息

举例：连通块中点的数量

![image.png](/notes/algorithm-foundations/asset-061.png)



- 连一条边→合并两个集合

- 是否在一个连通块中→是否在一个集合

- 需要动态维护一个信息→集合中元素的数量(连通块中点的数量)

```cpp
#include<iostream>
using namespace std;

const int N = 100010;

int n,m;
int p[N];//存每个元素的父结点
int cnt[N];//集合中元素的个数,这里只保证根节点的cnt有意义

//返回x所在集合的编号，即该节点的祖宗节点+路径压缩
int find(int x){
    //如果x不是根节点，就让该点的父结点等于该点的祖宗节点
    if(p[x] != x) p[x] = find(p[x]);
    return p[x];
}

int main(){
    scanf("%d%d",&n,&m);
    //初始时每个点都是一个集合，树根就是自己,即自己是自己的父结点
    for(int i = 1;i <= n;i ++){
        p[i] = i;
        cnt[i] = 1;//开始时每个集合只有一个点
    }
    while(m--){
        char op[5];
        int a,b;
        scanf("%s",op);
        
        //合并，让a的祖宗节点的父结点是b的祖宗节点
        if(op[0] == 'C'){
            scanf("%d%d",&a,&b);
            //a，b已在一个集合中，则无需合并
            if(find(a) == find(b)) continue;
            cnt[find(b)] += cnt[find(a)];
            //和前面不能颠倒，先算合并后集合大小，再合并成一个集合
            p[find(a)] = find(b);
        } 
        else if(op[1] == '1'){
            scanf("%d%d",&a,&b);
            if(find(a) == find(b)) puts("Yes");
            else puts("No");
        }
        else{
            scanf("%d",&a);
            printf("%d\n",cnt[find(a)]);
        }
    }
    return 0;
}
```



例题：食物链

![image.png](/notes/algorithm-foundations/asset-062.png)



只要知道两者之间的关系，就放到一个集合里面，从而推断出集合中所有元素之间的关系

所有出现的值全部放在一起，用每个点与根节点的距离表示该点与根结点的关系。相当于将根节点作为参照的标准，根据每个元素和根节点之间的关系，推断它们之间的关系

对各点与根节点的距离模三

- 余1：这个点可以吃掉根节点

- 余2：这个点被根节点吃

- 余0：与根节点是同类

能吃第x代的设为第x+1代，代就表示距离

记录每个点到该点父节点之间的距离，在路径压缩的过程中，将每个点到父节点的距离更新成到根节点的距离

```cpp
#include<iostream>

using namespace std;

const int N = 50010;

int n,m;
int p[N],d[N];//p表示父节点，d表示到父节点的距离

int find(int x)
{
    if(p[x] != x)
    {//如果x不是树根
        int t = find(p[x]);//记录父节点到根节点之间的距离
        d[x] += d[p[x]];//更新成到根节点之间的距离
        p[x] = t;//还原p[x]到根节点的距离
    }
    return p[x];
}

int main(){
    scanf("%d%d",&n,&m);
    
    for(int i = 1;i <= n;i ++) p[i] = i;//初始化，d[N]在定义的时候就已经初始化好了
    
    int res = 0;
    while(m--)
    {
        int t,x,y;
        scanf("%d%d%d",&t,&x,&y);
        
        if(x > n || y > n) res++;// 当前的话中X或Y比N大，是假话
        
        else
        {
            int px = find(x), py = find(y);
            if(t == 1)
            {
                if(px == py && (d[x] - d[y]) % 3 ) res ++;
                else if (px != py){
                    p[px] = py;//y变成x的父节点
                    d[px] = d[y] - d[x];//x,y mod3 相等
                }
            }
            else{
                if(px == py && (d[x] - d[y] - 1) % 3) res ++;
                else if(px != py){
                    p[px] = py;
                    d[px] = d[y] + 1 - d[x];
                }
            }
        }
    }
    printf("%d",res);
    
    return 0;
}
```

## 堆

如何手写一个堆（heap）？→维护一个数字集合

- 插入一个数

- 求集合中的最小值

- 删除最小值

- 删除任意一个元素

- 修改任意一个元素

堆实际上是一颗**完全二叉树**，除了最后一排其余都是非空的，最后一排是从左到右排序的



小根堆：父节点小于等于左右儿子，每颗树的根节点是最小值

![image.png](/notes/algorithm-foundations/asset-063.png)

堆的存储：

![image.png](/notes/algorithm-foundations/asset-064.png)

用一个一维数组存，一号点为根节点，x的左儿子是2x，右儿子是2x+1

操作：down，up

down：

某个数变大后可能需要向下交换，每次与左右儿子中最小的交换一下，直到不再需要交换

up：

某个数变小后可能需要向上交换，每次与该节点的父结点比较，若小于父结点的值则需要交换



如何用down和up实现堆的基本操作？heap表示堆，size表示堆的大小

插入:直接在堆的最后插入即可，然后将新插入的数往上移动

heap[size++] = x;up(size);

最小值:小根锥锥顶即为最小值

heap[1];

删除最小值：将最后一个元素移到锥顶位置覆盖掉锥顶元素，将堆的元素个数减一，然后进行down操作恢复成小根堆

heap[1] = heap[size];size--;down(1);

删除任意一个元素：将最后一个元素移到k这里覆盖，堆的元素减一。覆盖后可能比原来k位置的元素大or小or相同，直接无脑down一次up一次

heap[k] = heap[size];size--;down(k);up(k);

修改任意一个元素:原理同删除任意一个元素

heap[k] = x;down(k);up(k);



如何建堆？时间复杂度O（n）

从n/2 down到 1

证明时间复杂度为O（n）如下：

![image.png](/notes/algorithm-foundations/asset-065.png)

输入样例：

```cpp
5 3
4 5 1 3 2
```

for(int i = n/2; i ; i --) down(i);

对除了堆底的元素进行down操作，操作顺序是最右侧叶子节点的父结点先down，然后按照每层从右往左的顺序执行。保证上面的大数被down下来，小数也同时被换上去了，所以只考虑堆底上方所有节点的情况而不考虑堆底叶子节点的情况。

![c83f30f3e323101b6a0602631bda29a.jpg](/notes/algorithm-foundations/asset-066.jpg)



堆排序： 

```cpp
#include<iostream>
#include<algorithm>

using namespace std;

const int N = 100010;

int n,m;
int h[N],sz;//h表示堆，size表示堆中元素个数

void down(int u){
    int t= u;//父结点和左右儿子中最小的节点的编号
    //如果左儿子存在并且值小于父结点，则记为最小节点
    if(u * 2 <= sz && h[u * 2] < h[t]) t = u*2;
    //右儿子同理
    if(u*2+1 <= sz && h[u*2+1] < h[t]) t = u*2+1;
    if(u != t){//父结点不是最小的
        swap(h[u],h[t]);//最小的交换上去
        down(t);//被换下来的较大的继续down
    }
}

int main(){
    scanf("%d%d",&n,&m);
    for(int i = 1;i <= n;i ++) scanf("%d",&h[i]);
    sz = n;
    //建堆
    for(int i = n/2;i;i--) down(i);
    
    while(m--){
        printf("%d ",h[1]);//输出堆顶
        h[1] = h[sz];//用最后一个元素覆盖堆顶
        sz--;//缩小堆的元素个数
        down(1);//新堆顶下沉
    }
    return 0;
}
```

up操作：

```cpp
void up(int u){
  //有父结点，且当前小于父结点则交换
  while(u/2 && h[u/2] > h[u]){
    swap(h[u/2],h[u]);//交换值
    u /= 2;//改下标
  }
}
```



删除修改第k个插入的数：





![image.png](/notes/algorithm-foundations/asset-067.png)



![image.png](/notes/algorithm-foundations/asset-068.png)





![image.png](/notes/algorithm-foundations/asset-069.png)



![image.png](/notes/algorithm-foundations/asset-070.png)

```cpp
#include<iostream>
#include<algorithm>
#include<string.h>

using namespace std;

const int N = 100010;

int n,m;
int h[N],sz;//h表示堆，size表示堆中元素个数
int ph[N];//第k个插入的点在堆里的下标,pointer-heap
int hp[N];//堆里的第k个点是第几个插入点 heap-pointer

//交换
void heap_swap(int a,int b){ 
    swap(ph[hp[a]],ph[hp[b]]);//交换pointer-heap
    swap(hp[a],hp[b]);//交换heap-pointer
    swap(h[a],h[b]);//交换值
}
void down(int u){
    int t= u;//父结点和左右儿子中最小的节点的编号
    //如果左儿子存在并且值小于父结点，则记为最小节点
    if(u * 2 <= sz && h[u * 2] < h[t]) t = u*2;
    //右儿子同理
    if(u*2+1 <= sz && h[u*2+1] < h[t]) t = u*2+1;
    if(u != t){//父结点不是最小的
        heap_swap(u,t);//最小的交换上去
        down(t);//被换下来的较大的继续down
    }
}

void up(int u){
  //有父结点，且当前小于父结点则交换
  while(u/2 && h[u/2] > h[u]){
    heap_swap(u,u/2);//交换值
    u /= 2;//改下标
  }
}

int main(){
    int n,m = 0;//m表示第几个插入的数
    int x,k;
    scanf("%d",&n);
    while(n--){
       char op[10];
       scanf("%s",op);
       if(!strcmp(op,"I")){
           scanf("%d",&x);
           sz ++;
           m ++;
           ph[m] = sz,hp[sz] = m;
           h[sz] = x;
           up(sz);
       }
       else if(!strcmp(op,"PM")) printf("%d\n",h[1]);
       else if(!strcmp(op,"DM")){
           heap_swap(1,sz);
           sz--;
           down(1);
       }
       else if(!strcmp(op,"D")){
           scanf("%d",&k);
           k = ph[k];//堆里面的位置
           heap_swap(k,sz);
           sz--;
           down(k),up(k);
       }
       else{
          scanf("%d%d",&k,&x);
          k = ph[k];//堆里面的位置 
          h[k] = x;
          down(k),up(k);
       }
    }
    return 0;
}
```

补充：heap-swap





![image.png](/notes/algorithm-foundations/asset-071.png)



![image.png](/notes/algorithm-foundations/asset-072.png)



## 哈希表

将一堆较大规模的数据映射到一个较小的规模

哈希表

    存储结构

        开放寻址法

        拉链法

    字符串哈希

将问题规模由10^9映射到10^5

取模时需要取一个质数，并且尽量远离2的n次幂



### 拉链法

产生冲突后拉链法将冲突的结点挂在当前位置以存放的结点的后面

![image.png](/notes/algorithm-foundations/asset-073.png)

拉链法→单数组+数组模拟临接表



```cpp
#include<iostream>
#include<cstring>

using namespace std;

const int N = 100003;//大于规模的最小的质数

int h[N],e[N],ne[N],idx;//哈希表，值，下一个位置，当前位置

void insert(int x){
    int k = (x % N + N) % N;//如果出现负数的情况需要+N使其变为正的
    //新结点插到头部
    e[idx] = x, ne[idx] = h[k],h[k] = idx ++;
    
}

bool find(int x){
    int k = (x % N + N) % N;
    for(int i = h[k];i != -1;i = ne[i])
        if(e[i] == x)
            return true;
    return false;
    
}

int main(){
   int n;
   scanf("%d",&n);
   memset(h,-1,sizeof h);//清空哈希表的所有槽，空指针用-1表示
   while(n--){
       char op[2];
       int x;
       scanf("%s%d",op,&x);
       if(*op == 'I') insert(x);
       else{
           if(find(x)) puts("Yes");
           else puts("No");
       }
   }
}
```



### 开放寻址法

开放寻址法→只有一个单数组

数组长度是题目规模的2～3倍

```cpp
#include<iostream>
#include<cstring>

using namespace std;

const int N = 200003;//大于规模两倍的最小的质数
const int null = 0x3f3f3f3f;

int h[N];//哈希表

//如果x在哈希表中已经存在则返回x的位置
//如果x不存在，返回应该存储的位置
int find(int x){
    
    int k = (x % N + N) % N;
    while(h[k] != null && h[k] != x){//当前位置不为空，且当前位置不是x
        k ++;//看下一个位置
        if(k == N) k = 0;//看到最后一个位置的时候，重新回到起始位置开始看
     }
        return k;
}

int main(){
   int n;
   scanf("%d",&n);
   memset(h,0x3f,sizeof h);//清空哈希表的所有槽，空指针用0x3f表示
   while(n--){
       char op[2];
       int x;
       scanf("%s%d",op,&x);
       
       int k = find(x);
       
       if(*op == 'I') h[k] = x;
       else{
           if(h[k] != null) puts("Yes");
           else puts("No");
       }
   }
}

```



注：

在算法竞赛中，我们常常需要用到设置一个常量用来代表“无穷大”。

比如对于int类型的数，有的人会采用INT_MAX，即0x7fffffff作为无穷大。但是以INT_MAX为无穷大常常面临一个问题，即加一个其他的数会溢出。

而这种情况在动态规划，或者其他一些递推的算法中常常出现，很有可能导致算法出问题。

所以在算法竞赛中，我们常采用0x3f3f3f3f来作为无穷大。0x3f3f3f3f主要有如下好处：

- 0x3f3f3f3f的十进制为1061109567，和INT_MAX一个数量级，即10^9数量级，而一般场合下的数据都是小于10^9的。

- 0x3f3f3f3f * 2 = 2122219134，无穷大相加依然不会溢出。

- 可以使用memset(array, 0x3f, sizeof(array))来为数组设初值为0x3f3f3f3f，因为这个数的每个字节都是0x3f。

### 字符串前缀哈希法

预处理时求出字符串前缀的哈希值

如何定义某个前缀的哈希值？

- 将字符串看成是p进制的数

- 将对应字符依次看成p的0次方，p的一次方……

- 对结果取模，映射到小规模

![image.png](/notes/algorithm-foundations/asset-074.png)

注：

![image.png](/notes/algorithm-foundations/asset-075.png)

- 不能映射成0

- 假定不存在hash冲突

好处：可以利用前缀哈希，计算出所有字串的hash值

![image.png](/notes/algorithm-foundations/asset-076.png)

h[r] - h[l - 1] * P[r - l + 1]，为什么h[l - 1]要乘上P[r - l + 1]？

```cpp
先移动 h[L-1] 再进行运算

比如aabbaabb这个字符串，我要求3 - 7 (bbaab) 这一段hash值，需要知道h[L - 1] = h[2]和h[R] = h[7]，即aa和aabbaab的hash值，转换为P进制就是(11) p和(1122112) p，我们需要求bbaab这一个子串的hash值，转换为P进制就是(22112) p，而将h[L-1] * P[R-L+1]就是左移R-L+1为变成(1100000) p，而h[R] - h[L-1] * P[R-L+1]就是(22112) p，也就是子串bbaab的hash值。
```



使用unsigned long long存所有的hash，可以省去取模的操作，溢出就相当于取模了

预处理公式：

```cpp
h[i] = h[i - 1] * p + str[i]
```



字符串哈希

快速判断两个字符串是否相等

![image.png](/notes/algorithm-foundations/asset-077.png)



```cpp
#include<iostream>

using namespace std;

typedef unsigned long long ULL;
const int N = 100010,P = 131;//p是经验值或是13331

int n,m;
char str[N];
ULL h[N],p[N];//p数组存p的多少次方

ULL get(int l,int r){
    return h[r] - h[l - 1] * p[r - l + 1];
}

int main(){
    scanf("%d%d%s",&n,&m,str + 1);//字符串下标从1开始
    p[0] = 1;
    for(int i = 1;i <= n;i++){
        p[i] = p[i - 1] * P;
        h[i] = h[i - 1] * P + str[i];
    }
    while(m--){
        int l1,r1,l2,r2;
        scanf("%d%d%d%d",&l1,&r1,&l2,&r2);
        
        if(get(l1,r1) == get(l2,r2)) puts("Yes");
        else puts("No");
    }
    return 0;
}
```

---

# STL

![image.png](/notes/algorithm-foundations/asset-078.png)

```cpp
#include<bits/stdc++.h>
using namespace std;
int n;
multiset<int> s;
int main(){
	int op;
	cin>>n;
	while(n--){
		cin>>op;
		if(op==1){
			int x;
			cin>>x;
			s.insert(x);
		} 
		else if(op==2){
			if(s.size()){
				cout<<*s.begin()<<endl;
			}
		}
		else{
			if(s.size()){
				s.erase(s.begin());
			}
		}
	}
}
```

---

# 并查集

## 并查集

为了能让你们了解并查集，我举一个简单的例子

话说江湖上散落着各式各样的大侠，有上千个之多。他们没有什么正当职业，整天背着剑在外面走来走去，碰到和自己不是一路人的，就免不了要打一架。但大侠们有一个优点就是讲义气，绝对不打自己的朋友。而且他们信奉“朋友的朋友就是我的朋友”，只要是能通过朋友关系串联起来的，不管拐了多少个弯，都认为是自己人。这样一来，江湖上就形成了一个一个的帮派，通过两两之间的朋友关系串联起来。而不在同一个帮派的人，无论如何都无法通过朋友关系连起来，于是就可以放心往死了打。

p3367

---

### 初始化

在江湖上，有非常多的英雄，我们不妨用一个f数组来保存每位英雄的掌门。

```cpp
 const int X = 10010;
 int f[X];
```

在帮派中，有掌门和弟子，那么刚刚开始肯定都是一个人行走江湖，所以在程序初始化的时候，每个人的掌门都是他们自己。

```cpp
void init(){
	for(int i = 0;i <= X - 1;i++){
		f[i] = i;
	}
}
```

### 查找根节点

我们在判断两位英雄是否师出同门的时候，要用到查找掌门的函数。

这里我们用了记忆化，俗称“压缩路径”。

```cpp
int find_f(int x){
	if(x != f[x]){
		return f[x] = find_f(f[x]);
    //在递归的时候，就直接将遇到的当前帮派的英雄的掌门修改了
	}
	return f[x];//如果找到了掌门，就直接返回掌门编号
}
```

### 合并子集

在确认两位英雄是属于同一个帮派的时候，要把两位英雄的帮派合并，既然师出同门，那两个帮派就是一样的了嘛。

```cpp
void join(int x,int y){
	int fx = find_f(x),
    	fy = find_f(y);//找到两位英雄的掌门
	if(fx != fy){
		f[fy] = fx;//合并子集
	}
}
```

### 主函数

接下来就是整个完整的程序。

```cpp
#include<bits/stdc++.h>
using namespace std;
const int X = 10010;
int f[X];
int n,m;

void init(){
	for(int i = 0;i <= X - 1;i++){
		f[i] = i;
	}
}

int find_f(int x){
	if(x != f[x]){
		return f[x] = find_f(f[x]);
	}
	return f[x];
}

void join(int x,int y){
	int fx = find_f(x),fy = find_f(y);
	if(fx != fy){
		f[fy] = fx;
	}
}

int main(){
	init();
	cin>>n>>m;
	while(m--){
		int t,x,y;
		cin>>t>>x>>y;
		switch(t){
			case 1:
				join(x,y);
				break;
			case 2:
				find_f(x) == find_f(y)?cout<<"Y"<<endl:cout<<"N"<<endl;
                //请注意，这里判断是否为同一个帮派(集合)时要再次找掌门(根节点)
				break;
		}
	}
	return 0;
}
```

可能有些人不太理解这一行：

```cpp
 find_f(x) == find_f(y)?cout<<"Y"<<endl:cout<<"N"<<endl;
```

这行相当于

```cpp
 if(find_f(x) == find_f(y)){
    cout<<"Y"<<endl;
 }
 else{
    cout<<"N"<<endl;
 }
```

---

# 字符串

字符串：

```cpp
 #include<iostream>
 using namespace std;
 const int N=1000006;
 int ne[N];
 string a,b;//b是匹配串
 int la,lb;
 //kmp求匹配串的next数组
 void get_next(){
     for(int i=2,j=0;i<=lb;i++){
         while(j && b[i] != b[j+1]) j = ne[j];
         if(b[i] == b[j+1]) j++;
         ne[i] = j;
     }
 }
 int main(){
     cin>>a>>b;
     //串的长度
     la = a.size();
     lb = b.size();
     //字符串数组要从1开始
     a = '#'+a;
     b = '#'+b;
     //求next数组
     get_next();
     //匹配
     for(int i=1,j=0;i<=la;i++){
         while(j && a[i] != b[j+1]) j=ne[j];
         if(a[i] == b[j+1]) j++;
         if(j==lb){
             cout<< i-lb+1 <<endl;
         }
     }
     //输出next数组
     for(int i=1;i<=lb;i++){
         cout<<ne[i]<<" "[i==la];
     }
 }
 
```

---

# 线段树

线段树模板1：

```cpp
 #include<iostream>
 using namespace std;
 #define lch now*2
 #define rch now*2+1
 #define mid (l+r)/2
 #define maxn 100005
 int a[maxn],s[maxn*4],m,n;//规律就是开一个范围大小四倍的数组就够用
 
 //线段树单次修改单次查询模板
 
 void init(){//读入数列数字
     int i;
     for(i=1;i<=n;i++){
         cin>>a[i];
     }
 }
 //更新线段树
 void pushup(int now){
     s[now] = max(s[lch],s[rch]);
 }
 //建树
 void build(int now,int l,int r){
     if(l==r){
         s[now]=a[l];
         return;
     }//找到单点，填入数值
     build(lch,l,mid);//递归建立左子树
     build(rch,mid+1,r);//递归建立右子树
     pushup(now);//建完之后一定要更新
 }
 //查询 单点修改
 void query(int now,int l,int r,int x,int v){
     //l,r是现在的区间，x,v是要查询的区间
     if(l==r){
         s[now]=v;
         return;
     }
     if(x<=mid){
         //查询区间最左边比区间的一半处小说明左子树包含要查的东西
         query(lch,l,mid,x,v);//递归查询左子树
     }
     if(v>mid){
         //说明查询区间最右边比区间一半要大，说明右子树有要查询的东西
         query(rch,mid+1,r,x,v);
     }
     pushup(now);//一定不能忘记更新整个子树；
 }
 //区间查询
 int ask(int now,int l,int r,int x,int y){
     if(l>=x&&y<=r){
         return s[now];
     }
     int res1 = 0;
     int res2 = 0;
     if(x<=mid){
         res1=ask(lch,l,mid,x,y);
     }
     if(y>mid){
         res2=ask(rch,mid+1,r,x,y);
     }
     return max(res1,res2);
 
 }
 int main(){
     cin>>n>>m;
     init();
     build(1,1,n);
     while(m--){
         int o,x,y,v;
         cin>>o;
         if (o == 1)
         {
             scanf("%d%d", &x, &v);
             query(1, 1, n, x, v);
         }
         if (o == 2)
         {
             scanf("%d%d", &x, &y);
             printf("%d\n", ask(1, 1, n, x, y));
         }
     }
 
 }
```





线段树模板2：

```cpp
 #include<cstdio>
 #include<iostream>
 using namespace std;
 #define maxn 100005
 #define lch now*2
 #define rch now*2+1
 #define mid (l+r)/2
 #define ll long long
 int a[maxn],n,m;
 
 //区间加以及区间求和的模板
 struct node
 {
     ll w,p;
 }s[maxn*4];
 //更新，树根的值等于左右子树的和
 void pushup(int now)
 {
     s[now].w=s[lch].w+s[rch].w;
 }
 //建树
 void build(int now,int l,int r)
 {
     if(l==r)
     {
         s[now].w=a[l];
         s[now].p=0;//因为是加法操作，将懒标记设置为0；若是乘法则懒标记初始值是1
         return ;
     }
     build(lch,l,mid);//递归建立左子树
     build(rch,mid+1,r);//递归建立右子树
     pushup(now);//更新父节点
 }
 //下放
 void pushdown(int now,int l,int r)
 {
     s[lch].w+=s[now].p*(mid-l+1);//下放到左子树
     //也就是左子树的节点加上懒标记乘区间长度
     //相当于左子树的子树上每个都加上懒标记之后的效果
     s[rch].w+=s[now].p*(r-mid);//下放到右子树
     s[lch].p+=s[now].p;//左子树打懒标记
     s[rch].p+=s[now].p;//右子树打懒标记
     s[now].p=0;//下放后取消父节点的懒标记
 }
 //区间求和
 void add(int now,int l,int r,int x,int y,ll z)
 {
     if(x<=l&&y>=r)
     //所在区间(l,r)在要查询的区间（x,y）里面
     //其余操作和查询那个模板差不多
     //z就是懒标记的值，也就是要加的那个数
     {
         s[now].w+=z*(r-l+1);
         s[now].p+=z;
         return;
     }
     pushdown(now,l,r);//下放
     if(x<=mid)//查询区间的最左小于区间中间，说明左子树有需要求和的值
     add(lch,l,mid,x,y,z);
     if(y>mid)
     add(rch,mid+1,r,x,y,z);
     pushup(now);//更新
 }
 //有些部分没有必要加到底，可以先不下放
 //区间求和
 ll ask(int now,int l,int r,int x,int y)
 {
     if(x<=l&&y>=r)
     return s[now].w;
     pushdown(now,l,r);
     ll sum=0;
     if(x<=mid)
     sum+=ask(lch,l,mid,x,y);
     if(y>mid)
     sum+=ask(rch,mid+1,r,x,y);
     pushup(now);
     return sum;
 }
 int main()
 {
     int i;
     scanf("%d%d",&n,&m);
     for(i=1;i<=n;i++)
     scanf("%d",&a[i]);
     build(1,1,n);
     while(m--)
     {
         int o,x,y;
         ll z;
         scanf("%d",&o);
         if(o==1)
         {
             scanf("%d%d%lld",&x,&y,&z);
             add(1,1,n,x,y,z);
         }
         else
         {
             scanf("%d%d",&x,&y);
             printf("%lld\n",ask(1,1,n,x,y));
         }
     }
 }
```

---

# 平衡树

```cpp
#include<iostream>
using namespace std;
struct node {
	int son[2];
	int sz, c;
	int x;
	int val;
};
node t[100001];
int cnt = 0;

int new_node(int v) {
	cnt = cnt + 1;
	int p = cnt;
	t[p].son[0] = 0;
	t[p].son[1] = 0;
	t[p].val = rand();
	t[p].c = 1;
	t[p].sz = 1;
	t[p].x = v;
	return p;
}

void push_up(int p) {
	t[p].sz = t[p].c + t[t[p].son[0]].sz + t[t[p].son[1]].sz;
}

void zig(int &p) {
	int x = t[p].son[0];
	t[p].son[0] = t[x].son[1];
	t[x].son[1] = p;
	p = x;
	push_up(t[p].son[1]);
	push_up(p);
}
void zag(int &p) {
	int x = t[p].son[1];
	t[p].son[1] = t[x].son[0];
	t[x].son[0] = p;
	p = x;
	push_up(t[p].son[0]);
	push_up(p);
}

void insert(int &p, int x) {
	if(p == 0) {
		p = new_node(x);
		return;
	}
	if(t[p].x == x) {
		t[p].c ++;
		push_up(p);
		return;
	}
	if(x < t[p].x) {
		insert(t[p].son[0], x);
		if(t[p].val < t[t[p].son[0]].val) zig(p);
	}
	else {
		insert(t[p].son[1], x);
		if(t[p].val < t[t[p].son[1]].val) zag(p);
	}
	push_up(p);
}

void remove(int &p, int x) {
	if(t[p].x == x) {
		if(t[p].c > 1) {
			t[p].c --;
			push_up(p);
			return;
		}
		if(t[p].son[0] == 0 && t[p].son[1] == 0) {
			p = 0;
			return;
		}
		if(t[p].son[1] == 0 || (t[p].son[0] != 0 && t[t[p].son[0]].val > t[t[p].son[1]].val)) {
			zig(p);
			remove(t[p].son[1], x);
		}
		else {
			zag(p);
			remove(t[p].son[0], x);
		}
		push_up(p);
		return;
	}
	if(x < t[p].x) remove(t[p].son[0], x);
	else remove(t[p].son[1], x);
	push_up(p);
}

int rnk(int p, int x) {
	if(p == 0) return 1;
	if(t[p].x == x) return t[t[p].son[0]].sz + 1;
	if(x < t[p].x) return rnk(t[p].son[0], x);
	return rnk(t[p].son[1], x) + t[t[p].son[0]].sz + t[p].c;
}
int kth(int p, int k) {
	if(t[t[p].son[0]].sz >= k) return kth(t[p].son[0], k);
	if(t[t[p].son[0]].sz + t[p].c >= k) return t[p].x;
	return kth(t[p].son[1], k - (t[t[p].son[0]].sz + t[p].c));
}
int pre(int p, int x) {
	int ans;
	while(p) {
		if(x > t[p].x) {
			ans = t[p].x;
			p = t[p].son[1];
		}
		else {
			p = t[p].son[0];
		}
	}
	return ans;
}
int nxt(int p, int x) {
	int ans;
	while(p) {
		if(x < t[p].x) {
			ans = t[p].x;
			p = t[p].son[0];
		}
		else {
			p = t[p].son[1];
		}
	}
	return ans;
}

int root = 0;
int main() {
	srand(time(NULL));
	int n;
	scanf("%d", &n);
	while(n --) {
		int op, x;
		scanf("%d%d", &op, &x);
		switch(op) {
			case 1:
				insert(root, x);
				break;
			case 2:
				remove(root, x);
				break;
			case 3:
				printf("%d\n", rnk(root, x));
				break;
			case 4:
				printf("%d\n", kth(root, x));
				break;
			case 5:
				printf("%d\n", pre(root, x));
				break;
			case 6:
				printf("%d\n", nxt(root, x));
				break;
		}
	}
	return 0;
}
```

---

# 搜索与图论

## DFS 与 BFS

### 深度优先搜索 DFS

深度搜索和宽度搜索都可以对整个空间进行搜索

深度优先：尽可能往深搜，搜到叶子节点就会回溯，边回溯边看是否还可以在这个节点继续向下深搜，直到这个点无法再继续向下深搜时才继续向上回溯。

![image.png](/notes/algorithm-foundations/asset-079.png)



每一个dfs都一定对应一颗搜索树



例题：全排列数字

给定一个整数 n，将数字 1∼n 排成一排，将会有很多种排列方法。

现在，请你按照字典序将所有的排列方法输出。

输入样例：

```cpp
3
```

输出样例：

```cpp
1 2 3
1 3 2
2 1 3
2 3 1
3 1 2
3 2 1
```

样例模拟：

![image.png](/notes/algorithm-foundations/asset-080.png)

注：回溯的时候要注意恢复现场，来的时候什么样，回去的时候就是什么样

```cpp
#include<iostream>

using namespace std;

const int N = 10;

int n;
int path[N];
bool st[N];//每次需要填不一样的数，st记录该点是否使用过，true表示用过
void dfs(int u){
  //u = 0的时候第一层，当u走到n的时候就走到了最后一层
    if(u == n)
    {   //走到第n个位置时，输出
        for(int i = 0;i < n;i ++) printf("%d ",path[i]);
        puts("");
        return;
    }
    for(int i = 1;i <= n;i++){
        //找到一个没有被用过的数
        if(!st[i])
        {
            //枚举，并填到当前空位，记录被用过
            //状态处理好后走到下一层
            path[u] = i;
            st[i] = true;
            dfs(u + 1);
            //回溯，注意恢复现场,path[u]会自动覆盖
            st[i] = false;
        }
    }
}

int main(){
    cin >> n;
    
     dfs(0);
    
    return 0;
}
```



例题：n皇后问题

n−皇后问题是指将 n 个皇后放在 n×n 的国际象棋棋盘上，使得皇后不能相互攻击到，即任意两个皇后都不能处于同一行、同一列或同一斜线上。

![image.png](/notes/algorithm-foundations/asset-081.png)

现在给定整数 n，请你输出所有的满足条件的棋子摆法。

输入格式

共一行，包含整数 n。

输出格式

每个解决方案占 n 行，每行输出一个长度为 n 的字符串，用来表示完整的棋盘状态。

其中 `.` 表示某一个位置的方格状态为空，`Q` 表示某一个位置的方格上摆着皇后。

每个方案输出完成后，输出一个空行。

**注意：行末不能有多余空格。**

输出方案的顺序任意，只要不重复且没有遗漏即可。



可以按照全排列的思路来枚举，再判断是否合法

也可以边做边判断：如果产生冲突，则直接停止，放弃这条路，向上回溯（剪枝）

绿色为正对角线dg，蓝色为反对角线udg

![image.png](/notes/algorithm-foundations/asset-082.png)

解法一：已经知道每一行只会有一个皇后，则只需要枚举每一行，确定出来这一行的皇后应该放在哪个位置上。

```cpp
#include<iostream>

using namespace std;

const int N = 20;

int n;
char g[N][N];//记录结果
bool col[N],dg[N],udg[N];//记录列，正对角线，反对角线上是否存在元素

//u表示运行到第几行，i表示现在是第几列
//将棋盘看成坐标轴，则u就表示y，i表示x
//设udg的方程为y=x+b则b=y-x，替换后b=u-i，防止出现负数，则加上n，则有b=u+n-i（其实b=n+i-u也可，目的是一个对角线能单独映射）
//设dg的方程为y=-x+b,b=y+x,替换后b=u+i
//正对角线横纵数组下标和为常数，反对角线数组下标差为常数，该常数即为对角线与坐标轴的截距
//在同一条对角线上的计算出的截距是相等的，故使用截距表示对角线
void dfs(int u)
{
    if(u == n)//走到叶子节点，则输出答案
    {
        for(int i = 0;i < n;i++) puts(g[i]);
        puts("");
        return;
    }
    for(int i = 0;i < n;i ++)
    {
        //i循环保证每一行只有一个元素
        //判断当前列，正对角线，反对角线是否都不存在元素
        if(!col[i] && !dg[u+i] && !udg[n-u+i])
        {
            g[u][i] = 'Q';
            col[i] = dg[u+i] = udg[n-u+i] = true;
            dfs(u+1);
            col[i] = dg[u+i] = udg[n-u+i] = false;//恢复现场
            g[u][i] = '.';
        }
    }
}
int main(){
    cin >> n;
    for(int i = 0;i < n;i++)
        for(int j = 0;j < n;j++)
            g[i][j] = '.';
    
    dfs(0);
    return 0;
}
```



解法2：比解法1更加原始，枚举每一个格子，放与不放分别是两个分支

每次向后一个格子，当走到每一行的最后一个的时候，直接让它越界，回到下一行第一个格子

![image.png](/notes/algorithm-foundations/asset-083.png)

不同的dfs题目搜索的方式可能并不完全相同，但需要在做题的时候想明白一种具体并且准确的搜索方法

```cpp
#include<iostream>
using namespace std;

const int N = 20;//开二倍防止越界

int n;
bool row[N],col[N],dg[N],udg[N];

char g[N][N];

void dfs(int x,int y,int s)//x,y表示搜索的起点坐标，s表示放置皇后的个数
{
    if(y == n) y = 0,x++;//搜索到一行最后一列时，直接换到下一行第一个
    
    if(x == n)//搜索到最后一行
    {
        if(s == n)//一共放置了n个皇后,这种情况是合法的情况
        {
            for(int i= 0; i < n;i++) puts(g[i]);//puts用于输出字符串，括号里面放首字符
            puts("");
        }
        return;
    }
    //不放皇后
    dfs(x,y+1,s);
    //放皇后
    if(!row[x] && !col[y] && !dg[x+y] && !udg[x-y+n])//行列和两个对角上面都没有皇后
    {
        g[x][y] = 'Q';//放皇后
        row[x] = col[y] = dg[x+y] = udg[x-y+n] = true;//打标记
        dfs(x,y+1,s+1);//继续搜
        //恢复现场
        row[x] = col[y] = dg[x+y] = udg[x-y+n] = false;
        g[x][y] = '.';
    }
    
}

int main(){
    cin >> n;
    //初始化
    for(int i = 0;i < n;i++)
        for(int j = 0;j < n;j++)
            g[i][j] = '.';
    dfs(0,0,0);
    return 0;
}
```



### 宽度优先搜索 BFS

宽度优先：一层层地搜索，每一层全部搜完以后才会继续向下搜索。

![image.png](/notes/algorithm-foundations/asset-084.png)



BFS 与DFS对比：

![image.png](/notes/algorithm-foundations/asset-085.png)



BFS好处：一层层向外搜索，第一次搜到的点一定是最近的点，具有“最短路”性质，DFS搜索就不具有最短路的性质（图里面边的权重是相同的）

例题：走迷宫

![image.png](/notes/algorithm-foundations/asset-086.png)

输入样例：

```cpp
5 5
0 1 0 0 0
0 1 0 1 0
0 0 0 0 0
0 1 1 1 0
0 0 0 1 0
```

输出样例：

```cpp
8
```

对比起深度搜索，宽度搜索有相对固定的模板：

设立一个初始队列，当队列不空的时候拿出队头，再扩展队列

![image.png](/notes/algorithm-foundations/asset-087.png)

边权都是1的时候采用宽搜求最短路

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>

using namespace std;

typedef pair<int,int> PII;

const int N = 110;

int n,m;
int g[N][N];//存储迷宫地图
int d[N][N];//存储每一个点到起点的距离
PII q[N*N];//模拟队列

int bfs()
{
    int hh = 0,tt = 0;//队头队尾
    q[0] = {0,0};//初始化第一个点
    
    memset(d,-1,sizeof d);//将记录距离的数组初始值设为-1
    d[0][0] = 0;//初始化第一个点的距离
    
    /*
        在搜索地图的过程中，当需要从一个点继续走到下一个点的时候
        需要观察上下左右是否是可以走的，此时用向量来表示向上下左右走
        向左就是（-1，0）向上就是（0，1）向右就是（1，0），向下就是（0，-1）
    */
    int dx[4] = {-1,0,1,0},dy[4] = {0,1,0,-1};
    
    while(hh <= tt)
    {
        auto t = q[hh++];//每次取出队头元素
        
        for(int i = 0;i < 4;i++)//模拟向上下左右走
        {
            int x = t.first + dx[i],y = t.second + dy[i];
            //扩展队列
            //条件是x，y坐标都在地图范围内，当前点是可以走的，当前点没有被搜索到
            if(x >= 0 && x < n && y >= 0 && y < m && g[x][y] == 0 && d[x][y] == -1)
            {
                d[x][y] = d[t.first][t.second] + 1;//更新距离
                q[++tt] = {x,y};//放到队尾
            }
        }
    }
    //返回右下角终点到起点的距离
    return d[n-1][m-1];
}

int main()
{
    cin >> n >> m;
    
    //读入整张图
    for(int i = 0;i < n;i ++)
        for(int j = 0;j < m;j ++)
            scanf("%d",&g[i][j]);
    cout << bfs() <<endl;
    return  0;
}
```



例题：八数码问题



解题思路：

![image.png](/notes/algorithm-foundations/asset-088.png)

```cpp
#include<iostream>
#include<cstring>
#include<algorithm>
#include<queue>
#include<unordered_map>

using namespace std;

int bfs(string start)
{
    string end = "12345678x";

    queue<string> q;
    unordered_map<string,int> d;//距离数组
    q.push(start);
    d[start] = 0;

    int dx[4] = {-1,0,1,0},dy[4] = {0,1,0,-1};

    while(q.size())
    {
        auto t = q.front();
        q.pop();

        int distance = d[t];//记录当前距离（步数）
        if(t == end) return distance;

        //状态转移
        int k = t.find('x');//找到x的下标
        int x = k/3,y = k%3;//一维数组下标转化成二维下标

        for(int i = 0;i <4;i ++)
        {
            int a = x+dx[i],b = y+dy[i];//x，y方向偏移量
            if(a >= 0 && a < 3 && b >= 0 && b < 3)//a,b都没有出界
            {
                //将（a，b）与（x，y）位置上的数互换
                swap(t[k],t[a*3+b]);//交换，需要把二维坐标转成一维的

                if(!d.count(t))//找到一个新的状态
                {
                    d[t] = distance+1;
                    q.push(t);
                }
                swap(t[k],t[a*3+b]);//状态恢复
            }
        }
    }
    return -1;//没找到就返回-1
}

int main()
{
    string start;
    for(int i = 0;i < 9;i++)
    {
        char c;
        cin >> c;
        start += c;
    }

    cout<<bfs(start)<<endl;
    return 0;
}
```

---



## 树与图的存储



树是一种无环连通图，树的存储本质就是图的存储

图分为有向图和无向图，看边是否有方向。无向图可以看成一种特殊的有向图

有向图的存储：

邻接矩阵：g[a] [b]存储从a→b的信息，不能存储重边，适合存储稠密图，较浪费空间

邻接表：本质是单链表，每个点上都有一个单链表，存这个点可以走到哪个点，存储次序并不重要

![image.png](/notes/algorithm-foundations/asset-089.png)

```cpp
#include<cstring>
#include<iostream>
#include<algorithm>

using namespace std;

const int N = 100010,M = N*2;

int h[N],e[M],ne[M],idx;//h存链表头，e存值，ne存next指针

void add(int a,int b)
{
    //头插
    e[idx] = b,ne[idx] = h[a],h[a] = idx ++;
}

int main()
{
    memset(h,-1,sizeof h);//初始化表头指针为-1
}
```



---



## 树与图的深度优先遍历

图示：

![image.png](/notes/algorithm-foundations/asset-090.png)



```cpp
#include<cstring>
#include<iostream>
#include<algorithm>

using namespace std;

const int N = 100010,M = N*2;

int h[N],e[M],ne[M],idx;//h存链表头，e存值，ne存next指针
bool st[N];//标记当前点是否被遍历过，每个点只遍历一次

void add(int a,int b)
{
    //头插
    e[idx] = b,ne[idx] = h[a],h[a] = idx ++;
}

void dfs(int u)
{
    st[u] = true;//标记，代表已被搜索过
    for(int i = h[u];i != -1; i = ne[i])//遍历u的所有出边
    {
        int j = e[i];//存一下当前链表中节点对应图中的编号
        if(!st[j]) dfs(j);//若当前点没被遍历过，继续深搜
    }
}

int main()
{
    memset(h,-1,sizeof h);//初始化表头指针为-1
    
    dfs(1);
}
```



例题：树的重心

![image.png](/notes/algorithm-foundations/asset-091.png)

输入样例

```cpp
9
1 2
1 7
1 4
2 8
2 5
4 3
3 9
4 6
```

输出样例：

```cpp
4
```

图示如下：

![image.png](/notes/algorithm-foundations/asset-092.png)

将节点1删除后，剩余三个连通块

![image.png](/notes/algorithm-foundations/asset-093.png)

其中，左侧连通块三个节点，中间的一个连通块有4个节点，右侧只有一个节点，所以点数的最大值为4 

将节点2删除后，剩余三个连通块

![image.png](/notes/algorithm-foundations/asset-094.png)

其中，最右侧的连通块点数最多为6

……

依此类推，找到题目要求的最小值

使用深度优先遍历，在遍历的过程中可以求出每一个子树中点的个数

```cpp
#include<cstring>
#include<iostream>
#include<algorithm>

using namespace std;

const int N = 100010,M = N*2;

int h[N],e[M],ne[M],idx;//h存链表头，e存值，ne存next指针
bool st[N];//标记当前点是否被遍历过，每个点只遍历一次

int ans = N;
int n;

void add(int a,int b)
{
    //头插
    e[idx] = b,ne[idx] = h[a],h[a] = idx ++;
}

//返回以u为根的树中点的数量
int dfs(int u)
{
    st[u] = true;//标记，代表已被搜索过
    
    int sum = 1,res = 0;
    //sum为以u为根节点的树的点数和，当前点u算一个点数
    //res表示删掉该点后，每一个连通块大小的最大值
    
    for(int i = h[u];i != -1; i = ne[i])//遍历u的所有出边
    {
        int j = e[i];//存一下当前链表中节点对应图中的编号
        if(!st[j])//若当前点没被遍历过，继续深搜
        {
            int s = dfs(j);//当前子树的大小
            res = max(res,s);
            sum += s;//当前子树的大小也是以u为节点的树的一部分
        }
    }
    
    //除去以u为根节点的树之外的部分也是连通的，大小为n-sum
    res = max(res,n-sum);//删掉该点后最大的连通块的点数
    ans = min(ans,res);
    return sum;
}

int main()
{
    cin >> n ;
    
    memset(h,-1,sizeof h);//初始化表头指针为-1
    
    for(int i = 0;i < n-1;i ++)
    {
        int a,b;
        cin >> a >> b;
        //无向图，相当于有向图双向都可以连通
        add(a,b),add(b,a);
    }
    
    dfs(1);
    
    cout << ans << endl;
    
    return 0;
}
```



---



## 树与图的广度优先遍历

图示：

![image.png](/notes/algorithm-foundations/asset-095.png)

每一次扩展一层，第一次发现一个点，就是到这个点的最短路径

广度搜索的模板框架：每次取出队头t，扩展队头的所有临点，如果该临点未被遍历过，则将该临点加入队列，并更新距离

![image.png](/notes/algorithm-foundations/asset-096.png)



例题：图中点的层次

![image.png](/notes/algorithm-foundations/asset-097.png)

完全是一道裸题

宽搜框架基本同之前的框架

```cpp
#include<iostream>
#include<cstring>
#include<algorithm>

using namespace std;

const int N = 100010;

int n,m;
int h[N],e[N],ne[N],idx;
int d[N],q[N];

void add(int a,int b)
{
    e[idx] = b,ne[idx] = h[a],h[a] = idx ++;
}

int bfs()
{
    int hh = 0,tt = 0;
    q[0] = 1;//初始化队头为1
    memset(d,-1,sizeof d);//初始化
    d[1] = 0;//初始化1为起点
    while(hh <= tt)
    {
        int t = q[hh++];
        
        for(int i = h[t];i != -1;i = ne[i])
        {
            int j = e[i];//当前链表中节点对应图中的编号
            if(d[j] == -1)//没被遍历过
            {
                d[j] = d[t] + 1;
                q[++tt] = j;
            }
        }
    }
    return d[n];
    
}

int main()
{
    cin >> n >> m;
    memset(h,-1,sizeof h);
    for(int i = 0;i < m;i ++)
    {
        int a,b;
        cin >> a >> b;
        add(a,b);
    }
    cout << bfs() << endl;
    
    return 0;
}
```



---



## 拓扑排序

图的拓扑序列是图的宽度搜索应用，并且一定针对有向图，无向图没有拓扑序列。

例题：

![image.png](/notes/algorithm-foundations/asset-098.png)

并不是所有图都有拓扑序，如环。但有向无环图一定有拓扑序列，它也被称为拓扑图

拓扑序列简单来说就是按照图中各点的编号，所有的边都是从前指向后的

思路：

将所有入度为0的点加入队列，当一个点入度为0代表不再有点指向当前这个点。每次弹出队头元素并遍历该元素的所有出边。出边指向的元素一定比当前元素更加靠后，删掉该边后将被指向元素的入度减一（d表示入度），若被指元素的入度变为0，则将其加入队列中

![image.png](/notes/algorithm-foundations/asset-099.png)

如果存在环，则环上所有点不可能全部入队。反之，如果图是一个有向无环图，则一定至少存在一个入度为0的点，所有点一定能全部入队



```cpp
#include<iostream>
#include<cstring>
#include<algorithm>

using namespace std;

const int N = 100010;

int n,m;
int h[N],e[N],ne[N],idx;
int q[N],d[N];

void add(int a,int b)
{
    e[idx] = b,ne[idx] = h[a],h[a] = idx ++;
}

bool topsort()
{
    int hh = 0,tt = -1;
    
    for(int i = 1;i <= n;i++)//注意是从1开始
    {
        if(!d[i])
            q[++tt] = i;//遍历图，如果入度为0，则加入队列
    }
    
    while(hh <= tt)
    {
        int t = q[hh++];//取队头
        for(int i = h[t];i != -1;i = ne[i])
        {
            int j = e[i];
            d[j]--;
            if(d[j] == 0) q[++tt] = j;
        }
    }
    
    return tt == n - 1;//最后看是否所有元素都加入过队列，若都加入过则表明有拓扑排序
    
}

int main(){
    cin >> n >> m;
    
    memset(h,-1,sizeof h);
    
    for(int i = 0;i < m;i ++ )
    {
        int a,b;
        cin >> a >> b;
        add(a,b);
        d[b] ++;//插入一条由a指向b的边，则b的入度加一
    }
    if(topsort())//存在拓扑序,q中次序恰好为拓扑序
    {
        for(int i = 0;i < n;i ++) printf("%d ",q[i]);
        puts("");
    }
    else puts("-1");//不存在拓扑序
   
    return 0;
}
```



---



## 最短路



![image.png](/notes/algorithm-foundations/asset-100.png)

分为单源最短路和多源汇最短路

单源最短路：求从一个点到其他所有点的最短路(只有一个起点)

- 所有边权都为正值：

    朴素迪杰斯特拉算法O（n^2）适用于稠密图

    堆优化迪杰斯特拉算法O（mlogn）稀疏图

- 存在负权边

    Bellman-Ford算法 O（nm）

    SPFA 一般情况下O（m），最坏O（nm）

多源汇最短路：源点即为起点，汇点即为重点，起点终点都不确定，求最短路（可能有多个起点）

- Floyd算法 O(n^3)

注：n表示点的数量，m表示边的数量，在最短路中有向图和无向图都可以当作有向图来处理（无向图是一种特殊的有向图）

重点：建图，如何将原问题抽象成一个最短路问题，如何定义点和边



### 朴素dijkstra

框架：

![image.png](/notes/algorithm-foundations/asset-101.png)

先初始化距离，一开始只有1号点的距离是确定的，置为0，其余点距离置为正无穷。迭代，每次确定一个点到起点的最短路，当前还未确定的点当中距离最小的一个点，一定是最短路。确定这个点后，更新其余点的最短路距离。



举例：

step1：初始化

![image.png](/notes/algorithm-foundations/asset-102.png)

step2：找到最小值0，确定这个点的最短路（标为绿色）。更新其他点到起点的距离。也就是根据1更新2和3到1（起点）的距离

第一次迭代：

最小值：

![image.png](/notes/algorithm-foundations/asset-103.png)

更新：

![image.png](/notes/algorithm-foundations/asset-104.png)

第二次迭代：

再找最小值：

![image.png](/notes/algorithm-foundations/asset-105.png)

根据2更新：

![image.png](/notes/algorithm-foundations/asset-106.png)

第三次迭代：只剩3一个点，故最短路就是3

![image.png](/notes/algorithm-foundations/asset-107.png)

朴素迪杰斯特拉适用于稠密图，稠密图应该用邻接矩阵存储

如果是稀疏图则采用邻接表存储

```cpp
#include<iostream>
#include<cstring>
#include<algorithm>

using namespace std;

const int N = 510;

int n,m;
int g[N][N];
int dist[N];//当前最短距离
bool st[N];//标记最短路是否已经确定了

/*
    本题存在重边和自环，显然自环不会出现在最短路之中
    重边记录最短的一条即可
*/

int dijkstra()
{
    //初始化
    memset(dist,0x3f,sizeof dist);
    dist[1] = 0;
    //迭代
    for(int i = 0;i < n;i ++)
    {
        int t = -1;
        for(int j = 1;j <= n;j ++)
        {
            //从没确定的点中找一个最小的
            if(!st[j] && (t == -1 || dist[t] > dist[j]))
                t = j;
        }
        
        st[t] = true;//t加入集合
        
        //更新其他点的距离1->t->j更新1->j
        for(int j = 1;j <= n;j++)
            dist[j] = min(dist[j],dist[t] + g[t][j]);
        
    }
    if(dist[n] == 0x3f3f3f3f) return -1;
    return dist[n];
}

int main()
{
    scanf("%d%d",&n,&m);
    //初始化
    memset(g,0x3f,sizeof g);
    
    while(m--)
    {
        int a,b,c;
        scanf("%d%d%d",&a,&b,&c);
        g[a][b] = min(g[a][b],c);//可能存在重边，取最小值
    }
    
    int t = dijkstra();
    
    printf("%d\n",t);
    
    return 0;
}
```



### 堆优化版dijkstra

题目背景：

给定一个 n 个点 m 条边的有向图，图中可能存在重边和自环，所有边权均为非负值。

请你求出 1 号点到 n 号点的最短距离，如果无法从 1 号点走到 n 号点，则输出 −1。

输入格式：

第一行包含整数 n 和 m。

接下来 m 行每行包含三个整数 x,y,z，表示存在一条从点 x 到点 y 的有向边，边长为 z。

输出格式：

输出一个整数，表示 1 号点到 n 号点的最短距离。

如果路径不存在，则输出 −1。



堆优化版本的Dijkstra是不需要手写堆来实现的，直接用优先队列即可。比起朴素版的Dijkstra，堆优化版的简单来说就是用堆这种结构对朴素版的进行优化。



适用于稀疏图的情况，对应地，图的存储也应该变为临接表的形式



模板代码：

```cpp
#include <cstring>
#include <iostream>
#include <algorithm>
#include <queue>

using namespace std;

typedef pair<int, int> PII;//用堆维护所有点的距离，需要知道节点的编号

const int N = 1e6 + 10;

int n, m;
int h[N], w[N], e[N], ne[N], idx;//临接表，w表示权重
int dist[N];
bool st[N];

//存图中的边
void add(int a,int b,int c)
{
    e[idx] = b,w[idx] = c,ne[idx] = h[a],h[a] = idx++;
}

int dijkstra()
{
    memset(dist,0x3f,sizeof dist);
    dist[1] = 0;
    priority_queue<PII,vector<PII>,greater<PII>> heap;//小根堆
    heap.push({0 , 1});//初始化1号点，更新其余所有点，距离为0，编号为1
    //迭代，堆不空
    while(heap.size())
    {
        auto t = heap.top();//每次找到距离最近的点
        heap.pop();
        
        int ver = t.second,distance = t.first;//ver表示点的编号，distance表示距离
        
        if(st[ver]) continue;//st[ver]为真表示该点之前已经出现过了，表示当前为冗余备份
        st[ver] = true;
        
        //更新其余所有点
        //遍历从t出去的所有边
        for(int i = h[ver];i != -1;i = ne[i])
        {
            int j = e[i];//编号
            if(dist[j] > dist[ver] + w[i])
            {
                //当前距离大于从t过来的距离，需要更新
                dist[j] = dist[ver] + w[i];
                heap.push({dist[j],j});//j放入优先队列中
            }
        }
    }
    if(dist[n] == 0x3f3f3f3f) return -1;
    return dist[n];
}

int main()
{
    scanf("%d%d", &n, &m);

    memset(h, -1, sizeof h);
    while (m -- )
    {
        int a, b, c;
        scanf("%d%d%d", &a, &b, &c);
        add(a, b, c);
    }

    printf("%d\n", dijkstra());

    return 0;
}
```



### Bellman-Ford算法

用途：处理有负权边的图

基本思路：迭代n次，每一次循环所有边a,b,w(从a→b，权重为w)。在遍历的过程中更新，如果1→a→b更短，用1→a→b更新1→b

![image.png](/notes/algorithm-foundations/asset-108.png)

循环后，所有边都满足：dist[b] ≤ dist[a] + w;(三角不等式)，更新的过程称为松弛操作。

注意：如果有负权回路，最短路不一定存在，如下图，每走一次回路距离都会-1

![image.png](/notes/algorithm-foundations/asset-109.png)

迭代次数的意义：迭代k次后的dist数组表示从1号点，经过不超过k条边，走到每一个点的最短距离；迭代n次时仍有修改，则表示存在一条最短路径，这条路径上有n条边，说明存在负环；因为有n条边意味着需要n+1个点，但图中点的个数为n，说明此时一定存在负权环



每次新的迭代前，需要对dist数组备份，避免出现串联的情况，若k = 1，表示只能迭代一次，故从1号点到3号点只能走下面长度为3的边而不能先到2再转到3

![image.png](/notes/algorithm-foundations/asset-110.png)

串联：由于这个算法的特性决定，每次更新得到的必然是在多考虑 1 条边之后能得到的全局的最短路。而串联指的是一次更新之后考虑了不止一条边：由于使用了松弛，某节点的当前最短路依赖于其所有入度的节点的最短路；假如在代码中使用dist[e.b]=min(dist[e.b],dist[e.a] + e.c);，我们无法保证dist[e.a]是否也在本次循环中被更新，如果被更新了，并且dist[e.b] > dist[e.a] + e.c，那么会造成当前节点在事实上“既考虑了一条从某个节点指向a的边，也考虑了a->b”，共两条边。而使用dist[e.b]=min(dist[e.b],backup[e.a] + e.c);，可以保证a在dist更新后不影响对b的判定，因为后者使用backup数组，保存着上一次循环中的dist的值。





例题：

给定一个 n 个点 m 条边的有向图，图中可能存在重边和自环， **边权可能为负数**。

请你求出从 1 号点到 n 号点的最多经过 k 条边的最短距离，如果无法从 1 号点走到 n 号点，输出 `impossible`

注意：图中可能 **存在负权回路** 。

输入格式：

第一行包含三个整数 n,m,k。

接下来 m 行，每行包含三个整数 x,y,z，表示存在一条从点 x 到点 y 的有向边，边长为 z。

点的编号为 1∼n。

输出格式：

输出一个整数，表示从 1 号点到 n 号点的最多经过 k 条边的最短距离。

如果不存在满足条件的路径，则输出 `impossible`。

模板：

```cpp
#include<iostream>
#include<cstring>
#include<algorithm>

using namespace std;

const int N = 510,M = 10010;

int n,m,k;
int dist[N],backup[N];//dist存距离，backup存上一次迭代的结果

//结构体存所有边
struct Edge
{
    int a,b,w;//从a到b权重为w的边
}edges[M];

void bellman_ford()
{
    //初始化
    memset(dist, 0x3f, sizeof dist);
    dist[1] = 0;
    
    //边数不能超过k，故迭代次数为k
    for(int i = 0;i < k; i++)
    {
        memcpy(backup,dist,sizeof dist);
        for(int j = 0; j < m;j ++)
        {
            int a = edges[j].a , b = edges[j].b , w = edges[j].w;
            dist[b] = min(dist[b],backup[a] + w);
        }
    }
}


int main()
{
    scanf("%d%d%d",&n,&m,&k);
    
    //存所有边
    for(int i = 0;i < m;i ++)
    {
        int a,b,w;
        scanf("%d%d%d",&a,&b,&w);
        edges[i] = {a,b,w};
    }
    
    bellman_ford();
    
    if (dist[n] > 0x3f3f3f3f / 2) puts("impossible");
  //负权边可能导致距离略小于0x3f3f3f3f 
    
    else printf("%d\n", dist[n]);
    
    return 0;
}
```



### spfa算法

观察式子：dist[b] = min(dist[b],backup[a] + w)  仅当原来的dist[a]变小之后dist[b]才会变小，spfa使用宽搜对bellman_ford算法优化

![image.png](/notes/algorithm-foundations/asset-111.png)

初始化将第一个点加入队列，所有在队列中的点意味着该点的dist与原来比变小了。当队列不空的时候，取出队头t，由于t点的dist变小了，则更新t点的所有出边的dist，将出边对应的点加入队列（如果该点之前已经被加入过队列则没有必要重复加入）

简单来说就是更新过谁，就用谁更新别人

模板代码：

```cpp
#include<iostream>
#include<cstring>
#include<queue>
#include<algorithm>

using namespace std;

const int N = 100010;

int n,m;
int h[N],w[N],e[N],ne[N],idx;
int dist[N];
bool st[N];

void add(int a,int b,int c)
{
    e[idx] = b,w[idx] = c,ne[idx] = h[a],h[a] = idx++;
    
}

int spfa()
{
    //初始化
    memset(dist,0x3f,sizeof dist);
    dist[1] = 0;
    
    queue<int> q;
    q.push(1);
    st[1] = true;//标记该点被放入队列
    
    while(q.size())
    {
        int t = q.front();
        q.pop();
        
        st[t] = false;
        
        //更新队头元素所有出边
        for(int i = h[t];i != -1;i = ne[i])
        {
            int j = e[i];
            if(dist[j] > dist[t] + w[i])
            {
                dist[j] = dist[t] + w[i];
                if(!st[j])//该点之前并不在队列里面，则加入队列
                {
                    q.push(j);
                    st[j] = true;
                }
            }
        }
    }
    return dist[n];
}

int main()
{
    scanf("%d%d",&n,&m);
    
    memset(h,-1,sizeof h);
    
    while(m--)
    {
        int a,b,c;
        scanf("%d%d%d",&a,&b,&c);
        add(a,b,c);
    }
    int t = spfa();
    
    if(t == 0x3f3f3f3f) puts("impossible");
    else printf("%d\n",t);
    
    return 0;
}
```



spfa算法判断负环：

![image.png](/notes/algorithm-foundations/asset-112.png)

dist数组记录最短距离，cnt数组记录最短距离情况下的边数。当起点经过t到达x比起点到达x的距离短时，更新dist的数组和cnt数组。当cnt[x] ≥ n时说明，到达x的边数比n还多，这就意味着路途中经过了负环



判断负环的模板代码是在spfa模板的基础上做出了一些更改

```cpp
#include<iostream>
#include<cstring>
#include<queue>
#include<algorithm>

using namespace std;

const int N = 100010;

int n,m;
int h[N],w[N],e[N],ne[N],idx;
int dist[N],cnt[N];
bool st[N];

void add(int a,int b,int c)
{
    e[idx] = b,w[idx] = c,ne[idx] = h[a],h[a] = idx++;
    
}

bool spfa()
{
    /*
    判断是否有负环不需要初始化，反正不是求最短边
    //初始化
    memset(dist,0x3f,sizeof dist);
    dist[1] = 0;
    */
    queue<int> q;
    for(int i = 1;i <= n; i++)
    {
        st[i] = true;
        q.push(i);
    }
    /*
    有可能有些负环存在，但是从1开始并不能达到这一个负环
    因此一开始将1加入队列的操作并不合理
    将所有点全放进去，则只要存在负环就能找到
    queue<int> q;
    q.push(1);
    st[1] = true;//标记该点被放入队列
    */
    while(q.size())
    {
        int t = q.front();
        q.pop();
        
        st[t] = false;
        
        //更新队头元素所有出边
        for(int i = h[t];i != -1;i = ne[i])
        {
            int j = e[i];
            if(dist[j] > dist[t] + w[i])
            {
                dist[j] = dist[t] + w[i];
                cnt[j] = cnt[t] + 1;//更新边数
                
                if(cnt[j] >= n) return true;//存在负环
                if(!st[j])//该点之前并不在队列里面，则加入队列
                {
                    q.push(j);
                    st[j] = true;
                }
            }
        }
    }
    return false;//如果前面没有返回true，在这返回false
}

int main()
{
    scanf("%d%d",&n,&m);
    
    memset(h,-1,sizeof h);
    
    while(m--)
    {
        int a,b,c;
        scanf("%d%d%d",&a,&b,&c);
        add(a,b,c);
    }
    int t = spfa();
    
    if(spfa()) puts("Yes");
    else puts("No");
    
    return 0;
}
```



### Floyd最短路

作用：求解多源汇最短路，可以处理负权边，但是不能有负环

![image.png](/notes/algorithm-foundations/asset-113.png)

d存储图里面每条边（邻接矩阵），三重循环  ，每次更新一遍，循环后d[i,j]表示 i 到 j 的最短距离

```cpp
#include<iostream>
#include<cstring>
#include<algorithm>

using namespace std;

const int N = 210,INF = 1e9;

int n,m,Q;
int d[N][N];

void floyd()
{
    for(int k = 1;k <= n;k ++)
        for(int i = 1;i <= n;i ++)
            for(int j = 1;j <= n;j ++)
                d[i][j] = min(d[i][j],d[i][k] + d[k][j]);
}
int main(){
    scanf("%d%d%d",&n,&m,&Q);
    
    //初始化，d[i][i] = 0,其余初始化为正无穷
    for(int i = 1;i <= n;i ++)
        for(int j = 1;j <= n;j ++)
            if(i == j) d[i][j] = 0;
            else d[i][j] = INF;
    //存图
    while(m--)
    {
        int a,b,w;
        scanf("%d%d%d",&a,&b,&w);
        d[a][b] = min(d[a][b],w);//若有重边，存一条最短的
        
    }
    floyd();
    
    //处理所有询问
    while(Q--)
    {
        int a,b;
        scanf("%d%d",&a,&b);
        if(d[a][b] > INF/2) puts("impossible");
        else printf("%d\n",d[a][b]);
    }
    return 0;
}
```



## 最小生成树

### prim算法

#### 朴素版prim算法

时间复杂度: O(n^2)

适用于稠密图

算法框架：

![image.png](/notes/algorithm-foundations/asset-114.png)

先将所有点的dist初始化为正无穷，遍历所有的点，找到集合外距离最近的点t，用t更新其他点到集合的距离，将t加入集合。由于是求到一个集合的距离，实际上出现负权边也无所谓

注意这里与dijkstra算法的不同点在于dijkstra每次找的是距离起点最近的点，而prim算法每次找的是距离集合最近的点，集合表示当前已经在连通块当中的所有点

例题：

![image.png](/notes/algorithm-foundations/asset-115.png)

朴素版prim模板：

```cpp
#include<iostream>
#include<cstring>
#include<algorithm>

using namespace std;

const int N = 510,INF = 0x3f3f3f3f;

int n,m;
int g[N][N];//邻接矩阵存图
int dist[N];//到集合的距离
bool st[N];//标志是否已经放到连通块的集合中

int prim()
{
    memset(dist,0x3f,sizeof dist);//初始化
    
    int res = 0;//连通块中各边距离和
    
    //迭代n次，每次选一个点加入连通块
    for(int i = 0; i < n;i ++)
    {
        int t = -1;//初始值，当前还没找到
        /*  
            遍历，找到离集合最近的点
            最近的点的需要不在连通块内
            如果t = -1表示刚开始还没找到
            如果当前点比t更小，则更新t
        */
        for(int j = 1;j <= n;j ++)
            if(!st[j] && (t == -1 || dist[t] > dist[j]))
                t = j;  
        
        if(i && dist[t] == INF) return INF;//不是第一个点并且不连通则返回
        
        if(i) res += dist[t];//除第一个点外都要加上当前点到集合的距离
        st[t] = true;//迭代后找到合法的t加入连通块
        
        //用t更新集合外所有点到集合的距离，如果集合外到原集合的距离大于到t的距离就更新
        //一定要先计算res再更新，以防负自环将自己到集合的距离更新的更小
        for(int j = 1; j <= n;j ++) dist[j] = min(dist[j],g[t][j]);
        
    }
    return res;
}


int main()
{
    scanf("%d%d",&n,&m);
    
    memset(g,0x3f,sizeof g);//初始化
    
    while(m--)
    {
        int a,b,c;
        scanf("%d%d%d",&a,&b,&c);
        //无向图相当于有向图两点之间是双向边
        //重边取最小
        g[a][b] = g[b][a] = min(g[a][b],c);
    }
    
    int t = prim();
    
    if(t == INF) puts("impossible");
    else printf("%d\n",t);
    
    return 0;
}
```



#### 堆优化版prim算法

时间复杂度: O(mlogn)

实际上并不太常用

### kruskal算法

时间复杂度：O(mlogm)

适用于稀疏图

算法框架：

![image.png](/notes/algorithm-foundations/asset-116.png)

a，b连通的问题由之前数据结构章节的并查集来解决

kruskal不需要存图，只需要把每条边存储下来即可

```cpp
#include<iostream>
#include<cstring>
#include<algorithm>

using namespace std;

const int N = 100010,M = 200010,INF = 0x3f3f3f3f;

int n,m;
int p[N];//并查集祖宗节点

//用结构体存每一条边
struct Edge
{
    int a,b,w;//边ab的权值为w
    
    //重载运算符，按照边权排序
    bool operator< (const Edge &W)const
    {
        return w <W.w;
    }
}edges[M];

//找祖宗节点
int find(int x)
{
    if(p[x] != x) p[x] = find(p[x]);
    return p[x];
}

int kruskal()
{
    sort(edges,edges+m);//按边权升序排序
    
    for(int i = 1; i <= n;i ++) p[i] = i;//初始化并查集
    int res = 0,cnt = 0;//res表示树的所有边权和，cnt记录边的个数
    for(int i = 0;i < m;i ++)
    {
        int a = edges[i].a,b = edges[i].b,w = edges[i].w;
        
        a = find(a),b = find(b);
        if(a != b)
        {
            //a,b所在的两个集合并不连通,则合并
            p[a] = b;
            res += w;
            cnt++;
        }
    }
    if(cnt < n-1) return INF;//边数少于n-1表示并不连通，不存在最小生成树
    return res;
}

int main()
{
    scanf("%d%d",&n,&m);
    
    for(int i = 0;i < m;i ++)
    {
        int a,b,w;
        scanf("%d%d%d",&a,&b,&w);
        edges[i] = {a,b,w};
    }
    
    int t = kruskal();
    
    if(t == INF) puts("impossible");
    else printf("%d\n",t);
    
    return 0;
}
```



## 二分图

### 染色法

用途：判别一个图是不是二分图

时间复杂度：O(m+n)

性质：一个图是二分图，当且仅当图中不含奇数环（环中边数为奇数）

可以把整个集合分为两边，每边的集合内部没有边，所有的边都是集合与集合之间的边。

染色：遍历所有点，先设第一个点属于左边，则所有与第一个点直接相邻的点都属于右边，再继续进行遍历，不断染色，策略就是当前节点直接相邻的点与当前节点不属于同一个集合。由于图中不含奇数环，故染色过程中一定不会出现矛盾，所有点一定可以完成染色。

![image.png](/notes/algorithm-foundations/asset-117.png)

例题：

![image.png](/notes/algorithm-foundations/asset-118.png)

判断依据：当该图为二分图时，染色过程中不会出现矛盾，否则出现矛盾

代码框架：借助深度优先实现染色

![image.png](/notes/algorithm-foundations/asset-119.png)

染色法判断二分图模板代码

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>

using namespace std;

const int N = 100010,M = 200010;//因为是无向图，存边要存两次

int n,m;
int h[N],e[M],ne[M],idx;
int color[N];//存颜色，1，2表示两种颜色 

//存图
void add(int a,int b)
{
    e[idx] = b,ne[idx] = h[a],h[a] = idx++;
}

//u表示当前节点，c表示颜色
bool dfs(int u,int c)
{
    color[u] = c;//u节点的颜色为c
    
    //遍历节点u所有相邻节点
    for(int i = h[u];i != -1; i = ne[i])
    {
        int j = e[i];
        if(!color[j])
        {
            //并未染色,则对其染色，染成另外一种颜色
            //3-c表示若u的颜色为1则染为2，反之染为1
            //染色不成功返回false
            if(!dfs(j,3-c)) return false;
        }
        else if(color[j] == c) return false;//u的邻点与u颜色相同，矛盾
    }
    
    return true;
}

int main()
{
    scanf("%d%d",&n,&m);
    
    memset(h,-1,sizeof h);
    //读入每条边
    while(m--)
    {
        int a,b;
        scanf("%d%d",&a,&b);
        add(a,b),add(b,a);//无向边
    }
    bool flag = true;//染色是否冲突
    for(int i = 1;i <= n;i ++)
    {
        if(!color[i])//当前点没有染色
        {
            if(!dfs(i,1))//第一个点染成1，如果染色不成功也就是dfs返回了false则记录冲突
            {
                flag = false;
                break;
            }
        }
    }
    if(flag) puts("Yes");
    else puts("No");
    
    return 0;
}
```



### 匈牙利算法

求二分图的最大匹配

时间复杂度：O(mn)，实际上远小于该值

基本思路：可以在较短时间内，求出左右匹配成功的最大数量。（不存在两条边共用一个节点称为一个成功匹配）

每次节点x要和节点y匹配时会出现两种情况：

- 还没有节点和y匹配，则x和y可以顺利匹配

- y节点已经在x节点前与z节点匹配成功，这时观察z节点是否能和除了x之外的节点匹配，如果能则可以让出x节点使x节点可以与y节点匹配。

![image.png](/notes/algorithm-foundations/asset-120.png)

例题：二分图的最大匹配

![image.png](/notes/algorithm-foundations/asset-121.png)

注意：虽然整个图是无向图，但是只用存储一个方向的边，因为搜索的过程只发生在查找左边每个节点指向了哪些右边的节点（如上上个图）



现在来形象一点理解这个题：把男生看成是左边的点，女生看成是右边的点，遍历所有男生
让该男生考虑所有心动女生，如果当前女生单身，该女生就接受该男生，或者该女生的对象找了备胎，则让对象和备胎在一起，女生和男生在一起。

结合代码：

n1 个男生；到第i个男生的时候，我们每到一个男生的时候，都会以这个男生为最优先考虑的对象；我们为他假设妹子都没被选（memset（st, false, …））；然后去看这个男生有没有可以勾搭的妹子（find(i)）函数的作用， for() 循环就是看有没有可以下手的妹子；如果没有妹子可以撩，return false； 接下来看 for 循环具体的内容： 对于第 i 个男生；肯定是可以选到妹子的（除非他本来一个备胎都没有）；他选到妹子，有两种情况：一个是妹子没有被前面的男生选（macth[ j ] == 0）; 还有一个就是 妹子被前面男生选过了；那么，我们得在假设 j 号 女生给了 i 号男生的条件下；去看看有冲突的那个男生能不能找到新的妹子； 这个冲突男找新妹子就是循环了。 总结： find( i ) 的功能就是看看 i 号男 能不能找到妹子； 找到的话 match[j] = i 返回true； 找不到， 返回false；



```cpp
#include<iostream>
#include<cstring>
#include<algorithm>

using namespace std;

const int N = 510,M = 100010;

int n1,n2,m;
int h[N],e[M],ne[M],idx;//邻接表
int match[N];//用于记录匹配的结果
bool st[N];//query男生是否询问过女生，保证每个女生只询问一遍

void add(int a,int b)
{
    e[idx] = b,ne[idx] = h[a],h[a] = idx++;
}

bool find(int x)
{
    //遍历男生所有的【备胎】
    for(int i = h[x];i != -1; i = ne[i])
    {
        int j = e[i];//备胎的编号
        if(!st[j])//还没询问过当前备胎
        {
            st[j] = true;//表示当前备胎已经被询问过了，不会再询问一次了
            if(match[j] == 0 || find(match[j]))
            {
                //当前备胎还没有对象，或当前备胎的对象可以找他的另一个备胎
                //递归产生的find栈不会再去询问match[j]自己的对象j
                match[j] = x;//匹配双方
                return true;//匹配成功
            }
        }
    }
    return false;
}

int main()
{
    scanf("%d%d%d",&n1,&n2,&m);
    
    memset(h,-1,sizeof h);
    
    while(m--)
    {
        int a,b;
        scanf("%d%d",&a,&b);
        add(a,b);
    }
    int res = 0;//当前匹配的数量
    for(int i = 1;i <= n1;i ++)
    {
        // 每个男生最初都没有询问过女生,且保证每个女生只被询问一次
        memset(st,false,sizeof st);
        
        if(find(i)) res ++;
    }
    
    printf("%d\n",res);
    
    return 0;
}
```

---

# 动态规划

## 背包问题

背包问题及其特点：

0-1背包：每种物品只能用一次

完全背包：每种物品有无数个

多重背包：每个物品的个数不一样

分组背包：物品有n组，每组物品有若干种，一组里面最多选一种

### 0-1背包问题

![image.png](/notes/algorithm-foundations/asset-122.png)

N个物品，容量是V的背包，每个物品有体积Vi，价值Wi。每一个物品只能用一次。求背包能装下的价值之和最大是多少。

二维：

```cpp
 #include<iostream>
 #include<algorithm>
 using namespace std;
  
 const int N = 1010;
 int n,m;//物品的数量，背包容量
 int v[N],w[N];//物品的体积和价值
 int f[N][N];//物品状态
 int main(){
   cin>>n>>m;
   for(int i=1;i<=n;i++) cin>>v[i]>>w[i];//读入物品状态
  // f[0][0~m]=0 一件物品也没有
  //因为初始化的数组都是0，所以这种情况可以直接不用写，for循环从1开始写
   for(int i=1;i<=n;i++){
     for(int j=0;j<=m;j++){
       f[i][j] = f[i-1][j];//不含i的情况
       if(j>=v[i]){
         //背包起码要装得下第i件物品才能有右边的情况
         f[i][j] = max(f[i][j],f[i-1][j-v[i]]+w[i]);
      }
    }
  }
   cout<<f[n][m]<<endl;
   return 0;
 }
```

一维：
把二维的删成一维的，但 f[i][j] = max(f[i][j],f[i-1][j-v[i]]+w[i])
这一步会出问题，直接删掉的话会变成 f[j] = max(f[j],f[j-v[i]]+w[i])
实际计算的是 f[i][j] = max(f[i][j],f[i][j-v[i]]+w[i])
所以需要更改内层for循环的顺序，使当前的f[j-v[i]]+w[i]]是未更新过的，
也就是原来的f[i-1][j-v[i]]+w[i]

```cpp
 #include<iostream>
 using namespace std;
 /*
 把二维的删成一维的，但 f[i][j] = max(f[i][j],f[i-1][j-v[i]]+w[i])
 这一步会出问题，直接删掉的话会变成 f[j] = max(f[j],f[j-v[i]]+w[i])
 实际计算的是 f[i][j] = max(f[i][j],f[i][j-v[i]]+w[i])
 所以需要更改内层for循环的顺序，使当前的f[j-v[i]]+w[i]]是未更新过的，也就是原来的f[i-1][j-v[i]]+w[i]
 */
 const int N = 1010;
 int n,m;//物品的数量，背包容量
 int v[N],w[N];//物品的体积和价值
 int f[N];//物品状态
 
 int main(){
   cin>>n>>m;
   for(int i=1;i<=n;i++){
     cin>>v[i]>>w[i];
  }
   for(int i=1;i<=n;i++){
     for(int j=m;j>=v[i];j--){
       //简化了原来的if条件判断
       f[j] = max(f[j],f[j-v[i]]+w[i]);
    }
  }
   cout<<f[m]<<endl;
   return 0;
 }
```

### 完全背包问题

有N件物品和一个最多能背重量为W的背包。第i件物品的重量是weight[i]，得到的价值是value[i]，**每件物品都有无限个（也就是可以放入背包多次）**，求解将哪些物品装入背包里物品价值总和最大。

**完全背包和01背包问题唯一不同的地方就是，每种物品有无限件**。

//按每个物品选k个划分集合

![image.png](/notes/algorithm-foundations/asset-123.png)



```cpp
 f[i][j] = f[i-1,j-v[i]*k] + w[i]*k
```

朴素算法代码实现：会超时的！三重循环花了太长时间了

```cpp
 #include<iostream>
 #include<algorithm>
 using namespace std;
 const int N = 1010;
 int n,m;//物品数，背包总容量
 int v[N],w[N];//体积，价值
 int f[N][N];//状态
 
 int main(){
   cin>>n>>m;
   for(int i=1;i<=n;i++) cin>>v[i]>>w[i];
   
   for(int i=1;i<=n;i++)
     for(int j=0;j<=m;j++)
       for(int k=0;k*v[i]<=j;k++){
         //k不能无限大，k倍的物品体积要小于背包容量
         f[i][j] = max(f[i][j],f[i-1][j-v[i]*k]+w[i]*k);//状态转移方程
      }
   cout<<f[n][m]<<endl;
   return 0;
 }
```

优化一下：

![image.png](/notes/algorithm-foundations/asset-124.png)

观察一下发现f [i] [j] 后面的情况和f [i] [j-v] 是差不多的，只差了一个w，所以只需要枚举两个状态就可以找到最大值，有点类似于0-1背包的状态转移方程

![image.png](/notes/algorithm-foundations/asset-125.png)

```cpp
 0-1:f[i][j] = max(f[i][j],f[i-1][j-v[i]]+w[i]);
 //0-1背包的状态转移是从i-1转移过来的
```

修改代码后：

```cpp
 #include<iostream>
 #include<algorithm>
 using namespace std;
 const int N = 1010;
 int n,m;//物品数，背包总容量
 int v[N],w[N];//体积，价值
 int f[N][N];//状态
 
 int main(){
   cin>>n>>m;
   for(int i=1;i<=n;i++) cin>>v[i]>>w[i];
   
   for(int i=1;i<=n;i++)
     for(int j=0;j<=m;j++){
       f[i][j] = f[i-1][j];
       if(j>=v[i]) f[i][j] = max(f[i][j],f[i][j-v[i]]+w[i]);
    }
       
   cout<<f[n][m]<<endl;
   return 0;
 }
```

变成一维：删掉i的这一维，完全背包问题的**终极写法**

```cpp
 #include<iostream>
 #include<algorithm>
 using namespace std;
 const int N = 1010;
 int n,m;//物品数，背包总容量
 int v[N],w[N];//体积，价值
 int f[N];//状态
 
 int main(){
   cin>>n>>m;
   for(int i=1;i<=n;i++) cin>>v[i]>>w[i];
   
   for(int i=1;i<=n;i++)
     for(int j=v[i];j<=m;j++){
       //f[j] = f[j];删掉一维之后是恒等式，直接删了
       //if(j>=v[i]) 直接写在for条件里面了
       f[j] = max(f[j],f[j-v[i]]+w[i]);
       /*
       不需要像0-1背包那样更改循环的顺序
       因为j-v[i]<j，所以这一步里面它已经更新过了，是f[i][j-v[i]]+w[i]
       和原来二维时候的状态转移方程是一样的
       */
    }
       
   cout<<f[m]<<endl;
   return 0;
 }
```

### 多重背包问题

有 N 种物品和一个容量是 V 的背包。

第 i 种物品最多有 Si 件，每件体积是 Vi，价值是 Wi。    

求解将哪些物品装入背包，可使物品体积总和不超过背包容量，且价值总和最大。

![image.png](/notes/algorithm-foundations/asset-126.png)



```cpp
 //状态转移方程
 f[i][j] = max(f[i][j],f[i-1][j-v[i]*k]+w[i]*k);
 k = 0,1,2,3……s[i]
```

朴素写法代码：

```cpp
 #include<iostream>
 #include<algorithm>
 using namespace std;
 
 const int N = 110;
 int n,m;
 int v[N],w[N],s[N];
 int f[N][N];
 
 int main(){
   cin>>n>>m;
   for(int i=1;i<=n;i++) cin>>v[i]>>w[i]>>s[i];
   
   for(int i=1;i<=n;i++)
     for(int j=0;j<=m;j++)
       for(int k=0;k<=s[i]&&k*v[i]<=j;k++)
         f[i][j] = max(f[i][j],f[i-1][j-v[i]*k]+w[i]*k);
   cout<<f[n][m]<<endl;
   return 0;
 }
```

二进制优化：

假设 s[ i ] = 1023 0，1，2，3，……，1023 现在把它们按照2的幂次进行分组打包，每组的数量为： 1 ，2 ，4 ，8 ，…… ，512 这里面的数可以枚举出来0～1023内的任意一种情况， 比如1，2可以枚举0～3 加上4，可以枚举4～7，也就是可以枚举0～7 加上8，可以枚举8～15，也就是可以枚举0～15 以此类推，可以得到所有的数



每一个打包起来的第i个物品，可以看成0-1背包里面的一个物品（因为只能选一次），相当于我们用10个新的物品 选or 不选，替代了原来的第i个物品的所有方案则枚举1024次-->枚举10次( logn )

![image.png](/notes/algorithm-foundations/asset-127.png)

k是从1一直加到 2^k （也就是2^(k+1) -1）不超过s的最大的k，c是一个补的数，因为如果再来一个 2^k+1 就有可能会超出s的范围而当前又无法完全凑出来s，c就是s与2的k+1次方再减一的差



代码:

```cpp
 #include<iostream>
 using namespace std;
 #include<algorithm>
 
 const int N = 25000,M = 2010;
//一共1000件物品，si最大是2000
//所以一件物品最多打包成log2000，所以问题规模开成25000>1000*log2000
 
 int n,m;
 int v[N],w[N];
 int f[N];
 
 int main(){
   cin>>n>>m;
   
   int cnt = 0;//表示所有新的物品编号,也就是打包后的
   for(int i=1;i<=n;i++){
     int a,b,s;//物品的体积、价值、个数
     cin>>a>>b>>s;
     int k=1;
     while(k<=s){
       //k<=s就可以分
       //每次把k个第i个物品打包到一起
       cnt++;
       v[cnt] = a*k;//打包后体积等于k个物品体积和
       w[cnt] = b*k;//价值为k个物品价值和
       s -= k;//物品i下一轮能打包的数量的上限更新为s-k
       k *= 2;//k每次更新为原来二倍
    }
     //如果需要补c
     //此时的s是剩下的，也就是刚才的c
     if(s>0){
       cnt ++;
       v[cnt] = a*s;
       w[cnt] = b*s;
    }
  }
   n = cnt;//将n更新成cnt，二进制优化,n表示打包后物品的个数
   //转成0-1背包问题
   for(int i=1;i<=n;i++)
     for(int j=m;j>=v[i];j--)
       f[j] = max(f[j],f[j-v[i]]+w[i]);
   cout<<f[m]<<endl;
   return 0;
 }
```

### 分组背包问题

有 N 组物品和一个容量是 V 的背包。

每组物品有若干个，同一组内的物品最多**只能选一个**。 每件物品的体积是 v[i] [j]，价值是 w[i] [j]，其中 i 是组号，j 是组内编号。

求解将哪些物品装入背包，可使物品总体积不超过背包容量，且总价值最大。

注意：完全背包问题是枚举第i个物品选几个，而分组背包问题枚举的是第i组物品选哪个

第i组的物品如果不选则相当于f[i-1] [j],如果选择第k个则相当于求解f[i-1,j-v[i,k]]+w[i,k]

![image.png](/notes/algorithm-foundations/asset-128.png)

代码：

```cpp
 #include<iostream>
 using namespace std;
 #include<algorithm>
 
 const int N = 110;
 int n,m;
 int v[N][N],w[N][N],s[N];//s存的是个数
 int f[N];
 
 int main(){
   cin>>n>>m;
   
   for(int i = 1;i <= n;i++){
     cin>>s[i];
     for(int j = 0;j < s[i]; j++)
       cin>>v[i][j]>>w[i][j];
  }
   for(int i = 1;i <= n;i++)//枚举每一组
     for(int j = m;j >= 0;j--)//从大到小枚举所有体积
       for(int k = 0;k < s[i];k++)//枚举所有选择
         if(v[i][k] <= j)//需要v[i][k] <= j才更新
           f[j] = max(f[j],f[j-v[i][k]]+w[i][k]);
   
   cout<<f[m]<<endl;
   return 0;
 }
```



## 线性DP

### 数字三角形

![image.png](/notes/algorithm-foundations/asset-129.png)

动态规划思路：

![image.png](/notes/algorithm-foundations/asset-130.png)

注：图中应为右上而不是右下

**动态规划问题时间复杂度计算：状态数量*转移计算量**

```cpp
#include<iostream>
#include<algorithm>

using namespace std;

const int N = 510,INF = 1e9;

int n;
int a[N][N];//存储三角形中的元素
int f[N][N];//存状态

int main()
{
    cin >> n;
    //读入元素
    for(int i = 1;i <= n;i ++)
        for(int j = 1;j <= i;j ++)
            scanf("%d",&a[i][j]);
    /*
    初始化，注意这里要多初始化一列，即j<=i+1
    由于三角形最右边的元素没有右上元素
    如果没有初始化判断当前元素是从左上还是右上转移时会出现问题
    此外由于会出现i-1的情况，所有存储时i从1开始初始化i从0开始
    */
    for(int i = 0;i <= n; i ++)
        for(int j = 0;j <= i+1; j ++)
            f[i][j] = -INF;
    
    f[1][1] = a[1][1];//第一个点最大值只能是它本身
    
    //状态转移方程，从顶点下一层开始（第二层）
    for(int i = 2;i <= n;i ++)
        for(int j = 1;j <= i; j ++)
            f[i][j] = max(f[i-1][j-1]+a[i][j],f[i-1][j]+a[i][j]);
     
    int res = -INF;
    //遍历最后一行找最大值
    for(int j = 1;j <= n; j ++) res = max(res,f[n][j]);
    
    cout << res <<endl;
    
   return 0; 
}
```



### 最长上升子序列

![image.png](/notes/algorithm-foundations/asset-131.png)

从前到后挑数，保证数列严格递增

动态规划思路：

![image.png](/notes/algorithm-foundations/asset-132.png)

状态计算中按照以位置i上的数为结尾的序列中，i的前一个数的位置划分。显然，位置i前的数并不一定都在序列中。

```cpp
#include<iostream>
#include<algorithm>

using namespace std;

const int N = 1010;

int n;
int a[N],f[N];

int main()
{
    scanf("%d",&n);
    for(int i = 1;i <= n; i ++) scanf("%d",&a[i]);//读入序列
    
    for(int i = 1;i <= n; i ++)
    {
        f[i] = 1;//最长序列至少是1，即仅有a[i]
        for(int j = 1;j < i; j ++)
            if(a[j] < a[i])
                f[i] = max(f[i],f[j] + 1);
      //看是否满足【上升】,在满足的序列中取一个最长的加1
    }
    
    int res = 0;
    for(int i = 1;i <= n;i ++) res = max(res,f[i]);
    
    printf("%d\n",res);
    
}
```

如果想要存下来这个序列，则可以额外设置一个g数组，记录下当前点是由哪个点转移过来的,输出序列正好是所求上升序列的逆序列

代码如下：

```cpp
#include<iostream>
#include<algorithm>

using namespace std;

const int N = 1010;

int n;
int a[N],f[N],g[N];

int main()
{
    scanf("%d",&n);
    for(int i = 1;i <= n; i ++) scanf("%d",&a[i]);//读入序列
    
    for(int i = 1;i <= n; i ++)
    {
        f[i] = 1;//最长序列至少是1，即仅有a[i]
        g[i] = 0;
        for(int j = 1;j < i; j ++)
            if(a[j] < a[i])
                if(f[i] < f[j] + 1)
                {
                    f[i] = f[j]+1;
                    g[i] = j;
                }
    }
    
    int k = 1;//最长序列中结尾的下标
    for(int i = 1;i <= n;i ++)
        if(f[k]<f[i])
            k = i;
    
    printf("%d\n",f[k]);
    
    for(int i = 0,len = f[k];i < len;i ++)
    {
        printf("%d ",a[k]);
        k = g[k];
    }
    
    return 0;
}
```

输入输出如下：

![image.png](/notes/algorithm-foundations/asset-133.png)

### 优化版最长上升子序列

示例：3121856

观察3和第一个1，如果序列中有数字可以接到3的后面，由于3>1，则这个数一定可以接到1的后面，但是能接到1的后面未必能接到3的后面，依次来看第一个3并没有继续计算的必要，直接删去并不会影响计算的结果



对子序列集合按照长度进行分类，长度为1的一类，长度为2的一类，依次类推，每一类保留一个结尾数字最小的即可。显然，存下来的序列长度越长，结尾的数字越大



对于当前第i个位置上的元素a，它一定可以接到上述序列所有比自己小的末尾上去，由于序列长度正比于序列末尾值大小，所以若想整体长度最长，a最好接到比它小且最大的序列后面

```cpp
#include<iostream>
#include<algorithm>

using namespace std;

const int N = 100010;

int n;
int a[N];//存序列中的数
int q[N];//存依长度划分的序列的结尾元素

int main()
{
    scanf("%d",&n);
    for(int i = 0; i < n;i ++) scanf("%d",&a[i]);//读入序列
    
    int len = 0;//初始长度为0
    for(int i = 0;i < n;i ++)//遍历序列每一个元素
    {
        /*
        用二分法来查找那个最大的小于a[i]的数，然后用它来覆盖他之后的那一个长度的最小值
        举例，如二分查找到的最大的小于a[i]的值是4,而5一定是大于或等于他的,
        此时又因为a[i]加到了长度为4子序列,让他的长度变成了5,
        则此时最小的长度为5的子序列结尾应该就是a[i],那么就得把5的结尾更新成a[i]
        */
        int l = 0,r = len;//r=len保证了二分不会查到当前点后面的小于a[i]的数
        while(l < r)
        {
            int mid = l + r + 1 >> 1;
            if(q[mid] < a[i]) l = mid;
            else r = mid - 1;
        }
        len = max(len,r + 1);
        q[r + 1] = a[i];//更新结尾最小值
    }
    
    printf("%d\n",len);
    
    return 0;
}
```



### 最长公共子序列

![image.png](/notes/algorithm-foundations/asset-134.png)

一个序列，既是A的字串也是B的字串，且长度最长

动态规划思路：

状态计算中按照a[i] 和 b[j]是否在序列中进行分类，00表示都不在，11表示都在

一般不写00的情况，因为它会包含在后面几种情况之中

01和10的情况是f[i-1] [j] or f[i] [j-1]两种情况集合的其中一个元素

![image.png](/notes/algorithm-foundations/asset-135.png)

代码：

```cpp
#include<iostream>
#include<algorithm>

using namespace std;

const int N = 1010;

int n,m;
char a[N],b[N];//存两个字符串
int f[N][N];//状态

int main()
{
    scanf("%d%d",&n,&m);
    scanf("%s%s",a + 1,b + 1);//由于会出现i-1的情况，下标从1开始
    
    for(int i = 1;i <= n;i ++)
        for(int j = 1; j <= m; j ++)
        {
            f[i][j] = max(f[i-1][j],f[i][j-1]);//11情况不一定存在，先算01和10情况的最大值
            if(a[i] == b[j]) f[i][j] = max(f[i][j],f[i-1][j-1] + 1);
        }   
    printf("%d",f[n][m]);
    return 0;
}
```



### 最短编辑距离

![image.png](/notes/algorithm-foundations/asset-136.png)

动态规划思路：

状态计算根据最后一步进行的操作进行分类

修改操作中，如果a[i] = b[j] 则不需要加一

![image.png](/notes/algorithm-foundations/asset-137.png)

代码：

```cpp
#include<iostream>
#include<algorithm>

using namespace std;

const int N = 1010;

int n,m;
char a[N],b[N];
int f[N][N];

int main()
{
    scanf("%d%s",&n,a + 1);
    scanf("%d%s",&m,b + 1);
    
    //初始化
    for(int j = 0;j <= m;j ++) f[0][j] = j;//A串中没有元素，B串中j个元素，想要匹配只能j次增加
    for(int i = 0;i <= n;i ++) f[i][0] = i;//A中i个元素，B中没有元素，想要匹配只能i次删除
    
    for(int i = 1;i <= n;i ++)
        for(int j = 1;j <= m;j ++)
        {
            f[i][j] = min(f[i-1][j] + 1,f[i][j-1] + 1);
            if(a[i] == b[j]) f[i][j] = min(f[i][j],f[i-1][j-1]);
            else f[i][j] = min(f[i][j],f[i-1][j-1] + 1);
        }
    printf("%d\n",f[n][m]);
    
    return 0;
}
```

### 编辑距离

![image.png](/notes/algorithm-foundations/asset-138.png)

代码：

```cpp
#include<iostream>
#include<algorithm>
#include<string.h>

using namespace std;

const int N = 15,M = 1010;

int n,m;
char a[N],b[N];
int f[N][N];
char str[M][N];

//最短编辑距离
int edit_distance(char a[],char b[])
{
    int la = strlen(a + 1),lb = strlen(b + 1);
    for(int i = 0;i <= lb;i ++) f[0][i] = i;
    for(int i = 0;i <= la;i ++) f[i][0] = i;
    
    for(int i = 1;i <= la;i ++)
        for(int j = 1;j <= lb;j ++)
        {
            f[i][j] = min(f[i-1][j] + 1,f[i][j-1] + 1);
            if(a[i] == b[j]) f[i][j] = min(f[i][j],f[i-1][j-1]);
            else f[i][j] = min(f[i][j],f[i-1][j-1] + 1);
        }
    return f[la][lb];
}

int main()
{
    scanf("%d%d",&n,&m);
    for(int i = 0;i < n;i ++) scanf("%s",str[i] + 1);//读入字符串
    
    while(m--)
    {
        int limit;
        char s[N];
        scanf("%s%d",s + 1,&limit);
        int res = 0;
        for(int i = 0;i < n;i ++)
            if(edit_distance(str[i],s) <= limit)
                res++;
        
        printf("%d\n",res);
    }
    
    return 0;
}
```

## 区间DP

区间dp问题状态表示的时候一般是某一个区间

### 石子合并

![image.png](/notes/algorithm-foundations/asset-139.png)

动态规划思路：

状态计算以最后一次分界线的位置来分类

![image.png](/notes/algorithm-foundations/asset-140.png)

从k处分割代价：

![image.png](/notes/algorithm-foundations/asset-141.png)

代码：

```cpp
#include<iostream>
#include<algorithm>

using namespace std;

const int N = 310,INF = 1e8;

int n;
int s[N];
int f[N][N];

int main()
{
    scanf("%d",&n);
    for(int i = 1;i <= n;i ++) scanf("%d",&s[i]);//读入每堆石子质量
    
    for(int i = 1; i <= n;i ++) s[i] += s[i-1];//前缀和
    
    for(int len = 2;len <= n; len ++)//从小到大枚举区间长度（len=1为边界情况，合并不需要体力）
        for(int i = 1;i + len - 1 <= n;i ++)//枚举区间的起点
        {
            int l = i,r = i + len - 1;//区间左右端点
            f[l][r] = INF;//初始化
            for(int k = l;k < r;k ++)
                f[l][r] = min(f[l][r],f[l][k]+f[k+1][r]+s[r]-s[l-1]);
        }
    
    printf("%d\n",f[1][n]);
    
    return 0;
}
```



## 计数类DP

### 整数划分

![image.png](/notes/algorithm-foundations/asset-142.png)

解法一：

转化成一个完全背包问题，背包容量是n，物品的体积分别是1到n，每种物品有无限个，问恰好装满背包的方案数



动态规划思路：

集合表示从1-i中选，体积恰好是j的选法的数量

状态计算按最后一个物品i选了多少个划分

![image.png](/notes/algorithm-foundations/asset-143.png)

优化一下：

![image.png](/notes/algorithm-foundations/asset-144.png)

观察发现f[i] [j-i]和f[i] [j]后半部分完全相同，因此可以用它替换后半部分

再将二维变成一维，体积从小到大循环

```cpp
f[i][j] = f[i-1][j] + f[i][j-1]
f[j] = f[j] + f[j-1]
```

完全背包方法代码：

f[j]表示选择物品体积和是j的所有选法

```cpp
#include<iostream>
#include<algorithm>

using namespace std;

const int N = 1010,mod = 1e9+7;

int n;
int f[N];

int main()
{
    cin >> n;
    
    f[0] = 1;//初始化，如果n = 0，则什么数都不选的时候为一种方案
    //否则对于其余数，什么数都不选不可能组成该数，初始值为0
    for(int i = 1;i <= n;i ++)
        for(int j = i;j <= n;j ++)//只有剩余体积j大于物品体积i才有算的必要
            f[j] = (f[j]+f[j-i]) % mod;
            
    cout << f[n] << endl;
    
    return 0;
}

```



解法二：与解法一中的状态表示不相同

状态计算中按照 j 个数组成总和 i 的那 j 个数中的最小值是否为1进行划分

最小值是1的时候，先不考虑这个1，相当于求 f [i-1] [j-1] 的个数，在此基础上加一就可以保证总和是i，所以两者本质上方案数是一样的

最小值大于1的时候，将里面的每一个数减去一，此时每个数仍为正整数。相当于总和变为 i-j ，仍由 j 个数组成

![image.png](/notes/algorithm-foundations/asset-145.png)

代码：

```cpp
#include<iostream>
#include<algorithm>

using namespace std;

const int N = 1010,mod = 1e9+7;

int n;
int f[N][N];

int main()
{
    cin >> n;
    
    f[0][0] = 1;//总和为0，由0个数组成，方案数为1
    
    for(int i = 1;i <= n;i ++)
        for(int j = 1;j <= i;j ++)//和为i则最多由i个数组成(i个1)
            f[i][j] = (f[i - 1][j - 1] + f[i - j][j]) % mod;
    //枚举总和为n，由1~n个数组成的方案数总和
    int ans = 0;
    for(int i = 1;i <= n; i++) ans = (ans+f[n][i]) % mod;
    
    cout << ans << endl;
    
    return 0;
}

```



## 数位统计DP

### 计数问题

![image.png](/notes/algorithm-foundations/asset-146.png)



题目需要分情况讨论，

求[a,b]中出现0~9的次数，需要实现一个count（n，x）函数，这个函数表示从1~n中出现x的个数，则题目所求转化成求count(b,x) - count(a-1,x)，思想同前缀和

举例：

![1696611318853.jpg](/notes/algorithm-foundations/asset-147.jpg)

当枚举情况处于最高位时，情况（1）不存在

对于情况（1），考虑一种边界情况，现在求解0在第四位出现的次数，如果xxx = 000，此时前四位都是0，组成一个数的前导0，实际上并不会被写出来，则xxx应该从001开始计数，此时情况如下：

![image.png](/notes/algorithm-foundations/asset-148.png)

代码：

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>
#include<vector>

using namespace std;

//求情况（1）当前位（d）前所有位构成数的值（abc的值）
int get(vector<int> num,int l,int r)
{
    int res = 0;
    for(int i = l;i >= r;i --) res = res *10 + num[i];
    return res;
}

//求10的x次方
int power10(int x)
{
    int res = 1;
    while(x--) res *= 10;
    return res;
}

//这个函数表示从1~n中出现x的个数
int count(int n,int x)
{
    if(!n) return 0;//n = 0，1~0之间没有数
  
    //存每一位
    vector<int> num;
    while(n)
    {
        num.push_back(n % 10);
        n /= 10;
    }
    
    n = num.size();//n = 位数
    
    int res = 0;//总共出现的次数
    for(int i = n - 1 - !x;i >= 0;i --)//从第一位开始枚举,x = 0时从第二位开始枚举
    {
        if(i < n - 1)//此时情况1才存在
        {
            res += get(num,n - 1,i + 1) * power10(i);
            if(!x) res -= power10(i);
        }
        if(num[i] == x) res += get(num, i - 1, 0) + 1;//情况2.2
        else if(num[i] > x) res += power10(i);//情况2.3
    }
    return res;
}

int main()
{
    int a,b;
    while(cin >> a >> b,a)
    {
        if(a > b) swap(a,b);//给数的顺序不一定是前小后大的
        
        for(int i = 0;i < 10;i ++)
            cout << count(b,i) - count(a - 1,i)<<' ';
        cout << endl;
    }
    
    return 0;
}

```

参考网站上某同学的代码；

```cpp
#include <iostream>
#include <cstring>
#include <algorithm>
#include <vector>
using namespace std;
/*

/*/

int get(vector<int> num,int l,int r)//因为我们举的分类中，有需要求出一串数字中某个区间的数字，例如abcdefg有一个分类需要求出efg+1
{
    int res=0;
    for(int i=l;i>=r;i--) res=res*10+num[i];//这里从小到大枚举是因为下面count的时候读入数据是从最低位读到最高位，那么此时在num里，最高位存的就是数字的最低位，那么假如我们要求efg，那就是从2算到0
    return res;
}

int power10(int i)//这里有power10是因为有一个分类需要求得十次方的值，例如abc*10^3
{
    int res=1;
    while(i--) res*=10;
    return res;
}

int count(int n,int x)
{
    vector<int> num;//num用来存储数中每一位的数字
    while(n)
    {
        num.push_back(n%10);//get里有解释
        n/=10;
    }
    n=num.size();//得出他的长度
    int res=0;
    for(int i=n-1-!x;i>=0;i--)//这里需要注意，我们的长度需要减一，是因为num是从0开始存储，而长度是元素的个数，因此需要减1才能读到正确的数值，而！x出现的原因是因为我们不能让前导零出现，如果此时需要我们列举的是0出现的次数，那么我们自然不能让他出现在第一位，而是从第二位开始枚举
    {
        if(i<n-1)//其实这里可以不用if判断，因为for里面实际上就已经达成了if的判断，但为了方便理解还是加上if来理解，这里i要小于n-1的原因是因为我们不能越界只有7位数就最高从七位数开始读起
        {
            res+=get(num,n-1,i+1)*power10(i);//这里就是第一个分类，000~abc-1,那么此时情况个数就会是abc*10^3，这里的3取决于后面efg的长度，假如他是efgh，那么就是4
            //这里的n-1，i-1，自己将数组列出来然后根据分类标准就可以得出为什么l是n-1，r是i-1
            if(!x) res-=power10(i);//假如此时我们要列举的是0出现的次数，因为不能出现前导零，这样是不合法也不符合我们的分类情况，例如abcdefg我们列举d，那么他就得从001~abc-1，这样就不会直接到efg，而是会到0efg，因为前面不是前导零，自然就可以列举这个时候0出现的次数，所以要减掉1个power10
        }
        //剩下的这两个就直接根据分类标准来就好了
        if(num[i]==x) res+=get(num,i-1,0)+1;
        else if(num[i]>x) res+=power10(i);
    }
     return res;//返回res，即出现次数
}

int main()
{
    int a,b;
    while(cin>>a>>b,a)//读入数据，无论a，b谁是0，都是终止输入，因为不会有数字从零开始（a，b>0）
    {
        if(a>b) swap(a,b);//因为我们需要从小到大，因此如果a大于b，那么就得交换，使得a小于b
        for(int i=0;i<=9;i++)//列举a和b之间的所有数字中 0∼9的出现次数
        cout<<count(b,i)-count(a-1,i)<<' ';//这里有点类似前缀和，要求a和b之间，那么就先求0到a i出现的次数，再求0到b i出现的次数，最后再相减就可以得出a和b之间i出现的次数
        cout<<endl;
    }
    return 0;
}

作者：yxc
链接：https://www.acwing.com/activity/content/code/content/64211/
来源：AcWing
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

## 状态压缩DP

### 蒙德里安的梦想

![image.png](/notes/algorithm-foundations/asset-149.png)

动态规划思路：

![image.png](/notes/algorithm-foundations/asset-150.png)

状态表示中j表示，前i-1列已经摆好从i-1列伸到第i列的所有状态，它是一个二进制数，伸出来则表示成1，没有伸出来则表示成0

状态计算一般依据最后一步操作来分，

1. (i-1 ~ i) 是已经固定的；

2. (i-2 ~ i-1)是可变的

所以划分集合的时候是根据(i-2)伸到(i-1)的不同状态(也就是k)划分的。（k表示的是i-2伸到i-1列的所有状态）

一共有2的n次方种情况，每种情况都是一个二进制数，如绿色方块表示的状态就是00100

k，j能合法拼在一起的条件是：

1. j和k不能在同一行重叠

2. 第i-1列空着的位置必须能被2×1的方格填满

将所有不产生冲突的累加到一块，最后求的是f[m,0]（列的计数是从0开始的），也就是从第0列开始到第m-1列依据摆好，没有从第m-1列伸到m列的方块。

```cpp
#include <cstring>
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

typedef long long LL;

const int N = 12, M = 1 << N;

int n, m;
LL f[N][M];
vector<int> state[M];//所有合法状态
bool st[M];//判断状态是否合法，当前连续空格是否是偶数个

int main()
{
    while (cin >> n >> m, n || m)
    {
        //预处理st数组
        for (int i = 0; i < 1 << n; i ++ )
        {
            int cnt = 0;//cnt表示0的个数
            bool is_valid = true;
            for (int j = 0; j < n; j ++ )
                if (i >> j & 1)//当前位为1
                {
                    if (cnt & 1)//奇数个连续空格
                    {
                        is_valid = false;
                        break;
                    }
                    cnt = 0;
                }
                else cnt ++ ;//当前位为0
            if (cnt & 1) is_valid = false;//最后一段0为奇数个
            st[i] = is_valid;
        }
        //枚举每种合法状态
        for (int i = 0; i < 1 << n; i ++ )
        {
            state[i].clear();
            for (int j = 0; j < 1 << n; j ++ )
                if ((i & j) == 0 && st[i | j])
                    state[i].push_back(j);
        }

        memset(f, 0, sizeof f);//清空状态
        f[0][0] = 1;
        for (int i = 1; i <= m; i ++ )
            for (int j = 0; j < 1 << n; j ++ )
                for (auto k : state[j])
                    f[i][j] += f[i - 1][k];

        cout << f[m][0] << endl;
    }

    return 0;
}
```



### 最短Hamilton路径

![image.png](/notes/algorithm-foundations/asset-151.png)

动态规划思路：

![image.png](/notes/algorithm-foundations/asset-152.png)

i 是一个压缩的状态，用二进制表示，这个二进制数中的每一位表示某个点是否已经走过了

状态计算分类按照倒数第二个点是哪一个点来分类

假设倒数第二个点为k，则路径为0 -------- k - j ，k-j走的是边 kj ，要想最短则需要0-k最短，也就是需要计算从0走到k，并且经过了 i 除去 j 的点，的最小值

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>

using namespace std;

const int N = 20,M = 1 << N;

int n;
int w[N][N];//存图每一条边的权重
int f[M][N];

int main()
{
    //读数据
    cin >> n;
    for(int i = 0;i < n;i ++)
        for(int j = 0;j < n;j ++)
            scanf("%d",&w[i][j]);
    
    //初始化
    memset(f,0x3f,sizeof f);//初始化所有状态值为正无穷
    f[1][0] = 0;//从0这个点走到0，经过一个点，路径长度为0
    
    //遍历每一种情况
    for(int i = 0;i < 1 << n;i ++)
        for(int j = 0;j < n;j ++)
            if(i >> j & 1)//从0走到j，经过的点存在i里，则i里一定有j
                for(int k = 0;k < n;k ++)//遍历，从倒数第二个点转移到j
                    if((i-(1<<j) >> k & 1))//倒数第二个点从k转移过来，则i除去j后要包含k
                        f[i][j] = min(f[i][j],f[i-(1<<j)][k] + w[k][j]);
    

    cout << f[(1 << n) - 1][n - 1] << endl;//每一位都走过（i每一位都是1），并且落到了n-1（终点）
    
    
    return 0;
    
}
```



## 树形DP

### 没有上司的舞会

![image.png](/notes/algorithm-foundations/asset-153.png)

题意要求邀请一些人，其中不存在某人是另一个人的直接上司，但可以是间接上司（上司的上司）

动态规划思路：

![image.png](/notes/algorithm-foundations/asset-154.png)

状态表示中f[u,0]表示不选根节点，f[u,1]表示选根节点

对于f[u,0]情况：由于这棵树并没有选择根节点，所以在子节点为根节点的树中，根节点可以选也可以不选，取一个最大值即可

对于f[u,1]情况：由于当前树的根节点已经被选择了，所以它的子节点不能选，将所有子树s[i]的f[s,0]进行求和即可得出f[u,1]的值



代码：

```cpp
#include <cstring>
#include <iostream>
#include <algorithm>

using namespace std;

const int N = 6010;

int n;
int h[N], e[N], ne[N], idx;
int happy[N];//每个人的高兴度
int f[N][2];//所有状态，0表示不选，1表示选
bool has_fa[N];//看是否有父节点
//临接表插入边,从a到b的边
void add(int a, int b)
{
    e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
}

void dfs(int u)
{
    f[u][1] = happy[u];//选这个点，加上高兴度
    //枚举一下u的所有儿子
    for (int i = h[u]; i != -1 ; i = ne[i])
    {
        int j = e[i];
        dfs(j);//先算出来每个儿子节点选与不选的总高兴值
        //状态计算
        f[u][1] += f[j][0];
        f[u][0] += max(f[j][0], f[j][1]);
    }
}

int main()
{
    scanf("%d", &n);

    for (int i = 1; i <= n; i ++ ) scanf("%d", &happy[i]);

    memset(h, -1, sizeof h);
    for (int i = 0; i < n - 1; i ++ )
    {
        int a, b;
        scanf("%d%d", &a, &b);//b是a的父节点
        add(b, a);//加入这条边
        has_fa[a] = true;//a有父结点，为b
    }
  
    //从节点1开始找，没有父节点的就是根节点
    int root = 1;
    while (has_fa[root]) root ++ ;

    dfs(root);

    printf("%d\n", max(f[root][0], f[root][1]));//选or不选根节点的最大值

    return 0;
}
```



## 记忆化搜索

### 滑雪

![image.png](/notes/algorithm-foundations/asset-155.png)

动态规划思路：

![image.png](/notes/algorithm-foundations/asset-156.png)

状态计算按照往上下左右滑划分，但这四类并不一定全部存在，因为这四个方向的点不一定都小于当前值

当前点的最大值相当于下一步的最大值加一

代码：

```cpp
#include<iostream>
#include<algorithm>
#include<cstring>

using namespace std;

const int N = 310;

int n,m;
int f[N][N];
int h[N][N];//当前点高度

//上右下左向量
int dx[4] = {-1,0,1,0},dy[4] = {0,1,0,-1};

int dp(int x,int y)
{
    int &v = f[x][y];//引用，v等价于f[x][y]
    
    if(v != -1) return v;//当前点已经被计算过了
    
    v = 1;//从（x，y）点出发，至少可以走当前这个点
    //遍历周围四个点，能走的条件是周围的点并未越界并且高度小于当前点
    for(int i = 0;i < 4;i ++)
    {
        int a = x + dx[i],b = y + dy[i];
        if(a >= 0 && a < n && b >= 0 && b < m && h[a][b] < h[x][y])
            v = max(v,dp(a,b) + 1);
    }
    return v;
}
int main()
{
    scanf("%d%d",&n,&m);
    for(int i = 0;i < n;i ++)
        for(int j = 0;j < m;j ++)
            scanf("%d",&h[i][j]);
            
    memset(f,-1,sizeof f);//初始化f为-1，表示当前点尚未被计算过
    
    int res = 0;
    for(int i = 0;i < n;i ++)
        for(int j = 0;j < m;j ++)
            res = max(res,dp(i,j));
            
    printf("%d\n",res);
    
    return 0;
}
```

---

# 贪心

## 区间问题

### 区间选点

题目：

给定 N 个闭区间 [ai,bi]，请你在数轴上选择尽量少的点，使得每个区间内至少包含一个选出的点。

输出选择的点的最小数量。位于区间端点上的点也算作区间内。

**输入格式：**

第一行包含整数 N，表示区间数。

接下来 N 行，每行包含两个整数 ai,bi，表示一个区间的两个端点。

**输出格式：**

输出一个整数，表示所需的点的最小数量。



思路：

![image.png](/notes/algorithm-foundations/asset-157.png)



代码：

```cpp
#include<iostream>
#include<algorithm>

using namespace std;

const int N = 100010;

int n;
//区间
struct Range
{
    int l,r;
    //按照区间右端点比较
    bool operator< (const Range &W)const
    {
        return r < W.r;
    }
}range[N];

int main()
{
    scanf("%d",&n);
    for(int i = 0;i < n; i ++)
    {
        int l,r;
        scanf("%d%d",&l,&r);
        range[i] = {l,r};
    }
    //按区间右端点排序
    sort(range,range + n);
    
    int res = 0,ed = -2e9;//当前选了点的个数，上一个被选择的点坐标（某区间右端点）
    for(int i = 0;i < n;i ++)
    {
        //当前区间的左端点在点的右边，则当前区域没有被覆盖
        if(range[i].l > ed)
        {
            res ++;
            ed = range[i].r;
        }
    }
    
    printf("%d\n",res);
    return 0;
}
```



### 区间分组

题目：

给定 N 个闭区间 [ai,bi]，请你将这些区间分成若干组，使得每组内部的区间两两之间（包括端点）没有交集，并使得组数尽可能小。输出最小组数。

**输入格式：**

第一行包含整数 N，表示区间数。

接下来 N 行，每行包含两个整数 ai,bi，表示一个区间的两个端点。

**输出格式：**

输出一个整数，表示最小组数。



思路：

![image.png](/notes/algorithm-foundations/asset-158.png)

代码：

```cpp
#include<iostream>
#include<algorithm>
#include<queue>

using namespace std;

const int N = 100010;

int n;
struct range
{
    int l,r;
    //按照区间左端点排序
    bool operator< (const range &W) const
    {
        return l < W.l;
    }
}range[N];

int main()
{
    scanf("%d",&n);
    for(int i = 0;i < n;i ++)
    {
        int l,r;
        scanf("%d%d",&l,&r);
        range[i] = {l,r};
    }

    sort(range,range + n);

    priority_queue<int,vector<int>,greater<int>> heap;//用小根堆维护每一个区间组
    //按照区间左端点升序枚举每一个区间，每个区间组记录的是最右端点
    for(int i = 0;i < n;i ++)
    {
        auto r = range[i];//用r表示当前区间
        //每次判断当前所有组的右端点里最小的一个，是不是比当前区间的左端点要小。
        //当前堆为空or堆中最小的右端点都比当前区间左端点大
        //开一个新组，放入当前区间的右端点
        if (heap.empty() || heap.top() >= r.l) heap.push(r.r);
        else//将当前区间加入区间组
        {
            int t = heap.top();
            heap.pop();
            heap.push(r.r);
            //删去原来该区间组最大右端点，放入当前区间的右端点，相当于更新区间最大右端点
        }

    }
    printf("%d\n",heap.size());
    return 0;
}
```



### 区间覆盖

题目：

给定 N 个闭区间 [ai,bi] 以及一个线段区间 [s,t]，请你选择尽量少的区间，将指定线段区间完全覆盖。输出最少区间数，如果无法完全覆盖则输出 −1。

**输入格式：**

第一行包含两个整数 s 和 t，表示给定线段区间的两个端点。

第二行包含整数 N，表示给定区间数。

接下来 N 行，每行包含两个整数 ai,bi，表示一个区间的两个端点。

**输出格式：**

输出一个整数，表示所需最少区间数。

如果无解，则输出 −1。



思路：

![image.png](/notes/algorithm-foundations/asset-159.png)

代码：

```cpp
#include<iostream>
#include<algorithm>

using namespace std;

const int N = 100010;

int n,st,ed;
struct range
{
    int l,r;
    //按区间左端点排序
    bool operator< (const range &W)const
    {
        return l < W.l;
    }
}range[N];

int main()
{
    scanf("%d%d",&st,&ed);//区间左右端点
    scanf("%d",&n);
    
    for(int i = 0;i < n;i ++)
    {
        int l,r;
        scanf("%d%d",&l,&r);
        range[i] = {l,r};
    }
    
    sort(range,range + n);
    
    int res = 0;//区间数
    bool success = false;//是否成功找到解
    //双指针法遍历区间
    for(int i = 0;i < n;i ++)
    {
        int j = i,r = -2e9;//r表示能覆盖start的区间中最大右端点
        while(j < n && range[j].l <= st)
        {
            r = max(r,range[j].r);
            j ++;
        }
        
        res ++;
        
        if(r < st)//最大的右端点都小于起点，则无解
        {
            res = -1;
            break;
        }
        
        if(r >= ed)//最大右端点大于等于终点，则已完成覆盖
        {
            success = true;
            break;
        }
        
        st = r;//更新待覆盖区间起点
        i = j - 1;
        //为了避免重复遍历区间，j循环过的就不用再遍历了，所以i直接跳过去就行了。
        //循环最后会执行i ++。这样减一和加一才能抵消。
        
    }
    
    if(!success) res = -1;
    printf("%d\n",res);
    
    return 0;
}
```

注：

success这个标志用来判断最后一部分是否能覆盖上，不能省略。下面这段代码只能判断中间是否有缺失部分，但不能判断最后是否有缺失部分。

```cpp
if (r < st)
{
  res = -1;
  break;
}
```

最后一个区间覆盖不了目标区间的结尾（st ≤ r < ed）时循环依旧可以顺利结束而不被break 。



## Huffman树

### 合并果子

题目：

![image.png](/notes/algorithm-foundations/asset-160.png)

思路：

优先队列保存权值，每次合并两个最轻的，删除队列中两者权值，并将两者的权值相加的和放入优先队列中。

代码：

```cpp
#include<iostream>
#include<algorithm>
#include<queue>

using namespace std;

int main()
{
    int n;
    scanf("%d",&n);
    priority_queue<int,vector<int>,greater<int> > heap;//小根堆
    //读入权值
    while(n--)
    {
        int x;
        scanf("%d",&x);
        heap.push(x);
    }
    
    int res = 0;//合并需要的体力和
    while(heap.size() > 1)
    {
        //取最小两个权值
        int a = heap.top();heap.pop();
        int b = heap.top();heap.pop();
        
        res += a + b;
        
        heap.push(a + b);//合并后将和放入队列
    }
    
    printf("%d\n",res);
    return 0;
}
```



## 排序不等式

### 排队打水

题目：

有 n 个人排队到 1 个水龙头处打水，第 i 个人装满水桶所需的时间是 ti，请问如何安排他们的打水顺序才能使所有人的等待时间之和最小？

**输入格式：**

第一行包含整数 n。

第二行包含 n 个整数，其中第 i 个整数表示第 i 个人装满水桶所花费的时间 ti。

**输出格式：**

输出一个整数，表示最小的等待时间之和。



思路：

队列中只要当前排队的人不是最后一个，则他后面的人的等待时间中都需要加上他打水的时间，根据贪心，应该让打水时间短的人站在前面，保证打水等待的总时间最短

![image.png](/notes/algorithm-foundations/asset-161.png)

代码：

```cpp
#include<iostream>
#include<algorithm>

using namespace std;

typedef long long LL;//最后结果可能会爆int
const int N = 100010;

int n;//人数
int t[N];//每个人打水的时间

int main()
{
    scanf("%d",&n);
    for(int i = 0;i < n;i ++) scanf("%d",&t[i]);
    
    sort(t,t + n);
    
    LL res = 0;
    for(int i = 0;i < n;i ++) res += t[i] * (n - i - 1);
    
    printf("%lld\n",res);
    return 0;
}
```

## 绝对值不等式

### 货仓打水

题目：

在一条数轴上有 N 家商店,它们的坐标分别为 A1∼AN。现在需要在数轴上建立一家货仓,每天清晨,从货仓到每家商店都要运送一车商品。为了提高效率，求把货仓建在何处，可以使得货仓到每家商店的距离之和最小。

**输入格式:**

第一行输入整数 N。

第二行 N 个整数 A1∼AN。

**输出格式:**

输出一个整数，表示距离之和的最小值。



思路：

如果有奇数个点，则放在最中间的一个点上。如果是偶数个点，则放在最中间两个点组成的闭区间上的任意一点，此时不等式可以取到等号

![image.png](/notes/algorithm-foundations/asset-162.png)

代码：

```cpp
#include<iostream>
#include<algorithm>

using namespace std;

const int N = 100010;

int n;
int a[N];

int main()
{
    scanf("%d",&n);
    for(int i = 0;i < n;i ++) scanf("%d",&a[i]);
    
    sort(a,a + n);
    
    int res = 0;
    for(int i = 0;i < n;i ++) res += abs(a[i]-a[n/2]);//每个点与中位点做差取绝对值
    
    printf("%d\n",res);
    
    return 0;
}
```



## 推公式

### 耍杂技的牛

题目：

农民约翰的 N 头奶牛（编号为 1..N）计划逃跑并加入马戏团，为此它们决定练习表演杂技。奶牛们不是非常有创意，只提出了一个杂技表演：叠罗汉，表演时，奶牛们站在彼此的身上，形成一个高高的垂直堆叠。奶牛们正在试图找到自己在这个堆叠中应该所处的位置顺序。这 N 头奶牛中的每一头都有着自己的重量 Wi 以及自己的强壮程度 Si。一头牛支撑不住的可能性取决于它头上所有牛的总重量（不包括它自己）减去它的身体强壮程度的值，现在称该数值为风险值，风险值越大，这只牛撑不住的可能性越高。您的任务是确定奶牛的排序，使得所有奶牛的风险值中的最大值尽可能的小。

**输入格式：**

第一行输入整数 N，表示奶牛数量。

接下来 N 行，每行输入两个整数，表示牛的重量和强壮程度，第 i 行表示第 i 头牛的重量 Wi 以及它的强壮程度 Si。

**输出格式：**

输出一个整数，表示最大风险值的最小可能值。



思路：给定一个牛从上到下的排列顺序使危险系数的最大值最小，危险系数就是该牛上方所有牛的重量减去它的强壮值

![image.png](/notes/algorithm-foundations/asset-163.png)

交换前后去掉相同的前n-1项，再加上s[i],s[i+1]

![image.png](/notes/algorithm-foundations/asset-164.png)

交换后的最大值小于交换前的最大值

代码：

```cpp
#include<iostream>
#include<algorithm>

using namespace std;

typedef pair<int,int> PII;

const int N = 50010;

int n;
PII cow[N];

int main()
{
    scanf("%d",&n);
    for(int i = 0;i < n;i ++)
    {
        int w,s;
        scanf("%d%d",&w,&s);
        cow[i] = {w + s,w};
    }
    
    sort(cow,cow + n);//按w+s递增排序
    
    int res = -2e9,sum = 0;//res记录最大危险系数，sum记录重量和
    for(int i = 0;i < n;i ++)
    {
        int w = cow[i].second,s = cow[i].first - w;
        res = max(res,sum - s);
        sum += w;//每次加上当前牛的重量即为下一只牛上面所有牛的重量和
    }
    printf("%d",res);
    return 0;
}

```

---

# 蓝桥杯

## 二分与前缀和

![image.png](/notes/algorithm-foundations/asset-165.png)



![image.png](/notes/algorithm-foundations/asset-166.png)
