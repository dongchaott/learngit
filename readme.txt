
1.新建目录

2.将目录变成git管理的仓库（初始化仓库）
	git init

3.添加文件
	git add <file>

4.提交文件
	git commit -m “注释说明”
	若输入错误进入文件编辑，按esc，”:wq”退出文件编辑

5.查看状态
	git status

6.查看修改内容
	git diff <file>

7.查看日志（看回退版本）
	git log

8.查看命令历史（看未来版本）
	git reflog

9.版本回退
	git reset —-hard HEAD^(回到上个版本)
	git reset —-hard HEAD^^(回到上上个版本)
	git reset —-hard HEAD~100(回到前100个版本)
	git reset —-hard <commit id>(回到指定版本)

10.文件操作
	输入前半部分内容按tab快捷打出全称
	touch <file>新建txt文件
	open <file>打开文件
	vi <file>进入编辑
	:wq+enter退出编辑
	rm <file>删除

11.撤销修改
	git checkout -- <file>丢弃工作区的修改
	git reset HEAD <file>把暂存区的修改回退到工作区

12.删除文件
	git rm <file>删除版本库中文件
	git checkout -- <file>版本库版本替换工作区版本，“一键还原”

13.第一次修改

14.来个冲突

15.创建分支

16.回滚

17.提交无需密码
	git config –global credential.helper osxkeychain
	如果不能执行,请先安装:
	$ git credential-osxkeychain
	# Test for the cred helper
  	git: 'credential-osxkeychain' is not a git command. See 'git --help'.
	$ curl -s -O \
  	https://github-media-downloads.s3.amazonaws.com/osx/git-credential-osxkeychain
	#Download the helper
	$ chmod u+x git-credential-osxkeychain
	# Fix the permissions on the file so it can be run
	$ sudo mv git-credential-osxkeychain \
  	"$(dirname $(which git))/git-credential-osxkeychain"
	# Move the helper to the path where git is installed
  	Password: [enter your password]
	$  git config --global credential.helper osxkeychain
	# Set git to use the osxkeychain credential helper

18.再试一次吧
	链接：https://blog.csdn.net/ssrrxx111/article/details/51384189

19.回滚版本

20.回到顶部
    methods: {
      stopScrollAnimate() {
        if (!this.isStop) {
          clearInterval(this.timer);
          window.removeEventListener('scroll', this.stopScrollAnimate)
        }
        this.isStop = false
      },
      returnTOp() {
        var vm = this
        this.timer = setInterval(function () {
          window.addEventListener('scroll', vm.stopScrollAnimate)
          var osTop = document.documentElement.scrollTop || document.body.scrollTop;
          var ispeed = Math.floor(-osTop / 7);
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
          if (osTop == 0) {
            clearInterval(vm.timer);
          }
          vm.isStop = true
        }, 1);
      },
    },
    created() {
      this.initPage();
      this.returnTOp();
    }

21.windows测试

22.windows测试2

23.小虫前端开发规范
	https://github.com/moyea/code-style

24.请求地址
	http://api-shop.hc.top

25.合并分支


26.写点东西吧

27.加点东西

28.贮藏代码

