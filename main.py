# -*- encoding: utf-8 -*-
# Auth: Zok  Email: 362416272@qq.com
# Date: 2020/2/5

import frida
import sys
import os


class HookManager:
    def __init__(self, arg):
        self.arg = arg
        self.js_code = ''
        self.JS_FILE = 'jscode/'
        self.load_js()
        self.log = open('log/' + arg + '.txt', 'w+', encoding='utf-8')

    def load_js(self):
        file_names = os.listdir(self.JS_FILE)
        for filename in file_names:
            print('载入：' + filename)
            with open(self.JS_FILE + filename, 'r', encoding='utf-8') as f:
                self.js_code += f.read()

    def message(self, msg, data):
        if msg["type"] == 'send':
            print(u"[*] {0}".format(msg['payload']))
            self.log.write(u"[*] {0}\n".format(msg['payload']))
            self.log.flush()
        else:
            print(msg)

    def hooking(self):
        print('【开始Hook】.....\n\n')
        try:
            process = frida.get_remote_device().attach(self.arg)
            script = process.create_script(self.js_code)
            script.on("message", self.message)
            script.load()
            sys.stdin.read()
        except frida.ServerNotRunningError:
            print('没有开启对应app， 或没有开启映射端口')

    def close(self):
        self.log.close()


if __name__ == '__main__':
    os.system("adb forward tcp:27042 tcp:27042")
    # 启动方法1（命令行启动）：
    # cmd = sys.argv[1] if len(sys.argv) == 2 else exit()

    # 启动方法2（执行python文件）：
    cmd = input('请输入app包名')

    print('【开始hook - 安卓】', cmd)
    hk = HookManager(cmd)
    hk.hooking()
    hk.close()
