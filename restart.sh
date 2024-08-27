#!/bin/bash
###
 # @Author: wuyifan wuyifan@max-optics.com
 # @Date: 2024-08-01 15:58:56
 # @LastEditors: wuyifan0203 1208097313@qq.com
 # @LastEditTime: 2024-08-27 16:10:32
 # @FilePath: /Auto-delivery-helper/restart.sh
 # Copyright (c) 2024 by wuyifan email: 1208097313@qq.com, All Rights Reserved.
### 

# 检查是否有旧的进程在运行
if [ -f ./pidfile ]; then
  old_pid=$(cat ./pidfile)
  if ps -p $old_pid > /dev/null; then
    echo "Killing old process $old_pid"
    kill $old_pid
  fi
fi

# 启动新的进程
echo "Starting new process --------------"
ts-node script/entry.ts &

# 保存新的进程 ID
new_pid=$!
echo $new_pid > ./pidfile
