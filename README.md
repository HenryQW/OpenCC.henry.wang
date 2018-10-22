# OpenCC.henry.wang


Provides backend support for [OpenCC](https://github.com/HenryQW/ttrss_opencc) demo instances, https://opencc.henry.wang and http://opencc2.henry.wang

# Quickstart

## Deployment

Requires [node-gyp](https://github.com/nodejs/node-gyp), checkout [the installation guide](https://github.com/nodejs/node-gyp#installation) for your OS, then:

```sh
git clone https://github.com/HenryQW/OpenCC.henry.wang.git && npm install --production && npm start
```

Or spare yourself all the trouble:

```sh
docker run -d -p 3000:3000 --restart=always wangqiru/opencc_api_server
```

## Usage

Params:
1. title, text to convert, optional
2. content, text to convert, optional

Example: 

```sh
curl --request POST \
  --url http://localhost:3000 \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data 'title=繁體中文（中國大陸、澳門、馬新常稱繁體中文，台灣常稱正體中文或繁體中文）\
          &content=實際上，兩岸三地的繁體中文出版物並不拘泥於本地標準，有時使用其他字形和異體字是很頻繁的。'
  
**data should be urlencode-ed**
```

Result:
```json
{
    "title": "繁体中文（中国大陆、澳门、马新常称繁体中文，台湾常称正体中文或繁体中文）",
    "content": "实际上，两岸三地的繁体中文出版物并不拘泥于本地标准，有时使用其他字形和异体字是很频繁的。"
}
```
