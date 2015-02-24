package jp.co.staffnet.html5.game;

import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query.SortDirection;

@SuppressWarnings("serial")
public class RankingServlet extends HttpServlet {

	@Override
	protected void doPost(HttpServletRequest req,
			HttpServletResponse resp)
			throws ServletException, IOException {

		//ブラウザからのデータ受信
		String myScore = req.getParameter("myScore");
		int score = Integer.parseInt(myScore);

		//DatastoreService取得
		DatastoreService datastore =
			DatastoreServiceFactory.getDatastoreService();

		//スコアをデータストアへ保存
		Entity entity = new Entity("GameScore");
		entity.setProperty("score", score);
		datastore.put(entity);

		//ランキング取得
		Filter filter = new FilterPredicate("score",
				FilterOperator.GREATER_THAN,
				score);
		Query query = new Query("GameScore")
							.setFilter(filter);
		PreparedQuery pq = datastore.prepare(query);
		FetchOptions option = FetchOptions.Builder
								.withDefaults();
		option.offset(0);
		option.limit(Integer.MAX_VALUE);
		int count = pq.countEntities(option);
		int rank = count + 1;

		//ハイスコア取得
		long highScore = 0;
		if(rank == 1){
			highScore = score;
		}else{
			query = new Query("GameScore")
					.addSort("score",
							SortDirection.DESCENDING);
			pq = datastore.prepare(query);
			option.limit(1);
			List <Entity> topEntity = pq.asList(option);
			highScore = (Long)topEntity.get(0)
						.getProperty("score");
		}

		//JSPへ渡すデータを設定
		req.setAttribute("yourRank",
						Integer.toString(rank));
		req.setAttribute("highScore",
						Long.toString(highScore));
		req.setAttribute("yourScore", myScore);

		//ranking.jspへ遷移
		getServletConfig().getServletContext()
			.getRequestDispatcher("/ranking.jsp")
			.forward(req, resp);

	}

}
