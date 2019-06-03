
# github自动部署步骤

* 创建github项目，pull到服务器运行
* 服务器上创建webhooks监听服务，参考本项目
    ** 创建http服务，监听webhooks请求
    ** 收到请求后执行更新脚本：git pull && restart server
* 在github项目上点击 Setting -> Webhooks -> Add webhook
* 填入webhooks监听的地址，eg: http://129.28.113.183:8001
* 后续的push操作可以在 Webhooks 的 Recent Deliveries 查看自动部署情况

# run
```sh
npm install
npm install pm2 --global
pm2 start pm2.json
```