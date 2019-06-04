# ubuntu 16.04 with auto-deploy
FROM ubuntu:16.04

RUN apt update
RUN apt install wget -y
#RUN apt install curl -y
#RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash

# install xz
RUN wget -O /usr/lib/xz-5.2.4.tar.gz https://nchc.dl.sourceforge.net/project/lzmautils/xz-5.2.4.tar.gz
RUN tar -xzvf /usr/lib/xz-5.2.4.tar.gz -C /usr/lib
RUN apt install gcc -y
RUN apt install make -y
RUN cd /usr/lib/xz-5.2.4 && ./configure --prefix=/usr/lib/xz && make && make install

# install node
RUN wget -O /usr/lib/node-v10.tar.xz https://nodejs.org/dist/v10.16.0/node-v10.16.0-linux-x64.tar.xz
RUN /usr/lib/xz/bin/xz -d /usr/lib/node-v10.tar.xz
RUN cd /usr/lib && tar -xf node-v10.tar
RUN cd /usr/lib && mv node-v10.16.0-linux-x64 node
RUN ln -s /usr/lib/node/bin/npm /usr/bin/npm 
RUN ln -s /usr/lib/node/bin/node /usr/bin/node 
RUN npm set registry https://registry.npm.taobao.org/

# init && run server
RUN apt install git -y
RUN cd /home && git clone https://github.com/zzp11/auto-deploy.git
RUN cd /home/auto-deploy && npm install && npm install pm2 --global
RUN ln -s /usr/lib/node/bin/pm2 /usr/bin
RUN cd /home/auto-deploy && pm2 start pm2.json
