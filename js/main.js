//开始
function addLoadEvent(func){
	var oldload = window.onload;
	if(typeof window.onload != "function"){
		window.onload = func;
	}else{
		window.onload = function(){
			oldload();
			func();
		}
	}
}
//判断方法。

function addClass(node, value){
	if(!node.className){
		node.className = value;
	}else{
		newClassName = node.className;
		newClassName +=" ";
		newClassName += value;
		node.className = newClassName;
	}
}

function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}	
}
//工具函数结束。
addLoadEvent(highlightPage);
addLoadEvent(prepareElement);
addLoadEvent(clickNav);
addLoadEvent(prepareTheRom);
addLoadEvent(getTheUrl);
addLoadEvent(displayAbbreviations);
addLoadEvent(stipeTable);
addLoadEvent(focusLabels);
addLoadEvent(prepareForm);

function highlightPage(){
	var headers = document.getElementsByTagName("header");
	var navs = headers[0].getElementsByTagName("nav");
	var links = navs[0].getElementsByTagName("a");
	for(var i= 0; i<links.length;i++){
		var linkurl = links[i].getAttribute("href");
		//links[i].getAttribute("href")获得Index.html
		//link[i].href类似于file//c|/users/vincent/desktop/home.html.
		//和window.lacation.href好像差不多。
		if(window.location.href.indexOf(linkurl) != -1){
			 addClass(links[i],"aSelect");
			 linktext = linkurl.split(".");
			 document.body.id = linktext[0];
		// var linktext = links[i].firstChild.nodeValue.toLowerCase();
		// document.body.id = linktext;
		// console.log(linktext);
		}
	}
}
function prepareElement(){
	//只给Index.html设置。
	if(!document.getElementById("Index")){return false;}
	var div = document.createElement("div");//创建DIV容器
	div.style.width = "150px";
	div.style.height = "150px";
	div.style.position = "relative";
	div.style.top = "20px"
	div.style.left = "50px"
	div.style.overflow = "hidden";
	//创建动画图片;
	var img = document.createElement("img");
	img.src ="images/slide.jpg";
	img.alt ="改变";
	img.style.position ="absolute";
	img.id = "slide";
	//创建圆角遮罩；
	var front = document.createElement("img");
	front.src = "images/frame.gif";
	front.style.position ="absolute";
	front.style.zIndex = "99";
	div.appendChild(img);
	div.appendChild(front);
	var article = document.getElementsByTagName("article");
	article[0].appendChild(div);
	//取得链接，利用URl属性设定动画事件。
	var links = document.getElementsByTagName("a");
	for(var i = 0; i<links.length;i++){
		links[i].onmouseover = function(){
			if(this.getAttribute("href").indexOf("Index.html") != -1){
				moveElement("slide",0,0,10);
			}
			if(this.getAttribute("href").indexOf("skills.html") !=-1){
				moveElement("slide",-150,0,10);
			}
			if(this.getAttribute("href").indexOf("ability.html") !=-1){
				moveElement("slide",-300,0,10);
			}
			if(this.getAttribute("href").indexOf("list.html") !=-1){
				moveElement("slide",-450,0,10);
			}
			if(this.getAttribute("href").indexOf("contact.html") !=-1){
				moveElement("slide",-600,0,10);
			}
		}
	}
}

function moveElement(elementID,final_x,final_y,interval){
	if(!document.getElementById){return false;}
	if(!document.getElementById(elementID)){return false;}
	var elem = document.getElementById(elementID);
	if(!elem.style.left){
		elem.style.left = "0px";
	}
	if(!elem.style.top){
		elem.style.top = "0px";
	}
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	var dis = 0;
	if(elem.movement){
		clearTimeout(elem.movement);
	}
	if(xpos == final_x && ypos == final_y){
		return true;
	}
	if(xpos<final_x){
		dis = Math.ceil((final_x - xpos)/10);
		xpos += dis;
	}
	if(xpos>final_x){
		dis = Math.ceil((xpos-final_x)/10);
		xpos -= dis;
	}
	if(ypos < final_y){
		dis = Math.ceil((final_y - ypos)/10);
		ypos += dis;
	}
	if(ypos > final_y){
		dis = Math.ceil((ypos - final_y)/10);
		ypos -= dis;
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat,interval);
}
//index.html函数创建完毕；

//对skills.html创建函数。
function showSection(elemid){
	var sections = document.getElementsByTagName("section");
	if(sections.length<1){return false;}
	for(var i = 0; i<sections.length;i++){
		if(sections[i].id ==elemid){
			sections[i].style.display = "block";
		}else{
			sections[i].style.display = "none"
		}
	}
}

function clickNav(){
	if(!document.getElementById("skills")){ return false;}
	var nav = document.getElementsByTagName("ul");
	var links = nav[1].getElementsByTagName("a");
	for(var i = 0; i<links.length;i++){
		links[i].onclick = function(){
			var id = this.getAttribute("href").split("#")[1];
			showSection(id);
			return false;
		}
	}
}
//对skills.html函数创建完毕。


//对ability.html创建函数。
function prepareTheRom(){
    if(!document.getElementById("ability")) return false;
    var h3 = document.createElement("h3");
    h3.style.margin = " 20px 20px";
    var h3text = document.createTextNode("J选择图片：")
    h3.appendChild(h3text);
    var image = document.createElement("img");
    image.src = "images/photo_bg.gif";
    image.alt = "here are the images.";
    image.id = "picroom"
    image.style.border = "1px solid #999";
    var introduce = document.createElement("p");
    introduce.id = "introduce";
    var text = document.createTextNode(" ");
    introduce.appendChild(text);
    var article = document.getElementsByTagName("article");
    article[0].appendChild(h3);
    article[0].appendChild(image);
    article[0].appendChild(introduce);
}

function getTheUrl () {
    if(!document.getElementById("ability")) return false;
    var nav = document.getElementsByTagName("ul");
    var links = nav[1].getElementsByTagName("a");
    for(var i = 0;i < links.length;i++){
	   links[i].onclick = function (){
		  var url = this.href;
		  var alt = this.firstChild.alt;
		  showThePic(url,alt);
		  return false;
	   }
    }
}
function showThePic (url,text){
    var picPlace = document.getElementById("picroom");
    picPlace.src = url;
    var introduce = document.getElementById("introduce");
    introduce.firstChild.nodeValue = text;
}
//ability.html创建完毕。



 //list.html的函数。
function displayAbbreviations (){
    if(!document.getElementById("list")){return false;}
    var abbrs = document.getElementsByTagName("abbr");
    var arr = new Array();
    for (var i = 0; i < abbrs.length; i++){
	   if(!abbrs[i].title) continue;
	   var key = abbrs[i].firstChild.nodeValue;
	   var description = abbrs[i].title;
	   arr[key] = description;
    }
    var dlist = document.createElement("dl");
    for(key in arr){
	   var dtitle = document.createElement("dt");
	   var dttext = document.createTextNode(key);
	   var dd = document.createElement("dd");
	   var ddtext = document.createTextNode(arr[key]);
	   dtitle.appendChild(dttext);
	   dd.appendChild(ddtext);
	   dlist.appendChild(dtitle);
	   dlist.appendChild(dd);
    }
    var article = document.getElementsByTagName("article");
    article[0].appendChild(dlist);
}

function stipeTable (){
    if(!document.getElementById("list")){return false;}
    var tables = document.getElementsByTagName("table");
    var rows = tables[0].getElementsByTagName("tr");
    var add = false;
    for(var i = 1; i < rows.length;i++){
	   addClass(rows[i],"hover");
	   if(add == true){
		  addClass(rows[i],"new");
		  add = false;
	   }else{
		  addClass(rows[i],"old");
		  add = true;
	   }
    }
}
//list.html函数创建完毕。

//开始对contact.html创建函数。
//让不支持label跳转的浏览器支持。
 function focusLabels() {
	if (!document.getElementById("contact")) {return false;}
	var labels = document.getElementsByTagName("label");
	for (var i = 0; i < labels.length; i++) {
	    if (!labels[i].getAttribute("for")) continue;
	    lables[i].onclick = function () {
		   var elemId = this.getAttribute("for");
		   if (!document.getElementById(elemId)) return false;
		   var element = document.getElementById(elemId);
		   element.focus();
	    }
	}
 }
//让不支持palceholder的浏览器支持文本占位符。
 function resetFields(whichform) {
 	if(Modernizr.input.placeholder) {return;}
 	for(var i=0;i<whichform.elements.length;i++){
 		var element = whichform.elements[i];
 		if(elements.type == "submit"){continue;}
 		if(!elements.getAttribute("placeholder")){continue;}
 		element.onfocus = function(){
 			if(this.value == this.getAttribute("")){
 				this.value = "";
 			}
 		}
 		element.onblur =function(){
 			if(this.value == ""){
 				this.value = this.getAttribute("");
 			}
 		}
 		element.onblur();
 	}
 }
 function prepareForm() {
	if (!document.getElementById("")) {
	    return false;
	}
	for (var i = 0; i < document.forms.length; i++) {
	    var form = document.forms[i];
	    resetFields(form);
	}
 }
//结束



