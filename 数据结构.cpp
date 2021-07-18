#define TRUE 1
#define FALSE 0
#define OK 1
#define ERROR 0
#define INFEASIBLE -1
#define OVERFLOW -2
#include<iostream>
#include<stack>
#include<queue> 
using namespace std;
//时间仓促，只写了函数 

typedef int status;
typedef int KeyType; 
typedef struct {
     KeyType  key;
     char others[20];
} TElemType; //二叉树结点类型定义
typedef struct BiTNode{    //二叉链表结点的定义
      TElemType data;
      struct BiTNode *lchild,*rchild;
} BiTNode, *BiTree;

typedef int status;
typedef int KeyType; 
typedef enum {DG,DN,UDG,UDN} GraphKind;
typedef struct {
     KeyType  key;
     char others[20];
} VertexType; //顶点类型定义
typedef struct ArcNode {         //表结点类型定义
        int adjvex;              //顶点位置编号 
     struct ArcNode  *nextarc;       //下一个表结点指针
} ArcNode;
typedef struct VNode{                //头结点及其数组类型定义
        VertexType data;           //顶点信息
     ArcNode *firstarc;           //指向第一条弧
    } VNode,AdjList[MAX_VERTEX_NUM];
typedef  struct {  //邻接表的类型定义
    AdjList vertices;          //头结点数组
    int vexnum,arcnum;         //顶点数、弧数
    GraphKind  kind;        //图的类型
   } ALGraph


//选择排序 (a[0]监视哨) 
void InsertSort(Type a[],int len){
	int i,j;
	for(i=2;i<=len;i++){
		a[0]=a[i];
		j=i-1;
	}
	while(a[0].key<a[j].key){
		a[j+1]=a[j];
		j--;
	}
	a[j+1]=a[0];
} 

//堆排序 
void HeapAdj(Type a[],int i,int n){//数组包含0处数据 
	int child;
	Type tmp;
	for(tmp=a[i];2*i+1<n;i=child){//lchild=2*i+1
		child=2*i+1;
		if(child!=n-1&&a[child].key<a[child+1].key){
			child++;
		}
		if(tmp.key<a[child].key){
			a[i]=a[child];
		}
		else break;
	}
	a[child]=tmp;
}
void Heapsort(Type a[],int n){
	int i;
	for(i=N/2;i>0;i--){
		HeapAdj(a,i,n);//create heap
	}
	for(i=N-1;i>0;i--){
		swap(&a[0],&a[i]);
		HeapAdj(a,0,i);//sort
	}
}

//快排
ElementType mid3(ElementType a[],int l,int r){
	int center=(l+r)/2;
	if(a[r]<a[center])	swap(&a[r],&a[center]);
	if(a[r]<a[l])	swap(&a[r],&a[l]);
	if(a[center]>a[l])	swap(&a[r],&a[center]);
	return a[l];//头中尾取中值放到左端 
} 
void quksort(ElementType a[],int l,int r){
	ElementType tmp;
	int i,j;
	if(l+2<r){
		x=mid3(a,l,r);
		i=l;
		j=r;
		do{
			while(i<j&&a[j]>=x)	j--;
			if(i<j){
				a[i]=a[j];
				i++;
				while(i<j&&a[i]<=x)	i++;
				if(i<j){
					a[j]=a[i];
					j--;
				}
			}
		}while(i!=j);
		r[i]=x;
		quksort(a,l,i-1);
		quksort(a,i+1,l);
	}
	else  Insertsort(a+l,r-l+1);
} 
void Qsort(ElementType a[],int n){
	quksort(a,1,n);
}

//归并排序
void merge(RecType r[],y[];int low,mid,high;){
	int k=i=low,j=mid+1；
	while (i<=mid && j<=high){
		if (r[i].key<=r[j].key){
			y[k]=r[i];
			i++;
		}
		else{
			y[k]=r[j];
			j++;
		}
		k++
	}
	while (j<=high){
		y[k]=r[j];
		j++;
		k++;
	}
	while (i<=mid){
		y[k]=r[i];
		i++;
		k++;
	}
} 
void mergepass(RecType r[], RecType y[],int s){
	int i=1;
	while(i+2*s-1<=ｎ){
		merge(r,y,i,i+s-1,i+2*s-1);
	i=i+2*s;
	}
	if (i+s-1<n)	merge(r,y,i,i+s-1,n);
	else
		while(i<=n){
			y[i]=r[i];
			i++;
		}
}
void mergesort(RecType r[],int n){
	RecType y[n+1]
	int s=1;
	while (s<n){
		mergepass(r,y,s);
		s=2*s;
		mergepass(y,r,s);
		s=2*s;
	}
}

//树 
//先序遍历
status PreOrderTraverse1(BiTree T){//递归 
    if(T) {
    	printf("%c",T->data);
    	if(T->lchild) PreOrderTraverse(T->lchild);
    	if(T->rchild) PreOrderTraverse(T->rchild);
	}
    return;
} 
void PreorderTraverse2(BiTree T){//非递归 
	BiTree p;
	stack<BiTree> St;
	int top= 0;
	if (t!= NULL){
		St.push(t);
		while(!St.empty()){
			p=St.pop();
			printf("%c", p->data);
			if(p->rchild != NULL)
				St.push(p->rchild);
			if(p->lchild !=NULL)
				St.push(p->lchild);
		}
		printf("\n");
	}
}

//中序遍历二叉树T
void MidOrderTraverse1(BiTree T){ 
	if (T){ 
		MidOrderTraverse1(T->lchild);
		printf("%c",T->data); 
		MidOrderTraverse(T->rchild);
	}
	return;
}
status MidOrderTraverse2(BiTree T){
    if (T == NULL) return OK;
	stack<BiTNode> St;
    BiTree p = T;
    BiTree TS[100];
    while (!St.empty()|| p)
    {
        if (p)
        {
            St.push(p);
            p = p->lchild;
        }
        else
        {
            p =St.pop();
            printf("%c", p->data);
            p = p->rchild;
        }
    }
    return OK;
}

//后序遍历二叉树T
void PostOrderTraverse1(BiTree T){ 
	if (T){ 
		PostOrderTraverse(T->lchild);
		PostOrderTraverse(T->rchild);
		printf("%c",T->data); 
	}
	return;
}
void PostorderTraverse2(BiTree t){
	struct BiTree pre;
	stack<BiTree> St;
	int flag, top = 0;
	if (t != NULL){
		do{
			while(t != NULL){
				St.push(t);
				t = t->lchild;
			}
			pre = NULL;
			flag = 1;
			while(!St.empty()&& flag){
				t = St.top();
				if(t->rchild == pre){
					printf("%c", t->data);
					St.pop();
					pre = t;
				}
				else{
					t=t->rchild;
					flag = 0;
				}
			}
		}while(!St.empty());
		printf("\n"); 
	}
}

//层序遍历
status LevelOrderTraverse(BiTree T){
    queue<BiTree> Q;
    Bitree p;
    Q.push(T);
    while(!Q.empty()){
    	p=Q.pop();
    	printf("%c\n", p->data);
    	q.push(p->lchild);
    	p.push(p->rchild);    	
	}
} 


//图
//DFS
int DFS1(ALGraph &G,VNode* A,int i,int *flag,void (*visit)(VertexType)){
    if(flag[i] == 1) return 1;
    visit(G.vertices[i].data);
    flag[i] = 1;
    ArcNode *T=G.vertices[i].firstarc;
    int j;
    while(T){
        j = T->adjvex;
        DFS1(G,&G.vertices[j],j,flag,visit);
        T=T->nextarc;
    }
    return 1;
}
status DFSTraverse(ALGraph &G,void (*visit)(VertexType)){
    int flag[G.vexnum] = {};
    int i;
    for(i = 0; i <G.vexnum;i++ ){
        DFS1(G,&G.vertices[i],i,flag,visit);
    }
    return OK;
} 

//BFS
int BFS_1(ALGraph &G,VNode* A,int i,int *flag,void (*visit)(VertexType)){
    if(flag[i] == 1) return 1;
    visit(G.vertices[i].data);
    flag[i] = 1;
    ArcNode *T=G.vertices[i].firstarc;
    int j;
    while(T){
        j = T->adjvex;
        if(flag[j] != 1) {
            visit(G.vertices[j].data);
            flag[j] = 1;
        }
        T=T->nextarc;
    }
    T=G.vertices[i].firstarc;
    while(T){
        j = T->adjvex;
        BFS_1(G,&G.vertices[j],j,flag,visit);
        T=T->nextarc;
    }
    return 1;
}
status BFSTraverse(ALGraph &G,void (*visit)(VertexType)){
    int flag[G.vexnum] = {};
    int i;
    for(i = 0; i <G.vexnum;i++ ){
        BFS_1(G,&G.vertices[i],i,flag,visit);
    }
    return OK;
}

//拓扑排序
void TopoSort(ALGraph *G,int n)
{
    int i,j,k,top,m=0;
    EdgeNode *p;
    int *d=(int *)malloc(n*sizeof(int));		
    for(i=0;i<n;i++)		//初始化数组
    {
        d[i]=0;
    }
    for(i=0;i<n;i++)		//统计各个顶点的入度情况，并把他们填入数组里面
    {
        p=G->adjlist[i].firstedge;
        while(p!=NULL)
        {
            j=p->adjvex;
            d[j]++;
            p=p->next;
        }
    }
    top=-1;
    for(i=0;i<n;i++)			//先找出里面入度是0的顶点
    {
        if(d[i]==0)
        {
            d[i]=top;
            top=i;
        }
    }

    while(top!=-1)
    {
        j=top;	
        top=d[top];
        printf("%d ",j);		
        m++;		//统计顶点
        p=G->adjlist[j].firstedge;
        while(p)
        {
            k=p->adjvex;		//相l连接的顶点
            d[k]--;		//相连接的顶点入度减1
            if(d[k]==0)		//如果发现入度为0的新顶点，从该顶点出发
            {
                d[k]=top;
                top=k;
            }
            p=p->next;
        }

    }
    if(m<n) printf("\n有回路！\n");
    free(d);
}

struct edge{                ///结构体，表示边的权值和边的两个顶点
    int u,v,value;
}e[1001];
int fa[1001];               //定义并查集数组
int _find(int x){           //并查集，带路径压缩
    return fa[x]==x?x:fa[x]=_find(fa[x]);
}
bool cmp(edge a,edge b){    //结构体排序函数，将边的权值按照从小到大的顺序排好序
    return a.value<b.value;
}
int kruskal(int n,int m){
    int edge_num=0,value_sum=0;
    sort(e+1,e+m+1,cmp);
    for(int i=1;i<=n;i++) fa[i]=i;
    for(int i=1;i<=m;i++){
        int fau=_find(e[i].u);
        int fav=_find(e[i].v);
        if(fau!=fav){
            fa[fau]=fav;
            value_sum+=e[i].value;
            edge_num++;
            if(edge_num == n-1) break; 
        }
    }
    if(edge_num==n-1) return value_sum; 
    else return -1;
    return value_sum;
}
