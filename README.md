## 安装nodejs
```shell
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

sudo apt-get install -y nodejs
```

## 安装依赖
```nodejs
npm install
npm install -g pm2
```

## 启动(两种方式都可以)
### 1.直接启动
```shell
node index.js 
# 或者
npm run start
```

### 2.pm2守护进程启动
```shell
npm install -g pm2
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 100M
pm2 start pm2-start.json   # 启动
pm2 restart pm2-start.json   # 重启
pm2 stop pm2-start.json   # 结束
```
