var tools = {


	/* ajax请求get
     * @param url     string   请求的路径
     * @param query   object   请求的参数query
     * @param succCb  function 请求成功之后的回调
     * @param failCb  function 请求失败的回调
     * @param isJson  boolean  true： 解析json  false：文本请求  默认值true
     */
    ajaxGet: function (url, query, succCb, failCb, isJson) {
        // 拼接url加query
        if (query) {
            var parms = tools.formatParams(query);
            url += '?' + parms;
            // console.log('-------------',url);
        }

        // 1、创建对象
        var ajax = new XMLHttpRequest();
        // 2、建立连接
        // true:请求为异步  false:同步
        ajax.open("GET", url, true);
        // ajax.setRequestHeader("Origin",STATIC_PATH); 

        // ajax.setRequestHeader("Access-Control-Allow-Origin","*");   
        // // 响应类型    
        // ajax.setRequestHeader('Access-Control-Allow-Methods', '*');    
        // // 响应头设置    
        // ajax.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');  
        // ajax.withCredentials = true;
        // 3、发送请求
        ajax.send(null);

        // 4、监听状态的改变
        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4) {
                if (ajax.status === 200) {
                    // 用户传了回调才执行
                    // isJson默认值为true，要解析json
                    if (isJson === undefined) {
                        isJson = true;
                    }
                    var res = isJson ? JSON.parse(ajax.responseText == "" ? '{}' : ajax.responseText) : ajax.responseText;
                    succCb && succCb(res);
                } else {
                    // 请求失败
                    failCb && failCb();
                }

            }
        }


    },
    
    
    	/* ajax请求post
     * @param url     string   请求的路径
     * @param data   object   请求的参数query  
     * @param succCb  function 请求成功之后的回调
     * @param failCb  function 请求失败的回调
     * @param isJson  boolean  true： 解析json  false：文本请求  默认值true
     */
    ajaxPost: function (url, data, succCb, failCb, isJson) {
    
        var formData = new FormData();
        for (var i in data) {
            formData.append(i, data[i]);
        }
        //得到xhr对象
        var xhr = null;
        if (XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");

        }

        xhr.open("post", url, true);
		// 设置请求头  需在open后send前
		// 这里的CSRF需自己取后端获取，下面给出获取代码
        xhr.setRequestHeader("X-CSRFToken", CSRF);

        xhr.send(formData);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // 判断isJson是否传进来了
                    isJson = isJson === undefined ? true : isJson;
                    succCb && succCb(isJson ? JSON.parse(xhr.responseText) : xhr.responseText);
                }
            }
        }

    },

}



// 调用
// 接口地址

var x; 

            let urlCommunity = "http://101.133.136.243:3000/community";
// 传输数据 为object
            tools.ajaxGet(urlCommunity, null, function(res){
	            console.log('返回的数据:',res)
	// ....
                for(i in res){
                    x+='<div class="comment" id='+res[i]._id+'><div ><a href=""class="user"><div class="logo"><img src=""></div><div class="name">'+res[i]._id+'</div></a></div><div class="content">'+res[i].content+'</div>';
                    x+='<div class="appendix"><span class="time">'+res[i].date+'</span><a id="" class="" href="details.html?-id='+res[i]._id+'><span class="show-more">详情</span></a></div><div class="lable">#'+res[i].tag+"</div>";
                    document.getElementById("comment").innerHTML=x;
                }
            });
var y;            
let urlDetails="http://101.133.136.243:3000/community/comment";
var Url=document.URL;
const search=location.search.substr(1)
const p= new URLSearchParams(search) ;
var _id=p.get(_id);
tools.ajaxGet(urlDetails, _id, function(res){
	console.log('返回的数据:',res)
	
        y+='<div class="comment" id='+res[i]._id+'><div ><a class="user"><div class="logo"><img src=""></div><div class="name">'+res[i]._id+'</div></a></div><div class="content detail">'+res[i].content+'</div>';
        y+='<div class="appendix"><span class="time">'+res[i].date+'</span></div><div class="lable">#'+res[i].tag+"</div>";
        y+='<div class="operate"></div>赞'+res[i].like+' 评论'+res[i].comments+'  转发'+res[i].retweet+'</div><hr/>';
        document.getElementById("comment-detail").innerHTML=y;
   
    
});