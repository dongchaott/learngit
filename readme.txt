
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
	open <file>打开文件
	vi <file>进入编辑
	:wq+enter退出编辑

11.撤销修改
	git checkout -- <file>丢弃工作区的修改
	git reset HEAD <file>把暂存区的修改回退到工作区






