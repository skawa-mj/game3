<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/include.html" %>

<body>
<!--  ============[カード選択画面]============ -->

<div data-role="page" id="topPage">

	<!-- ヘッダーエリア -->
	<div data-role="header">
		<h1>カードゲーム</h1>
	</div>

	<!-- コンテンツエリア -->
	<div data-role="content" class="center">

		<!-- 現在のスコア -->
		<div class="largeText">
			Score　<span id="currentScore">0</span>pt
		</div>

		<!-- 残りライフ -->
		<div id="life">
			<img id="life1" />
			<img id="life2" />
			<img id="life3" />
		</div>

		<!-- カード3枚表示 -->
		<div id="card">
			<img id="card1" />
			<img id="card2" />
			<img id="card3" />
		</div>

		<!-- 操作メッセージ -->
		<div id="selectMsg">カードを選択してください</div>

		<!-- [次のカード]ボタン -->
		<input type="button" id="nextButton"
		value="次のカード" />

		<!-- [ランキング]ボタン -->
		<input type="button" id="rankingButton"
		value="ランキング" />

		<!-- ゲームスコアの送信フォーム(非表示) -->
		<form data-ajax="false" method="POST"
		action="/ranking" id="myScoreForm">
			<input type="hidden" name="myScore"
			id="myScore" />
		</form>

	</div>

</div>

</body>
</html>