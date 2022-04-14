---
title: 使用 Github Actions 和 Docker 实现 CI/CD
date: 2022-04-13T10:10:00.000+00:00
lang: zh
duration: 10min
---

## 安装 Docker

`Linux`服务器使用`curl`下载安装`docker`的`shell`脚本

```bash
curl -fsSL get.docker.com -o get-docker.sh
```

下载完成后，使用`ls`命令查看脚本下载是否成功。已经存在则使用`sh`命令执行该脚本

```bash
sh get-docker.sh
```

如果当前用户为非`root`用户，则使用`sudo su`切换至`root`用户
安装完成后，启动`docker`

```bash
systemctl start docker
```

使用`docker version`可以查看已安装的`docker`版本

## Docker 安装 Nginx

创建临时`nginx`容器

```bash
docker run -d -p 80:80 --name nginx nginx:latest
```

将临时容器内的配置文件拷贝至宿主机

```bash
docker container cp nginx:/etc/nginx /home/nginx
```

移除临时容器

```bash
docker stop nginx
docker rm nginx
```

## 申请免费 SSL 证书

安装`certbot`

```bash
yum install certbot
```

安装完成后可使用`certbot --version`查看已安装的`certbot`版本

使用`certbot`申请证书

```bash
certbot certonly --email youremail@email.com -d *.hasu.dev -d hasu.dev
--manual --preferred-challenges dns-01 --server https://acme-v02.api.letsencrypt.org/directory
```

在安装过程中，`certbot`需要通过在域名的`Dns`中添加一条`TXT`记录以验证域名所有权

证书申请成功后，会将证书存放在`/etc/letsencrypt/archive/hasu.dev`目录下

## 重新建立 Nginx 容器并配置 SSL

创建`nginx`容器

```bash
docker run -p 80:80 -p 443:443 --name nginx \
 -v /home/nginx/html:/usr/share/nginx/html \
 -v /home/nginx/logs:/var/log/nginx \
 -v /home/nginx/nginx.conf:/etc/nginx/nginx.conf \
 -v /home/nginx/conf.d:/etc/nginx/conf.d \
 -v /etc/letsencrypt/archive/:/etc/letsencrypt/archive/ \
 -d --restart=always nginx:latest
```

修改`nginx`中的默认配置，实现`SSL`加密

编辑`/home/nginx/conf.d/default.conf`

```json
server {
    listen          80 default;
    server_name     hasu.dev;
    rewrite ^(.*)$  https://$host$1 permanent;

}

server {
	listen 443 ssl;
	server_name hasu.dev;

	ssl_certificate      /etc/letsencrypt/archive/hasu.dev/fullchain1.pem;
	ssl_certificate_key  /etc/letsencrypt/archive/hasu.dev/privkey1.pem;
	ssl_ciphers         'ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:ECDHE-ECDSA-DES-CBC3-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:!DSS';
	ssl_prefer_server_ciphers  on;
	ssl_protocols              TLSv1 TLSv1.1 TLSv1.2;
	ssl_session_cache          shared:SSL:50m;
	ssl_session_timeout        1d;
	ssl_session_tickets        off;
	ssl_stapling               on;
	ssl_stapling_verify        on;
	ssl_trusted_certificate    /etc/letsencrypt/archive/hasu.dev/fullchain1.pem;
	add_header Strict-Transport-Security    max-age=60;


    root /usr/share/nginx/html;
    index  index.html index.htm;


    location / {
    	 try_files $uri $uri/ @router;
    	index  index.html index.htm;
    }

    location @router {
      rewrite ^.*$ /index.html last;
    }
}
```

刷新`nginx`容器中的配置

```bash
docker exec nginx nginx -s reload
```

## 使用 crontab 自动续期证书

查看系统是否已启动`crontab`服务

```bash
systemctl status crond.service
```

编写更新证书脚本

```
cd /home && vim certbot-renew.sh
```

脚本中写入如下内容

```shell
echo "Certbot Renew Workflow"
echo "`date`"

certbot renew --cert-name api.kingtingtech.com --force-renewal
docker restart nginx
```

创建`crontab`任务

```bash
crontab -e
```

添加定时更新证书脚本

```shell
0 3 1 * * /home/certbot-renew.sh &>> /home/certbot-renew.log

```
