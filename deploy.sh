#!/bin/bash

cd `dirname $0`
git pull
pm2 restart auto-deploy