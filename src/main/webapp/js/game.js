//グローバルオブジェクト（空オブジェクト）
var MYGAME = {};

//============ページ区切り[ゲーム画面]============
$(document).on("pageinit", "#topPage", function(){

	//初期化の処理
	$("#topPage").on("pageshow", function() {
		MYGAME.init();
	});

	//初期化関数
	MYGAME.init = function(){
		MYGAME.mode = "SELECT";
		sessionStorage.score = 0;
		sessionStorage.life = 3;
		$("#currentScore").text("0");
		$("#life img").attr("src","images/life_mark_on.png");
		$("#card img").attr("src","images/card_reverse.gif");
		$("#selectMsg").css("opacity",1);
		$("#nextButton").val("次のカード");
		$("#nextButton").attr("disabled","disabled");
		$("#nextButton").button("refresh");
		$("#rankingButton").attr("disabled","disabled");
		$("#rankingButton").button("refresh");
	}

	//カード選択時の処理
	$("#card img").on("click", function() {

		//複数カードの選択防止
		if(MYGAME.mode != "SELECT") return;
		MYGAME.mode = "RESULT";

		//スコア算出とカード表示
		var randNum = Math.floor(Math.random() * 10) + 1;
		sessionStorage.score =
			randNum * 10 + parseInt(sessionStorage.score);
		$("#currentScore").text(sessionStorage.score);
		$(this).attr("src","images/card_" + randNum + ".gif");

		//残りライフの算出と表示
		var life = --sessionStorage.life;
		for(i = 1; i <= (3 - life); i++){
			var selector = "#life" + i;
			$(selector).attr("src",
					"images/life_mark_off.png");
		}

		//ゲームオーバー判定
		if(life > 0){
			$("#selectMsg").css("opacity",0);
			$("#nextButton").removeAttr("disabled");
			$("#nextButton").button("refresh");
		}else{
			MYGAME.mode = "GAMEOVER";
			$("#selectMsg").css("opacity",0);
			$("#nextButton").val("もう一度");
			$("#nextButton").removeAttr("disabled");
			$("#nextButton").button("refresh");
			$("#rankingButton").removeAttr("disabled");
			$("#rankingButton").button("refresh");
		}

	});

	//次のカードボタン選択時の処理
	$("#nextButton").on("click", function() {

		//ゲームオーバーの時は初期化
		if(MYGAME.mode === "GAMEOVER"){
			MYGAME.init();
			return;
		}

		//ライフが残っている時は次のカード選択
		MYGAME.mode = "SELECT";
		$("#card img").attr("src","images/card_reverse.gif");
		$("#selectMsg").css("opacity",1);
		$("#nextButton").attr("disabled","disabled");
		$("#nextButton").button("refresh");

	});

	//ランキングボタン選択時の処理
	$("#rankingButton").on("click", function() {
		$("#myScore").val(sessionStorage.score);
		$("#myScoreForm").submit();
	});

});
