---
layout: post
hidden: true
title: 为 Jekyll 添加 Algolia 搜索
date: 2020-05-23 07:02
category: CodePlay
tags: [jekyll, algolia, 搜索]
toc: true
---
当时建博客的一大初衷就是能够存储记忆，所以博客也应该有根据零星线索快速提取记忆的功能，也就是搜索。我对搜索功能的要求很简单，输入关键词后能把相应文章段落输出，并且高亮搜索词汇。最早配置的 [Simple Jekyll Search][simplejsearch]{:target="_blank"} 也因为太过“简略”而最终放弃。找了一大圈 Jekyll 博客的搜索配置，发现 [TMaize Blog][tmaize]{:target="_blank"} 的搜索功能非常好用，可惜之前不懂 Javascript, 不知如何移植，也就放弃了。不过，在突击两天 Javascript 后觉得好像上述两种方案都可以适当改造满足自己的要求，只是，何苦再自己折腾啊。

本博客目前采用的搜索方案为 [Algolia][algolia]{:target="_blank"} 提供的全文搜索，通过插件 [`jekyll-algolia` ][jekyll-algolia]{:target="_blank"} 实现。按我理解，该插件根据本地网页内容生成索引（index）内容，并将其推送到远端 Algolia 账号下，或者是将本地网页内容推送到 Algolia，然后远端生成索引，反正结果是在远端账号上有了网页的索引内容。安装和配置基本上按照[官网手册][doc]{:target="_blank"}操作即可。不过在这过程中因为不熟悉 Jekyll/Ruby/Algolia/Travis 的逻辑，还是会踩很多坑，所以还是简单记录下。

## 基本安装和配置
### 安装
需要已安装 Jekyll(>=3.6.0)，Ruby(>=2.3.0) 以及 Bundler，见[手册][requirements]{:target="_blank"}。

在网站根目录下 `Gemfile` 里面添加 `jekyll-algolia`: 
{% raw %}
```ruby
source 'https://rubygems.org'

gem 'jekyll', '~> 3.6'

group :jekyll_plugins do
  gem 'jekyll-algolia'
end
```
{% endraw %}
然后终端输入 `bundle install` 更新依赖关系。顺利的话，输入 `jekyll help` 后可以看到 `algolia` 命令。当然，没那么顺利，因为从源 `https://rubygems.org` 安装可能会很慢，可以将其改为 `source 'https://gems.ruby-china.com/'`。这样就能顺利在本地安装 `jekyll-algolia`了。安装好后将源改回去，因为后面在 Travis CI 上好像不认 `'https://gems.ruby-china.com/'`，忘了什么提示了……

### 配置
前往 Algolia 网站申请免费的 Community Plan，进入个人面板（dashboard），点击 `API Keys`，可以看到 `Application ID`, `Search-Only API Key` 以及 `Admin API Key`。同时选择 `Indices`，新建 `index`，比如命名为 `jekyll`，会显示 `1/4 tasks completed` 之类，不用管它，后续上传后会自动完成余下的 tasks。

在网站根目录 `_config.yml` 里面添加如下内容：
{% raw %}
```yaml
algolia:
  application_id: your_application_id
  index_name: jekyll
  search_only_api_key: your_search_only_api_key
```
{% endraw %}
其中 `your_application_id`、`index_name`和 `your_search_only_api_key` 即上述 Algolia 里面相对应的内容。

有两点不确定，且没有测试：一、不确定索引是否必须提前建好（我是提前建好）；二、在填写时 id/name/key 都加了引号，不确定是否必须如此。

### 使用
在终端输入：
```bash
ALGOLIA_API_KEY='your_admin_api_key' bundle exec jekyll algolia
```
上述命令设置变量 `ALGOLIA_API_KEY` 为 Algolia 账号的 `Admin API Key`，然后执行 `jekyll algolia`。这个命令我没有测试，不知其执行如何。

在 Windows 下，采用的命令是：
```bash
set ALGOLIA_API_KEY=your_admin_api_key && bundle exec jekyll algolia
```
注意，这里 `your_admin_api_key` **没有引号**！我配置 Algolia 过程大部分时间用来对付这个引号上了-_-!!

这样执行完以后，进入 `Algolia Dashboard`, 点开 `Indices`，应该就可以看到索引记录了。可以尝试在面板里面搜索关键词，系统会给出相应的条目，点击右侧的 `Preview` 和 `Raw` 可以查看索引记录的存储情况。

### 前端展示
前端展示具体参见 [tutorial][tutorial]{:target="_blank"}。

新建文档 `_includes/algolia.html`：
{% raw %}
```html
<script src="https://cdn.jsdelivr.net/npm/instantsearch.js@2.6.0/dist/instantsearch.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/instantsearch.js@2.6.0/dist/instantsearch.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/instantsearch.js@2.6.0/dist/instantsearch-theme-algolia.min.css">

<script>
const search = instantsearch({
  appId: '{{ site.algolia.application_id }}',
  apiKey: '{{ site.algolia.search_only_api_key }}',
  indexName: '{{ site.algolia.index_name }}'
});

const hitTemplate = function(hit) {
  let date = '';
  if (hit.date) {
    date = moment.unix(hit.date).format('MMM D, YYYY');
  }

  let url = `{{ site.baseurl }}${hit.url}#${hit.anchor}`;

  const title = hit._highlightResult.title.value;

  let breadcrumbs = '';
  if (hit._highlightResult.headings) {
    breadcrumbs = hit._highlightResult.headings.map(match => {
      return `<span class="post-breadcrumb">${match.value}</span>`
    }).join(' > ')
  }

  const content = hit._highlightResult.html.value;

  return `
    <div class="post-item">
      <span class="post-meta">${date}</span>
      <h2><a class="post-link" href="${url}">${title}</a></h2>
      {{#breadcrumbs}}<a href="${url}" class="post-breadcrumbs">${breadcrumbs}</a>{{/breadcrumbs}}
      <div class="post-snippet">${content}</div>
    </div>
  `;
}

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-searchbar',
    placeholder: 'Search into posts...',
    poweredBy: true // This is required if you're on the free Community plan
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '#search-hits',
    templates: {
      item: hitTemplate
    }
  })
);

search.start();
</script>

<style>
.ais-search-box {
  max-width: 100%;
  margin-bottom: 15px;
}
.post-item {
  margin-bottom: 30px;
}
.post-link .ais-Highlight {
  color: #111;
  font-style: normal;
  text-decoration: underline;
}
.post-breadcrumbs {
  color: #424242;
  display: block;
}
.post-breadcrumb {
  font-size: 18px;
  color: #424242;
}
.post-breadcrumb .ais-Highlight {
  font-weight: bold;
  font-style: normal;
}
.post-snippet .ais-Highlight {
  color: #2a7ae2;
  font-style: normal;
  font-weight: bold;
}
.post-snippet img {
  display: none;
}
</style>
```
{% endraw %}
该文档将完成调用 `InstantSearch.js`，添加搜索框、展示搜索结果（包括日期、高亮、CSS）等操作，可根据需要进行更改。

新建页面如 `search.html`，搜索部分内容如下：
{% raw %}
```md
---
layout: default
---
## 搜索
<div id="search-searchbar"></div>

<div class="post-list" id="search-hits">
</div>
{% include algolia.html %}
```
{% endraw %}

如此就完成了基本的搜索配置了。

## 额外配置

### 索引节点
在 Algolia 面板 `Indices` 里面可以设置搜索的各种行为，如去掉连接词、语言设置、错字等。

此外，可在 `_config.yml` 里面设置索引的后缀文档、节点，或者排除索引的文档，具体参见 <https://community.algolia.com/jekyll-algolia/options.html>{:target="_blank"}。这里主要说明下 `nodes_to_index` 这个选项。

`jekyll-algolia` 默认只索引 `p`， 即只有在标签 `<p></p>` 里面的内容会被索引，但是有些内容可能会在列表 `li` 或者引用 `blockquote` 里面里面，所以，可以如下添加：
```yaml
algolia:
  # Also index quotes, list items and custom paragraphs
  nodes_to_index: 'p,blockquote,li'
```
此外，Algolia 不建议索引 `code` 内容，因为会产生很多“噪音”。测试发现一段简短的代码，经过 highlight 处理后会很长，索引时会提示超过 `max_record_size`（10kb）。

### 隐藏空字符搜索结果
Algolia 默认返回空字符搜索的结果，即当刚进入搜索界面或者删除关键词后，会列出所有的文档。

可以通过修改 `_includes/algolia.html` 里 `instantsearch` 函数来隐藏结果，参见<https://www.algolia.com/doc/guides/building-search-ui/going-further/conditional-display/js/#using-the-helper-state>{:target="_blank"}.
{% raw %}
```js
const search = instantsearch({
  appId: '{{ site.algolia.application_id }}',
  apiKey: '{{ site.algolia.search_only_api_key }}',
  indexName: '{{ site.algolia.index_name }}',
  routing: true,
  searchFunction(helper) {
    const container = document.querySelector('#search-hits');
    container.style.display = helper.state.query === '' ? 'none' : '';

    helper.search();
  }
});
```
{% endraw %}

### 发布到 Github Pages上
Github Pages 不支持 `jekyll-algolia` 插件，有几种策略：

1. 每次本地 `push` 到远端后自动在本地运行 `jekyll-algolia`，并将结果 `push` 到 Algolia。当然，通过脚本可方便实现，只是要注意保护好 `Admin API Key` ，参见 <https://community.algolia.com/jekyll-algolia/commandline.html#algolia-api-key-file>{:target="_blank"}。
2. 通过 Travis 系统实现，每次 github repo 有新的 commit 时，Travis CI 就会运行 `jekyll-algolia`，参见 <https://community.algolia.com/jekyll-algolia/github-pages.html>{:target="_blank"}。
3. 选择一个支持插件的平台……



[simplejsearch]: https://github.com/christian-fei/Simple-Jekyll-Search
[tmaize]: https://blog.tmaize.net/pages/search.html
[algolia]: https://www.algolia.com/
[doc]: https://community.algolia.com/jekyll-algolia/getting-started.html
[jekyll-algolia]: https://github.com/algolia/jekyll-algolia
[requirements]: https://community.algolia.com/jekyll-algolia/getting-started.html#requirements
[tutorial]: https://community.algolia.com/jekyll-algolia/blog.html

