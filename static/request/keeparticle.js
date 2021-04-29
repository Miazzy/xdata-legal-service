const queryBlogArticleInfo = async(
    page = 0,
    size = 50,
    key,
    storage
) => {
    var result = storage.getStore(`system_blog_article_${key}_${page}_${size}`);

    //如果缓存中存在文章数据，则返回直接返回数据
    if (result != null && typeof result != 'undefined' && result != '') {
        return result;
    }

    //定义查询条件和排序条件
    var whereSQL = key && key !== '推荐文章' ? `_where=(page_column,like,~${key}~)&` : '';
    var sortSQL = key == '推荐文章' ? `_sort=-star` : `_sort=-create_time`;

    //查询URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/bs_blog?_p=${page}&_size=${size}&${whereSQL}${sortSQL}`;

    //重置返回结果
    result = {};

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res);
        result = res.body;

        //遍历并格式化日期
        result = window.__.filter(result, function(item) {
            //格式化日期
            var ctime = window.Betools.tools.formatDate(item['create_time'], 'yyyy-MM-dd');
            var time = window.Betools.tools.formatDate(item['create_time'], 'yyyyMMddhhmmss');
            item['createtime'] = window.Betools.tools.formatDate(
                item['create_time'],
                'yyyy-MM-dd hh:mm:ss'
            );
            item['create_time'] = ctime;
            item['timestamp'] = time;
            item['description'] = window.Betools.tools.abbreviation(
                window.Betools.tools.delHtmlTag(item['content']),
                300
            );
            item['title'] = window.Betools.tools.abbreviation(
                window.Betools.tools.delHtmlTag(item['blog_title']),
                100
            );

            //返回结果
            return true;
        });

        //根据ID编号去掉重复的数据
        result = window.__.uniq(result, false, 'id');

        //查询出结果，存入缓存中
        storage.setStore(`system_blog_article_${key}_${page}_${size}`, JSON.stringify(result), 3600 * 24);

        //返回结果
        return result;
    } catch (err) {
        console.log(err);
    }
}

const articleLoadData = async(that, storage, manageAPI) => {
    //将that挂载到blogArticle上面
    window.blogArticle = that;
    //获取当前key信息
    var key = storage.getStore(`system_title_key`);
    //显示加载图标
    that.loading = true;
    //清空列表
    that.data = [];
    //博文数据
    var blist = await queryBlogArticleInfo(0, that.size, key, storage);
    //添加最新数据
    that.data = blist;
    //关闭加载图标
    that.loading = false;
    //新增查询页面
    that.page = 1;
    //延时加载数据
    setImmediate(async() => {
        //关闭加载图标
        that.loadingMore = false;
    });
    //返回结果
    return "";
}

window.articleLoadData = articleLoadData;

const articleLoadMore = async(that, storage, manageAPI) => {
    //将that挂载到blogArticle上面
    window.blogArticle = that;
    //获取当前key信息
    var key = storage.getStore(`system_title_key`);
    //显示加载图标
    that.loadingMore = true;
    //获取返回数据结果
    var blist = await queryBlogArticleInfo(that.page, that.size, key, storage);
    //数据合并
    that.data = that.data.concat(blist);
    //新增查询页面
    that.page++;
    //延时加载数据
    setTimeout(async() => {
        //关闭加载图标
        that.loadingMore = false;
    }, 1000);
}

window.articleLoadMore = articleLoadMore;