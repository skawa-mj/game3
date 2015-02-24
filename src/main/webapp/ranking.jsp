<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="include.html" %>

<body>

<!--  ============[ランキング画面]============ -->

<div data-role="page" id="rankingPage">

	<!-- ヘッダーエリア -->
	<div data-role="header">
		<h1>ランキング</h1>
	</div>

	<!-- コンテンツエリア -->
	<div data-role="content" class="center">
		<p class="middleText">
			あなたは<%=request.getAttribute("yourRank") %>位
		</p>
		<p>
			High Score　
			<%=request.getAttribute("highScore") %>pt<br/>
			Your Score　
			<%=request.getAttribute("yourScore")  %>pt
		</p>
		<a href="/game.jsp" data-role="button">ゲームへ戻る</a>
	</div>

</div>

</body>
</html>