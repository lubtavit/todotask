<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Todo Task</title>

<style type="text/css">
#actionDiv #formdata .add{
    position: fixed;
    left: 50vw;
    width: 300px;
    background: #fff;
    border: 3px solid #444;
    padding: 20px;
    margin-left: -150px;
    border-radius: 5px;
    z-index: 2;
}
#actionDiv #formdata .add:before{content:"Add item";text;text-align: center;display: inherit;font-size: 20px;font-weight: 600;margin-bottom: 20px;}
#actionDiv #formdata .add div{
    margin-bottom:10px;
}
#actionDiv  #formdata:after {
    content:"";
    background: rgba(0, 0, 0, 0.69);
    width :100vw;
    height: 100vh;
    position:fixed;
    top:0;
    left:0px;
    z-index: 1;
}


input[type="button"] {
    margin-right: 10px;
}

.todotask {
    padding: 5px;
    background: rgb(172, 203, 255);
}
.todotask:nth-child(odd) {
    padding: 5px;
    background: rgba(230, 230, 230, 0.69);
}
</style>

</head>
<body>

	<div id="showdata"></div>
	<div id="actionDiv"></div>
	
	<script src="https://code.jquery.com/jquery-3.1.1.js"
	integrity="sha256-16cdPddA6VdVInumRGo6IbivbERE8p7CQR3HzTBuELA="
	crossorigin="anonymous"></script>

	<script src="js/react-15.0.1/build/react.js"></script>
	<script src="js/react-15.0.1/build/react-dom.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.24/browser.min.js"></script>
	
	<script type="text/babel" src="index.js"> </script>
</body>
</html>