$.ajax({
    url: 'https://app.eeo.com.cn/?app=article&controller=index&action=articleAd&is_pc=1&uuid=' + uuid,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
    	if(!data.data) return;
        // 文头广告
		var article_head_ad = data.data.article_head_ad ? data.data.article_head_ad : '';
		if (article_head_ad) {
			for(var i in article_head_ad){
				var headHtml = '<a href="'+article_head_ad[i].url+'" target="_blank"><img src="'+article_head_ad[i].imagePath+'" /></a>';
				$('.ad_1000').append(headHtml);
			}
		}

		// 文中广告
		var article_middle_ad = data.data.article_middle_ad ? data.data.article_middle_ad : '';
		if (article_middle_ad) {
			for(var i in article_middle_ad){
				var middleHtml = '<a href="'+article_middle_ad[i].url+'" target="_blank"><img src="'+article_middle_ad[i].imagePath+'" /></a>';
				$('#artice_middle_ad'+ article_middle_ad[i].index).append(middleHtml);
			}
		}

		// 文末广告
		var article_footer_ad = data.data.article_footer_ad ? data.data.article_footer_ad : '';
		if (article_footer_ad) {
			for(var i in article_footer_ad){
				var footHtml = '<p><a href="'+article_footer_ad[i].url+'" target="_blank"><img src="'+article_footer_ad[i].imagePath+'" /></a><a href="'+article_footer_ad[i].url+'" target="_blank">'+article_footer_ad[i].title+'</a></p>';
				$('.foot_ad').append(footHtml);
			}
		}
    }
});