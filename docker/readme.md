
# build
```sh
# 先进入该目录
sudo docker build -t auto-deploy .
```

# run
```sh
sudo docker run -itd -p 8001:8001 auto-deploy
```

# 登录
```sh
# 选择容器id
sudo docker ps -a

sudo docker attach containerid # 适合本地调试，注意exit会关闭容器
sudo docker exec -it containerid /bin/bash # 适合生产环境

pm2 log # 登录后查看log
```