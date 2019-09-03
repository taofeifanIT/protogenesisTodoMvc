var list = []
var currentDom = null
$('szk-txt').onkeydown = function(e) {
	var ev = document.all ? window.event : e;
	if(ev.keyCode == 13) {
		currentDom = this.children[0]
		var txtname = currentDom.value
		list.push({
			content: txtname,
			type: 0
		})
		if(list.length > 0) {
			classDom('szk-xz')[0].children[0].style.display = 'block'
			classDom('szk-all')[0].style.display = 'block'
		}
		currentDom.value = ''
		render('all')
	}
}

function render(type) {
	classDom('szk-ul')[0].children[0].innerHTML = ''
	let typeList = []
	let imageSrc = ''
	if(type == 'all') {
		typeList = list
	} else if(type == 'Active') {
		typeList = list.filter((item) => item.type == 0)
	} else if(type == 'Completed') {
		typeList = list.filter((item) => item.type == 1)
	}
	for(var i = 0; i < typeList.length; i++) {
		if(typeList[i].type == 1) {
			imageSrc = 'images/comleted.png'
		} else {
			imageSrc = 'images/active.png'
		}
		classDom('szk-ul')[0].children[0].innerHTML += getHtml(i, typeList[i].content, imageSrc)
	}
	console.log(typeList)
}

function changeState(index) {
	if (list[index].type == 0) {
		list[index].type = 1
	} else {
		list[index].type = 0
	}
	
	render('all')
	loadCount()
}

function deleData (index) {
	list.splice(index,1)
	render('all')
}

function loadCount ()  {
	classDom('count')[0].innerHTML = list.filter((item) => item.type == 1).length
}

function clearCompleted () {
	list = list.filter((item) => item.type == 0)
	render('all')
	loadCount()
}

function editData (index,me) {
	list[index].content = me.value
	render('all')
}

function $(id) {
	return document.getElementById(id)
}

function classDom(classDom) {
	return document.getElementsByClassName(classDom)
}

function getHtml(index, content, image) {
	return "<li><img src='" + image + "' onclick=changeState('" + index + "') /><input type='text' class='li-value' onblur=editData('" + index + "',this) value='" + content + "' /><b onclick=deleData('" + index + "')>×</b></li>"
}

function getComleteData() {
	render('Active')
}

